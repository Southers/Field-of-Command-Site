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
    if(!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').classList.remove('translate-y-full');
    } else {
        // If cookies are already accepted, load analytics
        loadAnalytics();
    }
}, 1000);

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    hideCookies();
    loadAnalytics();
}

function hideCookies() {
    document.getElementById('cookie-banner').classList.add('translate-y-full');
}

// Analytics loader - only loads when consent is given
function loadAnalytics() {
    // Google Analytics 4 - GDPR Compliant
    const GA_MEASUREMENT_ID = 'G-D48P9NHP49';

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize GA4
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true, // GDPR compliance
        'cookie_flags': 'SameSite=None;Secure',
        'page_title': document.title,
        'page_location': window.location.href
    });

    // Track custom events
    gtag('event', 'cookie_consent', {
        'event_category': 'engagement',
        'event_label': 'user_accepted_cookies'
    });

    console.log('Google Analytics loaded');
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
