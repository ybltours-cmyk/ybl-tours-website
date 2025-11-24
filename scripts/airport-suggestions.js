class AirportSuggestions {
    constructor() {
        this.suggestionsContainer = null;
        this.inputElement = null;
        this.currentRequest = null;
        this.init();
    }

    init() {
        this.createSuggestionsContainer();
        this.bindEvents();
    }

    createSuggestionsContainer() {
        this.suggestionsContainer = document.createElement('div');
        this.suggestionsContainer.className = 'suggestions-dropdown';
        this.suggestionsContainer.style.display = 'none';
        document.body.appendChild(this.suggestionsContainer);
    }

    bindEvents() {
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('airport-search')) {
                this.inputElement = e.target;
                this.handleInput(e.target.value);
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('airport-search')) {
                this.hideSuggestions();
            }
        });
    }

    async handleInput(searchTerm) {
        if (searchTerm.length < 2) {
            this.hideSuggestions();
            return;
        }

        try {
            const airports = await amadeusAPI.searchAirports(searchTerm);
            this.showSuggestions(airports);
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Failed to fetch airport data. Please try again.');
        }
    }

    showSuggestions(airports) {
        if (!airports || !airports.length) {
            this.hideSuggestions();
            return;
        }

        const inputRect = this.inputElement.getBoundingClientRect();
        this.suggestionsContainer.style.cssText = `
            position: absolute;
            top: ${inputRect.bottom + window.scrollY}px;
            left: ${inputRect.left + window.scrollX}px;
            width: ${inputRect.width}px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: block;
        `;

        this.suggestionsContainer.innerHTML = airports.map(airport => `
            <div class="suggestion-item" data-code="${airport.iataCode}">
                <strong>${airport.name}</strong>
                <div class="airport-details">
                    <span class="city">${airport.address.cityName}</span>
                    <span class="code">(${airport.iataCode})</span>
                </div>
                <div class="country">${airport.address.countryName}</div>
            </div>
        `).join('');

        this.bindSuggestionEvents();
    }

    bindSuggestionEvents() {
        this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const airportCode = item.getAttribute('data-code');
                const airportName = item.querySelector('strong').textContent;
                this.inputElement.value = `${airportCode} - ${airportName}`;
                this.hideSuggestions();
                
                this.inputElement.dispatchEvent(new CustomEvent('airportSelected', {
                    detail: { code: airportCode, name: airportName }
                }));
            });
        });
    }

    hideSuggestions() {
        this.suggestionsContainer.style.display = 'none';
    }

    showError(message) {
        this.suggestionsContainer.innerHTML = `<div class="suggestion-error">${message}</div>`;
        this.suggestionsContainer.style.display = 'block';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AirportSuggestions();
});
        // Cancel previous request if still pending
        if (this.currentRequest) {
            this.currentRequest.cancel();
        }

        try {
            // Show loading state
            this.showLoading();
            
            const airports = await amadeusAPI.searchAirports(searchTerm);
            this.showSuggestions(airports);
        } catch (error) {
            if (error.name !== 'CanceledError') {
                console.error('Search error:', error);
                this.showError('Failed to fetch airport data. Please try again.');
            }
        }
    }

    showLoading() {
        if (!this.suggestionsContainer) return;
        
        this.suggestionsContainer.innerHTML = `
            <div class="suggestion-item loading">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Searching airports...</span>
            </div>
        `;
        this.suggestionsContainer.style.display = 'block';
    }

    // Add CSS for loading state
    static addLoadingStyles() {
        const styles = `
            .suggestion-item.loading {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #6b7280;
            }
        `;
        if (!document.querySelector('#airport-suggestions-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'airport-suggestions-styles';
            styleEl.textContent = styles;
            document.head.appendChild(styleEl);
        }
    }