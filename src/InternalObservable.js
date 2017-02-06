import {SafeObserver} from './SafeObserver';
import {map} from './methods/map';
import {first} from './methods/first';
import {compare} from './methods/compare';
import {concat} from './methods/concat';
import {peek} from './methods/peek';
import {reduce} from "./methods/reduce";


export class InternalObservable {

  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }

  map(project) {
    return map(this, project);
  }

  first(predicate) {
    return first(this, predicate);
  }

  max(customComparer) {
    return compare(this, 1, customComparer);
  }

  min(customComparer) {
    return compare(this, -1, customComparer);
  }

  concat(...observables) {
    return concat(this, observables);
  }

  peek(peeker) {
    return peek(this, peeker);
  }

  reduce(accumulator, seed) {
    return reduce(this, accumulator, seed);
  }

  subscribe(observer) {
    const safeObserver = new SafeObserver(observer || {});
    safeObserver.unsub = this._subscribe(safeObserver);
    return {
      dispose: safeObserver.unsubscribe.bind(safeObserver)
    };
  }
}