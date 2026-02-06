document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Mobile Menu Toggle
       ========================================= */
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerCta = document.querySelector('.header-cta');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            headerCta.classList.toggle('active');

            // Toggle icon between bars and times (X)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    /* =========================================
       1.5 Accordion Toggle Functionality
       ========================================= */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const toggle = header.querySelector('.accordion-toggle');

            // Close other accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherToggle = otherHeader.querySelector('.accordion-toggle');
                    otherContent.classList.remove('active');
                    otherToggle.classList.remove('active');
                }
            });

            // Toggle current accordion
            content.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });

    /* =========================================
       2. Sticky Header Effect
       ========================================= */
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* =========================================
       3. Smooth Scrolling
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (headerCta) headerCta.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    /* =========================================
       4. Scroll Animations (Intersection Observer)
       ========================================= */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate - Added .project-card
    const animatedElements = document.querySelectorAll('.animate-fade-up, .service-card, .stat-item, .product-content, .about-content, .project-card');
    animatedElements.forEach(el => observer.observe(el));

    /* =========================================
       5. Contact Form Validation
       ========================================= */
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Simple validation example
            const inputs = contactForm.querySelectorAll('input, select, textarea');

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#cbd5e1';
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Gather form data
                const formData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    service: document.getElementById('service').value,
                    message: document.getElementById('message').value
                };

                fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Success Feedback
                            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                            submitBtn.style.backgroundColor = 'var(--success-color)';
                            submitBtn.style.borderColor = 'var(--success-color)';

                            // Show custom notification
                            const notification = document.createElement('div');
                            notification.className = 'form-notification';
                            notification.innerHTML = `
                            <div style="background: #10B981; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: flex; align-items: center; gap: 10px; animation: slideIn 0.5s ease-out;">
                                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                                <div>
                                    <h4 style="margin:0; font-size:1rem;">Message Sent!</h4>
                                    <p style="margin:0; font-size:0.9rem; opacity:0.9;">We'll get back to you within 24 hours.</p>
                                </div>
                            </div>
                        `;
                            document.body.appendChild(notification);

                            // Remove notification after 3 seconds
                            setTimeout(() => {
                                notification.style.opacity = '0';
                                notification.style.transform = 'translateY(20px)';
                                notification.style.transition = 'all 0.5s';
                                setTimeout(() => notification.remove(), 500);
                            }, 3000);

                            contactForm.reset();

                            // Reset button after delay
                            setTimeout(() => {
                                submitBtn.innerHTML = originalText;
                                submitBtn.disabled = false;
                                submitBtn.style.backgroundColor = '';
                                submitBtn.style.borderColor = '';
                            }, 4000);
                        } else {
                            throw new Error('Server returned failure');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;

                        // Error Feedback
                        const notification = document.createElement('div');
                        notification.innerHTML = `
                        <div style="background: #EF4444; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: flex; align-items: center; gap: 10px; animation: slideIn 0.5s ease-out;">
                            <i class="fas fa-exclamation-circle" style="font-size: 1.2rem;"></i>
                            <div>
                                <h4 style="margin:0; font-size:1rem;">Sending Failed</h4>
                                <p style="margin:0; font-size:0.9rem; opacity:0.9;">Please try again later.</p>
                            </div>
                        </div>
                    `;
                        document.body.appendChild(notification);
                        setTimeout(() => notification.remove(), 3000);
                    });

            } else {
                // Error Feedback
                const notification = document.createElement('div');
                notification.innerHTML = `
                    <div style="background: #EF4444; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: flex; align-items: center; gap: 10px; animation: slideIn 0.5s ease-out;">
                        <i class="fas fa-exclamation-circle" style="font-size: 1.2rem;"></i>
                        <div>
                            <h4 style="margin:0; font-size:1rem;">Validation Error</h4>
                            <p style="margin:0; font-size:0.9rem; opacity:0.9;">Please fill in all required fields.</p>
                        </div>
                    </div>
                `;
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
            }
        });
    }

    /* =========================================
       5.5 Demo Form Validation & Submission
       ========================================= */
    const demoForm = document.getElementById('demoForm');

    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = demoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // Basic validation
            const instituteName = document.getElementById('instituteName').value;
            const name = document.getElementById('demoName').value;
            const phone = document.getElementById('demoPhone').value;

            if (!instituteName || !name || !phone) {
                // Error Feedback
                const notification = document.createElement('div');
                notification.innerHTML = `
                    <div style="background: #EF4444; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: flex; align-items: center; gap: 10px; animation: slideIn 0.5s ease-out;">
                        <i class="fas fa-exclamation-circle" style="font-size: 1.2rem;"></i>
                        <div>
                            <h4 style="margin:0; font-size:1rem;">Validation Error</h4>
                            <p style="margin:0; font-size:0.9rem; opacity:0.9;">Please fill in all required fields.</p>
                        </div>
                    </div>
                `;
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
                return;
            }

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
            submitBtn.disabled = true;

            const formData = {
                instituteName: instituteName,
                name: name,
                phone: phone,
                service: 'College ERP Demo', // Auto-set service
                email: 'Not Provided' // Placeholder since form doesn't have email
            };

            fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Booked!';
                        submitBtn.style.backgroundColor = 'var(--success-color)';
                        submitBtn.style.borderColor = 'var(--success-color)';

                        const notification = document.createElement('div');
                        notification.innerHTML = `
                        <div style="background: #10B981; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: flex; align-items: center; gap: 10px; animation: slideIn 0.5s ease-out;">
                            <i class="fas fa-calendar-check" style="font-size: 1.2rem;"></i>
                            <div>
                                <h4 style="margin:0; font-size:1rem;">Demo Requested!</h4>
                                <p style="margin:0; font-size:0.9rem; opacity:0.9;">Our team will call you shortly to schedule.</p>
                            </div>
                        </div>
                    `;
                        document.body.appendChild(notification);

                        setTimeout(() => {
                            notification.remove();
                        }, 4000);

                        demoForm.reset();

                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.backgroundColor = '';
                            submitBtn.style.borderColor = '';
                        }, 4000);
                    } else {
                        throw new Error('Server error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    alert('Something went wrong. Please call us directly.');
                });
        });
    }

    // Add keyframes for animation if not exists
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);

    /* =========================================
       6. Portfolio Filtering
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Small animation reset
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            });
        });
    }

    /* =========================================
       7. Service Page Filtering
       ========================================= */
    const serviceFilterBtns = document.querySelectorAll('.services-section .filter-btn');
    const serviceCards = document.querySelectorAll('.service-card[data-category]');

    if (serviceFilterBtns.length > 0) {
        serviceFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from buttons
                serviceFilterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-outline');
                    // Reset inline styles
                    b.style.color = '';
                    b.style.borderColor = '';
                    // Force specific styles for inactive
                    if (!b.classList.contains('active')) {
                        b.style.color = 'var(--text-color)';
                        b.style.borderColor = '#cbd5e1';
                    }
                });

                // Add active state to clicked button
                btn.classList.add('active');
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
                btn.style.color = '';
                btn.style.borderColor = '';

                const filterValue = btn.getAttribute('data-filter');

                serviceCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        setTimeout(() => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(10px)';
                            setTimeout(() => {
                                card.style.transition = 'all 0.4s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
