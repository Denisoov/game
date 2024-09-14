export function createCharter(context) {
    // Рассчитываем позицию для персонажа
    const xPositionPlayer = context.platformManager.xPositionPlatform - context.platformManager.platform.height / 4

    // Настройка персонажа
    context.player = context.physics.add.sprite(150, xPositionPlayer, 'character')
    context.player.setCollideWorldBounds(true)
    context.player.setScale(2)
    context.player.setDepth(1)
    context.player.setSize(18, 48)

    // Создание анимации "идл"
    context.anims.create({
      key: 'idle',
      frames: context.anims.generateFrameNumbers('character', { start: 5, end: 8 }), 
      frameRate: 10,
      repeat: -1 // Зацикливаем анимацию
    })
  
    // Создание анимации "движение"
    context.anims.create({
      key: 'walk',
      frames: context.anims.generateFrameNumbers('character', { start: 0, end: 3 }), 
      frameRate: 10,
      repeat: -1
    })

    // Создание анимации "сбор монеты"
    context.anims.create({
      key: 'take',
      frames: context.anims.generateFrameNumbers('character', { start: 9, end: 12 }), 
      frameRate: 10,
      repeat: -1
    })
}