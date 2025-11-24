// YBL TOURS - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    console.log('YBL TOURS Website Loaded Successfully');
    
    // Initialize all features
    initNavigation();
    initSearchTabs();
    initSliders();
    initReadMore();
    initAnimations();
    initAIAssistant();
});

// Navigation and Mobile Menu
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    // Lazy loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Debounce search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all optimizations
function initOptimizations() {
    initLazyLoading();
    
    // Debounce search inputs
    const searchInputs = document.querySelectorAll('.airport-search, .hotel-destination');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce((e) => {
            // Your search logic here
        }, 300));
    });
}

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Search Tabs Functionality
function initSearchTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchForms = document.querySelectorAll('.search-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            searchForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding form
            const targetForm = document.getElementById(`${targetTab}-form`);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
}

// Initialize All Sliders
function initSliders() {
    initInternationalSlider();
    initDomesticSlider();
    initHoneymoonSlider();
}

// International Packages Slider
function initInternationalSlider() {
    const slider = document.getElementById('internationalSlider');
    const prevBtn = document.getElementById('internationalPrev');
    const nextBtn = document.getElementById('internationalNext');
    const dotsContainer = document.getElementById('internationalDots');
    
    if (!slider || !prevBtn || !nextBtn) {
        console.log('International slider elements not found');
        return;
    }
    
    const packages = slider.querySelectorAll('.package-card');
    const packageCount = packages.length;
    let currentIndex = 0;
    let packagesPerView = 4;
    
    function updatePackagesPerView() {
        if (window.innerWidth <= 576) {
            packagesPerView = 1;
        } else if (window.innerWidth <= 768) {
            packagesPerView = 2;
        } else if (window.innerWidth <= 1200) {
            packagesPerView = 3;
        } else {
            packagesPerView = 4;
        }
        updateSlider();
        createDots();
    }
    
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const dotCount = Math.ceil(packageCount / packagesPerView);
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i * packagesPerView;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateSlider() {
        if (packages.length === 0) return;
        
        const slideWidth = packages[0].offsetWidth + 24;
        const translateX = -currentIndex * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        const activeDotIndex = Math.floor(currentIndex / packagesPerView);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= packageCount - packagesPerView;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < packageCount - packagesPerView) {
            currentIndex += packagesPerView;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex >= packagesPerView) {
            currentIndex -= packagesPerView;
        } else {
            currentIndex = Math.floor((packageCount - 1) / packagesPerView) * packagesPerView;
        }
        updateSlider();
    });
    
    // Initialize
    updatePackagesPerView();
    window.addEventListener('resize', updatePackagesPerView);
}

// Domestic Packages Slider
function initDomesticSlider() {
    const slider = document.getElementById('domesticSlider');
    const prevBtn = document.getElementById('domesticPrev');
    const nextBtn = document.getElementById('domesticNext');
    const dotsContainer = document.getElementById('domesticDots');
    
    if (!slider || !prevBtn || !nextBtn) {
        console.log('Domestic slider elements not found');
        return;
    }
    
    const packages = slider.querySelectorAll('.package-card');
    const packageCount = packages.length;
    let currentIndex = 0;
    let packagesPerView = 4;
    
    function updatePackagesPerView() {
        if (window.innerWidth <= 576) {
            packagesPerView = 1;
        } else if (window.innerWidth <= 768) {
            packagesPerView = 2;
        } else if (window.innerWidth <= 1200) {
            packagesPerView = 3;
        } else {
            packagesPerView = 4;
        }
        updateSlider();
        createDots();
    }
    
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const dotCount = Math.ceil(packageCount / packagesPerView);
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i * packagesPerView;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateSlider() {
        if (packages.length === 0) return;
        
        const slideWidth = packages[0].offsetWidth + 24;
        const translateX = -currentIndex * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        const activeDotIndex = Math.floor(currentIndex / packagesPerView);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= packageCount - packagesPerView;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < packageCount - packagesPerView) {
            currentIndex += packagesPerView;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex >= packagesPerView) {
            currentIndex -= packagesPerView;
        } else {
            currentIndex = Math.floor((packageCount - 1) / packagesPerView) * packagesPerView;
        }
        updateSlider();
    });
    
    // Initialize
    updatePackagesPerView();
    window.addEventListener('resize', updatePackagesPerView);
}

// Honeymoon Packages Slider
function initHoneymoonSlider() {
    const slider = document.getElementById('honeymoonSlider');
    const prevBtn = document.getElementById('honeymoonPrev');
    const nextBtn = document.getElementById('honeymoonNext');
    const dotsContainer = document.getElementById('honeymoonDots');
    
    if (!slider || !prevBtn || !nextBtn) {
        console.log('Honeymoon slider elements not found');
        return;
    }
    
    const packages = slider.querySelectorAll('.package-card');
    const packageCount = packages.length;
    let currentIndex = 0;
    let packagesPerView = 4;
    
    function updatePackagesPerView() {
        if (window.innerWidth <= 576) {
            packagesPerView = 1;
        } else if (window.innerWidth <= 768) {
            packagesPerView = 2;
        } else if (window.innerWidth <= 1200) {
            packagesPerView = 3;
        } else {
            packagesPerView = 4;
        }
        updateSlider();
        createDots();
    }
    
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const dotCount = Math.ceil(packageCount / packagesPerView);
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i * packagesPerView;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateSlider() {
        if (packages.length === 0) return;
        
        const slideWidth = packages[0].offsetWidth + 24;
        const translateX = -currentIndex * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        const activeDotIndex = Math.floor(currentIndex / packagesPerView);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= packageCount - packagesPerView;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < packageCount - packagesPerView) {
            currentIndex += packagesPerView;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex >= packagesPerView) {
            currentIndex -= packagesPerView;
        } else {
            currentIndex = Math.floor((packageCount - 1) / packagesPerView) * packagesPerView;
        }
        updateSlider();
    });
    
    // Initialize
    updatePackagesPerView();
    window.addEventListener('resize', updatePackagesPerView);
}

// Read More/Less Functionality
function initReadMore() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    const readLessLinks = document.querySelectorAll('.read-less');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const descriptionContainer = this.closest('.section-description');
            const shortText = descriptionContainer.querySelector('.short-text');
            const fullText = descriptionContainer.querySelector('.full-text');
            
            if (shortText && fullText) {
                shortText.style.display = 'none';
                fullText.style.display = 'block';
            }
        });
    });
    
    readLessLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const descriptionContainer = this.closest('.section-description');
            const shortText = descriptionContainer.querySelector('.short-text');
            const fullText = descriptionContainer.querySelector('.full-text');
            
            if (shortText && fullText) {
                fullText.style.display = 'none';
                shortText.style.display = 'block';
                descriptionContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
}

// Animations and Effects
function initAnimations() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.destination-card, .review-card, .package-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Enhanced card interactions
    const cards = document.querySelectorAll('.destination-card, .package-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const button = this.querySelector('.btn-explore, .btn-package');
            if (button) {
                button.style.transform = 'translateY(-2px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const button = this.querySelector('.btn-explore, .btn-package');
            if (button) {
                button.style.transform = 'translateY(0)';
            }
        });
    });

    // Page load animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// AI Assistant Initialization (if exists)
function initAIAssistant() {
    // This will be overridden by ai-assistant.js if it exists
    console.log('AI Assistant ready to be initialized');
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.display = 'none';
    }
}, true);

// Export functions for global access
window.YBLTours = {
    initNavigation,
    initSearchTabs,
    initSliders,
    initReadMore,
    initAnimations,
    initAIAssistant
};