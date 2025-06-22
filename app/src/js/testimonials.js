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

  let currentIndex = 0;
  let autoplayInterval = null;

  function updateSliderPosition() {
    const position = -currentIndex * 100;
    track.style.transform = `translateX(${position}%)`;
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSliderPosition();
    updateDots();
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSliderPosition();
    updateDots();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(goToNext, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Dot Navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSliderPosition();
      updateDots();
      resetAutoplay();
    });
  });

  // Button Events
  if (nextBtn) nextBtn.addEventListener('click', () => { goToNext(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { goToPrev(); resetAutoplay(); });

  // Swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
  slider.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 50) goToPrev();
    else if (touchStartX - touchEndX > 50) goToNext();
    resetAutoplay();
  });

  updateSliderPosition();
  updateDots();
  startAutoplay();
}
