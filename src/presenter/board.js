import MoviesView from "../view/movies";
import SortView from "../view/sort";
import SiteMenuView from "../view/site-menu";
import {remove, render, RenderPosition} from "../utils/render";
import MoviesList from "./movies-list";
import {SortType, UserAction} from "../const";
import {sortMovieDate, sortMovieRating} from "../utils/movie";
import {UpdateType} from "../../../taskmanager-12/src/const";

export default class Board {
  constructor(boardContainer, filters, moviesModel) {
    this._boardContainer = boardContainer;
    this._moviesModel = moviesModel;

    this._sortComponent = null;

    this._siteMenuComponent = new SiteMenuView(filters);
    this._moviesComponent = new MoviesView();
    this._moviesListPresenter = new MoviesList(this._moviesComponent);
    this._currentSortType = SortType.DEFAULT;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);

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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._moviesModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviesListPresenter.movieChange(data);
        break;
      case UpdateType.MAJOR:
        this._updateBoard();
        this._moviesListPresenter.updateMainMovieList(this._getMovies(), {resetRenderedMovieCount: true});
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._updateBoard({resetSortType: true});
    this._moviesListPresenter.updateMainMovieList(this._getMovies(), {resetRenderedMovieCount: true});
  }

  _renderSiteMenu() {
    render(this._boardContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView();
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderMovies() {
    render(this._boardContainer, this._moviesComponent, RenderPosition.BEFOREEND);
  }

  _renderMoviesList() {
    this._moviesListPresenter.init(this._getMovies().slice(), this._handleViewAction);
  }

  _updateBoard({resetSortType = false} = {}) {
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
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
