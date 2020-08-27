import {getPictureUrl, getRuntimeInHours, getStringFromArray} from "../utils";

export const createMovieCardDetailsTemplate = (movie)=> {

  const {
    poster,
    title,
    originalTitle,
    description,
    releaseDate,
    director,
    writers,
    actors,
    runtime,
    country,
    genres,
    rating,
    ageLimitations,
    comments,
    movieStatus
  } = movie;

  const getReleaseDate = (date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString(`en-US`, {month: `long`});
    const day = date.getDay();

    return `${day} ${month} ${year}`;
  };

  const getCommentDate = (date) => {
    const currentDate = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const time = date.toLocaleTimeString([], {hour: `2-digit`, minute: `2-digit`}).replace(`PM`, ``);

    if (date < currentDate) {
      const countYearsAgo = `${year - currentDate.getFullYear()} years`.replace(`0 years`, ``);
      const countMonthsAgo = `${month - currentDate.getMonth()} months`.replace(`0 months`, ``);
      const countDaysAgo = `${day - currentDate.getDay()} days`.replace(`0 days`, ``);

      return `${countYearsAgo} ${countMonthsAgo} ${countDaysAgo} ago`;
    }

    if (date === currentDate) {
      return `${year}/${day}/${month} ${time}`;
    }

    return null;
  };

  const createMovieCardDetailsInfoHeadTemplate = () => {

    return (
      `<div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${title}</h3>
          <p class="film-details__title-original">${originalTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${rating.toPrecision(2)}</p>
        </div>
      </div>`
    );
  };

  const createMovieCardDetailsTableRowTemplate = (term, value) => {
    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${value}</td>
      </tr>`
    );
  };

  const createMovieCardDetailsGenresTemplate = () => {
    return genres.map((genre) =>
      `<span class="film-details__genre">${genre}</span>`
    ).join(``);
  };

  const detailsData = [
    [`Director`, director],
    [`Writers`, writers],
    [`Actors`, getStringFromArray(actors, `,`)],
    [`Release Date`, getReleaseDate(releaseDate)],
    [`Runtime`, getRuntimeInHours(runtime)],
    [`Country`, country],
    [`Genres`, createMovieCardDetailsGenresTemplate()]
  ];

  const createMovieCardDetailsTableTemplate = () => {
    const content = detailsData
      .map(([name, value]) => createMovieCardDetailsTableRowTemplate(name, value))
      .join(``);
    return (
      `<table class="film-details__table">
        ${content}
      </table>`
    );
  };

  const createMovieCardDetailsCommentsListTemplate = () => {
    return comments.map((comment) =>
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
        
          <img src="${getPictureUrl(`emoji`, comment.emoji)}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${getCommentDate(comment.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    ).join(``);
  };

  const createMovieCardDetailsCommentsTemplate = () => {
    return (
      `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${createMovieCardDetailsCommentsListTemplate()}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>`
    );
  };

  const movieStatusControls = [
    [`watchlist`, `Add to watchlist`],
    [`watched`, `Already watched`],
    [`favorite`, `Add to favorites`],
  ];

   const createMovieCardControlTemplate = (status, label) => {
    return (
      `<input 
        type="checkbox" 
        class="film-details__control-input visually-hidden" 
        id="${status}" 
        name="${status}"
      >
      <label for="${status}" class="film-details__control-label film-details__control-label--${status}">${label}</label>`
    );
  };

  const createMovieCardControlsTemplate = () => {
    const content = movieStatusControls
      .map(([status, label]) => createMovieCardControlTemplate(status, label))
      .join(``);
    return (
      `<section class="film-details__controls">
        ${content}
      </section>`
    );
  };


  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${getPictureUrl(`posters`, poster)}" alt="">

          <p class="film-details__age">${ageLimitations}+</p>
        </div>
        <div class="film-details__info">

          ${createMovieCardDetailsInfoHeadTemplate()}

          ${createMovieCardDetailsTableTemplate()}

          <p class="film-details__film-description">${getStringFromArray(description, `.`)}</p>
        </div>
      </div>

      ${createMovieCardControlsTemplate()}
    </div>

    <div class="form-details__bottom-container">
      ${createMovieCardDetailsCommentsTemplate()}
    </div>
  </form>
</section>`
  );
};
