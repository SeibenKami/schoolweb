// ========================================
// Mobile Menu Toggle
// ========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    lastScroll = currentScroll;
});

// ========================================
// Active Navigation Link on Scroll
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(formData.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // Create mailto link with form data
        const subject = encodeURIComponent('Contact Form Submission - BHEC');
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n\n` +
            `Message:\n${formData.message}`
        );

        const mailtoLink = `mailto:bhecsch@gmail.com?subject=${subject}&body=${body}`;

        // Open mailto link
        window.location.href = mailtoLink;

        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 500);
    });
}

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10B981' : '#EF4444',
        color: '#FFFFFF',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px'
    });

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        padding: 20px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        gap: 1rem;
    }

    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }

    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }

    .nav-link.active {
        color: #2D3142;
    }
`;
document.head.appendChild(style);

// ========================================
// Smooth Scroll Enhancement
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Reveal Animation
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
const revealElements = document.querySelectorAll('.class-card, .feature-item, .facility-card, .step');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// Year Update in Footer
// ========================================

const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Admissions Modal
// ========================================

const admissionsModal = document.getElementById('admissionsModal');
const modalClose = document.querySelector('.modal-close');
const admissionTriggers = document.querySelectorAll('#admissionsBtn, .admissions-trigger');

// Open modal on any admission button click
admissionTriggers.forEach(trigger => {
    if (trigger) {
        trigger.addEventListener('click', () => {
            admissionsModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
});

// Close modal on close button
if (modalClose) {
    modalClose.addEventListener('click', () => {
        admissionsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close modal when clicking outside
if (admissionsModal) {
    admissionsModal.addEventListener('click', (e) => {
        if (e.target === admissionsModal) {
            admissionsModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && admissionsModal.classList.contains('active')) {
        admissionsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

console.log('BHEC website loaded successfully!');