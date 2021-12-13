import AbstractEventView from './abstract-event-view';

const getShowMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreBtnView extends AbstractEventView {
  get template() {
    return getShowMoreTemplate();
  }
}

export default ShowMoreBtnView;
