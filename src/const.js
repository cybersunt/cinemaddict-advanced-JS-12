export const ONE_HOUR = 60;

export const FilterType = {
  ALL: `all`,
  FAVORITES: `favorites`,
  HISTORY: `history`,
  WATCHLIST: `watchlist`
};

export const StatsFilterType = {
  ALL: `all-movies`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const UserAction = {
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  UPDATE_MOVIE: `UPDATE_MOVIE`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MAJOR: `MAJOR`,
  STATS: `STATS`
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const movieDetailsData = {
  RATING_MIN: 1,
  RATING_MAX: 10,
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 5,
  ACTORS_MIN: 3,
  RELEASE_DATE_START: `01/01/1970`,
  RELEASE_DATE_END: `10/01/2020`,
  WATCHING_DATE_START: `10/01/2020`,
  WATCHING_DATE_END: `10/31/2020`,
  RUNTIME_MIN: 90,
  RUNTIME_MAX: 180,
  GENRES_MIN: 1,
  GENRES_MAX: 4,
  AGE_LIMITATIONS_MIN: 0,
  AGE_LIMITATIONS_MAX: 18,
  COMMENTS_COUNT_MIN: 1,
  COMMENTS_COUNT_MAX: 5,
  MESSAGE_MIN_LENGTH: 1,
  MESSAGE_MAX_LENGTH: 3
};

export const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

export const TITLES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Man with the Golden Arm`,
  `The Great Flamarion`,
  `Santa Claus Conquers the Martians`,
  `Made for Each Other`
];

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`,
  `Sed sed nisi sed augue convallis suscipit in sed felis`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus`,
  `In rutrum ac purus sit amet tempus`
];

export const GENRES = [
  `Action`,
  `Comedy`,
  `Sci-fi`,
  `Drama`,
  `Horror`,
  `Adventure`,
  `Musical`,
  `Disaster`,
  `Family`,
  `Thriller`,
  `Detective`
];

export const COUNTRIES = [
  `France`,
  `Italy`,
  `Poland`,
  `Germany`,
  `Belgium`,
  `UK`,
  `India`,
  `Japan`,
  `Canada`,
  `Brazil`,
  `USA`
];

export const DIRECTORS = [
  `David Lynch`,
  `Martin Scorsese`,
  `Joel and Ethan Coen`,
  `Woody Allen`,
  `Quentin Tarantino`,
  `Lars von Trier`,
  `David Fincher`,
  `Tim Burton`,
  `James Cameron`,
  `Steven Spielberg`,
  `George Lucas`
];

export const WRITERS = [
  `Francis Ford Coppola`,
  `John Huston`,
  `Christopher Nolan`,
  `David Cronenberg`,
  `Quentin Tarantino`,
  `Joel & Ethan Coen`,
  `Paul Thomas Anderson`,
  `Stanley Kubrick`,
  `Woody Allen`,
  `Ingmar Bergman`
];

export const ACTORS = [
  `Johny Depp`,
  `Anne Hathaway`,
  `Tom Hanks`,
  `Natalie Portman`,
  `Robert Downey Jr.`,
  `Angelina Jolie`,
  `Samuel L. Jackson`,
  `Meryl Streep`,
  `Tom Cruise`,
  `Emma Stone`,
  `Leonardo DiCaprio`,
  `Sandra Bullock`,
  `Will Smith`,
  `Julia Roberts`,
  `Brad Pitt`,
  `Kate Winslet`,
  `Hugh Jackman`,
  `Emily Blunt`,
  `Jackie Chan`,
  `Penélope Cruz`,
  `Bruce Willis`,
  `Nicole Kidman`
];

export const EMOJI = [`angry`, `puke`, `sleeping`, `smile`];
