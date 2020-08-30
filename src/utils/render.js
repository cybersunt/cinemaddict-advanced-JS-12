import {createMoviesListTitleTemplate} from "../view/movies-list-title";
import {createMoviesListContainerTemplate} from "../view/movie-list-container";
import {createMovieCardTemplate} from "../view/movie-card";
import {movies} from "../main";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderMoviesList = (moviesList, title, titleIsHidden, count) => {
  renderTemplate(moviesList, createMoviesListTitleTemplate(title, titleIsHidden), `beforeend`);
  renderTemplate(moviesList, createMoviesListContainerTemplate(), `beforeend`);

  const containerElement = moviesList.querySelector(`.films-list__container`);

  for (let i = 0; i < count; i++) {
    renderTemplate(containerElement, createMovieCardTemplate(movies[i]), `beforeend`);
  }
};
