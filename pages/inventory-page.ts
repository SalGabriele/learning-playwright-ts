import {type Locator, type Page} from '@playwright/test';
import { assert } from 'node:console';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly productItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByRole('heading', { name: 'Products' });
        this.productItems = page.getByTestId('inventory-item');
    }

    assertProductCount = async (expectedCount: number) => {
        const count = await this.productItems.count();
        assert(count === expectedCount, `Expected ${expectedCount} products, but found ${count}`);
    }
}