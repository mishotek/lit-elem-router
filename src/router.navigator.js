export class RouterNavigator {
    static getInstance() {
        if (!RouterNavigator._INSTANCE) {
            RouterNavigator._INSTANCE = new RouterNavigatorSingleton();
        }
        return RouterNavigator._INSTANCE;
    }
}

class RouterNavigatorSingleton {
    constructor() {
        this._listeners = [];
        this._path = '';
        this._onHashChange();
        this._listenToNavigation();
    }

    onNavigation(callback) {
        this._listeners.push(callback);
        callback(this._path);
    }

    _listenToNavigation() {
        window.onhashchange = this._onHashChange.bind(this);
    }

    _onHashChange() {
        this._path = this._hashToPath(decodeURIComponent(window.location.hash));
        this._listeners.forEach((listener) => listener(this._path));
    }

    _hashToPath(hash) {
        return hash.slice(1);
    }
}
