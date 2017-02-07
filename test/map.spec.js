const Observable = require("../src/Observable").Observable;
const expect = require("chai").expect;

describe('#map', () => {
  it('should transform every value', () => {
    const input = [1, 2, 3, 4, 5];

    let source = Observable.from(input)
      .map(x => x + 1)

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([2, 3, 4, 5, 6]);
    expect(isCompleted).to.be.true;
  });

  it('should have access to the index of the value being operated on', () => {
    const input = [1, 2, 3, 4, 5];

    let source = Observable.from(input)
      .map(x => x + 1)

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([2, 3, 4, 5, 6]);
    expect(isCompleted).to.be.true;
  });
});