// Main JavaScript for 中東樹棗 Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initBackToTop();
    initNutritionAnimations();
    initTimelineAnimations();
    initTypingEffect();
    
    // Performance optimization
    throttleScrollEvents();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });

        // Close mobile menu when clicking on nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
}

// Update Active Navigation
function updateActiveNavigation(currentSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Scroll-based Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('nutrition-item')) {
                    animateNutritionBar(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('health-card')) {
                    animateHealthCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll([
        '.section-animate',
        '.nutrition-item',
        '.timeline-item',
        '.health-card',
        '.env-card'
    ].join(','));

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Navbar Scroll Effects
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('bg-white/95');
            navbar.classList.remove('bg-white/90');
        } else {
            navbar.classList.add('bg-white/90');
            navbar.classList.remove('bg-white/95');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        updateNavigationHighlight();
    });
}

// Update Navigation Highlight Based on Scroll Position
function updateNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('nav').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Nutrition Bar Animations
function initNutritionAnimations() {
    // This will be triggered by the intersection observer
}

function animateNutritionBar(element) {
    const bars = element.querySelectorAll('.nutrition-bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.dataset.width || '0%';
            bar.style.width = width;
        }, index * 200);
    });
}

// Timeline Animations
function initTimelineAnimations() {
    // This will be triggered by the intersection observer
}

function animateTimelineItem(element) {
    element.style.animationDelay = `${Math.random() * 0.5}s`;
}

// Health Card Animations
function animateHealthCard(element) {
    element.style.animationDelay = `${Math.random() * 0.3}s`;
    element.classList.add('animate-fade-in-up');
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroSubtitle = document.querySelector('#hero h1 span');
    
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeWriter, 1000);
    }
}

// Performance Optimization - Throttle Scroll Events
function throttleScrollEvents() {
    let ticking = false;
    
    function updateOnScroll() {
        // Batch scroll-based updates here if needed
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Loading Animation
function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'loading';
    element.appendChild(loader);
}

function hideLoading(element) {
    const loader = element.querySelector('.loading');
    if (loader) {
        loader.remove();
    }
}

// Intersection Observer for Lazy Loading (if needed for future enhancements)
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
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
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.getElementById('hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Smooth Number Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Error Handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // Could implement user-friendly error messages here
}

// Accessibility Enhancements
function initAccessibilityFeatures() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = '跳到主要內容';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-white px-4 py-2 rounded';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Add focus indicators
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibilityFeatures);

// Form Validation (for future contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Cookie Consent (基礎實作，未來可擴展)
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show cookie consent banner
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div class="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border-l-4 border-amber-600 z-50">
                <p class="text-sm text-gray-600 mb-2">本網站使用 cookies 以改善用戶體驗。</p>
                <button onclick="acceptCookies()" class="bg-amber-600 text-white px-4 py-1 rounded text-sm hover:bg-amber-700">
                    接受
                </button>
            </div>
        `;
        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const banner = document.querySelector('.fixed.bottom-4');
    if (banner) {
        banner.remove();
    }
}

// Initialize cookie consent
// initCookieConsent(); // Uncomment if needed

// Export functions for testing or external use
window.DateWebsite = {
    initMobileMenu,
    initSmoothScrolling,
    updateActiveNavigation,
    animateCounter,
    validateForm,
    handleError
};