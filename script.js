/* ==========================================
   ABC College Website
   Author: Your Name
   Description: JavaScript Functions
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       1. Add Fade-In Class to Sections
    ====================================== */

    const elements = document.querySelectorAll(
        "section, .card, .gallery img, footer"
    );

    elements.forEach((element) => {
        element.classList.add("fade-in");
    });

    /* ======================================
       2. Fade-In Animation on Scroll
    ====================================== */

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });
        },
        {
            threshold: 0.15
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });

    /* ======================================
       3. Active Navbar Link on Scroll
    ====================================== */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {

                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();

    /* ======================================
       4. Navbar Shadow on Scroll
    ====================================== */

    const navbar = document.querySelector(".navbar");

    function navbarEffect() {

        if (window.scrollY > 40) {

            navbar.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.10)";
            navbar.style.backgroundColor =
                "rgba(255,255,255,0.98)";

        } else {

            navbar.style.boxShadow = "none";
            navbar.style.backgroundColor =
                "rgba(255,255,255,0.96)";
        }

    }

    window.addEventListener("scroll", navbarEffect);

    navbarEffect();

    /* ======================================
       5. Close Mobile Menu After Click
    ====================================== */

    const navbarCollapse =
        document.querySelector(".navbar-collapse");

    const bsCollapse = new bootstrap.Collapse(
        navbarCollapse,
        {
            toggle: false
        }
    );

    document.querySelectorAll(".nav-link").forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }

        });

    });

    /* ======================================
       6. Contact Form Validation
    ====================================== */

    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                form.querySelector('input[type="text"]').value.trim();

            const email =
                form.querySelector('input[type="email"]').value.trim();

            const message =
                form.querySelector("textarea").value.trim();

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                alert("Please fill in all fields.");
                return;

            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");
                return;

            }

            alert(
                "Thank you! Your message has been submitted successfully."
            );

            form.reset();

        });

    }

    /* ======================================
       7. Button Ripple Effect
    ====================================== */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {

        button.addEventListener("click", function (e) {

            const circle =
                document.createElement("span");

            const diameter =
                Math.max(
                    button.clientWidth,
                    button.clientHeight
                );

            const radius = diameter / 2;

            circle.style.width =
                circle.style.height =
                `${diameter}px`;

            circle.style.left =
                `${e.clientX -
                button.getBoundingClientRect().left -
                radius}px`;

            circle.style.top =
                `${e.clientY -
                button.getBoundingClientRect().top -
                radius}px`;

            circle.classList.add("ripple");

            const ripple =
                button.getElementsByClassName("ripple")[0];

            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);

        });

    });

});