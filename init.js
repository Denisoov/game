import Phaser from 'phaser'
import LoadingScene from './src/scenes/load'
import MiniGameScene from './src/scenes/MiniGameScene.js'
import MainScene from './src/scenes/MainScene.js'

const width = window.innerWidth;
const height = window.innerHeight;

// Функция для вычисления высоты канваса
const calculateCanvasHeight = () => {
  // Здесь вы можете настроить высоту, вычитая высоты верхней и нижней панелей
  const topPanelHeight = 50; // Пример высоты верхней панели
  const bottomPanelHeight = 50; // Пример высоты нижней панели

  return height - topPanelHeight - bottomPanelHeight;
};

const config = {
  type: Phaser.AUTO,
  width: width,
  height: calculateCanvasHeight(),
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [LoadingScene, MainScene, MiniGameScene]
}

const InitPhaserGame = () => {
  const parent = 'game-container'

  return new Phaser.Game({ ...config, parent });
}

export default InitPhaserGame;

