import {getRandomInteger} from "./common";
import moment from "moment";

export const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

export const getArrayRandomLength = (min, max, array) => array.slice(0, (getRandomInteger(min, max)) - array.length);

export const getBooleanValue = () => Boolean(getRandomInteger(0, 1));

export const getStringFromArray = (array, sign) => array.join(`${sign} `).toString();

export const getСapitalizedString = (str) => str.replace(/(^|\s)\S/g, (a) =>a.toUpperCase());

export const getPictureUrl = (dir, picture) => `./images/${dir}/${picture}`;

export const getRuntimeInHours = (runtime) => {
  return moment.duration(runtime).humanize({precision: 2});
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
