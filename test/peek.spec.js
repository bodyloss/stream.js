const Observable = require("../src/Observable").Observable;
const expect = require("chai").expect;

describe('#peek', () => {
  it('should run a function on every value emitted', () => {
    const input = [1, 2, 3, 4, 5];

    let peekedValues = [];
    let source = Observable.from(input)
      .peek(x => peekedValues.push(x))

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([1, 2, 3, 4, 5]);
    expect(peekedValues).to.deep.equal([1, 2, 3, 4, 5]);
    expect(isCompleted).to.be.true;
  });
});