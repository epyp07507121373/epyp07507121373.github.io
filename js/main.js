/* ============================================
   恩平市一品装饰有限公司 官方网站
   Interactive Features
   ============================================ */

(function() {
  'use strict';

  /* ----- Nav scroll shadow ----- */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      nav.classList.add('shadow');
    } else {
      nav.classList.remove('shadow');
    }
  });

  /* ----- Mobile menu toggle ----- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle) {
    toggle.addEventListener('click', function() {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* Close menu on link click (mobile) */
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      if (toggle) toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ----- Smooth scroll with offset ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        var position = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  /* ----- Active nav link on scroll ----- */
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 150;

    sections.forEach(function(section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navItems.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  /* ----- Scroll Reveal Animations ----- */
  var reveals = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(function(el) { revealObserver.observe(el); });

  /* ----- Counter Animation ----- */
  var counters = document.querySelectorAll('.counter');
  var countObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'));
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;

        var timer = setInterval(function() {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 16);

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) { countObserver.observe(el); });

  /* ----- Back to Top Button ----- */
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----- FAQ Accordion (only one open at a time) ----- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    item.addEventListener('toggle', function() {
      if (this.open) {
        faqItems.forEach(function(other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

})();

/* ----- Lightbox (global functions for onclick) ----- */
function openLightbox(el) {
  var img = el.querySelector('img');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  if (img && img.src) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
  } else {
    lightboxImg.src = '';
    lightboxImg.alt = '照片即将上线';
  }
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
