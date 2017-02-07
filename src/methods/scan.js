/*
  compareValue: 1 or -1, decides the ordering to use
 */
module.exports = function scan(observable, accumulator, seed) {

  return (observer) => {
    let accumulatedValue = seed || null;

    const scanObserver = {
      next: (x, idx) => {
        accumulatedValue = accumulator(accumulatedValue, x, idx);
        observer.next(accumulatedValue, idx);
      },
      error: (err) => observer.error(err),
      completed: () => observer.completed()
    };

    return observable.subscribe(scanObserver);
  };
}

