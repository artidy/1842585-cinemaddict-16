import {RenderPosition, render} from './render.js';
import {getRatingTemplate} from './view/rating.js';
import {getSortTemplate} from './view/sort.js';
import {getFilmsTemplate} from './view/films.js';
import {getMenuTemplate} from './view/menu.js';
import {getDetailsTemplate} from './view/details.js';
import {getShowMoreTemplate} from './view/buttons.js';
import {getStatisticsTemplate} from './view/statistics';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

render(header, getRatingTemplate(), RenderPosition.BEFOREEND);
render(main, getMenuTemplate(), RenderPosition.AFTERBEGIN);
render(main, getSortTemplate(), RenderPosition.BEFOREEND);
render(main, getFilmsTemplate(), RenderPosition.BEFOREEND);
render(main, getFilmsTemplate(), RenderPosition.BEFOREEND);
render(main, getShowMoreTemplate(), RenderPosition.BEFOREEND);
render(main, getDetailsTemplate(), RenderPosition.BEFOREEND);
render(footer, getStatisticsTemplate(), RenderPosition.BEFOREEND);
