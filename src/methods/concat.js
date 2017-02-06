import {InternalObservable} from '../InternalObservable';
import {Observable} from '../Observable';

export function concat(observable, inputs) {
  let observables = inputs.map(x => {
    if (x.length) {
      return Observable.from(x);
    }
    return x;
  });

  return new InternalObservable((observer) => {
    let currentIndex = -1;

    const concatObserver = {
      next: (x, idx) => observer.next(x, idx),
      error: (err) => observer.error(err),
      completed: () => {
        if (currentIndex < observables.length - 1) {
          currentIndex++;
          observables[currentIndex].subscribe(concatObserver);
        } else {
          observer.completed()
        }
      }
    };

    return observable.subscribe(concatObserver);
  });
}