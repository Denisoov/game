export default class ClickerGameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ClickerGameScene' });
		this.score = 0;
		this.coins = null;
		this.coinEvent = null;
		this.timeLeft = 30;
		this.timerText = null;
		this.timerEvent = null;
		this.sprites = ['clicker/sushi', 'clicker/sushi-caviar'];
		this.scoreAmounts = [1, 5];
	}

	preload() {
		this.load.image('clicker/sushi', './assets/japan/sushi.png')
		this.load.image('clicker/sushi-caviar', './assets/japan/sushi-caviar.png')
	}

	create() {
		this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
		this.timerText = this.add.text(this.sys.game.config.width - 150, 16, 'Time: 30', { fontSize: '32px', fill: '#fff' });


		// Создание группы монет
		this.coins = this.physics.add.group();

		this.coinEvent = this.time.addEvent({
			delay: 500,
			callback: this.createCoin,
			callbackScope: this,
			loop: true
		});

		this.time.addEvent({
			delay: 150,
			callback: this.removeCoin,
			callbackScope: this,
			loop: true
		});

		this.timerEvent = this.time.addEvent({
			delay: 1000,
			callback: this.updateTimer,
			callbackScope: this,
			loop: true
		});

		this.input.on('pointerdown', this.handleClick, this);
	}

	createCoin() {
		let x, y;
		let validPosition = false;

		// Генерация координат до тех пор, пока не найдём подходящие
		while (!validPosition) {
			x = Phaser.Math.Between(50, this.sys.game.config.width - 50); // Учитываем ширину монеты
			y = Phaser.Math.Between(100, this.sys.game.config.height - 50); // Учитываем высоту монеты

			// Проверяем, не персекается ли новая монета с уже существующими
			validPosition = true;
			this.coins.children.iterate((coin) => {
				if (coin && Phaser.Geom.Intersects.RectangleToRectangle(
					new Phaser.Geom.Rectangle(x - 25, y - 25, 50, 50), // Размеры монеты
					coin.getBounds()
				)) {
					validPosition = false; // Если пересекается, ищем новые координаты
				}
			});
		}

		const spriteIndex = Phaser.Math.Between(0, this.sprites.length - 1);
		const scoreAmount = this.scoreAmounts[spriteIndex];

		const coin = this.coins.create(x, y, this.sprites[spriteIndex]);
		coin.setData('score', scoreAmount);

		coin.setAlpha(0);

		this.tweens.add({
			targets: coin,
			alpha: 1,
			duration: 300,
			ease: 'Power2',
		});
	}

	removeCoin() {
		if (this.coins.getLength() <= 5) return

		const coin = this.coins.getFirstAlive();

		if (!coin) return;

		this.tweens.add({
			targets: coin,
			alpha: 0,
			duration: 300,
			ease: 'Power2',
			onComplete: () => coin.destroy()
		});
	}

	updateTimer() {
		this.timeLeft -= 1;
		this.timerText.setText('Time: ' + this.timeLeft);

		if (this.timeLeft <= 0) this.endGame()
	}

	endGame() {
		this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Игра окончена',
			{ fontSize: '28px', fill: '#fff' }
		).setOrigin(0.5, 0.5);

		this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Счёт: ' + this.score,
			{ fontSize: '24px', fill: '#fff' }
		).setOrigin(0.5, 0.5);

		const button = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'На главную', {
			fontSize: '28px',
			fill: '#fff',
			fontStyle: 'bold',
			backgroundColor: '#ff5044',
			padding: { x: 16, y: 8 },
		}).setOrigin(0.5, 0.5).setInteractive();

		button.on('pointerdown', () => {
			this.scene.start('LoadingScene');
		});

		this.physics.pause();
		this.timerEvent.paused = true;
		this.coinEvent.paused = true;
	}

	handleClick(pointer) {
		if (this.coins.getLength() === 0) return

		this.coins.children.iterate((coin) => {
			if (coin && coin.getBounds().contains(pointer.x, pointer.y)) {
				this.collectCoin(coin);
			}
		});
	}

	collectCoin(coin) {
		const scoreAmount = coin.getData('score');
		coin.destroy();
		this.score += scoreAmount;
		this.scoreText.setText('Score: ' + this.score);
	}
}



