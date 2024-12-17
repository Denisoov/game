export default class EnergyManager {
  constructor(scene) {
    this.scene = scene

    this.energyBar
    this.energyText
    this.energyRegenEvent

    this.energy = 25
    this.maxEnergy = 50
    this.energyRegenRate = 1
    this.delay = 15000
  }

  DEFAULT_STYLE = {
    fontSize: '14px',
    fill: '#fff',
    fontFamily: 'Arial', 
  }

  initEnergy() {
    let energy = localStorage.getItem('energy')

    if (!energy) energy = this.maxEnergy

    this.energy = Number(energy)
  }

  create() {
    this.initEnergy()

    this.energyBarBorder = this.scene.add.image(70, 40, 'energy-tab').setScale(0.2).setOrigin(0.5)

    this.energyText = this.scene.add.text(60, this.energyBarBorder.height * 0.2 / 1.7, `${this.energy}↯`, this.DEFAULT_STYLE)
    this.energyText.setOrigin(0, 0).setDepth(1)

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

    localStorage.setItem('energy', this.energy)
  }

  updateEnergyBar() {

    this.energyText.text = `${this.energy} / 50↯`
  }

  destroy() {
    this.energyRegenEvent.remove()
  }
}