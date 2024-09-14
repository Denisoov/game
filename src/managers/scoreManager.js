export default class ScoreManager {
  constructor(scene) {
    this.scene = scene

    this.score = 0
    this.scoreText = null
  }

  create() {
    this.scoreText = this.scene.add.text(
      this.scene.cameras.main.width - 150,
      10,
      'Монеты: 0',
      {
        fontSize: '24px',
        fill: '#fff',
        align: 'right',
        fontFamily: 'Arial',
      }
    ).setOrigin(0, 0)
  }

  updateScore(score) {
    this.score += score
    this.scoreText.text = `Монеты: ${this.score}`
  }

  resetScore() {
    this.score = 0
    this.scoreText.text = `Монеты: 0`
  }
}