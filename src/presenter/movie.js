import MovieCardView from "../view/movie-card";
import MovieCardDetailsView from "../view/movie-card-details";
import {remove, render, RenderPosition, replace} from "../utils/render";
import {UserAction, UpdateType} from "../const.js";
import {nanoid} from "nanoid";
import CommentsModel from "../model/comments";

const Mode = {
  DEFAULT: `DEFAULT`,
  OPENED: `OPENED`
};

export default class Movie {
  constructor(movieListContainer, changeData, changeMode, api) {
    this._bodyElement = document.querySelector(`body`);
    this._movieListElementContainer = movieListContainer.querySelector(`.films-list__container`);

    this._movieCardComponent = null;
    this._movieCardDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;

    this._newCommentEmoji = null;
    this._newCommentMessage = null;

    this._commentsModel = new CommentsModel();

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._enterKeyDownHandler = this._enterKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._commentsModel.addObserver(this._handleModelEvent);
 }

  init(movie) {
    this._movie = movie;

    const prevMovieCardComponent = this._movieCardComponent;

    this._movieCardComponent = new MovieCardView(this._movie);

    this._movieCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._movieCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    this._movieCardComponent.setMovieCardClickHandler(() => {
      this._handleMovieCardClick();
    });

    if (prevMovieCardComponent === null) {
      render(this._movieListElementContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._movieCardComponent, prevMovieCardComponent);

    remove(prevMovieCardComponent);
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

  _showMovieCardDetails() {
    this._api.requestComments(this._movie.id)
      .then((comments) => {
        this._commentsModel.set(comments);
        this._movie.comments = this._commentsModel.get();

        this._movieCardDetailsComponent = new MovieCardDetailsView(this._movie);

        this._movieCardDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
        this._movieCardDetailsComponent.setHistoryClickHandler(this._handleHistoryClick);
        this._movieCardDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);

        render(this._bodyElement, this._movieCardDetailsComponent, RenderPosition.BEFOREEND);

        this._movieCardDetailsComponent.setDeleteClickHandler(this._handleDeleteClick);

        this._movieCardDetailsComponent.setButtonCloseClickHandler(()=> {
          this._hideMovieCardDetails();
        });

        this._changeMode();
        this._mode = Mode.OPENED;

        // this._movieCardDetailsComponent.restoreHandlers();

        document.addEventListener(`keydown`, this._escKeyDownHandler);
        document.addEventListener(`keydown`, this._enterKeyDownHandler);
      });
  }

  _hideMovieCardDetails() {
    remove(this._movieCardDetailsComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleModelEvent() {

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

  _handleDeleteClick() {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        {
          film: this._movie,
          comment: this._movieCardDetailsComponent.getCommentID()
        }
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      // this._movieCardDetailsComponent.reset(this._movie);
      this._hideMovieCardDetails();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _enterKeyDownHandler(evt) {
    const textarea = this._movieCardDetailsComponent.getElement().querySelector(`.film-details__comment-input`);
    if ((evt.ctrlKey || evt.metaKey) && evt.key === `Enter` && document.activeElement === textarea) {
      this._newCommentEmoji = this._movieCardDetailsComponent.getEmojiForNewComment();
      this._newCommentMessage = this._movieCardDetailsComponent.getTextForNewComment();
      if (this._newCommentEmoji === null || this._newCommentMessage === ``) {
        return;
      }
      const newComment = {
        id: nanoid(),
        emotion: this._newCommentEmoji,
        author: `Author`,
        comment: this._newCommentMessage,
        date: new Date()
      };
      this._changeData(
          UserAction.ADD_COMMENT,
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
