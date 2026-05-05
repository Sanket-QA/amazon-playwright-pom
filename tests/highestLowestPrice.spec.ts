import { test } from '@playwright/test';
import { HomePage, LoginPage, SearchResultsPage, ProductDetailsPage } from '../pages';

test.describe('Amazon Highest and Lowest Price Tests', () => {

    test.beforeEach(async ({ page }) => {
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

    test('Find Highest and Lowest Priced Product', async ({ page, context }) => {
        const searchResultsPage = new SearchResultsPage(page);

        // Step 1: Search Mobile in Search box and click on search button
        await searchResultsPage.searchProduct('Mobile');

        // Step 2: Extract all products with prices (without using Amazon filter)
        const products = await searchResultsPage.extractAllProductsWithPrices();

        // Step 3: Find lowest and highest priced products (without Amazon filter - manual comparison)
        const { lowest, highest } = searchResultsPage.findLowestAndHighestPricedProducts(products);

        // Step 4: Print price analysis
        searchResultsPage.printPriceAnalysis(lowest, highest);

        // Step 5: Click on Lowest priced product - Open in New Tab
        console.log('Opening LOWEST priced product in new tab...');
        const lowestUrl = searchResultsPage.buildFullUrl(lowest.href);
        const lowestProductPage = await ProductDetailsPage.openInNewTab(context, lowestUrl);
        await lowestProductPage.printAboutThisItem('LOWEST PRICED MOBILE');
        await lowestProductPage.close();

        // Step 6: Click on Highest priced product - Open in New Tab
        console.log('Opening HIGHEST priced product in new tab...');
        const highestUrl = searchResultsPage.buildFullUrl(highest.href);
        const highestProductPage = await ProductDetailsPage.openInNewTab(context, highestUrl);
        await highestProductPage.printAboutThisItem('HIGHEST PRICED MOBILE');
        await highestProductPage.close();

        console.log('Test completed successfully!');
    });
});
