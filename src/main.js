import {RenderPosition, render} from './render';
import {getRatingTemplate} from './view/rating-view';
import {getSortTemplate} from './view/sort-view';
import {addExtraFilms, getFilmsTemplate} from './view/films-view';
import {getMenuTemplate} from './view/menu-view';
import {getStatisticsTemplate} from './view/statistics-view';
import {generateFilms} from './mock/films-list';
import {
  normalizeFilm,
  normalizeArray,
  normalizeComment,
  normalizeUser,
  filterWatchingFilms,
  filterWatchedFilms, filterFavoriteFilms
} from './helpers';
import {openDetails} from './view/film-view';
import {generateComments} from './mock/comments';
import {user} from './mock/user';

const currentUser = normalizeUser(user);
const films = normalizeArray(generateFilms(), normalizeFilm);
const comments = normalizeArray(generateComments(films), normalizeComment);
const inWatchListFilms = filterWatchingFilms(films);
const isWatchedFilms = filterWatchedFilms(films);
const isFavoriteFilms = filterFavoriteFilms(films);

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

render(header, getRatingTemplate(currentUser));
render(main, getMenuTemplate(inWatchListFilms.length, isWatchedFilms.length, isFavoriteFilms.length), RenderPosition.AFTERBEGIN);
render(main, getSortTemplate());
render(main, getFilmsTemplate(films));
render(footer, getStatisticsTemplate());

const moreButton = document.querySelector('.films-list__show-more');
if (moreButton) {
  moreButton.addEventListener('click', addExtraFilms(films, render));
}

const showDetails = document.querySelector('.films');
if (showDetails) {
  showDetails.addEventListener('click', openDetails(films, comments, main, render));
}
