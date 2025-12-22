// MILITARY DATE FORMAT
// Display current date in military format (DD MMM YYYY)
(function setMilitaryDate() {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const militaryDate = `${day} ${month} ${year}`;

    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = militaryDate;
    }
})();

// STAMP EFFECT ON BUTTONS
// Add red stamp effect when buttons are clicked
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add stamped class
            this.classList.add('stamped');

            // Remove stamped class after animation completes
            setTimeout(() => {
                this.classList.remove('stamped');
            }, 500);
        });
    });
});

// COOKIES - GDPR Compliant Cookie Consent Management
// Check consent status immediately on page load
(function checkCookieConsent() {
    console.log('Checking cookie consent status...');
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesRejected = localStorage.getItem('cookiesRejected');

    if (cookiesAccepted === 'true') {
        console.log('Consent already given - loading analytics');
        loadAnalytics();
    } else if (cookiesRejected === 'true') {
        console.log('User previously declined cookies - not showing banner');
        // Don't show banner, don't load analytics
    } else {
        console.log('No consent decision found - showing banner');
        showCookieBanner();
    }
})();

function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');

    // Show banner (overlay)
    banner.style.display = 'flex';
    banner.classList.remove('hidden');

    // Animate modal in after a brief delay
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 50);
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');

    // Animate modal out
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';

    // Hide banner after animation
    setTimeout(() => {
        banner.classList.add('hidden');
        banner.style.display = 'none';
    }, 300);
}

function acceptCookies() {
    console.log('User accepted cookies');
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    localStorage.removeItem('cookiesRejected'); // Clear any previous rejection

    hideCookieBanner();
    loadAnalytics();

    // Track acceptance event (if GA loads successfully)
    setTimeout(() => {
        if (window.gtag) {
            gtag('event', 'cookie_consent_accept', {
                'event_category': 'consent',
                'event_label': 'user_accepted_cookies'
            });
        }
    }, 1000);
}

function rejectCookies() {
    console.log('User rejected cookies');
    localStorage.setItem('cookiesRejected', 'true');
    localStorage.setItem('cookiesRejectedDate', new Date().toISOString());
    localStorage.removeItem('cookiesAccepted'); // Clear any previous acceptance

    hideCookieBanner();

    // Track rejection to our own endpoint (no GA tracking)
    fetch('/api/track-rejection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'cookie_rejected',
            timestamp: new Date().toISOString()
        })
    }).then(() => {
        console.log('Cookie rejection tracked successfully');
    }).catch((error) => {
        console.log('Cookie rejection tracking failed (non-critical):', error);
    });
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

    // Track Itch.io prototype button clicks
    document.querySelectorAll('a[href*="itch.io"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('prototype_click', {
                'event_category': 'engagement',
                'event_label': 'itch_prototype',
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

    document.querySelectorAll('a[href*="x.com"], a[href*="twitter"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('social_click', {
                'event_category': 'engagement',
                'event_label': 'twitter',
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

// NEWSLETTER FORM - Enhanced error handling
const form = document.getElementById('signup-form');
const statusMsg = document.getElementById('status-msg');
const submitBtn = document.getElementById('submit-btn');

if (form && statusMsg && submitBtn) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        submitBtn.innerHTML = "<span style='opacity: 0.5;'>...</span>";
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
                statusMsg.textContent = "Transmission received. You're on the list.";
                statusMsg.style.color = '#8b0000';
                form.reset();

                // Track successful newsletter signup
                trackEvent('newsletter_signup', {
                    'event_category': 'engagement',
                    'event_label': 'field_report_signup',
                    'value': 1
                });
            } else {
                // Handle specific error cases
                let errorMessage = "Failed. Please try again.";
                if (response.status === 429) {
                    errorMessage = "Too many requests. Try again later.";
                } else if (response.status === 409) {
                    errorMessage = "Email already registered.";
                } else if (data.error) {
                    errorMessage = data.error;
                }
                statusMsg.textContent = errorMessage;
                statusMsg.style.color = '#e8e8e8';
            }
        } catch (error) {
            statusMsg.textContent = "Connection failed. Please try again.";
            statusMsg.style.color = '#e8e8e8';
        } finally {
            submitBtn.innerHTML = "TRANSMIT";
            submitBtn.disabled = false;
        }
    });
}
