
export class SafeObserver {

  constructor(destination) {
    this.destination = destination;
    this.index = 0;
  }

  next(value, index) {
    if (!this.isUnsubscribed && this.destination.next) {
      this.destination.next(value, index || this.index++);
    }
  }

  completed() {
    if (!this.isUnsubscribed && this.destination.completed) {
      this.destination.completed();
      this.unsubscribe();
    }
  }

  error(error) {
    if (!this.isUnsubscribed && this.destination.error) {
      this.destination.error(error);
    }
  }

  unsubscribe() {
    this.isUnsubscribed = true;
    if (this.unsub) {
      this.unsub();
    }
  }
}