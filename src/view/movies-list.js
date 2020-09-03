import Abstract from "./abstract";

const IS_HIDDEN = false;
const IS_EMPTY = null;

const createMoviesListTemplate = (id, title, isHidden, isEmpty) => {
  return (
    `<section class="films-list${id !== 0 && !isEmpty ? `--extra` : ``}">
      <h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${title}</h2>
      ${isEmpty ? `` : `<div class="films-list__container"></div>`}
    </section>`
  );
};

export default class MoviesList extends Abstract {
  constructor(id, title, isHidden, isEmpty) {
    super();
    this._id = id;
    this._title = title;
    this._isHidden = isHidden || IS_HIDDEN;
    this._isEmpty = isEmpty || IS_EMPTY;
  }

  getTemplate() {
    return createMoviesListTemplate(this._id, this._title, this._isHidden, this._isEmpty);
  }
}
