import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import {getEnv} from '../utils/env';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
const standardUser = getEnv('STANDARD_USER');
const password = getEnv('PASSWORD');


test.beforeAll(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login with valid credentials', async ({ page }) => {
  await loginPage.login(standardUser, password);
  await expect(page).toHaveURL(/inventory/);
  await inventoryPage.assertProductCount(6);
});