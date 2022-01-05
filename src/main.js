import {generateFilms} from './mock/films-list';
import {normalizeArray} from './helpers/common';
import {normalizeMovie, normalizeComment, normalizeUser} from './helpers/normalize';
import {generateComments} from './mock/comments';
import {user} from './mock/user';
import MoviesPresenter from './presenter/movies-presenter';
import MoviesModel from './models/movies-model';
import FilterModel from './models/filter-model';
import SortModel from './models/sort-model';
import CommentsModel from './models/comments-model';

const currentUser = normalizeUser(user);
const movies = normalizeArray(generateFilms(), normalizeMovie);
const comments = normalizeArray(generateComments(movies), normalizeComment);
const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const sortModel = new SortModel();
const commentsModel = new CommentsModel();

moviesModel.movies = movies;
commentsModel.comments = comments;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const moviesPresenter = new MoviesPresenter(header, main, footer, moviesModel, filterModel, sortModel, commentsModel);

moviesPresenter.load(currentUser);
