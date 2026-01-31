document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       THEME TOGGLE (SAFE)
    ========================= */
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    function initializeTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "light") {
            body.classList.add("light-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else if (savedTheme === "dark") {
            body.classList.remove("light-mode");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        } else if (prefersDark) {
            body.classList.remove("light-mode");
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.add("light-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "light");
        }
    }

    function toggleTheme() {
        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "light");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "dark");
        }
    }

    initializeTheme();
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    /* =========================
       TYPING EFFECT (MOBILE SAFE)
    ========================= */
    const typingElement = document.querySelector(".typing");

    const rolesDesktop = [
        "Full Stack Developer",
        "Cybersecurity Analyst",
        "AI Enthusiast",
        "Software Developer"
    ];

    const rolesMobile = [
        "Full Stack Developer",
        "Cybersecurity Analyst"
    ];

    const roles = window.innerWidth <= 768 ? rolesMobile : rolesDesktop;

    if (typingElement) {
        typingElement.textContent = "";
        typingElement.style.maxWidth = "100%";

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }

        setTimeout(typeEffect, 800);
    }

    /* =========================
       SCROLL FADE-IN ANIMATION
    ========================= */
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

});