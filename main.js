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
  // Milestone Animation (turnaround card)
  // ============================================
  var msContainer = document.getElementById('milestones-container');

  if (msContainer) {
    var CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    var HOURGLASS_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6z"/></svg>';

    function makeMilestone(type, label, rightContent) {
      var el = document.createElement('div');
      el.className = 'milestone milestone--' + type;

      var icon = document.createElement('span');
      if (type === 'complete') {
        icon.className = 'milestone__icon milestone__icon--check';
        icon.innerHTML = CHECK_SVG;
      } else if (type === 'progress') {
        icon.className = 'milestone__icon milestone__icon--progress';
        icon.innerHTML = '<div class="milestone__progress-ring"></div>';
      } else if (type === 'pending') {
        icon.className = 'milestone__icon milestone__icon--hourglass milestone__icon--hourglass-pulse';
        icon.innerHTML = HOURGLASS_SVG;
      }

      var lbl = document.createElement('span');
      lbl.className = 'milestone__label';
      lbl.textContent = label;

      el.appendChild(icon);
      el.appendChild(lbl);

      if (rightContent === 'bar') {
        var bar = document.createElement('span');
        bar.className = 'milestone__bar';
        bar.innerHTML = '<span class="milestone__bar-fill" style="width:0%"></span>';
        el.appendChild(bar);
      } else if (rightContent) {
        var time = document.createElement('span');
        time.className = 'milestone__time';
        time.textContent = rightContent;
        el.appendChild(time);
      } else {
        var empty = document.createElement('span');
        empty.className = 'milestone__time';
        el.appendChild(empty);
      }

      return el;
    }

    var msWrapper = msContainer.parentElement;
    var wrapperHeightLocked = false;

    function runMilestoneAnimation() {
      msContainer.innerHTML = '';
      msContainer.style.position = 'relative';

      // Initial: Block On ✅, Bag Unloading ✅, PAX (progress), Cleaning (pending)
      var blockOn = makeMilestone('complete', 'Block On', '14:32');
      var bagUnload = makeMilestone('complete', 'Bag Unloading', '14:41');
      var pax = makeMilestone('progress', 'PAX Disembarking', 'bar');
      var cleaning = makeMilestone('pending', 'Cleaning', '');

      msContainer.appendChild(blockOn);
      msContainer.appendChild(bagUnload);
      msContainer.appendChild(pax);
      msContainer.appendChild(cleaning);

      // Lock wrapper height on first run to prevent card resize
      if (!wrapperHeightLocked) {
        requestAnimationFrame(function() {
          msWrapper.style.height = msWrapper.offsetHeight + 'px';
          wrapperHeightLocked = true;
        });
      }

      // PAX bar fills 0→90% in 2.5s (faster)
      var paxFill = pax.querySelector('.milestone__bar-fill');
      paxFill.style.transition = 'width 2.5s cubic-bezier(0.25,0.1,0.25,1)';
      setTimeout(function() { paxFill.style.width = '90%'; }, 50);

      // 3s: PAX bar → 100% (stays orange)
      setTimeout(function() {
        paxFill.style.transition = 'width 1s cubic-bezier(0.25,0.1,0.25,1)';
        paxFill.style.width = '100%';
      }, 3000);

      // 4.2s: bar turns green, then swap to complete
      setTimeout(function() {
        paxFill.style.transition = 'background 0.5s ease';
        paxFill.style.background = '#4ADE80';
      }, 4200);

      setTimeout(function() {
        pax.className = 'milestone milestone--complete';
        var paxIcon = pax.querySelector('.milestone__icon');
        paxIcon.className = 'milestone__icon milestone__icon--check';
        paxIcon.innerHTML = CHECK_SVG;
        var bar = pax.querySelector('.milestone__bar');
        if (bar) {
          var timeEl = document.createElement('span');
          timeEl.className = 'milestone__time';
          timeEl.textContent = '14:48';
          bar.replaceWith(timeEl);
        }
      }, 4800);

      // 5.5s: Step B/C/D — PAX slides up + fades, Cleaning & Boarding move up together
      setTimeout(function() {
        // Measure row height for the slide
        var rowH = pax.offsetHeight + parseInt(getComputedStyle(msContainer).gap || '8');

        // PAX: slide up behind Bag Unloading and fade out
        pax.style.transition = 'transform 1s cubic-bezier(0.25,0.1,0.25,1), opacity 0.8s ease';
        pax.style.transform = 'translateY(-' + rowH + 'px)';
        pax.style.opacity = '0';
        pax.style.zIndex = '0';
        // Ensure Bag Unloading is above PAX visually
        bagUnload.style.position = 'relative';
        bagUnload.style.zIndex = '1';

        // Cleaning slides up by one row height
        cleaning.style.transition = 'transform 1s cubic-bezier(0.25,0.1,0.25,1)';
        cleaning.style.transform = 'translateY(-' + rowH + 'px)';

        // Prepare Boarding: insert below cleaning, start hidden below
        var boarding = makeMilestone('pending', 'Boarding', '');
        boarding.style.opacity = '0';
        boarding.style.transform = 'translateY(8px)';
        msContainer.appendChild(boarding);

        // Boarding slides up and fades in (synced with the upward motion)
        setTimeout(function() {
          boarding.style.transition = 'transform 0.9s cubic-bezier(0.25,0.1,0.25,1), opacity 0.8s ease';
          boarding.style.transform = 'translateY(-' + rowH + 'px)';
          boarding.style.opacity = '1';
        }, 150);

        // After slide completes: rebuild DOM cleanly (no transforms)
        setTimeout(function() {
          msContainer.innerHTML = '';
          var b1 = makeMilestone('complete', 'Block On', '14:32');
          var b2 = makeMilestone('complete', 'Bag Unloading', '14:41');

          // Cleaning: start as pending, then gradually transition to progress
          var c2 = makeMilestone('pending', 'Cleaning', '');
          var bo2 = makeMilestone('pending', 'Boarding', '');

          msContainer.appendChild(b1);
          msContainer.appendChild(b2);
          msContainer.appendChild(c2);
          msContainer.appendChild(bo2);

          // Smooth crossfade: pending → progress over 0.8s
          setTimeout(function() {
            c2.style.transition = 'opacity 0.4s ease';
            c2.style.opacity = '0.4';

            setTimeout(function() {
              // Swap to progress state
              c2.className = 'milestone milestone--progress';
              var icon = c2.querySelector('.milestone__icon');
              icon.className = 'milestone__icon milestone__icon--progress';
              icon.innerHTML = '<div class="milestone__progress-ring"></div>';

              // Replace time span with bar
              var timeSpan = c2.querySelector('.milestone__time');
              if (timeSpan) {
                var bar = document.createElement('span');
                bar.className = 'milestone__bar';
                bar.innerHTML = '<span class="milestone__bar-fill" style="width:0%"></span>';
                timeSpan.replaceWith(bar);
              }

              // Fade back in
              c2.style.opacity = '1';

              // Start bar filling
              setTimeout(function() {
                var cleanFill = c2.querySelector('.milestone__bar-fill');
                if (cleanFill) {
                  cleanFill.style.transition = 'width 4s cubic-bezier(0.25,0.1,0.25,1)';
                  cleanFill.style.width = '55%';
                }
              }, 200);
            }, 450);
          }, 600);
        }, 1100);
      }, 5500);

      // 13s: fade out and loop
      setTimeout(function() {
        var children = msContainer.children;
        for (var i = 0; i < children.length; i++) {
          children[i].style.transition = 'opacity 0.8s ease';
          children[i].style.opacity = '0';
        }
        setTimeout(function() {
          runMilestoneAnimation();
        }, 1000);
      }, 13000);
    }

    runMilestoneAnimation();
  }

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
