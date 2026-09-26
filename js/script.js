/**
 * RAMESH CHICKEN CENTER — PRIMARY JAVASCRIPT
 * Vanilla JavaScript for Mobile Navigation, Carousel,
 * Form Validation, Scroll Effects, and Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCarousel();
  initContactForms();
  initScrollEffects();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const header = document.querySelector('.site-header');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link detection based on pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Sticky header on scroll
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/* ==========================================================================
   2. HERO CAROUSEL (4 SLIDES)
   ========================================================================== */
function initCarousel() {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlayTimer = null;
  const autoPlayInterval = 4500; // 4.5 seconds
  let isPaused = false;

  function showSlide(index) {
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (!isPaused) {
      autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Prev / Next button listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      resetAutoPlay();
    });
  }

  // Dots listeners
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      resetAutoPlay();
    });
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAutoPlay();
  });

  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoPlay();
  });

  // Pause on focus within (accessibility)
  carousel.addEventListener('focusin', () => {
    isPaused = true;
    stopAutoPlay();
  });

  carousel.addEventListener('focusout', () => {
    isPaused = false;
    startAutoPlay();
  });

  // Touch Swipe navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Start carousel
  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   3. CONTACT FORM VALIDATION
   ========================================================================== */
function initContactForms() {
  const forms = document.querySelectorAll('.contact-form');

  forms.forEach((form) => {
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const successBox = form.querySelector('.form-success-message');

    // Real-time error removal
    [nameInput, phoneInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          clearError(input);
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput || nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter your name (min 2 characters)');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Phone
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const phoneRegex = /^[0-9+\s-]{10,15}$/;
      if (!phoneVal || !phoneRegex.test(phoneVal.replace(/\s+/g, ''))) {
        showError(phoneInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
      } else {
        clearError(phoneInput);
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Message
      if (!messageInput || messageInput.value.trim().length < 5) {
        showError(messageInput, 'Please enter a message (min 5 characters)');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        const submitBtn = form.querySelector('.btn-submit');
        const origBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending...';
        }

        // Simulate successful static sending
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnText;
          }

          if (successBox) {
            successBox.style.display = 'block';
            successBox.textContent = 'Thank you! Your message has been received.';
          } else {
            alert('Thank you! Your message has been received.');
          }

          form.reset();

          // Auto-hide success message after 6 seconds
          setTimeout(() => {
            if (successBox) {
              successBox.style.display = 'none';
            }
          }, 6000);
        }, 600);
      }
    });
  });

  function showError(input, msg) {
    if (!input) return;
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      let errEl = group.querySelector('.error-text');
      if (errEl) {
        errEl.textContent = msg;
      }
    }
  }

  function clearError(input) {
    if (!input) return;
    const group = input.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
    }
  }
}

/* ==========================================================================
   4. SCROLL EFFECTS & BACK TO TOP
   ========================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
