import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import {getEnv} from '../utils/env';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
const standardUser = getEnv('STANDARD_USER');
const password = getEnv('PASSWORD');


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await page.goto('/');
  await loginPage.login(standardUser, password);
});

test('review product listing', async ({ page }) => {
  await inventoryPage.assertProductCount(6);
  await inventoryPage.assertProducts();
});