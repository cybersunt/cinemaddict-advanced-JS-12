import {remove, render, RenderPosition} from "../utils/render";
import Movie from "./movie";
import ShowMoreButtonView from "../view/show-more-button";
import MainMoviesListView from "../view/main-movies-list";
import ExtraMoviesListView from "../view/extra-movies-list";

const MOVIES_COUNT_PER_STEP = 5;
const MOVIES_EXTRA_COUNT = 2;

export default class MoviesList {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;
    this._renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    this._movieMainPresenter = {};
    this._movieTopRatedPresenter = {};
    this._movieMostCommentedPresenter = {};

    this._showMoreButtonComponent = null;

    this._emptyMoviesListComponent = new MainMoviesListView(`There are no movies in our database`, false, true);
    this._mainMoviesListComponent = new MainMoviesListView(`All movies. Upcoming`, true);
    this._topRatedMoviesListComponent = new ExtraMoviesListView(`Top rated`);
    this._mostCommentedMoviesListComponent = new ExtraMoviesListView(`Most commented`);

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(listMovies, changeData) {
    this._listMovies = listMovies;
    this._changeData = changeData;
    this._renderMainMovieList();
    this._renderExtraMoviesList();
  }

  _updatePresenter(presenter, updatedMovie) {
    if (presenter[updatedMovie.id]) {
      presenter[updatedMovie.id].init(updatedMovie);
    }
  }

  movieChange(updatedMovie) {
    this._updatePresenter(this._movieMainPresenter, updatedMovie);
    this._updatePresenter(this._movieTopRatedPresenter, updatedMovie);
    this._updatePresenter(this._movieMostCommentedPresenter, updatedMovie);
  }

  _handleModeChange() {
    [
      ...Object.values(this._movieMainPresenter),
      ...Object.values(this._movieTopRatedPresenter),
      ...Object.values(this._movieMostCommentedPresenter)
    ].forEach((presenter) => presenter.resetView());
  }

  _renderMovie(movieListElement, movie, presenterStore) {
    const moviePresenter = new Movie(movieListElement, this._changeData, this._handleModeChange);
    moviePresenter.init(movie);
    presenterStore[movie.id] = moviePresenter;
  }

  _renderMovies(movies, container, presenterStore) {
    movies.forEach((movie) => this._renderMovie(container.getElement(), movie, presenterStore));
  }

  _renderMovieList(component, countMovies, presenterStore) {
    const movies = this._listMovies.slice(0, Math.min(this._listMovies.length, countMovies));
    render(this._moviesContainer, component, RenderPosition.BEFOREEND);
    this._renderMovies(movies, component, presenterStore);
  }

  _handleShowMoreButtonClick() {
    const newRenderedMovieCount = Math.min(this._listMovies.length, this._renderedMoviesCount + MOVIES_COUNT_PER_STEP);
    const movies = this._listMovies.slice(this._renderedMoviesCount, newRenderedMovieCount);
    this._renderMovies(movies, this._mainMoviesListComponent, this._movieMainPresenter);
    this._renderedMoviesCount = newRenderedMovieCount;

    if (this._renderedMoviesCount >= this._listMovies.length) {
      remove(this._showMoreButtonComponent);
    }
  }
  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._mainMoviesListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderMainMovieList() {
    if (this._listMovies.length === 0) {
      render(this._moviesContainer, this._emptyMoviesListComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    const movies = this._listMovies.slice(0, Math.min(this._listMovies.length, this._renderedMoviesCount));
    render(this._moviesContainer, this._mainMoviesListComponent, RenderPosition.BEFOREEND);

    this._renderMovies(movies, this._mainMoviesListComponent, this._movieMainPresenter);

    render(this._moviesContainer, this._mainMoviesListComponent, RenderPosition.AFTERBEGIN);
    if (this._listMovies.length > this._renderedMoviesCount) {
      this._renderShowMoreButton();
    }
  }

  _renderExtraMoviesList() {
    this._renderMovieList(this._topRatedMoviesListComponent, MOVIES_EXTRA_COUNT, this._movieTopRatedPresenter);
    this._renderMovieList(this._mostCommentedMoviesListComponent, MOVIES_EXTRA_COUNT, this._movieMostCommentedPresenter);
  }

  _clearMainMovieList(resetRenderedMovieCount = false) {
    Object
      .values(this._movieMainPresenter)
      .forEach((presenter) => presenter.destroy());
    this._movieMainPresenter = {};

    remove(this._emptyMoviesListComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedMovieCount) {
      this._renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    } else {
      this._renderedMoviesCount = Math.min(this._listMovies.length, this._renderedMoviesCount);
    }
  }

  updateMainMovieList(sortMoviesList, resetRenderedMovieCount) {
    this._listMovies = sortMoviesList;
    this._clearMainMovieList(resetRenderedMovieCount);
    this._renderMainMovieList();
  }

  _clearExtraMoviesList() {
    [
      ...Object.values(this._movieTopRatedPresenter),
      ...Object.values(this._movieMostCommentedPresenter)
    ].forEach((presenter) => presenter.destroy());
    this._movieTopRatedPresenter = {};
    this._movieMostCommentedPresenter = {};
  }

  updateExtraMoviesList() {
    this._clearExtraMoviesList();
    this._renderExtraMoviesList();
  }
}
