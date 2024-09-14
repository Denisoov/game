export default class PlatformManager {
  constructor(scene) {
    this.scene = scene
    this.platforms = null
    this.volume = 0.04
  }

  createPlatforms() {
    // Добавление фона
    const background = this.scene.add.image(0, 0, 'background')

    // Устанавливаем начало координат в левый верхний угол
    background.setOrigin(0, 0)

    // Расчет масштаба
    const scaleX =  this.scene.sys.game.config.width / background.width
    const scaleY = this.scene.sys.game.config.height / background.height

    // Используем большее значение масштаба, чтобы фон заполнил экран
    const scale = Math.max(scaleX, scaleY)

    // Устанавливаем масштаб и отменяем прокрутку
    background.setScale(scale).setScrollFactor(0)
  }

  createBackgroundMusic() {
    // Загружаем фоновой музыки
    this.scene.sound.add('background-melody')

    // Проигрываем фоновой музыки
    this.scene.sound.play('background-melody', { volume: this.volume, loop: true })
  }
}