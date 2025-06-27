function playVideo() {document.querySelector("body").addEventListener("click",() =>{
  document.querySelector("video").play();
  console.log("hey")
})
}
playVideo();


function sliderAnimation(){
  var swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 1.5,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
  });
}
sliderAnimation()

// Mobile Navigation Toggle
function mobileNavToggle() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    
    if (mobileMenuToggle && navRight) {
        mobileMenuToggle.addEventListener('click', () => {
            navRight.classList.toggle('active');
            
            // Toggle hamburger icon
            if (navRight.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '✕';
            } else {
                mobileMenuToggle.innerHTML = '☰';
            }
        });
        
        // Close mobile menu when clicking on menu items
        const menuLinks = document.querySelectorAll('.nav-right a');
        menuLinks.forEach(link => {
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

// Initialize mobile navigation
mobileNavToggle();

// Responsive utilities
function handleResize() {
    // Recalculate animations on resize
    ScrollTrigger.refresh();
    
    // Update Swiper on resize
    if (window.swiper) {
        window.swiper.update();
    }
}

// Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
});

// Initialize responsive features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set viewport height for mobile browsers
    const setVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Smooth scroll polyfill for older browsers
    if (!CSS.supports('scroll-behavior', 'smooth')) {
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
});


function locoScroll () {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoScroll();

// Initialize text animation after locomotive scroll is set up
setTimeout(() => {
    page2TextAnimation();
}, 100);

// Cursor effect removed

// Custom Letter Split Animation for Page 2
function splitTextIntoLetters() {
    const splitElements = document.querySelectorAll('.split');
    console.log('Found split elements:', splitElements.length);
    
    splitElements.forEach(element => {
        // Store the original HTML content
        const originalHTML = element.innerHTML;
        console.log('Processing element:', originalHTML);
        
        // Create a temporary container to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        
        // Clear the original element
        element.innerHTML = '';
        
        // Process each text node and element
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Split text into individual characters
                const text = node.textContent;
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    if (char === ' ') {
                        element.appendChild(document.createTextNode(' '));
                    } else {
                        const letterSpan = document.createElement('span');
                        letterSpan.textContent = char;
                        letterSpan.classList.add('letter');
                        letterSpan.style.opacity = '1'; // Make visible immediately
                        
                        // Assign random colors: 98% white, 2% orange
                        const rand = Math.random();
                        if (rand < 0.98) {
                            letterSpan.classList.add('letter-white');
                        } else {
                            letterSpan.classList.add('letter-orange');
                        }
                        
                        element.appendChild(letterSpan);
                    }
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Handle colored spans - preserve their original colors but split into letters
                const text = node.textContent;
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    if (char === ' ') {
                        element.appendChild(document.createTextNode(' '));
                    } else {
                        const letterSpan = document.createElement('span');
                        letterSpan.textContent = char;
                        letterSpan.classList.add('letter');
                        letterSpan.style.opacity = '1'; // Make visible immediately
                        
                        // Keep original colors for existing colored spans
                        if (node.classList.contains('text-orange')) {
                            letterSpan.classList.add('letter-orange');
                        } else if (node.classList.contains('text-violet')) {
                            letterSpan.classList.add('letter-orange'); // Convert violet to orange
                        } else {
                            // For uncolored spans, apply random colors: 98% white, 2% orange
                            const rand = Math.random();
                            if (rand < 0.98) {
                                letterSpan.classList.add('letter-white');
                            } else {
                                letterSpan.classList.add('letter-orange');
                            }
                        }
                        
                        element.appendChild(letterSpan);
                    }
                }
            }
            
            // Add space after processing colored spans
            if (node.nextSibling && node.nodeType === Node.ELEMENT_NODE) {
                element.appendChild(document.createTextNode(' '));
            }
        };
        
        // Process all child nodes
        Array.from(tempDiv.childNodes).forEach(processNode);
    });
    
    console.log('Letters created:', document.querySelectorAll('.letter').length);
}

function page2TextAnimation() {
    // Split text into letters first
    splitTextIntoLetters();
    
    // Make sure letters are visible
    setTimeout(() => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.style.opacity = '1';
        });
    }, 100);
    
    // Animate letters with ScrollTrigger
    gsap.from('.letter', {
        y: 30,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            markers: false
        }
    });
}

function page2Animation(){
    gsap.from(".elem h1",{
        y:100,
        stagger:0.2,
        duration:1,
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#main",
            start:"top 47%",
            end:"top 45%",
            // markers:true,
            scrub:1
        }
    })
}
page2Animation();

var tl = gsap.timeline()

tl.from("#loader h3",{
  x:40,
  opacity:0,
  duration:1,
  stagger:0.2
})
tl.to("#loader h3",{
  x:-40,
  opacity:0,
  duration:1,
  stagger:-0.2
})
tl.to("#loader",{
  opacity:0,
  display:"none",
})
tl.from("#page1-content span",{
  y:100,
  opacity:0,
  stagger:0.1
})

// Simple Reviews Carousel
function initReviewsCarousel() {
    const reviewBoxes = document.querySelectorAll('.review-box');
    const nextBtn = document.querySelector('.review-next');
    const prevBtn = document.querySelector('.review-prev');
    
    if (!reviewBoxes.length) return;
    
    let currentIndex = 0;
    
    // Show all reviews initially
    reviewBoxes.forEach(box => {
        box.style.display = 'block';
        box.style.opacity = '0';
        box.style.transform = 'translateX(100px) scale(0.8)';
        box.style.transition = 'all 0.5s ease';
    });
    
    // Show first review
    function showReview(index) {
        reviewBoxes.forEach((box, i) => {
            if (i === index) {
                box.style.opacity = '1';
                box.style.transform = 'translateX(0) scale(1)';
                box.style.zIndex = '10';
            } else {
                box.style.opacity = '0.3';
                box.style.transform = 'translateX(' + (i < index ? '-100px' : '100px') + ') scale(0.8)';
                box.style.zIndex = '1';
            }
        });
    }
    
    // Next review
    function nextReview() {
        currentIndex = (currentIndex + 1) % reviewBoxes.length;
        showReview(currentIndex);
    }
    
    // Previous review
    function prevReview() {
        currentIndex = (currentIndex - 1 + reviewBoxes.length) % reviewBoxes.length;
        showReview(currentIndex);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextReview);
    if (prevBtn) prevBtn.addEventListener('click', prevReview);
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight' || e.code === 'KeyD') nextReview();
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') prevReview();
    });
    
    // Auto-play
    setInterval(nextReview, 4000);
    
    // Initialize first review
    showReview(0);
}

// Initialize reviews carousel
setTimeout(() => {
    initReviewsCarousel();
}, 100);