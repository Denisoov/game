export default class ScoreManager {
  constructor(scene) {
    this.scene = scene

    this.score = 0
    this.scoreText = null
  }
  DEFAULT_STYLE = {
    fontSize: '24px',
    fill: '#fff',
    align: 'right',
    fontFamily: 'Arial',
  }

  create() {
    const xPosition = this.scene.cameras.main.width - 150
    
    this.scoreText = this.scene.add.text(xPosition, 10, 'Монеты: 0', this.DEFAULT_STYLE)

    this.scoreText.setOrigin(0, 0)
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