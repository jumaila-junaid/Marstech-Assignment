/**
 * Jumaila Junaid - Portfolio Scripts
 * Theme Toggle, Smooth Scroll, Nav Spy, Typing Effect, Animations & Interactivity
 */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       1. THEME TOGGLE (Dark / Light Mode)
       ========================================================================== */
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    function applyTheme(theme) {
        if (theme === "light") {
            body.classList.add("light-mode");
            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        } else {
            body.classList.remove("light-mode");
            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        }
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem("portfolio-theme");
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark) {
            applyTheme("dark");
            localStorage.setItem("portfolio-theme", "dark");
        } else {
            applyTheme("dark"); // Default dark mode
        }
    }

    function toggleTheme() {
        const isLight = body.classList.toggle("light-mode");
        const currentTheme = isLight ? "light" : "dark";

        if (themeIcon) {
            if (isLight) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            } else {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        }

        localStorage.setItem("portfolio-theme", currentTheme);
    }

    initializeTheme();
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    /* ==========================================================================
       2. MOBILE NAVIGATION MENU
       ========================================================================== */
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("navbar");

    function closeMobileNav() {
        if (nav && nav.classList.contains("active")) {
            nav.classList.remove("active");
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        }
    }

    function toggleMobileNav() {
        if (!nav || !menuToggle) return;
        const isActive = nav.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");

        const icon = menuToggle.querySelector("i");
        if (icon) {
            if (isActive) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleMobileNav();
        });
    }

    // Close when clicking any nav link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            closeMobileNav();
        });
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
        if (nav && menuToggle && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileNav();
        }
    });

    /* ==========================================================================
       3. ACTIVE NAV LINK ON SCROLL (SCROLL SPY)
       ========================================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function highlightActiveNav() {
        let currentSectionId = "";

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 160 && rect.bottom >= 160) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }
    }

    /* ==========================================================================
       4. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
       ========================================================================== */
    const scrollProgress = document.getElementById("scrollProgress");
    const backToTopBtn = document.getElementById("backToTop");
    let isScrollTicking = false;

    function handleScrollFeatures() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (scrollProgress && docHeight > 0) {
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollTop > 350) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }

        // Scroll spy
        highlightActiveNav();
    }

    window.addEventListener("scroll", function () {
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                handleScrollFeatures();
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ==========================================================================
       5. TYPING EFFECT
       ========================================================================== */
    const typingElement = document.querySelector(".typing");
    const roles = [
        "Junior Full Stack Developer",
        "AI & Cybersecurity Enthusiast"
    ];

    if (typingElement) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function type() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    typingSpeed = 1800; // Pause after typing full phrase
                } else {
                    typingSpeed = 80;
                }
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    typingSpeed = 350; // Pause before typing next phrase
                } else {
                    typingSpeed = 40;
                }
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 300);
    }

    /* ==========================================================================
       6. SCROLL FADE-IN ANIMATIONS
       ========================================================================== */
    const faders = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {
        const appearOptions = {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    } else {
        // Fallback for older browsers
        faders.forEach(fader => fader.classList.add("visible"));
    }

    /* ==========================================================================
       7. CONTACT FORM INTERACTION
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = "Please fill in all required fields.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            // Create mailto link for reliable native email dispatch
            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const bodyContent = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:jumailajunaid25@gmail.com?subject=${subject}&body=${bodyContent}`;

            if (formStatus) {
                formStatus.textContent = "Opening your email client to send message...";
                formStatus.className = "form-status success";
            }

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 400);
        });
    }

});