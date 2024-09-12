import Phaser from 'phaser'

const coins = [
	{ texture: 'soup', score: 1 },
	{ texture: 'sushi', score: 2 },
	{ texture: 'burger', score: 3 },
	{ texture: 'pizza', score: 4 }
]

export default class Coin extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		const index = Phaser.Math.Between(0, coins.length - 1);
		const texture = coins[index].texture;
		const score = coins[index].score;

		super(scene, x, y, texture);

		scene.add.existing(this);

		this.score = score;
		this.setScale(0.4)
		this.setInteractive()
	}
}


