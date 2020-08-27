import {getPictureUrl, getRandomElement, getRuntimeInHours, getStringFromArray} from "../utils";

export const createMovieCardTemplate = (movie) => {
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

  const watchlistClassName = isWatchlist ? `film-card__controls-item--add-to-watchlist film-card__controls-item--active` : `film-card__controls-item--add-to-watchlist`;

  const historyClassName = isHistory ? `film-card__controls-item--mark-as-watched film-card__controls-item--active` : `film-card__controls-item--mark-as-watched`;

  const favoriteClassName = isFavorite ? `film-card__controls-item--favorite film-card__controls-item--active` : `film-card__controls-item--favorite`;

  return (
    `<article class="film-card">

      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating.toPrecision(2)}</p>
      <p class="film-card__info">
         <span class="film-card__year">${releaseDate.getFullYear()}</span>
         <span class="film-card__duration">${getRuntimeInHours(runtime)}</span>
         <span class="film-card__genre">${getRandomElement(genres)}</span>
       </p>
      <img src="${getPictureUrl(`posters`, poster)}" alt="" class="film-card__poster" data-id="${id}">
      <p class="film-card__description">${getStringFromArray(description, `.`)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button ${watchlistClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button ${historyClassName}">Mark as watched</button>
        <button class="film-card__controls-item button ${favoriteClassName}">Mark as favorite</button>
      </form>
    </article>`
  );
};
