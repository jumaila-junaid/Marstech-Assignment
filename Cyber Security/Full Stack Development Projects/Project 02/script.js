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

    // Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Icon change (optional)
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
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

    /* =========================
       IMAGE PROTECTION ONLY
    ========================= */
    
    // 1. Protect all images from right click
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        // Prevent right click
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showImageAlert('🖼️ Image is protected');
            return false;
        });
        
        // Prevent drag and drop
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Add CSS protection
        img.style.pointerEvents = 'none';
        img.style.userSelect = 'none';
        img.style.webkitUserDrag = 'none';
    });
    
    // 2. Special protection for profile image
    const profileImage = document.querySelector('.hero-image img');
    if (profileImage) {
        // Add transparent overlay
        const imageContainer = profileImage.parentElement;
        if (imageContainer && !imageContainer.querySelector('.img-protector')) {
            const protector = document.createElement('div');
            protector.className = 'img-protector';
            protector.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: transparent;
                z-index: 5;
                cursor: not-allowed;
            `;
            imageContainer.style.position = 'relative';
            imageContainer.appendChild(protector);
        }
    }
    
    // 3. Alert function for image protection
    function showImageAlert(message) {
        // Remove existing alert if any
        const existingAlert = document.getElementById('image-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alertBox = document.createElement('div');
        alertBox.id = 'image-alert';
        alertBox.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #a10cbb, #16a34a);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 1.7s;
            border-left: 4px solid white;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        alertBox.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 18px;">${message.split(' ')[0]}</span>
                <span>${message.split(' ').slice(1).join(' ')}</span>
            </div>
        `;
        
        document.body.appendChild(alertBox);
        
        // Remove after 2 seconds
        setTimeout(() => {
            if (document.getElementById('image-alert')) {
                document.body.removeChild(alertBox);
            }
        }, 2000);
    }
    
    console.log("✅ Image protection activated");

});

// Additional image protection on window load
window.addEventListener('load', function() {
    // Double protection for images
    document.querySelectorAll('img').forEach(img => {
        img.oncontextmenu = function() {
            return false;
        };
    });
});