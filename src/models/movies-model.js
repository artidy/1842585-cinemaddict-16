import AbstractObservable from './abstract-observable';
import {normalizeArray} from '../helpers/common';
import {normalizeMovie} from '../helpers/normalize';
import {UpdateType} from '../constants';
import ApiService from '../api-service';

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
    try {
      const response = await this.#apiService.movies;
      this.#movies = normalizeArray(await ApiService.parseResponse(response), normalizeMovie);
    } catch (err) {
      this.#movies = [];
    }

    this._notify(UpdateType.INIT);
  }

  addComment = (movieId, comments) => {
    const currentMovie = this.#movies.find((movie) => movie.id === movieId);

    if (!currentMovie) {
      throw new Error('Movie doesn\'t exist.');
    }

    currentMovie.comments = comments;
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
    try {
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

    } catch (err) {
      this._notify(UpdateType.ERROR, err);
    }
  }
}

export default MoviesModel;
