// Enhanced Mobile Navigation Toggle Script
document.addEventListener('DOMContentLoaded', function() {
    // Performance: Use more efficient selectors
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navContainer || !navLinks) {
        console.warn('Navigation elements not found');
        return;
    }
    
    // Create mobile navigation button with better accessibility
    const mobileNavHTML = `
        <button class="mobile-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
    `;
    
    // Insert mobile nav toggle button before nav-links
    navLinks.insertAdjacentHTML('beforebegin', mobileNavHTML);
    
    // Get the toggle button
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    // Add click event listener with error handling
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle active class on button
        const isActive = this.classList.toggle('active');
        this.setAttribute('aria-expanded', isActive);
        
        // Toggle active class on nav links
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        // Optional: Close menu when clicking outside
        if (isActive) {
            document.addEventListener('click', outsideClickHandler);
            // Add escape key handler
            document.addEventListener('keydown', escapeKeyHandler);
        } else {
            document.removeEventListener('click', outsideClickHandler);
            document.removeEventListener('keydown', escapeKeyHandler);
        }
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Handle clicks outside the menu
    function outsideClickHandler(event) {
        if (!navContainer.contains(event.target)) {
            closeMobileMenu();
        }
    }
    
    // Handle escape key
    function escapeKeyHandler(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('click', outsideClickHandler);
        document.removeEventListener('keydown', escapeKeyHandler);
    }
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for navigation links
    const allNavLinks = document.querySelectorAll('nav a[href]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add loading state for external links or page transitions
            if (this.href && this.href !== window.location.href) {
                this.classList.add('loading');
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.project-card, .about-card, .feature');
    animateElements.forEach(el => observer.observe(el));
});

// Add utility functions for better user experience
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.remove('loading');
    
    // Add page transition effects
    const pageContent = document.querySelector('main');
    if (pageContent) {
        pageContent.style.opacity = '0';
        pageContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            pageContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        }, 100);
    }
});
