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

export const movies = new Array(MOVIES_COUNT).fill(``).map((array, index) => generateMovie(index));
const filters = generateFilter(movies);

const renderMovie = (movieListElement, movie) => {
  const bodyElement = document.querySelector(`body`);
  const movieCardComponent = new MovieCard(movie);
  const movieCardDetailsComponent = new MovieCardDetails(movie);

  const movieListElementContainer = movieListElement.querySelector(`.films-list__container`);
  const buttonClose = movieCardDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  const showMovieCardDetails = () => bodyElement.appendChild(movieCardDetailsComponent.getElement());

  const hideMovieCardDetails = () => bodyElement.removeChild(movieCardDetailsComponent.getElement());

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideMovieCardDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
      buttonClose.removeEventListener(`click`, hideMovieCardDetails);
    }
  };

  const onMoviePictureClick = (evt) => {
    evt.preventDefault();
    showMovieCardDetails();
    buttonClose.addEventListener(`click`, hideMovieCardDetails);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  movieCardComponent.getElement().querySelector(`img`).addEventListener(`click`, onMoviePictureClick);
  movieCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onMoviePictureClick);
  movieCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onMoviePictureClick);

  render(movieListElementContainer, movieCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderNavigation = (navContainer) => {
  render(navContainer, new SiteMenu(filters).getElement(), RenderPosition.BEFOREEND);

  if (movies.length !== 0) {
    render(navContainer, new Sort().getElement(), RenderPosition.BEFOREEND);
  }
};

const renderMoviesBoard = (boardContainer, moviesList) => {
  const moviesComponent = new Movies();
  render(boardContainer, moviesComponent.getElement(), RenderPosition.BEFOREEND);

  const emptyMoviesListComponent = new MoviesList(0, `There are no movies in our database`, false, true);
  const mainMoviesListComponent = new MoviesList(0, `All movies. Upcoming`, true);
  const topRatedMoviesListComponent = new MoviesList(1, `Top rated`);
  const mostCommentedMoviesListComponent = new MoviesList(2, `Most commented`);

  if (moviesList.length === 0) {
    render(moviesComponent.getElement(), emptyMoviesListComponent.getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(moviesComponent.getElement(), mainMoviesListComponent.getElement(), RenderPosition.BEFOREEND);
  render(moviesComponent.getElement(), topRatedMoviesListComponent.getElement(), RenderPosition.BEFOREEND);
  render(moviesComponent.getElement(), mostCommentedMoviesListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(moviesList.length, MOVIES_COUNT_PER_STEP); i++) {
    renderMovie(mainMoviesListComponent.getElement(), movies[i]);
  }

  if (moviesList.length > MOVIES_COUNT_PER_STEP) {
    let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButton();

    render(mainMoviesListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      movies
        .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
        .forEach((movie) => render(mainMoviesListComponent, mainMoviesListComponent.getElement(), movie));

      renderedMoviesCount += MOVIES_COUNT_PER_STEP;

      if (renderedMoviesCount >= movies.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  for (let i = 0; i < MOVIES_EXTRA_COUNT; i++) {
    renderMovie(topRatedMoviesListComponent.getElement(), moviesList[i]);
    renderMovie(mostCommentedMoviesListComponent.getElement(), moviesList[i]);
  }
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserInfo().getElement(), RenderPosition.BEFOREEND);

renderNavigation(siteMainElement);
renderMoviesBoard(siteMainElement, movies);

render(siteFooterElement, new MovieStats(movies).getElement(), RenderPosition.BEFOREEND);

