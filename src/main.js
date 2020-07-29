'use strict';

const MOVIES_LIST_COUNT = 3;

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

render(mainMoviesListElement, createMoviesListTitleTemplate('All movies. Upcoming', true), `beforeend`);
render(mainMoviesListElement, createMoviesListContainerTemplate(), `beforeend`);
render(mainMoviesListElement, createLoadMoreButtonTemplate(), `beforeend`);
