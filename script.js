document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // 2. Lag-Free Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal-text, .reveal-card, .reveal-side');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Google Form Submission UI Handling
    const form = document.getElementById('consultationForm');
    
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            // Change button UI to show processing immediately
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none"; // Prevent double clicking
            
            // Wait 1.5 seconds (to allow form to post to hidden iframe) then show success
            setTimeout(() => {
                btn.innerText = "Request Sent!";
                btn.style.background = "#fff";
                btn.style.color = "#000";
                btn.style.opacity = "1";
                
                // Reset form fields
                form.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.style.pointerEvents = "auto";
                }, 3000);
                
                alert("Thanks! Your request has been sent to the HomeVolt team.");
            }, 1500);
        });
    }
});