import {render} from '../render';
import Rating from '../view/rating-view';
import Statistic from '../view/statistics-view';
import {UpdateType} from '../constants';

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

  #handleModelEvent = (updateType) => {
    this.#userRating.removeElement();

    this.#userRating.rating = this.#userRatingModel.rating;

    if (this.#userRating.rating) {
      render(this.#header, this.#userRating);
    }

    if (updateType === UpdateType.INIT) {
      this.#statistic.updateElement(this.#moviesModel.movies.length);
    }
  }
}

export default MainPresenter;
