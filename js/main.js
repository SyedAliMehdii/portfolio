/**
 * main.js — Portfolio Website Interactive Logic
 * 
 * This file handles all dynamic behavior for the portfolio:
 *   1. Mobile hamburger menu toggle
 *   2. Typing effect (hero section — cycles through typingTexts from data.js)
 *   3. About section — renders info cards & stat cards from data.js
 *   4. Experience timeline — builds timeline with scroll-driven progress line
 *   5. Skills section — renders skill cards with animated progress bars
 *   6. Certificates section — renders cert cards with Show More/Less pagination
 *   7. Projects section — renders project cards with category filtering & pagination
 *   8. Scroll-reveal animations (IntersectionObserver) & stat counter scramble
 *   9. Active nav-link highlighting on scroll
 *  10. Email copy-to-clipboard with toast notification & sound
 *
 * Data source: js/data.js (all content arrays are defined there)
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Typing Effect
  const typedTextSpan = document.getElementById("typed-text");
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 1500;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (!typedTextSpan) return;
    if (charIndex < typingTexts[textArrayIndex].length) {
      typedTextSpan.textContent += typingTexts[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
      typedTextSpan.textContent = typingTexts[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= typingTexts.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  if (typingTexts && typingTexts.length > 0) {
    setTimeout(type, newTextDelay + 250);
  }

  // 2b. Render About Info Cards
  const aboutCardsContainer = document.getElementById('about-cards');
  if (aboutCardsContainer && typeof aboutInfoData !== 'undefined') {
    aboutInfoData.forEach(info => {
      const el = document.createElement('div');
      el.className = 'info-card';
      el.innerHTML = `
        <h4>${info.title}</h4>
        <p>${info.subtitle}</p>
      `;
      aboutCardsContainer.appendChild(el);
    });
  }

  // 2c. Render About Stats
  const aboutStatsContainer = document.getElementById('about-stats');
  if (aboutStatsContainer && typeof aboutStatsData !== 'undefined') {
    aboutStatsData.forEach(stat => {
      const el = document.createElement('div');
      el.className = 'stat-card';
      el.innerHTML = `
        <span class="stat-number">${stat.number}</span>
        <span class="stat-label">${stat.label}</span>
      `;
      aboutStatsContainer.appendChild(el);
    });
  }

  // 3. Render Experience (Timeline)
  const experienceGrid = document.getElementById('experience-grid');
  if (experienceGrid && typeof experienceData !== 'undefined') {
    // Change the container class from grid to timeline
    experienceGrid.className = 'timeline';

    // Create progress line
    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress';
    experienceGrid.appendChild(progressLine);

    experienceData.forEach((exp, index) => {
      const el = document.createElement('div');
      // Alternate between left and right sides
      const side = index % 2 === 0 ? 'left' : 'right';
      el.className = `timeline-item ${side} reveal`;

      el.innerHTML = `
        <div class="timeline-node"></div>
        <div class="timeline-content">
          <div class="timeline-duration">${exp.duration}</div>
          <h4 class="timeline-role">${exp.role}</h4>
          <div class="timeline-company">${exp.company}</div>
          <p class="timeline-desc">${exp.description}</p>
        </div>
      `;
      experienceGrid.appendChild(el);
    });

    let targetPercentage = 0;
    let currentPercentage = 0;

    // Smooth lerp function to eliminate jitter
    const animateProgressLine = () => {
      // Increased from 0.1 to 0.18 for a slightly faster, snappier follow effect
      currentPercentage += (targetPercentage - currentPercentage) * 0.18;
      progressLine.style.height = currentPercentage + '%';
      requestAnimationFrame(animateProgressLine);
    };
    animateProgressLine();

    // Scroll listener for timeline progress line
    window.addEventListener('scroll', () => {
      const timelineRect = experienceGrid.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.6; // 60% of viewport height

      const topDistance = triggerPoint - timelineRect.top;
      const maxDistance = timelineRect.height;

      if (topDistance > 0 && maxDistance > 0) {
        let percentage = (topDistance / maxDistance) * 100;
        targetPercentage = Math.max(0, Math.min(percentage, 100)); // Clamp between 0 and 100

        // Light up nodes that the line has passed
        const items = experienceGrid.querySelectorAll('.timeline-item');
        items.forEach(item => {
          const node = item.querySelector('.timeline-node');
          if (node) {
            const nodeRect = node.getBoundingClientRect();
            if (triggerPoint >= nodeRect.top + (nodeRect.height / 2)) {
              node.classList.add('active');
            } else {
              node.classList.remove('active');
            }
          }
        });
      } else if (topDistance <= 0) {
        targetPercentage = 0;
        const nodes = experienceGrid.querySelectorAll('.timeline-node');
        nodes.forEach(n => n.classList.remove('active'));
      }
    });
  }

  // 4. Render Skills
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid && typeof skillsData !== 'undefined') {
    skillsData.forEach(skill => {
      const el = document.createElement('div');
      el.className = 'skill-card reveal';
      el.innerHTML = `
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" style="width: 0%;" data-level="${skill.level}"></div>
        </div>
      `;
      skillsGrid.appendChild(el);
    });
  }

  // 5. Render Certificates
  const certGrid = document.getElementById('certificates-grid');
  const showMoreCertsBtn = document.getElementById('show-more-certs-btn');

  let isCertsExpanded = false;
  const CERTS_INITIAL_LIMIT = 6;

  function renderCertificates() {
    if (!certGrid || typeof certificatesData === 'undefined') return;
    certGrid.innerHTML = '';

    const visibleCerts = isCertsExpanded ? certificatesData : certificatesData.slice(0, CERTS_INITIAL_LIMIT);

    visibleCerts.forEach(cert => {
      const el = document.createElement('div');
      el.className = 'info-card reveal';
      el.innerHTML = `
        <h4>${cert.title}</h4>
        <p style="color: var(--text-primary); margin-bottom: 1rem;">${cert.issuer}</p>
        <a href="${cert.link}" target="_blank" class="project-link demo" style="padding: 0.3rem 0.8rem; font-size: 0.75rem; margin-top: auto; width: fit-content; margin-left: auto; margin-right: auto;">View Credential</a>
      `;
      certGrid.appendChild(el);
    });

    if (showMoreCertsBtn) {
      if (certificatesData.length <= CERTS_INITIAL_LIMIT) {
        showMoreCertsBtn.parentElement.style.display = 'none';
      } else {
        showMoreCertsBtn.parentElement.style.display = 'block';
        showMoreCertsBtn.querySelector('span').textContent = isCertsExpanded ? 'Show Less' : 'Show More';
        showMoreCertsBtn.querySelector('svg').style.transform = isCertsExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    }

    // Ensure new elements get observed for the reveal animation
    if (typeof initScrollReveal === 'function') {
      initScrollReveal();
    }
  }

  // Initial render is now at the bottom to prevent TDZ error with IntersectionObserver
  if (showMoreCertsBtn) {
    showMoreCertsBtn.addEventListener('click', () => {
      isCertsExpanded = !isCertsExpanded;
      renderCertificates();
    });
  }

  // 6. Projects Filtering & Pagination
  const projectsGrid = document.getElementById('projects-grid');
  const showMoreBtn = document.getElementById('show-more-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentCategory = 'all';
  let isExpanded = false;
  const INITIAL_LIMIT = 3;

  function getFilteredProjects() {
    if (typeof projectsData === 'undefined') return [];
    let sorted = [...projectsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (currentCategory !== 'all') {
      return sorted.filter(p => p.category === currentCategory);
    }
    return sorted;
  }

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = getFilteredProjects();
    const visibleProjects = isExpanded ? filtered : filtered.slice(0, INITIAL_LIMIT);

    visibleProjects.forEach(proj => {
      const tagsHtml = proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
      const el = document.createElement('div');
      el.className = 'project-card reveal';
      el.innerHTML = `
        <div class="project-image">
          <img src="${proj.image || 'https://placehold.co/600x400/111640/7aa8f6?text=Project+Preview'}" 
               alt="${proj.title}"
               onerror="this.onerror=null; this.src='https://placehold.co/600x400/111640/7aa8f6?text=Project+Preview';">
        </div>
        <div class="project-card-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-tags">${tagsHtml}</div>
          <div class="project-links">
            <a href="${proj.github}" target="_blank" class="project-link github">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View Code on GitHub
            </a>
            ${proj.demo !== '#' ? `<a href="${proj.demo}" target="_blank" class="project-link demo">Live</a>` : ''}
          </div>
        </div>
      `;
      projectsGrid.appendChild(el);
    });

    if (showMoreBtn) {
      if (filtered.length <= INITIAL_LIMIT) {
        showMoreBtn.parentElement.style.display = 'none';
      } else {
        showMoreBtn.parentElement.style.display = 'block';
        showMoreBtn.querySelector('span').textContent = isExpanded ? 'Show Less' : 'Show More';
        showMoreBtn.querySelector('svg').style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    }

    // Re-trigger observer for newly added reveal elements
    initScrollReveal();
  }

  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.filter;
        isExpanded = false;
        renderProjects();
      });
    });
  }

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      renderProjects();
      if (!isExpanded) {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 7. Scroll Reveal, Skill Bar Fill, & Number Counter (Intersection Observer)
  function animateCounters(container) {
    const statNumbers = container.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      if (!stat.hasAttribute('data-target')) {
        stat.setAttribute('data-target', stat.innerText);
      }
      const targetText = stat.getAttribute('data-target');
      const match = targetText.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);

      if (match) {
        const prefix = match[1];
        const targetNum = parseFloat(match[2]);
        const suffix = match[3];

        const duration = 1000; // Snappy 1 second animation
        const startTime = performance.now();
        let lastUpdateTime = 0;
        const updateInterval = 50; // Update every 50ms to prevent extreme blurring

        // Calculate min and max bounds to keep the string length the same
        // and prevent layout jumping during the scramble.
        const targetStr = match[2];
        const min = targetStr.length > 1 ? Math.pow(10, targetStr.length - 1) : 0;
        const max = Math.pow(10, targetStr.length) - 1;

        if (stat.animationId) {
          cancelAnimationFrame(stat.animationId);
        }

        const step = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);

          if (progress < 1) {
            if (currentTime - lastUpdateTime >= updateInterval) {
              const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
              stat.innerText = prefix + randomVal + suffix;
              lastUpdateTime = currentTime;
            }
            stat.animationId = requestAnimationFrame(step);
          } else {
            stat.innerText = targetText;
            stat.animationId = null;
          }
        };

        stat.animationId = requestAnimationFrame(step);
      }
    });
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        const skillFill = entry.target.querySelector('.skill-fill');
        if (skillFill) {
          skillFill.style.width = skillFill.dataset.level + '%';
        }

        // Counter animation moved to separate observer
      } else {
        entry.target.classList.remove('revealed');

        const skillFill = entry.target.querySelector('.skill-fill');
        if (skillFill) {
          skillFill.style.width = '0%';
        }

        // Counter reset moved to separate observer
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  // Separate observer specifically for the stats container so they animate only when visible
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters(entry.target);
      } else {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          if (stat.hasAttribute('data-target')) {
            const match = stat.getAttribute('data-target').match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
            if (match) stat.innerText = match[1] + "0" + match[3];
            if (stat.animationId) {
              cancelAnimationFrame(stat.animationId);
              stat.animationId = null;
            }
          }
        });
      }
    });
  }, { threshold: 0.25 }); // Wait until 25% of the stats container is visible

  // Observe the stats container
  const statsContainerElement = document.getElementById('about-stats');
  if (statsContainerElement) {
    counterObserver.observe(statsContainerElement);
  }

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal:not(.observed)');
    reveals.forEach(el => {
      el.classList.add('observed');
      scrollObserver.observe(el);
    });
  }

  initScrollReveal();

  // Initial render
  if (typeof certificatesData !== 'undefined') {
    renderCertificates();
  }
  if (typeof projectsData !== 'undefined') {
    renderProjects();
  }

  // 8. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(li => {
      li.classList.remove('active');
      if (li.getAttribute('href').includes(current)) {
        li.classList.add('active');
      }
    });
  });
});

// Play a very soft, non-piercing "blip" sound using Web Audio API
function playPopSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Use a pure sine wave for a smooth, pleasant tone
    oscillator.type = 'sine';

    // A much lower, softer frequency (400Hz instead of 600Hz)
    oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);

    // VERY low volume (0.05) so it's not piercing at all
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    // Smooth fade out over 0.15 seconds
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);
  } catch (e) {
    console.log("Audio not supported or blocked");
  }
}

let isCopying = false;

// Global copy email function for context-aware toast notification & sound
window.copyEmail = function (e, location = 'hero') {
  if (e) e.preventDefault();

  // Anti-spam prevention
  if (isCopying) return;
  isCopying = true;

  navigator.clipboard.writeText('syedalimehdi719@gmail.com').then(() => {

    // Play the success sound!
    playPopSound();

    if (location === 'contact') {
      const contactToast = document.getElementById('contact-toast');
      if (contactToast) {
        contactToast.classList.add('show');
        setTimeout(() => {
          contactToast.classList.remove('show');
          isCopying = false;
        }, 3000);
      } else {
        isCopying = false;
      }
    } else {
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = 'Email copied to clipboard!';
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          isCopying = false; // allow clicking again after toast hides
        }, 3000);
      } else {
        isCopying = false;
      }
    }
  }).catch(err => {
    console.error('Failed to copy email: ', err);
    isCopying = false;
  });
};
