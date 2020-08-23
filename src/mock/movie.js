import {getArrayRandomLength, getRandom, getRandomArbitrary, getRandomElement, getRandomInteger} from "../utils";
import {ACTORS, COUNTRIES, DIRECTORS, TITLES, POSTERS, WRITERS, DESCRIPTIONS, GENRES, EMOJI} from "../const";

const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRandomDate = (start, end) => {
  let date1 = start || '01-01-1970';
  let date2 = end || new Date().toLocaleDateString();

  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();

  if ( date1 > date2 ) {
    return new Date(getRandomArbitrary(date2,date1));
  } else {
    return new Date(getRandomArbitrary(date1, date2));
  }
};

const generateComments = () => {
  const messages = [];

  const countComments = getRandomInteger(1, 5);

  for (let i = 0; i < countComments; i++) {
    messages.push({
      emoji: `./images/emoji/${getRandomElement(EMOJI)}.png`,
      author: getRandomElement(ACTORS),
      message: getArrayRandomLength(1, 3, DESCRIPTIONS).toString(),
      date: generateDate()
    });
  }

  return messages;
};

export const generateMovie = (idx) => {
  const rating = getRandom(1, 10).toPrecision(2);
  const title = getRandomElement(TITLES);
  const poster = `/images/posters/${getRandomElement(POSTERS)}`;
  const description = getArrayRandomLength(1, 5, DESCRIPTIONS).join('. ').toString();
  const actors = getArrayRandomLength(3, ACTORS.length, ACTORS).join(', ').toString();

  return {
    id: idx,
    poster,
    fullPoster: poster,
    title,
    originalTitle: title,
    description,
    releaseDate: generateRandomDate('02/13/2013', '01/01/2000'),
    director: getRandomElement(DIRECTORS),
    writers: getRandomElement(WRITERS),
    actors,
    runtime: getRandomInteger(90, 180),
    country: getRandomElement(COUNTRIES),
    genres: getArrayRandomLength(1, 4, GENRES),
    rating,
    ageLimitations: getRandomInteger(0, 18),
    comments: generateComments()
  };
};
