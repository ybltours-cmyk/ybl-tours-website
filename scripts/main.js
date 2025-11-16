:root {
    --midnight-blue: #0f172a;
    --dark-blue: #1e293b;
    --medium-blue: #334155;
    --light-blue: #475569;
    --accent-blue: #3b82f6;
    --bright-blue: #60a5fa;
    --white: #ffffff;
    --off-white: #f8fafc;
    --light-gray: #e2e8f0;
    --text-dark: #1e293b;
    --text-light: #64748b;
    --shadow: 0 4px 20px rgba(15, 23, 42, 0.15);
    --shadow-lg: 0 10px 40px rgba(15, 23, 42, 0.25);
    --gradient-primary: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    --gradient-accent: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background: var(--off-white);
}

/* Navigation */
.navbar {
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-accent);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--yellow);
    font-weight: bold;
    font-size: 36px;
}

.logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
}

.logo-main {
    font-size: 24px;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.5px;
}

.logo-sub {
    font-size: 11px;
    font-weight: 500;
    color: var(--bright-blue);
    letter-spacing: 2px;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2.5rem;
}

.nav-menu a {
    text-decoration: none;
    color: var(--white);
    font-weight: 500;
    font-size: 15px;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
}

.nav-menu a:hover {
    color: var(--bright-blue);
}

.nav-menu a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-accent);
    transition: width 0.3s ease;
}

.nav-menu a:hover::after {
    width: 100%;
}

.nav-buttons {
    display: flex;
    gap: 1rem;
}

.btn-login, .btn-signup {
    padding: 0.6rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
}

.btn-login {
    background: transparent;
    border: 2px solid var(--bright-blue);
    color: var(--bright-blue);
}

.btn-login:hover {
    background: var(--bright-blue);
    color: var(--midnight-blue);
    transform: translateY(-2px);
}

.btn-signup {
    background: var(--gradient-accent);
    color: var(--white);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.btn-signup:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* Hero Section */
.hero {
    background: var(--gradient-primary);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--white);
    margin-top: 0;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../images/hero-pattern.svg') center/cover;
    opacity: 0.05;
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 2rem;
}

.hero-content h1 {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #fff 0%, var(--bright-blue) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.1;
}

.hero-content p {
    font-size: 1.3rem;
    margin-bottom: 3rem;
    color: var(--light-gray);
    font-weight: 300;
}

/* Search Container */
.search-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: var(--shadow-lg);
    max-width: 1000px;
    margin: 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-tabs {
    display: flex;
    margin-bottom: 2.5rem;
    border-bottom: 2px solid var(--light-gray);
    gap: 1rem;
}

.search-tabs button {
    padding: 1rem 2rem;
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    font-weight: 600;
    color: var(--text-light);
    border-radius: 8px 8px 0 0;
}

.search-tabs button.tab-active {
    border-bottom-color: var(--accent-blue);
    color: var(--accent-blue);
    background: rgba(59, 130, 246, 0.1);
}

.search-tabs button:hover {
    color: var(--accent-blue);
    background: rgba(59, 130, 246, 0.05);
}

.search-form {
    display: none;
}

.search-form.active {
    display: block;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: var(--text-dark);
    font-size: 14px;
}

.form-group input, .form-group select {
    padding: 1rem;
    border: 2px solid var(--light-gray);
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: var(--white);
}

.form-group input:focus, .form-group select:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
}

.btn-search {
    background: var(--gradient-accent);
    color: var(--white);
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    align-self: end;
    min-height: 56px;
}

.btn-search:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Featured Destinations */
.featured-destinations {
    padding: 6rem 0;
    background: var(--off-white);
}

.featured-destinations h2 {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 3rem;
    font-weight: 800;
    color: var(--midnight-blue);
    position: relative;
}

.featured-destinations h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--gradient-accent);
    border-radius: 2px;
}

.destinations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.destination-card {
    background: var(--white);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: all 0.4s ease;
    position: relative;
    cursor: pointer;
}

