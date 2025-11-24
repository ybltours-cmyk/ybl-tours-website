// flights.js - Complete Flight Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Flight Search Initialized');
    
    // Initialize all flight search components
    initializeFlightSearch();
    initializeDatePickers();
    initializePassengerSelector();
    initializePopularDestinations();
    initializeAirportSearch();
});

// Main Flight Search Functionality
function initializeFlightSearch() {
    // Trip type switching
    const tripButtons = document.querySelectorAll('.trip-btn');
    const returnDateGroup = document.querySelector('.return-date-group');
    
    tripButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tripButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide return date based on trip type
            const tripType = this.getAttribute('data-trip');
            if (tripType === 'round-trip') {
                returnDateGroup.classList.remove('hidden');
                document.getElementById('returnDate').required = true;
            } else {
                returnDateGroup.classList.add('hidden');
                document.getElementById('returnDate').required = false;
            }
        });
    });

    // Form submission
    const searchForm = document.getElementById('flightSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleFlightSearch);
    }

    // Swap cities functionality
    initializeCitySwap();
}

// City Swap Functionality
function initializeCitySwap() {
    const swapBtn = document.createElement('button');
    swapBtn.innerHTML = '<i class="fas fa-exchange-alt"></i>';
    swapBtn.className = 'swap-btn';
    swapBtn.type = 'button';
    swapBtn.title = 'Swap destinations';
    
    // Find the form group container for departure airport
    const departureGroup = document.querySelector('.form-group:has(#departureAirport)');
    if (departureGroup) {
        departureGroup.classList.add('input-with-swap');
        departureGroup.appendChild(swapBtn);
        
        swapBtn.addEventListener('click', function() {
            const fromInput = document.getElementById('departureAirport');
            const toInput = document.getElementById('arrivalAirport');
            
            if (fromInput && toInput) {
                // Swap values
                const temp = fromInput.value;
                fromInput.value = toInput.value;
                toInput.value = temp;
                
                // Trigger input event to refresh suggestions
                fromInput.dispatchEvent(new Event('input'));
                toInput.dispatchEvent(new Event('input'));
            }
        });
    }
}

// Date Picker Functionality
function initializeDatePickers() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const departDate = document.getElementById('departureDate');
    const returnDate = document.getElementById('returnDate');
    
    if (departDate) {
        departDate.min = today;
        
        // Set default departure date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        departDate.value = tomorrow.toISOString().split('T')[0];
    }
    
    if (returnDate) {
        returnDate.min = today;
        
        // Auto-set return date when departure date is selected
        if (departDate) {
            departDate.addEventListener('change', function() {
                const departureDateValue = this.value;
                
                if (departureDateValue) {
                    returnDate.min = departureDateValue;
                    
                    // Auto-set return date to 7 days after departure
                    if (!returnDate.value || returnDate.value < departureDateValue) {
                        const departure = new Date(departureDateValue);
                        departure.setDate(departure.getDate() + 7);
                        const defaultReturn = departure.toISOString().split('T')[0];
                        returnDate.value = defaultReturn;
                    }
                }
            });
            
            // Trigger change event to set initial return date
            departDate.dispatchEvent(new Event('change'));
        }
    }
}

