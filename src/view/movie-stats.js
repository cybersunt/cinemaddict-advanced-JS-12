import Abstract from "./abstract";

const createMovieStatsTemplate = () => {
  return (
    `<section class="footer__statistics">
       <p>130 291 movies inside</p>
     </section>`
  );
};

export default class MovieStats extends Abstract {
  getTemplate() {
    return createMovieStatsTemplate();
  }
}
