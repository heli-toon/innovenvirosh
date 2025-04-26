/**
 * Initializes testimonial slider
 */
export function initTestimonials() {
  const slider = document.querySelector('.testimonials-slider');
  
  if (!slider) return;
  
  const track = slider.querySelector('.testimonials-track');
  const slides = slider.querySelectorAll('.testimonial-slide');
  const nextBtn = slider.querySelector('.testimonial-next');
  const prevBtn = slider.querySelector('.testimonial-prev');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  if (!track || !slides.length) return;
  
  let currentIndex = 0;
  let slideWidth = getSlideWidth();
  let slidesToShow = getSlidesToShow();
  let autoplayInterval = null;
  
  // Calculate slide width on resize
  window.addEventListener('resize', () => {
    slideWidth = getSlideWidth();
    slidesToShow = getSlidesToShow();
    updateSliderPosition();
  });
  
  // Set initial positions
  updateSliderPosition();
  
  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToNext();
      resetAutoplay();
    });
  }
  
  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToPrev();
      resetAutoplay();
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSliderPosition();
      updateDots();
      resetAutoplay();
    });
  });
  
  // Start autoplay
  startAutoplay();
  
  // Add swipe functionality for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetAutoplay();
  });
  
  /**
   * Handles swipe gesture
   */
  function handleSwipe() {
    const minSwipeDistance = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance > minSwipeDistance) {
      goToPrev();
    } else if (swipeDistance < -minSwipeDistance) {
      goToNext();
    }
  }
  
  /**
   * Goes to the next slide
   */
  function goToNext() {
    if (currentIndex >= slides.length - slidesToShow) {
      // Jump back to first slide with animation
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    
    updateSliderPosition();
    updateDots();
  }
  
  /**
   * Goes to the previous slide
   */
  function goToPrev() {
    if (currentIndex <= 0) {
      // Jump to last slide with animation
      currentIndex = slides.length - slidesToShow;
    } else {
      currentIndex--;
    }
    
    updateSliderPosition();
    updateDots();
  }
  
  /**
   * Updates slider position based on current index
   */
  function updateSliderPosition() {
    const position = -currentIndex * (100 / slidesToShow);
    track.style.transform = `translateX(${position}%)`;
  }
  
  /**
   * Updates active dot indicator
   */
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  /**
   * Calculates slide width based on viewport
   * @returns {number} Slide width
   */
  function getSlideWidth() {
    return slider.offsetWidth;
  }
  
  /**
   * Determines how many slides to show based on viewport
   * @returns {number} Number of slides to show
   */
  function getSlidesToShow() {
    if (window.innerWidth >= 1024) {
      return 3; // Desktop
    } else if (window.innerWidth >= 640) {
      return 2; // Tablet
    } else {
      return 1; // Mobile
    }
  }
  
  /**
   * Starts autoplay functionality
   */
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      goToNext();
    }, 5000);
  }
  
  /**
   * Resets autoplay timer when user interacts with slider
   */
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
}