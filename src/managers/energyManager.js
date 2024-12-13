export default class EnergyManager {
  constructor(scene) {
    this.scene = scene

    this.energyBar
    this.energyText
    this.energyRegenEvent

    this.energy = 14
    this.maxEnergy = 25
    this.energyRegenRate = 1
    this.delay = 15000
  }

  DEFAULT_STYLE = {
    fontSize: '14px',
    fill: '#fff',
    fontFamily: 'Arial', 
  }

  create() {
    this.energyBarBorder = this.scene.add.image(70, 40, 'energy-tab').setScale(0.2).setOrigin(0.5)

    this.energyText = this.scene.add.text(60, this.energyBarBorder.height * 0.2 / 1.7, `${this.energy}↯`, this.DEFAULT_STYLE)
    this.energyText.setOrigin(0, 0).setDepth(1)

    this.buttonPromo = this.scene.add.image(50,0, 'button-promo').setScale(0.2)
    this.buttonPromo.y = this.energyBarBorder.y + 100

    this.buttonBonus = this.scene.add.image(50,0, 'button-bonus').setScale(0.2)

    this.buttonBonus.y = this.buttonPromo.height * 0.2 + 150

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

    this.energyText.text = `${this.energy} / 50↯`
  }

  destroy() {
    this.energyRegenEvent.remove()
  }
}