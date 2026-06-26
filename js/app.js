// Main application orchestrator for Aiden & Austin Watches website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Loader screen and hold transitions until done
  if (typeof window.initLoader === 'function') {
    window.initLoader(() => {
      // Callback triggered when loader overlay is dismissed
      
      // Initialize cursor trailing circle (disable on touch screens)
      if (typeof window.initCursor === 'function') {
        window.initCursor();
      }

      // Initialize smooth scroll using Lenis
      if (typeof window.initSmoothScroll === 'function') {
        window.initSmoothScroll();
      }

      // Initialize magnetic buttons hover physics
      if (typeof window.initMagneticButtons === 'function') {
        window.initMagneticButtons();
      }

      // Initialize Navigation behaviors
      if (typeof window.initNavbar === 'function') {
        window.initNavbar();
      }
      if (typeof window.initCinematicExperience === 'function') {
        window.initCinematicExperience();
      }

      // Initialize GSAP reveals, staggers, and parallax animations
      if (typeof window.initAnimations === 'function') {
        window.initAnimations();
      }

      // 2. WhatsApp Contact Form Integration
      const inquiryForm = document.getElementById('showroom-inquiry-form');

      if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const name = document.getElementById('form-name').value;
          const phone = document.getElementById('form-phone').value;
          const message = document.getElementById('form-message').value;
          
          const whatsappMsg = `Hello Aiden & Austin Watches,

Name: ${name}

Phone: ${phone}

Message: ${message}

I would like to enquire about your products and services.`;
          
          const encodedText = encodeURIComponent(whatsappMsg);
          const whatsappUrl = `https://wa.me/919207166135?text=${encodedText}`;
          
          window.open(whatsappUrl, '_blank');
        });
      }

      // 3. Floating WhatsApp Button Entrance Animation
      const waFloatBtn = document.querySelector('.floating-whatsapp-btn');
      if (waFloatBtn) {
        gsap.fromTo(waFloatBtn, 
          { scale: 0, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.0,
            delay: 1.5,
            ease: 'back.out(1.7)'
          }
        );
      }

      // Trigger scroll trigger refresh to make sure positions align correctly after DOM shifts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    });
  } else {
    // Init page immediately if loader script fails
    if (typeof window.initSmoothScroll === 'function') window.initSmoothScroll();
    if (typeof window.initNavbar === 'function') window.initNavbar();
    if (typeof window.initAnimations === 'function') window.initAnimations();
  }
});
