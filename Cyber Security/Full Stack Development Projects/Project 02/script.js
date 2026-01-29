document.addEventListener("DOMContentLoaded", () => {

  /* -------- MOBILE MENU -------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");

      const spans = menuToggle.querySelectorAll("span");
      if (nav.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
      } else {
        spans.forEach(span => {
          span.style.transform = "none";
          span.style.opacity = "1";
        });
      }
    });
  }

  /* -------- TYPING EFFECT -------- */
  const roles = [
    "Full Stack Developer",
    "Cybersecurity Analyst",
    "AI Enthusiast",
    "Software Developer"
  ];

  const typingElement = document.querySelector(".typing");

  if (!typingElement) {
    console.error("Typing element not found");
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        setTimeout(() => (isDeleting = true), 1200);
      }
    } else {
      typingElement.textContent = currentRole.slice(0, charIndex - 1);
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