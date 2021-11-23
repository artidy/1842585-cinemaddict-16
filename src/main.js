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

render(header, getRatingTemplate(), RenderPosition.BEFOREEND);
render(main, getMenuTemplate(), RenderPosition.AFTERBEGIN);
render(main, getSortTemplate(), RenderPosition.BEFOREEND);
render(main, getFilmsTemplate(), RenderPosition.BEFOREEND);
render(main, getFilmsTemplate(), RenderPosition.BEFOREEND);
render(main, getShowMoreTemplate(), RenderPosition.BEFOREEND);
render(main, getDetailsTemplate(), RenderPosition.BEFOREEND);
render(footer, getStatisticsTemplate(), RenderPosition.BEFOREEND);
