// Mobile Navigation Toggle Script
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile navigation button with improved accessibility
    const mobileNavHTML = `
        <button class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="main-navigation">
            <div class="hamburger">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </div>
        </button>
    `;
    
    // Insert mobile nav toggle button after the logo
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContainer && navLinks) {
        // Insert the mobile toggle button before nav-links
        navLinks.insertAdjacentHTML('beforebegin', mobileNavHTML);
        
        // Get the toggle button
        const mobileToggle = document.querySelector('.mobile-nav-toggle');
        
        // Add click event listener
        mobileToggle.addEventListener('click', function() {
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle active class on nav links
            navLinks.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            this.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
            
            // Optional: Close menu when clicking outside
            if (isExpanded) {
                document.addEventListener('click', outsideClickHandler);
                // Focus management for accessibility
                navLinks.querySelector('a').focus();
            } else {
                document.removeEventListener('click', outsideClickHandler);
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Handle clicks outside the menu
        function outsideClickHandler(event) {
            if (!navContainer.contains(event.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.removeEventListener('click', outsideClickHandler);
            }
        }
    }
});
