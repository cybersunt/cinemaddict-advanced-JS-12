import {getRandomElement, getRuntimeInHours} from "../utils";

export const createMovieCard = (movie) => {
  const {
    id,
    poster,
    title,
    description,
    releaseDate,
    runtime,
    genres,
    rating,
    comments
  } = movie;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
         <span class="film-card__year">${releaseDate.getFullYear()}</span>
         <span class="film-card__duration">${getRuntimeInHours(runtime)}</span>
         <span class="film-card__genre">${getRandomElement(genres)}</span>
       </p>
      <img src="${poster}" alt="" class="film-card__poster" data-id="${id}">
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
