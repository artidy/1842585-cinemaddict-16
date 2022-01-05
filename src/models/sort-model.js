import AbstractObservable from './abstract-observable';
import {SortType} from '../constants';

class SortModel extends AbstractObservable {
  #currentSort = SortType.DEFAULT;

  set currentSort(currentSort) {
    this.#currentSort = currentSort;
  }

  get currentSort() {
    return this.#currentSort;
  }

  updateSort = (updateType, currentSort) => {

    if (this.#currentSort === currentSort) {
      return;
    }

    this.#currentSort = currentSort;

    this._notify(updateType, currentSort);
  }
}

export default SortModel;
