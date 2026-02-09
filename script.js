/* ===================================
   MEGHA PAREEK PORTFOLIO - JAVASCRIPT
   Enhanced Particles, Bubbles & Dynamic Effects
   Calm Ocean Theme
   =================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initBubbles();
    initScrollReveal();
    initNavigation();
    initCounterAnimation();
    initTypingEffect();
    initMouseGlow();
    initCardTilt();
    initSmoothScroll();
});

/* ===================================
   ENHANCED PARTICLE SYSTEM - Ocean Style
   =================================== */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    // Resize canvas to window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Enhanced Particle class with ocean colors
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.baseSpeedX = (Math.random() - 0.5) * 0.3;
            this.baseSpeedY = (Math.random() - 0.5) * 0.3;
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;

            // Ocean color palette
            const colors = [
                { r: 95, g: 181, b: 200 },   // Primary teal
                { r: 126, g: 212, b: 230 },  // Light teal
                { r: 126, g: 201, b: 163 },  // Seafoam
                { r: 168, g: 200, b: 212 },  // Soft blue
                { r: 240, g: 230, b: 211 },  // Pearl
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            // Add gentle wave motion
            this.pulsePhase += this.pulseSpeed;
            const waveFactor = Math.sin(this.pulsePhase) * 0.5;

            this.speedX = this.baseSpeedX + waveFactor * 0.1;
            this.speedY = this.baseSpeedY + Math.cos(this.pulsePhase) * 0.1;

            // Mouse interaction - gentle push
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.speedX += (dx / distance) * force * 0.5;
                this.speedY += (dy / distance) * force * 0.5;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges with smooth transition
            if (this.x < -20) this.x = canvas.width + 20;
            if (this.x > canvas.width + 20) this.x = -20;
            if (this.y < -20) this.y = canvas.height + 20;
            if (this.y > canvas.height + 20) this.y = -20;

            // Pulsing opacity
            this.currentOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.1;
        }

        draw() {
            const { r, g, b } = this.color;

            // Draw glowing particle
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 2
            );
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`);
            gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.5})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections between nearby particles
    function drawConnections() {
        const maxDistance = 120;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.15;

                    // Create gradient line
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    gradient.addColorStop(0, `rgba(95, 181, 200, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(126, 201, 163, ${opacity * 1.5})`);
                    gradient.addColorStop(1, `rgba(95, 181, 200, ${opacity})`);

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Reduce animation when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

/* ===================================
   FLOATING BUBBLES EFFECT
   =================================== */
function initBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubble-overlay';
    document.body.insertBefore(bubbleContainer, document.body.firstChild);

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        // Random properties
        const size = Math.random() * 20 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        bubbleContainer.appendChild(bubble);

        // Remove bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, (duration + delay) * 1000);
    }

    // Create initial bubbles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createBubble(), i * 200);
    }

    // Continue creating bubbles
    setInterval(createBubble, 2000);
}

/* ===================================
   SCROLL REVEAL ANIMATION - Enhanced
   =================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation to children if present
                const children = entry.target.querySelectorAll('.skill-list li, .project-highlights li, .timeline-details li');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.style.opacity = '1';
                    child.style.transform = 'translateX(0)';
                });
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Add reveal to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });

        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.8s ease';
        observer.observe(title);
    });
}

/* ===================================
   NAVIGATION - Enhanced
   =================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                // Add scrolled class for styling
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll and close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }

                // Smooth scroll to section
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ===================================
   COUNTER ANIMATION - Enhanced with easing
   =================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Enhanced easing function
                    const easeOutExpo = 1 - Math.pow(2, -10 * progress);
                    const currentValue = Math.floor(target * easeOutExpo);

                    counter.textContent = currentValue;

                    // Add glow effect during counting
                    const glowIntensity = (1 - progress) * 20;
                    counter.style.textShadow = `0 0 ${glowIntensity}px rgba(95, 181, 200, ${1 - progress})`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        counter.style.textShadow = '';
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/* ===================================
   TYPING EFFECT - Enhanced
   =================================== */
function initTypingEffect() {
    const titles = [
        'Data Science & AI Enthusiast',
        'Machine Learning Developer',
        'NLP Practitioner',
        'AI Application Builder',
        'Data Engineering Explorer'
    ];

    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80 + Math.random() * 50; // Natural typing variation
        }

        // Check if word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 600;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after initial animation
    setTimeout(type, 2000);
}

/* ===================================
   MOUSE GLOW EFFECT
   =================================== */
function initMouseGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(95, 181, 200, 0.08) 0%, transparent 70%);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 0;
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    let mouseTimeout;

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';

        // Hide glow when mouse stops
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            glow.style.opacity = '0';
        }, 3000);
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

/* ===================================
   ENHANCED TILT EFFECT FOR CARDS
   =================================== */
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .stat-card, .cert-card, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            // Add shine effect position
            const shineX = (x / rect.width) * 100;
            const shineY = (y / rect.height) * 100;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            card.style.setProperty('--shine-x', `${shineX}%`);
            card.style.setProperty('--shine-y', `${shineY}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

/* ===================================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
   =================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   PARALLAX EFFECT FOR HERO
   =================================== */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const parallaxSpeed = 0.4;

        // Move neural network with parallax
        const neuralNetwork = document.querySelector('.neural-network');
        if (neuralNetwork) {
            neuralNetwork.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Fade out hero content on scroll
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const opacity = 1 - (scrolled / (heroHeight * 0.6));
            const scale = 1 - (scrolled / heroHeight) * 0.1;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `scale(${Math.max(0.9, scale)})`;
        }

        // Scroll indicator fade
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const fadeStart = 50;
            const fadeEnd = 150;
            const opacity = scrolled < fadeStart ? 1 : Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
            scrollIndicator.style.opacity = opacity;
        }
    }
});

/* ===================================
   MAGNETIC BUTTONS EFFECT
   =================================== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

/* ===================================
   RIPPLE EFFECT ON CLICK
   =================================== */
document.querySelectorAll('.btn, .contact-card, .tag, .interest-tag').forEach(element => {
    element.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ===================================
   CONSOLE EASTER EGG - Ocean themed
   =================================== */
console.log('%c🌊 Welcome to the depths!', 'font-size: 20px; font-weight: bold; color: #5fb5c8;');
console.log('%c🐚 A portfolio as calm as the ocean...', 'font-size: 14px; color: #7ec9a3;');
console.log('%c✨ Built with vanilla HTML, CSS & JS', 'font-size: 12px; color: #9aafcc;');
console.log('%c— Megha Pareek', 'font-size: 12px; color: #c9a8e0; font-style: italic;');
