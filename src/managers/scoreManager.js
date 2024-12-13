export default class ScoreManager {
  constructor(scene) {
    this.scene = scene

    this.score = 0
    this.scoreText = null
  }
  DEFAULT_STYLE = {
    fontSize: '18px',
    fill: '#fff',
    align: 'right',
    fontFamily: 'Arial',
  }

  create() {
    this.coinTab = this.scene.add.image(0, 40, 'coin-tab').setScale(0.2).setDepth(1).setOrigin(0.5)

    this.coinTab.x = this.scene.cameras.main.width - 90

    this.scoreText = this.scene.add.text(this.coinTab.x + 20, this.coinTab.y + 2, '0', this.DEFAULT_STYLE).setDepth(2)

    this.scoreText.setOrigin(0.5)
  }

  updateScore(score) {
    this.score += score
    this.scoreText.text = `${this.score}`
  }
}