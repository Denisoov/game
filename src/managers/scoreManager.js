export default class ScoreManager {
  constructor(scene) {
    this.scene = scene

    this.score = Number(localStorage.getItem('score'))
    this.scoreText = null
  }
  DEFAULT_STYLE = {
    fontSize: '18px',
    fill: '#fff',
    align: 'right',
    fontFamily: 'Arial',
  }
  initScore() {
    let score = localStorage.getItem('score')

    if (score === null) localStorage.setItem('score', String(0))

    this.score = Number(score)
  }


  create() {
    this.initScore()

    this.coinTab = this.scene.add.image(0, 40, 'coin-tab').setScale(0.2).setDepth(1).setOrigin(0.5)

    this.coinTab.x = this.scene.cameras.main.width - 90

    this.scoreText = this.scene.add.text(this.coinTab.x + 20, this.coinTab.y + 2, this.score, this.DEFAULT_STYLE).setDepth(2)

    this.scoreText.setOrigin(0.5)
  }

  updateScore(score) {
    this.score += score
    this.scoreText.text = `${this.score}`

    localStorage.setItem('score', String(this.score))
  }
}