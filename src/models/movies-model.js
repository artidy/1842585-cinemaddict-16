import AbstractObservable from './abstract-observable';
import {normalizeArray} from '../helpers/common';
import {normalizeMovie} from '../helpers/normalize';
import {UpdateType} from '../constants';

class MoviesModel extends AbstractObservable {
  #apiService = null;
  #movies = [];

  constructor (apiService) {
    super();

    this.#apiService = apiService;
  }

  get movies() {
    return this.#movies;
  }

  init = async () => {
    const response = await this.#apiService.movies;
    this.#movies = normalizeArray(response, normalizeMovie);

    this._notify(UpdateType.INIT);
  }

  addComment = (movieId, commentId) => {
    const currentMovie = this.#movies.find((movie) => movie.id === movieId);

    if (!currentMovie) {
      throw new Error('Movie doesn\'t exist.');
    }

    currentMovie.comments.push(commentId);
  }

  deleteComment = (commentId) => {
    const currentMovie = this.#movies.find((movie) => movie.comments.includes(commentId));
    const commentIndex = currentMovie.comments.findIndex((comment) => comment === commentId);

    currentMovie.comments = [
      ...currentMovie.comments.slice(0, commentIndex),
      ...currentMovie.comments.slice(commentIndex + 1),
    ];
  }

  updateMovie = async (updateType, updatedMovie) => {
    await this.#apiService.updateMovie(updatedMovie);

    const index = this.#movies.findIndex((movie) => movie.id === updatedMovie.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      updatedMovie,
      ...this.#movies.slice(index + 1)
    ];

    this._notify(updateType, updatedMovie);
  }
}

export default MoviesModel;
