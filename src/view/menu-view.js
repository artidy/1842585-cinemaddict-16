import AbstractSmartView from './abstract-smart-view';
import {FilterType} from '../constants';

const getMenuTemplate = (watchListCount, historyCount, favoriteCount, activeButton) =>
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#${FilterType.All}" class="main-navigation__item ${FilterType.All === activeButton ? 'main-navigation__item--active' : ''}">All movies</a>
      <a href="#${FilterType.WATCHLIST}" class="main-navigation__item ${FilterType.WATCHLIST === activeButton ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${watchListCount}</span></a>
      <a href="#${FilterType.HISTORY}" class="main-navigation__item ${FilterType.HISTORY === activeButton ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${historyCount}</span></a>
      <a href="#${FilterType.FAVORITES}" class="main-navigation__item ${FilterType.FAVORITES === activeButton ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${favoriteCount}</span></a>
    </div>
    <a href="#${FilterType.STATS}" class="main-navigation__additional ${FilterType.STATS === activeButton ? 'main-navigation__additional--active' : ''}">Stats</a>
  </nav>`;

class MainMenu extends AbstractSmartView {
  #watchListCount = 0;
  #historyCount = 0;
  #favoriteCount = 0;
  #activeButton = FilterType.All;

  get template() {
    return getMenuTemplate(this.#watchListCount, this.#historyCount, this.#favoriteCount, this.#activeButton);
  }

  get watchListCount() {
    return this.#watchListCount;
  }

  get historyCount() {
    return this.#historyCount;
  }

  get favoriteCount() {
    return this.#favoriteCount;
  }

  set watchListCount(watchListCount) {
    this.#watchListCount = watchListCount;
  }

  set historyCount(historyCount) {
    this.#historyCount = historyCount;
  }

  set favoriteCount(favoriteCount) {
    this.#favoriteCount = favoriteCount;
  }

  restoreHandlers = (onClickMenu) => {
    this.addEvent('onClickMenu', 'click', onClickMenu);
  }
}

export default MainMenu;
