import {getFilmTemplate} from './film-view';
import {getShowMoreTemplate} from './buttons-view';
import {MAX_FILMS_EXTRA, MAX_FILMS_GAP, NO_CONTENT_FILMS} from '../constants';

let offset = 0;
const OFFSET_EXTRA = 0;

const addGeneralOffset = () => {
  offset += MAX_FILMS_GAP;
};

const addExtraOffset = () => {
};

const generateFilmsContent = (films, count = MAX_FILMS_GAP, start = offset, callback = addGeneralOffset) => {
  const  content = films.length > 0 ? films.slice(start, start + count).map((film) => getFilmTemplate(film)).join('') : NO_CONTENT_FILMS;

  callback();

  return content;
};

const addExtraFilms = (films, callback) => (evt) => {
  evt.preventDefault();
  const container = document.querySelector('.films-list__container');
  const moreButton = document.querySelector('.films-list__show-more');

  if (container) {
    callback(container, generateFilmsContent(films));
  }

  if (moreButton && films.length <= offset) {
    moreButton.remove();
  }
};

const sortTopRatedFilms = (films) => films.sort(({rating: firstRating}, {rating: secondRating}) => firstRating < secondRating);

const sortMostCommentedFilms = (films) => films.sort(({comments: firstComments}, {comments: secondComments}) => firstComments.length < secondComments.length);

const getFilmsTemplate = (films) => `
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        ${generateFilmsContent(films)}
      </div>

      ${getShowMoreTemplate()}
    </section>

    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
        ${generateFilmsContent(sortTopRatedFilms(films), MAX_FILMS_EXTRA, OFFSET_EXTRA, addExtraOffset)}
      </div>
    </section>

    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
        ${generateFilmsContent(sortMostCommentedFilms(films), MAX_FILMS_EXTRA, OFFSET_EXTRA, addExtraOffset)}
      </div>
    </section>
  </section>
`;

export {getFilmsTemplate, addExtraFilms};
