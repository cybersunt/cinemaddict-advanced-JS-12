import MoviesView from "../view/movies";
import SortView from "../view/sort";
import SiteMenuView from "../view/site-menu";
import {render, RenderPosition} from "../utils/render";
import MoviesList from "./movies-list";

export default class Board {
  constructor(boardContainer, filters) {
    this._boardContainer = boardContainer;

    this._siteMenuComponent = new SiteMenuView(filters);
    this._sortComponent = new SortView();
    this._moviesComponent = new MoviesView();

  }
  init(listMovies) {
    this._listMovies = listMovies;
    this._renderBoard();
  }

  _renderSiteMenu() {
    render(this._boardContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderMovies() {
    render(this._boardContainer, this._moviesComponent, RenderPosition.BEFOREEND);
  }

  _renderMoviesList() {
    const moviesListPresenter = new MoviesList(this._moviesComponent);
    moviesListPresenter.init(this._listMovies);
  }

  _renderBoard() {
    this._renderSiteMenu();
    if (this._listMovies.length !== 0) {
      this._renderSort();
    }
    this._renderMovies();
    this._renderMoviesList();
  }
}
