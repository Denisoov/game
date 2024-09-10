export function preload() {
  this.load.image('ground', './assets/ground.png');
  this.load.image('money', './assets/silver-money.png');
  this.load.spritesheet('character', 'https://labs.phaser.io/assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 });
}