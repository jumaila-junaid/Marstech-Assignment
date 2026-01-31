document.addEventListener("DOMContentLoaded", function() {
    
    // =========================
    // THEME TOGGLE FUNCTIONALITY
    // =========================
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;
    
    // Initialize theme based on saved preference or system preference
    function initializeTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        if (savedTheme === "light") {
            body.classList.add("light-mode");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else if (savedTheme === "dark") {
            body.classList.remove("light-mode");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        } else if (prefersDark) {
            // System preference is dark
            body.classList.remove("light-mode");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "dark");
        } else {
            // System preference is light
            body.classList.add("light-mode");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "light");
        }
    }
    
    // Toggle theme function
    function toggleTheme() {
        if (body.classList.contains("light-mode")) {
            // Switch to dark mode
            body.classList.remove("light-mode");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "dark");
        } else {
            // Switch to light mode
            body.classList.add("light-mode");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "light");
        }
    }
    
    // Initialize theme and add event listener
    initializeTheme();
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
    
    // =========================
    // TYPING EFFECT
    // =========================
    const roles = [
        "Full Stack Developer",
        "Cybersecurity Analyst",
        "AI Enthusiast",
        "Software Developer"
    ];
    
    const typingElement = document.querySelector(".typing");
    
    if (typingElement) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (!isDeleting) {
                // Typing forward
                typingElement.textContent = currentRole.slice(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentRole.length) {
                    // Pause at the end
                    isDeleting = true;
                    setTimeout(() => {
                        typeEffect();
                    }, 1500);
                    return;
                }
            } else {
                // Deleting backward
                typingElement.textContent = currentRole.slice(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
        
        // Start typing effect after a short delay
        setTimeout(() => {
            typeEffect();
        }, 500);
    }
    
    // =========================
    // SCROLL ANIMATIONS
    // =========================
    const faders = document.querySelectorAll(".fade-in");
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});