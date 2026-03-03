/**
 * SCRIPT.JS — Trần Huy Personal Portfolio
 * Chức năng:
 *  1. Sticky header + shadow khi cuộn
 *  2. Mobile nav toggle (icon quyển sách)
 *  3. Cuộn mượt đến section khi click nav
 *  4. Active nav link theo section đang xem (Intersection Observer)
 *  5. Scroll reveal animation (Intersection Observer)
 *  6. Animate progress bar kỹ năng khi vào viewport
 *  7. Nút Back To Top
 *  8. SPA mode: click nav → chỉ hiện section đó
 */

'use strict';

/* ---------------------------------------------------------------
   HELPER: Lấy phần tử DOM
--------------------------------------------------------------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);


/* ---------------------------------------------------------------
   1. STICKY HEADER — thêm class .scrolled khi cuộn > 10px
--------------------------------------------------------------- */
const siteHeader = $('#site-header');

function handleHeaderScroll() {
  if (window.scrollY > 10) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll(); // gọi ngay khi load tránh flash


/* ---------------------------------------------------------------
   2. MOBILE NAV TOGGLE
   Nút icon "quyển sách" mở/đóng nav trên mobile
--------------------------------------------------------------- */
const navToggle = $('#navToggle');
const mainNav   = $('#mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  mainNav.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Đóng nav khi click ra ngoài
document.addEventListener('click', (e) => {
  if (!siteHeader.contains(e.target)) {
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});


/* ---------------------------------------------------------------
   3 & 8. NAV CLICK → SCROLL + SPA MODE
   Click nav: cuộn đến section VÀ chỉ hiển thị section đó
--------------------------------------------------------------- */
const allSections = $$('.section');
const navLinks    = $$('.nav-link');

/**
 * Chuyển sang SPA mode: chỉ hiển thị section có id = sectionId
 */
function showSection(sectionId) {
  // Bật chế độ SPA để CSS ẩn toàn bộ sections
  document.body.classList.add('spa-mode');

  // Ẩn tất cả, rồi hiện đúng section
  allSections.forEach(sec => sec.classList.remove('active-section'));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active-section');

    // Cuộn về đầu trang (vì section đầu luôn bắt đầu từ dưới header)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-trigger reveal animations cho section vừa hiện
    const reveals = target.querySelectorAll('.reveal-fade, .reveal-up, .reveal-scale');
    reveals.forEach((el, i) => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 80 + i * 80);
    });

    // Re-trigger skill bars nếu là section introduce
    if (sectionId === 'introduce') {
      setTimeout(animateSkillBars, 300);
    }
  }

  // Cập nhật active link
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
}

// Gắn sự kiện click cho từng nav link
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.dataset.section;

    // Đóng mobile nav nếu đang mở
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');

    showSection(sectionId);
  });
});

// Click logo → về Home
$('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('home');
});

// Click scroll-hint → về Introduce
const scrollHint = $('.scroll-hint');
if (scrollHint) {
  scrollHint.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('introduce');
  });
}


/* ---------------------------------------------------------------
   4. ACTIVE NAV (scroll-based) — chỉ hoạt động khi KHÔNG phải SPA mode
--------------------------------------------------------------- */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    if (document.body.classList.contains('spa-mode')) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
);

allSections.forEach(sec => sectionObserver.observe(sec));


/* ---------------------------------------------------------------
   5. SCROLL REVEAL
   Sử dụng IntersectionObserver để thêm class .visible
   khi phần tử xuất hiện trong viewport
--------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // chỉ animate một lần
      }
    });
  },
  { threshold: 0.15 }
);

// Observe tất cả phần tử cần reveal
$$('.reveal-fade, .reveal-up, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});


/* ---------------------------------------------------------------
   6. PROGRESS BAR KỸ NĂNG — animate width khi vào viewport
--------------------------------------------------------------- */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;

  $$('.skill-item').forEach(item => {
    const percent = parseInt(item.dataset.percent, 10);
    const fill    = item.querySelector('.skill-fill');
    if (fill) {
      // Dùng requestAnimationFrame để đảm bảo CSS transition chạy
      requestAnimationFrame(() => {
        fill.style.width = percent + '%';
      });
    }
  });

  skillsAnimated = true;
}

// Observer riêng cho section introduce
const skillSection = $('#introduce');
if (skillSection) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateSkillBars();
        skillObserver.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  skillObserver.observe(skillSection);
}


/* ---------------------------------------------------------------
   7. BACK TO TOP
   Hiển thị nút khi cuộn > 300px, cuộn lên đầu khi click
--------------------------------------------------------------- */
const backToTopBtn = $('#backToTop');

function handleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleBackToTop, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Nếu đang SPA mode, hiện lại section home
  if (document.body.classList.contains('spa-mode')) {
    showSection('home');
  }
});


/* ---------------------------------------------------------------
   KHỞI TẠO
   Khi trang load: hiện section Home, trigger reveals
--------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  // Kích hoạt SPA mode ngay từ đầu
  showSection('home');

  // Đảm bảo header đúng trạng thái
  handleHeaderScroll();
});
