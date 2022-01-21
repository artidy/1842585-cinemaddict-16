import {RatingValue, Rating} from '../constants';

class UserRating {
  #rating =  Rating.NONE;

  get rating() {
    return this.#rating;
  }

  changeRating = (watchingCount) => {
    if (watchingCount >= RatingValue.MOVIE_BUFF) {
      this.#rating = Rating.MOVIE_BUFF;
    } else if (watchingCount >= RatingValue.FAN) {
      this.#rating = Rating.FAN;
    } else if (watchingCount >= RatingValue.NOVICE) {
      this.#rating = Rating.NOVICE;
    } else {
      this.#rating = Rating.NONE;
    }
  }
}

export default UserRating;
