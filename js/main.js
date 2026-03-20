// ═══════════════════════════════════════
//   SKYNIRA — GLOBAL JAVASCRIPT
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── FAQ TOGGLE ───
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ─── STICKY BAR SHOW/HIDE ───
  const sticky = document.querySelector('.sticky-bar');
  if (sticky) {
    const hero = document.querySelector('.hero-section');
    const observer = new IntersectionObserver(([entry]) => {
      sticky.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
    }, { threshold: 0.1 });
    if (hero) observer.observe(hero);
    sticky.style.transition = 'transform 0.3s ease';
  }

  // ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── THUMBNAIL SWITCHER ───
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const wrap = thumb.closest('.product-media');
      if (!wrap) return;
      wrap.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const main = wrap.querySelector('.main-img');
      if (main && thumb.dataset.src) main.src = thumb.dataset.src;
    });
  });

  // ─── QUANTITY CONTROLS ───
  const qtyMinus = document.querySelector('.qty-minus');
  const qtyPlus  = document.querySelector('.qty-plus');
  const qtyInput = document.querySelector('.qty-input');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      if (val > 1) qtyInput.value = val - 1;
    });
    qtyPlus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      if (val < 10) qtyInput.value = val + 1;
    });
  }

  // ─── COUNTDOWN TIMER (urgence) ───
  const timer = document.querySelector('.countdown');
  if (timer) {
    // Set random time between 8-18 minutes
    let total = Math.floor(Math.random() * 600) + 480;
    const tick = () => {
      const m = Math.floor(total / 60).toString().padStart(2, '0');
      const s = (total % 60).toString().padStart(2, '0');
      timer.textContent = `${m}:${s}`;
      if (total > 0) { total--; setTimeout(tick, 1000); }
      else { timer.closest('.urgency-mini')?.remove(); }
    };
    tick();
  }

  // ─── STOCK ANIMATION ───
  const stockFill = document.querySelector('.stock-fill');
  if (stockFill) {
    setTimeout(() => {
      stockFill.style.transition = 'width 1.5s ease';
      stockFill.style.width = '28%';
    }, 500);
  }

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => revealObserver.observe(el));
  }

  // ─── MOBILE NAV TOGGLE ───
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // ─── ADD TO CART FEEDBACK ───
  document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      btn.textContent = '✓ Ajouté au panier !';
      btn.style.background = '#3ECFA0';
      btn.style.color = '#0B0B0F';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    });
  });

});

// ─── SCROLL REVEAL CSS ───
const style = document.createElement('style');
style.textContent = `
  [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
  [data-reveal].revealed { opacity: 1; transform: translateY(0); }
  [data-reveal][data-delay="1"] { transition-delay: 0.1s; }
  [data-reveal][data-delay="2"] { transition-delay: 0.2s; }
  [data-reveal][data-delay="3"] { transition-delay: 0.3s; }
  [data-reveal][data-delay="4"] { transition-delay: 0.4s; }
  [data-reveal][data-delay="5"] { transition-delay: 0.5s; }
`;
document.head.appendChild(style);
