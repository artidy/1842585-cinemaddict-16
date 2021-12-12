import {addMovies} from './renders';
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

const onClickWatchlist = (movie, updateView) => {
  movie.isInWatchlist = !movie.isInWatchlist;
  updateView();
};

const onClickWatched = (movie, updateView) => {
  movie.isWatched = !movie.isWatched;
  updateView();
};

const onClickFavorite = (movie, updateView) => {
  movie.isFavorite = !movie.isFavorite;
  updateView();
};

export {
  onShowMoreMovies,
  onKeydownEsc,
  onClickCloseBtn,
  onClickWatchlist,
  onClickWatched,
  onClickFavorite,
};
