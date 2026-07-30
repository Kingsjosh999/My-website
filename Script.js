// ============================================================
// AOS INIT
// ============================================================
AOS.init({
    duration: 600,
    once: true,
    offset: 40,
    easing: 'ease-out-cubic',
});

// ============================================================
// TYPED.JS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    new Typed('#typed-text', {
        strings: [
            'Computer Science Student',
            'Front-End Web Developer',
            'Creative Thinker',
            'Tech Enthusiast'
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        autoInsertCss: true,
    });
});

// ============================================================
// NAVBAR SCROLL
// ============================================================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    // Navbar
    if (scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();
});

// ============================================================
// ACTIVE NAV LINK
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = mobileMenu.querySelectorAll('a');

function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu);

mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        if (mobileMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// ============================================================
// BACK TO TOP
// ============================================================
backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// CERTIFICATE MODAL
// ============================================================
const certData = [{
    title: 'Front-End Development',
    org: 'Google · Coursera',
    date: 'Issued: June 2025',
    img: 'cert1-placeholder.jpg'
}, {
    title: 'Responsive Web Design',
    org: 'freeCodeCamp',
    date: 'Issued: March 2025',
    img: 'cert2-placeholder.jpg'
}, {
    title: 'JavaScript Algorithms',
    org: 'freeCodeCamp',
    date: 'Issued: January 2025',
    img: 'cert3-placeholder.jpg'
}, {
    title: 'Firebase Fundamentals',
    org: 'Google · Udacity',
    date: 'Issued: November 2024',
    img: 'cert4-placeholder.jpg'
}];

const modal = document.getElementById('certModal');
const modalImg = document.getElementById('modalCertImg');
const modalTitle = document.getElementById('modalCertTitle');
const modalOrg = document.getElementById('modalCertOrg');
const modalDate = document.getElementById('modalCertDate');
const modalClose = document.getElementById('modalCloseBtn');

document.querySelectorAll('.cert-card').forEach(function(card) {
    card.addEventListener('click', function() {
        const index = parseInt(this.dataset.certIndex);
        const data = certData[index];
        if (data) {
            modalImg.src = data.img;
            modalImg.alt = data.title;
            modalTitle.textContent = data.title;
            modalOrg.textContent = data.org;
            modalDate.textContent = data.date;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// ====================================================
// CONTACT FORM
// ====================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(function() {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ============================================================
// RIPPLE EFFECT ON BUTTONS
// ============================================================
document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty('--x', x + '%');
        this.style.setProperty('--y', y + '%');
    });
});

// ============================================================
// SMOOTH SCROLL FOR NAV LINKS (fallback)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================
// FIX: HERO IMAGE FALLBACK
// ============================================================
document.querySelectorAll('.image-placeholder img').forEach(function(img) {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const icon = this.parentElement.querySelector('i');
        if (icon) icon.style.display = 'flex';
    });
});

// Also for cert thumbnails
document.querySelectorAll('.cert-thumb img').forEach(function(img) {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const icon = this.parentElement.querySelector('i');
        if (icon) icon.style.display = 'flex';
    });
});

// Modal image fallback
modalImg.addEventListener('error', function() {
    this.style.display = 'none';
    const icon = this.parentElement.querySelector('i');
    if (icon) icon.style.display = 'flex';
});

console.log('🚀 Joshua Kingsley Portfolio loaded successfully.');