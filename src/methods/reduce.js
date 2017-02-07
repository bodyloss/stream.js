module.exports = function reduce(observable, accumulator, seed) {

  return (observer) => {
    let accumulatedValue = seed || null;

    const maxObserver = {
      next: (x, idx) => {
        accumulatedValue = accumulator(accumulatedValue, x, idx);
      },
      error: (err) => observer.error(err),
      completed: () => {
        observer.next(accumulatedValue);
        observer.completed();
      }
    };
    return observable.subscribe(maxObserver);
  };
}