// Passenger Selector Functionality
function initializePassengerSelector() {
    const passengerDisplay = document.getElementById('passengers-display');
    const passengerDropdown = document.getElementById('passengerDropdown');
    const passengerDone = document.getElementById('passengerDone');
    
    if (!passengerDisplay || !passengerDropdown || !passengerDone) {
        console.warn('Passenger selector elements not found');
        return;
    }
    
    let adults = 1;
    let children = 0;
    let infants = 0;
    
    // Toggle dropdown
    passengerDisplay.addEventListener('click', function(e) {
        e.stopPropagation();
        passengerDropdown.classList.toggle('show');
    });
    
    // Passenger controls
    document.querySelectorAll('.passenger-btn').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const action = this.getAttribute('data-action');
            
            updatePassengerCount(type, action);
        });
    });
    
    // Done button
    passengerDone.addEventListener('click', function() {
        updatePassengerDisplay();
        passengerDropdown.classList.remove('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!passengerDisplay.contains(e.target) && !passengerDropdown.contains(e.target)) {
            passengerDropdown.classList.remove('show');
        }
    });
    
    function updatePassengerCount(type, action) {
        const countElement = document.getElementById(`${type}-count`);
        let count = parseInt(countElement.textContent);
        
        if (action === 'increase') {
            // Maximum limits
            if (type === 'adults' && count < 9) count++;
            else if (type === 'children' && count < 8) count++;
            else if (type === 'infants' && count < adults) count++; // Infants can't exceed adults
        } else if (action === 'decrease') {
            // Minimum limits
            if (count > 0) {
                if (type === 'adults' && count > 1) count--; // At least 1 adult
                else if (type !== 'adults') count--;
            }
        }
        
        // Update infant limit based on adults
        if (type === 'adults') {
            const infantsCount = document.getElementById('infants-count');
            const currentInfants = parseInt(infantsCount.textContent);
            if (currentInfants > count) {
                infantsCount.textContent = count;
                infants = count;
            }
        }
        
        countElement.textContent = count;
        
        // Update variables
        adults = parseInt(document.getElementById('adults-count').textContent);
        children = parseInt(document.getElementById('children-count').textContent);
        infants = parseInt(document.getElementById('infants-count').textContent);
        
        // Update buttons disabled state
        updatePassengerButtons();
    }
    
    function updatePassengerButtons() {
        document.querySelectorAll('.passenger-btn').forEach(button => {
            const type = button.getAttribute('data-type');
            const action = button.getAttribute('data-action');
            const count = parseInt(document.getElementById(`${type}-count`).textContent);
            
            if (action === 'decrease') {
                if (type === 'adults') {
                    button.disabled = count <= 1;
                } else {
                    button.disabled = count <= 0;
                }
            } else if (action === 'increase') {
                if (type === 'adults') {
                    button.disabled = count >= 9;
                } else if (type === 'children') {
                    button.disabled = count >= 8;
                } else if (type === 'infants') {
                    button.disabled = count >= adults;
                }
            }
        });
    }
    
    function updatePassengerDisplay() {
        let displayText = `${adults} Adult${adults > 1 ? 's' : ''}`;
        if (children > 0) displayText += `, ${children} Child${children > 1 ? 'ren' : ''}`;
        if (infants > 0) displayText += `, ${infants} Infant${infants > 1 ? 's' : ''}`;
        
        passengerDisplay.value = displayText;
    }
    
    // Initialize buttons state
    updatePassengerButtons();
    updatePassengerDisplay();
}

// Popular Destinations
function initializePopularDestinations() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const fromCity = this.getAttribute('data-from');
            const toCity = this.getAttribute('data-to');
            
            if (!fromCity || !toCity) return;
            
            // Set form values
            const fromInput = document.getElementById('departureAirport');
            const toInput = document.getElementById('arrivalAirport');
            
            if (fromInput) fromInput.value = fromCity;
            if (toInput) toInput.value = toCity;
            
            // Set departure date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const departDateInput = document.getElementById('departureDate');
            if (departDateInput) {
                departDateInput.value = tomorrow.toISOString().split('T')[0];
            }
            
            // Trigger date change to update return date
            if (departDateInput) {
                departDateInput.dispatchEvent(new Event('change'));
            }
            
            // Show success message
            showNotification(`Pre-filled ${fromCity} to ${toCity}`, 'success');
        });
    });
}

// Airport Search Functionality
function initializeAirportSearch() {
    const airportInputs = document.querySelectorAll('.airport-search');
    
    airportInputs.forEach(input => {
        // Create suggestions dropdown
        const dropdown = createSuggestionsDropdown(input);
        
        input.addEventListener('input', function() {
            const query = this.value.trim();
            
            if (query.length < 2) {
                dropdown.classList.remove('show');
                return;
            }
            
            // Show loading
            dropdown.innerHTML = '<div class="suggestion-item">Searching...</div>';
            dropdown.classList.add('show');
            
            // Simulate API call with timeout
            setTimeout(() => {
                const suggestions = getAirportSuggestions(query);
                displaySuggestions(suggestions, dropdown, input);
            }, 300);
        });
        
        input.addEventListener('focus', function() {
            if (this.value.trim().length >= 2) {
                dropdown.classList.add('show');
            }
        });
        
        // Hide dropdown when input loses focus
        input.addEventListener('blur', function() {
            setTimeout(() => {
                dropdown.classList.remove('show');
            }, 200);
        });
    });
}

function createSuggestionsDropdown(input) {
    const dropdown = document.createElement('div');
    dropdown.className = 'suggestions-dropdown';
    input.parentNode.appendChild(dropdown);
    return dropdown;
}

