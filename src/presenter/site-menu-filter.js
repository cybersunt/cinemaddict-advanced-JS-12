import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {FilterType, UpdateType} from "../const.js";
import SiteMenuView from "../view/site-menu";

export const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.isFavorite),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.isHistory),
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => !movie.isHistory && movie.isWatchlist)
};

export default class SiteMenuFilter {
  constructor(filterContainer, filterModel, moviesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._currentFilter = null;

    this._siteMenuFilterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.get();

    const filters = this._getFilters();
    const prevFilterComponent = this._siteMenuFilterComponent;

    this._siteMenuFilterComponent = new SiteMenuView(filters, this._currentFilter);
    this._siteMenuFilterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._siteMenuFilterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._siteMenuFilterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.get();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: filter[FilterType.ALL](movies).length,
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](movies).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](movies).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](movies).length
      }
    ];
  }
}
