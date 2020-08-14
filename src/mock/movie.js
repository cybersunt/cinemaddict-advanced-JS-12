import {getArrayRandomLength, getRandom, getRandomElement, getRandomInteger} from "../utils";
import {ACTORS, COUNTRIES, DIRECTORS, TITLES, POSTERS, WRITERS, DESCRIPTIONS, GENRES, EMOJI} from "../const";

const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateComments = () => {
  const messages = [];

  const countComments = getRandomInteger(1, 5);

  for (let i = 0; i < countComments; i++) {
    messages.push({
      emoji: `/public/images/emoji/${getRandomElement(EMOJI)}.png`,
      author: getRandomElement(ACTORS),
      message: getArrayRandomLength(1, 3, DESCRIPTIONS).toString(),
      date: generateDate()
    });
  }

  return messages;
};

export const generateMovie = () => {

  const rating = getRandom(1, 10).toPrecision(2);
  const title = getRandomElement(TITLES);
  const poster = `/images/posters/${getRandomElement(POSTERS)}`;
  const description = getArrayRandomLength(1, 5, DESCRIPTIONS).join('. ').toString();

  return {
    poster,
    fullPoster: poster,
    title,
    originalTitle: title,
    description,
    releaseDate: getRandomInteger(1895, 2020),
    director: getRandomElement(DIRECTORS),
    writers: getRandomElement(WRITERS),
    actors: getArrayRandomLength(3, ACTORS.length, ACTORS),
    runtime: getRandomInteger(90, 180),
    country: getRandomElement(COUNTRIES),
    genres: getArrayRandomLength(1, 4, GENRES),
    rating,
    ageLimitations: getRandomInteger(0, 18),
    comments: generateComments()
  };
};
