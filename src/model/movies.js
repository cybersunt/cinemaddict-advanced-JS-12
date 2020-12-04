import Observer from "../utils/observer.js";
import {filter} from "../presenter/site-menu-filter";
import {FilterType} from "../const";

export default class MoviesModel extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  set(updateType, movies) {
    this._movies = movies.slice();
    this._notify(updateType);
  }

  get() {
    return this._movies;
  }

  getWatchedMovies() {
    return filter[FilterType.HISTORY](this._movies);
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting movie`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const commentsCopy = update.film.comments.slice();
    commentsCopy.push(update.comment);
    const newMovie = Object.assign({}, update.film, {
      comments: commentsCopy
    });
    this.updateMovie(updateType, newMovie);
  }

  deleteComment(updateType, update) {
    const commentsCopy = update.film.comments.slice().filter((comment) => comment.id !== update.comment);
    const newMovie = Object.assign({}, update.film, {
      comments: commentsCopy
    });

    this.updateMovie(updateType, newMovie);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
        {},
        movie,
        {
          poster: movie.film_info.poster,
          title: movie.film_info.title,
          originalTitle: movie.film_info.alternative_title,
          description: movie.film_info.description,
          releaseDate: movie.film_info.release.date !== null ? new Date(movie.film_info.release.date) : movie.film_info.release.date,
          director: movie.film_info.director,
          writers: movie.film_info.writers,
          actors: movie.film_info.actors,
          runtime: movie.film_info.runtime,
          country: movie.film_info.release.release_country,
          genres: movie.film_info.genre,
          rating: movie.film_info.total_rating,
          ageLimitations: movie.film_info.age_rating,
          isWatchlist: movie.user_details.watchlist,
          isHistory: movie.user_details.already_watched,
          isFavorite: movie.user_details.favorite,
          watchingDate: movie.user_details.watching_date !== null ? new Date(movie.user_details.watching_date) : movie.film_info.release.date,
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
        {},
        movie,
        {
          "film_info": {
            "title": movie.title,
            "alternative_title": movie.originalTitle,
            "total_rating": movie.rating,
            "poster": movie.poster,
            "age_rating": movie.ageLimitations,
            "director": movie.director,
            "writers": movie.writes,
            "actors": movie.actors,
            "release": {
              "date": movie.releaseDate instanceof Date ? movie.releaseDate.toISOString() : null, // На сервере дата хранится в ISO формате
              "release_country": movie.country
            },
            "runtime": movie.runtime,
            "genre": movie.genres,
            "description": movie.description
          },
          "user_details": {
            "watchlist": movie.isWatchlist,
            "already_watched": movie.isHistory,
            "watching_date": movie.watchingDate instanceof Date ? movie.watchingDate.toISOString() : null, // На сервере дата хранится в ISO формате
            "favorite": movie.isFavorite
          }
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedMovie.title;
    delete adaptedMovie.originalTitle;
    delete adaptedMovie.rating;
    delete adaptedMovie.poster;
    delete adaptedMovie.ageLimitations;
    delete adaptedMovie.director;
    delete adaptedMovie.writers;
    delete adaptedMovie.actors;
    delete adaptedMovie.releaseDate;
    delete adaptedMovie.runtime;
    delete adaptedMovie.genres;
    delete adaptedMovie.isWatchlist;
    delete adaptedMovie.isHistory;
    delete adaptedMovie.isFavorite;
    delete adaptedMovie.watchingDate;

    return adaptedMovie;
  }
}
