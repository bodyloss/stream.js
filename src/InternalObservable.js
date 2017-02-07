const SafeObserver = require('./SafeObserver');

const map = require('./methods/map');
const first = require('./methods/first');
const compare = require('./methods/compare');
const concat = require('./methods/concat');
const peek = require('./methods/peek');
const reduce = require("./methods/reduce");
const scan = require("./methods/scan");
const filter = require("./methods/filter");


class InternalObservable {

  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }

  map(project) {
    return new InternalObservable(map(this, project));
  }

  first(predicate) {
    return new InternalObservable(first(this, predicate));
  }

  max(customComparer) {
    return new InternalObservable(compare(this, 1, customComparer));
  }

  min(customComparer) {
    return new InternalObservable(compare(this, -1, customComparer));
  }

  concat(...observables) {
    return new InternalObservable(concat(this, observables));
  }

  peek(peeker) {
    return new InternalObservable(peek(this, peeker));
  }

  reduce(accumulator, seed) {
    return new InternalObservable(reduce(this, accumulator, seed));
  }

  scan(accumulator, seed) {
    return new InternalObservable(scan(this, accumulator, seed));
  }

  filter(predicate) {
    return new InternalObservable(filter(this, predicate));
  }

  subscribe(observer) {
    const safeObserver = new SafeObserver(observer || {});
    safeObserver.unsub = this._subscribe(safeObserver);
    return {
      dispose: safeObserver.unsubscribe.bind(safeObserver)
    };
  }
}

module.exports = InternalObservable;