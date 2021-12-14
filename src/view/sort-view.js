import AbstractEventView from './abstract-event-view';
import {SortType} from '../constants';

const getSortTemplate = (currentSort) =>
  `<ul class="sort">
    <li><a class="sort__button ${currentSort === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a class="sort__button ${currentSort === SortType.DATE ? 'sort__button--active' : ''}" data-sort="${SortType.DATE}">Sort by date</a></li>
    <li><a class="sort__button ${currentSort === SortType.RATING ? 'sort__button--active' : ''}" data-sort="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;

class Sorting extends AbstractEventView {
  #currentSort = SortType.DEFAULT;

  get template() {
    return getSortTemplate(this.#currentSort);
  }

  get currentSort() {
    return this.#currentSort;
  }

  onClickSortBtn = (updateSort) => (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'A' || this.#currentSort === evt.target.dataset.sort) {
      return;
    }

    this.#currentSort = evt.target.dataset.sort;

    updateSort();
  }
}

export default Sorting;
