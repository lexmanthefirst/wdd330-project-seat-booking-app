import { Movie } from "../api/movieApi.mjs";
import { renderSeatMap } from "./seatMap.mjs";
import { openModal } from "./movieOverviewModal.mjs";

const container = document.querySelector(".movies-container");
const DEFAULT_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23666'%3ENo Poster Available%3C/text%3E%3C/svg%3E";

export async function renderMovies(movies = null) {
  try {
    // If movies are provided, use them; otherwise fetch from API
    let movieData;
    if (movies) {
      movieData = { movies, totalPages: 1 };
    } else {
      movieData = await Movie.fetchMovies();
      movies = movieData.movies;
    }

    if (movies.length === 0) {
      container.innerHTML =
        '<div class="error-message">No movies available at the moment. Please try again later.</div>';
      return;
    }

    container.innerHTML = ""; // Clear existing content

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${
          movie.poster || DEFAULT_POSTER
        }" class="movie-poster" alt="${movie.title}">
        <div class="movie-content">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-details">
            <div class="rating">★ ${movie.rating.toFixed(1)}/10</div>
            <div class="price">$${movie.price}</div>
          </div>
          <div class="movie-buttons">
            <button class="view-details-button" data-movie-id="${
              movie.id
            }">View Details</button>
            <button class="book-button" data-movie-id="${
              movie.id
            }">Book Now</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Add event listeners to view details buttons
    document.querySelectorAll(".view-details-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const movieId = parseInt(e.target.getAttribute("data-movie-id"));
        const movie = movies.find((m) => m.id === movieId);
        if (movie) {
          openModal(movie);
        }
      });
    });

    // Add event listeners to book buttons
    document.querySelectorAll(".book-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const movieId = parseInt(e.target.getAttribute("data-movie-id"));
        const movie = movies.find((m) => m.id === movieId);
        if (movie) {
          renderSeatMap(movie);
        }
      });
    });
  } catch (error) {
    console.error("Error rendering movies:", error);
    container.innerHTML =
      '<div class="error-message">Failed to load movies. Please try again later.</div>';
  }
}
