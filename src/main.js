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
import BoardPresenter from "../../taskmanager-12/src/presenter/board";
import Board from "./presenter/board";

const MOVIES_COUNT = 22;
const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_EXTRA_COUNT = 2;

export const movies = new Array(MOVIES_COUNT).fill(``).map((array, index) => generateMovie(index));
const filters = generateFilter(movies);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const moviesComponent = new MoviesView();

console.log(moviesComponent)

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

const renderMovieList = (listMovies, id, title, isHidden) => {
  const emptyMoviesListComponent = new MoviesListView(0, `There are no movies in our database`, false, true);
  const moviesListComponent = new MoviesListView(id, title, isHidden);

  if (listMovies.length === 0) {
    render(moviesComponent, emptyMoviesListComponent, RenderPosition.BEFOREEND);
    return;
  }

  render(moviesComponent, moviesListComponent, RenderPosition.BEFOREEND);

  if (isHidden) {
    listMovies
      .slice(0, Math.min(movies.length, MOVIES_COUNT_PER_STEP))
      .forEach((listMovie) => renderMovie(moviesListComponent.getElement(), listMovie));

    if (listMovies.length > MOVIES_COUNT_PER_STEP) {
      let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

      const showMoreButtonComponent = new ShowMoreButtonView();

      render(moviesListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

      showMoreButtonComponent.setClickHandler(() => {
        listMovies
          .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
          .forEach((listMovie) => renderMovie(moviesListComponent.getElement(), listMovie));

        renderedMoviesCount += MOVIES_COUNT_PER_STEP;

        if (renderedMoviesCount >= listMovies.length) {
          remove(showMoreButtonComponent);
        }
      });
    }
  } else {
    listMovies
      .slice(0, Math.min(movies.length, MOVIES_EXTRA_COUNT))
      .forEach((listMovie) => renderMovie(moviesListComponent.getElement(), listMovie));
  }
};

render(siteHeaderElement, new UserInfoView(), RenderPosition.BEFOREEND);

const mainInner = new Board(siteMainElement, filters);
mainInner.init(movies);

renderMovieList(movies, 0, `All movies. Upcoming`, true);
renderMovieList(movies, 1, `Top rated`);
renderMovieList(movies, 2, `Most commented`);

render(siteFooterElement, new MovieStatsView(movies), RenderPosition.BEFOREEND);

