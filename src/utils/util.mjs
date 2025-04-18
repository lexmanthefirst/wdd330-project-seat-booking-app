/**
 * Toggles the mobile navigation menu
 */
export const toggleMenu = () => {
  const navigation = document.querySelector(".navigation");
  const burgerMenu = document.querySelector(".menu-icon");

  if (!navigation || !burgerMenu) {
    console.error("Navigation or burger menu elements not found");
    return;
  }

  // Toggle the mobile navigation class
  navigation.classList.toggle("navigation--mobile");

  // Toggle the burger menu icon
  const isOpen = navigation.classList.contains("navigation--mobile");

  // Update the burger menu icon based on state
  if (isOpen) {
    burgerMenu.src = "/src/public/assets/close.svg";
  } else {
    burgerMenu.src = "/src/public/assets/burger-menu.svg";
  }
};

export function renderWithTemplate(
  template,
  parentElement,
  data = null,
  callback = null
) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  return res.text();
}

export async function loadHeaderFooter() {
  try {
    // Determine the correct path based on the current page
    const isMoviePage = window.location.pathname.includes("moviePage");
    const basePath = isMoviePage ? "../partials/" : "/src/partials/";

    // Load templates - use different header for movie page
    const headerTemplate = await loadTemplate(
      isMoviePage ? `${basePath}moviePageHeader.html` : `${basePath}header.html`
    );
    const footerTemplate = await loadTemplate(`${basePath}footer.html`);

    // Try both ID and class selectors for header
    const headerElement =
      document.querySelector("#main-header") ||
      document.querySelector(".main-header");
    const footerElement =
      document.querySelector("#main-footer") ||
      document.querySelector(".main-footer");

    if (headerElement && footerElement) {
      headerElement.innerHTML = headerTemplate;
      footerElement.innerHTML = footerTemplate;

      // Initialize theme toggle after loading header
      const themeBtn = document.querySelector(".theme-toggle");
      if (themeBtn) {
        darkMode();
      }
    } else {
      console.error("Header or footer elements not found in the DOM");
    }
  } catch (error) {
    console.error("Error loading header and footer templates:", error);
  }
}

export const darkMode = () => {
  const themeBtn = document.getElementById("theme-btn");
  const root = document.documentElement;

  // Function to set the theme
  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    // Update button icon based on theme
    if (theme === "dark") {
      themeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      `;
    } else {
      themeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      `;
    }
  }

  // Toggle theme on button click
  function toggleTheme() {
    const currentTheme = root.dataset.theme || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  // Set theme on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  });

  // Add event listener to button
  themeBtn.addEventListener("click", toggleTheme);
};
