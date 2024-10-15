const createDialog = () => {
	return `
		<div class="app-dialog">
			<div class="app-dialog__content">
				<h1 class="app-dialog__title">Dialog</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus eget</p>
			</div>
		</div>
	`
}

class Dialog {
	constructor() {
		this.dialogElement = createDialog()
		this.dialogNode = document.querySelector('.app-dialog')

	}

	mount() {
		document.body.insertAdjacentHTML('beforeend', this.dialogElement)
	}

	show() {
		this.dialogNode.classList.add('app-dialog--visible')
	}

	hide() {
		this.dialogNode.classList.remove('app-dialog--visible')
	}
}

const dialog = new Dialog()

window.dialog = dialog;



