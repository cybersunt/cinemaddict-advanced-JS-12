import {generateMovie} from "./mock/movie.js";
import {render, RenderPosition} from "./utils/render";
import UserInfoView from "./view/user-info";
import MovieStatsView from "./view/movie-stats";
import Board from "./presenter/board";
import MoviesModel from "./model/movies";
import FilterModel from "./model/filter";

const MOVIES_COUNT = 22;

export const movies = new Array(MOVIES_COUNT).fill(``).map((array, index) => generateMovie(index));

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserInfoView(), RenderPosition.BEFOREEND);

const mainInner = new Board(siteMainElement, moviesModel, filterModel);
mainInner.init();
render(siteFooterElement, new MovieStatsView(movies), RenderPosition.BEFOREEND);

