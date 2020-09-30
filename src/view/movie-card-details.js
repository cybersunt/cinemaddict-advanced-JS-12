import {EMOJI} from "../const";
import {getCommentDate, getPictureUrl, getReleaseDate, getRuntimeInHours, getStringFromArray} from "../utils/movie";
import Smart from "./smart";
import he from "he";

const createMovieCardDetailsInfoHeadTemplate = ({title, originalTitle, rating}) => {

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

const createMovieCardDetailsGenresTemplate = ({genres}) => {
  return genres.map((genre) =>
    `<span class="film-details__genre">${genre}</span>`
  ).join(``);
};

const createMovieCardDetailsTableTemplate = (movie) => {
  const {
    releaseDate,
    director,
    writers,
    actors,
    runtime,
    country
  } = movie;

  const detailsData = [
    [`Director`, director],
    [`Writers`, writers],
    [`Actors`, getStringFromArray(actors, `,`)],
    [`Release Date`, getReleaseDate(releaseDate)],
    [`Runtime`, getRuntimeInHours(runtime)],
    [`Country`, country],
    [`Genres`, createMovieCardDetailsGenresTemplate(movie)]
  ];

  const content = detailsData
    .map(([name, value]) => createMovieCardDetailsTableRowTemplate(name, value))
    .join(``);
  return (
    `<table class="film-details__table">
        ${content}
      </table>`
  );
};

const createMovieCardDetailsCommentsListTemplate = (comments) => {
  const content = comments.map((comment) =>
    `<li class="film-details__comment" data-id="${comment.id}">
        <span class="film-details__comment-emoji">

          <img src="${getPictureUrl(`emoji`, comment.emoji)}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment.message)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${getCommentDate(comment.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
  ).join(``);
  return (
    `<ul class="film-details__comments-list">${content}</ul>`
  );
};

const createMovieCardDetailsEmojiListTemplate = () => {
  const content = EMOJI.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="${getPictureUrl(`emoji`, emoji)}.png" width="30" height="30" alt="emoji">
          </label>`
  ).join(``);
  return (
    `<div class="film-details__emoji-list">${content}</div>`
  );
};

const createMovieCardDetailsNewCommentTemplate = () => {
  return (
    `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

         <label class="film-details__comment-label">
           <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
         </label>
         ${createMovieCardDetailsEmojiListTemplate()}
      </div>`
  );
};

const createMovieCardDetailsCommentsTemplate = (comments) => {
  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        ${createMovieCardDetailsCommentsListTemplate(comments)}
        ${createMovieCardDetailsNewCommentTemplate()}
      </section>`
  );
};

const createMovieCardControlTemplate = (status, label, isChecked) => {
  return (
    `<input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="${status}"
        name="${status}"
        ${isChecked ? `checked` : ``}
      >
      <label for="${status}" class="film-details__control-label film-details__control-label--${status}">${label}</label>`
  );
};

const createMovieCardControlsTemplate = (isWatchlist, isHistory, isFavorite) => {
  const movieStatusControls = [
    [`watchlist`, `Add to watchlist`, isWatchlist],
    [`watched`, `Already watched`, isHistory],
    [`favorite`, `Add to favorites`, isFavorite],
  ];

  const content = movieStatusControls
    .map(([status, label, isChecked]) => createMovieCardControlTemplate(status, label, isChecked))
    .join(``);
  return (
    `<section class="film-details__controls">
        ${content}
      </section>`
  );
};

const createMovieCardDetailsTemplate = (movie)=> {

  const {
    poster,
    description,
    ageLimitations,
    comments,
    isWatchlist,
    isHistory,
    isFavorite} = movie;

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

          ${createMovieCardDetailsInfoHeadTemplate(movie)}

          ${createMovieCardDetailsTableTemplate(movie)}

          <p class="film-details__film-description">${getStringFromArray(description, `.`)}</p>
        </div>
      </div>

      ${createMovieCardControlsTemplate(isWatchlist, isHistory, isFavorite)}
    </div>

    <div class="form-details__bottom-container">
      ${createMovieCardDetailsCommentsTemplate(comments)}
    </div>
  </form>
</section>`
  );
};

export default class MovieCardDetailsView extends Smart {
  constructor(movie) {
    super();
    this._movie = movie;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);

    this._buttonCloseClickHandler = this._buttonCloseClickHandler.bind(this);

    this._setNewCommentHandler = this._setNewCommentHandler.bind(this);
    this._setEmojiForNewComment = this._setEmojiForNewComment.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);

    this._emoji = null;
    this._message = null;
    this._commentID = null;

    this._setNewCommentHandler();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  getTemplate() {
    return createMovieCardDetailsTemplate(this._movie);
  }
  reset() {
    // this.updateData(
    //    MovieOpen.parseMovieToData(movie)
    // );
  }

  restoreHandlers() {
    this._setNewCommentHandler();
    this.setButtonCloseClickHandler(this._callback.buttonCloseClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setHistoryClickHandler(this._callback.historyClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`input#favorite`).addEventListener(`change`, this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector(`input#watched`).addEventListener(`change`, this._historyClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`input#watchlist`).addEventListener(`change`, this._watchlistClickHandler);
  }

  _buttonCloseClickHandler() {
    this._callback.buttonCloseClick();
  }

  setButtonCloseClickHandler(callback) {
    this._callback.buttonCloseClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._buttonCloseClickHandler);
  }

  _getIconForNewComment(icon) {
    return `<img src="images/emoji/${icon}.png" width="55" height="55" alt="emoji-${icon}">`;
  }

  _setEmojiForNewComment(evt) {
    const iconContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    if (evt.target.tagName === `INPUT`) {
      evt.preventDefault();
      iconContainer.innerHTML = this._getIconForNewComment(evt.target.value);
      this._emoji = evt.target.value;
    }
  }

  _setNewCommentHandler() {
    const textContainer = this.getElement().querySelector(`.film-details__comment-input`);
    this.getElement().querySelectorAll(`.film-details__emoji-list`).forEach((item) => {
      item.addEventListener(`click`, this._setEmojiForNewComment);
    });
    textContainer.addEventListener(`keydown`, (evt) => {
      this._message = evt.target.value;
    });
  }
  getEmojiForNewComment() {
    return this._emoji;
  }

  getTextForNewComment() {
    return this._message;
  }

  getCommentID() {
    return this._commentID;
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    this._commentID = evt.target.closest(`.film-details__comment`).dataset.id;
    this._callback.deleteClick();
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((item) => {
      item.addEventListener(`click`, this._commentDeleteClickHandler);
    });
  }
}
