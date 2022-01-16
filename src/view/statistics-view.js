import {formatNumber} from '../helpers/common';
import AbstractView from './abstract-view';

const getStatisticsTemplate = (count) =>
  `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;

class Statistic extends AbstractView {
  #count = 0;

  updateElement = (count) => {
    this.#count = formatNumber(count);

    this.replaceElement();
  }

  get template() {
    return getStatisticsTemplate(this.#count);
  }
}

export default Statistic;
