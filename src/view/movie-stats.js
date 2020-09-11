import Abstract from "./abstract";

const createMovieStatsTemplate = (movies) => {
  return (
    `<section class="footer__statistics">
       <p>${movies.length} movies inside</p>
     </section>`
  );
};

export default class MovieStatsView extends Abstract {
  constructor(movies) {
    super();
    this._movies = movies;
  }
  getTemplate() {
    return createMovieStatsTemplate(this._movies);
  }
}
