import Phaser from 'phaser'
import LoadingScene from './src/scenes/load'
import GameScene from './src/scenes/game'
import RunnerGameScene from './src/scenes/games/runner.js'
import ClickerGameScene from './src/scenes/games/clicker.js'

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [LoadingScene, GameScene, RunnerGameScene, ClickerGameScene]
}

const game = new Phaser.Game(config)
