
module.exports = function concat(observable, inputs) {
  return (observer) => {
    let currentIndex = -1;

    const concatObserver = {
      next: (x, idx) => observer.next(x, idx),
      error: (err) => observer.error(err),
      completed: () => {
        if (currentIndex < inputs.length - 1) {
          currentIndex++;
          inputs[currentIndex].subscribe(concatObserver);
        } else {
          observer.completed()
        }
      }
    };

    return observable.subscribe(concatObserver);
  };
}