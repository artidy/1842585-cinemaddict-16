import {formatDate} from '../helpers/common';
import AbstractSmartView from './abstract-smart-view';
import {ActionType, UpdateType} from '../constants';

const getEmojiTemplate = (emoji) => emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">` : '';

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

const getMovieCommentsTemplate = (movieId, comments, currentEmoji, currentText) =>
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${getCommentsContent(comments)}
      </ul>

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">${getEmojiTemplate(currentEmoji)}</div>


        <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" data-movie-id="${movieId}">${currentText}</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${currentEmoji === 'smile' ? 'checked' : ''}>
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${currentEmoji === 'sleeping' ? 'checked' : ''}>
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${currentEmoji === 'puke' ? 'checked' : ''}>
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${currentEmoji === 'angry' ? 'checked' : ''}>
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>`;

class MovieDetailsCommentsView extends AbstractSmartView {
  #movieId = null;
  #comments = null;
  #currentEmoji = null;
  #currentText = '';

  constructor(movieId, comments) {
    super();

    this.#comments = comments;
    this.#movieId = movieId;
  }

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  get template() {
    return getMovieCommentsTemplate(this.#movieId, this.#comments, this.#currentEmoji, this.#currentText);
  }

  resetData = () => {
    this.#currentEmoji = null;
    this.#currentText = '';
  }

  updateElement = (deleteComment) => {
    this.replaceElement();
    this.clearEvents();
    this.restoreHandlers(deleteComment);

    if (this.#currentText) {
      const inputArea = this.element.querySelector('.film-details__comment-input');
      inputArea.focus();
      inputArea.selectionStart = inputArea.selectionEnd = inputArea.value.length;
    }
  }

  restoreHandlers = (deleteComment) => {
    this.addEvent('onClickEmoji', 'click', this.#onClickEmoji(deleteComment));
    this.addEvent('onInputText', 'input', this.#onInputText(deleteComment));
    this.addEvent('onDeleteComment', 'click', this.#onDeleteComment(deleteComment));
  }

  #onClickEmoji = (deleteComment) => (evt) => {
    evt.preventDefault();

    const emojiLabel = evt.target.closest('.film-details__emoji-label');

    if (emojiLabel) {
      this.#currentEmoji = this.element.querySelector(`#${emojiLabel.getAttribute('for')}`).value;
      this.updateData(this.#currentEmoji, true);
      this.updateElement(deleteComment);
    }
  }

  #onInputText = (deleteComment) => (evt) => {
    evt.preventDefault();

    const currentInput = this.element.querySelector('.film-details__comment-input');

    if (currentInput) {
      this.#currentText = currentInput.value;
      this.updateData(this.#currentText, true);
      this.updateElement(deleteComment);
    }
  }

  #onDeleteComment = (deleteComment) => (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      deleteComment(ActionType.DELETE_COMMENT, UpdateType.MINOR, evt.target.dataset.id);
    }
  }
}

export default MovieDetailsCommentsView;
