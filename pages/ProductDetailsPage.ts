import { Page, Locator, BrowserContext } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly featureBullets: Locator;
    readonly bulletItems: Locator;
    readonly productDescription: Locator;

    constructor(page: Page) {
        this.page = page;
        this.featureBullets = page.locator('#feature-bullets');
        this.bulletItems = page.locator('#feature-bullets ul li span.a-list-item');
        this.productDescription = page.locator('#productDescription p, #productDescription span');
    }

    static async openInNewTab(context: BrowserContext, url: string): Promise<ProductDetailsPage> {
        const newPage = await context.newPage();
        await newPage.goto(url);
        await newPage.waitForLoadState('domcontentloaded');
        return new ProductDetailsPage(newPage);
    }

    async getAboutThisItemDetails(): Promise<string[]> {
        const details: string[] = [];

        try {
            // Wait for the "About this item" section
            await this.featureBullets.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});

            // Get all bullet points
            const bulletCount = await this.bulletItems.count();

            if (bulletCount > 0) {
                for (let i = 0; i < bulletCount; i++) {
                    const text = await this.bulletItems.nth(i).textContent();
                    if (text && text.trim()) {
                        details.push(text.trim());
                    }
                }
            } else {
                // Try alternative selector for product description
                const descText = await this.productDescription.first().textContent().catch(() => null);
                if (descText) {
                    details.push(descText.trim());
                } else {
                    details.push('(About this item section not found)');
                }
            }
        } catch (error) {
            details.push('(Could not extract "About this item" details)');
        }

        return details;
    }

    async printAboutThisItem(label: string): Promise<void> {
        console.log(`\nABOUT THIS ITEM - ${label}:`);
        console.log('----------------------------------------');

        const details = await this.getAboutThisItemDetails();
        for (const detail of details) {
            console.log(`  - ${detail}`);
        }

        console.log('----------------------------------------');
    }

    async close(): Promise<void> {
        await this.page.close();
    }
}
