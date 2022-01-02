import AbstractObservable from './abstract-observable';

class MoviesModel extends AbstractObservable {
  #movies = [];

  set movies(movies) {
    this.#movies = [...movies];
  }

  get movies() {
    return this.#movies;
  }
}

export default MoviesModel;
