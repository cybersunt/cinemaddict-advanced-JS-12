import MoviesView from "../view/movies";
import SortView from "../view/sort";
import {render, RenderPosition} from "../utils/render";
import MoviesList from "./movies-list";
import {SortType, UpdateType, UserAction} from "../const";
import {sortMovieDate, sortMovieRating} from "../utils/movie";
import SiteMenuFilter, {filter} from "./site-menu-filter";

export default class Board {
  constructor(boardContainer, moviesModel, filterModel) {
    this._boardContainer = boardContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._currentSortType = `all`;

    this._sortComponent = null;

    this._filterPresenter = new SiteMenuFilter(this._boardContainer, this._filterModel, this._moviesModel);

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
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filtredMovies = filter[filterType](movies);
    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredMovies.sort(sortMovieDate);
      case SortType.RATING:
        return filtredMovies.sort(sortMovieRating);
    }
    return filtredMovies;
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
        this._moviesListPresenter.updateMainMovieList(this._getMovies(), true);
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
    this._filterPresenter.init();
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

  _renderBoard() {
    this._renderSiteMenu();
    if (this._getMovies().length !== 0) {
      this._renderSort();
    }
    this._renderMovies();
    this._renderMoviesList();
  }
}
