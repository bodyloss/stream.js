import {InternalObservable} from './InternalObservable';

export class IntervalObservable extends InternalObservable {

  constructor(frequency) {
    super((observer) => {
      for (let i = 0; i < input.length; i++) {
        observer.next(input[i]);
      }
      observer.completed();
    });
  }
}