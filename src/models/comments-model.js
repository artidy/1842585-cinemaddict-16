import AbstractObservable from './abstract-observable';
import {normalizeArray} from '../helpers/common';
import {normalizeComment} from '../helpers/normalize';
import {UpdateType} from '../constants';
import ApiService from '../api-service';

class CommentsModel extends AbstractObservable {
  #apiService = null;
  #comments = [];

  constructor (apiService) {
    super();

    this.#apiService = apiService;
  }

  get comments() {
    return this.#comments;
  }

  loadComments = async (movieId) => {
    try {
      const response = await this.#apiService.getMoviesComments(movieId);
      this.#comments = normalizeArray(await ApiService.parseResponse(response), normalizeComment);
    } catch (err) {
      this.#comments = [];
    }

    this._notify(UpdateType.LOAD_COMMENTS);
  }

  addComment = async (movieId, comment, callback) => {
    try {
      const response = await ApiService.parseResponse(await this.#apiService.addComment(movieId, comment));
      this.#comments = normalizeArray(response.comments, normalizeComment);

      callback(movieId, response.movie.comments);

      this._notify();

    } catch (err) {
      this._notify(UpdateType.ERROR_ADD_COMMENT, err);
    }
  }

  deleteComment = async (commentId, callback) => {
    try {
      await this.#apiService.deleteComment(commentId);

      const index = this.#comments.findIndex((comment) => comment.id === commentId);

      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1)
      ];

      callback(commentId);

      this._notify();

    } catch (err) {
      this._notify(UpdateType.ERROR_DELETE_COMMENT, commentId);
    }
  }
}

export default CommentsModel;
