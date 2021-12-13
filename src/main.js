import {generateFilms} from './mock/films-list';
import {normalizeArray} from './helpers/common';
import {normalizeMovie, normalizeComment, normalizeUser} from './helpers/normalize';
import {generateComments} from './mock/comments';
import {user} from './mock/user';
import MoviesPresenter from './presenter/movies-presenter';

const currentUser = normalizeUser(user);
const movies = normalizeArray(generateFilms(), normalizeMovie);
const comments = normalizeArray(generateComments(movies), normalizeComment);
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const moviesPresenter = new MoviesPresenter(header, main, footer);

moviesPresenter.load(movies, comments, currentUser);
