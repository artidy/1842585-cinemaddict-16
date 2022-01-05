import AbstractSmartView from './abstract-smart-view';
import {ActionType, UpdateType} from '../constants';
import _ from 'lodash';
import dayjs from 'dayjs';
import {getRandomAuthor} from '../mock/helpers';

const getFormTemplate = () => '<form class="film-details__inner" action="" method="get"></form>';

class MovieDetailsFormView extends AbstractSmartView {
  get template() {
    return getFormTemplate();
  }

  updateElement = (addComment) => {
    this.replaceElement();
    this.clearEvents();
    this.restoreHandlers(addComment);
  }

  restoreHandlers = (addComment) => {
    this.addEvent('onKeyDownEnter', 'keydown', this.#onKeyDownEnter(addComment));
  }

  #onKeyDownEnter = (addComment) => (evt) => {
    if (evt.key === 'Enter' && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();

      const commentInput = this.element.querySelector('.film-details__comment-input');
      const text = commentInput?.value;
      const emotion = this.element.querySelector('.film-details__emoji-item:checked')?.value;

      if (!text || !emotion) {
        return;
      }

      addComment(
        ActionType.ADD_COMMENT,
        UpdateType.MINOR,
        {
          movieId: commentInput.dataset.movieId,
          id: _.uniqueId(),
          text,
          emotion,
          author: getRandomAuthor(),
          date: dayjs().toDate(),
        },
      );
    }
  }
}

export default MovieDetailsFormView;
