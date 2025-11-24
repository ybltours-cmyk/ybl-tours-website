// SIMPLE passenger.js - Just make it work first
class PassengerSelector {
    constructor() {
        this.adults = 1;
        this.children = 0;
        this.infants = 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        const passengerDisplay = document.getElementById('passenger-display');
        const passengerDropdown = document.getElementById('passengerDropdown');
        
        if (!passengerDisplay || !passengerDropdown) {
            console.log('Passenger elements not found');
            return;
        }

        // Toggle dropdown - SIMPLE VERSION
        passengerDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = passengerDropdown.style.display === 'block';
            passengerDropdown.style.display = isActive ? 'none' : 'block';
        });

        // Passenger controls
        document.querySelectorAll('.passenger-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = button.getAttribute('data-type');
                const isPlus = button.classList.contains('plus-btn');
                this.updatePassengerCount(type, isPlus);
            });
        });

        // Apply button
        document.getElementById('passengerApply')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.updateDisplay();
            passengerDropdown.style.display = 'none';
        });

        // Cancel button
        document.getElementById('passengerCancel')?.addEventListener('click', (e) => {
            e.stopPropagation();
            passengerDropdown.style.display = 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            passengerDropdown.style.display = 'none';
        });

        // Prevent dropdown close when clicking inside
        passengerDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    updatePassengerCount(type, isIncrease) {
        let currentCount = this[type];
        
        if (isIncrease) {
            if (type === 'adults' && currentCount < 9) this[type]++;
            else if (type === 'children' && currentCount < 8) this[type]++;
            else if (type === 'infants' && currentCount < this.adults) this[type]++;
        } else {
            if (currentCount > 0) {
                if (type === 'adults' && currentCount > 1) this[type]--;
                else if (type !== 'adults') this[type]--;
            }
        }
        
        this.updateUI();
    }

    updateUI() {
        // Update count displays
        document.getElementById('adults-count').textContent = this.adults;
        document.getElementById('children-count').textContent = this.children;
        document.getElementById('infants-count').textContent = this.infants;
        
        // Update total passengers
        const total = this.adults + this.children + this.infants;
        document.getElementById('total-passengers').textContent = total;
        
        this.updateButtonStates();
    }

    updateButtonStates() {
        const types = ['adults', 'children', 'infants'];
        
        types.forEach(type => {
            const minusBtn = document.querySelector(`.minus-btn[data-type="${type}"]`);
            const plusBtn = document.querySelector(`.plus-btn[data-type="${type}"]`);
            const currentCount = this[type];
            
            if (minusBtn) {
                if (type === 'adults') {
                    minusBtn.disabled = currentCount <= 1;
                } else {
                    minusBtn.disabled = currentCount <= 0;
                }
            }
            
            if (plusBtn) {
                if (type === 'adults') {
                    plusBtn.disabled = currentCount >= 9;
                } else if (type === 'children') {
                    plusBtn.disabled = currentCount >= 8;
                } else if (type === 'infants') {
                    plusBtn.disabled = currentCount >= this.adults;
                }
            }
        });
    }

    updateDisplay() {
        const display = document.getElementById('passenger-display');
        if (!display) return;
        
        let displayText = `${this.adults} Adult${this.adults > 1 ? 's' : ''}`;
        if (this.children > 0) displayText += `, ${this.children} Child${this.children > 1 ? 'ren' : ''}`;
        if (this.infants > 0) displayText += `, ${this.infants} Infant${this.infants > 1 ? 's' : ''}`;
        
        display.value = displayText;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PassengerSelector();
});