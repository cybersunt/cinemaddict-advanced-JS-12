import {render, RenderPosition} from "./utils/render";
import UserInfo from "./view/user-info";
import Board from "./presenter/board";
import MoviesModel from "./model/movies";
import FilterModel from "./model/filter";
import StatsFilterModel from "./model/stats";
import Api from "./api";

const AUTHORIZATION = `Basic bhz44vq5a0nzh4j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

export const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const statsFilterModel = new StatsFilterModel();

render(siteHeaderElement, new UserInfo(), RenderPosition.BEFOREEND);

const mainInner = new Board(siteMainElement, moviesModel, filterModel, statsFilterModel, api);
mainInner.init();

api.getMovies().then((movies) => {
  moviesModel.set(movies);
});
