document.addEventListener('DOMContentLoaded', function() {
  // Theme Switcher
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
  }

  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
  });

  // Update theme icon
  function updateThemeIcon(theme) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links li');

  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  links.forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
      });
  });

  // Sticky Header
  window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      header.classList.toggle('sticky', window.scrollY > 0);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
          });
      });
  });

  // Initialize EmailJS
  emailjs.init("Rm0hiSMFYSuX6JJ9h");

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;

      // Get form data
      const formData = {
          name: contactForm.querySelector('input[type="text"]').value,
          email: contactForm.querySelector('input[type="email"]').value,
          title: contactForm.querySelector('input[placeholder="Subject"]').value,
          message: contactForm.querySelector('textarea').value
      };

      // Send email using EmailJS
      emailjs.send('service_k3e8gn8', 'template_qngtfgm', formData)
          .then(() => {
              // Show success message
              alert('Thank you for your message! I will get back to you soon.');
              contactForm.reset();
          })
          .catch((error) => {
              // Show error message
              alert('Sorry, there was an error sending your message. Please try again later.');
              console.error('EmailJS error:', error);
          })
          .finally(() => {
              // Reset button state
              submitButton.innerHTML = originalButtonText;
              submitButton.disabled = false;
          });
  });

  // Project filter (example functionality)
  // You can extend this to filter projects by category
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');
          
          // Here you would filter projects based on the button's data-filter attribute
          // For now, we'll just log the filter value
          console.log(`Filter by: ${button.dataset.filter}`);
      });
  });

  // Typing animation for hero roles
  const roles = ["Web Developer", "Prompt Engineer", "Data Analyst", "AI Enthusiast"];
  const typedRole = document.querySelector('.typed-role');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
          typedRole.textContent = currentRole.substring(0, charIndex--);
          if (charIndex < 0) {
              isDeleting = false;
              roleIndex = (roleIndex + 1) % roles.length;
              setTimeout(typeRole, 500);
          } else {
              setTimeout(typeRole, 50);
          }
      } else {
          typedRole.textContent = currentRole.substring(0, charIndex++);
          if (charIndex > currentRole.length) {
              isDeleting = true;
              setTimeout(typeRole, 1200);
          } else {
              setTimeout(typeRole, 100);
          }
      }
  }
  if (typedRole) typeRole();

  // Blog Modal Logic
  const blogModal = document.getElementById('blog-modal');
  const blogModalBody = document.querySelector('.blog-modal-body');
  const blogModalClose = document.querySelector('.blog-modal-close');

  // Open modal on 'Read More' click
  const readMoreLinks = document.querySelectorAll('.read-more');
  readMoreLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const blogCard = this.closest('.blog-card');
          if (blogCard) {
              // Clone the blog card content (or customize as needed)
              const blogContent = blogCard.querySelector('.blog-content').cloneNode(true);
              // Remove the 'Read More' link in modal
              const readMore = blogContent.querySelector('.read-more');
              if (readMore) readMore.remove();
              blogModalBody.innerHTML = '';
              blogModalBody.appendChild(blogContent);
              blogModal.style.display = 'flex';
              document.body.style.overflow = 'hidden'; // Prevent background scroll
          }
      });
  });

  // Close modal on close button
  blogModalClose.addEventListener('click', () => {
      blogModal.style.display = 'none';
      document.body.style.overflow = '';
  });
  // Close modal on click outside content
  blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
          blogModal.style.display = 'none';
          document.body.style.overflow = '';
      }
  });
});