// Lightweight Website Script - Optimized for Performance

// Simple video autoplay function
function initVideo() {
    const video = document.querySelector("video");
    if (video) {
        // Ensure video plays on user interaction
        document.addEventListener("click", () => {
            video.play().catch(e => console.log("Video autoplay failed:", e));
        }, { once: true });
    }
}

// Mobile Navigation Toggle
function initMobileNav() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    
    if (mobileMenuToggle && navRight) {
        mobileMenuToggle.addEventListener('click', () => {
            navRight.classList.toggle('active');
            mobileMenuToggle.innerHTML = navRight.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking on menu items
        document.querySelectorAll('.nav-right a').forEach(link => {
            link.addEventListener('click', () => {
                navRight.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            });
        });
        
        // Close mobile menu on window resize if desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navRight.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            }
        });
    }
}

// Simple fade-in animation for page elements
function initFadeInAnimations() {
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

    // Add fade-in to key elements
    const fadeElements = document.querySelectorAll('.description-text, .review-box, .box');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Simple Reviews Carousel with CSS transitions
function initReviewsCarousel() {
    const reviewBoxes = document.querySelectorAll('.review-box');
    const nextBtn = document.querySelector('.review-next');
    const prevBtn = document.querySelector('.review-prev');
    
    if (!reviewBoxes.length) return;
    
    let currentIndex = 0;
    
    function showReview(index) {
        reviewBoxes.forEach((box, i) => {
            if (i === index) {
                box.style.opacity = '1';
                box.style.transform = 'translateX(0) scale(1)';
                box.style.zIndex = '10';
            } else {
                box.style.opacity = '0.3';
                box.style.transform = `translateX(${i < index ? '-100px' : '100px'}) scale(0.8)`;
                box.style.zIndex = '1';
            }
        });
    }
    
    function nextReview() {
        currentIndex = (currentIndex + 1) % reviewBoxes.length;
        showReview(currentIndex);
    }
    
    function prevReview() {
        currentIndex = (currentIndex - 1 + reviewBoxes.length) % reviewBoxes.length;
        showReview(currentIndex);
    }
    
    // Initialize styles
    reviewBoxes.forEach(box => {
        box.style.transition = 'all 0.5s ease';
    });
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextReview);
    if (prevBtn) prevBtn.addEventListener('click', prevReview);
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight') nextReview();
        if (e.code === 'ArrowLeft') prevReview();
    });
    
    // Auto-play (slower for better performance)
    setInterval(nextReview, 5000);
    
    // Initialize first review
    showReview(0);
}

// Simple loader animation
function initLoader() {
    const loader = document.getElementById('loader');
    const main = document.getElementById('main');
    
    if (loader && main) {
        // Simple fade out after 2 seconds
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                main.style.opacity = '1';
            }, 500);
        }, 2000);
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
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

// Debounced resize handler for performance
function initResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any necessary layouts
            console.log('Window resized');
        }, 250);
    });
}

// Main initialization function
function init() {
    // Set viewport height for mobile browsers
    const setVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    
    // Initialize all components
    initVideo();
    initMobileNav();
    initLoader();
    initSmoothScroll();
    initResizeHandler();
    
    // Initialize animations after a brief delay for better performance
    setTimeout(() => {
        initFadeInAnimations();
        initReviewsCarousel();
    }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}