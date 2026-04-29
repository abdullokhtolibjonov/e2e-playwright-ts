import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../constants/routes';

type CustomerInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly summaryTotal: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.summaryTotal = page.locator('[data-test="total-label"]');
  }

  async expectInformationPageLoaded(): Promise<void> {
    await this.expectUrlContains(ROUTES.CHECKOUT_STEP_ONE);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
  }

  async fillCustomerInformation(customer: CustomerInfo): Promise<void> {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async expectOverviewPageLoaded(): Promise<void> {
    await this.expectUrlContains(ROUTES.CHECKOUT_STEP_TWO);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderComplete(message: string): Promise<void> {
    await this.expectUrlContains(ROUTES.CHECKOUT_COMPLETE);
    await expect(this.completeHeader).toHaveText(message);
  }
}