export function createCharter(context) {
    // Рассчитываем позицию для персонажа
    const xPositionPlayer = context.platformManager.xPositionPlatform 

    // Настройка персонажа
    context.player = context.physics.add.sprite(150, xPositionPlayer, 'idle0')
    context.player.setCollideWorldBounds(true)
    context.player.setDepth(1)

    // Set the character's size
    context.player.setScale(0.25, 0.25) // adjust the scale to your liking

    context.player.setBodySize(context.player.width - 340, context.player.height, true)


    const frames = (name, countFrames) => {
      let frames = []

      for (let i = 0; i <= countFrames; i++) {
          frames.push({ key: `${name}${i}` })
      }

      return frames
    }

    // Создание анимации "идл"
    context.anims.create({
      key: 'idle',
      frames: frames('idle', 9),
      frameRate: 10,
      repeat: -1 // Зацикливаем анимацию
    })

    // Создание анимации "идл"
    context.anims.create({
      key: 'run',
      frames: frames('run', 9),
      frameRate: 10,
      repeat: -1 // Зацикливаем анимацию
    })
  
    // Создание анимации "движение"
    // context.anims.create({
    //   key: 'walk',
    //   frames: context.anims.generateFrameNumbers('character', { start: 0, end: 3 }), 
    //   frameRate: 10,
    //   repeat: -1
    // })

}