import {generateMovie} from "./mock/movie.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render";

import UserInfo from "./view/user-info";
import SiteMenu from "./view/site-menu";
import Sort from "./view/sort";
import MovieStats from "./view/movie-stats";
import MoviesList from "./view/movies-list";
import MovieCard from "./view/movie-card";
import Movies from "./view/movies";
import ShowMoreButton from "./view/show-more-button";
import MovieCardDetails from "./view/movie-card-details";

const MOVIES_COUNT = 22;
const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_EXTRA_COUNT = 2;

const movies = new Array(MOVIES_COUNT).fill(``).map((array, index) => generateMovie(index));
const filters = generateFilter(movies);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserInfo().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenu(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);

const moviesComponent = new Movies();

render(siteMainElement, moviesComponent.getElement(), RenderPosition.BEFOREEND);
render(siteFooterElement, new MovieStats().getElement(), RenderPosition.BEFOREEND);

const mainMoviesListComponent = new MoviesList(0, `All movies. Upcoming`, true);
const topRatedMoviesListComponent = new MoviesList(1, `Top rated`);
const mostCommentedMoviesListComponent = new MoviesList(2, `Most commented`);

render(moviesComponent.getElement(), mainMoviesListComponent.getElement(), RenderPosition.BEFOREEND);
render(moviesComponent.getElement(), topRatedMoviesListComponent.getElement(), RenderPosition.BEFOREEND);
render(moviesComponent.getElement(), mostCommentedMoviesListComponent.getElement(), RenderPosition.BEFOREEND);

const containerElement = mainMoviesListComponent.getElement().querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(movies.length, MOVIES_COUNT_PER_STEP); i++) {
  render(containerElement, new MovieCard(movies[i]).getElement(), RenderPosition.BEFOREEND);
}

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButton();

  render(mainMoviesListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => render(containerElement, new MovieCard(movie).getElement(), RenderPosition.BEFOREEND));

    renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (renderedMoviesCount >= movies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

const containerTopRatedMoviesList = topRatedMoviesListComponent.getElement().querySelector(`.films-list__container`);
const containerMostCommentedMoviesList = mostCommentedMoviesListComponent.getElement().querySelector(`.films-list__container`);

for (let i = 0; i < MOVIES_EXTRA_COUNT; i++) {
  render(containerTopRatedMoviesList, new MovieCard(movies[i]).getElement(), RenderPosition.BEFOREEND);
  render(containerMostCommentedMoviesList, new MovieCard(movies[i]).getElement(), RenderPosition.BEFOREEND);
}

const onMoviePictureClick = (evt) => {
  evt.preventDefault();
  const idx = evt.target.dataset.id;
  render(siteFooterElement, new MovieCardDetails(movies[idx]).getElement(), RenderPosition.BEFOREEND);

  const movieDetails = document.querySelector(`.film-details`);
  const buttonClose = movieDetails.querySelector(`.film-details__close-btn`);

  buttonClose.addEventListener(`click`, () => movieDetails.remove());
};

mainMoviesListComponent.getElement().addEventListener(`click`, onMoviePictureClick);
topRatedMoviesListComponent.getElement().addEventListener(`click`, onMoviePictureClick);
mostCommentedMoviesListComponent.getElement().addEventListener(`click`, onMoviePictureClick);
