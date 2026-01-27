/**
 * MAYFLY Landing Page - Main JavaScript
 * Handles: Mobile Nav, Scroll Effects, Reveal Animations
 */

(function() {
  'use strict';

  // ============================================
  // DOM Elements
  // ============================================
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  // ============================================
  // Header Scroll Effect
  // ============================================
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ============================================
  // Mobile Navigation
  // ============================================
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded',
        navLinks.classList.contains('active'));
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============================================
  // Scroll Reveal Animation
  // ============================================
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('visible');
      }
    });
  }

  // Check on scroll and on load
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load', revealOnScroll);
  revealOnScroll(); // Initial check

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Live Activity Feed (circular)
  // ============================================
  var feedContainer = document.getElementById('activity-feed');
  var feedWrapper = document.getElementById('activity-feed-wrapper');

  if (feedContainer && feedWrapper) {
    // Arrival time (local)
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var arrivalTime = (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;

    // Countdown state
    var countdownSeconds = 600;

    function getCountdownText() {
      var m = Math.floor(countdownSeconds / 60);
      var s = countdownSeconds % 60;
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    // Feed items in cycle order: BA arrive → AF → BA board → AZ
    var feedItems = [
      { logo: 'assets/logo/BA.png', alt: 'BA', code: 'BA 4091', msg: 'Arriving on block at ' + arrivalTime },
      { logo: 'assets/logo/Air France_idKuYSvPDb_1.png', alt: 'AF', code: 'AF 7520', msg: 'Check-in closure' },
      { logo: 'assets/logo/BA.png', alt: 'BA', code: 'BA 8173', msg: 'Go boarding in ', countdown: true },
      { logo: 'assets/logo/ITA.png', alt: 'AZ', code: 'AZ 1624', msg: 'De-icing requested' }
    ];

    var feedIndex = 0;
    var VISIBLE_COUNT = 3;

    function createRow(item) {
      var row = document.createElement('div');
      row.className = 'product__screen-activity-row';
      var logoSpan = document.createElement('span');
      logoSpan.className = 'product__screen-activity-logo';
      var img = document.createElement('img');
      img.src = item.logo;
      img.alt = item.alt;
      img.width = 18;
      img.height = 18;
      logoSpan.appendChild(img);

      var textSpan = document.createElement('span');
      textSpan.className = 'product__screen-activity-text';
      var strong = document.createElement('strong');
      strong.textContent = item.code;
      textSpan.appendChild(strong);
      textSpan.appendChild(document.createTextNode(' — ' + item.msg));

      if (item.countdown) {
        var cdSpan = document.createElement('span');
        cdSpan.className = 'boarding-countdown-value';
        cdSpan.textContent = getCountdownText();
        textSpan.appendChild(cdSpan);
      }

      row.appendChild(logoSpan);
      row.appendChild(textSpan);
      return row;
    }

    // Initial render: 3 visible rows
    for (var i = 0; i < VISIBLE_COUNT; i++) {
      feedContainer.appendChild(createRow(feedItems[(feedIndex + i) % feedItems.length]));
    }

    // Countdown timer (updates all countdown spans)
    setInterval(function() {
      countdownSeconds--;
      if (countdownSeconds < 0) countdownSeconds = 600;
      var spans = feedContainer.querySelectorAll('.boarding-countdown-value');
      for (var j = 0; j < spans.length; j++) {
        spans[j].textContent = getCountdownText();
      }
    }, 1000);

    // Feed cycling
    var ROW_HEIGHT = 0;
    var CYCLE_INTERVAL = 5000; // 5s between shifts
    var TRANSITION_DURATION = 1600; // 1.6s very smooth slide

    // Measure row height after first paint
    setTimeout(function() {
      var firstRow = feedContainer.querySelector('.product__screen-activity-row');
      if (firstRow) {
        var style = window.getComputedStyle(feedContainer);
        var gap = parseFloat(style.gap) || 4;
        ROW_HEIGHT = firstRow.offsetHeight + gap;
        feedWrapper.style.height = (ROW_HEIGHT * VISIBLE_COUNT - gap) + 'px';
      }

      feedContainer.style.transition = 'transform ' + TRANSITION_DURATION + 'ms cubic-bezier(0.25, 0.1, 0.25, 1)';

      setInterval(function() {
        // Slide up by one row
        feedContainer.style.transform = 'translateY(-' + ROW_HEIGHT + 'px)';

        setTimeout(function() {
          // Remove top row, append next at bottom, reset transform
          feedContainer.style.transition = 'none';
          feedContainer.removeChild(feedContainer.firstElementChild);
          feedIndex = (feedIndex + VISIBLE_COUNT) % feedItems.length;
          feedContainer.appendChild(createRow(feedItems[feedIndex]));
          feedContainer.style.transform = 'translateY(0)';

          // Re-enable transition after reflow
          void feedContainer.offsetHeight;
          feedContainer.style.transition = 'transform ' + TRANSITION_DURATION + 'ms cubic-bezier(0.25, 0.1, 0.25, 1)';
        }, TRANSITION_DURATION + 50);
      }, CYCLE_INTERVAL);
    }, 200);
  }

})();
