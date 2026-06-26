// Navbar scroll class, active highlighting, and mobile menu toggle

function initNavbar() {
  const navbar = document.getElementById('main-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (!navbar) return;

  // 1. Scroll styling transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Trigger once on init in case page is reloaded scrolled down
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  }

  // 2. Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      const lenis = window.getLenis();
      if (navMenu.classList.contains('active')) {
        // Stop smooth scrolling while overlay menu is open
        if (lenis) lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        // Restart smooth scroll
        if (lenis) lenis.start();
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        const lenis = window.getLenis();
        if (lenis) lenis.start();
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Highlight navigation link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  const sectionLinkMap = {
    'hero': 'hero',
    'cinematic-experience': 'hero',
    'story': 'story',
    'featured-brands': 'categories',
    'international-brands': 'categories',
    'categories': 'categories',
    'collections': 'categories',
    'kids': 'categories',
    'clocks': 'categories',
    'perfumes': 'categories',
    'emi': 'services',
    'services': 'services',
    'locations': 'locations',
    'contact': 'locations'
  };
  
  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 200; // offset

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        const targetAnchorId = sectionLinkMap[id] || id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${targetAnchorId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
  highlightNavOnScroll(); // trigger on init
}

// Export / Make globally available
window.initNavbar = initNavbar;
