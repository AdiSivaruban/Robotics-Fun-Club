// Enhanced Mobile Navigation Script
// This script provides mobile navigation functionality with improved accessibility and performance

class MobileNavigation {
    constructor() {
        this.mobileToggle = null;
        this.navLinks = null;
        this.navContainer = null;
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.createMobileToggle();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
    }

    createMobileToggle() {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navContainer || !navLinks) {
            console.warn('Navigation elements not found');
            return;
        }

        this.navContainer = navContainer;
        this.navLinks = navLinks;

        // Check if mobile toggle already exists
        if (document.querySelector('.mobile-nav-toggle')) {
            this.mobileToggle = document.querySelector('.mobile-nav-toggle');
            return;
        }

        const mobileNavHTML = `
            <button class="mobile-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-links">
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        `;
        
        navLinks.insertAdjacentHTML('beforebegin', mobileNavHTML);
        this.mobileToggle = document.querySelector('.mobile-nav-toggle');
        
        // Add ID to nav-links for aria-controls
        navLinks.id = 'nav-links';
    }

    setupEventListeners() {
        if (!this.mobileToggle) return;

        // Toggle menu on click
        this.mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Close menu when clicking on links
        const links = this.navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                // Add a small delay to allow the click to register
                setTimeout(() => this.closeMenu(), 100);
            });
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    setupKeyboardNavigation() {
        const navItems = this.navLinks.querySelectorAll('a');
        
        navItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                        e.preventDefault();
                        const nextItem = navItems[index + 1] || navItems[0];
                        nextItem.focus();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        const prevItem = navItems[index - 1] || navItems[navItems.length - 1];
                        prevItem.focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        navItems[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        navItems[navItems.length - 1].focus();
                        break;
                }
            });
        });
    }

    setupAccessibility() {
        // Add focus management
        this.navLinks.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isMenuOpen) {
                const focusableElements = this.navLinks.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });

        // Add ARIA live region for announcements
        this.createLiveRegion();
    }

    createLiveRegion() {
        if (document.getElementById('nav-announcements')) return;
        
        const liveRegion = document.createElement('div');
        liveRegion.id = 'nav-announcements';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isMenuOpen = true;
        this.mobileToggle.classList.add('active');
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        this.navLinks.classList.add('active');
        
        // Focus management
        const firstLink = this.navLinks.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.mobileToggle.classList.remove('active');
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        this.navLinks.classList.remove('active');
        
        // Return focus to toggle button
        this.mobileToggle.focus();
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    handleOutsideClick(event) {
        if (this.isMenuOpen && !this.navContainer.contains(event.target)) {
            this.closeMenu();
        }
    }

    handleResize() {
        // Close menu on larger screens
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMenu();
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('nav-announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
            // Clear the message after a short delay
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
}

// Performance optimization: Debounce function
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

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        new MobileNavigation();
    } else {
        // For desktop, just ensure the mobile toggle is hidden
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileToggle) {
            mobileToggle.style.display = 'none';
        }
    }
});

// Handle orientation change on mobile devices
window.addEventListener('orientationchange', debounce(() => {
    // Reinitialize navigation after orientation change
    setTimeout(() => {
        const mobileNav = document.querySelector('.mobile-nav-toggle');
        if (mobileNav && window.innerWidth <= 768) {
            // Refresh the navigation state
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileNav.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    }, 100);
}, 250));

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileNavigation;
}
