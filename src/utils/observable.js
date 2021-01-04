export class Observable {

    constructor() {
        this._listeners = new Set();
    }

    subscribe(callback) {
        this._listeners.add(callback);
        return new Subscription(this, callback);
    }

    next(...values) {
        this._listeners.forEach((callback) => callback(...values));
    }
}

export class Subscription {
    constructor(observable, callback) {
        this._observable = observable;
        this._callback = callback;
    }

    unsubscribe() {
        this._observable._listeners.delete(this._callback);
    }
}