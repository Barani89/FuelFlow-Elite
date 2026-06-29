/*
  FuelFlow Elite - Main JavaScript
  Handles navigation, scroll animations, and form validation.
*/

document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    const bookingMessage = document.getElementById('bookingMessage');
    const contactMessageStatus = document.getElementById('contactMessageStatus');

    // Toggle mobile navigation for smaller screens
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
            mobileToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (targetId.length > 1) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });

                if (mainNav.classList.contains('nav-open')) {
                    mainNav.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Validate form fields and show message helper
    const showFormMessage = (element, text, isValid = true) => {
        element.textContent = text;
        element.style.color = isValid ? '#c5a67b' : '#ff8b8b';
    };

    const validateEmail = email => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email.trim());
    };

    const validateNotEmpty = value => value.trim().length > 0;

    const handleFormSubmission = (form, messageElement, successText) => {
        const formData = new FormData(form);
        const name = formData.get('bookingName') || formData.get('contactName');
        const email = formData.get('bookingEmail') || formData.get('contactEmail');
        const message = formData.get('contactMessage');
        const serviceType = formData.get('serviceType');
        const date = formData.get('bookingDate');

        if (!validateNotEmpty(name || '')) {
            showFormMessage(messageElement, 'Please enter your name.', false);
            return;
        }

        if (!validateEmail(email || '')) {
            showFormMessage(messageElement, 'Please enter a valid email address.', false);
            return;
        }

        if (form === bookingForm) {
            if (!validateNotEmpty(serviceType || '')) {
                showFormMessage(messageElement, 'Please select a service type.', false);
                return;
            }
            if (!validateNotEmpty(date || '')) {
                showFormMessage(messageElement, 'Please choose a preferred date.', false);
                return;
            }
            showFormMessage(messageElement, `Thanks ${name}, your booking request is confirmed.`, true);
        } else {
            if (!validateNotEmpty(message || '')) {
                showFormMessage(messageElement, 'Please write your message.', false);
                return;
            }
            showFormMessage(messageElement, `Thanks ${name}, we will review your message shortly.`, true);
        }

        form.reset();
    };

    if (bookingForm) {
        bookingForm.addEventListener('submit', event => {
            event.preventDefault();
            handleFormSubmission(bookingForm, bookingMessage, 'Booking confirmed');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            handleFormSubmission(contactForm, contactMessageStatus, 'Message sent');
        });
    }
});
