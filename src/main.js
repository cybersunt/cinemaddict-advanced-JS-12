import {generateMovie} from "./mock/movie.js";
import {render, RenderPosition} from "./utils/render";
import UserInfo from "./view/user-info";
import MovieStatsView from "./view/movie-stats";
import Board from "./presenter/board";
import MoviesModel from "./model/movies";
import FilterModel from "./model/filter";
import StatsFilterModel from "./model/stats";
import Api from "./api";

const MOVIES_COUNT = 22;
const AUTHORIZATION = `Basic dN7htruiDRhz8vm`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const movies = new Array(MOVIES_COUNT).fill(``).map((array, index) => generateMovie(index));
const api = new Api(END_POINT, AUTHORIZATION);

api.getMovies().then((movies) => {
  console.log(movies);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const moviesModel = new MoviesModel();
moviesModel.set(movies);

const filterModel = new FilterModel();
const statsFilterModel = new StatsFilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserInfo(), RenderPosition.BEFOREEND);

const mainInner = new Board(siteMainElement, moviesModel, filterModel, statsFilterModel);
mainInner.init();
render(siteFooterElement, new MovieStatsView(movies), RenderPosition.BEFOREEND);

