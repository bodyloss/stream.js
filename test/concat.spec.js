import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('#concat', () => {
  it('should emit the outputs of the inputted observables, one after another', () => {

    let source = Observable.from([1, 2])
      .concat(Observable.from([3, 4]), Observable.from([5, 6]))

    let values = [];
    let isCompletedCalls = 0;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompletedCalls++;
      }
    });

    expect(values).to.deep.equal([1, 2, 3, 4, 5, 6]);
    expect(isCompletedCalls).to.equal(1);
  });

  it('should emit the outputs of the inputted arrays, one after another', () => {

    let source = Observable.from([1, 2])
      .concat([3, 4], [5, 6])

    let values = [];
    let isCompletedCalls = 0;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompletedCalls++;
      }
    });

    expect(values).to.deep.equal([1, 2, 3, 4, 5, 6]);
    expect(isCompletedCalls).to.equal(1);
  });

  it('should accept a mixture of arrays and observables', () => {

    let source = Observable.from([1, 2])
      .concat([3, 4], Observable.from([5, 6]))

    let values = [];
    let isCompletedCalls = 0;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompletedCalls++;
      }
    });

    expect(values).to.deep.equal([1, 2, 3, 4, 5, 6]);
    expect(isCompletedCalls).to.equal(1);
  });

});