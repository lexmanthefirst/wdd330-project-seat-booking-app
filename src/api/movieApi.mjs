// Use environment variable for API key or fallback to a default key
// In a production environment, this should be handled server-side
const API_KEY = "8f6bd3ce621ef9e4fb9ded1e25dc43e0";

class Movie {
  static movies = [];

  static async fetchMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid data format received from API");
      }

      this.movies = data.results.slice(0, 10).map((movie) => ({
        id: movie.id,
        title: movie.title,
        price: Math.floor(Math.random() * 5) + 8, // $8-$12
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : null,
        overview: movie.overview,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        seats: this.generateSeats(6, 8),
      }));
      return this.movies;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      // Return empty array but log the error for debugging
      return [];
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
