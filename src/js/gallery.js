/**
 * Initializes gallery with lightbox functionality
 */
export function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const galleryModal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = document.getElementById('closeGallery');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');
  
  if (!galleryItems.length || !galleryModal || !modalImage) return;
  
  let currentIndex = 0;
  const imageSources = Array.from(galleryItems).map(img => img.src);
  
  // Open gallery modal when clicking on an image
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      updateModalImage();
      openModal();
    });
  });
  
  // Close modal when clicking close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // Navigate to previous image
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
      updateModalImage();
    });
  }
  
  // Navigate to next image
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % imageSources.length;
      updateModalImage();
    });
  }
  
  // Close modal when clicking outside the image
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeModal();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('visible')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
      updateModalImage();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % imageSources.length;
      updateModalImage();
    }
  });
  
  /**
   * Updates the modal image based on current index
   */
  function updateModalImage() {
    const imgSrc = imageSources[currentIndex];
    modalImage.src = imgSrc;
    modalImage.alt = `Gallery Image ${currentIndex + 1}`;
    
    // Optional: Add loading animation
    modalImage.classList.add('opacity-0');
    modalImage.onload = () => {
      modalImage.classList.remove('opacity-0');
    };
  }
  
  /**
   * Opens the gallery modal
   */
  function openModal() {
    galleryModal.classList.remove('hidden');
    setTimeout(() => {
      galleryModal.classList.add('visible');
    }, 10);
    document.body.style.overflow = 'hidden';
  }
  
  /**
   * Closes the gallery modal
   */
  function closeModal() {
    galleryModal.classList.remove('visible');
    setTimeout(() => {
      galleryModal.classList.add('hidden');
    }, 300);
    document.body.style.overflow = 'auto';
  }
}