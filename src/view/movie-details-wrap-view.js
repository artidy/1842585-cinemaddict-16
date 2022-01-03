import AbstractView from './abstract-view';
import {formatDate} from '../helpers/common';
import {EMPTY_MOVIE} from '../constants';

const getGenresContent = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const getMoviesWrapTemplate = ({poster, title, maturityRating, originalTitle, rating, director,
  screenWriters, actors, releaseDate, duration, country, genres, description}) =>
  `<div class="film-details__info-wrap">
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
  </div>`;

class MovieDetailsWrap extends AbstractView {
  #movie = EMPTY_MOVIE;

  constructor() {
    super();
  }

  get template() {
    return getMoviesWrapTemplate(this.#movie);
  }

  get movie() {
    return this.#movie;
  }

  set movie(movie) {
    this.#movie = movie;
  }
}

export default MovieDetailsWrap;
