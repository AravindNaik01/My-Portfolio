// Add animations on scroll
document.addEventListener("DOMContentLoaded", function () {
    const animateElements = document.querySelectorAll(".animate-on-scroll");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", "animate__fadeInUp");
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );
  
    animateElements.forEach((element) => {
      observer.observe(element);
    });
  
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
  
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDarkMode = body.classList.contains("dark-mode");
      themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  });
