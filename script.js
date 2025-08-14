document.addEventListener("DOMContentLoaded", () => {

  // Hero Transition
  const hero = document.getElementById("hero");
  const heroName = document.getElementById("heroName");
  const stickyName = document.getElementById("stickyName");
  const topNav = document.getElementById("topNav");
  const siteContent = document.getElementById("siteContent");

  if (hero && heroName && stickyName && topNav && siteContent) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      if (scrollY > 100) {
        stickyName.classList.replace("opacity-0", "opacity-100");
        topNav.classList.replace("opacity-90", "opacity-100");
        heroName.classList.add("opacity-0");
        siteContent.classList.add("bg-dot-grid");
      } else {
        stickyName.classList.replace("opacity-100", "opacity-0");
        topNav.classList.replace("opacity-100", "opacity-90");
        heroName.classList.remove("opacity-0");
        siteContent.classList.remove("bg-dot-grid");
      }
    });
    
    // Make navigation visible after a short delay on page load
    setTimeout(() => {
      if (window.scrollY > 100) {
        topNav.classList.replace("opacity-90", "opacity-100");
        stickyName.classList.replace("opacity-0", "opacity-100");
      }
    }, 1000);
  }

  // Typing Effect
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





  // EmailJS Setup
  (function() {
    emailjs.init("kvY4KGlTp5yZlYTDr"); 
  })();

  // Contact Form
  const thankYouMsg = document.getElementById("thankYouMsg");
  const contactForm = document.querySelector("form[onsubmit*='handleFormSubmit']");
  
  if (contactForm && thankYouMsg) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      // Loading State
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      
      // Form Data
      const formData = {
        name: contactForm.querySelector('#name').value,
        email: contactForm.querySelector('#email').value,
        message: contactForm.querySelector('#message').value
      };
      
      // EmailJS Send
      emailjs.send("service_2ovnwvh", "template_ceq9alo", formData)
        .then(function(response) {
          console.log("SUCCESS!", response.status, response.text);
          thankYouMsg.classList.remove("hidden");
          contactForm.reset();
          submitBtn.textContent = "Message Sent!";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2000);
        }, function(error) {
          console.log("FAILED...", error);
          submitBtn.textContent = "Failed to send. Try again.";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2000);
        });
    });
  }
});

