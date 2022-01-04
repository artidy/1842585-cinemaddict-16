import AbstractObservable from './abstract-observable';

class MoviesModel extends AbstractObservable {
  #movies = [];

  set movies(movies) {
    this.#movies = [...movies];
  }

  get movies() {
    return this.#movies;
  }

  deleteComment = (commentId) => {
    const currentMovie = this.#movies.find((movie) => movie.comments.includes(commentId));
    const commentIndex = currentMovie.comments.findIndex((comment) => comment === commentId);

    currentMovie.comments = [
      ...currentMovie.comments.slice(0, commentIndex),
      ...currentMovie.comments.slice(commentIndex + 1),
    ];
  }

  updateMovie = (updateType, updatedMovie) => {
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
