import MoviesView from "../view/movies";
import SortView from "../view/sort";
import SiteMenuView from "../view/site-menu";
import {render, RenderPosition} from "../utils/render";
import MoviesList from "./movies-list";
import {SortType} from "../const";

export default class Board {
  constructor(boardContainer, filters) {
    this._boardContainer = boardContainer;

    this._siteMenuComponent = new SiteMenuView(filters);
    this._sortComponent = new SortView();
    this._moviesComponent = new MoviesView();
    this._currentSortType = SortType.DEFAULT;

  }
  init(listMovies) {
    this._listMovies = listMovies.slice();
    this._renderBoard();
    this._sourcedListMovies = listMovies.slice();
  }

  handleSortTypeChange(sortType) {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
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
