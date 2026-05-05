import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByRole('heading');
        this.emailInput = page.getByRole('textbox', { name: 'Enter mobile number or email' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
    }

    async verifyLoginPageLoaded(): Promise<void> {
        await expect(this.pageHeading).toContainText('Sign in or create account');
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickSignIn(): Promise<void> {
        await this.signInButton.click();
    }

    async login(email: string, password: string): Promise<void> {
        await this.verifyLoginPageLoaded();
        await this.enterEmail(email);
        await this.clickContinue();
        await this.enterPassword(password);
        await this.clickSignIn();
    }
}
