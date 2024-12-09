import Phaser from 'phaser'
import LoadingScene from './src/scenes/load'
import MiniGameScene from './src/scenes/MiniGameScene.js'
import MainScene from './src/scenes/MainScene.js'

const width = window.innerWidth;
const height = window.innerHeight;

const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
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

