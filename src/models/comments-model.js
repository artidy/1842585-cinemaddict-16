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
    const response = await this.#apiService.getMoviesComments(movieId);
    this.#comments = normalizeArray(await ApiService.parseResponse(response), normalizeComment);

    this._notify(UpdateType.LOAD_COMMENTS);
  }

  addComment = async (movieId, comment) => {
    await this.#apiService.addComment(movieId, comment);

    this.#comments.push({
      id: comment.id,
      text: comment.text,
      emotion: comment.emotion,
      author: comment.author,
      date: comment.date,
    });

    this._notify();
  }

  deleteComment = async (commentId) => {
    await this.#apiService.deleteComment(commentId);

    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1)
    ];

    this._notify();
  }
}

export default CommentsModel;
