module.exports = function first(observable, predicate) {
  const predicateToUse = predicate || (() => true);

  return (observer) => {
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
  };
}