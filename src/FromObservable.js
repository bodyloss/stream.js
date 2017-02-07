const InternalObservable = require('./InternalObservable');

function FromObservable(input) {
  if (input.length && input.length > 0) {
    return new InternalObservable((observer) => {
      for (let i = 0, l = input.length; i < l; ++i) {
        observer.next(input[i]);
      }
      observer.completed();
    });
  } else {
    throw 'Input is not array-like';
  }
}

module.exports = FromObservable;