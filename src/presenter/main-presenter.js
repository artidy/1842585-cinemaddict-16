import {render} from '../render';
import Rating from '../view/rating-view';
import Statistic from '../view/statistics-view';

class MainPresenter {
  #header = null;
  #footer = null;
  #moviesModel = null;
  #userRatingModel = null;

  #userRating = new Rating();
  #statistic = new Statistic();

  constructor(header, footer, moviesModel, userRatingModel) {
    this.#header = header;
    this.#footer = footer;
    this.#moviesModel = moviesModel;
    this.#userRatingModel = userRatingModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  load = () => {
    render(this.#footer, this.#statistic);
  }

  #handleModelEvent = () => {
    this.#userRating.removeElement();

    this.#userRating.rating = this.#userRatingModel.rating;

    if (this.#userRating.rating) {
      render(this.#header, this.#userRating);
    }
    this.#statistic.updateElement(this.#moviesModel.movies.length);
  }
}

export default MainPresenter;