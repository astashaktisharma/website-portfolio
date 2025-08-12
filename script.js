document.addEventListener("DOMContentLoaded", () => {
  // Sticky Sidebar Logic
  const sidebar = document.getElementById("sidebar");
  const intro = document.getElementById("intro");

  if (sidebar && intro && window.innerWidth >= 768) {
    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        sidebar.classList.toggle("sticky-sidebar", entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );
    stickyObserver.observe(intro);
  }

  // Active Nav Highlight
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.dataset.section === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, {
    rootMargin: "-40% 0px -50% 0px",
    threshold: 0.2
  });

  sections.forEach((section) => navObserver.observe(section));

  // Hero -> StickyName Transition
  const hero = document.getElementById("hero");
  const heroName = document.getElementById("heroName");
  const stickyName = document.getElementById("stickyName");
  const siteContent = document.getElementById("siteContent");

  if (hero && heroName && stickyName && siteContent) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      if (scrollY > heroHeight - 100) {
        stickyName.classList.replace("opacity-0", "opacity-100");
        heroName.classList.add("opacity-0");
        siteContent.classList.add("bg-dot-grid");
      } else {
        stickyName.classList.replace("opacity-100", "opacity-0");
        heroName.classList.remove("opacity-0");
        siteContent.classList.remove("bg-dot-grid");
      }
    });
  }

  // Typing Effect on Hero Name
  const heroText = "Hi, I am Asta Shakti Suman Sharma...";
  if (heroName) {
    let i = 0;
    const speed = 70;
    heroName.innerHTML = "";
    function typeWriter() {
      if (i < heroText.length) {
        heroName.innerHTML += heroText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();
  }

  // Skills Fade-in
  const skillsSection = document.getElementById("skills");
  if (skillsSection && hero && window.innerWidth >= 640) {
    const skillsObserver = new IntersectionObserver(([entry]) => {
      skillsSection.classList.toggle("opacity-100", !entry.isIntersecting);
      skillsSection.classList.toggle("opacity-0", entry.isIntersecting);
    }, {
      threshold: 0.1
    });
    skillsObserver.observe(hero);
  }

  // Skill Badges
  const skills = [
    "Python", "Machine Learning", "Data Science", "React", "SQL", "R", "Matlab",
    "HTML", "CSS", "JavaScript", "Git", "GitHub",
    "Object-Oriented Programming", "Problem Solving", "Critical Thinking", "Teamwork"
  ];

  const skillContainer = document.getElementById("skills-container");
  if (skillContainer) {
    skills.forEach(skill => {
      const span = document.createElement("span");
      span.textContent = skill;
      span.className = "bg-[#2c2c2c] text-[#dcd2c2] text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:bg-[#bfa888] transition";
      skillContainer.appendChild(span);
    });
  }

  // Mobile Menu Toggle
  const menu = document.getElementById("mobileMenu");
  const openBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeMenuBtn");

  if (openBtn && closeBtn && menu) {
    openBtn.addEventListener("click", () => {
      menu.classList.remove("-translate-x-full");
      menu.classList.add("translate-x-0");
    });

    closeBtn.addEventListener("click", () => {
      menu.classList.add("-translate-x-full");
      menu.classList.remove("translate-x-0");
    });
  }

  // Close mobile menu on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && menu) {
      menu.classList.add("-translate-x-full");
      menu.classList.remove("translate-x-0");
    }
  });

  // Allow closing when clicking nav link
  window.closeMobileMenu = function () {
    if (menu) {
      menu.classList.add("-translate-x-full");
      menu.classList.remove("translate-x-0");
    }
  };

  // Contact Form Handler
  const thankYouMsg = document.getElementById("thankYouMsg");
  const contactForm = document.querySelector("form[onsubmit*='handleFormSubmit']");
  if (contactForm && thankYouMsg) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      thankYouMsg.classList.remove("hidden");
      contactForm.reset();
      setTimeout(() => {
        contactForm.submit();
      }, 500);
    });
  }
});
