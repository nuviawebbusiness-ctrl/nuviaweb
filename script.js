// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add smooth scrolling to entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Main CTA button click handler - now links to Google Forms
const mainCTA = document.getElementById('mainCTA');
mainCTA.addEventListener('click', function(e) {
    // Add a click animation before navigation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
    // Link will navigate to Google Forms automatically
});

// Contact section now redirects to Google Forms - no form submission needed

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animate portfolio items on scroll
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            portfolioObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    portfolioObserver.observe(item);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Video end handler - stop video and darken background
const heroVideo = document.getElementById('heroVideo');
const videoDarkenOverlay = document.getElementById('videoDarkenOverlay');

if (heroVideo) {
    heroVideo.addEventListener('ended', function() {
        // Pause the video permanently
        this.pause();
        
        // Trigger darkening animation
        setTimeout(() => {
            videoDarkenOverlay.classList.add('active');
        }, 100);
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Language toggle functionality
let currentLanguage = 'en';

const languageToggle = document.getElementById('languageToggle');

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data-en and data-ro attributes
    document.querySelectorAll('[data-en][data-ro]').forEach(element => {
        if (lang === 'ro') {
            element.textContent = element.getAttribute('data-ro');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update placeholders for input fields
    document.querySelectorAll('[data-placeholder-en][data-placeholder-ro]').forEach(element => {
        if (lang === 'ro') {
            element.placeholder = element.getAttribute('data-placeholder-ro');
        } else {
            element.placeholder = element.getAttribute('data-placeholder-en');
        }
    });
    
    // Update button text
    languageToggle.textContent = lang === 'ro' ? 'EN' : 'RO';
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language toggle button
languageToggle.addEventListener('click', function() {
    const newLang = currentLanguage === 'en' ? 'ro' : 'en';
    switchLanguage(newLang);
    
    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', newLang);
});

// Load saved language preference
const savedLanguage = localStorage.getItem('preferredLanguage');
if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ro')) {
    switchLanguage(savedLanguage);
}
