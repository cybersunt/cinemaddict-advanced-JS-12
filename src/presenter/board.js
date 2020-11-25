import MoviesView from "../view/movies";
import SortView from "../view/sort";
import {remove, render, RenderPosition} from "../utils/render";
import MoviesList from "./movies-list";
import {SortType, UpdateType, UserAction} from "../const";
import {sortMovieDate, sortMovieRating} from "../utils/movie";
import SiteMenuFilter, {filter} from "./site-menu-filter";
import StatsMenuFilter from "./stats-menu-filter";

export default class Board {
  constructor(boardContainer, moviesModel, filterModel, statsFilterModel) {
    this._boardContainer = boardContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._statsFilterModel = statsFilterModel;

    this._sortComponent = null;
    this._statsComponent = null;

    this._showStats = this._showStats.bind(this);

    this._siteMenuFilterPresenter = new SiteMenuFilter(this._boardContainer, this._filterModel, this._moviesModel, this._showStats);
    this._statsPresenter = new StatsMenuFilter(this._boardContainer, this._statsFilterModel, this._moviesModel);
    this._moviesComponent = new MoviesView();
    this._moviesListPresenter = new MoviesList(this._moviesComponent);
    this._currentSortType = SortType.DEFAULT;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }
  init() {
    this._renderBoard();
  }

  _getMovies() {
    const filterType = this._filterModel.get();
    const movies = this._moviesModel.get().slice();
    const filteredMovies = filter[filterType](movies);
    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortMovieDate);
      case SortType.RATING:
        return filteredMovies.sort(sortMovieRating);
    }
    return filteredMovies;
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
        this._clearBoard();
        this._updateBoard();
        break;
      case UpdateType.STATS:
        this._clearStats();
        this._renderStats();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._moviesListPresenter.updateMainMovieList(this._getMovies(), true);
  }

  _renderSiteMenu() {
    this._siteMenuFilterPresenter.init();
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

  _renderStats() {
    this._statsPresenter.init();
  }

  _clearBoard() {
    remove(this._sortComponent);
    remove(this._moviesComponent);
  }

  _renderBoard() {
    this._renderSiteMenu();
    if (this._getMovies().length !== 0) {
      this._renderSort();
    }
    this._renderMovies();
    this._renderMoviesList();
  }

  _updateBoard() {
    if (this._statsComponent !== null) {
      remove(this._statsComponent);
    }

    if (this._getMovies().length !== 0) {
      this._renderSort();
    }
    this._renderMovies();
    this._moviesListPresenter.updateMainMovieList(this._getMovies(), true);
    this._moviesListPresenter.updateExtraMoviesList();
  }

  _clearStats() {
    if (this._statsComponent !== null) {
      remove(this._statsComponent);
    }
  }

  _showStats() {
    this._clearBoard();
    this._renderStats();
  }
}

