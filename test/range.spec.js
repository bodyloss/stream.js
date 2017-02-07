const Observable = require("../src/Observable").Observable;
const expect = require("chai").expect;

describe('Observable.range', () => {
  it('should emit a range of values then complete', () => {
    let source = Observable.range(1, 5);

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {isCompleted = true}
    });

    expect(values).to.deep.equal([1, 2, 3, 4, 5]);
    expect(isCompleted).to.be.true;
  });

  it('should pass the index on next', () => {
    let source = Observable.range(3, 8);

    let values = [];

    let subscription = source.subscribe({
      next(x, idx) {values.push(idx)},
    });

    expect(values).to.deep.equal([0, 1, 2, 3, 4, 5]);
  });
});