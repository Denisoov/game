export function onPointerDown(pointer) {
  this.targetX = pointer.x;
}

export function collectCoin(player, coin) {
  if (coin === this.selectedCoin) {
    coin.setAlpha(0);
    coin.setScale(0);
    this.score += 1;
    // Чет сломалось
    console.log(this.setText)
    // this.scoreText.setText(`Монеты: ${this.score}`);
    this.selectedCoin = null;
  }
}

// Функция для генерации монет
export function generateCoins() {
  const numCoins = 12;
  const minX = 50;
  const maxX = 1150;
  const yPosition = this.player.y;
  const xPositions = [];

  while (xPositions.length < numCoins) {
    const randomX = Phaser.Math.Between(minX, maxX);
    if (!xPositions.includes(randomX)) {
      xPositions.push(randomX);
    }
  }

  this.coins = this.physics.add.group();
  this.coinMap = new Map();

  xPositions.forEach((x, index) => {
    const coin = this.physics.add.sprite(x, yPosition, 'money');
    coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    coin.setScale(0.06);
    this.coins.add(coin);
    this.coinMap.set(coin, index);

    coin.setInteractive();
    coin.on('pointerdown', () => {
      this.selectedCoin = coin;
    });
    coin.on('pointerover', () => {
      document.body.classList.add('pointer-cursor');
    });
    coin.on('pointerout', () => {
      document.body.classList.remove('pointer-cursor');
    });
  });
}