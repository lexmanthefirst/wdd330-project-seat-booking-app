import { Movie } from "../api/movieApi.mjs";

const container = document.querySelector(".movies-container");

export async function renderMovies() {
  const movies = await Movie.fetchMovies();

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" class="movie-poster" alt="${movie.title}">
      <div class="movie-content">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="rating">★ ${movie.rating}/10</div>
      </div>
    `;

    container.appendChild(card);
  });
}
