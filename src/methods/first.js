import {InternalObservable} from '../InternalObservable';

export function first(observable, predicate) {
  const predicateToUse = predicate || (() => true);

  return new InternalObservable((observer) => {
    const firstObserver = {
      next: (x, idx) => {
        if (predicateToUse(x, idx)) {
          observer.next(x, idx);
          observer.completed();
        }
      },
      error: (err) => observer.error(err),
      completed: () => observer.completed()
    };
    return observable.subscribe(firstObserver);
  });
}