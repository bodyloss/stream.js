import {InternalObservable} from './InternalObservable';

export class FromObservable extends InternalObservable {

  constructor(input) {
    if (input.length && input.length > 0) {
      super((observer) => {
        for (let i = 0; i < input.length; i++) {
          observer.next(input[i]);
        }
        observer.completed();
      });
    } else {
      throw 'Input is not array-like';
    }

  }
}