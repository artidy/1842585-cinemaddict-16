import AbstractView from './abstract-view';

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

class MainMenu extends AbstractView {
  #watchListCount = null;
  #historyCount = null;
  #favoriteCount = null;

  constructor(watchListCount, historyCount, favoriteCount) {
    super();
    this.#watchListCount = watchListCount;
    this.#historyCount = historyCount;
    this.#favoriteCount = favoriteCount;
  }

  get template() {
    return getMenuTemplate(this.#watchListCount, this.#historyCount, this.#favoriteCount);
  }
}

export default MainMenu;