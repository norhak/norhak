import {Selector, t} from 'testcafe'
import KlarnaWindow from '../components/KlarnaWindow'
import {creditCardCredentials} from '../../config/testData'

const klarnaWindow = new KlarnaWindow()

class CheckoutPage {
	constructor() {
		//Cart selectors

		//Customer info selector
		this.loginInputEmail = Selector('div[data-testid="login_email"] > div > input')
		this.loginInputPassword = Selector('div[data-testid="login_password"] > div > input')
		this.logInButton = Selector('span.MuiButton-label').withText('LOGGA IN')
		this.shopAsGuestButton = Selector('span').withText('HANDLA SOM GÄST')
		this.form_Email = Selector('#text-input-guestform-email')
		this.form_GivenName = Selector('#text-input-guestform-firstname')
		this.form_FamilyName = Selector('#text-input-guestform-surname')
		this.form_Address = Selector('#text-input-guestform-street')
		this.form_PostalCode = Selector('#text-input-guestform-zip')
		this.form_City = Selector('#text-input-guestform-address-2')
		this.form_Phone = Selector('#text-input-guestform-phone')
		this.form_ConfirmGuestDataButton = Selector('form > fieldset > button[class*="MuiButtonBase-root"]')
		this.editPenButton = Selector('button[data-testid="DisplayAddress_editFormLink"]')

		//Shipping section
		this.pickInStoreButton = Selector('span.MuiButton-label').withText('VÄLJ VARUHUS')
		this.radioPickInStore = Selector('input[value="PickUpInStore"')
		this.selectStoreFirstOption = Selector('div[class*="MuiDialogContent-root"] > ul > li:nth-child(1)')

		//Bonus
		this.useBonusButton = Selector('button[data-testid="singleBonusValueButton"]')

		//Gift card
		this.expandGiftCard = Selector('p').withText('Presentkort')
		this.giftCardInput = Selector('#text-input-giftcard-number')
		this.giftCardPin = Selector('#text-input-giftcard-code')
		this.giftCardActivateButton = Selector('span.MuiButton-label').withText('AKTIVERA')

		//Payment section
		this.klarnaInvoiceRadioButton = Selector('input[value="ADYEN_KLARNA_INVOICE"]')
		this.klarnaAccountRadioButton = Selector('input[value="ADYEN_KLARNA_ACCOUNT"]')
		this.creditCardRadioButton = Selector('input[value="ADYEN_CREDIT_CARD"]')
		this.swishRadioButton = Selector('input[value="ADYEN_SWISH"]')
		this.creditCardNumberIFrame = Selector('div[data-cse="encryptedCardNumber"] > iframe.js-iframe')
		this.creditCardNumber = Selector('#encryptedCardNumber')
		this.creditCardExpiryDateIFrame = Selector('div[data-cse="encryptedExpiryDate"] > iframe.js-iframe')
		this.creditCardExpiryDate = Selector('#encryptedExpiryDate')
		this.creditCardCVCIFrame = Selector('div[data-cse="encryptedSecurityCode"] > iframe.js-iframe')
		this.creditCardCVC = Selector('#encryptedSecurityCode')
		this.creditCardSecureUsername = Selector('#username')
		this.creditCardSecurePassword = Selector('#password')
		this.creditCardSecureSubmit = Selector('.button.paySubmit')
		this.finishPurchase = Selector('span.MuiButton-label').withText('SLUTFÖR')
		this.continuePurchaseSwish = Selector('span.MuiButton-label').withText('SWISH')
		this.continuePurchaseKlarna = Selector('span.MuiButton-label').withText('KLARNA')

		//Summary section
		this.bonusGiftcardLabel = Selector('dt').withText('Bonus/ Presentkort')
	}

	async fillGuestDataForm(email, givenName, familyName, address, postalCode, city, tel) {
		await t
			.typeText(this.form_Email, email, {paste: true, replace: true})
			.typeText(this.form_GivenName, givenName, {paste: true, replace: true})
			.typeText(this.form_FamilyName, familyName, {paste: true, replace: true})
			.typeText(this.form_Address, address, {paste: true, replace: true})
			.typeText(this.form_PostalCode, postalCode, {paste: true, replace: true})
			.typeText(this.form_City, city, {paste: true, replace: true})
			.typeText(this.form_Phone, tel, {paste: true, replace: true})
			.click(this.form_ConfirmGuestDataButton)
	}

	async memberLogin(email, password) {
		await t
			.typeText(this.loginInputEmail, email, {paste: true, replace: true})
			.typeText(this.loginInputPassword, password, {paste: true, replace: true})
			.click(this.logInButton)
	}

	//prettier-ignore
	async selectStore() {
			await t
				.wait(300)
				.click(this.pickInStoreButton)
				.click(this.selectStoreFirstOption)
		}

	async finishKlarnaAccountFlow(pnr) {
		await klarnaWindow.continueKlarnaAccountFlow(pnr)
	}

	async finishKlarnaInvoiceFlow(pnr) {
		await klarnaWindow.continueKlarnaInvoiceFlow(pnr)
	}

	async payWithCreditCardSecure(cardNumber, expiryDate, cvc) {
		await t
			.click(this.creditCardRadioButton)
			.switchToIframe(this.creditCardNumberIFrame)
			.typeText(this.creditCardNumber, cardNumber, {paste: true, replace: true})
			.switchToMainWindow()
			.switchToIframe(this.creditCardExpiryDateIFrame)
			.typeText(this.creditCardExpiryDate, expiryDate, {paste: true, replace: true})
			.switchToMainWindow()
			.switchToIframe(this.creditCardCVCIFrame)
			.typeText(this.creditCardCVC, cvc, {paste: true, replace: true})
			.switchToMainWindow()
			.click(this.finishPurchase)
			.typeText(this.creditCardSecureUsername, creditCardCredentials.user)
			.typeText(this.creditCardSecurePassword, creditCardCredentials.password)
	}

	async payWithGiftCard(giftCardNumber, pinCode) {
		await t
			.click(this.expandGiftCard)
			.typeText(this.giftCardInput, giftCardNumber, {paste: true, replace: true})
			.typeText(this.giftCardPin, pinCode, {paste: true, replace: true})
			.click(this.giftCardActivateButton)
			.wait(300) //Have to wait because of the lack of ID in SLUTFÖR KÖP button
	}
}

export default CheckoutPage
