import MovieCardView from "../view/movie-card";
import MovieCardDetailsView from "../view/movie-card-details";
import {remove, render, RenderPosition, replace} from "../utils/render";
import {UserAction, UpdateType, EMOJI, ACTORS, movieDetailsData, DESCRIPTIONS} from "../const.js";
import {getArrayRandomLength, getRandomElement} from "../utils/movie";

const Mode = {
  DEFAULT: `DEFAULT`,
  OPENED: `OPENED`
};

export default class Movie {
  constructor(movieListContainer, changeData, changeMode) {
    this._bodyElement = document.querySelector(`body`);
    this._movieListElementContainer = movieListContainer.querySelector(`.films-list__container`);

    this._movieCardComponent = null;
    this._movieCardDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._changeData = changeData;
    this._changeMode = changeMode;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._enterKeyDownHandler = this._enterKeyDownHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieCardComponent = this._movieCardComponent;
    const prevMovieCardDetailsComponent = this._movieCardDetailsComponent;

    this._movieCardComponent = new MovieCardView(movie);
    this._movieCardDetailsComponent = new MovieCardDetailsView(movie);

    this._movieCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._movieCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    this._movieCardDetailsComponent.setButtonCloseClickHandler(()=> {
      this._hideMovieCardDetails();
    });
    this._movieCardDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardDetailsComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._movieCardDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    document.addEventListener(`keydown`, this._enterKeyDownHandler);

    this._movieCardComponent.setMovieCardClickHandler(() => {
      this._handleMovieCardClick();
    });

    if (prevMovieCardComponent === null || prevMovieCardDetailsComponent === null) {
      render(this._movieListElementContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._movieListElementContainer.contains(prevMovieCardComponent.getElement())) {
      render(this._bodyElement, prevMovieCardDetailsComponent, RenderPosition.BEFOREEND);
    }

    replace(this._movieCardComponent, prevMovieCardComponent);

    if (this._mode === Mode.OPENED) {
      replace(this._movieCardDetailsComponent, prevMovieCardDetailsComponent);
    }

    remove(prevMovieCardComponent);
    remove(prevMovieCardDetailsComponent);
  }

  destroy() {
    remove(this._movieCardComponent);
    remove(this._movieCardDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideMovieCardDetails();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._movie,
            {
              isFavorite: !this._movie.isFavorite
            })
    );
  }

  _handleHistoryClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._movie,
            {
              isHistory: !this._movie.isHistory
            })
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._movie,
            {
              isWatchlist: !this._movie.isWatchlist
            })
    );
  }

  _showMovieCardDetails() {
    render(this._bodyElement, this._movieCardDetailsComponent, RenderPosition.BEFOREEND);
    this._changeMode();
    this._mode = Mode.OPENED;
  }

  _hideMovieCardDetails() {
    remove(this._movieCardDetailsComponent);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._movieCardDetailsComponent.reset(this._movie);
      this._hideMovieCardDetails();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _enterKeyDownHandler(evt) {
    const textarea = this._movieCardDetailsComponent.getElement().querySelector(`.film-details__comment-input`);
    if (evt.key === `Enter` && document.activeElement === textarea) {
      const newComment = {
        emoji: this._movieCardDetailsComponent.getEmojiForNewComment(),
        author: `Author`,
        message: this._movieCardDetailsComponent.getTextForNewComment(),
        date: new Date();
      };
      this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        {
          film: this._movie,
          comment: newComment
        }
      );
    }
  }

  _handleMovieCardClick() {
    this._showMovieCardDetails();
  }
}
