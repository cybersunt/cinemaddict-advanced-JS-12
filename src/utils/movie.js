import {getRandomInteger} from "./common";
import moment from "moment";
import {ONE_HOUR} from "../const";

export const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const getArrayRandomLength = (min, max, array) => array.slice(0, (getRandomInteger(min, max)) - array.length);

export const getBooleanValue = () => Boolean(getRandomInteger(0, 1));

export const getStringFromArray = (array, sign) => array.join(`${sign} `).toString();

export const getСapitalizedString = (str) => str.replace(/(^|\s)\S/g, (a) =>a.toUpperCase());

export const getPictureUrl = (dir, picture) => `./images/${dir}/${picture}`;

export const getRuntimeInHours = (runtime) => {
  const hours = Math.floor(runtime / ONE_HOUR);
  const minutes = runtime % ONE_HOUR;

  return [hours, minutes];
};

export const getReleaseDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`D MMMM YYYY`);
};

export const getCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`YYYY/MM/D h:mm`);
};

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortMovieDate = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA.releaseDate, movieB.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return movieB.releaseDate.getTime() - movieA.releaseDate.getTime();
};

export const sortMovieRating = (movieA, movieB) => movieB.rating - movieA.rating;

export const getTotalDuration = (movies) => {
  if (movies.length === 0) {
    return 0;
  }
  const moviesDurationList = movies.map((element) => element.runtime);
  return moviesDurationList.reduce((a, b) => a + b);
};

export const getStatisticsGenre = (movies) => {
  if (movies.length === 0) {
    return 0;
  }

  const genresList = movies.map((element) => element.genres).flat();

  const resultReduce = genresList.reduce(function (accumulator, currentValue) {
    if (!accumulator.hash[currentValue]) {
      accumulator.hash[currentValue] = {[currentValue]: 1};
      accumulator.map.set(accumulator.hash[currentValue], 1);
      accumulator.result.push(accumulator.hash[currentValue]);
    } else {
      accumulator.hash[currentValue][currentValue] += 1;
      accumulator.map.set(accumulator.hash[currentValue], accumulator.hash[currentValue][currentValue]);
    }

    return accumulator;
  }, {
    hash: {},
    map: new Map(),
    result: []
  });


  const result = resultReduce.result.sort(function (a, b) {
    return resultReduce.map.get(b) - resultReduce.map.get(a);
  });

  return result;
};

export const getPopularGenre = (watchedMovies) => {
  return getStatisticsGenre(watchedMovies).map((element) => Object.keys(element)).flat();
};

export const getCountMoviesOfPopularGenres = (watchedMovies) => {
  return getStatisticsGenre(watchedMovies).map((element) => Object.values(element)).flat();
};

export const getFilteredMovies = (filters, currentFilterType) => filters.find((filter) => filter.type === currentFilterType);
