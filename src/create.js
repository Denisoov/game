import { collectCoin, generateCoins, onPointerDown } from "./input.js";

export function create() {
  const platforms = this.physics.add.staticGroup();
  
  platforms.create(500, 568, 'ground').setScale(2).refreshBody();

  // Настройка персонажа
  this.player = this.physics.add.sprite(150, 450, 'character');
  this.player.setBounce(0.2);
  this.player.setCollideWorldBounds(true);
  this.player.setScale(2);
  this.player.setDepth(1);

  // Создание анимаций
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('character', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.cursors = this.input.keyboard.createCursorKeys();

  // Генерация монет
  generateCoins.call(this);

  // Коллизии
  this.physics.add.collider(this.coins, platforms);
  this.physics.add.collider(this.player, platforms);
  this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);

  this.input.on('pointerdown', onPointerDown, this);

  this.targetX = null;
  this.playerSpeed = 160;
  this.debugGraphics = this.add.graphics();
}