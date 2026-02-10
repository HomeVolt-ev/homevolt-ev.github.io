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

    // 3. Google Form Submission UI Handling (Premium Toast)
    const form = document.getElementById('consultationForm');
    const successToast = document.getElementById('success-notification');
    
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            // A. Change button UI to show processing
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none";
            
            // B. Wait 1.5 seconds (to simulate network request)
            setTimeout(() => {
                // Reset Button
                btn.innerText = "Request Sent!";
                btn.style.background = "#fff";
                btn.style.color = "#000";
                btn.style.opacity = "1";
                
                // C. Show Premium Toast Notification
                if (successToast) {
                    successToast.classList.add('active');
                    
                    // Hide Toast automatically after 5 seconds
                    setTimeout(() => {
                        successToast.classList.remove('active');
                    }, 5000);
                }

                // Reset Form
                form.reset();
                
                // Revert button text after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.style.pointerEvents = "auto";
                }, 3000);
                
            }, 1500);
        });
    }
});