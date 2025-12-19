'use strict';

const heroSection = document.querySelector('.hero-section');
const headerContainer = document.querySelector('.site-header__container');
const headerEl = document.querySelector('.site-header');
const btnNavEl = document.querySelector('.mobile-menu-toggle');
const sunIcon = document.querySelector('.icon-sun');
const moonIcon = document.querySelector('.icon-moon');
const aboutSection = document.querySelector('.about-section');
const allSection = document.querySelectorAll('section');

////////////////////////////////
// Mobile Navigation
btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

////////////////////////////////
//LIGHT / DARK MODE

sunIcon.addEventListener('click', () => {
  document.documentElement.setAttribute('data-theme', 'dark');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'block';
});

moonIcon.addEventListener('click', () => {
  document.documentElement.removeAttribute('data-theme');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'block';
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('menu-fade__link')) {
    const link = e.target;

    const siblings = link
      .closest('.site-header')
      .querySelectorAll('.menu-fade__link');

    const logo = link
      .closest('.site-header')
      .querySelector('.site-header__brand');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

headerEl.addEventListener('mouseover', handleHover.bind(0.5));
headerEl.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation

const headerHeight = headerContainer.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) headerContainer.classList.add('sticky');
  else headerContainer.classList.remove('sticky');
};

const heroSectionObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.01,
  rootMargin: `-${headerHeight}px`,
});
heroSectionObserver.observe(heroSection);

///////////////////////////////////////
// Reveal sections

const revelSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
