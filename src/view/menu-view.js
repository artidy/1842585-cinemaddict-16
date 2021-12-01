import {createElement} from '../render';

const getMenuTemplate = (watchListCount, historyCount, favoriteCount) =>
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

class MainMenu {
  #element = null;
  #watchListCount = null;
  #historyCount = null;
  #favoriteCount = null;

  constructor(watchListCount, historyCount, favoriteCount) {
    this.#watchListCount = watchListCount;
    this.#historyCount = historyCount;
    this.#favoriteCount = favoriteCount;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getMenuTemplate(this.#watchListCount, this.#historyCount, this.#favoriteCount);
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default MainMenu;
