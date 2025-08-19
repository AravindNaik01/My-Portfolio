



document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
///

// Chatbot Feature
 const chatbotButton = document.getElementById("chatbot-button");
  const chatbotWindow = document.getElementById("chatbot-window");
  const closeChat = document.getElementById("close-chat");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");

  // Resume data with clickable links
  const resumeData = `
You are Aravind J Naik's personal portfolio assistant.
Details:
- 📧 Email: <a href="mailto:naikaravind044@gmail.com">naikaravind044@gmail.com</a>
- 📱 Phone: <a href="tel:+916363986735">+91 6363986735</a>
- 💻 GitHub: <a href="https://github.com/AravindNaik01" target="_blank">github.com/AravindNaik01</a>
- 🔗 LinkedIn: <a href="https://linkedin.com/in/aravindnaik01" target="_blank">linkedin.com/in/aravindnaik01</a>
- 📍 Location: Mangalore, India
- 💡 Skills: Java, C, Python, HTML, CSS, JavaScript, ReactJS, NodeJS, MySQL, MongoDB, Git, GitHub, VS Code, Figma
- 🎓 Education: B.E. Computer Science Engineering, Shree Devi Institute of Technology, CGPA: 8.6
- 🛠 Projects: Student Feedback System (HTML, CSS, JS); Mango Leaf Disease Detection (TensorFlow + Flask, 85% accuracy)
- 💼 Experience: Web Dev Intern @ Aadi Foundation x Microsoft; MERN Stack Developer Intern @ Zephyr Technologies
- 📜 Certifications: Core Java (Internshala); Postman API Fundamentals Student Expert
- 🏆 Achievements: Winner Sankalp '25 Hackathon; Winner Code4Change Hackathon
- 🌟 Extra: IEEE Student Member, participated in technical competitions.

If the user asks about Aravind, answer based on above info.  
If irrelevant, politely say you only answer about Aravind.
`;

  async function askBot(userMessage) {
    const apiKey = "AIzaSyA9niQryktIIIUGeoMh-sGs1WIMGyY4blQ"; // ⚠️ testing key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          parts: [
            { text: resumeData },
            { text: "User: " + userMessage }
          ]
        }
      ]
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t generate a response.";
    } catch (err) {
      console.error(err);
      return "Error: Unable to reach AI server.";
    }
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    msg.innerHTML = (sender === "user" ? "<b>You:</b> " : "<b>Bot:</b> ") + text; // ✅ innerHTML for links
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  chatbotInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const userText = chatbotInput.value.trim();
      if (!userText) return;
      addMessage("user", userText);
      chatbotInput.value = "";

      const botReply = await askBot(userText);
      addMessage("bot", botReply);
    }
  });

  chatbotButton.onclick = () => chatbotWindow.style.display = "flex";
  closeChat.onclick = () => chatbotWindow.style.display = "none";


    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > heroSection.offsetHeight - 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.querySelector('a').classList.remove('active');
            if (item.querySelector('a').getAttribute('href') === `#${current}`) {
                item.querySelector('a').classList.add('active');
            }
        });
    });

    // Theme Switcher
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply saved theme
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // Skills Section Animation (without percentages)
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        // Set initial state
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        skillsObserver.observe(skillsSection);
    }

    // Scroll Animations
    ScrollReveal().reveal('.hero-text, .hero-image', {
        delay: 200,
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        easing: 'ease',
    });
    
    ScrollReveal().reveal('.section-header', {
        delay: 200,
        origin: 'top',
        distance: '50px',
        duration: 800,
    });
    
    ScrollReveal().reveal('.about-content, .projects-grid, .experience-container, .contact-container', {
        delay: 300,
        interval: 100,
        origin: 'bottom',
        distance: '50px',
        duration: 800,
    });

   
//     // Firebase Contact Form Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && window.firebaseApp) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // This prevents both page reload and URL params
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formFeedback.style.display = 'none';
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim() || 'No subject',
            message: document.getElementById('message').value.trim(),
            timestamp: window.firebaseApp.serverTimestamp()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showFeedback('Please fill in all required fields', 'error');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        if (!validateEmail(formData.email)) {
            showFeedback('Please enter a valid email address', 'error');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }
        
        try {
            // Add to Firestore
            const docRef = await window.firebaseApp.addDoc(
                window.firebaseApp.collection(
                    window.firebaseApp.db, 
                    'contactSubmissions'
                ), 
                formData
            );
            
            console.log('Document written with ID: ', docRef.id);
            showFeedback('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
            showFeedback('There was an error sending your message. Please try again later.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.style.display = 'block';
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
} else {
    console.error('Firebase not initialized or contact form missing');
}
    // Initialize first nav item as active
    if (navItems.length > 0) {
        navItems[0].querySelector('a').classList.add('active');
    }
});


    
