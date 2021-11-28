import {formatNumber} from '../helpers';

const getStatisticsTemplate = (filmsCount) => `
  <section class="footer__statistics">
    <p>${formatNumber(filmsCount)} movies inside</p>
  </section>
`;

export {getStatisticsTemplate};
