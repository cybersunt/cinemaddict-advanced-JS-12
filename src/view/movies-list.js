import Abstract from "./abstract";

const createMoviesListTemplate = (id, title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class MoviesListView extends Abstract {
  constructor(id, title) {
    super();
    this._id = id;
    this._title = title;
  }

  getTemplate() {
    return createMoviesListTemplate(this._id, this._title);
  }
}
