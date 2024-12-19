export default class StorePromoManager {
  constructor(scene) {
    this.scene = scene

    this.isOpenDialogPromo = false

    this.shadow
    this.items
    this.dialogCloseIcon
    this.dialogBackground
    this.dialogContainer
    this.backgroundButtonBuy
    this.titleButtonBuy
  }

  items = [
    { name: 'Скидка 5% от 1500 руб.', price: '400', promo: 'OMG' },
    { name: 'Слив. с лососем в подарок от 1000 руб.', price: '600', promo: 'WOW' },
    { name: '10% скидка от 500 руб.', price: '800', promo: 'SUPER PUPER' }
  ]

  playSoundClick() {
    const sound = this.scene.sound.add('click-to-platform', { volume: 0.4 })
    sound.play()
    sound.once('complete', () => sound.destroy())
  }

  playSoundBuy() {
    const sound = this.scene.sound.add('buy', { volume: 0.4 })
    sound.play()
    sound.once('complete', () => sound.destroy())
  }

  createButtonPromo() {
    this.buttonPromo = this.scene.add.image(50,0, 'button-promo').setScale(0.2).setInteractive()
    this.buttonPromo.y = this.scene.energyManager.energyBarBorder.y + 100
    this.buttonPromo.on('pointerdown', () => {
      this.playSoundClick()
      this.openDialogPromo()
      this.isOpenDialogPromo = true
    })

    this.buttonBonus = this.scene.add.image(50,0, 'button-bonus').setScale(0.2)
    //
    this.buttonBonus.y = this.buttonPromo.height * 0.2 + 150
  }

  openDialogAccessPromo(promo) {
    // Создаем фоновую панель для диалогового окна
    const dialogWidth = this.scene.sys.game.config.width - 40
    const dialogHeight = 450
    const dialogX = (this.scene.sys.game.config.width - dialogWidth) / 2
    const dialogY = (this.scene.sys.game.config.height - dialogHeight) / 2

    // Создаем полупрозрачный фон
    this.shadow = this.scene.add.rectangle(0, 0, Number(this.scene.sys.game.config.width), Number(this.scene.sys.game.config.height), 0x000000, 0.8)
      .setOrigin(0)
      .setDepth(10)
      .setInteractive() // Делаем его интерактивным, чтобы игнорировать клики
      .on('pointerdown', () => {}) // Игнорируем клики на потемнении


    this.dialogContainer = this.scene.add.container(dialogX, dialogY).setDepth(11)

    // Создаем спрайт с текстурой
    this.dialogBackground = this.scene.add.sprite(0, 0, 'background-dialog')
      .setOrigin(0) // Устанавливаем точку отсчета в верхний левый угол
      .setDisplaySize(dialogWidth, dialogHeight) // Устанавливаем размеры спрайта


    this.dialogCloseIcon = this.scene.add.image(dialogWidth, dialogY + 15, 'dialog-close')
      .setDepth(11)
      .setScale(0.2)
      .setOrigin(0.5)
      .setInteractive()

      .on('pointerdown', () => {
        this.closeDialogPromoSuccess()
        this.playSoundClick()
      })


    // Добавляем текст заголовка
    const titleSuccess = this.scene.add.text(dialogWidth / 2, 70, 'Успешно!', {
      fontSize: '32px',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fill: '#fff',
      stroke: '#000',
    }).setDepth(11).setOrigin(0.5)

    // Добавляем текст описания
    const descriptionPromo = this.scene.add.text(dialogWidth / 2, 150, 'ваш промокод:', {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#fff',
      stroke: '#000',
    }).setDepth(11).setOrigin(0.5)

    // Добавляем текст промокода
    const promocode = this.scene.add.text(dialogWidth / 2, 0, `${promo.promo}`, {
      fontSize: '40px',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 4
    }).setDepth(11).setOrigin(0.5)

    promocode.y = descriptionPromo.y + promocode.height

    // Добавляем текст цены
    const charter = this.scene.add.image(dialogWidth , 0, 'charter-promo').setDepth(11).setOrigin(0.5).setScale(0.2)

    charter.y = promocode.y + (charter.height * 0.13)
    charter.x = dialogWidth - (charter.width * 0.2)

    this.dialogContainer.add(this.dialogBackground)
    this.dialogContainer.add(titleSuccess)
    this.dialogContainer.add(descriptionPromo)
    this.dialogContainer.add(promocode)
    this.dialogContainer.add(charter)

  }

  checkBuyPromo(promo) {
    this.closeDialogPromo()

    this.openDialogAccessPromo(promo)
  }

  openDialogPromo() {
    // Создаем фоновую панель для диалогового окна
    const dialogWidth = this.scene.sys.game.config.width - 40
    const dialogHeight = 450
    const dialogX = (this.scene.sys.game.config.width - dialogWidth) / 2
    const dialogY = (this.scene.sys.game.config.height - dialogHeight) / 2

    // Создаем полупрозрачный фон
    this.shadow = this.scene.add.rectangle(0, 0, Number(this.scene.sys.game.config.width), Number(this.scene.sys.game.config.height), 0x000000, 0.8)
      .setOrigin(0)
      .setDepth(10)
      .setInteractive() // Делаем его интерактивным, чтобы игнорировать клики
      .on('pointerdown', () => {}) // Игнорируем клики на потемнении

    this.dialogContainer = this.scene.add.container(dialogX, dialogY).setDepth(11);

    // Создаем задний фон с текстурой
    this.dialogBackground = this.scene.add.sprite(0, 0, 'background-dialog')
      .setOrigin(0) // Устанавливаем точку отсчета в верхний левый угол
      .setDisplaySize(dialogWidth, dialogHeight); // Устанавливаем размеры спрайта

    this.dialogContainer.add(this.dialogBackground)

    const cardHeight = 100;
    const cardSpacing = 20;

    this.dialogCloseIcon = this.scene.add.image(dialogWidth, dialogY + 15, 'dialog-close')
      .setDepth(11)
      .setScale(0.2)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.playSoundClick()
        this.closeDialogPromo()
      })

    this.items.forEach((item, index) => {
      const cardY = 50 + index * (cardHeight + cardSpacing); // Расчет Y позиции карточки

      // Создаем фон карточки
      const cardBackground = this.scene.add.image(dialogX + 20, cardY, 'background-item')
        .setOrigin(0, 0).setDepth(11).setDisplaySize(dialogWidth - 80, cardHeight)

      const paddingXTitle = cardBackground.x + 30
      const paddingXPrice = cardBackground.x + 50

      // Добавляем текст названия
      const nameText = this.scene.add.text(paddingXTitle, cardY + 10, item.name, {
        fontSize: '14px',
        fontFamily: 'Arial',
        fill: '#fff',
        align: 'center',
        stroke: '#7e340b', // Цвет обводки
        strokeThickness: 4
      })


      // Добавляем текст цены
      const coinImage = this.scene.add.image(paddingXPrice, cardY + 60, 'coin')
        .setDepth(11).setDisplaySize(40, 40)

      const paddingXPriceText = coinImage.x + 30

      // Добавляем текст цены
      const priceText = this.scene.add.text(paddingXPriceText, cardY + 50, item.price, {
        fontSize: '20px',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fill: '#fff'
      });

      // Добавляем все элементы в контейнер
      this.dialogContainer.add([cardBackground, nameText, priceText, coinImage])

      if (this.scene.scoreManager.score >= item.price) {
        // Добавляем задний фон кнопки
        this.backgroundButtonBuy = this.scene.add.image(dialogWidth - 90, cardY + 60, 'button-buy')
          .setDepth(11).setInteractive().setScale(0.11).setOrigin(0.5).on('pointerdown', () => {
            this.playSoundBuy()
            this.checkBuyPromo(item)
        })

        // Создаем кнопку
        this.titleButtonBuy = this.scene.add.text(dialogX + dialogWidth - 150, cardY + 50, 'Купить', {
          fontSize: '20px',
          fontFamily: 'Arial',
          fill: '#fff',
          padding: { y: -2 },
          align: 'center'
        })

        this.dialogContainer.add([this.backgroundButtonBuy, this.titleButtonBuy])
      } else {

        // Создаем кнопку
        this.titleButtonBuy = this.scene.add.text(dialogX + dialogWidth - 160, cardY + 50, 'Не хватает', {
          fontSize: '16px',
          fontFamily: 'Arial',
          fill: '#ff0000',
          align: 'center',
          stroke: '#7e340b', // Цвет обводки
          strokeThickness: 4
        }).setOrigin(0)

        this.dialogContainer.add([this.titleButtonBuy])

      }
    })

    this.dialogContainer.add(this.dialogBackground)
  }

  closeDialogPromo() {
    this.isOpenDialogPromo = false
    this.shadow.destroy()
    this.dialogBackground.destroy()
    this.dialogCloseIcon.destroy()
    this.dialogContainer.destroy(); // Удаляем контейнер, который содержит все элементы диалога
  }

  closeDialogPromoSuccess() {
    this.shadow.destroy()
    this.dialogBackground.destroy()
    this.dialogCloseIcon.destroy()
    this.dialogContainer.destroy() // Удаляем контейнер, который содержит все элементы диалога
  }

  create() {}

  destroy() {
  }
}