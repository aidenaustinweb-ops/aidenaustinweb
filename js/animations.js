// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  // 1. Text reveals using SplitType
  const splitTextTargets = document.querySelectorAll('.reveal-text');
  
  splitTextTargets.forEach(target => {
    // Split the text into characters
    const textInstance = new SplitType(target, { types: 'chars, words' });

    // If it is NOT the hero title, register scroll trigger animations
    if (target.id !== 'hero-title') {
      // Reveal animation using fromTo to explicitly animate to y: 0% and override CSS
      gsap.fromTo(textInstance.chars, 
        { y: '100%', opacity: 0 },
        {
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: '0%',
          opacity: 1,
          duration: 1.0,
          stagger: 0.02,
          ease: 'power3.out'
        }
      );
    }
  });

  // Simple fade-up opacity animation for subheadings, action buttons, etc.
  const opacityRevealTargets = Array.from(document.querySelectorAll('.reveal-text-opacity')).filter(el => {
    return !el.closest('#hero') && 
           !el.closest('.categories-grid') && 
           !el.closest('.kids-brands-list') && 
           !el.closest('.clocks-grid') && 
           !el.closest('.brands-featured-grid') && 
           !el.closest('.international-grid') && 
           !el.closest('#cinematic-experience') && 
           !el.classList.contains('service-card') && 
           !el.classList.contains('location-card') &&
           !el.classList.contains('emi-card');
  });
  
  opacityRevealTargets.forEach(target => {
    gsap.fromTo(target, 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }
    );
  });

  // 1.5 Unified Luxury Hero Entrance Sequence (Run on loader overlay exit)
  const heroTl = gsap.timeline({ delay: 0.15 });

  // Background image zoom & fade
  const heroBg = document.querySelector('.hero-video-fallback');
  if (heroBg) {
    heroTl.fromTo(heroBg, 
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 3.0, ease: 'power2.out' },
      0
    );
    
    // Parallax scrolling
    gsap.to(heroBg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Watch centerpiece emblem entry
  const heroEmblem = document.querySelector('.hero-watch-emblem');
  if (heroEmblem) {
    heroTl.fromTo(heroEmblem,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: 'power4.out' },
      0.3
    );
  }

  // Headline character reveal
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const chars = heroTitle.querySelectorAll('.char');
    if (chars.length > 0) {
      heroTl.fromTo(chars,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.5, stagger: 0.02, ease: 'power3.out' },
        0.5
      );
    }
  }

  // Subheadline reveal
  const heroSub = document.querySelector('#hero .hero-subheadline');
  if (heroSub) {
    heroTl.fromTo(heroSub,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      1.1
    );
  }

  // Action buttons reveal
  const heroActions = document.querySelector('#hero .hero-actions');
  if (heroActions) {
    heroTl.fromTo(heroActions,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      1.3
    );
  }

  // 2. Editorial Image Reveal (Clip Path Slide)
  const imageContainers = document.querySelectorAll('.reveal-img-container');
  
  imageContainers.forEach(container => {
    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: () => {
        container.classList.add('revealed');
      }
    });
    
    // Smooth parallax translate offset
    const img = container.querySelector('img');
    if (img) {
      gsap.to(img, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });

  // 3. Staggered reveal for services grid glass-cards
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    gsap.fromTo(serviceCards, 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }

  // 4. Staggered reveal for location cards
  const locationCards = document.querySelectorAll('.location-card');
  if (locationCards.length > 0) {
    gsap.fromTo(locationCards, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.locations-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
  }

  // 5. Staggered reveal for Featured Watch Brands cards
  const featuredBrandCards = document.querySelectorAll('.brands-featured-grid .brand-card');
  if (featuredBrandCards.length > 0) {
    gsap.fromTo(featuredBrandCards, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.brands-featured-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );
  }

  // 6. Staggered reveal for International Watch Collection cards
  const intlCards = document.querySelectorAll('.international-grid .intl-card');
  if (intlCards.length > 0) {
    gsap.fromTo(intlCards, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.international-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
  }

  // 7. Staggered reveal for Categories cards
  const categoryCards = document.querySelectorAll('.categories-grid .category-card');
  if (categoryCards.length > 0) {
    gsap.fromTo(categoryCards, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.categories-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );
  }

  // 8. Staggered reveal for Kids brand cards
  const kidsCards = document.querySelectorAll('.kids-brands-list .kids-brand-card');
  if (kidsCards.length > 0) {
    gsap.fromTo(kidsCards, 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.kids-brands-list',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }

  // 9. Staggered reveal for Clocks brand cards
  const clockCards = document.querySelectorAll('.clocks-grid .clock-card');
  if (clockCards.length > 0) {
    gsap.fromTo(clockCards, 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.clocks-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );
  }

  // 10. Bajaj Finance EMI section animations
  const emiCard = document.querySelector('.emi-card');
  if (emiCard) {
    gsap.fromTo(emiCard,
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: emiCard,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      }
    );
    
    const emiItems = emiCard.querySelectorAll('.emi-features-list > div');
    if (emiItems.length > 0) {
      gsap.fromTo(emiItems,
        { x: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.emi-features-list',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out'
        }
      );
    }
  }

  // 11. Contact components slide-up stagger
  gsap.from('#showroom-inquiry-form .form-group', {
    scrollTrigger: {
      trigger: '#showroom-inquiry-form',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out'
  });

  // 12. Init Hero floating particle canvas
  initHeroParticles();
}

// Simple floating gold dust particles on canvas for Hero Section background
function initHeroParticles() {
  const canvas = document.getElementById('hero-particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 100;

  class DustParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // spread initially
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20; // start from bottom
      this.size = Math.random() * 2 + 0.5; // very small dots
      this.speedY = -(Math.random() * 0.4 + 0.1); // float upward
      this.speedX = (Math.random() - 0.5) * 0.2; // slight drift
      this.alpha = Math.random() * 0.5 + 0.1;
      this.decay = Math.random() * 0.002 + 0.0005;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      
      // fade out near the top
      if (this.y < canvas.height * 0.2) {
        this.alpha -= 0.005;
      }

      if (this.y < -10 || this.alpha <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new DustParticle());
  }

  // Animation Loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(loop);
  }

  loop();
}

// Export / Make globally available
window.initAnimations = initAnimations;
