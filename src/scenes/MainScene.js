import Phaser from 'phaser'
import { createCharter } from '../components/createCharter'
import { debugGraphics } from '../components/createDebug'

import EnergyManager from '../managers/energyManager'
import ItemsManager from '../managers/itemsManager'
import ScoreManager from '../managers/scoreManager'
import PlatformManager from '../managers/platformManager'
import StorePromoManager from '../managers/storePromoManager'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })

    this.platformManager = new PlatformManager(this) 
    this.scoreManager = new ScoreManager(this)
    this.energyManager = new EnergyManager(this)
    this.itemsManager = new ItemsManager(this, this.energyManager, this.scoreManager)

    this.storePromoManager = new StorePromoManager(this)

    // Точка клика по X
    this.targetX = null

    // Скорость передвижения
    this.playerSpeed = 250

    // Кол-во генерации монет
    this.countItems = Number(localStorage.getItem('countItems')) // Количество монет
  }

  onPointerDown(pointer) {
    if (this.player.x > pointer.x && (this.player.x - pointer.x) < 30) return
    if (this.player.x < pointer.x &&this.player.x + 20 > pointer.x) return

    this.targetX = pointer.x
  }

  create() {
    this.platformManager.createBottomPanel()
    this.platformManager.createPanel()
    // Создаем платформу передвижения
    this.platformManager.createPlatform()

    // Создаем задний фон
    this.platformManager.createBackground()

    this.buttonGame = this.add.image(this.platformManager.bottomPanel.x - (this.platformManager.bottomPanel.x / 1.5), this.platformManager.bottomPanel.y, 'button-game')
    this.buttonGame.setDepth(5).setScale(0.7).setInteractive()
    this.buttonGame.on('pointerdown', () => {
      if (this.energyManager.energy < 5) return

      this.energyManager.consumeEnergy(5)

      this.scene.stop('MainScene')
      this.scene.start('MiniGameScene')
    })


    // Создаем фоновую музыку
    this.platformManager.createBackgroundMusic()

    // Создаем персонажа
    createCharter(this)

    this.energyManager.create()

    this.scoreManager.create()

    this.storePromoManager.createButtonPromo()

    // Генерируем предметы
    const { items } = this.itemsManager.generateItems(this.countItems, this.player.y)

    // Добавляем проверку пересечения персонажа со списком предметов
    this.physics.add.overlap(this.player, items, this.itemsManager.collectItem, null, this)

    // debugGraphics(this)
  }

  update() {
    if (this.isPaused) return // Если игра на паузе, не обновляем логику игры

    if (this.targetX !== null) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetX, this.player.y)
      
      if (distance < 20) {
        this.player.setVelocityX(0)
        this.targetX = null
        this.player.anims.stop()
        this.player.setFrame(0)
      } else {
        const direction = Math.sign(this.targetX - this.player.x)
        this.player.setVelocityX(this.playerSpeed * direction)
  
        // Запускаем анимацию движения, если персонаж движется
        if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'run') {
          this.player.anims.play('run', true)
        }
  
        // Разворачиваем спрайт в зависимости от направления
        this.player.flipX = direction > 0
      }
    } else {
      this.player.setVelocityX(0)
  
      // Запускаем анимацию стояния, если персонаж не движется
      if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'idle') {
        this.player.anims.play('idle', true)
      }
    }
  }

  destroy() {
    super.destroy()

    // Destroy managers
    if (this.platformManager) this.platformManager.destroy()
    if (this.energyManager) this.energyManager.destroy()
    if (this.itemsManager) this.itemsManager.destroy()

    // Destroy other resources if needed
    this.physics.world.removeCollider(this.player)
    this.player.destroy()
    this.buttonGame.destroy()
  }
}

