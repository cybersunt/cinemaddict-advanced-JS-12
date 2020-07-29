'use strict';

const MOVIES_LIST_COUNT = 3;
const MOVIES_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Header Components
const createUserInfoTemplate = () => {
  return (
    `<section class="header__profile profile">
       <p class="profile__rating">Movie Buff</p>
       <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

// Main Components
const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};
const createMoviesTemplate = () => `<section class="films"></section>`;

// MoviesList Components
const createMoviesListTemplate = (id) => id !== 0 ? `<section class="films-list--extra"></section>` : `<section class="films-list"></section>`;
const createMoviesListTitleTemplate = (title, hidden = false) => {
  if (hidden) {
    return (
      `<h2 class="films-list__title visually-hidden">${title}</h2>`
    );
  }
  return (
    `<h2 class="films-list__title">${title}</h2>`
  );
};
const createMoviesListContainerTemplate = ()=> `<div class="films-list__container"></div>`;
const createLoadMoreButtonTemplate = ()=> `<button class="films-list__show-more">Show more</button>`;

// Movie Components
const createMovieCard = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
         <span class="film-card__year">1929</span>
         <span class="film-card__duration">1h 55m</span>
         <span class="film-card__genre">Musical</span>
       </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

// Footer Components
const createMovieStatsTemplate = () => {
  return (
    `<section class="footer__statistics">
       <p>130 291 movies inside</p>
     </section>`
  );
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserInfoTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createMoviesTemplate(), `beforeend`);
render(siteFooterElement, createMovieStatsTemplate(), `beforeend`);

const moviesElement = siteMainElement.querySelector(`.films`);

for (let i = 0; i < MOVIES_LIST_COUNT; i++) {
  render(moviesElement, createMoviesListTemplate(i), `beforeend`);
}

const mainMoviesListElement = moviesElement.querySelector(`.films-list`);

render(mainMoviesListElement, createMoviesListTitleTemplate(`All movies. Upcoming`, true), `beforeend`);
render(mainMoviesListElement, createMoviesListContainerTemplate(), `beforeend`);
render(mainMoviesListElement, createLoadMoreButtonTemplate(), `beforeend`);

const moviesListContainerElement = mainMoviesListElement.querySelector(`.films-list__container`);

for (let i = 0; i < MOVIES_COUNT; i++) {
  render(moviesListContainerElement, createMovieCard(), `beforeend`);
}
