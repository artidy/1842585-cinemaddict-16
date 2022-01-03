import AbstractObservable from './abstract-observable';
import {FilterType} from '../constants';

class FilterModel extends AbstractObservable {
  #currentFilter = FilterType.All;

  set currentFilter(currentFilter) {
    this.#currentFilter = currentFilter;
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  updateFilter = (updateType, currentFilter) => {

    if (this.#currentFilter === currentFilter) {
      return;
    }

    this.#currentFilter = currentFilter;

    this._notify(updateType, currentFilter);
  }
}

export default FilterModel;
