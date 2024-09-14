import Phaser from 'phaser'

export default class ItemsManager  {
  constructor(scene, energyManager, scoreManager) {
    // Контекст текущего менеджера
    this.self = this
    // Контекст сцены, хз почему именно наименование такое должно быть
    this.scene = scene

    this.energyManager = energyManager
    this.scoreManager = scoreManager

    this.selectedItem = null

    this.items
    this.itemsMap = new Map()
    
  }

  // Метод поднятия предмета
  collectItem(player, item) {
    if (!this.energyManager.energy) return

    if (item === self.selectedItem) {
      // Сбрасываем выбранный предмет
      self.selectedItem = null

      //TODO: ЧЕТ НЕ РАБОТАЕТ анимация, возможно перебивает update
      this.scene.scene.player.anims.play('take', true);

      this.scene.scene.time.delayedCall(300, () => item.destroy())

      this.scoreManager.updateScore(1)

      this.energyManager.consumeEnergy(1);
    }
  }

  // Создание предмета
  createItem(xPosition, yPosition, itemType) {
    const item = this.scene.physics.add.sprite(xPosition, yPosition, itemType);

    item.setScale(0.3);
    item.setInteractive();

    item.body.setCircle(item.width / 2);

    item.on('pointerdown', () => { self.selectedItem = item })

    item.on('pointerover', () => document.body.classList.add('pointer-cursor'))
    item.on('pointerout', () => document.body.classList.remove('pointer-cursor'))

    return item
  }

  // Генерация настройки предметов
  generateItems(numItems, yPositionPlayer) {
    const itemsJapan = ['sushi', 'sup', 'fish', 'sauce', 'sushi-caviar', 'tea']
    const minX = 50 // Минимальная координата X
    const maxX = this.scene.sys.game.config.width - minX // Максимальная координата X (ширина игрового поля минус ширина монеты)
    const xPositions = [] // Список хранения сгенерированных координат

    this.items = this.scene.physics.add.group()

    while (xPositions.length < numItems) {
      const randomX = Phaser.Math.Between(minX, maxX)

      // Проверяем, чтобы не было дубликата одинаковых координат
      if (!xPositions.includes(randomX)) xPositions.push(randomX);
    }

    xPositions.forEach((xPosition, index) => {
      const rnd = Phaser.Math.Between(0, itemsJapan.length - 1);

      // Генерируем рандомный предмет
      const itemType = itemsJapan[rnd];
      const yPositionItem = yPositionPlayer + 30

      const item = this.createItem(xPosition, yPositionItem, itemType);

      this.items.add(item)
      this.itemsMap.set(item, index)
    })

    return { items: this.items, itemMap: this.itemsMap }
  }
}