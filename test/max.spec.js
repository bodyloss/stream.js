import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('#max', () => {
  it('should return the maximum value of those passed', () => {

    let source = Observable.from([1, 2, 9, 3, 4, 5])
      .max()

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([9]);
    expect(isCompleted).to.be.true;
  });

  it('should return the index of the maximum', () => {

    let source = Observable.from([1, 2, 9, 3, 4, 5])
      .max()

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x, idx) {values.push(idx)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([2]);
    expect(isCompleted).to.be.true;
  });

  it('should return the first maximum value if there are two maximums', () => {

    let source = Observable.from([1, 2, 9, 3, 4, 9, 5])
      .max()

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x, idx) {values.push(idx)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([2]);
    expect(isCompleted).to.be.true;
  });

  it('should return the maximum value of those passed using a custom compare', () => {

    let source = Observable.from(['a', 'aa', 'aaa', 'a'])
      .max((x, y) => {
        if (x.length > y.length) {
          return 1;
        } else if (x.length < y.length) {
          return -1;
        }
        return 0;
      });

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal(['aaa']);
    expect(isCompleted).to.be.true;
  });

});