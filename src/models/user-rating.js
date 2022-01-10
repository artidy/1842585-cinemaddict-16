import {RatingValues, UserRatings} from '../constants';

class UserRating {
  #rating =  UserRatings.NONE;

  get rating() {
    return this.#rating;
  }

  changeRating = (watchingCount) => {
    if (watchingCount >= RatingValues.MOVIE_BUFF) {
      this.#rating = UserRatings.MOVIE_BUFF;
    } else if (watchingCount >= RatingValues.FAN) {
      this.#rating = UserRatings.FAN;
    } else if (watchingCount >= RatingValues.NOVICE) {
      this.#rating = UserRatings.NOVICE;
    } else {
      this.#rating = UserRatings.NONE;
    }
  }
}

export default UserRating;
