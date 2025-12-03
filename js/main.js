// Initialize Lucide icons
lucide.createIcons();

// ENHANCED IMAGE LAZY LOADING with Intersection Observer
// Adds smooth fade-in effect for images as they enter viewport
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Skip if image is already faded in
                if (img.dataset.fadeComplete) {
                    return;
                }

                // Check if image is already loaded (from cache)
                if (img.complete && img.naturalHeight !== 0) {
                    // Image already loaded, just fade it in
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease-in-out';
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.dataset.fadeComplete = 'true';
                    }, 10);
                } else {
                    // Image not loaded yet, set up fade-in on load
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease-in-out';

                    img.onload = () => {
                        img.style.opacity = '1';
                        img.dataset.fadeComplete = 'true';
                    };

                    // Handle error case
                    img.onerror = () => {
                        img.style.opacity = '1';
                        img.dataset.fadeComplete = 'true';
                    };
                }

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
    });

    // Observe all images with loading="lazy"
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// MOBILE MENU
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileBtn.setAttribute('aria-expanded', !isHidden);
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
    });
});

// SCROLL REVEAL
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// LIGHTBOX
function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    const imgAlt = element.querySelector('img').alt;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 10);
    // Focus the lightbox for accessibility
    lightbox.focus();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.95)';
    setTimeout(() => {
        lightbox.classList.add('hidden');
    }, 300);
}

// ESC key to close lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    }
});

// COOKIES - GDPR Compliant Cookie Consent Management
setTimeout(() => {
    console.log('Checking cookie consent status...');
    if(!localStorage.getItem('cookiesAccepted')) {
        console.log('No consent found - showing banner');
        document.getElementById('cookie-banner').classList.remove('translate-y-full');
    } else {
        console.log('Consent already given - loading analytics');
        // If cookies are already accepted, load analytics
        loadAnalytics();
    }
}, 1000);

function acceptCookies() {
    console.log('User accepted cookies');
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    hideCookies();
    loadAnalytics();
}

function hideCookies() {
    console.log('Hiding cookie banner');
    document.getElementById('cookie-banner').classList.add('translate-y-full');
}

// Analytics loader - only loads when consent is given
function loadAnalytics() {
    console.log('Loading Google Analytics...');

    // Use Google's EXACT standard implementation - inject as-is
    const gaScript1 = document.createElement('script');
    gaScript1.async = true;
    gaScript1.src = 'https://www.googletagmanager.com/gtag/js?id=G-D48P9NHP49';

    const gaScript2 = document.createElement('script');
    gaScript2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-D48P9NHP49');
        console.log('✓ Google Analytics configured');
    `;

    // Inject both scripts into head
    document.head.appendChild(gaScript1);
    document.head.appendChild(gaScript2);

    console.log('✓ Google Analytics scripts injected');

    // Setup event tracking after GA is loaded
    setupEventTracking();
}

// Helper function to safely track events (only if gtag is available)
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
        console.log(`✓ Tracked event: ${eventName}`, eventParams);
    }
}

// Setup all event tracking
function setupEventTracking() {
    // Track Steam wishlist button clicks
    document.querySelectorAll('a[href*="steam"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('wishlist_click', {
                'event_category': 'engagement',
                'event_label': 'steam_wishlist',
                'value': 1
            });
        });
    });

    // Track social media link clicks
    document.querySelectorAll('a[href*="discord"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('social_click', {
                'event_category': 'engagement',
                'event_label': 'discord',
                'link_url': link.href
            });
        });
    });

    document.querySelectorAll('a[href*="reddit"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('social_click', {
                'event_category': 'engagement',
                'event_label': 'reddit',
                'link_url': link.href
            });
        });
    });

    document.querySelectorAll('a[href*="youtube"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('social_click', {
                'event_category': 'engagement',
                'event_label': 'youtube',
                'link_url': link.href
            });
        });
    });

    console.log('✓ Event tracking configured');
}

// FORM - Enhanced error handling
const form = document.getElementById('signup-form');
const statusMsg = document.getElementById('status-msg');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    submitBtn.innerHTML = "<span class='animate-pulse'>...</span>";
    submitBtn.disabled = true;
    statusMsg.textContent = "";

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();

        if (response.ok) {
            statusMsg.textContent = "/// TRANSMISSION RECEIVED.";
            statusMsg.className = "mt-4 text-xs font-bold text-tactical-red";
            form.reset();

            // Track successful newsletter signup
            trackEvent('newsletter_signup', {
                'event_category': 'engagement',
                'event_label': 'field_report_signup',
                'value': 1
            });
        } else {
            // Handle specific error cases
            let errorMessage = "/// FAILED.";
            if (response.status === 429) {
                errorMessage = "/// TOO MANY REQUESTS. TRY AGAIN LATER.";
            } else if (response.status === 409) {
                errorMessage = "/// EMAIL ALREADY REGISTERED.";
            } else if (data.error) {
                errorMessage = `/// ${data.error.toUpperCase()}`;
            }
            statusMsg.textContent = errorMessage;
            statusMsg.className = "mt-4 text-xs font-bold text-ink-black";
        }
    } catch (error) {
        statusMsg.textContent = "/// CONNECTION FAILED.";
        statusMsg.className = "mt-4 text-xs font-bold text-ink-black";
    } finally {
        submitBtn.innerHTML = "ENLIST";
        submitBtn.disabled = false;
    }
});

