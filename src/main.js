import {generateMovie} from "./mock/movie.js";
import {generateFilter} from "./mock/filter.js";
import {remove, render, RenderPosition} from "./utils/render";

import UserInfoView from "./view/user-info";
import SiteMenuView from "./view/site-menu";
import SortView from "./view/sort";
import MovieStatsView from "./view/movie-stats";
import MoviesListView from "./view/movies-list";
import MovieCardView from "./view/movie-card";
import MoviesView from "./view/movies";
import ShowMoreButtonView from "./view/show-more-button";
import MovieCardDetailsView from "./view/movie-card-details";

const MOVIES_COUNT = 22;
const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_EXTRA_COUNT = 2;

export const movies = new Array(MOVIES_COUNT).fill(``).map((array, index) => generateMovie(index));
const filters = generateFilter(movies);

const renderMovie = (movieListElement, movie) => {
  const bodyElement = document.querySelector(`body`);
  const movieCardComponent = new MovieCardView(movie);
  const movieCardDetailsComponent = new MovieCardDetailsView(movie);

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
  render(navContainer, new SiteMenuView(filters), RenderPosition.BEFOREEND);

  if (listMovies.length !== 0) {
    render(navContainer, new SortView(), RenderPosition.BEFOREEND);
  }
};

const renderMoviesBoard = (boardContainer, listMovies) => {
  const moviesComponent = new MoviesView();
  render(boardContainer, moviesComponent, RenderPosition.BEFOREEND);

  const emptyMoviesListComponent = new MoviesListView(0, `There are no movies in our database`, false, true);
  const mainMoviesListComponent = new MoviesListView(0, `All movies. Upcoming`, true);
  const topRatedMoviesListComponent = new MoviesListView(1, `Top rated`);
  const mostCommentedMoviesListComponent = new MoviesListView(2, `Most commented`);

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

    const showMoreButtonComponent = new ShowMoreButtonView();

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

render(siteHeaderElement, new UserInfoView(), RenderPosition.BEFOREEND);

renderNavigation(siteMainElement, movies);
renderMoviesBoard(siteMainElement, movies);

render(siteFooterElement, new MovieStatsView(movies), RenderPosition.BEFOREEND);

