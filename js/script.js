'use strict';

//////////////////////////////////////////////
////////// DOM Elements
const heroSection = document.querySelector('.hero-section');
const headerContainer = document.querySelector('.site-header__container');
const headerHeight = headerContainer.getBoundingClientRect().height;
const headerEl = document.querySelector('.site-header');
const btnNavEl = document.querySelector('.mobile-menu-toggle');
const moonIcons = document.querySelectorAll('.icon-moon');
const sunIcons = document.querySelectorAll('.icon-sun');
const aboutSection = document.querySelector('.about-section');
const allSection = document.querySelectorAll('section');
const progressBar = document.querySelector('.scroll-progress');
const backToTopBtn = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

//////////////////////////////////////////////
////////// Mobile Navigation
btnNavEl.addEventListener('click', () => {
  headerEl.classList.toggle('nav-open');
});

//////////////////////////////////////////////
////////// LIGHT / DARK MODE

const toggleTheme = (isDark) => {
  moonIcons.forEach((icon) => {
    icon.style.display = isDark ? 'none' : 'block';
  });

  sunIcons.forEach((icon) => {
    icon.style.display = isDark ? 'block' : 'none';
  });
};

moonIcons.forEach((sunIcon) => {
  sunIcon.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleTheme(true);
  });
});

sunIcons.forEach((moonIcon) => {
  moonIcon.addEventListener('click', () => {
    document.documentElement.removeAttribute('data-theme');
    toggleTheme(false);
  });
});

////////////////////////////////////////////////
////////// Menu fade animation

const handleHover = (e) => {
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

////////////////////////////////////////////////
////////// Sticky navigation

document.documentElement.style.setProperty(
  '--header-height',
  `${headerHeight}px`
);

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newHeight = headerContainer.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      '--header-height',
      `${newHeight}px`
    );
  }, 250);
});

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    headerContainer.classList.add('sticky');
    document.body.classList.add('sticky-active');
  } else {
    headerContainer.classList.remove('sticky');
    document.body.classList.remove('sticky-active');
  }
};

const heroSectionObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.01,
  rootMargin: `-${headerHeight}px`,
});
heroSectionObserver.observe(heroSection);

////////////////////////////////////////////////
////////// Reveal sections

const revelSection = (entries, observer) => {
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

////////////////////////////////////////////////
////////// Slider

const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();

    activateDot(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

////////////////////////////////////////////////
////////// Scroll Progress Bar

const scrollProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }
};

window.addEventListener('scroll', scrollProgress);

////////////////////////////////////////////////
////////// Back to top button

let isScrolling = false;

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

////////////////////////////////////////////////
////////// Active section highlighting

const highlightNav = () => {
  let current = '';

  const scrollPosition = window.pageYOffset + 250;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = sectionId;
    }
  });

  if (window.pageYOffset < 100) {
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });
    return;
  }

  navLinks.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href');

    if (href && current && href.includes(current)) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);

////////////////////////////////////////////////
////////// Animate skills on scroll
const animateSkills = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
});

document.querySelectorAll('.skill-item').forEach((item) => {
  skillsObserver.observe(item);
});
