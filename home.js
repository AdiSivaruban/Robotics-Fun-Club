// Home Page JavaScript - Enhanced Interactivity and Performance

class HomePageManager {
    constructor() {
        this.robot = null;
        this.isRobotInteracting = false;
        this.animationFrame = null;
        this.init();
    }

    init() {
        this.setupRobotInteraction();
        this.setupSmoothScrolling();
        this.setupPerformanceOptimizations();
        this.setupAccessibilityFeatures();
        this.setupEventListeners();
        this.registerServiceWorker();
    }

    setupRobotInteraction() {
        this.robot = document.querySelector('.robot');
        if (!this.robot) return;

        // Add interactive robot behaviors
        this.robot.addEventListener('click', () => this.handleRobotClick());
        this.robot.addEventListener('mouseenter', () => this.handleRobotHover());
        this.robot.addEventListener('mouseleave', () => this.handleRobotLeave());
        this.robot.addEventListener('keydown', (e) => this.handleRobotKeydown(e));
        
        // Add touch support for mobile
        this.robot.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleRobotClick();
        });
    }

    handleRobotClick() {
        if (this.isRobotInteracting) return;
        
        this.isRobotInteracting = true;
        
        // Add click animation
        this.robot.style.transform = 'scale(0.95)';
        
        // Play robot sound effect (if available)
        this.playRobotSound();
        
        // Show interaction feedback
        this.showInteractionFeedback();
        
        setTimeout(() => {
            this.robot.style.transform = '';
            this.isRobotInteracting = false;
        }, 200);
    }

    handleRobotHover() {
        if (this.isRobotInteracting) return;
        
        // Add hover effects
        const eyes = this.robot.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.transform = 'scale(1.1)';
        });
    }

    handleRobotLeave() {
        const eyes = this.robot.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.transform = '';
        });
    }

    handleRobotKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleRobotClick();
        }
    }

    playRobotSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Fallback for browsers that don't support Web Audio API
            console.log('Audio not supported');
        }
    }

    showInteractionFeedback() {
        // Create a floating message
        const feedback = document.createElement('div');
        feedback.textContent = '🤖 Beep!';
        feedback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(124, 58, 237, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            pointer-events: none;
            z-index: 1000;
            animation: feedbackFloat 1s ease-out forwards;
        `;
        
        this.robot.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
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
    }

    setupPerformanceOptimizations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.hero-content > *').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupAccessibilityFeatures() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Announce dynamic content changes
        this.announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                announcement.remove();
            }, 1000);
        };
    }

    setupEventListeners() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle page load completion
        window.addEventListener('load', () => {
            this.onPageLoad();
        });
    }

    handleResize() {
        // Adjust robot size based on viewport
        const viewportWidth = window.innerWidth;
        const robot = document.querySelector('.robot');
        
        if (robot) {
            if (viewportWidth < 480) {
                robot.style.width = '120px';
                robot.style.height = '180px';
            } else if (viewportWidth < 768) {
                robot.style.width = '150px';
                robot.style.height = '225px';
            } else if (viewportWidth < 1024) {
                robot.style.width = '180px';
                robot.style.height = '270px';
            } else {
                robot.style.width = '200px';
                robot.style.height = '300px';
            }
        }
    }

    pauseAnimations() {
        // Pause non-essential animations when page is not visible
        const animatedElements = document.querySelectorAll('.animated-bg, .floating-shapes, .particles');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        // Resume animations when page becomes visible
        const animatedElements = document.querySelectorAll('.animated-bg, .floating-shapes, .particles');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }

    onPageLoad() {
        // Add loading completion feedback
        document.body.classList.add('page-loaded');
        
        // Announce to screen readers
        this.announceToScreenReader('Robotics Fun Club homepage loaded successfully');
        
        // Preload critical resources
        this.preloadResources();
    }

    preloadResources() {
        // Preload images for better performance
        const imagesToPreload = [
            'nature-walk-poster.jpg'
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
}

// Enhanced Navigation Script
class EnhancedNavigation {
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
    }

    createMobileToggle() {
        const navContainer = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navContainer || !navLinks) return;

        this.navContainer = navContainer;
        this.navLinks = navLinks;

        const mobileNavHTML = `
            <button class="mobile-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        `;
        
        navLinks.insertAdjacentHTML('beforebegin', mobileNavHTML);
        this.mobileToggle = document.querySelector('.mobile-nav-toggle');
    }

    setupEventListeners() {
        if (!this.mobileToggle) return;

        this.mobileToggle.addEventListener('click', () => this.toggleMenu());
        
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
            link.addEventListener('click', () => this.closeMenu());
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
                }
            });
        });
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
        
        // Trap focus within menu
        this.trapFocus();
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
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
    }

    handleOutsideClick(event) {
        if (this.isMenuOpen && !this.navContainer.contains(event.target)) {
            this.closeMenu();
        }
    }

    trapFocus() {
        const focusableElements = this.navLinks.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        this.navLinks.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
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

        // Focus first element
        if (firstElement) {
            firstElement.focus();
        }
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomePageManager();
    new EnhancedNavigation();
});

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes feedbackFloat {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1.1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.9);
        }
    }

    .page-loaded .hero-content > * {
        animation-delay: 0.1s;
    }

    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }

    .mobile-nav-toggle[aria-expanded="true"] .hamburger span {
        background: var(--primary);
    }
`;
document.head.appendChild(style);