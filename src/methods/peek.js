import {InternalObservable} from '../InternalObservable';

export function peek(observable, peekFunction) {
  return new InternalObservable((observer) => {
    const peekObserver = {
      next: (x, idx) => {
        peekFunction(x, idx);
        observer.next(x, idx)
      },
      error: (err) => observer.error(err),
      completed: () => observer.completed()
    };

    return observable.subscribe(peekObserver);
  });
}