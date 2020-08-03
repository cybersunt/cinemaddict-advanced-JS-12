export const createMoviesListTitleTemplate = (title, isHidden = false) => {
  return `<h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${title}</h2>`;
};
