import Smart from "./smart";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  getCountMoviesOfPopularGenres,
  getPopularGenre, getRuntimeInHours,
  getStatisticsGenre,
  getTotalDuration
} from "../utils/movie";

const renderChart = (statisticsCtx, movies) => {

  const popularGenres = getPopularGenre(movies);

  const countWatchedGenres = getCountMoviesOfPopularGenres(movies);

  return new Chart(statisticsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: popularGenres,
      datasets: [{
        data: countWatchedGenres,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: 'start',
          align: 'start',
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createTotalDurationTemplate = (runtime) => {
  const [hours, minutes] = getRuntimeInHours(runtime);

  return (
    `<p class="statistic__item-text"> ${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>`
  );
};

const createStatsFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name} = filter;

  return (
    `<input
      type="radio"
      class="statistic__filters-input visually-hidden"
      name="statistic-filter"
      id="statistic-${type}"
      ${type === currentFilterType ? `checked` : ``}
      value="${type}">
    <label for="statistic-${type}" class="statistic__filters-label">${name}</label>`
  );
};

const createStatsFilterTemplate = (filterItems, currentFilterType) => {
  const statsFilterItemsTemplate = filterItems
    .map((filter) => createStatsFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${statsFilterItemsTemplate}
    </form>`
  );
};

const createStatsTemplate = (filters, currentFilterType, movies) => {

  const totalDurationWatchedMovies = getTotalDuration(movies);

  const mostPopularGenre = () => Object.keys(getStatisticsGenre(movies)[0]);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    ${createStatsFilterTemplate(filters, currentFilterType)}

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${movies.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        ${createTotalDurationTemplate(totalDurationWatchedMovies)}
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${mostPopularGenre()}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class StatsView extends Smart {
  constructor(filters, currentFilterType, movies) {
    super();
    this._movies = movies;
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._moviesCart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatsTemplate(this._filters,  this._currentFilter, this._movies);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._statisticCtx !== null) {
      this._statisticCtx = null;
    }

    const statisticsCtx = this.getElement().querySelector(`.statistic__chart`);

    this._moviesCart = renderChart(statisticsCtx, this._movies);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setStatsFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
