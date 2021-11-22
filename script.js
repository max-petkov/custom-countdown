const resourcesItems = document.querySelectorAll(".resources__item");
const resourcesLink = document.querySelector(".nav__link");

// Resources
resourcesItems.forEach((el, i) => (el.style.top = `${i * 48}px`));

resourcesLink.addEventListener("click", () =>
  resourcesItems.forEach((el) => el.classList.toggle("js-resources-active"))
);
