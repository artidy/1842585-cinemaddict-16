import AbstractView from './abstract-view';

const getSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

class Sorting extends AbstractView {
  get template() {
    return getSortTemplate();
  }
}

export default Sorting;
