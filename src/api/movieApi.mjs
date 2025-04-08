const API_KEY = "8f6bd3ce621ef9e4fb9ded1e25dc43e0";

class Movie {
  static movies = [];

  static async fetchMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      console.log(data);
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
    return this.movies[index];
  }
}

export { Movie };
