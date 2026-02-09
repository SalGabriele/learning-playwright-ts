import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import {getEnv} from '../utils/env';

let loginPage: LoginPage;
const standardUser = getEnv('STANDARD_USER');
const lockedOutUser = getEnv('LOCKED_OUT_USER');
const problemUser = getEnv('PROBLEM_USER');
const performanceGlitchUser = getEnv('PERFORMANCE_GLITCH_USER');
const errorUser = getEnv('ERROR_USER');
const visualUser = getEnv('VISUAL_USER');
const password = getEnv('PASSWORD');


test.beforeAll(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login with valid credentials', async ({ page }) => {
  await loginPage.login(standardUser, password);
  await expect(page).toHaveURL(/inventory/);
});

test('login with locked out user', async ({ page }) => {
  await loginPage.login(lockedOutUser, password);
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});
  
test('login with problem user', async ({ page }) => {
  await loginPage.login(problemUser, password);
  await expect(page).toHaveURL(/inventory/);
});

test('login with performance glitch user', async ({ page }) => {
  await loginPage.login(performanceGlitchUser, password);
  await expect(page).toHaveURL(/inventory/);
});

test('login with error user', async ({ page }) => {
  await loginPage.login(errorUser, password);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login with visual user', async ({ page }) => {
  await loginPage.login(visualUser, password);
  await expect(page).toHaveURL(/inventory/);
});