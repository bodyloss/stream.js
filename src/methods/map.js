
module.exports = function map(observable, project) {
  return (observer) => {
    const mapObserver = {
      next: (x, idx) => observer.next(project(x, idx)),
      error: (err) => observer.error(err),
      completed: () => observer.completed()
    };
    return observable.subscribe(mapObserver);
  };
}