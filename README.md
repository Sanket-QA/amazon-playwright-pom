# Amazon India Automation Project

## Overview
This project automates Amazon India website using Playwright with:
- Page Object Model (POM) design pattern
- Test Driven Development (TDD) approach
- test.step() for detailed test reporting

## Project Structure
```
amazon-playwright-pom/
├── pages/                      # Page Object Model classes
│   ├── HomePage.ts             # Amazon home page actions
│   ├── LoginPage.ts            # Login page actions
│   ├── SearchResultsPage.ts    # Search results with price finder
│   ├── ProductDetailsPage.ts   # Product details page
│   └── index.ts                # Page exports
├── tests/                      # Test specifications
│   ├── loginTest.spec.ts       # Login test scenarios
│   └── highestLowestPrice.spec.ts  # Price finder tests
├── test-data/                  # Test data configuration
│   └── testData.ts             # Credentials and test data
├── playwright.config.ts        # Playwright configuration
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

## Features

### Login Scenario with POM
- Automated login flow using Page Object Model
- Encapsulated page actions in separate classes
- Reusable methods for login operations

### Find Lowest and Highest Price
- Search for "Mobile" in Amazon search box
- Extract all products with prices without using Amazon filters
- Custom algorithm to find lowest and highest priced products
- Open both products in new tabs
- Print "About this item" details for each product

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Chromium browser (installed via Playwright)

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Configuration

### Update Test Credentials
Edit `test-data/testData.ts` with your Amazon credentials:
```typescript
credentials: {
    email: 'your_email@example.com',
    password: 'your_password',
}
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Login Tests Only
```bash
npm run test:login
```

### Run Price Finder Tests Only
```bash
npm run test:price
```

### Run Tests with Browser Visible
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests with Interactive UI
```bash
npm run test:ui
```

### View Test Report
```bash
npm run report
```

## Test Cases

### Login Tests (loginTest.spec.ts)
| Test ID | Description |
|---------|-------------|
| TC001 | Verify Amazon Home Page loads successfully |
| TC002 | Verify Login page navigation |
| TC003 | Verify Login with valid credentials |

### Price Finder Tests (highestLowestPrice.spec.ts)
| Test ID | Description |
|---------|-------------|
| TC001 | Search for Mobiles and display search results |
| TC002 | Find Lowest and Highest Priced Mobile (Without Amazon Filter) |

## Test Output Example

```
========================================
PRICE ANALYSIS (Without Amazon Filter)
========================================

LOWEST PRICED MOBILE:
   Name: [Product Name]
   Price: Rs.X,XXX

HIGHEST PRICED MOBILE:
   Name: [Product Name]
   Price: Rs.XX,XXX
========================================

ABOUT THIS ITEM - LOWEST PRICED MOBILE:
----------------------------------------
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]
----------------------------------------
```

## Page Object Model Structure

### HomePage
- `navigate()` - Go to Amazon India
- `clickSignIn()` - Click sign in button
- `verifySignInPrompt()` - Verify sign in prompt is displayed

### LoginPage
- `enterEmail()` - Enter email address
- `clickContinue()` - Click continue button
- `enterPassword()` - Enter password
- `clickSignIn()` - Submit login
- `login()` - Complete login flow

### SearchResultsPage
- `searchProduct()` - Search for a product
- `extractAllProductsWithPrices()` - Extract all products with prices
- `findLowestAndHighestPricedProducts()` - Find min and max price products
- `printPriceAnalysis()` - Print formatted price analysis
- `buildFullUrl()` - Build full URL for product

### ProductDetailsPage
- `openInNewTab()` - Open product in new tab
- `getAboutThisItemDetails()` - Get feature bullet points
- `printAboutThisItem()` - Print formatted details
- `close()` - Close the page

## Reports
- HTML Report: `playwright-report/index.html`
- JSON Report: `test-results/results.json`
- Screenshots: Captured on failure
- Videos: Retained on failure
- Traces: Available for debugging

## Author
Sanket Mohale

## License
ISC
