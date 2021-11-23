import {RenderPosition, render} from './render';
import {getRatingTemplate} from './view/rating';
import {getSortTemplate} from './view/sort';
import {getFilmsTemplate} from './view/films';
import {getMenuTemplate} from './view/menu';
import {getDetailsTemplate} from './view/details';
import {getShowMoreTemplate} from './view/buttons';
import {getStatisticsTemplate} from './view/statistics';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

render(header, getRatingTemplate());
render(main, getMenuTemplate(), RenderPosition.AFTERBEGIN);
render(main, getSortTemplate());
render(main, getFilmsTemplate());
render(main, getFilmsTemplate());
render(main, getShowMoreTemplate());
render(main, getDetailsTemplate());
render(footer, getStatisticsTemplate());
