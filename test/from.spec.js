import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('Observable.from', () => {
  it('should emit the input array in order', () => {
    const input = [1, 2, 3, 4, 5];

    let source = Observable.from(input);

    let values = [];
    let isCompleted;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {isCompleted = true}
    });

    expect(values).to.deep.equal(input);
    expect(isCompleted).to.be.true;
  });

  it('should emit the input array-like object in order', () => {

    let source = Observable.from({
      0: 2,
      1: 3,
      2: 4,
      3: 5,
      length: 4
    });

    let values = [];
    let isCompleted;

    let subscription = source.subscribe({
      next(x) { values.push(x) },
      error() { },
      completed() { isCompleted = true }
    });

    expect(values).to.deep.equal([2, 3, 4, 5]);
    expect(isCompleted).to.be.true;
  });

  it('should pass the index along', () => {
    const input = [3, 4, 5, 6, 7, 8];

    let source = Observable.from(input);

    let values = [];

    let subscription = source.subscribe({
      next(x, idx) {
        values.push(idx)
      },
    });

    expect(values).to.deep.equal([0, 1, 2, 3, 4, 5]);
  });
});