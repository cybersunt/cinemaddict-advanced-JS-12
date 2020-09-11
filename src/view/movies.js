import Abstract from "./abstract";

export const createMoviesTemplate = () => `<section class="films"></section>`;

export default class MoviesView extends Abstract {
  getTemplate() {
    return createMoviesTemplate();
  }
}
