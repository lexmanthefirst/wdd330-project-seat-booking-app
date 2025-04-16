/**
 * Movie Overview Modal Component
 * Displays detailed information about a movie in a modal overlay
 */

// Create modal element
const modal = document.createElement("div");
modal.className = "movie-overview-modal";
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <div class="modal-header">
      <h2 class="modal-title"></h2>
    </div>
    <div class="modal-body">
      <div class="modal-poster-container">
        <img class="modal-poster" src="" alt="">
      </div>
      <div class="modal-details">
        <div class="modal-rating"></div>
        <div class="modal-price"></div>
        <div class="modal-release-date"></div>
        <div class="modal-genre"></div>
        <div class="modal-duration"></div>
        <div class="modal-overview"></div>
        <button class="modal-book-button">Book Now</button>
      </div>
    </div>
  </div>
`;

// Add modal to the document
document.body.appendChild(modal);

// Get modal elements
const closeBtn = modal.querySelector(".close-modal");
const modalTitle = modal.querySelector(".modal-title");
const modalPoster = modal.querySelector(".modal-poster");
const modalRating = modal.querySelector(".modal-rating");
const modalPrice = modal.querySelector(".modal-price");
const modalReleaseDate = modal.querySelector(".modal-release-date");
const modalGenre = modal.querySelector(".modal-genre");
const modalDuration = modal.querySelector(".modal-duration");
const modalOverview = modal.querySelector(".modal-overview");
const modalBookButton = modal.querySelector(".modal-book-button");

// Close modal when clicking the close button
closeBtn.addEventListener("click", () => {
  closeModal();
});

// Close modal when clicking outside the modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

/**
 * Opens the modal and displays movie information
 * @param {Object} movie - The movie object containing all movie details
 */
export function openModal(movie) {
  // Set movie information
  modalTitle.textContent = movie.title;
  modalPoster.src = movie.poster || "src/public/assets/no-poster.svg";
  modalPoster.alt = movie.title;
  modalRating.innerHTML = `<span class="rating-label"><strong>Rating</strong></span> <span class="rating-value">⭐ ${movie.rating.toFixed(
    1
  )}/10</span>`;
  modalPrice.innerHTML = `<span class="price-label"><strong>Price</strong></span> <span class="price-value">$${movie.price}</span>`;
  modalReleaseDate.innerHTML = `<span class="release-label"><strong>Release Date</strong></span> <span class="release-value">${formatDate(
    movie.releaseDate
  )}</span>`;
  modalGenre.innerHTML = `<span class="genre-label"><strong>Genre</strong></span> <span class="genre-value">${getGenreNames(
    movie.genre
  )}</span>`;
  modalDuration.innerHTML = `<span class="duration-label"><strong>Duration</strong></span> <span class="duration-value">${movie.duration} minutes</span>`;
  modalOverview.innerHTML = `<span class="overview-label"><strong>Overview</strong></span><p class="overview-text">${movie.overview}</p>`;

  // Set up book button
  modalBookButton.onclick = () => {
    closeModal();
    // Import and call the renderSeatMap function
    import("./seatMap.mjs").then((module) => {
      module.renderSeatMap(movie);
    });
  };

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

/**
 * Closes the modal
 */
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

/**
 * Formats a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date string
 */
function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Converts genre IDs to genre names
 * @param {string} genreIds - Comma-separated genre IDs
 * @returns {string} - Comma-separated genre names
 */
function getGenreNames(genreIds) {
  if (!genreIds) return "N/A";

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    18: "Drama",
    14: "Fantasy",
    27: "Horror",
    10749: "Romance",
    878: "Sci-Fi",
    53: "Thriller",
  };

  return genreIds
    .split(", ")
    .map((id) => genreMap[id] || id)
    .join(", ");
}
