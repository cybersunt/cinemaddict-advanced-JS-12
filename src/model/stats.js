import Observer from "../utils/observer.js";
import {StatsFilterType} from "../const.js";

export default class StatsFilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = StatsFilterType.ALL;
  }

  set(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get() {
    return this._activeFilter;
  }
}
