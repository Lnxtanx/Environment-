document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and content sections
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.content-section');
    const heading = document.querySelector('.animated-heading');

    // Add letter animation to heading
    const text = heading.textContent;
    heading.textContent = '';
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${i * 0.1}s`;
        heading.appendChild(span);
    });

    // Function to show active section and update navigation
    function showSection(sectionId) {
        // Remove active class from all sections and links
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.transform = 'translateY(20px)';
            section.style.opacity = '0';
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to selected section and link
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`#${sectionId.replace('-section', '')}`);
        
        if (targetSection && targetLink) {
            // Delay adding active class for smooth transition
            setTimeout(() => {
                targetSection.classList.add('active');
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.opacity = '1';
            }, 50);
            targetLink.classList.add('active');

            // Restart animations
            restartAnimations(targetSection);
        }
    }

    // Function to restart animations
    function restartAnimations(section) {
        const animations = section.querySelectorAll('.animation-container *');
        animations.forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.id + '-section';
            showSection(sectionId);
        });

        // Add hover effect
        link.addEventListener('mouseover', function() {
            this.querySelector('.icon').style.transform = 'scale(1.2)';
        });
        link.addEventListener('mouseout', function() {
            this.querySelector('.icon').style.transform = 'scale(1)';
        });
    });

    // Show water section by default
    showSection('water-section');

    // Add scroll reveal effect for facts boxes
    const factsBoxes = document.querySelectorAll('.facts-box');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    factsBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'all 0.5s ease';
        observer.observe(box);
    });

    // Add ripple effect to water animation
    const waterSection = document.querySelector('#water-section');
    const waterAnimation = waterSection.querySelector('.water-animation');
    
    function createRipple() {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        waterAnimation.appendChild(ripple);
        
        ripple.style.animation = 'rippleEffect 2s ease-out forwards';
        
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }

    setInterval(createRipple, 2000);
}); 