export default class ClickerGameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ClickerGameScene' });
		this.score = 0;
		this.coins = null;
		this.timeLeft = 30;
		this.timerText = null;
	}

	preload() {
		this.load.image('clicker/coin', './assets/japan/sushi.png')
	}

	create() {
		this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
		this.timerText = this.add.text(this.sys.game.config.width - 150, 16, 'Time: 30', { fontSize: '32px', fill: '#fff' });


		// Создание группы монет
		this.coins = this.physics.add.group();

		this.time.addEvent({
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

		this.time.addEvent({
			delay: 1000,
			callback: this.updateTimer,
			callbackScope: this,
			loop: true
		});

		this.input.on('pointerdown', this.handleClick, this);
	}

	createCoin() {
		const x = Phaser.Math.Between(0, this.sys.game.config.width);
		const y = Phaser.Math.Between(0, this.sys.game.config.height);
		const coin = this.coins.create(x, y, 'clicker/coin');

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
		this.scene.pause();
		this.add.text(this.sys.game.config.width / 2 - 100, this.sys.game.config.height / 2, 'Game Over', { fontSize: '36px', fill: '#fff' });
		this.add.text(this.sys.game.config.width / 2 - 100, this.sys.game.config.height / 2 + 70, 'Final Score: ' + this.score, { fontSize: '28px', fill: '#fff' });
	}

	handleClick(pointer) {
		this.coins.children.iterate((coin) => {
			if (coin.getBounds().contains(pointer.x, pointer.y)) {
				this.collectCoin(coin);
			}
		});
	}

	collectCoin(coin) {
		coin.destroy();
		this.score += 1;
		this.scoreText.setText('Score: ' + this.score);
	}
}



