import {getAuthorization} from './helpers/common';
import UserRating from './models/user-rating';
import MoviesPresenter from './presenter/movies-presenter';
import MoviesModel from './models/movies-model';
import FilterModel from './models/filter-model';
import SortModel from './models/sort-model';
import CommentsModel from './models/comments-model';
import ApiService from './api-service';
import {END_POINT} from './constants';

const apiService = new ApiService(END_POINT, getAuthorization());
const moviesModel = new MoviesModel(apiService);
const filterModel = new FilterModel();
const sortModel = new SortModel();
const userModel = new UserRating();
const commentsModel = new CommentsModel();

moviesModel.init();

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const moviesPresenter = new MoviesPresenter(header, main, footer, moviesModel, filterModel, sortModel, commentsModel, userModel);
