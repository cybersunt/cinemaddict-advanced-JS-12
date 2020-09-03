import Abstract from "./abstract";

const IS_HIDDEN = false;

const createMoviesListTemplate = (id, title, isHidden) => {
  return (
    `<section class="films-list${id !== 0 ? `--extra` : ``}">
      <h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class MoviesList extends Abstract {
  constructor(id, title, isHidden) {
    super();
    this._id = id;
    this._title = title;
    this._isHidden = isHidden || IS_HIDDEN;
  }
  getTemplate() {
    return createMoviesListTemplate(this._id, this._title, this._isHidden);
  }
}
