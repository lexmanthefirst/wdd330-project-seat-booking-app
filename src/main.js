import { renderMovies } from "./components/movieCards.mjs";
import { Movie } from "./api/movieApi.mjs";
import { toggleMenu, loadHeaderFooter, darkMode } from "./utils/util.mjs";
import "./components/filterMovies.js";
import "./components/filterToggle.js";
import "./components/movieOverviewModal.mjs";

// Initialize the application
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load header and footer templates
    await loadHeaderFooter();

    // Set up mobile menu toggle
    const burgerMenu = document.querySelector(".menu-icon");
    if (burgerMenu) {
      burgerMenu.addEventListener("click", toggleMenu);
    }

    // Initialize dark mode
    darkMode();

    // Render movies
    await renderMovies();
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});
