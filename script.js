/* ===========================
   BRIJDARSAN TOURIST – JS
   =========================== */

'use strict';

// ===========================
// STICKY HEADER
// ===========================
(function () {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===========================
// HAMBURGER MENU
// ===========================
(function () {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    // Animate hamburger lines
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      const spans = btn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      const spans = btn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
})();

// ===========================
// HERO IMAGE SLIDESHOW
// ===========================
(function () {
  const images = document.querySelectorAll('.hero-img');
  if (!images.length) return;

  let current = 0;
  images[0].classList.add('active');

  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 5000);
})();

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
})();

// ===========================
// SMOOTH SCROLL (fallback for older browsers)
// ===========================
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById('header')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ===========================
// BOOKING FORM → WHATSAPP
// ===========================
function submitForm(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');

  // Gather values
  const data = {};
  const labels = ['name', 'phone', 'pickup', 'drop', 'date', 'time', 'vehicle', 'notes'];
  inputs.forEach((el, i) => {
    data[labels[i] || 'extra'] = el.value.trim();
  });

  // Build WhatsApp message
  const msg = [
    `🚖 *New Booking Request – Brijdarsan Tourist*`,
    ``,
    `👤 *Name:* ${data.name || 'N/A'}`,
    `📞 *Phone:* ${data.phone || 'N/A'}`,
    `📍 *Pickup:* ${data.pickup || 'N/A'}`,
    `📍 *Drop:* ${data.drop || 'N/A'}`,
    `📅 *Date:* ${data.date || 'N/A'}`,
    `🕐 *Time:* ${data.time || 'N/A'}`,
    `🚗 *Vehicle:* ${data.vehicle || 'Any'}`,
    `📝 *Notes:* ${data.notes || 'None'}`,
    ``,
    `Please confirm my booking. Thank you! 🙏`
  ].join('\n');

  const whatsappURL = `https://wa.me/918700489107?text=${encodeURIComponent(msg)}`;
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');

  // Show success state
  showBookingSuccess(form);
}

function showBookingSuccess(form) {
  const wrap = form.closest('.booking-form-wrap');
  if (!wrap) return;

  const success = document.createElement('div');
  success.className = 'booking-success';
  success.innerHTML = `
    <div class="success-icon">✅</div>
    <h3>WhatsApp Opened!</h3>
    <p>Your booking details have been pre-filled in WhatsApp. Just hit send to confirm your ride.</p>
    <button onclick="this.closest('.booking-success').remove(); document.getElementById('bookingForm').reset();" 
      style="margin-top:20px;padding:10px 28px;border-radius:50px;background:var(--gold);color:#000;border:none;font-weight:700;cursor:pointer;font-family:var(--font-body)">
      Book Another
    </button>
  `;
  success.style.cssText = `
    position:absolute;inset:0;background:#fff;border-radius:var(--radius);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    text-align:center;padding:40px;z-index:10;
  `;
  wrap.style.position = 'relative';
  wrap.appendChild(success);
  success.querySelector('.success-icon').style.cssText = 'font-size:3rem;margin-bottom:16px;';
  success.querySelector('h3').style.cssText = 'font-family:var(--font-display);font-size:1.4rem;font-weight:700;margin-bottom:10px;color:var(--black)';
  success.querySelector('p').style.cssText = 'font-size:0.9rem;color:var(--text-light);line-height:1.6;max-width:280px;';
}

// ===========================
// ACTIVE NAV ON SCROLL
// ===========================
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const headerH = () => document.getElementById('header')?.offsetHeight || 72;

  const onScroll = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - headerH() - 80;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--gold)';
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ===========================
// SET MIN DATE ON BOOKING FORM
// ===========================
(function () {
  const dateInput = document.querySelector('input[type="date"]');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
  dateInput.value = today;
})();

// ===========================
// COUNTER ANIMATION (hero stats)
// ===========================
(function () {
  const stats = document.querySelectorAll('.stat strong');
  if (!stats.length) return;

  const targets = [5000, 8, 4.9];
  const durations = [1500, 1000, 1200];
  const suffixes = ['+', '+', '★'];
  let started = false;

  const animate = (el, target, duration, suffix) => {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * target;
      el.textContent = (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const heroSection = document.querySelector('.hero-stats');
  if (!heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      stats.forEach((el, i) => animate(el, targets[i], durations[i], suffixes[i]));
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(heroSection);
})();

// ===========================
// TRUST BAR – Auto scroll on mobile
// ===========================
(function () {
  const bar = document.querySelector('.trust-bar-inner');
  if (!bar || window.innerWidth > 768) return;

  // No special JS needed; handled by CSS flexbox wrap
})();

// ===========================
// LAZY IMAGE OBSERVER
// ===========================
(function () {
  if (!('IntersectionObserver' in window)) return;

  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
})();

// ===========================
// SCROLL-TO-TOP (on footer logo click)
// ===========================
(function () {
  document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
