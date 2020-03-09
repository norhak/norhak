import {Selector, t} from 'testcafe'

class MiniCartPage {
	constructor() {
		this.goToCheckoutDesktopButton = Selector('div[class*="palm-hidden"] > div:nth-of-type(2) > div > a')
		this.goToCheckoutMobileButton = Selector('div[class*="lap-and-up-hidden"] > div:nth-of-type(2) > a')
	}

	async clickGoToCheckoutButton() {
		if (t.browser.platform === 'mobile') {
			await t.click(this.goToCheckoutMobileButton)
		}
		if (t.browser.platform === 'desktop') {
			await t.click(this.goToCheckoutDesktopButton)
		}
	}
}

export default MiniCartPage
