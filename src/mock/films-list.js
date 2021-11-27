import {DEFAULT_FILMS_COUNT} from './constants';
import {generateFilmCard} from './film-card';

const generateFilms = (count = DEFAULT_FILMS_COUNT) => Array.from({length: count}, generateFilmCard);

export {generateFilms};
