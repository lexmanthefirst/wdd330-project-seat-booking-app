import { loadHeaderFooter, toggleMenu } from "../utils/util.mjs";

// Wait for DOM to be fully loaded before loading templates
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    // Set up mobile menu toggle
    const burgerMenu = document.querySelector(".menu-icon");
    if (burgerMenu) {
      burgerMenu.addEventListener("click", toggleMenu);
    }
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
});