// INK STAMP EFFECT ON BUTTONS
// Add stamp effect to wishlist and enlist buttons when clicked
document.querySelectorAll('a[href*="steam"], button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add stamped class
        this.classList.add('stamped');

        // Remove stamped class after animation completes
        setTimeout(() => {
            this.classList.remove('stamped');
        }, 600);
    });
});

// CAROUSEL NAVIGATION
const carouselContainer = document.getElementById('carousel-container');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselDots = document.querySelectorAll('.carousel-dot');

if (carouselContainer && carouselPrev && carouselNext) {
    let currentIndex = 0;
    const cards = carouselContainer.querySelectorAll('.snap-start');
    const totalCards = cards.length;

    // Function to scroll to a specific card
    function scrollToCard(index) {
        if (index < 0 || index >= totalCards) return;

        currentIndex = index;
        const card = cards[index];
        const scrollLeft = card.offsetLeft - carouselContainer.offsetLeft;

        carouselContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });

        updateNavigation();
    }

    // Update navigation button states and progress dots
    function updateNavigation() {
        // Update buttons
        carouselPrev.disabled = currentIndex === 0;
        carouselNext.disabled = currentIndex === totalCards - 1;

        // Update progress dots
        carouselDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-ink-black/20');
                dot.classList.add('bg-tactical-red');
            } else {
                dot.classList.remove('bg-tactical-red');
                dot.classList.add('bg-ink-black/20');
            }
        });
    }

    // Navigation arrows
    carouselPrev.addEventListener('click', () => {
        scrollToCard(currentIndex - 1);
    });

    carouselNext.addEventListener('click', () => {
        scrollToCard(currentIndex + 1);
    });

    // Progress dots
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToCard(index);
        });
    });

    // Detect scroll position to update current index
    let scrollTimeout;
    carouselContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = carouselContainer.scrollLeft;
            const containerWidth = carouselContainer.offsetWidth;

            // Find which card is most visible
            let newIndex = Math.round(scrollLeft / containerWidth);
            newIndex = Math.max(0, Math.min(newIndex, totalCards - 1));

            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateNavigation();
            }
        }, 100);
    });

    // Keyboard navigation
    carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToCard(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollToCard(currentIndex + 1);
        }
    });

    // Initialize
    updateNavigation();

    // Re-initialize Lucide icons for carousel arrows
    lucide.createIcons();
}
