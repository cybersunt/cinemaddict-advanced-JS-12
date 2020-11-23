import {StatsFilterType, UpdateType} from "../const";
import {remove, render, RenderPosition, replace} from "../utils/render";
import StatsView from "../view/stats";

export const filter = {
    [StatsFilterType.ALL]: (movies) => movies,
    [StatsFilterType.TODAY]: (movies) => movies.filter((movie) => movie.isFavorite),
    [StatsFilterType.WEEK]: (movies) => movies.filter((movie) => movie.isFavorite),
    [StatsFilterType.MONTH]: (movies) => movies.filter((movie) => movie.isFavorite),
    [StatsFilterType.YEAR]: (movies) => movies.filter((movie) => movie.isFavorite)
  }
;

export default class StatsMenuFilter {
  constructor(statsContainer, statsFilterModel, moviesModel) {
    this._statsFilterModel = statsFilterModel;
    this._statsContainer = statsContainer;
    this._moviesModel = moviesModel;

    this._currentFilter = null;
    this._statsMenuFilterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._statsFilterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._statsFilterModel.get();

    const filters = this._getFilters();
    const prevFilterComponent = this._statsMenuFilterComponent;

    this._statsMenuFilterComponent = new StatsView(filters, this._currentFilter, this._moviesModel.getWatchedMovies());
    this._statsMenuFilterComponent.setStatsFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._statsContainer, this._statsMenuFilterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._statsMenuFilterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    this._statsFilterModel.set(UpdateType.STATS, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getWatchedMovies();

    return [
      {
        type: StatsFilterType.ALL,
        name: `All time`,
        films: filter[StatsFilterType.ALL](movies)
      },
      {
        type: StatsFilterType.TODAY,
        name: `Today`,
        films: filter[StatsFilterType.TODAY](movies)
      },
      {
        type: StatsFilterType.WEEK,
        name: `Week`,
        films: filter[StatsFilterType.WEEK](movies)
      },
      {
        type: StatsFilterType.MONTH,
        name: `Month`,
        films: filter[StatsFilterType.MONTH](movies)
      },
      {
        type: StatsFilterType.YEAR,
        name: `Year`,
        films: filter[StatsFilterType.YEAR](movies)
      }
    ];
  }
};
