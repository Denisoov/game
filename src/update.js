export function update() {
  if (this.isPaused) {
    return;
  }

  if (this.targetX !== null) {
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetX, this.player.y);
    if (distance < 5) {
      this.player.setVelocityX(0);
      this.targetX = null;
      this.player.anims.stop();
      this.player.setFrame(0);
    } else {
      const direction = Math.sign(this.targetX - this.player.x);
      this.player.setVelocityX(this.playerSpeed * direction);

      if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'walk') {
        this.player.anims.play('walk', true);
      }

      this.player.flipX = direction > 0;
    }
  } else {
    this.player.setVelocityX(0);

    if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'idle') {
      this.player.anims.play('idle', true);
    }
  }

  this.debugGraphics.clear();
  this.debugGraphics.strokeRect(this.player.x - 24, this.player.y - 24, 48, 48);
}