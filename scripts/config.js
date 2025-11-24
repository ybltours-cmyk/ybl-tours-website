// config.js - Environment-based configuration
const CONFIG = {
    AMADEUS: {
        BASE_URL: 'https://test.api.amadeus.com/v1',
        // These should be set in your environment variables
        API_KEY: process.env.AMADEUS_API_KEY || '',
        API_SECRET: process.env.AMADEUS_API_SECRET || ''
    },
    APP: {
        NAME: 'YBL Tours',
        VERSION: '1.0.0'
    }
};