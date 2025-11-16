// Search functionality for YBL TOURS

class SearchEngine {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeAutoComplete();
    }

    bindEvents() {
        // Flight search form
        const flightForm = document.getElementById('flights-form');
        if (flightForm) {
            flightForm.addEventListener('submit', (e) => this.handleFlightSearch(e));
        }

        // Hotel search form
        const hotelForm = document.getElementById('hotels-form');
        if (hotelForm) {
            hotelForm.addEventListener('submit', (e) => this.handleHotelSearch(e));
        }

        // Real-time validation
        this.setupRealTimeValidation();
    }

    initializeAutoComplete() {
        // Flight from/to autocomplete
        const flightFrom = document.getElementById('flight-from');
        const flightTo = document.getElementById('flight-to');
        
        if (flightFrom) {
            this.setupAirportAutoComplete(flightFrom);
        }
        if (flightTo) {
            this.setupAirportAutoComplete(flightTo);
        }

        // Hotel destination autocomplete
        const hotelDestination = document.getElementById('hotel-destination');
        if (hotelDestination) {
            this.setupCityAutoComplete(hotelDestination);
        }
    }

    setupAirportAutoComplete(input) {
        // Simple airport/city data (to be replaced with API)
        const airports = [
            'New York (JFK)', 'Los Angeles (LAX)', 'Chicago (ORD)', 'Miami (MIA)',
            'London (LHR)', 'Paris (CDG)', 'Dubai (DXB)', 'Singapore (SIN)',
            'Tokyo (NRT)', 'Sydney (SYD)', 'Delhi (DEL)', 'Mumbai (BOM)'
        ];

        input.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            const suggestions = airports.filter(airport => 
                airport.toLowerCase().includes(value)
            );
            
            this.showAutoCompleteSuggestions(input, suggestions);
        });
    }

    setupCityAutoComplete(input) {
        const cities = [
            'New York', 'London', 'Paris', 'Dubai', 'Singapore', 'Tokyo',
            'Sydney', 'Bangkok', 'Istanbul', 'Rome', 'Barcelona', 'Amsterdam',
            'Kerala', 'Goa', 'Kashmir', 'Switzerland', 'Bhutan'
        ];

        input.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            const suggestions = cities.filter(city => 
                city.toLowerCase().includes(value)
            );
            
            this.showAutoCompleteSuggestions(input, suggestions);
        });
    }

    showAutoCompleteSuggestions(input, suggestions) {
        // Remove existing suggestions
        const existingList = input.parentNode.querySelector('.autocomplete-list');
        if (existingList) {
            existingList.remove();
        }

        if (suggestions.length === 0 || !input.value) return;

        const list = document.createElement('ul');
        list.className = 'autocomplete-list';
        
        suggestions.forEach(suggestion => {
            const item = document.createElement('li');
            item.textContent = suggestion;
            item.addEventListener('click', () => {
                input.value = suggestion;
                list.remove();
            });
            list.appendChild(item);
        });

        input.parentNode.appendChild(list);
    }

    async handleFlightSearch(e) {
        e.preventDefault();
        
        const formData = {
            from: document.getElementById('flight-from').value,
            to: document.getElementById('flight-to').value,
            depart: document.getElementById('flight-depart').value,
            return: document.getElementById('flight-return').value,
            passengers: document.getElementById('flight-passengers').value,
            class: document.getElementById('flight-class').value
        };

        // Validation
        if (!this.validateFlightSearch(formData)) {
            return;
        }

        // Show loading state
        const submitButton = e.target.querySelector('.btn-search');
        const originalText = submitButton.textContent;
        showLoading(submitButton);

        try {
            // Simulate API call (replace with actual API)
            const results = await this.searchFlightsAPI(formData);
            this.displayFlightResults(results);
        } catch (error) {
            showError('Failed to search flights. Please try again.');
        } finally {
            hideLoading(submitButton, originalText);
        }
    }

    async handleHotelSearch(e) {
        e.preventDefault();
        
        const formData = {
            destination: document.getElementById('hotel-destination').value,
            checkin: document.getElementById('hotel-checkin').value,
            checkout: document.getElementById('hotel-checkout').value,
            rooms: document.getElementById('hotel-rooms').value,
            guests: document.getElementById('hotel-guests').value
        };

        if (!this.validateHotelSearch(formData)) {
            return;
        }

        const submitButton = e.target.querySelector('.btn-search');
        const originalText = submitButton.textContent;
        showLoading(submitButton);

        try {
            const results = await this.searchHotelsAPI(formData);
            this.displayHotelResults(results);
        } catch (error) {
            showError('Failed to search hotels. Please try again.');
        } finally {
            hideLoading(submitButton, originalText);
        }
    }

    validateFlightSearch(data) {
        if (!data.from) {
            showError('Please enter departure city');
            return false;
        }
        if (!data.to) {
            showError('Please enter destination city');
            return false;
        }
        if (!data.depart) {
            showError('Please select departure date');
            return false;
        }
        return true;
    }

    validateHotelSearch(data) {
        if (!data.destination) {
            showError('Please enter destination');
            return false;
        }
        if (!data.checkin) {
            showError('Please select check-in date');
            return false;
        }
        if (!data.checkout) {
            showError('Please select check-out date');
            return false;
        }
        return true;
    }

    // Mock API functions (replace with real API calls)
    async searchFlightsAPI(params) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        return [
            {
                airline: 'Emirates',
                flightNumber: 'EK 202',
                departure: { time: '08:00', airport: params.from },
                arrival: { time: '11:00', airport: params.to },
                duration: '3h',
                price: 450,
                stops: 0
            },
            {
                airline: 'Qatar Airways',
                flightNumber: 'QR 115',
                departure: { time: '14:30', airport: params.from },
                arrival: { time: '18:45', airport: params.to },
                duration: '4h 15m',
                price: 380,
                stops: 1
            }
        ];
    }

    async searchHotelsAPI(params) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return [
            {
                name: 'Grand Hotel',
                location: params.destination,
                rating: 4.5,
                price: 120,
                image: 'images/hotels/hotel1.jpg',
                amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
            },
            {
                name: 'Seaside Resort',
                location: params.destination,
                rating: 4.2,
                price: 95,
                image: 'images/hotels/hotel2.jpg',
                amenities: ['WiFi', 'Beach', 'Bar', 'Gym']
            }
        ];
    }

    displayFlightResults(flights) {
        // Redirect to flights page with results or show in modal
        sessionStorage.setItem('flightSearchResults', JSON.stringify(flights));
        window.location.href = 'pages/flights.html';
    }

    displayHotelResults(hotels) {
        sessionStorage.setItem('hotelSearchResults', JSON.stringify(hotels));
        window.location.href = 'pages/hotels.html';
    }

    setupRealTimeValidation() {
        // Add real-time validation for all form inputs
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                this.validateInput();
            });
        });
    }
}

// Extend HTMLInputElement prototype for validation
HTMLInputElement.prototype.validateInput = function() {
    const value = this.value.trim();
    
    if (this.hasAttribute('required') && !value) {
        this.style.borderColor = 'var(--secondary-color)';
        return false;
    }
    
    if (this.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.style.borderColor = 'var(--secondary-color)';
            return false;
        }
    }
    
    this.style.borderColor = '#ddd';
    return true;
};

// Initialize search engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SearchEngine();
});