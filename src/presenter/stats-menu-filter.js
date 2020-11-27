import {StatsFilterType, UpdateType} from "../const";
import {remove, render, RenderPosition, replace} from "../utils/render";
import StatsView from "../view/stats";

const timeRange = {
  TODAY: Number(new Date(`October 31, 2020`)),
  WEEK: Number(new Date(`October 31, 2020`)) - 604800000,
  MONTH: new Date(`October 31, 2020`).setMonth(new Date(`October 31, 2020`).getMonth() - 1),
  YEAR: new Date(`October 31, 2020`).setFullYear(new Date(`October 31, 2020`).getFullYear() - 1),
};

export const filter = {
  [StatsFilterType.ALL]: (movies) => movies,
  [StatsFilterType.TODAY]: (movies) => movies.filter((movie) => Number(movie.watchingDate) >= timeRange.TODAY),
  [StatsFilterType.WEEK]: (movies) => movies.filter((movie) => Number(movie.watchingDate) > timeRange.WEEK),
  [StatsFilterType.MONTH]: (movies) => movies.filter((movie) => Number(movie.watchingDate) > timeRange.MONTH),
  [StatsFilterType.YEAR]: (movies) => movies.filter((movie) => Number(movie.watchingDate) > timeRange.YEAR)
};

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

    if (this._statsMenuFilterComponent !== null) {
      this._statsMenuFilterComponent = null;
    }

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

  destroy() {
    if (this._statsMenuFilterComponent !== null) {
      remove(this._statsMenuFilterComponent);
    }
  }

  _handleModelEvent() {
    this.destroy();
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    this._statsFilterModel.set(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getWatchedMovies();

    return [
      {
        type: StatsFilterType.ALL,
        name: `All time`,
        movies: filter[StatsFilterType.ALL](movies)
      },
      {
        type: StatsFilterType.TODAY,
        name: `Today`,
        movies: filter[StatsFilterType.TODAY](movies)
      },
      {
        type: StatsFilterType.WEEK,
        name: `Week`,
        movies: filter[StatsFilterType.WEEK](movies)
      },
      {
        type: StatsFilterType.MONTH,
        name: `Month`,
        movies: filter[StatsFilterType.MONTH](movies)
      },
      {
        type: StatsFilterType.YEAR,
        name: `Year`,
        movies: filter[StatsFilterType.YEAR](movies)
      }
    ];
  }
}
