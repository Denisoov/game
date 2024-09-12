import Phaser from 'phaser'
import { createCharter } from '../src/game/create/createCharter'
import { debugGraphics } from '../src/game/create/createDebug'
import { getRandomInt } from '../src/game/utils'

import EnergyManager from '../src/game/energy'
import ScoreManager from "../src/managers/score";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })

    this.energyManager = null
    this.scoreManager = null
  }

  onPointerDown(pointer) {
    this.targetX = pointer.x
  }

  collectCoin(player, coin) {
    //Если нет энергии
    if (!this.energyManager.energy) return

    if (coin === this.selectedCoin) {
      //TODO: ЧЕТ НЕ РАБОТАЕТ анимация, возможно перебивает update
      this.player.anims.play('take', true);
      this.time.delayedCall(500, () => coin.destroy())

      this.selectedCoin = null

      this.scoreManager.increase(1)
      this.energyManager.consumeEnergy(1);
    }
  }

  create() {
    // Добавление фона
    const background = this.add.image(0, 0, 'background')

    // Устанавливаем начало координат в левый верхний угол
    background.setOrigin(0, 0)

    // Расчет масштаба
    const scaleX =  this.sys.game.config.width / background.width
    const scaleY = this.sys.game.config.height / background.height

    // Используем большее значение масштаба, чтобы фон заполнил экран
    const scale = Math.max(scaleX, scaleY)

    // Устанавливаем масштаб и отменяем прокрутку
    background.setScale(scale).setScrollFactor(0)

    const platforms = this.physics.add.staticGroup()

    // Настройка персонажа
    createCharter(this)

    this.cursors = this.input.keyboard.createCursorKeys()

    // Количество монет
    const numCoins = 15
    const minX = 50 // Минимальная координата X
    const maxX = this.sys.game.config.width - minX // Максимальная координата X (ширина игрового поля минус ширина монеты)
    const yPositionPlayer = this.player.y // Y-координата для всех монет

    // Массив для хранения координат X
    const xPositionsCoins = [];

    // Генерация случайных X-координат для монет
    while (xPositionsCoins.length < numCoins) {
      const randomX = Phaser.Math.Between(minX, maxX)
      if (!xPositionsCoins.includes(randomX)) {
        xPositionsCoins.push(randomX)
      }
    }

    this.coins = this.physics.add.group() // Создание монет на случайных позициях по оси X
    this.coinMap = new Map() // Карта для хранения ссылок на монеты и их ID

    xPositionsCoins.forEach((xPosition, index) => {
      const image = getRandomInt(0,1) ? 'sup' : 'sushi'
      const position = image === 'sup' ? 35 : 30
      const coin = this.physics.add.sprite(xPosition, yPositionPlayer + position, image)

      coin.setScale(0.4)

      // Добавляем монету в группу
      this.coins.add(coin)

      // Устанавливаем идентификатор монеты
      this.coinMap.set(coin, index)

      // Обработчик клика на монету
      coin.body.setCircle(coin.width / 2)
      coin.setInteractive()

      coin.on('pointerdown', () => this.selectedCoin = coin)

      coin.on('pointerover', () => document.body.classList.add('pointer-cursor'))

      // Обработчик ухода курсора
      coin.on('pointerout', () => document.body.classList.remove('pointer-cursor'))
    })

    // Коллизии между монетами и платформами
    this.physics.add.collider(this.coins, platforms)

    this.scoreManager = new ScoreManager(this)

    // Инициализация переменной для хранения выбранной монеты
    this.selectedCoin = null

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this)

    this.input.on('pointerdown', this.onPointerDown, this)

    this.physics.add.collider(this.player, platforms)

    this.targetX = null
    this.playerSpeed = 160

    this.energyManager = new EnergyManager(this);
    this.energyManager.create();

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
    if (this.energyManager) {
      this.energyManager.destroy()
    }
  }
}

