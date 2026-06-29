import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.padding = '15px 0';
      navbar.style.boxShadow = '0 4px 6px -1px rgba(15, 74, 37, 0.05)';
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  
  // Create mobile menu overlay
  const mobileMenu = document.createElement('div');
  mobileMenu.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--white);
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  `;
  
  const linksHTML = Array.from(navLinks.children).map(li => {
    return `<a href="${li.children[0].href}" style="font-size: 1.5rem; font-weight: 600; color: var(--primary-green); text-decoration: none;">${li.children[0].textContent}</a>`;
  }).join('');
  
  mobileMenu.innerHTML = `
    <button id="close-menu" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 2rem; color: var(--primary-green); cursor: pointer;">&times;</button>
    ${linksHTML}
  `;
  document.body.appendChild(mobileMenu);

  let isMenuOpen = false;
  
  mobileBtn.addEventListener('click', () => {
    isMenuOpen = true;
    mobileMenu.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.id === 'close-menu') {
      isMenuOpen = false;
      mobileMenu.style.transform = 'translateY(-100%)';
      document.body.style.overflow = 'auto';
    }
  });

  // --- Smooth Scrolling for Nav Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Navigation Button Click ---
  document.getElementById('nav-btn').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });

  // --- GSAP Scroll Animations ---
  
  // Hero Section Initial Animation
  const heroTl = gsap.timeline();
  heroTl.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-btns', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-image', { 
          x: 50, 
          rotationY: -15, 
          opacity: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          transformPerspective: 1000
        }, '-=1');

  // Hero Parallax on Scroll
  gsap.to('.hero-bg-shape', {
    yPercent: 50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  
  // 3D Parallax effect on hero image on scroll
  gsap.to('.hero-image', {
    yPercent: 20,
    rotationX: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // General Reveal Animations
  const revealElements = document.querySelectorAll('.gs_reveal');
  
  revealElements.forEach((elem) => {
    let x = 0, y = 50, rotationY = 0;
    
    if (elem.classList.contains('gs_reveal_fromLeft')) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains('gs_reveal_fromRight')) {
      x = 100;
      y = 0;
    }

    gsap.fromTo(elem, 
      { x: x, y: y, opacity: 0 }, 
      {
        duration: 1, 
        x: 0, 
        y: 0, 
        opacity: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // 3D Scroll Effect for Plan Cards
  const planCards = document.querySelectorAll('.plan-card');
  planCards.forEach((card, i) => {
    gsap.fromTo(card, 
      { 
        rotationX: 15, 
        rotationY: i === 0 ? 15 : (i === 2 ? -15 : 0),
        z: -100,
        opacity: 0
      },
      {
        rotationX: 0,
        rotationY: 0,
        z: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.plans-grid',
          start: 'top 80%',
        }
      }
    );
  });

  // Form Submission
  const form = document.getElementById('consultation-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    
    // Simulate loading
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
      // Success state
      btn.textContent = 'Request Sent Successfully!';
      btn.style.backgroundColor = '#166A35'; // Success green
      btn.style.color = '#fff';
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.backgroundColor = '';
      }, 3000);
    }, 1500);
  });
});
