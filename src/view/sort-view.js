import AbstractEventView from './abstract-event-view';

const getSortTemplate = (currentSort) =>
  `<ul class="sort">
    <li><a class="sort__button ${currentSort === 'default' ? 'sort__button--active' : ''}" data-sort="default">Sort by default</a></li>
    <li><a class="sort__button ${currentSort === 'date' ? 'sort__button--active' : ''}" data-sort="date">Sort by date</a></li>
    <li><a class="sort__button ${currentSort === 'rating' ? 'sort__button--active' : ''}" data-sort="rating">Sort by rating</a></li>
  </ul>`;

class Sorting extends AbstractEventView {
  #currentSort = 'default';

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
