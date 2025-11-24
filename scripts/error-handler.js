class ErrorHandler {
    static init() {
        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleError(e.error, 'Something went wrong');
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason, 'Request failed');
        });
    }

    static handleError(error, userMessage = 'An error occurred') {
        console.error('Application Error:', error);
        
        // Show user-friendly message
        this.showNotification(userMessage, 'error');
        
        // Send to error tracking service (optional)
        this.trackError(error);
    }

    static showNotification(message, type = 'info') {
        // Use your existing notification system
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            // Fallback notification
            this.createFallbackNotification(message, type);
        }
    }

    static createFallbackNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    static trackError(error) {
        // Integrate with error tracking service like Sentry
        if (window.Sentry) {
            window.Sentry.captureException(error);
        }
    }
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', () => {
    ErrorHandler.init();
});