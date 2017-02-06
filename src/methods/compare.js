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
    let currentMaxValue, currentMaxIndex;

    const maxObserver = {
      next: (x, idx) => {
        if (currentMaxValue === undefined|| comparisonFunc(x, currentMaxValue) === compareValue) {
          currentMaxValue = x;
          currentMaxIndex = idx;
        }
      },
      error: (err) => observer.error(err),
      completed: () => {
        observer.next(currentMaxValue, currentMaxIndex);
        observer.completed();
      }
    };
    return observable.subscribe(maxObserver);
  });
}

