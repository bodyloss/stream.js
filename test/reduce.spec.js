const Observable = require("../src/Observable").Observable;
const expect = require("chai").expect;

describe('#reduce', () => {
  it('should reduce an observable down using an accumulator', () => {

    let source = Observable.range(1, 5)
      .reduce((acc, curr, idx) => acc + curr);

    let values = [];
    let isCompletedCalls = 0;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompletedCalls++;
      }
    });

    expect(values).to.deep.equal([15]);
    expect(isCompletedCalls).to.equal(1);
  });

  it('should reduce an observable down using an accumulator and seed value', () => {

    let source = Observable.range(1, 5)
      .reduce((acc, curr, idx) => acc + curr, 10);

    let values = [];
    let isCompletedCalls = 0;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompletedCalls++;
      }
    });

    expect(values).to.deep.equal([25]);
    expect(isCompletedCalls).to.equal(1);
  });


});