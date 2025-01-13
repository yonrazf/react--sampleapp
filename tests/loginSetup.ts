import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async typeInInput(inputLocator: string, text: string) {
    await this.page.fill(inputLocator, text);
  }

  async clickButton(buttonLocator: string, options = {}) {
    await this.page.click(buttonLocator, options);
  }

  async goToPageViaURL(link: string): Promise<void> {
    await this.page.goto(link);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async pressEnter(submitLocator: string) {
    await this.page.press(submitLocator, "Enter");
  }

  async pressLocatorEnter(submitLocator: Locator) {
    await submitLocator.press("Enter");
  }
}

export class LoginSelectors {
  static EMAIL = 'input[name="identifier"]';
  static PASSWORD = 'input[name="password"]';
  static CONTINUE_BTN = 'button[data-test-id="submit-btn"]';
}

export class LoginPage extends BasePage {
  private TEST_USER_EMAIL = "mocked@frontegg.com";
  private TEST_USER_PASSWORD = "mockpassword";
  private LOGOUT_URL = "/account/logout";

  constructor(page: Page) {
    super(page);
  }

  async loginInWithPasswordAndSSO() {
    await this.typeInInput(LoginSelectors.EMAIL, this.TEST_USER_EMAIL);
    await this.pressContinue();
    await this.typeInInput(LoginSelectors.PASSWORD, this.TEST_USER_PASSWORD);
    await this.pressContinue();
  }

  async pressContinue() {
    await this.pressEnter(LoginSelectors.CONTINUE_BTN);
  }

  async logoutToLogin() {
    await this.goToPageViaURL(this.LOGOUT_URL);
  }
}
