import {Selector, t} from 'testcafe'

class KlarnaWindow {
	constructor() {
		this.iframePayOverTimeContainer = Selector('#klarna-pay-over-time-main')
		this.paymentSelectionBaseInput = Selector('input[id*="installments-base_account"')
		this.klarnaContainerContinueButton = Selector('.MuiButton-label').withText('FORTSÄTT')
		this.iframePayOverTimeFullscreen = Selector('#klarna-pay-over-time-fullscreen')
		this.inputNationalIdNumber = Selector('#purchase-approval-national-identification-number')
		this.confirmNationalIdButton = Selector('#purchase-approval-continue')
		this.iframeKlarnaInvoiceFullscreen = Selector('#klarna-pay-later-fullscreen')
		this.iframeKlarnaInvoiceMain = Selector('#klarna-pay-later-main')
		this.klarnaInvoice14DaysButton = Selector('input[id*="installments-invoice"]')
	}

	//ignore-prettier
	async continueKlarnaAccountFlow(pnr) {
		await t
			.switchToIframe(this.iframePayOverTimeContainer)
			.click(this.paymentSelectionBaseInput)
			.switchToMainWindow()
			.click(this.klarnaContainerContinueButton)
			.switchToIframe(this.iframePayOverTimeFullscreen)
			.typeText(this.inputNationalIdNumber, pnr, {replace: true, paste: true})
			.click(this.confirmNationalIdButton)
			.switchToMainWindow()
	}

	//ignore-prettier
	async continueKlarnaInvoiceFlow(pnr) {
		await t
			.switchToIframe(this.iframeKlarnaInvoiceMain)
			.click(this.klarnaInvoice14DaysButton)
			.switchToMainWindow()
			.click(this.klarnaContainerContinueButton)
			.switchToIframe(this.iframeKlarnaInvoiceFullscreen)
			.typeText(this.inputNationalIdNumber, pnr, {replace: true, paste: true})
			.click(this.confirmNationalIdButton)
			.switchToMainWindow()
	}
}

export default KlarnaWindow