function getAirportSuggestions(query) {
    // Mock airport data - in real app, this would be an API call
    const airports = [
        { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
        { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
        { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
        { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
        { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
        { code: 'GOI', name: 'Goa International Airport', city: 'Goa', country: 'India' },
        { code: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', country: 'India' },
        { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
        { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
        { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
        { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
        { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
        { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
        { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' }
    ];
    
    const queryLower = query.toLowerCase();
    return airports.filter(airport => 
        airport.code.toLowerCase().includes(queryLower) ||
        airport.city.toLowerCase().includes(queryLower) ||
        airport.name.toLowerCase().includes(queryLower) ||
        airport.country.toLowerCase().includes(queryLower)
    ).slice(0, 5); // Limit to 5 results
}

function displaySuggestions(suggestions, dropdown, input) {
    if (suggestions.length === 0) {
        dropdown.innerHTML = '<div class="suggestion-item">No airports found</div>';
        return;
    }
    
    dropdown.innerHTML = '';
    
    suggestions.forEach(airport => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <div class="airport-details">
                <strong class="city">${airport.city}</strong>
                <span class="code">(${airport.code})</span>
                <div class="name">${airport.name}</div>
                <div class="country">${airport.country}</div>
            </div>
        `;
        
        item.addEventListener('click', function() {
            input.value = `${airport.city} (${airport.code})`;
            dropdown.classList.remove('show');
        });
        
        dropdown.appendChild(item);
    });
}

// Flight Search Handler
async function handleFlightSearch(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        from: document.getElementById('departureAirport').value,
        to: document.getElementById('arrivalAirport').value,
        departDate: document.getElementById('departureDate').value,
        returnDate: document.getElementById('returnDate').value,
        adults: parseInt(document.getElementById('adults-count').textContent),
        children: parseInt(document.getElementById('children-count').textContent),
        infants: parseInt(document.getElementById('infants-count').textContent),
        class: document.getElementById('travel-class').value,
        tripType: document.querySelector('.trip-btn.active').getAttribute('data-trip')
    };
    
    // Validate form
    if (!validateFlightSearch(formData)) {
        return;
    }
    
    // Show loading state
    const searchBtn = document.querySelector('.btn-search-flight');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching Flights...';
    searchBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateFlightSearch(formData);
        
        // Show success message
        showNotification('Search completed! Redirecting to results...', 'success');
        
        // In real implementation, redirect to results page
        setTimeout(() => {
            // window.location.href = `flight-results.html?${new URLSearchParams(formData)}`;
            console.log('Would redirect to results with:', formData);
        }, 1500);
        
    } catch (error) {
        console.error('Search error:', error);
        showNotification('Search failed. Please try again.', 'error');
    } finally {
        // Restore button state
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
    }
}

function validateFlightSearch(formData) {
    if (!formData.from) {
        showNotification('Please select departure airport', 'error');
        return false;
    }
    
    if (!formData.to) {
        showNotification('Please select destination airport', 'error');
        return false;
    }
    
    if (formData.from === formData.to) {
        showNotification('Departure and destination cannot be the same', 'error');
        return false;
    }
    
    if (!formData.departDate) {
        showNotification('Please select departure date', 'error');
        return false;
    }
    
    if (formData.tripType === 'round-trip' && !formData.returnDate) {
        showNotification('Please select return date for round trip', 'error');
        return false;
    }
    
    return true;
}

async function simulateFlightSearch(formData) {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Flight search completed:', formData);
            resolve({
                success: true,
                data: formData
            });
        }, 2000);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideInRight 0.3s ease;
            }
            .notification-success { background: #10b981; }
            .notification-error { background: #ef4444; }
            .notification-info { background: #3b82f6; }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: 10px;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Export for global access
window.FlightSearch = {
    initializeFlightSearch,
    initializeDatePickers,
    initializePassengerSelector,
    initializePopularDestinations,
    initializeAirportSearch,
    handleFlightSearch
};
// Add this to your flights.js in the passenger selector section
function initializePassengerSelector() {
    const passengerDisplay = document.getElementById('passengers-display');
    const passengerDropdown = document.getElementById('passengerDropdown');
    const passengerDone = document.getElementById('passengerDone');
    
    if (!passengerDisplay || !passengerDropdown) return;
    
    let adults = 1;
    let children = 0;
    let infants = 0;
    
    // Toggle dropdown with z-index fix
    passengerDisplay.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = passengerDropdown.classList.contains('show');
        
        if (!isActive) {
            // When opening, set high z-index
            passengerDropdown.style.zIndex = '10000';
            passengerDropdown.classList.add('show');
            
            // Prevent body scroll when dropdown is open
            document.body.style.overflow = 'hidden';
        } else {
            passengerDropdown.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Passenger controls
    document.querySelectorAll('.passenger-btn').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const action = this.getAttribute('data-action');
            
            updatePassengerCount(type, action);
        });
    });
    
    // Done button
    passengerDone.addEventListener('click', function() {
        updatePassengerDisplay();
        passengerDropdown.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!passengerDisplay.contains(e.target) && !passengerDropdown.contains(e.target)) {
            passengerDropdown.classList.remove('show');
            document.body.style.overflow = ''; // Restore scroll
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && passengerDropdown.classList.contains('show')) {
            passengerDropdown.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // ... rest of your passenger functions remain the same
}