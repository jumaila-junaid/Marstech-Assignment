alert("JS working");

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        // nav-க்கு active class toggle செய்
        nav.classList.toggle('active');
        
        // Hamburger to X animation (optional)
        const spans = this.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            // X-ஆக மாற்று
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            // Hamburger-ஆக மாற்று
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Menu item-ஐ கிளிக் செய்தால் menu மூட
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            // Animation reset
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

  const roles = [
    "Full Stack Developer",
    "Cybersecurity Analyst",
    "AI Enthusiast",
    "Software Developer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingElement = document.querySelector(".typing");

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        setTimeout(() => (isDeleting = true), 1200);
      }
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }

  typeEffect();
});