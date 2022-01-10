import AbstractView from './abstract-view';
import {USER_AVATAR, UserRatings} from '../constants';

const getRatingTemplate = (avatar, rating) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>`;

class Rating extends AbstractView {
  #avatar = USER_AVATAR;
  #rating = UserRatings.NONE;

  get template() {
    return getRatingTemplate(this.#avatar, this.#rating);
  }

  get rating() {
    return this.#rating;
  }

  set rating(rating) {
    this.#rating = rating;
  }
}

export default Rating;
