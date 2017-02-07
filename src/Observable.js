const RangeObservable = require('./RangeObservable');
const InternalObservable = require('./InternalObservable');
const FromObservable = require('./FromObservable');

class Observable {

  static create(dataSource) {
    return new InternalObservable(dataSource);
  }

  static range(start, end) {
    return new RangeObservable(start, end);
  }

  static from(arrayLike) {
    return new FromObservable(arrayLike);
  }

  static of(...args) {
    return new FromObservable(args);
  }

  static return(value) {
    return new FromObservable([value]);
  }

  static combine(...observables) {
    return new CombineObservable(observables);
  }
}

module.exports.Observable = Observable;