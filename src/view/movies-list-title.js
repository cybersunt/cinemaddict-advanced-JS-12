export const createMoviesListTitleTemplate = (title, hidden = false) => {
  if (hidden) {
    return (
      `<h2 class="films-list__title visually-hidden">${title}</h2>`
    );
  }
  return (
    `<h2 class="films-list__title">${title}</h2>`
  );
};
