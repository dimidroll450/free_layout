const header = document.querySelector('.section-header');
const mainNavigation = document.getElementById('main-nav');

// === Accordion ===
document.querySelector('.faq-accordion').addEventListener('click', (e) => {
  if (e.target.closest('.faq-accordion__item')) {
    e.target.closest('.faq-accordion__item').classList.toggle('faq-accordion__item--active');
  }
});
// === / Accordion ===

// === Burger ===
document.querySelector('.btn-burger').addEventListener('click', (e) => {
  header.classList.toggle('section-header--active-nav');

  if (header.classList.contains('section-header--active-nav')) {
    hideScroll();
  } else {
    showScroll();
  }
});

const hideScroll = () => {
  const scrollWidth = `${getScrollbarWidth()}px`;

  document.body.style.paddingRight = scrollWidth;
  document.body.style.overflow = 'hidden';

  mainNavigation.style.paddingRight = scrollWidth;
};

const showScroll = (e) => {
  document.body.style.paddingRight = '';
  document.body.style.overflow = 'visible';

  mainNavigation.style.paddingRight = '';
};

const resetNav = () => {
  header.classList.remove('section-header--active-nav');
  showScroll();
};

window.addEventListener('resize', resetNav);

// Get scrollbar width
const getScrollbarWidth = () => {
  const outer = document.createElement('div');

  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  outer.style.width = '50px';
  outer.style.height = '50px';
  outer.style.overflow = 'scroll';
  outer.style.visibility = 'hidden';

  document.body.appendChild(outer);
  const scrollBarWidth = outer.offsetWidth - outer.clientWidth;
  document.body.removeChild(outer);

  return scrollBarWidth;
};
// === / Burger ===

// === Carousels ===

// === Hero-image ===
new Swiper('.section-hero-image', {
  pagination: {
    el: '.section-hero-image .swiper-pagination',
    clickable: true,
  },
});
// === / Hero-image ===

// === Blog ===
new Swiper('.slider-blog-container', {

  loop: true,
  // If we need pagination
  pagination: {
    el: '.section-blog .swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
// === / Blog ===

// === Quotes ===
new Swiper('.slider-quotes-container', {
  loop: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.section-quotes .swiper-pagination',
    clickable: true,
  },
});
// === / Quotes ===

// / Carousels
