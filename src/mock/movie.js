import {getArrayRandomLength, getRandom, getRandomElement, getRandomInteger} from "../utils";
import {ACTORS, COUNTRIES, DIRECTORS, TITLES, POSTERS, WRITERS, DESCRIPTIONS, GENRES} from "../const";

export const generateMovie = () => {

  const rating = getRandom(1, 10).toPrecision(2);
  const title = getRandomElement(TITLES);
  const poster = `/public/images/posters/${getRandomElement(POSTERS)}`;
  const description = getArrayRandomLength(1, 5, DESCRIPTIONS).toString();
  const genres = getArrayRandomLength(1, 4, GENRES).join(', ').toString();

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
    genres,
    rating,
    ageLimitations: getRandomInteger(0, 18),
    comments: [
      {
        emoji: '/public/images/posters/' + ' Название картинки',
        message: 'Текст сообщения',
        author: 'Имя автора',
        date: '2 дня назад'
      }
    ],
  };
};
