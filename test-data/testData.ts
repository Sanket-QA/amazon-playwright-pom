/**
 * Test Data Configuration
 * Update these values with your actual Amazon credentials before running tests
 */
export const TestData = {
    // Amazon Login Credentials
    credentials: {
        email: 'your_email@example.com',      // Replace with your Amazon email
        password: 'your_password',            // Replace with your Amazon password
    },

    // Search Terms
    searchTerms: {
        mobile: 'Mobile',
        smartphone: 'Smartphone',
        iphone: 'iPhone',
        samsung: 'Samsung Mobile',
    },

    // URLs
    urls: {
        baseUrl: 'https://www.amazon.in/',
        loginUrl: 'https://www.amazon.in/ap/signin',
    },

    // Timeouts
    timeouts: {
        pageLoad: 30000,
        elementVisible: 10000,
        networkIdle: 15000,
    }
};

export default TestData;
