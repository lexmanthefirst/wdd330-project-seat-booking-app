import { Movie } from "../api/movieApi.mjs";
import { renderMovies } from "./movieCards.mjs";

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

const genreSelect = document.getElementById("genre");
const yearInput = document.getElementById("year");
const titleInput = document.getElementById("title");
const applyBtn = document.getElementById("applyFilters");
const clearBtn = document.getElementById("clearFilters");
const loadingDiv = document.getElementById("loading");
const paginationDiv = document.getElementById("pagination");

let currentPage = 1;
let totalPages = 1;
let currentFilters = {};

function populateGenreOptions() {
  Object.entries(genreMap).forEach(([id, name]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    genreSelect.appendChild(option);
  });
}

function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("movieFilters", JSON.stringify(filters));
}

function getFiltersFromLocalStorage() {
  const stored = localStorage.getItem("movieFilters");
  return stored ? JSON.parse(stored) : {};
}

function showLoading() {
  loadingDiv.style.display = "block";
}

function hideLoading() {
  loadingDiv.style.display = "none";
}

function renderPagination() {
  paginationDiv.innerHTML = "";
  for (let i = 1; i <= totalPages && i <= 10; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === currentPage ? "active" : "";
    btn.addEventListener("click", () => {
      currentPage = i;
      applyFilters(currentFilters);
    });
    paginationDiv.appendChild(btn);
  }
}

async function applyFilters(filters = {}) {
  currentFilters = filters;
  saveFiltersToLocalStorage(filters);

  // Create new object without spread operator
  const requestParams = { page: currentPage };
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      requestParams[key] = filters[key];
    }
  }

  showLoading();
  const result = await Movie.fetchMovies(requestParams);
  hideLoading();

  renderMovies(result.movies);
  totalPages = result.totalPages || 1;
  renderPagination();
}

applyBtn.addEventListener("click", () => {
  currentPage = 1;
  const query = titleInput.value.trim();
  const genre = genreSelect.value;
  const year = yearInput.value.trim();

  const filters = {};
  if (query) filters.query = query;
  if (genre) filters.genre = genre;
  if (year) filters.year = year;

  applyFilters(filters);
});

clearBtn.addEventListener("click", () => {
  titleInput.value = "";
  genreSelect.value = "";
  yearInput.value = "";
  currentPage = 1;
  localStorage.removeItem("movieFilters");
  applyFilters({});
});

function restorePreviousFilters() {
  const saved = getFiltersFromLocalStorage();
  if (saved.query) titleInput.value = saved.query;
  if (saved.genre) genreSelect.value = saved.genre;
  if (saved.year) yearInput.value = saved.year;
  applyFilters(saved);
}

populateGenreOptions();
restorePreviousFilters();
