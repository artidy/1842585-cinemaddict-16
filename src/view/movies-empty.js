import AbstractView from './abstract-view';

const getMoviesEmptyTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

class MoviesEmpty extends AbstractView {
  get template() {
    return getMoviesEmptyTemplate();
  }
}

export default MoviesEmpty;
