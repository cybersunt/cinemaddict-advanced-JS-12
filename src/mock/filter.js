const movieToFilterMap = {
  favorites: (movies) => movies
    .filter((movie) => movie.isFavorite).length,
  history: (movies) => movies
    .filter((movie) => movie.isHistory).length,
  watchlist: (movies) => movies
    .filter((movie) => !movie.isHistory && movie.isWatchlist).length,
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => ({
    name: filterName,
    count: countMovies(movies),
  }));
};
