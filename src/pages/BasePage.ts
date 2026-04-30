import { expect, Page } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectUrlContains(path: string) {
        await expect(this.page).toHaveURL(new RegExp(`${path}$`));
    }

    async expectPageTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }
}