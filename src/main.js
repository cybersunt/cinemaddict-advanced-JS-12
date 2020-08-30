import {createUserInfoTemplate} from "./view/user-info";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createSortTemplate} from "./view/sort";
import {createMoviesTemplate} from "./view/movies";
import {createMovieStatsTemplate} from "./view/movie-stats";
import {createMoviesListTemplate} from "./view/movies-list";
import {createMovieCardTemplate} from "./view/movie-card";
import {createMovieCardDetailsTemplate} from "./view/movie-card-details";
import {createShowMoreButtonTemplate} from "./view/show-more-button";
import {generateMovie} from "./mock/movie.js";
import {generateFilter} from "./mock/filter.js";
import {renderTemplate, renderMoviesList, RenderPosition} from "./utils/render";

const MOVIES_LIST_COUNT = 3;
const MOVIES_COUNT = 22;
const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_EXTRA_COUNT = 2;

export const movies = new Array(MOVIES_COUNT).fill(``).map((array, index) => generateMovie(index));
const filters = generateFilter(movies);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

renderTemplate(siteHeaderElement, createUserInfoTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSiteMenuTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createMoviesTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createMovieStatsTemplate(), RenderPosition.BEFOREEND);

const moviesElement = siteMainElement.querySelector(`.films`);

for (let i = 0; i < MOVIES_LIST_COUNT; i++) {
  renderTemplate(moviesElement, createMoviesListTemplate(i), RenderPosition.BEFOREEND);
}

const mainMoviesListElement = moviesElement.querySelector(`.films-list`);
const [topRatedMoviesListElement, mostCommentedMoviesListElement] = moviesElement.querySelectorAll(`.films-list--extra`);

renderMoviesList(mainMoviesListElement, `All movies. Upcoming`, true, Math.min(movies.length, MOVIES_COUNT_PER_STEP));

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

  renderTemplate(mainMoviesListElement, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const showMoreButton = mainMoviesListElement.querySelector(`.films-list__show-more`);
  const containerElement = mainMoviesListElement.querySelector(`.films-list__container`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => renderTemplate(containerElement, createMovieCardTemplate(movie), RenderPosition.BEFOREEND));

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
  renderTemplate(siteFooterElement, createMovieCardDetailsTemplate(movies[idx]), RenderPosition.BEFOREEND);

  const movieDetails = document.querySelector(`.film-details`);
  const buttonClose = movieDetails.querySelector(`.film-details__close-btn`);

  buttonClose.addEventListener(`click`, () => movieDetails.remove());
};

mainMoviesListElement.addEventListener(`click`, onMoviePictureClick);
topRatedMoviesListElement.addEventListener(`click`, onMoviePictureClick);
mostCommentedMoviesListElement.addEventListener(`click`, onMoviePictureClick);
