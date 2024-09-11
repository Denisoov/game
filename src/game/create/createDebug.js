export function debugGraphics (context)  {
  // Создаем графику отладки
  context.debugGraphics = context.add.graphics().setAlpha(0.75)

  // Создаем физику
  context.physics.world.createDebugGraphic()

  // Устанавливаем стили и параметры отладочного графика
  context.physics.world.on('worldstep', () => context.debugGraphics.clear())
}