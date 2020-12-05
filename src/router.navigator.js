import {clickTrigger} from "./triggers/click.trigger";
import {litRouterTrigger} from "./triggers/lit-router.trigger";
import {popstateTrigger} from "./triggers/popstate.trigger";

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
        this._queryParams = '';
        this._listenToNavigation();
    }

    // TODO might be source of memory leaks
    onNavigation(callback) {
        this._listeners.push(callback);
        callback(this._path, this._queryParams);
    }

    _listenToNavigation() {
        window.document.addEventListener(
            'click',
            (event) => clickTrigger(event, this._onNavigation.bind(this)));
        window.document.addEventListener(
            'lit-router-navigation',
            (event) => litRouterTrigger(event, this._onNavigation.bind(this)));
        window.addEventListener(
                'popstate',
            (event) => popstateTrigger(event, this._onNavigation.bind(this)));

        window.document.addEventListener(
            'lit-router-back',
            (event) => this._onGoBack(event));
    }

    _onNavigation(path, queryParams, hash) {
        this._path = path;
        this._queryParams = queryParams;
        this._listeners.forEach((listener) => listener(this._path, this._queryParams));
        this._updateBrowserHistory(path, queryParams, hash);
    }

    _updateBrowserHistory(pathname, search = '', hash = '', replace) {
        const historyShouldUpdate = window.location.pathname !== pathname
            || window.location.search !== search
            || window.location.hash !== hash;

        if (historyShouldUpdate) {
            const changeState = replace ? 'replaceState' : 'pushState';
            window.history[changeState](null, document.title, pathname + search + hash);
        }
    }

    _onGoBack() {
        window.history.back();
    }
}
