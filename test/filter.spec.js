import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('#filter', () => {
  it('should only return values that pass the predicate', () => {

    let source = Observable.range(1, 5)
      .filter(x => x <= 3)

    let values = [];
    let isCompleted = false;

    let subscription = source.subscribe({
      next(x) {values.push(x)},
      error() {},
      completed() {
        isCompleted = true
      }
    });

    expect(values).to.deep.equal([1, 2, 3]);
    expect(isCompleted).to.be.true;
  });
});