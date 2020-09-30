import Abstract from "./abstract";

const createSiteMenuItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  const activeClassName = currentFilterType === type ? `main-navigation__item--active` : ``;

  return (
    `<a href="#${type}" data-type="${type}" class="main-navigation__item ${activeClassName}">
       ${name} ${type !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

const createSiteMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createSiteMenuItemTemplate(filter, currentFilterType))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
        </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenuView extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._filterButtons = this.getElement().querySelectorAll(`.main-navigation__item`);

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._siteMenuClickHandler = this._siteMenuClickHandler.bind(this);
  }
  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilterType);
  }

  _changeActiveButton(evt) {
    evt.preventDefault();
    this._filterButtons.forEach(function (element) {
      element.classList.remove(element, `main-navigation__item--active`);
    });
    evt.target.classList.add(evt.target, `main-navigation__item--active`);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._changeActiveButton(evt);
    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterTypeChangeHandler);
  }

  _siteMenuClickHandler(evt) {
    evt.preventDefault();
    this._changeActiveButton(evt);
    this._callback.siteMenuClick();
  }

  setSiteMenuClickHandler(callback) {
    this._callback.siteMenuClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._siteMenuClickHandler);
  }
}
