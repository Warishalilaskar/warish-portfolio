 const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const openIcon = document.getElementById("menu-open-icon");
    const closeIcon = document.getElementById("menu-close-icon");

    function closeMenu() {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
        openIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
    }

    menuBtn.addEventListener("click", () => {
        const isClosed = mobileMenu.classList.contains("hidden");

        if (isClosed) {
            mobileMenu.classList.remove("hidden");
            mobileMenu.classList.add("flex");
            openIcon.classList.add("hidden");
            closeIcon.classList.remove("hidden");
            menuBtn.setAttribute("aria-expanded", "true");
            menuBtn.setAttribute("aria-label", "Close navigation menu");
        } else {
            closeMenu();
        }
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });





    // CONTACT SECTION START

(function () {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm || contactForm.dataset.initialized === "true") {
        return;
    }

    contactForm.dataset.initialized = "true";

    const statusMessage = document.getElementById("contactFormStatus");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const service = document.getElementById("contactService").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !service || !message) {
            statusMessage.textContent = "Please complete all fields before continuing.";
            statusMessage.classList.remove("hidden");
            return;
        }

        const recipient = "warishalilaskar11051996@gmail.com";
        const subject = "Website Project Enquiry - " + service;

        const body = [
            "Hello Warish,",
            "",
            "I would like to discuss a website project.",
            "",
            "Name: " + name,
            "Email: " + email,
            "Service: " + service,
            "",
            "Project Details:",
            message,
            "",
            "Regards,",
            name
        ].join("\n");

        statusMessage.textContent =
            "Your email app should open with your project details. Review the email and press Send.";

        statusMessage.classList.remove("hidden");

        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        window.location.href = mailtoLink;
    });
})();





// PORTFOLIO ANIMATION SCRIPT 

(function () {
    "use strict";

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Find existing sections and footer */
    const sections = Array.from(
        document.querySelectorAll("section, footer")
    );

    /* Animate the existing navbar without changing its design */
    const navbar = document.querySelector("nav");

    if (navbar && !reduceMotion) {
        navbar.classList.add("portfolio-navbar-animate");
    }

    /* Add hover effects to existing links and buttons */
    document.querySelectorAll("a, button").forEach(function (element) {
        element.classList.add("portfolio-interactive");
    });

    /* Add subtle hover effects to existing project/service cards */
    document.querySelectorAll(
        "section .grid > *, footer .grid > *"
    ).forEach(function (card) {
        card.classList.add("portfolio-card-hover");
    });

    /* Do not hide content when reduced motion is requested */
    if (reduceMotion || !("IntersectionObserver" in window)) {
        return;
    }

    /* Activate scroll animations only after setup is complete */
    document.documentElement.classList.add(
        "portfolio-motion-ready"
    );

    const observer = new IntersectionObserver(
        function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    /* Reveal each existing section smoothly */
    sections.forEach(function (section) {
        section.classList.add("portfolio-reveal");
        observer.observe(section);
    });

    /* Reveal cards one by one */
    document.querySelectorAll(
        "section .grid > *, footer .grid > *"
    ).forEach(function (card, index) {
        card.classList.add(
            "portfolio-reveal",
            "portfolio-card-reveal"
        );

        card.style.setProperty(
            "--reveal-delay",
            (index % 4) * 100 + "ms"
        );

        observer.observe(card);
    });
    console.log("Portfolio animation script is running!");
})();


