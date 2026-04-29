import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ROUTES } from "../constants/routes";

export class InventoryPage extends BasePage {
    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        super(page);

        this.pageTitle = page.locator('[data-test="title"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async expectLoaded(): Promise<void> {
        await this.expectUrlContains(ROUTES.INVENTORY);
        await expect(this.pageTitle).toHaveText('Products');
        await expect(this.inventoryItems).toHaveCount(6);
    }

    async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({ hasText: productName });

    await expect(product).toBeVisible();
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const product = this.inventoryItems.filter({ hasText: productName });

        await expect(product).toBeVisible();
        await product.getByRole('button', { name: 'Remove' }).click();
    }

    async expectCartBadgeCount(count: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(String(count));
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();

        return prices.map((price) => Number(price.replace('$', '')));
    }
}