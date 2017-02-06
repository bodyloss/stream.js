import {InternalObservable} from './InternalObservable';

export class RangeObservable extends InternalObservable {

  constructor(start, end) {
    const datasource = (observer) => {
      for (let i = start; i <= end; i++) {
        observer.next(i);
      }
      observer.completed();
    };

    super(datasource);
  }
}