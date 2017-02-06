import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('#scan', () => {
  it('should emit the accumulated value for each value passed in', () => {

    let source = Observable.range(1, 4)
      .scan((acc, curr, idx) => acc + curr)

    let values = [];
    let isCompletedCalls = 0;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompletedCalls++;
      }
    });

    expect(values).to.deep.equal([1, 3, 6, 10]);
    expect(isCompletedCalls).to.equal(1);
  });

  it('should emit the accumulated value for each value passed in when using a seed', () => {

    let source = Observable.range(1, 4)
      .scan((acc, curr, idx) => acc + curr, 10)

    let values = [];
    let isCompletedCalls = 0;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompletedCalls++;
      }
    });

    expect(values).to.deep.equal([11, 13, 16, 20]);
    expect(isCompletedCalls).to.equal(1);
  });
});