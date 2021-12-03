import AbstractView from './abstract-view';

const getShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMore extends AbstractView {
  get template() {
    return getShowMoreTemplate();
  }
}

export {ShowMore};
