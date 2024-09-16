export default class PlatformManager {
  constructor(scene) {
    this.scene = scene
    this.volume = 0.1

    this.bottomPanel
    this.panel 
    this.platform

    this.xPositionBottomPanel
    this.xPositionPanel
    this.xPositionPlatform
    this.xPositionBackground
  }

  createBottomPanel() {
    // Добавление фона
    this.bottomPanel = this.scene.add.image(0, 0, 'bottom-panel')

    this.xPositionBottomPanel = this.scene.sys.canvas.height - (this.bottomPanel.height / 2)

    this.bottomPanel.x = this.scene.sys.game.config.width / 2
    this.bottomPanel.y = this.xPositionBottomPanel

    this.bottomPanel.setInteractive().setScale(1, 1).setScrollFactor(0).setDepth(1)
  }

  createPanel() {
    this.panel = this.scene.add.image(0, 0, 'panel')

    this.xPositionPanel = this.xPositionBottomPanel - this.panel.height - (this.panel.height / 2)

    this.panel.x = this.scene.sys.game.config.width / 2
    this.panel.y = this.xPositionPanel

    this.panel.setInteractive().setScale(1, 1).setScrollFactor(0).setDepth(1)
  }

  createPlatform() {
    this.platform = this.scene.add.image(0, 0, 'floor')

    this.xPositionPlatform = this.xPositionPanel - this.platform.height - (this.platform.height / 2)

    this.platform.y = 420
    this.platform.x = this.scene.sys.game.config.width / 2

    this.platform.setInteractive().setScale(1)

    this.platform.on('pointerdown', (platform) => {
      const sound = this.scene.sound.add('click-to-platform', { volume: 0.4 })

      sound.play()

      sound.once('complete', () => sound.destroy())

      this.scene.onPointerDown(platform)

    }, this.scene)
  }

  createBackground() {

    const background = this.scene.add.image(0, 0, 'background')
    // Устанавливаем начало координат в левый верхний угол
    background.setOrigin(0, 0)

    // Расчет масштаба
    const scaleX =  this.scene.sys.game.config.width / background.width
    const scaleY = 0

    // Используем большее значение масштаба, чтобы фон заполнил экран
    const scale = Math.max(scaleX, scaleY)

    // Устанавливаем масштаб и отменяем прокрутку
    background.setScale(scale).setScrollFactor(0)
  }

  // Добавьте платформы в группу
  addPlatform(platform) {
    this.scene.platforms.add(platform)
  }

  createBackgroundMusic() {
    // Загружаем фоновой музыки
    this.scene.sound.add('background-melody')

    // Проигрываем фоновой музыки
    this.scene.sound.play('background-melody', { volume: this.volume, loop: true })
  }
}