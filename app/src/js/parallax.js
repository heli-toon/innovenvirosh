/**
 * Initializes parallax effect for the hero section
 */
export function initParallax() {
  const parallaxElement = document.querySelector('.bg-hero-pattern');
  
  if (!parallaxElement) return;
  
  // Add class to enable parallax
  parallaxElement.classList.add('parallax-bg');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Skip if element is not in view
    if (!isElementInViewport(parallaxElement)) return;
    
    // Calculate parallax effect
    const yPos = -(scrollPosition * 0.3);
    const transformValue = `translate3d(0px, ${yPos}px, 0px)`;
    
    parallaxElement.style.transform = transformValue;
  });
  
  // Additional subtle floating animation for hero content
  const heroContent = document.querySelector('#hero .container');
  if (heroContent) {
    heroContent.style.animation = 'float 6s ease-in-out infinite';
  }
}

/**
 * Helper function to check if element is in viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top < window.innerHeight &&
    rect.bottom >= 0
  );
}

// Add a CSS animation for the floating effect
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;
document.head.appendChild(style);