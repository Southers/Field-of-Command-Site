// Initialize Lucide icons
lucide.createIcons();

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
    // Placeholder for Google Analytics
    // When you add GA, uncomment and add your GA ID:
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'GA_MEASUREMENT_ID');
    console.log('Analytics consent granted');
}

// FORM
const form = document.getElementById('signup-form');
const statusMsg = document.getElementById('status-msg');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    submitBtn.innerHTML = "<span class='animate-pulse'>...</span>";
    submitBtn.disabled = true;
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        if (response.ok) {
            statusMsg.textContent = "/// TRANSMISSION RECEIVED.";
            statusMsg.className = "mt-4 text-xs font-bold text-tactical-red";
            form.reset();
        } else throw new Error();
    } catch (error) {
        statusMsg.textContent = "/// FAILED.";
        statusMsg.className = "mt-4 text-xs font-bold text-ink-black";
    } finally {
        submitBtn.innerHTML = "ENLIST";
        submitBtn.disabled = false;
    }
});
