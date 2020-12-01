import {getPictureUrl, getRandomElement, getRuntimeInHours, getStringFromArray} from "../utils/movie";
import Abstract from "./abstract";

const createMovieCardTemplate = (movie) => {
  const {
    id,
    poster,
    title,
    description,
    releaseDate,
    runtime,
    genres,
    rating,
    comments,
    isWatchlist,
    isHistory,
    isFavorite
  } = movie;

  const watchlistClassName = isWatchlist ? `film-card__controls-item--active` : ``;

  const historyClassName = isHistory ? `film-card__controls-item--active` : ``;

  const favoriteClassName = isFavorite ? `film-card__controls-item--active` : ``;

  const [hours, minutes] = getRuntimeInHours(runtime);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating.toPrecision(2)}</p>
      <p class="film-card__info">
         <span class="film-card__year">${releaseDate.getFullYear()}</span>
         <span class="film-card__duration">${hours}h ${minutes}m</span>
         <span class="film-card__genre">${getRandomElement(genres)}</span>
       </p>
      <img src="${getPictureUrl(`posters`, poster)}" alt="" class="film-card__poster" data-id="${id}">
      <p class="film-card__description">${getStringFromArray(description, `.`)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyClassName}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class MovieCardView extends Abstract {
  constructor(movie) {
    super();
    this._movie = movie;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);

    this._movieCardClickHandler = this._movieCardClickHandler.bind(this);
  }
  getTemplate() {
    return createMovieCardTemplate(this._movie);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _movieCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.movieCardClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._historyClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist `).addEventListener(`click`, this._watchlistClickHandler);
  }

  setMovieCardClickHandler(callback) {
    this._callback.movieCardClick = callback;
    this.getElement().querySelectorAll(`img, .film-card__title, .film-card__comments`)
      .forEach((element) => element.addEventListener(`click`, this._movieCardClickHandler));
  }
}
