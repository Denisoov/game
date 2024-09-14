import Phaser from 'phaser'
import { createCharter } from '../components/createCharter'
import { debugGraphics } from '../components/createDebug'

import EnergyManager from '../managers/energyManager'
import ItemsManager from '../managers/itemsManager'
import ScoreManager from '../managers/scoreManager'
import PlatformManager from '../managers/platformManager'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })

    this.platformManager = new PlatformManager(this) 
    this.scoreManager = new ScoreManager(this)
    this.energyManager = new EnergyManager(this)
    this.itemsManager = new ItemsManager(this, this.energyManager, this.scoreManager)

    this.targetX = null
    this.playerSpeed = 250

    this.countItems = 15 // Количество монет
  }

  onPointerDown(pointer) {
    if (this.player.x > pointer.x && (this.player.x - pointer.x) < 30) return
    if (this.player.x < pointer.x &&this.player.x + 20 > pointer.x) return

    this.targetX = pointer.x
  }

  create() {
    this.platformManager.createPlatforms()
    this.platformManager.createBackgroundMusic()

    createCharter(this)

    this.energyManager.create()

    this.scoreManager.create()

    const { items } = this.itemsManager.generateItems(this.countItems, this.player.y)

    this.physics.add.collider(items, this.platformManager.platforms)
    this.physics.add.collider(this.player, this.platformManager.platforms)

    this.physics.add.overlap(this.player, items, this.itemsManager.collectItem, null, this)

    this.input.on('pointerdown', this.onPointerDown, this)

    debugGraphics(this)
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
        if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'walk') {
          this.player.anims.play('walk', true)
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

    if (this.energyManager) this.energyManager.destroy()
  }
}

