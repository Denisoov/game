export default class StorePromoManager {
  constructor(scene) {
    this.scene = scene

    this.isOpenDialogPromo = false

    this.shadow
    this.items
    this.dialogCloseIcon
    this.dialogBackground
    this.dialogContainer
    this.cardBackground

  }

  createButtonPromo() {
    this.buttonPromo = this.scene.add.image(50,0, 'button-promo').setScale(0.2).setInteractive()
    this.buttonPromo.y = this.scene.energyManager.energyBarBorder.y + 100
    this.buttonPromo.on('pointerdown', () => {
      this.openDialogPromo()
      this.isOpenDialogPromo = true
    })

    this.buttonBonus = this.scene.add.image(50,0, 'button-bonus').setScale(0.2)
    //
    this.buttonBonus.y = this.buttonPromo.height * 0.2 + 150
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

    // Создаем спрайт с текстурой
    this.dialogBackground = this.scene.add.sprite(0, 0, 'background-dialog')
      .setOrigin(0) // Устанавливаем точку отсчета в верхний левый угол
      .setDisplaySize(dialogWidth, dialogHeight); // Устанавливаем размеры спрайта

    this.dialogContainer.add(this.dialogBackground)

    // Пример данных для карточек
    const items = [
      { name: 'Скидка 5% от 1500 руб.', price: '400' },
      { name: 'Слив. с лососем в подарок от 1000 руб.', price: '600' },
      { name: '10% скидка от 500 руб.', price: '800' }
    ]

    const cardHeight = 100;
    const cardSpacing = 20;

    this.dialogCloseIcon = this.scene.add.image(dialogWidth, dialogY + 15, 'dialog-close')
      .setDepth(11)
      .setScale(0.2)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.closeDialogPromo())

    items.forEach((item, index) => {
      const cardY = 50 + index * (cardHeight + cardSpacing); // Расчет Y позиции карточки

      // Создаем фон карточки
      this.cardBackground = this.scene.add.image(dialogX + 20, cardY, 'background-item')
        .setOrigin(0, 0).setDepth(11).setDisplaySize(dialogWidth - 80, cardHeight)

      const paddingXTitle = this.cardBackground.x + 30
      const paddingXPrice = this.cardBackground.x + 50

      // Добавляем текст названия
      const nameText = this.scene.add.text(paddingXTitle, cardY + 10, item.name, {
        fontSize: '14px',
        fontFamily: 'Arial',
        fill: '#fff',
        align: 'center',
        stroke: '#7e340b', // Цвет обводки
        strokeThickness: 4
      });

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

      // Создаем кнопку
      const buyButton = this.scene.add.text(dialogX + dialogWidth - 150, cardY + 50, 'Купить', {
        fontSize: '20px',
        fontFamily: 'Arial',
        fill: '#fff',
        backgroundColor: '#007bff',
        padding: { x: 10, y: 5 },
        align: 'center'
      })
        .setInteractive()
        .on('pointerdown', () => {
          // Логика покупки
          console.log(`Buying ${item.name}`);
        });

      // Добавляем все элементы в контейнер
      this.dialogContainer.add([this.cardBackground, nameText, priceText, buyButton, coinImage]);
    });

    this.dialogContainer.add(this.dialogBackground)
  }

  closeDialogPromo() {
    this.isOpenDialogPromo = false
    this.shadow.destroy()
    this.dialogBackground.destroy()
    this.dialogCloseIcon.destroy()
    this.cardBackground.destroy()

    this.dialogContainer.destroy(); // Удаляем контейнер, который содержит все элементы диалога
  }

  create() {}

  destroy() {
  }
}