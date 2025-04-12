/**
 * Utility functions for the Book My Corner application
 */

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

export async function loadTemplate(templateName) {
  try {
    const response = await fetch(`/src/public/partials/${templateName}.html`);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${templateName}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading template ${templateName}:`, error);
    return `<div class="error-message">Failed to load ${templateName} template</div>`;
  }
}

/**
 * Loads and injects the header template into the DOM
 * @returns {Promise<void>}
 */
export async function loadHeader() {
  const headerElement = document.getElementById("main-header");
  if (headerElement) {
    const headerContent = await loadTemplate("header");
    headerElement.innerHTML = headerContent;
  }
}

/**
 * Loads and injects the footer template into the DOM
 * @returns {Promise<void>}
 */
export async function loadFooter() {
  const footerElement = document.getElementById("main-footer");
  if (footerElement) {
    const footerContent = await loadTemplate("footer");
    footerElement.innerHTML = footerContent;
  }
}

/**
 * Loads all templates (header and footer)
 * @returns {Promise<void>}
 */
export async function loadAllTemplates() {
  await Promise.all([loadHeader(), loadFooter()]);
}
