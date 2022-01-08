import {ActionType, SortType, UpdateType} from '../constants';
import AbstractSmartView from './abstract-smart-view';

const getSortTemplate = (currentSort) =>
  `<ul class="sort">
    <li><a class="sort__button ${currentSort === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a class="sort__button ${currentSort === SortType.DATE ? 'sort__button--active' : ''}" data-sort="${SortType.DATE}">Sort by date</a></li>
    <li><a class="sort__button ${currentSort === SortType.RATING ? 'sort__button--active' : ''}" data-sort="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;

class Sorting extends AbstractSmartView {
  #currentSort = null;

  constructor(currentSort) {
    super();
    this.#currentSort = currentSort;
  }

  get template() {
    return getSortTemplate(this.#currentSort);
  }

  updateElement = (currentSort) => {
    this.#currentSort = currentSort;
  }

  restoreHandlers = (updateElement) => {
    this.addEvent('onClickSortBtn', 'click', this.#onClickSortBtn(updateElement));
  }

  #onClickSortBtn = (updateSort) => (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'A' || this.#currentSort === evt.target.dataset.sort) {
      return;
    }

    this.#currentSort = evt.target.dataset.sort;

    updateSort(ActionType.CHANGE_SORT, UpdateType.MINOR, this.#currentSort);
  }
}

export default Sorting;
