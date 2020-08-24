import {createUserInfoTemplate} from "./view/user-info";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createSortTemplate} from "./view/sort";
import {createMoviesTemplate} from "./view/movies";
import {createMovieStatsTemplate} from "./view/movie-stats";
import {createMoviesListTemplate} from "./view/movies-list";
import {createMoviesListTitleTemplate} from "./view/movies-list-title";
import {createMoviesListContainerTemplate} from "./view/movie-list-container";
import {createMovieCard} from "./view/movie-card";
import {createMovieCardDetails} from "./view/movie-card-details";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {generateMovie} from "./mock/movie.js";
import {generateFilter} from "./mock/filter.js";
import {createTaskTemplate} from "../../demo-taskmanager-12/src/view/task";

const MOVIES_LIST_COUNT = 3;
const MOVIES_COUNT = 22;
const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_EXTRA_COUNT = 2;

const movies = new Array(MOVIES_COUNT).fill(``).map(function (array, index) {
  return generateMovie(index);
});

const filters = generateFilter(movies);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderMoviesList = (moviesList, title, titleIsHidden, count) => {
  render(moviesList, createMoviesListTitleTemplate(title, titleIsHidden), `beforeend`);
  render(moviesList, createMoviesListContainerTemplate(), `beforeend`);

  const containerElement = moviesList.querySelector(`.films-list__container`);

  for (let i = 0; i < count; i++) {
    render(containerElement, createMovieCard(movies[i]), `beforeend`);
  }
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserInfoTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createMoviesTemplate(), `beforeend`);
render(siteFooterElement, createMovieStatsTemplate(), `beforeend`);

const moviesElement = siteMainElement.querySelector(`.films`);

for (let i = 0; i < MOVIES_LIST_COUNT; i++) {
  render(moviesElement, createMoviesListTemplate(i), `beforeend`);
}

const mainMoviesListElement = moviesElement.querySelector(`.films-list`);
const topRatedMoviesListElement = moviesElement.querySelectorAll(`.films-list--extra`)[0];
const mostCommentedMoviesListElement = moviesElement.querySelectorAll(`.films-list--extra`)[1];

renderMoviesList(mainMoviesListElement, `All movies. Upcoming`, true, Math.min(movies.length, MOVIES_COUNT_PER_STEP));

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

  render(mainMoviesListElement, createShowMoreButtonTemplate(), `beforeend`);

  const showMoreButton = mainMoviesListElement.querySelector(`.films-list__show-more`);
  const containerElement = mainMoviesListElement.querySelector(`.films-list__container`);

  console.log(containerElement);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => render(containerElement, createMovieCard(movie), `beforeend`));

    renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (renderedMoviesCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

renderMoviesList(topRatedMoviesListElement, `Top rated`, false, MOVIES_EXTRA_COUNT);
renderMoviesList(mostCommentedMoviesListElement, `Most commented`, false, MOVIES_EXTRA_COUNT);

const onMoviePictureClick = (evt) => {
  evt.preventDefault();
  const idx = evt.target.dataset.id;
  render(siteFooterElement, createMovieCardDetails(movies[idx]), `beforeend`);

  const movieDetails = document.querySelector(`.film-details`);
  const buttonClose = movieDetails.querySelector(`.film-details__close-btn`);

  buttonClose.addEventListener(`click`, () => movieDetails.remove());
};

mainMoviesListElement.addEventListener(`click`, onMoviePictureClick);
topRatedMoviesListElement.addEventListener(`click`, onMoviePictureClick);
mostCommentedMoviesListElement.addEventListener(`click`, onMoviePictureClick);
