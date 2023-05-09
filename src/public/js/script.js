const openMenuButton = document.querySelector(".fa-bars");
const closeMenuButton = document.querySelector(".fa-times");
const menu = document.querySelector(".menu");
const navbar = document.querySelector("nav");

function toggleMenu() {
  menu.classList.toggle("show-menu");
  navbar.style.height = menu.classList.contains("show-menu") ? "400px" : "55px";
  closeMenuButton.style.display =
    closeMenuButton.style.display === "block" ? "none" : "block";
  openMenuButton.style.display =
    openMenuButton.style.display === "none" ? "block" : "none";
}

function hideBarsIfScreenWidthAbove800px() {
  const isLargeScreen = window.innerWidth > 800;
  const isMenuShown = menu.classList.contains("show-menu");
  openMenuButton.style.display =
    isLargeScreen || isMenuShown ? "none" : "block";
  closeMenuButton.style.display =
    isLargeScreen || !isMenuShown ? "none" : "block";
}

// Toggle menu on bar click
openMenuButton.addEventListener("click", toggleMenu);

// Toggle menu on close button click
closeMenuButton.addEventListener("click", toggleMenu);

// Check on page load and on resize
window.addEventListener("DOMContentLoaded", () => {
  hideBarsIfScreenWidthAbove800px();
  window.addEventListener("resize", hideBarsIfScreenWidthAbove800px);
});
