import MovieCardView from "../view/movie-card";
import MovieCardDetailsView from "../view/movie-card-details";
import {remove, render, RenderPosition} from "../utils/render";

export default class Movie {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._bodyElement = document.querySelector(`body`);
    this._movieListElementContainer = this._movieListContainer.querySelector(`.films-list__container`);

    this._movieCardComponent = null;
    this._movieCardDetailsComponent = null;

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    this._movieCardComponent = new MovieCardView(movie);
    this._movieCardDetailsComponent = new MovieCardDetailsView(movie);

    this._movieCardComponent.setMovieCardClickHandler(() => {
      this._handleMovieCardClick();
    });

    render(this._movieListElementContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
  }
  _showMovieCardDetails() {
    render(this._bodyElement, this._movieCardDetailsComponent, RenderPosition.BEFOREEND);
  }

  _hideMovieCardDetails() {
    remove(this._movieCardDetailsComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._hideMovieCardDetails();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
  _handleMovieCardClick() {
    this._showMovieCardDetails();
    this._movieCardDetailsComponent.setButtonCloseClickHandler(()=> {
      this._hideMovieCardDetails();
    });
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }
}
