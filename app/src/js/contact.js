/**
 * Initializes contact form with validation and submission
 */
export function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      submitForm();
    }
  });
  
  /**
   * Validates the form fields
   * @returns {boolean} Whether the form is valid
   */
  function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Reset previous error states
    [name, email, phone, service, message].forEach(field => {
      field.classList.remove('border-error');
    });
    
    // Validate name (required)
    if (!name.value.trim()) {
      name.classList.add('border-error');
      isValid = false;
    }
    
    // Validate email (required and format)
    if (!email.value.trim() || !isValidEmail(email.value)) {
      email.classList.add('border-error');
      isValid = false;
    }
    
    // Validate phone (required)
    if (!phone.value.trim()) {
      phone.classList.add('border-error');
      isValid = false;
    }
    
    // Validate service (required)
    if (!service.value) {
      service.classList.add('border-error');
      isValid = false;
    }
    
    // Validate message (required)
    if (!message.value.trim()) {
      message.classList.add('border-error');
      isValid = false;
    }
    
    return isValid;
  }
  
  /**
   * Checks if email is valid format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  /**
   * Submits the form (simulated)
   */
  function submitForm() {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Add a CSS animation for the loading spinner
    const style = document.createElement('style');
    style.textContent = `
      .spin {
        display: inline-block;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Simulate AJAX request with timeout
    setTimeout(() => {
      // In a real implementation, you would send the form data to a server
      
      // Reset form fields
      contactForm.reset();
      
      // Show success message
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        
        // Hide success message after a delay
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 1500);
  }
  
  // Add input event listeners for real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('border-error')) {
        if (input.value.trim()) {
          input.classList.remove('border-error');
        }
      }
    });
  });
}