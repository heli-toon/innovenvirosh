// Import modules
import { initParallax } from './parallax.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';
import { initBeforeAfter } from './before-after.js';
import { initTestimonials } from './testimonials.js';
import { initContactForm } from './contact.js';

const images = [
  '/images/hero.jpg',
  '/images/11.jpg',
  '/images/14.jpg',
  '/images/13.webp',
  '/images/15.jpg'
];

const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

let current = 0;
let showingBg1 = true;

// Set initial image
bg1.style.backgroundImage = `url(${images[0]})`;

setInterval(() => {
  const nextIndex = (current + 1) % images.length;
  const nextImage = `url(${images[nextIndex]})`;

  if (showingBg1) {
    bg2.style.backgroundImage = nextImage;
    bg2.classList.remove('opacity-0');
    bg2.classList.add('opacity-100');
    bg1.classList.remove('opacity-100');
    bg1.classList.add('opacity-0');
  } else {
    bg1.style.backgroundImage = nextImage;
    bg1.classList.remove('opacity-0');
    bg1.classList.add('opacity-100');
    bg2.classList.remove('opacity-100');
    bg2.classList.add('opacity-0');
  }

  showingBg1 = !showingBg1;
  current = nextIndex;
}, 5000);

function initLoader() {
  const loader = document.getElementById('loader');
  
  if (!loader) return;
  // Simulate loading progress
  const progress = loader.querySelector('.loader-progress');
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 300);
      }, 500);
    } else {
      width += Math.random() * 30;
      if (width > 100) width = 100;
      progress.style.width = width + '%';
    }
  }, 500);
}
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initLoader();
  initNavbar();
  initParallax();
  initAnimations();
  initGallery();
  initBeforeAfter();
  initTestimonials();
  initContactForm();
  initBackToTop();
});

// Navbar functionality
function initNavbar() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Handle scroll for sticky navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Trigger once on page load
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  }
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Change icon based on menu state
    const menuIcon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.classList.remove('bi-x-lg');
      menuIcon.classList.add('bi-list');
    } else {
      menuIcon.classList.remove('bi-list');
      menuIcon.classList.add('bi-x-lg');
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const menuIcon = mobileMenuBtn.querySelector('i');
      menuIcon.classList.remove('bi-x-lg');
      menuIcon.classList.add('bi-list');
    });
  });
}
// Back to top button functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}