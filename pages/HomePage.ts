import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly accountMenu: Locator;
    readonly accountGreeting: Locator;
    readonly searchBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountMenu = page.locator('#nav-link-accountList');
        this.accountGreeting = page.locator('#nav-link-accountList-nav-line-1');
        this.searchBox = page.locator('#twotabsearchtextbox');
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://www.amazon.in/');
    }

    async clickSignIn(): Promise<void> {
        await this.accountGreeting.click();
    }

    async verifySignInPrompt(): Promise<void> {
        await expect(this.accountGreeting).toContainText('Hello, sign in');
    }

    async verifyUserLoggedIn(userName: string): Promise<void> {
        await expect(this.accountGreeting).toContainText(`Hello, ${userName}`);
    }

    async getAccountGreeting(): Promise<string> {
        const greeting = await this.accountGreeting.textContent();
        return greeting || '';
    }
}
