export default class PlatformManager {
  constructor(scene) {
    this.scene = scene
    this.volume = 0.06

    this.bottomPanel
    this.panel
    this.platform
    this.background

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

    this.panel.setInteractive().setScale(1, 1).setScrollFactor(0).setDepth(2)
  }

  createPlatform() {
    this.platform = this.scene.add.image(0, 0, 'floor')

    this.xPositionPlatform = this.xPositionPanel - this.platform.height - (this.platform.height / 2)

    this.platform.y = this.panel.y - this.panel.height - this.panel.height / 2
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
    this.background = this.scene.add.image(0, 0, 'background');

    // Устанавливаем начало координат в центр
    this.background.setOrigin(0.5, 0); // Центрируем по X, начинаем от верхней части по Y

    // Устанавливаем позицию Y, чтобы фон начинался от верхней границы экрана
    this.background.y = 0;

    // Рассчитываем масштаб по высоте, чтобы фон заполнил всю высоту экрана
    const scaleY = this.scene.sys.game.config.height / this.background.height;

    // Устанавливаем масштаб по высоте
    this.background.setScale(scaleY);

    this.background.setScale(scaleY, scaleY); // Устанавливаем одинаковый масштаб по обеим осям

    // Устанавливаем позицию X так, чтобы фон был по центру
    this.background.x = this.scene.sys.game.config.width / 2; // Центрируем по Xм Y так, чтобы фон заполнил пространство до платформы
  }

  createBackgroundMusic() {
    // Загружаем фоновой музыки
    this.scene.sound.add('background-melody')

    // Проигрываем фоновой музыки
    this.scene.sound.play('background-melody', { volume: this.volume, loop: true })
  }

  destroy() {
    if (this.bottomPanel) {
      this.bottomPanel.destroy();
    }

    if (this.panel) {
      this.panel.destroy();
    }

    if (this.platform) {
      this.platform.destroy();
    }

    if (this.background) {
      this.background.destroy();
    }

    this.bottomPanel = null
    this.panel = null
    this.platform = null
    this.background = null
    this.volume = 0
  }
}