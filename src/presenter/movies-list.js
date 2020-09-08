import MoviesListView from "../view/movies-list";
import {render, RenderPosition} from "../utils/render";

export default class MoviesList {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;

    this._emptyMoviesListComponent = new MoviesListView(0, `There are no movies in our database`, false, true);
    this._mainMoviesListComponent = new MoviesListView(0, `All movies. Upcoming`, true);
    this._mostCommentedMoviesListComponent = new MoviesListView(2, `Most commented`);
    this._topRatedMoviesListComponent = new MoviesListView(1, `Top rated`);
  }

  init(listMovies) {
    this._listMovies = listMovies;
    this._renderMoviesList();
  }

  _renderEmptyMovieList() {
    if (this._listMovies.length === 0) {
      render(this._moviesContainer, this._emptyMoviesListComponent, RenderPosition.BEFOREEND);
      return;
    }
  }

  _renderMainMovieList() {
    render(this._moviesContainer, this._mainMoviesListComponent, RenderPosition.BEFOREEND);
  }

  _renderTopRatedMovieList() {
    render(this._moviesContainer, this._topRatedMoviesListComponent, RenderPosition.BEFOREEND);
  }

  _renderMostCommentedMovieList() {
    render(this._moviesContainer, this._mostCommentedMoviesListComponent, RenderPosition.BEFOREEND);
  }

  _renderMoviesList() {
    this._renderEmptyMovieList();
    this._renderMainMovieList();
    this._renderTopRatedMovieList();
    this._renderMostCommentedMovieList();
  }
}
