import {addMovies, renderMovieDetails} from './renders';
import {MAX_FILMS_GAP} from '../constants';

const onShowMoreMovies = (movies, container, button) => {
  let offset = MAX_FILMS_GAP;

  return (evt) => {
    evt.preventDefault();
    addMovies(container, movies.slice(offset, offset + MAX_FILMS_GAP));
    offset += MAX_FILMS_GAP;

    if (offset >= movies.length) {
      button.removeElement();
    }
  };
};

const onKeydownEsc = (popup) => (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popup.removeElement();
    popup.removeEvent('onKeydownEsc', 'keydown', document);
  }
};

const onClickCloseBtn = (popup) => (evt) => {
  evt.preventDefault();

  if (evt.target.classList.contains('film-details__close-btn')) {
    popup.removeElement();
    popup.removeEvent('onKeydownEsc', 'keydown', document);
  }
};

const onOpenMovieDetails = (container, movies, comments) => (evt) => {
  evt.preventDefault();

  const movieDetails = renderMovieDetails(container, movies, comments, evt.target);

  if (movieDetails) {
    movieDetails.addEvent('onKeydownEsc', 'keydown', onKeydownEsc(movieDetails), document);
    movieDetails.addEvent('onClickCloseBtn', 'click', onClickCloseBtn(movieDetails));
  }
};

export {
  onShowMoreMovies,
  onKeydownEsc,
  onClickCloseBtn,
  onOpenMovieDetails,
};
