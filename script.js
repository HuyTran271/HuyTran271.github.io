'use strict';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// 1. STICKY HEADER
window.addEventListener('scroll', () => {
  $('#site-header').classList.toggle('scrolled', window.scrollY > 10);
});

// 2. MOBILE NAV
const navToggle = $('#navToggle');
const mainNav = $('#mainNav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mainNav.classList.toggle('open');
});

// 3. SPA MODE & ANIMATION
function animateSkillBars() {
  $$('.skill-item').forEach(item => {
    const percent = item.dataset.percent;
    const fill = item.querySelector('.skill-fill');
    if (fill) fill.style.width = percent + '%';
  });
}

function showSection(sectionId) {
  // Ẩn tất cả section và reset animation
  $$('.section').forEach(sec => {
    sec.classList.remove('active-section');
    sec.querySelectorAll('.visible').forEach(el => el.classList.remove('visible'));
  });

  // Hiện section mục tiêu
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active-section');
    
    // Kích hoạt lại animation reveal sau một chút delay
    setTimeout(() => {
      target.querySelectorAll('.reveal-fade, .reveal-up, .reveal-scale').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
      });
      
      // Nếu là tab kỹ năng thì chạy thanh progress
      if (sectionId === 'introduce') animateSkillBars();
    }, 100);
  }

  // Cập nhật Nav Link
  $$('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });

  window.scrollTo(0, 0);
}

// Event Listeners cho Nav
$$('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
    showSection(link.dataset.section);
  });
});

$('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('home');
});

// 4. BACK TO TOP
const btt = $('#backToTop');
window.addEventListener('scroll', () => {
  btt.style.opacity = window.scrollY > 300 ? '1' : '0';
});
btt.addEventListener('click', () => showSection('home'));

// KHỞI TẠO
window.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});
