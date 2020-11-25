import {
  ACTORS,
  COUNTRIES,
  DIRECTORS,
  TITLES,
  POSTERS,
  WRITERS,
  DESCRIPTIONS,
  GENRES,
  EMOJI,
  movieDetailsData
} from "../const";
import {getRandomArbitrary, getRandomFractionalNumber, getRandomInteger} from "../utils/common";
import {getArrayRandomLength, getBooleanValue, getRandomElement} from "../utils/movie";
import {nanoid} from 'nanoid';

const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRandomDate = (start, end) => {
  let date1 = start || `01-01-1970`;
  let date2 = end || new Date().toLocaleDateString();

  return new Date(
      new Date(date1).getTime() > new Date(date2).getTime()
        ? getRandomArbitrary(new Date(date2).getTime(), new Date(date1).getTime())
        : getRandomArbitrary(new Date(date1).getTime(), new Date(date2).getTime())
  );
};

const generateComments = () => {
  const messages = [];

  const countComments = getRandomInteger(movieDetailsData.COMMENTS_COUNT_MIN, movieDetailsData.COMMENTS_COUNT_MAX);

  for (let i = 0; i < countComments; i++) {
    messages.push({
      id: nanoid(),
      emoji: getRandomElement(EMOJI),
      author: getRandomElement(ACTORS),
      message: getRandomElement(DESCRIPTIONS),
      date: generateDate()
    });
  }

  return messages;
};

export const generateMovie = (idx) => {
  const title = getRandomElement(TITLES);
  const poster = getRandomElement(POSTERS);

  return {
    id: idx,
    poster,
    fullPoster: poster,
    title,
    originalTitle: title,
    description: getArrayRandomLength(movieDetailsData.DESCRIPTION_MIN_LENGTH, movieDetailsData.DESCRIPTION_MAX_LENGTH, DESCRIPTIONS),
    releaseDate: generateRandomDate(movieDetailsData.RELEASE_DATE_START, movieDetailsData.RELEASE_DATE_END),
    director: getRandomElement(DIRECTORS),
    writers: getRandomElement(WRITERS),
    actors: getArrayRandomLength(movieDetailsData.ACTORS_MIN, ACTORS.length, ACTORS),
    runtime: getRandomInteger(movieDetailsData.RUNTIME_MIN, movieDetailsData.RUNTIME_MAX),
    country: getRandomElement(COUNTRIES),
    genres: getArrayRandomLength(movieDetailsData.GENRES_MIN, movieDetailsData.GENRES_MAX, GENRES),
    rating: getRandomFractionalNumber(movieDetailsData.RATING_MIN, movieDetailsData.RATING_MAX),
    ageLimitations: getRandomInteger(movieDetailsData.AGE_LIMITATIONS_MIN, movieDetailsData.AGE_LIMITATIONS_MAX),
    comments: generateComments(),
    isWatchlist: getBooleanValue(),
    isHistory: getBooleanValue(),
    isFavorite: getBooleanValue(),
    watchingDate: generateRandomDate(movieDetailsData.WATCHING_DATE_START, movieDetailsData.WATCHING_DATE_END)
  };
};
