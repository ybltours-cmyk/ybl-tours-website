// Replace your current calendar.js with this SIMPLE version
class CustomCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.activeInput = null;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Date input clicks - SIMPLIFIED
        document.querySelectorAll('.date-display').forEach(input => {
            input.addEventListener('click', (e) => {
                this.activeInput = e.target;
                this.showCalendar();
            });
        });

        // Calendar navigation
        document.getElementById('prevMonth')?.addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth')?.addEventListener('click', () => this.changeMonth(1));

        // Calendar actions
        document.getElementById('clearDate')?.addEventListener('click', () => this.clearDate());
        document.getElementById('applyDate')?.addEventListener('click', () => this.applyDate());

        // Close calendar when clicking outside
        document.getElementById('calendarModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'calendarModal') {
                this.hideCalendar();
            }
        });
    }

    showCalendar() {
        this.renderCalendar();
        document.getElementById('calendarModal').classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    hideCalendar() {
        document.getElementById('calendarModal').classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
    }

    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }

    renderCalendar() {
        const monthYear = document.getElementById('calendarMonthYear');
        const calendarDays = document.getElementById('calendarDays');
        
        if (!monthYear || !calendarDays) return;

        // Set month year header
        monthYear.textContent = this.currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        // Get first day of month and total days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Clear previous days
        calendarDays.innerHTML = '';

        // Add empty cells for days before first day of month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            emptyDay.textContent = '';
            calendarDays.appendChild(emptyDay);
        }

        // Add days of current month
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            const currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
            currentDate.setHours(0, 0, 0, 0);

            // Check if today
            if (currentDate.getTime() === today.getTime()) {
                dayElement.classList.add('today');
            }

            // Check if selected
            if (this.selectedDate && currentDate.getTime() === this.selectedDate.getTime()) {
                dayElement.classList.add('selected');
            }

            // Make date clickable
            dayElement.addEventListener('click', () => {
                this.selectDate(currentDate);
            });

            calendarDays.appendChild(dayElement);
        }
    }

    selectDate(date) {
        this.selectedDate = date;
        this.renderCalendar();
        
        // Auto-apply the date
        if (this.activeInput) {
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            this.activeInput.value = formattedDate;
            this.hideCalendar();
        }
    }

    clearDate() {
        this.selectedDate = null;
        if (this.activeInput) {
            this.activeInput.value = '';
        }
        this.hideCalendar();
    }

    applyDate() {
        this.hideCalendar();
    }
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', () => {
    new CustomCalendar();
});