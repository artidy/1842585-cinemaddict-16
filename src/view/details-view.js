import {formatDate} from '../helpers/common';
import AbstractEventView from './abstract-event-view';
import {EMPTY_MOVIE} from '../constants';

const getGenresContent = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const getCommentsContent = (comments) => comments.map(({id, text, emotion, author, date}) =>
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${formatDate(date, 'YYYY/MM/DD HH:mm')}</span>
        <button class="film-details__comment-delete" data-id="${id}">Delete</button>
      </p>
    </div>
  </li>`).join('');

const getDetailsTemplate = ({
  poster,
  title,
  originalTitle,
  rating,
  director,
  screenWriters,
  actors,
  releaseDate,
  duration,
  country,
  genres,
  description,
  maturityRating,
  isInWatchlist,
  isWatched,
  isFavorite
}, comments) =>
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${title}">

            <p class="film-details__age">${maturityRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenWriters.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatDate(releaseDate, 'DD MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${getGenresContent(genres)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button
            type="button"
            class="film-details__control-button film-details__control-button--watchlist ${isInWatchlist ? 'film-details__control-button--active' : ''}"
            id="watchlist"
            name="watchlist"
          >${isInWatchlist ? 'Already in watchlist' : 'Add to watchlist'}</button>
          <button
            type="button"
            class="film-details__control-button film-details__control-button--watched ${isWatched ? 'film-details__control-button--active' : ''}"
            id="watched"
            name="watched"
          >${isWatched ? 'Already watched' : 'Add to watched'}</button>
          <button
            type="button"
            class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}"
            id="favorite"
            name="favorite"
          >${isFavorite ? 'Already favorite' : 'Add to favorites'}</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${getCommentsContent(comments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;

class MovieDetails extends AbstractEventView {
  #comments = [];
  #movie = EMPTY_MOVIE;

  constructor(movie, comments) {
    super();
    this.#movie = movie;
    this.#comments = comments;
  }

  get template() {
    return getDetailsTemplate(this.#movie, this.#comments);
  }

  #toggleWatchlist = () => {
    this.#movie.isInWatchlist = !this.#movie.isInWatchlist;
    console.log("click");
  }

  #toggleWatched = () => {
    this.#movie.isWatched = !this.#movie.isWatched;
  }

  #toggleFavorite = () => {
    this.#movie.isFavorite = !this.#movie.isFavorite;
  }

  removeElement = () => {
    super.removeElement();
    document.body.classList.remove('hide-overflow');
  }

  onClickControls = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      switch(evt.target.getAttribute('name')) {
        case 'watchlist':
          this.#toggleWatchlist();
          return;
        case 'watched':
          this.#toggleWatched();
          return;
        case 'favorite':
          this.#toggleFavorite();
      }
    }
  }
}

export default MovieDetails;
