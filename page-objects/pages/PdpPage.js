import {Selector, t} from 'testcafe'

class PdpPage {
	constructor() {
		this.addToCartButton = Selector('span[key="frontend.cta.add_to_cart"]')
		this.watchItemButton = Selector('ah-istext[key="frontend.cta.watch"]')
	}
}

export default PdpPage
