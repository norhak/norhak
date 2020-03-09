import PdpPage from '../page-objects/pages/PdpPage'
import MiniCartPage from '../page-objects/components/MiniCartPage'
import Header from '../page-objects/components/Header'
import CheckoutPage from '../page-objects/pages/CheckoutPage'
import {guestUser, visaSecure} from '../config/testData'

const pdpPage = new PdpPage()
const miniCartPage = new MiniCartPage()
const header = new Header()
const checkoutPage = new CheckoutPage()

const url_mugg = 'Inredning/kok/tallrikar-assietter-15035/ahlens-tallrik-bistro-o-27-cm-vit-44500551/'

//prettier-ignore
fixture('Test verifying payment methods for a guest')
    .page(process.env.BASE_URL + url_mugg)

test('Guest is paying with VISA', async t => {
	await t.click(pdpPage.addToCartButton)
	await t.click(header.cartInHeader)
	await miniCartPage.clickGoToCheckoutButton()
	await t.click(checkoutPage.shopAsGuestButton)

	await fillGuestDataForm()
	await checkoutPage.selectStore()
	await checkoutPage.payWithCreditCardSecure(visaSecure.cardNumber, visaSecure.expiryDate, visaSecure.cvc)
})

async function fillGuestDataForm() {
	await checkoutPage.fillGuestDataForm(
		guestUser.email,
		guestUser.givenName,
		guestUser.familyName,
		guestUser.adress,
		guestUser.postalCode,
		guestUser.city,
		guestUser.phone
	)
}
