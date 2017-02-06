import {Observable} from "../src/Observable";
import {expect} from "chai";

describe('Basic observable', () => {

  it('should be able to create a basic observable that returns a single value and then completes and can be disposed', () => {
    let disposedCalled = false;

    let source = Observable.create((observer) => {
      observer.next(42);
      observer.completed();

      return () => {
        disposedCalled = true;
      }
    });

    let nextValue = 0;
    let completedCalled = false;

    let subscription = source.subscribe({
       next(x) { nextValue = x; },
       error(e) { console.error('error: %s', e); },
       completed() { completedCalled = true; }
    });

    expect(nextValue).to.equal(42);
    expect(completedCalled).to.be.true;

    subscription.dispose();
    expect(disposedCalled).to.be.true;
  });

  it('should call the error handler if an error is raised', () => {
    const message = "this should be handled";

    let source = Observable.create((observer) => {
      observer.error(message);
    });

    let error = "not set yet";
    source.subscribe({
      error(err) {error = err}
    });

    expect(error).to.equal(message);
  });

  it('should not cause an exception if no error handler is given but an error is raised', () => {
    let source = Observable.create((observer) => {
      observer.error("this should be unhandled but not cause an exception");

      return () => {
      }
    });

    let subscription = source.subscribe();
  });

  it('should not cause an exception if no next callback is given', () => {
    let source = Observable.create((observer) => {
      observer.next("this shouldn't cause an exception");

      return () => {
      }
    });

    let subscription = source.subscribe();
  });

  it('should not cause an exception if the datasource does not provide a dispose function', () => {
    let source = Observable.create((observer) => { });

    let subscription = source.subscribe();
    subscription.dispose();
  });
});