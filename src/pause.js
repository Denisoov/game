function pauseGame() {
  this.isPaused = true;
  this.scene.pause();
  this.taskWindow.setVisible(true);
}

function resumeGame() {
  this.isPaused = false;
  this.scene.resume();
  this.taskWindow.setVisible(false);
}