'use strict';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Header components
const createUserInfoTemplate = () => {
  return (
    `<section class="header__profile profile">
       <p class="profile__rating">Movie Buff</p>
       <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

// Footer components
const createMovieStatsTemplate = () => {
  return (
    `<section class="footer__statistics">
       <p>130 291 movies inside</p>
     </section>`
  );
};

const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserInfoTemplate(), `beforeend`);
render(siteFooterElement, createMovieStatsTemplate(), `beforeend`);
