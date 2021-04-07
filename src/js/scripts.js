// === Acordion ===
document.querySelector('.faq-accordion').addEventListener('click', (e) => {
  if (e.target.closest('.faq-accordion__item')) {
    e.target.closest('.faq-accordion__item').classList.toggle('faq-accordion__item--active');
  }
});
// === / Acordion ===
