// Use environment variable for API key or fallback to a default key
// In a production environment, this should be handled server-side
const API_KEY = "8f6bd3ce621ef9e4fb9ded1e25dc43e0";

class Movie {
  static movies = [];

  static async fetchMovies(filters = {}) {
    try {
      const { query, genre, year, page = 1 } = filters;

      let url;
      if (query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
        if (genre) url += `&with_genres=${genre}`;
        if (year) url += `&primary_release_year=${year}`;
      }

      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (!data.results || !Array.isArray(data.results))
        throw new Error("Invalid data format from API");

      const movies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        price: Math.floor(Math.random() * 5) + 8,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : null,
        overview: movie.overview,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        seats: this.generateSeats(6, 8),
        genre: movie.genre_ids.join(", "),
        duration: movie.runtime || 120,
      }));

      return {
        movies,
        totalPages: data.total_pages,
      };
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return { movies: [], totalPages: 1 };
    }
  }

  static generateSeats(rows, cols) {
    const seats = [];
    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row);
      for (let col = 1; col <= cols; col++) {
        seats.push({
          id: `${rowLetter}${col}`,
          row: rowLetter,
          number: col,
          occupied: Math.random() > 0.8, // 20% chance of being occupied
        });
      }
    }
    return seats;
  }

  static getMovie(index) {
    if (index < 0 || index >= this.movies.length) {
      return null;
    }
    return this.movies[index];
  }

  static getMovieById(id) {
    return this.movies.find((movie) => movie.id === id) || null;
  }
}

export { Movie };
