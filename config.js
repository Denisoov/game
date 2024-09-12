import Phaser from 'phaser'
import LoadingScene from './scenes/load'
import GameScene from './scenes/game'

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [LoadingScene, GameScene]
}

const game = new Phaser.Game(config)