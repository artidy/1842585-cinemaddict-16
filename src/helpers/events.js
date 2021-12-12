import {MAX_FILMS_GAP} from '../constants';

const onShowMoreMovies = (movies, container, button, addMovies) => {
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
  evt.preventDefault();

  if (evt.key === 'Esc' || evt.key === 'Escape') {
    popup.removeEvent('onKeydownEsc', 'keydown', document);
    document.body.classList.remove('hide-overflow');
    popup.removeElement();
  }
};

const onClickCloseBtn = (popup) => (evt) => {
  evt.preventDefault();

  if (evt.target.classList.contains('film-details__close-btn')) {
    popup.removeEvent('onKeydownEsc', 'keydown', document);
    document.body.classList.remove('hide-overflow');
    popup.removeElement();
  }
};

export {
  onShowMoreMovies,
  onKeydownEsc,
  onClickCloseBtn,
};
