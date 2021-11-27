import {RenderPosition, render} from './render';
import {getRatingTemplate} from './view/rating-view';
import {getSortTemplate} from './view/sort-view';
import {addExtraFilms, getFilmsTemplate} from './view/films-view';
import {getMenuTemplate} from './view/menu-view';
import {getDetailsTemplate} from './view/details-view';
import {getShowMoreTemplate} from './view/buttons-view';
import {getStatisticsTemplate} from './view/statistics-view';
import {generateFilms} from './mock/films-list';
import {normalizeFilm, normalizeArray} from './helpers';
import {getFilmTemplate} from './view/film-view';

const films = normalizeArray(generateFilms(), normalizeFilm);

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

render(header, getRatingTemplate());
render(main, getMenuTemplate(), RenderPosition.AFTERBEGIN);
render(main, getSortTemplate());
render(main, getFilmsTemplate(films));
// render(main, getDetailsTemplate());
render(footer, getStatisticsTemplate());

const moreButton = document.querySelector('.films-list__show-more');

if (moreButton) {
  moreButton.addEventListener('click', addExtraFilms(films, render));
}
