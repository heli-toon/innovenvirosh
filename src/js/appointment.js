import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, addDays } from 'date-fns';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCalendar();
  initAppointmentForm();
});

// Navbar functionality
function initNavbar() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    const menuIcon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.classList.remove('bi-x-lg');
      menuIcon.classList.add('bi-list');
    } else {
      menuIcon.classList.remove('bi-list');
      menuIcon.classList.add('bi-x-lg');
    }
  });
}

// Calendar functionality
function initCalendar() {
  let currentDate = new Date();
  let selectedDate = null;
  let selectedTimeSlot = null;
  
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const currentMonthElement = document.getElementById('currentMonth');
  const calendarDays = document.getElementById('calendarDays');
  const timeSlots = document.getElementById('timeSlots');
  
  // Initialize calendar
  renderCalendar(currentDate);
  
  // Event listeners for month navigation
  prevMonthBtn.addEventListener('click', () => {
    currentDate = subMonths(currentDate, 1);
    renderCalendar(currentDate);
  });
  
  nextMonthBtn.addEventListener('click', () => {
    currentDate = addMonths(currentDate, 1);
    renderCalendar(currentDate);
  });
  
  function renderCalendar(date) {
    // Update month display
    currentMonthElement.textContent = format(date, 'MMMM yyyy');
    
    // Get start and end dates
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    
    // Get all days in the month
    const monthDays = eachDayOfInterval({ start: firstDay, end: lastDay });
    
    // Clear previous calendar
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'h-12';
      calendarDays.appendChild(emptyCell);
    }
    
    // Add days to calendar
    monthDays.forEach(day => {
      const dayElement = document.createElement('button');
      const isDisabled = isBefore(day, addDays(new Date(), -1));
      
      dayElement.className = `
        h-12 rounded-md text-center focus:outline-none transition-colors
        ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}
        ${isToday(day) ? 'bg-accent text-white' : 'bg-gray-50'}
        ${selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'bg-primary text-white' : ''}
      `;
      
      dayElement.textContent = format(day, 'd');
      
      if (!isDisabled) {
        dayElement.addEventListener('click', () => {
          // Remove selected class from previously selected date
          const previouslySelected = calendarDays.querySelector('.bg-primary.text-white');
          if (previouslySelected) {
            previouslySelected.classList.remove('bg-primary', 'text-white');
            previouslySelected.classList.add('bg-gray-50');
          }
          
          // Add selected class to clicked date
          dayElement.classList.remove('bg-gray-50');
          dayElement.classList.add('bg-primary', 'text-white');
          
          selectedDate = day;
          renderTimeSlots(day);
        });
      }
      
      calendarDays.appendChild(dayElement);
    });
  }
  
  function renderTimeSlots(date) {
    const slots = generateTimeSlots(date);
    timeSlots.innerHTML = '';
    
    slots.forEach(slot => {
      const button = document.createElement('button');
      button.className = `
        p-2 text-sm rounded-md text-center transition-colors
        ${slot.available ? 'hover:bg-primary hover:text-white bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
        ${selectedTimeSlot === slot.time ? 'bg-primary text-white' : ''}
      `;
      button.textContent = slot.time;
      
      if (slot.available) {
        button.addEventListener('click', () => {
          // Remove selected class from previously selected time slot
          const previouslySelected = timeSlots.querySelector('.bg-primary.text-white');
          if (previouslySelected) {
            previouslySelected.classList.remove('bg-primary', 'text-white');
            previouslySelected.classList.add('bg-gray-50');
          }
          
          // Add selected class to clicked time slot
          button.classList.remove('bg-gray-50');
          button.classList.add('bg-primary', 'text-white');
          
          selectedTimeSlot = slot.time;
        });
      }
      
      timeSlots.appendChild(button);
    });
  }
  
  function generateTimeSlots(date) {
    // Example time slots (9 AM to 5 PM)
    const slots = [];
    const isWeekend = [0, 6].includes(date.getDay());
    
    for (let hour = 9; hour <= 17; hour++) {
      const time = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      slots.push({
        time,
        available: !isWeekend && Math.random() > 0.3 // Randomly make some slots unavailable
      });
    }
    
    return slots;
  }
}

// Appointment form functionality
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const successMessage = document.getElementById('appointmentSuccess');
  const errorMessage = document.getElementById('appointmentError');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Booking...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // Show success message
      successMessage.classList.remove('hidden');
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 1500);
  });
  
  // Add input validation
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('border-error')) {
        input.classList.remove('border-error');
      }
    });
  });
}