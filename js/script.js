//******** Mobile Navigation *********//
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//******** LIGHT / DARK MODE *********//
const sunIcon = document.querySelector(".icon-sun");
const moonIcon = document.querySelector(".icon-moon");

sunIcon.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  sunIcon.style.display = "none";
  moonIcon.style.display = "block";
});

moonIcon.addEventListener("click", () => {
  document.documentElement.removeAttribute("data-theme");
  moonIcon.style.display = "none";
  sunIcon.style.display = "block";
});
