import {RenderPosition, render} from './render';
import {getRatingTemplate} from './view/rating-view';
import {getSortTemplate} from './view/sort-view';
import {getFilmsTemplate} from './view/films-view';
import {getMenuTemplate} from './view/menu-view';
import {getDetailsTemplate} from './view/details-view';
import {getShowMoreTemplate} from './view/buttons-view';
import {getStatisticsTemplate} from './view/statistics-view';

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
