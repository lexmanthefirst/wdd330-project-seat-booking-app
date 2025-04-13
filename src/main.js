import { renderMovies } from "./components/movieCards.mjs";
import { Movie } from "./api/movieApi.mjs";
import { toggleMenu, loadAllTemplates } from "./utils/util.mjs";
import "./components/filterMovies.js";

// Initialize the application
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load header and footer templates
    await loadAllTemplates();

    // Set up mobile menu toggle
    const burgerMenu = document.querySelector(".menu-icon");
    if (burgerMenu) {
      burgerMenu.addEventListener("click", toggleMenu);
    }

    // Render movies
    await renderMovies();
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});
