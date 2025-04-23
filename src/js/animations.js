/**
 * Initializes scroll-triggered animations
 */
export function initAnimations() {
  // Get all elements with data-aos attribute
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  if (animatedElements.length === 0) return;
  
  // Set up the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        
        // Optional: Unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      } else {
        // Optional: Remove the class when element is out of view
        // for repeat animations when scrolling up and down
        // entry.target.classList.remove('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  // Observe each element
  animatedElements.forEach(element => {
    observer.observe(element);
    
    // Set different delays based on data-aos-delay attribute
    const delay = element.getAttribute('data-aos-delay') || 0;
    element.style.transitionDelay = `${delay}ms`;
    
    // Set different durations based on data-aos-duration attribute
    const duration = element.getAttribute('data-aos-duration') || 800;
    element.style.transitionDuration = `${duration}ms`;
  });
  
  // Add special animations for specific elements
  addSpecialAnimations();
}

/**
 * Adds special animations to specific elements
 */
function addSpecialAnimations() {
  // Animate the hero section elements on page load
  const heroElements = document.querySelectorAll('#hero .container > *');
  
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.animation = `fadeIn 0.8s ease forwards ${0.2 + (index * 0.2)}s`;
  });
  
  // Animate service cards staggered on scroll
  const serviceCards = document.querySelectorAll('#services .grid > div');
  
  serviceCards.forEach((card, index) => {
    card.setAttribute('data-aos-delay', index * 100);
  });
  
  // Subtle hover animations for specific elements
  const interactiveElements = document.querySelectorAll('.gallery-item img, .service-card, .testimonial-slide');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'scale(1.02)';
      element.style.transition = 'transform 0.3s ease';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
    });
  });
}