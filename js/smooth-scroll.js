// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

function initSmoothScroll() {
  // Check if touch device (sometimes disable smooth scroll on touch, or configure differently)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Initialize Lenis
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // luxury easeOutQuad
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // keep native touch feel
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis with GSAP ticker
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000); // Lenis expects milliseconds
  });

  // Disable lag smoothing for GSAP to avoid jumps
  gsap.ticker.lagSmoothing(0);

  // Sync ScrollTrigger scroll positions
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Bind anchor link clicking
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Scroll to target smoothly with Lenis
        lenisInstance.scrollTo(targetElement, {
          offset: -80, // offset for fixed navbar
          duration: 1.5,
          immediate: false
        });
      }
    });
  });

}

// Export / Make globally available
window.initSmoothScroll = initSmoothScroll;
window.getLenis = () => lenisInstance;
