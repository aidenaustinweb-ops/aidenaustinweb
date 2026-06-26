// Magnetic CTA hover button micro-interactions

function initMagneticButtons() {
  const magneticItems = document.querySelectorAll('.magnetic-btn');

  if (magneticItems.length === 0) return;

  magneticItems.forEach(item => {
    const wrapper = item.closest('.magnetic-btn-wrap') || item;

    // Track mouse movement inside trigger zone
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      
      // Calculate mouse offset from center of button
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      // Magnetic pull: move the inner button towards mouse coordinates
      // Use GSAP for smooth interpolation
      gsap.to(item, {
        x: relX * 0.35,
        y: relY * 0.35,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Pull wrapper slightly as well (compound physics effect)
      if (wrapper !== item) {
        gsap.to(wrapper, {
          x: relX * 0.15,
          y: relY * 0.15,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    // Reset positions on mouse leave
    wrapper.addEventListener('mouseleave', () => {
      // Snap button back with elastic luxury bounce
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto'
      });

      if (wrapper !== item) {
        gsap.to(wrapper, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto'
        });
      }
    });
  });

}

// Export / Make globally available
window.initMagneticButtons = initMagneticButtons;
