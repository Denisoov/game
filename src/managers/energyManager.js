export default class EnergyManager {
  constructor(scene) {
    this.scene = scene
    this.energy = 14
    this.maxEnergy = 25
    this.energyRegenRate = 1
    this.energyBar
    this.energyText
    this.energyRegenEvent
    this.delay = 15000
  }

  create() {
    this.energyText = this.scene.add.text(
      50,
      12,
      `${this.energy}↯`,
      {
        fontSize: '14px',
        fill: '#fff',
        fontFamily: 'Arial', 
      }
    ).setOrigin(0, 0).setDepth(1)

    this.energyBarBorder = this.scene.add.graphics()
    this.energyBarBorder.lineStyle(4, 0xffffff, 1)
    this.energyBarBorder.strokeRect(9, 9, 102, 22)

    this.energyBar = this.scene.add.graphics()
    this.energyBar.fillStyle(0xffffff, 1)
    this.energyBar.fillRect(10, 10, 100, 20)
    this.updateEnergyBar()


    this.energyRegenEvent = this.scene.time.addEvent({
      delay: this.delay,
      callback: () => {
        if (this.energy < this.maxEnergy) {
          this.energy += this.energyRegenRate
          this.updateEnergyBar();
        }
      },
      loop: true,
    })
  }

  consumeEnergy(energy) {
    this.energy = Phaser.Math.Clamp(this.energy - energy, 0, this.maxEnergy)
    this.updateEnergyBar()
  }

  updateEnergyBar() {
    const energyPercentage = this.energy / this.maxEnergy
    this.energyBar.clear()
    this.energyBar.fillStyle(0xffffff, 0.5);
    this.energyBar.fillRect(10, 10, 100 * energyPercentage, 20)
    this.energyText.text = `${this.energy}↯`
  }

  destroy() {
    this.energyRegenEvent.remove()
  }
}