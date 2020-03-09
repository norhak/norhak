import {Selector, t} from 'testcafe'

class Header {
	constructor() {
		this.cartInHeader = Selector('svg-icon[name="cart"]')
	}
}

export default Header
