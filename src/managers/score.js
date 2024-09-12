const styles = {
	fontSize: '32px',
	fill: '#fff',
	align: 'right'
}

export default class ScoreManager {
	constructor(scene) {
		this.score = 0
		this.text = scene.add.text(
			scene.cameras.main.width - 200, // X-координата (200 пикселей от правого края)
			10, // Y-координата (10 пикселей от верхнего края)
			'Монеты: 0', // Текст по умолчанию
			styles
		)

		this.text.setOrigin(0, 0)
	}

	increase(amount) {
		this.score += amount
		this.text.setText(`Монеты: ${this.score}`)
	}

	clear() {
		this.score = 0;
		this.text.setText('Монеты: 0')
	}
}
