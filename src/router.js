export class Router {
    static navigate(path, queryParams = '', hash = '') {
        this._dispatchEvent('navigation', {
            pathname: path,
            search: queryParams,
            hash,
        });
    }

    static back() {
        this._dispatchEvent('back');
    }

    static _dispatchEvent(type, detail = {}) {
        const event = new CustomEvent(`lit-router-${type}`, {
            detail
        });

        window.document.dispatchEvent(event);
    }
}
