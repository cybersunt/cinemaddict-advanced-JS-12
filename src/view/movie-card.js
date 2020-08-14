import {getRandomElement,} from "../utils";

export const createMovieCard = (movie) => {
  const {
    poster,
    title,
    description,
    releaseDate,
    runtime,
    genres,
    rating,
    comments
  } = movie;

  const ONE_HOUR = 60;
  const hours = Math.floor(runtime / ONE_HOUR);
  const minutes = runtime % ONE_HOUR;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
         <span class="film-card__year">${releaseDate}</span>
         <span class="film-card__duration">${hours}h ${minutes}m</span>
         <span class="film-card__genre">${getRandomElement(genres)}</span>
       </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};
