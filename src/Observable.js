import {RangeObservable} from './RangeObservable';
import {InternalObservable} from './InternalObservable';
import {FromObservable} from './FromObservable';
import {CombineObservable} from "./CombineObservable";

export class Observable {

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