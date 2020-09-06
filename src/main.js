import {generateMovie} from "./mock/movie.js";
import {generateFilter} from "./mock/filter.js";
import {remove, render, RenderPosition} from "./utils/render";

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

  const showMovieCardDetails = () => render(bodyElement, movieCardDetailsComponent, RenderPosition.BEFOREEND);

  const hideMovieCardDetails = () => remove(movieCardDetailsComponent);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      hideMovieCardDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onMovieCardClick = () => {
    showMovieCardDetails();
    movieCardDetailsComponent.setButtonCloseClickHandler(()=> {
      hideMovieCardDetails();
    });
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  movieCardComponent.setMovieCardClickHandler(() => {
    onMovieCardClick();
  });

  render(movieListElementContainer, movieCardComponent, RenderPosition.BEFOREEND);
};

const renderNavigation = (navContainer, listMovies) => {
  render(navContainer, new SiteMenu(filters), RenderPosition.BEFOREEND);

  if (listMovies.length !== 0) {
    render(navContainer, new Sort(), RenderPosition.BEFOREEND);
  }
};

const renderMoviesBoard = (boardContainer, listMovies) => {
  const moviesComponent = new Movies();
  render(boardContainer, moviesComponent, RenderPosition.BEFOREEND);

  const emptyMoviesListComponent = new MoviesList(0, `There are no movies in our database`, false, true);
  const mainMoviesListComponent = new MoviesList(0, `All movies. Upcoming`, true);
  const topRatedMoviesListComponent = new MoviesList(1, `Top rated`);
  const mostCommentedMoviesListComponent = new MoviesList(2, `Most commented`);

  if (listMovies.length === 0) {
    render(moviesComponent, emptyMoviesListComponent, RenderPosition.BEFOREEND);
    return;
  }

  render(moviesComponent, mainMoviesListComponent, RenderPosition.BEFOREEND);
  render(moviesComponent, topRatedMoviesListComponent, RenderPosition.BEFOREEND);
  render(moviesComponent, mostCommentedMoviesListComponent, RenderPosition.BEFOREEND);

  listMovies
    .slice(0, Math.min(movies.length, MOVIES_COUNT_PER_STEP))
    .forEach((listMovie) => renderMovie(mainMoviesListComponent.getElement(), listMovie));

  if (listMovies.length > MOVIES_COUNT_PER_STEP) {
    let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButton();

    render(mainMoviesListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      listMovies
        .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
        .forEach((listMovie) => renderMovie(mainMoviesListComponent.getElement(), listMovie));

      renderedMoviesCount += MOVIES_COUNT_PER_STEP;

      if (renderedMoviesCount >= listMovies.length) {
        remove(showMoreButtonComponent);
      }
    });
  }

  for (let i = 0; i < MOVIES_EXTRA_COUNT; i++) {
    renderMovie(topRatedMoviesListComponent.getElement(), listMovies[i]);
    renderMovie(mostCommentedMoviesListComponent.getElement(), listMovies[i]);
  }
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserInfo(), RenderPosition.BEFOREEND);

renderNavigation(siteMainElement, movies);
renderMoviesBoard(siteMainElement, movies);

render(siteFooterElement, new MovieStats(movies), RenderPosition.BEFOREEND);

