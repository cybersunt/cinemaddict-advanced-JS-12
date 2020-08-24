const movieToFilterMap = {
  favorites: (movies) => movies
    .filter((movie) => movie.isFavorite).length,
  history: (movies) => movies
    .filter((movie) => movie.isHistory).length,
  watchlist: (movies) => movies
    .filter((movie) => !movie.isHistory)
    .filter((movie) => movie.isWatchlist).length,
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
