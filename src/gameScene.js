
// Инициация ресурсов
export function preload() {
  this.load.image('background', './assets/background.webp'); // Загрузка изображения фона
  this.load.image('ground', './assets/ground.png');
  this.load.image('money', './assets/silver-money.png');
  this.load.spritesheet('character', 'https://labs.phaser.io/assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 });
}

export function create() {
   // Добавление фона
   const background = this.add.image(0, 0, 'background');
   background.setOrigin(0, 0); // Устанавливаем начало координат в левый верхний угол
    console.log(this.sys)
   // Расчет масштаба
   const scaleX =  this.sys.game.config.width / background.width;
   const scaleY = this.sys.game.config.height / background.height;
   const scale = Math.max(scaleX, scaleY); // Используем большее значение масштаба, чтобы фон заполнил экран
 
   background.setScale(scale).setScrollFactor(0); // Устанавливаем масштаб и отменяем прокрутку

  const platforms = this.physics.add.staticGroup();

  

  // Настройка персонажа
  this.player = this.physics.add.sprite(150, 520, 'character');
  this.player.setBounce(0.2);
  this.player.setCollideWorldBounds(true);
  this.player.setScale(2);
  this.player.setDepth(1);

  // Создание анимации "идл"
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('character', { start: 5, end: 8 }), // Подберите кадры для анимации стояния
    frameRate: 10,
    repeat: -1 // Зацикливаем анимацию
  });

  // Создание анимации "движение"
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }), // Подберите кадры для анимации движения
    frameRate: 10,
    repeat: -1
  });

  this.cursors = this.input.keyboard.createCursorKeys();

  // Количество монет
  const numCoins = 12;
  const minX = 50; // Минимальная координата X
  const maxX = this.sys.game.config.width - minX; // Максимальная координата X (ширина игрового поля минус ширина монеты)

  const yPositionPlayer = this.player.y; // Y-координата для всех монет

  // Массив для хранения координат X
  const xPositions = [];

  // Генерация случайных X-координат для монет
  while (xPositions.length < numCoins) {
    const randomX = Phaser.Math.Between(minX, maxX);
    if (!xPositions.includes(randomX)) {
      xPositions.push(randomX);
    }
  }

  // Создание монет на случайных позициях по оси X
  this.coins = this.physics.add.group();
  this.coinMap = new Map(); // Карта для хранения ссылок на монеты и их ID

  xPositions.forEach((x, index) => {
    const coin = this.physics.add.sprite(x, yPositionPlayer + 30, 'money');
    coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    coin.setScale(0.06);
    this.coins.add(coin); // Добавляем монету в группу

    // Устанавливаем идентификатор монеты
    this.coinMap.set(coin, index);

    // Обработчик клика на монету
    coin.setInteractive();
    
    coin.on('pointerdown', () => {
      this.selectedCoin = coin;
    });

    coin.on('pointerover', () => {
      document.body.classList.add('pointer-cursor');
    });

    // Обработчик ухода курсора
    coin.on('pointerout', () => {
      document.body.classList.remove('pointer-cursor');
    });

  });

  // Коллизии между монетами и платформами
  this.physics.add.collider(this.coins, platforms);

  // Инициализация переменной для хранения выбранной монеты
  this.selectedCoin = null;

  // Создание табло для подсчета монет
  this.score = 0;
  this.scoreText = this.add.text(
    this.cameras.main.width - 10, // X-координата (10 пикселей от правого края)
    10, // Y-координата (10 пикселей от верхнего края)
    'Монеты: 0', // Текст по умолчанию
    {
      fontSize: '32px',
      fill: '#fff',
      align: 'right'
    }
  ).setOrigin(1, 0); // Устанавливаем точку привязки в правый верхний угол

  // Обработчик сбора монеты
   function collectCoin(player, coin) {
    if (coin === this.selectedCoin) {
      // Сбор монеты, если она выбрана
      coin.setAlpha(0); // Скрываем монету
      coin.setScale(0); // Уменьшаем ее до невидимости
      this.score += 1; // Увеличиваем счет
      this.scoreText.setText(`Монеты: ${this.score}`); // Обновляем текст табло
      this.selectedCoin = null; // Сброс выбора после сбора
    }
  }

  this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);

  this.input.on('pointerdown', onPointerDown, this);

  this.physics.add.collider(this.player, platforms);

  this.targetX = null;
  this.playerSpeed = 160;

  this.debugGraphics = this.add.graphics();
}

export function update() {
  if (this.isPaused) {
    return; // Если игра на паузе, не обновляем логику игры
  }

  if (this.targetX !== null) {
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetX, this.player.y);
    if (distance < 5) {
      this.player.setVelocityX(0);
      this.targetX = null;
      this.player.anims.stop();
      this.player.setFrame(0);
    } else {
      const direction = Math.sign(this.targetX - this.player.x);
      this.player.setVelocityX(this.playerSpeed * direction);

      // Запускаем анимацию движения, если персонаж движется
      if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'walk') {
        this.player.anims.play('walk', true);
      }

      // Разворачиваем спрайт в зависимости от направления
      this.player.flipX = direction > 0;
    }
  } else {
    this.player.setVelocityX(0);

    // Запускаем анимацию стояния, если персонаж не движется
    if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'idle') {
      this.player.anims.play('idle', true);
    }
  }

  this.debugGraphics.clear();
  this.debugGraphics.strokeRect(this.player.x - 24, this.player.y - 24, 48, 48);
}

export function onPointerDown(pointer) {
  this.targetX = pointer.x;
}