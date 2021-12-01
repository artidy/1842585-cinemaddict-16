import {formatNumber} from '../helpers';
import {createElement} from '../render';

const getStatisticsTemplate = (count) =>
  `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;

class Statistic {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = formatNumber(count);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getStatisticsTemplate(this.#count);
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default Statistic;
