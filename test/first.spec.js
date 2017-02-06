import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('#first', () => {
  it('should only return the first value that matches the predicate', () => {

    let source = Observable.from([1, 2, 3, 4, 5])
      .first(x => x === 3)

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([3]);
    expect(isCompleted).to.be.true;
  });

  it('should not return any values if no input matches the predicate but should complete', () => {

    let source = Observable.from([1, 2, 3, 4, 5])
      .first(x => x === 6)

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([]);
    expect(isCompleted).to.be.true;
  });

  it('should return the first value given if no predicate is defined', () => {

    let source = Observable.from([1, 2, 3, 4, 5])
      .first()

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

});