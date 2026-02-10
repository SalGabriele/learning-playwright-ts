import {type Locator, type Page} from '@playwright/test';
import { assert } from 'node:console';
import {expect} from '@playwright/test';
import { Product, products } from '../fixtures/product';

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

    assertProducts = async () => {
        (await this.productItems.all()).forEach(async (product) => {
            const name = await product.getByRole('heading').innerText();
            const description = await product.getByTestId('product-description').innerText();
            const price = await product.getByTestId('product-price').innerText();
            const addToCartButton = product.getByRole('button', { name: 'Add to cart' });

            const productItem:Product = { name, description, price, addToCartButton };
            this.assertProduct(productItem);
        });
    }

    assertProduct = async (product: Product) => {
        const expectedProduct = products.find(p => p.name === product.name);
        assert(expectedProduct, `Product with name ${product.name} not found in fixtures`);
        expect(product.description).toBe(expectedProduct?.description);
        expect(product.price).toBe(expectedProduct?.price);
        expect(product.addToCartButton).toBeTruthy();
    }
}

export class ProductItem {
    readonly product: Locator;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;
    readonly addToCartButton: Locator;

    constructor(product: Locator) {
        this.product = product;
        this.name = product.getByRole('heading');
        this.description = product.getByTestId('product-description');
        this.price = product.getByTestId('product-price');
        this.addToCartButton = product.getByRole('button', { name: 'Add to cart' });
    }
}