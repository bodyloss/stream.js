import {InternalObservable} from '../InternalObservable';

const defaultComparer = (x, y) => {
  if (x > y) {
    return 1;
  } else if (x < y) {
    return -1;
  }
  return 0;
}

/*
  compareValue: 1 or -1, decides the ordering to use
 */
export function compare(observable, compareValue, customComparer) {
  const comparisonFunc = customComparer || defaultComparer;

  return new InternalObservable((observer) => {
    let currentValue, currentIndex;

    const compareObserver = {
      next: (x, idx) => {
        if (currentValue === undefined|| comparisonFunc(x, currentValue) === compareValue) {
          currentValue = x;
          currentIndex = idx;
        }
      },
      error: (err) => observer.error(err),
      completed: () => {
        observer.next(currentValue, currentIndex);
        observer.completed();
      }
    };
    return observable.subscribe(compareObserver);
  });
}

