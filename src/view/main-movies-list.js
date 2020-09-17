import Abstract from "./abstract";

const IS_HIDDEN = false;

const createMainMoviesListTemplate = (title, isHidden, isEmpty) => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${title}</h2>
      ${isEmpty ? `` : `<div class="films-list__container"></div>`}
    </section>`
  );
};

export default class MainMoviesListView extends Abstract {
  constructor(title, isHidden, isEmpty) {
    super();
    this._title = title;
    this._isHidden = isHidden || IS_HIDDEN;
    this._isEmpty = isEmpty;
  }

  getTemplate() {
    return createMainMoviesListTemplate(this._title, this._isHidden, this._isEmpty);
  }

  clearMoviesList() {
    this.getElement().querySelector(`.films-list__container`).innerHTML = ``;
  }
}
