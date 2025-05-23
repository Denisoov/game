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

    // ПЕРСОНАЖ idle
    this.load.image('idle0', './assets/charter/idle/1_winter_Idle_000.png')
    this.load.image('idle1', './assets/charter/idle/1_winter_Idle_001.png')
    this.load.image('idle2', './assets/charter/idle/1_winter_Idle_002.png')
    this.load.image('idle3', './assets/charter/idle/1_winter_Idle_003.png')
    this.load.image('idle4', './assets/charter/idle/1_winter_Idle_004.png')
    this.load.image('idle5', './assets/charter/idle/1_winter_Idle_005.png')
    this.load.image('idle6', './assets/charter/idle/1_winter_Idle_006.png')
    this.load.image('idle7', './assets/charter/idle/1_winter_Idle_007.png')
    this.load.image('idle8', './assets/charter/idle/1_winter_Idle_008.png')
    this.load.image('idle9', './assets/charter/idle/1_winter_Idle_009.png')

    // ПЕРСОНАЖ walk
    this.load.image('run0', './assets/charter/run/1_winter_Run_000.png')
    this.load.image('run1', './assets/charter/run/1_winter_Run_001.png')
    this.load.image('run2', './assets/charter/run/1_winter_Run_002.png')
    this.load.image('run3', './assets/charter/run/1_winter_Run_003.png')
    this.load.image('run4', './assets/charter/run/1_winter_Run_004.png')
    this.load.image('run5', './assets/charter/run/1_winter_Run_005.png')
    this.load.image('run6', './assets/charter/run/1_winter_Run_006.png')
    this.load.image('run7', './assets/charter/run/1_winter_Run_007.png')
    this.load.image('run8', './assets/charter/run/1_winter_Run_008.png')
    this.load.image('run9', './assets/charter/run/1_winter_Run_009.png')



    //Игровых ресурсов
    this.load.image('bottom-panel', './assets/bottom-panel.png')
    this.load.image('panel', './assets/panel-control.png')
    this.load.image('floor', './assets/floor-snow.png')
    this.load.image('background', './assets/background-snow.jpg')
    this.load.image('dialog-close', './assets/dialog-close.png')

    this.load.image('coin-tab', './assets/coin-tab.png')
    this.load.image('coin', './assets/coin.png')
    this.load.image('button-promo', './assets/button-promo.png')
    this.load.image('button-bonus', './assets/button-bonus.png')
    this.load.image('button-buy', './assets/mini-games/button-buy.png')
    this.load.image('energy-tab', './assets/energy-tab.png')



    this.load.image('button-game', './assets/button-redirect-game.png')

    // Тестовый персонаж
    this.load.spritesheet('character', 'https://labs.phaser.io/assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 })

    // Категория японские блюда
    this.load.image('fish', './assets/japan/fish.png')
    this.load.image('sauce', './assets/japan/sauce.png')
    this.load.image('sushi-caviar', './assets/japan/sushi-caviar.png')
    this.load.image('tea', './assets/japan/tea.png')
    this.load.image('sushi', './assets/japan/sushi.png')
    this.load.image('sup', './assets/japan/sup.png')

    // Аудио
    this.load.audio('background-melody', './music/background-melody.mp3')
    this.load.audio('click-to-platform', './effects/click-to-platform.mp3')
    this.load.audio('collect-item', './effects/collect-item.mp3')
    this.load.audio('buy', './effects/buy.mp3')


    // Мини-игра
    this.load.image('background-game', './assets/mini-games/background.png')
    this.load.image('background-dialog', './assets/mini-games/background-dialog.png')
    this.load.image('background-item', './assets/mini-games/background-item.png')
    this.load.image('juk', './assets/mini-games/juk.png')
    this.load.image('button-left', './assets/mini-games/left-button.png')
    this.load.image('button-right', './assets/mini-games/right-button.png')

    this.load.image('button-retry', './assets/mini-games/button-retry.png')
    this.load.image('button-home', './assets/mini-games/button-home.png')
    this.load.image('button-empty', './assets/mini-games/button-empty.png')
    this.load.image('button-start', './assets/mini-games/button-start.png')
    this.load.image('charter-promo', './assets/charter/gift/1_winter_Gift_004.png')

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
    this.playButton.on('pointerdown', () => this.scene.start('MainScene'))

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