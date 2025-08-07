diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -0,0 +1,151 @@
+# 🤖 Robotics Fun Club
+
+A modern, interactive website for DIY STEM projects designed specifically for kids and families. Build amazing robots, rockets, and gadgets using everyday materials you already have at home!
+
+## ✨ Features
+
+- **🎨 Interactive Design**: Animated backgrounds, floating elements, and engaging visuals
+- **📱 Mobile-First**: Fully responsive design that works on all devices
+- **♿ Accessibility**: WCAG compliant with screen reader support and keyboard navigation
+- **⚡ Performance**: Optimized loading with service worker for offline functionality
+- **📱 PWA Ready**: Installable as a mobile app
+- **🎯 SEO Optimized**: Meta tags, structured data, and search engine friendly
+
+## 🚀 Getting Started
+
+### Prerequisites
+- A modern web browser
+- A local web server (for development)
+
+### Installation
+
+1. **Clone or download** the project files
+2. **Start a local server** (recommended for development):
+   ```bash
+   # Using Python 3
+   python -m http.server 8000
+   
+   # Using Node.js (if you have http-server installed)
+   npx http-server
+   
+   # Using PHP
+   php -S localhost:8000
+   ```
+3. **Open your browser** and navigate to `http://localhost:8000`
+
+## 📁 Project Structure
+
+```
+robotics-fun-club/
+├── home.html              # Main landing page
+├── projects.html          # DIY projects showcase
+├── gallery.html           # Project gallery
+├── about.html            # About page
+├── events.html           # Events and activities
+├── reviews.html          # User reviews and testimonials
+├── styles.css            # Global styles
+├── home.css              # Homepage specific styles
+├── projects.css          # Projects page styles
+├── gallery.css           # Gallery page styles
+├── about.css             # About page styles
+├── events.css            # Events page styles
+├── reviews.css           # Reviews page styles
+├── navigation.js         # Enhanced navigation functionality
+├── sw.js                 # Service worker for offline support
+├── manifest.json         # PWA manifest
+├── nature-walk-poster.jpg # Event poster image
+└── README.md            # This file
+```
+
+## 🎨 Customization
+
+### Colors
+The website uses CSS custom properties for easy theming. Main colors are defined in `styles.css`:
+
+```css
+:root {
+    --primary: #7c3aed;      /* Main brand color */
+    --secondary: #06b6d4;     /* Secondary accent */
+    --accent: #f59e0b;        /* Highlight color */
+    --dark: #1e293b;          /* Text color */
+    --light: #f1f5f9;         /* Light background */
+}
+```
+
+### Adding New Projects
+1. Open `projects.html`
+2. Add a new project card following the existing structure
+3. Update the filter functionality if needed
+
+### Adding New Pages
+1. Create a new HTML file following the existing structure
+2. Add corresponding CSS file
+3. Update navigation in all HTML files
+4. Add to service worker cache list
+
+## 🔧 Technical Features
+
+### Performance Optimizations
+- **Resource Preloading**: Critical CSS and JS files are preloaded
+- **Service Worker**: Offline functionality and caching
+- **Lazy Loading**: Images and non-critical resources
+- **Minified Assets**: Optimized file sizes
+
+### Accessibility Features
+- **Screen Reader Support**: ARIA labels and semantic HTML
+- **Keyboard Navigation**: Full keyboard accessibility
+- **Focus Management**: Clear focus indicators
+- **Skip Links**: Quick navigation for assistive technology
+
+### SEO Features
+- **Meta Tags**: Comprehensive meta descriptions and keywords
+- **Structured Data**: JSON-LD markup for search engines
+- **Open Graph**: Social media sharing optimization
+- **Sitemap Ready**: Clean URL structure
+
+## 📱 Progressive Web App
+
+The website is designed as a PWA with:
+- **Offline Support**: Service worker caches essential resources
+- **Installable**: Can be added to home screen on mobile devices
+- **App-like Experience**: Standalone mode and smooth transitions
+
+## 🌟 Browser Support
+
+- ✅ Chrome 60+
+- ✅ Firefox 55+
+- ✅ Safari 12+
+- ✅ Edge 79+
+
+## 🤝 Contributing
+
+1. Fork the project
+2. Create a feature branch
+3. Make your changes
+4. Test thoroughly
+5. Submit a pull request
+
+## 📄 License
+
+This project is open source and available under the [MIT License](LICENSE).
+
+## 🆘 Support
+
+If you encounter any issues or have questions:
+1. Check the browser console for error messages
+2. Ensure you're using a modern browser
+3. Try clearing your browser cache
+4. Contact the development team
+
+## 🎯 Future Enhancements
+
+- [ ] User accounts and progress tracking
+- [ ] Interactive project tutorials
+- [ ] Community features and sharing
+- [ ] Multi-language support
+- [ ] Advanced animations and interactions
+- [ ] Integration with educational APIs
+
+---
+
+**Made with ❤️ for young innovators everywhere!**
