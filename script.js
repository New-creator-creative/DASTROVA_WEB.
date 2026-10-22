/* DASTROVA STUDIO — interaktiv funksiyalar.
   Telegram username'ni o'zgartirish: quyidagi qiymatga @ belgisiz username yozing.
*/
(() => {
  'use strict';
  const TELEGRAM_USERNAME = 'DASTROVA_OFFICIAL'; // Shaxsiy akkaunt
  const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;
  const TELEGRAM_CHANNEL_URL = 'https://t.me/dastrova_studio'; // Kanal
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const toast = document.getElementById('toast');
  const orderForm = document.getElementById('orderForm');
  const year = document.getElementById('year');
  let toastTimer;
  if (year) year.textContent = new Date().getFullYear();
  const floatingTelegram = document.getElementById('floatingTelegram');
  if (floatingTelegram) floatingTelegram.href = TELEGRAM_URL;
  document.querySelectorAll('[data-telegram-channel]').forEach(link => { link.href = TELEGRAM_CHANNEL_URL; });
  document.querySelectorAll('[data-telegram-account]').forEach(link => { link.href = TELEGRAM_URL; });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }
  function openTelegram(message) {
    const url = `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`;
    const tab = window.open(url, '_blank');
    if (tab) tab.opener = null;
    else window.location.href = url;
  }

  // Mobil menyu
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Menyuni yopish' : 'Menyuni ochish');
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', event => {
      if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Kirish animatsiyalari
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  // Xizmat tanlanganda forma xizmat maydonini oldindan belgilashga harakat qiladi
  document.querySelectorAll('.service-link').forEach(link => link.addEventListener('click', () => {
    const service = link.dataset.service || '';
    const select = document.getElementById('projectType');
    if (select) {
      const matching = [...select.options].find(option => option.text.toLowerCase().includes(service.toLowerCase()));
      if (matching) select.value = matching.value;
    }
  }));

  // Tarif tugmalari Telegramda tayyor buyurtma xabarini ochadi
  document.querySelectorAll('.order-plan').forEach(button => button.addEventListener('click', () => {
    const plan = button.dataset.plan || 'Sayt yaratish';
    openTelegram(`Assalomu alaykum, DASTROVA STUDIO!\n\nMen ${plan} tarifiga qiziqyapman. Loyiha tafsilotlarini muhokama qilmoqchiman.`);
  }));

  // Forma yuborilganda xabar Telegramga tayyorlanadi
  if (orderForm) orderForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(orderForm);
    const name = String(data.get('name') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !service) { showToast('Iltimos, ismingiz va xizmat turini kiriting.'); return; }
    const text = [
      'Assalomu alaykum, DASTROVA STUDIO!', '', `Ismim: ${name}`,
      `Kerakli xizmat: ${service}`, `Loyiha haqida: ${message || 'Hozircha qo‘shimcha ma’lumot yo‘q.'}`,
      '', 'Loyiha narxi va tafsilotlarini muhokama qilmoqchiman.'
    ].join('\n');
    openTelegram(text);
    showToast('Telegram ochilmoqda — xabarni yuborishdan oldin tekshirib oling.');
  });

  // Sahifa ichidagi havolalar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', event => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', id); }
  }));
})();
