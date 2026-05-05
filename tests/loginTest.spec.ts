import { test } from '@playwright/test';
import { HomePage, LoginPage } from '../pages';

test('Login to Amazon India', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Navigate to Amazon India
    await homePage.navigate();
    await homePage.verifySignInPrompt();

    // Click sign in and login
    await homePage.clickSignIn();
    await loginPage.login('8999378484', 'Pass@12345#');

    // Verify successful login
    await homePage.verifyUserLoggedIn('Sanket');
});
