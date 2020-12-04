import Abstract from "./abstract";

const createMovieStatsTemplate = (countMovies) => {
  return (
    `<section class="footer__statistics">
       <p>${countMovies} movies inside</p>
     </section>`
  );
};

export default class MovieStats extends Abstract {
  constructor(countMovies) {
    super();
    this._countMovies = countMovies;
  }
  getTemplate() {
    return createMovieStatsTemplate(this._countMovies);
  }
}
