import Phaser from 'phaser'

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' })
  }

  MARGIN_BETWEEN = 25

  DEFAULT_STYLE = {
    fontSize: '32px', 
    fontFamily: 'Arial', 
    fontStyle: 'bold',
    fill: '#ff5044',
    stroke: '#000', 
  }

  preload() {
    // Добавляем индикатор загрузки
    this.load.on('progress', this.updateProgress, this)
    this.load.on('complete', this.loadComplete, this)

    this.load.image('logotype', './assets/logo.svg')

    // Загрузка игровых ресурсов
    this.load.image('background', './assets/background.webp')
    this.load.image('sushi', './assets/sushi.png')
    this.load.image('sup', './assets/sup.png')
    this.load.spritesheet('character', 'https://labs.phaser.io/assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 })

    // Создаем текст для отображения прогресса
    this.progressText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '0%', { ...this.DEFAULT_STYLE })
    this.progressText.setOrigin(0.5, 0.5)

    this.playButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + this.MARGIN_BETWEEN, 'Играть', { 
      ...this.DEFAULT_STYLE
    }).setOrigin(0.5, 0.5).setInteractive().setVisible(false)
  }

  create() {
    // Создаем логотип и делаем его невидимым
    this.logo = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - this.MARGIN_BETWEEN,
      'logotype'
    ).setOrigin(0.5, 0.5).setAlpha(0) // Логотип начально скрыт

    // Плавное появление логотипа
    this.tweens.add({
      targets: this.logo,
      alpha: 1,
      duration: 1000, // Длительность анимации в миллисекундах
      ease: 'Power2', // Тип интерполяции
      onComplete: () => this.createButton() // Создание кнопки после завершения появления логотипа
    })
  }

  createButton() {
    // Плавное появление кнопки
    this.tweens.add({
        targets: this.playButton,
        alpha: 1,
        duration: 1000, // Длительность анимации в миллисекундах
        ease: 'Power2' // Тип интерполяции
    })

    // Анимация мигания кнопки
    this.tweens.add({
        targets: this.playButton,
        alpha: { start: 1, from: 1, to: 0.3 }, // Плавное изменение прозрачности
        duration: 1000, // Длительность одного мигания в миллисекундах
        yoyo: true, // Возврат к исходному состоянию
        repeat: -1, // Бесконечное повторение
        ease: 'Sine.easeIn' // Тип интерполяции
    })

    // Переход к основной игровой сцене
    this.playButton.on('pointerdown', () => this.scene.start('GameScene'))

    this.playButton.setVisible(true)

}

  updateProgress(value) {
    // Обновляем текст с процентами загрузки
    this.progressText.setText(`${Math.round(value * 100)}%`)
  }

  loadComplete() {
    this.progressText.setVisible(false)
  }
}