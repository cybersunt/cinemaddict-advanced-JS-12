import MoviesView from "../view/movies";
import SortView from "../view/sort";
import SiteMenuView from "../view/site-menu";
import {render, RenderPosition} from "../utils/render";
import MoviesList from "./movies-list";
import {SortType} from "../const";
import {sortMovieDate, sortMovieRating} from "../utils/movie";
import {updateItem} from "../utils/common";

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
  init(listMovies) {
    this._listMovies = listMovies.slice();
    this._sourcedListMovies = listMovies.slice();
    this._renderBoard();
  }

  _getMovies() {
    return this._moviesModel.getMovies();
  }

  _handleMovieChange(updatedMovie) {
    this._listMovies = updateItem(this._listMovies, updatedMovie);
    this._sourcedListMovies = updateItem(this._sourcedListMovies, updatedMovie);
    this._moviesListPresenter.movieChange(updatedMovie);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortMovies(sortType);
    this._moviesListPresenter.updateMainMovieList(this._listMovies);
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._listMovies.sort(sortMovieDate);
        break;
      case SortType.RATING:
        this._listMovies.sort(sortMovieRating);
        break;
      default:
        this._listMovies = this._sourcedListMovies.slice();
    }
    this._currentSortType = sortType;
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
    this._moviesListPresenter.init(this._listMovies, this._handleMovieChange);
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
