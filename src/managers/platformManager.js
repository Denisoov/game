export default class PlatformManager {
  constructor(scene) {
    this.scene = scene
    this.volume = 0.04

    this.platform
  }

  createPlatform() {
    this.platform = this.scene.add.image(this.scene.sys.game.config.width / 2, this.scene.sys.game.config.height, 'floor')

    this.platform.setInteractive().setScale(1).setScrollFactor(0)

    // Загружаем звук клика
    this.scene.sound.add('click-to-floor')

    this.platform.on('pointerdown', (platform) => {
      const sound = this.scene.sound.add('click-to-floor')
      
      sound.play()

      sound.once('complete', () => sound.destroy())

      this.scene.onPointerDown(platform)

    }, this.scene)
  }

  createBackground() {
    // Добавление фона
    const background = this.scene.add.image(0, this.platform.height + 10, 'background')
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