import {render} from '../render';
import RatingView from '../view/rating-view';
import StatisticsView from '../view/statistics-view';
import {UpdateType} from '../constants';

class MainPresenter {
  #header = null;
  #footer = null;
  #moviesModel = null;
  #ratingModel = null;

  #ratingView = new RatingView();
  #statisticsView = new StatisticsView();

  constructor(header, footer, moviesModel, ratingModel) {
    this.#header = header;
    this.#footer = footer;
    this.#moviesModel = moviesModel;
    this.#ratingModel = ratingModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  load = () => {
    render(this.#footer, this.#statisticsView);
  }

  #handleModelEvent = (updateType) => {
    this.#ratingView.removeElement();

    this.#ratingView.rating = this.#ratingModel.rating;

    if (this.#ratingView.rating) {
      render(this.#header, this.#ratingView);
    }

    if (updateType === UpdateType.INIT) {
      this.#statisticsView.updateElement(this.#moviesModel.movies.length);
    }
  }
}

export default MainPresenter;
