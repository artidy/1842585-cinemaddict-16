import AbstractView from './abstract-view';

const getRatingTemplate = ({avatar, rating}) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>`;

class Rating extends AbstractView {
  #user = {
    avatar: '',
    rating: '',
  };

  constructor(user) {
    super();
    this.#user = user;
  }

  get template() {
    return getRatingTemplate(this.#user);
  }
}

export default Rating;
