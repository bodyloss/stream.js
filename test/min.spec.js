import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('#min', () => {
  it('should return the minimum value of those passed', () => {

    let source = Observable.from([3, 1, 9, 3, 4, 5])
      .min()

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([1]);
    expect(isCompleted).to.be.true;
  });

  it('should return the index of the minimum', () => {

    let source = Observable.from([3, 1, 9, 3, 4, 5])
      .min()

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x, idx) {values.push(idx)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([1]);
    expect(isCompleted).to.be.true;
  });

  it('should return the first minimum value if there are two minimums', () => {

    let source = Observable.from([2, 1, 9, 1, 4, 9, 5])
      .min()

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x, idx) {values.push(idx)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([1]);
    expect(isCompleted).to.be.true;
  });

  it('should return the minium value of those passed using a custom compare', () => {

    let source = Observable.from(['aa', 'a', 'aaa', 'a'])
      .min((x, y) => {
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

    expect(values).to.deep.equal(['a']);
    expect(isCompleted).to.be.true;
  });

});