class AmadeusAPI {
    constructor() {
        // YAHAN APNI API KEYS DALNA
        this.apiKey = MOwOO3nk14Rbt68aZO0jxmbDB4fybZJm;
        this.apiSecret = iGFj644VtPrGLAAz;
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    async getAccessToken() {
        if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        try {
            console.log("Getting new access token...");
            const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.apiSecret}`
            });

            const data = await response.json();
            console.log("Token response:", data);
            
            if (data.access_token) {
                this.accessToken = data.access_token;
                this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;
                return this.accessToken;
            } else {
                throw new Error('Failed to get access token: ' + (data.errorDescription || 'Unknown error'));
            }
        } catch (error) {
            console.error('Authentication error:', error);
            return null;
        }
    }

    // Airport search function
    async searchAirports(keyword) {
        const token = await this.getAccessToken();
        if (!token) {
            throw new Error('No access token available');
        }

        console.log("Searching airports for:", keyword);
        
        const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${encodeURIComponent(keyword)}&page[limit]=10`;
        console.log("API URL:", url);

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("API Response status:", response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error response:", errorText);
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log("Airport data received:", data);
            
            return data.data || [];
        } catch (error) {
            console.error("Search airports error:", error);
            throw error;
        }
    }
}

const amadeusAPI = new AmadeusAPI();