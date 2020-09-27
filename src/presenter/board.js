import MoviesView from "../view/movies";
import SortView from "../view/sort";
import SiteMenuView from "../view/site-menu";
import {render, RenderPosition} from "../utils/render";
import MoviesList from "./movies-list";
import {SortType} from "../const";
import {sortMovieDate, sortMovieRating} from "../utils/movie";

export default class Board {
  constructor(boardContainer, filters, moviesModel) {
    this._boardContainer = boardContainer;
    this._moviesModel = moviesModel;

    this._siteMenuComponent = new SiteMenuView(filters);
    this._sortComponent = new SortView();
    this._moviesComponent = new MoviesView();
    this._moviesListPresenter = new MoviesList(this._moviesComponent);
    this._currentSortType = SortType.DEFAULT;

    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }
  init() {
    this._renderBoard();
  }

  _getMovies() {
    switch (this._currentSortType) {
      case SortType.DATE:
        this._moviesModel.getMovies().slice().sort(sortMovieDate);
        break;
      case SortType.RATING:
        this._moviesModel.getMovies().slice().sort(sortMovieRating);
        break;
    }
    return this._moviesModel.getMovies();
  }

  _handleMovieChange(updatedMovie) {
    this._moviesListPresenter.movieChange(updatedMovie);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._moviesListPresenter.updateMainMovieList(this._getMovies());
  }

  _renderSiteMenu() {
    render(this._boardContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderMovies() {
    render(this._boardContainer, this._moviesComponent, RenderPosition.BEFOREEND);
  }

  _renderMoviesList() {
    this._moviesListPresenter.init(this._getMovies().slice(), this._handleMovieChange);
  }

  _renderBoard() {
    this._renderSiteMenu();
    if (this._getMovies().length !== 0) {
      this._renderSort();
    }
    this._renderMovies();
    this._renderMoviesList();
  }
}
