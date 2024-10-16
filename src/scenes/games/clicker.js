export default class ClickerGameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ClickerGameScene' });
		this.score = 0;
		this.coins = null;
	}

	preload() {
		// Загрузка изображения монеты
		this.load.image('clicker/coin', './assets/japan/sushi.png')
	}

	create() {
		// Создание текста для отображения счёта
		this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

		// Создание группы монет
		this.coins = this.physics.add.group();

		// Таймер для создания монет каждые 2 секунды
		this.time.addEvent({
			delay: 500,
			callback: this.createCoin,
			callbackScope: this,
			loop: true
		});

		// Обработка кликов на монеты
		this.input.on('pointerdown', this.handleClick, this);
	}

	update() {
		// Удаление монет, которые покинули экран
		this.coins.children.iterate((coin) => {
			if (coin.y > this.sys.game.config.height) {
				coin.destroy();
			}
		});
	}

	createCoin() {
		// Создание новой монеты в случайной позиции по оси X
		const x = Phaser.Math.Between(0, this.sys.game.config.width);
		const coin = this.coins.create(x, 0, 'clicker/coin');
		coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		coin.setVelocityY(Phaser.Math.Between(300, 400));
	}

	handleClick(pointer) {
		this.coins.children.iterate((coin) => {
			if (coin.getBounds().contains(pointer.x, pointer.y)) {
				this.collectCoin(coin);
			}
		});
	}

	collectCoin(coin) {
		// Увеличение счёта и удаление монеты
		coin.destroy();
		this.score += 1;
		this.scoreText.setText('Score: ' + this.score);
	}
}



