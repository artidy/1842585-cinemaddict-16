import AbstractObservable from './abstract-observable';

class CommentsModel extends AbstractObservable {
  #comments = [];

  set comments(comments) {
    this.#comments = [...comments];
  }

  get comments() {
    return this.#comments;
  }

  addComment = (comment) => {
    this.#comments.push({
      id: comment.id,
      text: comment.text,
      emotion: comment.emotion,
      author: comment.author,
      date: comment.date,
    });

    this._notify();
  }

  deleteComment = (commentId) => {
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
