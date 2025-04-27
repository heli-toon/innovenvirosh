/**
 * Initializes before-after image comparison sliders
 */
export function initBeforeAfter() {
  const sliders = document.querySelectorAll('.before-after-wrapper');
  
  if (!sliders.length) return;
  
  sliders.forEach(slider => {
    const sliderHandle = slider.querySelector('.slider-handle');
    const sliderButton = slider.querySelector('.slider-button');
    const afterImageContainer = slider.querySelector('.after-image-container');
    
    if (!sliderHandle || !sliderButton || !afterImageContainer) return;
    
    // Set initial position (50%)
    afterImageContainer.style.width = '50%';
    sliderHandle.style.left = '50%';
    sliderButton.style.left = '50%';
    
    // Variables for drag functionality
    let isDragging = false;
    
    // Mouse events for drag
    sliderButton.addEventListener('mousedown', startDrag);
    sliderHandle.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', drag);
    
    // Touch events for mobile
    sliderButton.addEventListener('touchstart', startDrag);
    sliderHandle.addEventListener('touchstart', startDrag);
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('touchcancel', stopDrag);
    window.addEventListener('touchmove', drag);
    
    /**
     * Starts the dragging process
     * @param {Event} e - Mouse or touch event
     */
    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
    }
    
    /**
     * Stops the dragging process
     */
    function stopDrag() {
      isDragging = false;
    }
    
    /**
     * Handles the drag movement
     * @param {Event} e - Mouse or touch event
     */
    function drag(e) {
      if (!isDragging) return;
      
      // Get cursor position
      let cursorX;
      
      if (e.type.includes('mouse')) {
        cursorX = e.pageX;
      } else {
        cursorX = e.touches[0].pageX;
      }
      
      // Calculate position relative to slider
      const sliderRect = slider.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      const sliderLeft = sliderRect.left + window.scrollX;
      
      let position = (cursorX - sliderLeft) / sliderWidth * 100;
      
      // Constrain position between 0% and 100%
      position = Math.max(0, Math.min(100, position));
      
      // Update UI
      afterImageContainer.style.width = `${position}%`;
      sliderHandle.style.left = `${position}%`;
      sliderButton.style.left = `${position}%`;
    }
    
    // Add initial animation to draw attention to the slider
    setTimeout(() => {
      const initialPos = 50;
      const animateTo = 35;
      
      // Animate to show the functionality
      afterImageContainer.style.transition = 'width 1s ease-in-out';
      sliderHandle.style.transition = 'left 1s ease-in-out';
      sliderButton.style.transition = 'left 1s ease-in-out';
      
      afterImageContainer.style.width = `${animateTo}%`;
      sliderHandle.style.left = `${animateTo}%`;
      sliderButton.style.left = `${animateTo}%`;
      
      setTimeout(() => {
        afterImageContainer.style.width = `${initialPos}%`;
        sliderHandle.style.left = `${initialPos}%`;
        sliderButton.style.left = `${initialPos}%`;
        
        // Remove transition after initial animation
        setTimeout(() => {
          afterImageContainer.style.transition = '';
          sliderHandle.style.transition = '';
          sliderButton.style.transition = '';
        }, 1000);
      }, 1000);
    }, 1000);
  });
}