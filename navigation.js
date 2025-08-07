// Enhanced Mobile Navigation Script - FIXED VERSION
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
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            this.createMobileToggle();
            this.setupEventListeners();
            this.setupKeyboardNavigation();
            this.setupAccessibility();
        }, 100);
    }

    createMobileToggle() {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navContainer || !navLinks) {
            console.warn('Navigation elements not found, retrying...');
            // Retry after a short delay
            setTimeout(() => this.createMobileToggle(), 200);
            return;
        }

        this.navContainer = navContainer;
        this.navLinks = navLinks;

        // Check if mobile toggle already exists
        const existingToggle = document.querySelector('.mobile-nav-toggle');
        if (existingToggle) {
            this.mobileToggle = existingToggle;
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
        
        // Insert the button after the logo but before the nav links
        const logo = navContainer.querySelector('.logo');
        if (logo) {
            logo.insertAdjacentHTML('afterend', mobileNavHTML);
        } else {
            navContainer.insertAdjacentHTML('beforeend', mobileNavHTML);
        }
        
        this.mobileToggle = document.querySelector('.mobile-nav-toggle');
        
        // Add ID to nav-links for aria-controls
        if (!navLinks.id) {
            navLinks.id = 'nav-links';
        }
    }

    setupEventListeners() {
        if (!this.mobileToggle) {
            console.warn('Mobile toggle not found');
            return;
        }

        // Toggle menu on click
        this.mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
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
                setTimeout(() => this.closeMenu(), 150);
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

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            }, 100);
        });
    }

    setupKeyboardNavigation() {
        if (!this.navLinks) return;

        const navItems = this.navLinks.querySelectorAll('a');
        
        navItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextItem = navItems[index + 1] || navItems[0];
                        nextItem.focus();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
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
        if (!this.navLinks) return;

        // Add focus management for tab navigation
        this.navLinks.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isMenuOpen) {
                const focusableElements = this.navLinks.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab - going backwards
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        this.mobileToggle.focus();
                    }
                } else {
                    // Tab - going forwards
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        this.mobileToggle.focus();
                    }
                }
            }
        });

        // Handle focus from toggle button
        this.mobileToggle?.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isMenuOpen && !e.shiftKey) {
                e.preventDefault();
                const firstLink = this.navLinks.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
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
        
        // Update button state
        this.mobileToggle.classList.add('active');
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        
        // Show menu
        this.navLinks.classList.add('active');
        
        // Prevent body scroll on mobile
        document.body.style.overflow = 'hidden';
        document.body.classList.add('nav-open');
        
        // Focus management - focus first link after animation
        setTimeout(() => {
            const firstLink = this.navLinks.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }, 300);
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
    }

    closeMenu() {
        this.isMenuOpen = false;
        
        // Update button state
        this.mobileToggle.classList.remove('active');
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Hide menu
        this.navLinks.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.classList.remove('nav-open');
        
        // Return focus to toggle button
        this.mobileToggle.focus();
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');
    }

    handleOutsideClick(event) {
        if (this.isMenuOpen && 
            !this.navContainer.contains(event.target) && 
            !this.mobileToggle.contains(event.target)) {
            this.closeMenu();
        }
    }

    handleResize() {
        // Close menu on larger screens
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMenu();
        }

        // Hide mobile toggle on desktop
        if (this.mobileToggle) {
            if (window.innerWidth > 768) {
                this.mobileToggle.style.display = 'none';
            } else {
                this.mobileToggle.style.display = 'block';
            }
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

// Enhanced initialization with better error handling
function initializeNavigation() {
    try {
        new MobileNavigation();
    } catch (error) {
        console.error('Navigation initialization failed:', error);
        // Retry once after a delay
        setTimeout(() => {
            try {
                new MobileNavigation();
            } catch (retryError) {
                console.error('Navigation retry failed:', retryError);
            }
        }, 500);
    }
}

// Initialize navigation when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    // DOM is already loaded
    initializeNavigation();
}

// Handle page visibility change to close menu if hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.mobileNav && window.mobileNav.isMenuOpen) {
        window.mobileNav.closeMenu();
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileNavigation;
}

// Store reference globally for debugging and other scripts
window.MobileNavigation = MobileNavigation;
