export default class MiniGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MiniGameScene' });
  }

  playerSpeed = 200; // Скорость игрока
  isMovingLeft = false;
  isMovingRight = false;

  controlRightButton
  controlLeftButton
  isDialogGameOver

  createBackground() {
    // Создаем фон
    this.background = this.add.image(0, 0, 'background-game'); // Изменено на this.add.image
    this.background.setOrigin(0.5, 0.5); // Установите центр изображения в его середину

    this.background.x = this.cameras.main.width / 2; // Устанавливаем X в центр камеры
    this.background.y = this.cameras.main.height / 2; // Устанавливаем Y в центр камеры
    this.background.setScrollFactor(0); // Отключаем прокрутку фона
  }

  createScore() {
    // Создаем кнопку
    this.boxScore = this.add.image(40, 40, 'button-empty').setScale(0.16).setDepth(1)

    const style = {
      fontSize: '20px',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fill: '#fedabe',
      stroke: '#000',
    }

    // Получаем координаты кнопки
    const buttonWidth = this.boxScore.width * this.boxScore.scaleX // Ширина кнопки с учетом масштаба
    const buttonHeight = this.boxScore.height * this.boxScore.scaleY // Высота кнопки с учетом масштаба

    this.scoreText = this.add.text(0, 0, 'x0', style).setDepth(2).setOrigin(0.7)

    // Устанавливаем текст справа от кнопки
    const textX = this.boxScore.x + buttonWidth - this.scoreText.width - 10
    const textY = this.boxScore.y + buttonHeight - this.scoreText.height - 15  // Центрируем текст по вертикали относительно кнопки

    this.scoreText.x = textX
    this.scoreText.y = textY
  }

  createCharter() {
    // Настройка персонажа
    this.player = this.physics.add.sprite(150, 500, 'idle0')
      .setDepth(1)
      .setScale(0.15, 0.15)
      .setCollideWorldBounds(true)

    this.player.setBodySize(this.player.width - 340, this.player.height, true)

    console.log(this.background.y)

    this.player.y = this.background.y + (this.background.height / 2) - 80

    const frames = (name, countFrames) => {
      let frames = [];
      for (let i = 0; i <= countFrames; i++) {
        frames.push({ key: `${name}${i}` });
      }
      return frames;
    }

    // Создание анимации "идл"
    this.anims.create({
      key: 'idle',
      frames: frames('idle', 9),
      frameRate: 10,
      repeat: -1
    })

    // Создание анимации "бег"
    this.anims.create({
      key: 'run',
      frames: frames('run', 9),
      frameRate: 20,
      repeat: -1
    })
  }

  createControlButtons() {
    const positionX = this.cameras.main.width / 2

    // Кнопка влево
    this.controlLeftButton = this.add.sprite(positionX - 100 , this.cameras.main.height - 100, 'button-left')
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.2)

    this.controlLeftButton.on('pointerdown', () => {
      this.isMovingLeft = true;
      this.controlLeftButton.setAlpha(0.6);
    })

    this.controlLeftButton.on('pointerup', () => {
      this.isMovingLeft = false;
      this.controlLeftButton.setAlpha(1);
    })

    // Кнопка вправо
    this.controlRightButton = this.add.sprite(positionX + 100, this.cameras.main.height - 100, 'button-right')
      .setInteractive()
      .setScale(0.2)

    this.controlRightButton.on('pointerdown', () => {
      this.isMovingRight = true
      this.controlRightButton.setAlpha(0.6)
    })

    this.controlRightButton.on('pointerup', () => {
      this.isMovingRight = false
      this.controlRightButton.setAlpha(1)
    })
  }

  create() {
    this.createBackground()
    this.score = 0 // Счетчик баллов
    this.isGameOver = false // Тагл выключенной игры
    this.eggFallSpeed = 200 // Начальная скорость падения яиц

    this.createScore()
    this.createCharter()

    // Группа для яиц
    this.eggs = this.physics.add.group()

    // Группа камней
    this.stones = this.physics.add.group()


    // Настройка коллизий
    this.physics.add.overlap(this.player, this.eggs, this.catchEgg, null, this)
    this.physics.add.overlap(this.player, this.stones, this.hitStone, null, this)

    // Настройка коллизий
    this.physics.add.overlap(this.player, this.eggs, this.catchEgg, null, this)

    // Запуск таймера для появления камней
    this.stoneSpawnTimer = this.time.addEvent({
      delay: 2000, // Появление камней каждые 2 секунды
      callback: this.spawnStone,
      callbackScope: this,
      loop: true
    })

    // Запуск таймера для появления яиц
    this.eggSpawnTimer = this.time.addEvent({
      delay: 1000,
      callback: this.spawnEgg,
      callbackScope: this,
      loop: true
    })

    // Создание кнопок управления
    this.createControlButtons()
  }


  spawnEgg() {
    if (this.isGameOver) return;

    // Создание яйца в случайной позиции
    const x = Phaser.Math.Between(0, this.cameras.main.width)
    const egg = this.eggs.create(x, 0, 'sushi').setScale(0.3)
    egg.setVelocityY(this.eggFallSpeed); // Установка скорости падения яиц
  }

  spawnStone() {
    if (this.isGameOver) return

    // Создание камня в случайной позиции
    const x = Phaser.Math.Between(0, this.cameras.main.width);
    const stone = this.stones.create(x, 0, 'juk');
    stone.setVelocityY(this.eggFallSpeed).setScale(0.18); // Установка скорости падения камней
  }

  catchEgg(wolf, egg) {
    egg.destroy() // Удаляем яйцо
    this.score += 1 // Увеличиваем счет
    this.scoreText.setText('x' + this.score) // Обновляем текст счета

    // Проверка на повышение уровня сложности
    if (this.score % 5 === 0) {
      this.eggFallSpeed += 600 > this.eggFallSpeed ? 50 : 0 // Увеличиваем скорость падения яиц
      this.updateEggSpeed() // Обновляем скорость падения для всех яиц
    }
  }

  hitStone(wolf, stone) {
    stone.destroy() // Удаляем камень
    this.endGame() // Завершаем игру при столкновении с камнем
  }

  removeFallingItems() {
    this.eggs.clear(true, true) // Удаляем все яйца
    this.stones.clear(true, true) // Удаляем все камни
  }

  restartGame() {
    this.isMovingLeft = false
    this.isMovingRight = false

    // Сброс значений
    this.score = 0 // Сброс счета
    this.isGameOver = false // Сброс флага окончания игры
    this.eggFallSpeed = 200 // Сброс скорости падения яиц

    // Обновление текста счета
    this.scoreText.setText('x' + this.score);

    // Останавливаем таймер для яиц
    if (this.eggSpawnTimer) this.eggSpawnTimer.remove()

    // Останавливаем таймер для камней
    if (this.stoneSpawnTimer) this.stoneSpawnTimer.remove()

    // Перезапуск таймеров
    this.stoneSpawnTimer = this.time.addEvent({
      delay: 2000, // Появление камней каждые 2 секунды
      callback: this.spawnStone,
      callbackScope: this,
      loop: true
    })

    this.eggSpawnTimer = this.time.addEvent({
      delay: 1000,
      callback: this.spawnEgg,
      callbackScope: this,
      loop: true
    })

    this.closeGameOverDialog()

    this.isGameOver = false
  }

  updateEggSpeed() {
    // Обновление скорости падения для всех существующих яиц
    this.eggs.children.iterate((egg) => {
      egg.setVelocityY(this.eggFallSpeed)
    })
  }

  endGame() {
    this.isGameOver = true

    this.removeFallingItems()
    this.resetPlayerPosition()
    this.createGameOverDialog()
  }

  resetPlayerPosition() {
    this.player.setPosition(150, 550)
    this.player.setVelocity(0)
    this.player.anims.play('idle', true)
  }

  // Удаление всех элементов диалогового окна
  closeGameOverDialog() {
    this.children.each(child => {
      if (child?.depth === 10 || child?.depth === 11) {
        this.tweens.add({ targets: child, alpha: 0, duration: 300, onComplete: () => child.destroy() })
      }
    })

    this.isDialogGameOver = false
  }

  createGameOverDialog() {
    this.controlRightButton.setAlpha(1)
    this.controlLeftButton.setAlpha(1)

    this.isDialogGameOver = true
    this.resetPlayerPosition()



    // Создаем фоновую панель для диалогового окна
    const dialogWidth = this.sys.game.config.width - 40
    const dialogHeight = 250
    const dialogX = (this.sys.game.config.width - dialogWidth) / 2
    const dialogY = (this.sys.game.config.height - dialogHeight) / 2

    // Создаем полупрозрачный фон
    this.add.rectangle(0, 0, Number(this.sys.game.config.width), Number(this.sys.game.config.height), 0x000000, 0.8)
      .setOrigin(0)
      .setDepth(10)
      .setInteractive() // Делаем его интерактивным, чтобы игнорировать клики
      .on('pointerdown', () => {}) // Игнорируем клики на потемнении

    const dialogContainer = this.add.container(dialogX, dialogY).setDepth(11);

    // Создаем спрайт с текстурой
    const dialogBackground = this.add.sprite(0, 0, 'background-dialog')
      .setOrigin(0) // Устанавливаем точку отсчета в верхний левый угол
      .setDisplaySize(dialogWidth, dialogHeight); // Устанавливаем размеры спрайта

    const DEFAULT_STYLE = {
      fontSize: '30px',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fill: '#fedabe',
      stroke: '#000',
    }

    // Добавляем текст
    const gameOverText = this.add.text(dialogWidth / 2, dialogHeight / 6, 'Ваш счет', DEFAULT_STYLE)
      .setOrigin(0.5)

    // Добавляем текст
    const gameScoreText = this.add.text(dialogWidth / 2, (dialogHeight / 6) + 60, `${this.score}`, DEFAULT_STYLE)
      .setOrigin(0.5); // Центрируем текст по горизонтали


    // Кнопка "Повторить попытку"
    const retryButton = this.add.sprite(dialogWidth / 2 - 60, dialogHeight / 1.5, 'button-retry')
      .setOrigin(0.5)
      .setScale(0.2, 0.2)
      .setInteractive()
      .on('pointerdown', () => this.restartGame())

    // Кнопка "Сменить сцену"
    const changeSceneButton = this.add.sprite(dialogWidth / 2 + 60, dialogHeight / 1.5, 'button-home')
      .setOrigin(0.5)
      .setScale(0.2, 0.2)
      .setInteractive()
      .on('pointerdown', () => this.scene.start('MainScene'))

    dialogContainer.add(dialogBackground)
    dialogContainer.add(gameOverText)
    dialogContainer.add(retryButton)
    dialogContainer.add(changeSceneButton)
    dialogContainer.add(gameScoreText)
  }

  update() {
    if (this.isGameOver || this.isDialogGameOver) return

    // Управление движением персонажа
    if (this.isMovingLeft) {
      this.player.setVelocityX(-this.playerSpeed)
      this.player.flipX = false // Поворачиваем вправо
      this.player.anims.play('run', true)
    } else if (this.isMovingRight) {
      this.player.setVelocityX(this.playerSpeed)
      this.player.flipX = true // Поворачиваем влево

      this.player.anims.play('run', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('idle', true)
    }
  }
}