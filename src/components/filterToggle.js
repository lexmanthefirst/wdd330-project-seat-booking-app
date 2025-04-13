//Handles filter toggle functionality for the movie filters in the sidebar

// Get DOM elements
const filterToggle = document.getElementById("filter-toggle");
const filterContainer = document.getElementById("movie-filters");
const closeFilters = document.getElementById("close-filters");

// Toggle filter container
function toggleFilters() {
  filterContainer.classList.toggle("active");

  // Update toggle button text
  if (filterContainer.classList.contains("active")) {
    filterToggle.innerHTML = '<i class="fas fa-filter"></i> Close Filters';
  } else {
    filterToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
  }
}

// Close filter container
function closeFilterContainer() {
  filterContainer.classList.remove("active");
  filterToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
}

// Add event listeners
if (filterToggle) {
  filterToggle.addEventListener("click", toggleFilters);
}

if (closeFilters) {
  closeFilters.addEventListener("click", closeFilterContainer);
}

// Close filters when clicking outside
document.addEventListener("click", (event) => {
  if (
    filterContainer.classList.contains("active") &&
    !filterContainer.contains(event.target) &&
    event.target !== filterToggle
  ) {
    closeFilterContainer();
  }
});
