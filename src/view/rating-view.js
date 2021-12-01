import {createElement} from '../render';

const getRatingTemplate = ({avatar, rating}) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>`;

class Rating {
  #element = null;
  #user = {
    avatar: '',
    rating: '',
  };

  constructor(user) {
    this.#user = user;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getRatingTemplate(this.#user);
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}

export default Rating;
