import {getСapitalizedString} from "../utils/movie";
import Abstract from "./abstract";

const createSiteMenuItemTemplate = ({name, count}) => {
  return `<a href="#${name}" class="main-navigation__item">${getСapitalizedString(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createSiteMenuItemTemplate(filter))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
        </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }
  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
