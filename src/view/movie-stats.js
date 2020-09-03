import Abstract from "./abstract";
import {movies} from "../main";

const createMovieStatsTemplate = () => {
  return (
    `<section class="footer__statistics">
       <p>${movies.length} movies inside</p>
     </section>`
  );
};

export default class MovieStats extends Abstract {
  getTemplate() {
    return createMovieStatsTemplate();
  }
}
