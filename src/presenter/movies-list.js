import MoviesListView from "../view/movies-list";
import {remove, render, RenderPosition} from "../utils/render";
import Movie from "./movie";
import ShowMoreButtonView from "../view/show-more-button";

const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_EXTRA_COUNT = 2;

export default class MoviesList {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;
    this._renderedMoviesCount = MOVIES_COUNT_PER_STEP;

    this._emptyMoviesListComponent = new MoviesListView(0, `There are no movies in our database`, false, true);
    this._mainMoviesListComponent = new MoviesListView(0, `All movies. Upcoming`, true);
    this._mostCommentedMoviesListComponent = new MoviesListView(2, `Most commented`);
    this._topRatedMoviesListComponent = new MoviesListView(1, `Top rated`);
    this._showMoreButtonComponent = new ShowMoreButtonView();
  }

  init(listMovies) {
    this._listMovies = listMovies;
    this._renderMoviesList();
  }

  _renderMovie(movieListElement, movie) {
    const moviePresenter = new Movie(movieListElement);
    moviePresenter.init(movie);
  }

  _renderMovies(from, to, container) {
    this._listMovies
      .slice(from, to)
      .forEach((listMovie) => this._renderMovie(container.getElement(), listMovie));
  }

  _renderMovieList(component, countMovies) {
    render(this._moviesContainer, component, RenderPosition.BEFOREEND);
    this._renderMovies(0, Math.min(this._listMovies.length, countMovies), component);

    if (this._listMovies.length > countMovies && countMovies > MOVIES_EXTRA_COUNT) {
      this._renderShowMoreButton();
    }
  }

  _handleShowMoreButtonClick() {
    this._renderMovies(this._renderedMoviesCount, this._renderedMoviesCount + MOVIES_COUNT_PER_STEP, this._mainMoviesListComponent);
    this._renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (this._renderedMoviesCount >= this._listMovies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._mainMoviesListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderMoviesList() {
    if (this._listMovies.length === 0) {
      render(this._moviesContainer, this._emptyMoviesListComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._renderMovieList(this._mainMoviesListComponent, MOVIES_COUNT_PER_STEP);
    this._renderMovieList(this._topRatedMoviesListComponent, MOVIES_EXTRA_COUNT);
    this._renderMovieList(this._mostCommentedMoviesListComponent, MOVIES_EXTRA_COUNT);
  }
}
