import { Page, Locator } from '@playwright/test';

export interface ProductInfo {
    name: string;
    price: number;
    href: string;
}

export class SearchResultsPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByRole('searchbox', { name: 'Search Amazon' });
        this.searchButton = page.getByRole('button', { name: 'Go', exact: true });
        this.productCards = page.locator('[data-component-type="s-search-result"]');
    }

    async searchProduct(searchTerm: string): Promise<void> {
        await this.searchBox.click();
        await this.searchBox.fill(searchTerm);
        await this.searchButton.click();
        await this.page.waitForSelector('[data-component-type="s-search-result"]');
    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    async extractAllProductsWithPrices(): Promise<ProductInfo[]> {
        const products: ProductInfo[] = [];
        const count = await this.productCards.count();

        console.log(`Found ${count} products on the page`);

        for (let i = 0; i < count; i++) {
            const card = this.productCards.nth(i);

            // Get product name
            const nameElement = card.locator('h2 span').first();
            const name = await nameElement.textContent() || 'Unknown';

            // Get price - looking for whole price
            const priceElement = card.locator('.a-price-whole').first();
            const priceText = await priceElement.textContent().catch(() => null);

            if (priceText) {
                // Remove commas and convert to number
                const price = parseInt(priceText.replace(/,/g, '').trim());
                if (!isNaN(price) && price > 0) {
                    // Get href for opening in new tab later
                    const href = await this.extractProductLink(card);

                    if (href) {
                        products.push({ name: name.trim(), price, href });
                    }
                }
            }
        }

        console.log(`Extracted ${products.length} products with valid prices`);
        return products;
    }

    private async extractProductLink(card: Locator): Promise<string> {
        let href = '';

        // Try the product link (usually wraps the image or title)
        const productLink = card.locator('a.a-link-normal[href*="/dp/"]').first();
        const linkCount = await productLink.count();
        if (linkCount > 0) {
            href = await productLink.getAttribute('href').catch(() => '') || '';
        }

        // Fallback: try any anchor with href containing /dp/
        if (!href) {
            const anyLink = card.locator('a[href*="/dp/"]').first();
            const anyLinkCount = await anyLink.count();
            if (anyLinkCount > 0) {
                href = await anyLink.getAttribute('href').catch(() => '') || '';
            }
        }

        return href;
    }

    findLowestAndHighestPricedProducts(products: ProductInfo[]): { lowest: ProductInfo; highest: ProductInfo } {
        if (products.length === 0) {
            throw new Error('No products with prices found!');
        }

        let lowest = products[0];
        let highest = products[0];

        for (const product of products) {
            if (product.price < lowest.price) {
                lowest = product;
            }
            if (product.price > highest.price) {
                highest = product;
            }
        }

        return { lowest, highest };
    }

    printPriceAnalysis(lowest: ProductInfo, highest: ProductInfo): void {
        console.log('\n========================================');
        console.log('PRICE ANALYSIS (Without Amazon Filter)');
        console.log('========================================');
        console.log(`\nLOWEST PRICED MOBILE:`);
        console.log(`   Name: ${lowest.name}`);
        console.log(`   Price: Rs.${lowest.price.toLocaleString()}`);
        console.log(`\nHIGHEST PRICED MOBILE:`);
        console.log(`   Name: ${highest.name}`);
        console.log(`   Price: Rs.${highest.price.toLocaleString()}`);
        console.log('========================================\n');
    }

    buildFullUrl(href: string): string {
        return href.startsWith('http') ? href : `https://www.amazon.in${href}`;
    }
}
