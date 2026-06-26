// Custom luxury trailing cursor

function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  let dotX = mouseX;
  let dotY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;

  // Linear interpolation function for smooth lag following
  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Render loop
  function updateCursor() {
    // Dot follows fast
    dotX = lerp(dotX, mouseX, 0.3);
    dotY = lerp(dotY, mouseY, 0.3);
    
    // Ring follows slower for smooth trailing lag
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  // Add Hover Interactive States
  const interactiveSelector = 'a, button, .btn, .collection-card, .gallery-item, .brand-item, input, textarea, #menu-toggle';
  
  function addCursorHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelector);
    
    targets.forEach(target => {
      // Avoid duplicate triggers
      if (target.dataset.cursorBound) return;
      target.dataset.cursorBound = 'true';

      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });

      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  addCursorHoverListeners();

  // Monitor DOM for dynamically added elements to bind cursor listeners
  const observer = new MutationObserver(() => {
    addCursorHoverListeners();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  // Hide cursor on mouseout of window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

// Export / Make globally available
window.initCursor = initCursor;