.destination-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: var(--shadow-lg);
}

.destination-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
}

.destination-card:hover::before {
    opacity: 0.1;
}

.destination-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.destination-card:hover img {
    transform: scale(1.1);
}

.card-content {
    padding: 2rem;
    position: relative;
    z-index: 2;
    background: var(--white);
}

.card-content h3 {
    margin-bottom: 0.75rem;
    color: var(--midnight-blue);
    font-size: 1.5rem;
    font-weight: 700;
}

.card-content p {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.price {
    display: block;
    color: var(--accent-blue);
    font-weight: 800;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
}

.btn-explore {
    background: var(--gradient-accent);
    color: var(--white);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    width: 100%;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.btn-explore:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* Reviews Section */
.reviews {
    padding: 6rem 0;
    background: var(--white);
    position: relative;
}

.reviews::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--light-gray) 50%, transparent 100%);
}

.reviews h2 {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 3rem;
    font-weight: 800;
    color: var(--midnight-blue);
}

.reviews-slider {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.review-card {
    background: var(--off-white);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    border: 1px solid var(--light-gray);
    position: relative;
}

.review-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.review-card::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 25px;
    font-size: 4rem;
    color: var(--accent-blue);
    opacity: 0.2;
    font-family: serif;
}

.review-stars {
    color: #fbbf24;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.review-card p {
    color: var(--text-dark);
    font-style: italic;
    line-height: 1.7;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
}

.review-author {
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
}

.review-author img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1.5rem;
    border: 3px solid var(--accent-blue);
    padding: 2px;
}

.review-author h4 {
    color: var(--midnight-blue);
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.review-author span {
    color: var(--text-light);
    font-size: 0.9rem;
}

/* Footer */
.footer {
    background: var(--midnight-blue);
    color: var(--white);
    padding: 4rem 0 2rem;
    position: relative;
}

.footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--accent-blue) 50%, transparent 100%);
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1.5rem;
}

.footer-logo .logo-icon {
    width: 35px;
    height: 35px;
    font-size: 16px;
}

.footer-logo .logo-text .logo-main {
    font-size: 20px;
}

.footer-logo .logo-text .logo-sub {
    font-size: 10px;
}

.footer-section p {
    color: var(--light-gray);
    line-height: 1.7;
    margin-bottom: 1.5rem;
}

.footer-section h3 {
    color: var(--white);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    font-weight: 700;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 0.75rem;
}

.footer-section a {
    color: var(--light-gray);
    text-decoration: none;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.footer-section a:hover {
    color: var(--bright-blue);
    transform: translateX(5px);
}

.footer-section a i {
    width: 16px;
    text-align: center;
}

.footer-section p i {
    color: var(--bright-blue);
    margin-right: 0.75rem;
    width: 16px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .hero-content h1 {
        font-size: 2.5rem;
    }
    
    .search-container {
        padding: 1.5rem;
        margin: 0 1rem;
    }
    
    .search-tabs {
        flex-wrap: wrap;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .destinations-grid {
        grid-template-columns: 1fr;
    }
    
    .nav-menu {
        display: none;
    }
}// Enhanced interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animate elements on scroll
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
    document.querySelectorAll('.destination-card, .review-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Enhanced destination card interactions
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.btn-explore').style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.btn-explore').style.transform = 'translateY(0)';
        });
    });

    // Floating animation for search container
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        setInterval(() => {
            searchContainer.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                searchContainer.style.transform = 'translateY(0)';
            }, 2000);
        }, 4000);
    }
});

// Add smooth loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
// Smooth scrolling for all links
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

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
});

document.querySelectorAll('.destination-card, .review-card').forEach(el => {
    animateOnScroll.observe(el);
});// Fix navigation and background
document.addEventListener('DOMContentLoaded', function() {
    console.log('YBL TOURS Website Loaded');
    
    // Simple tab switching
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
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});