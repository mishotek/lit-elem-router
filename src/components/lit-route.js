import {LitElement, css, html} from 'lit-element';

export class LitRoute extends LitElement {
    static get is() {
        return 'lit-route';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: block;
            }
        `;
    }

    render() {
        // language=html
        return html``;
    }

    static get properties() {
        return {
            path: {
                type: String,
            },
            tagName: {
                type: String,
                reflect: true,
                attribute: 'tag-name',
            },
            active: {
                type: Boolean,
                reflect: true,
            },
            _nodeCreated: {
                type: Boolean,
            }
        };
    }

    activate(params = {}, queryParams = {}) {
        this.active = true;

        if (!this._nodeCreated) {
            this._createNode();
            this._nodeCreated = true;
        }

        this._setParams(this.path, params, queryParams);
        this._notifyActivation();
    }

    deactivate() {
        this.active = false;

        if (this._nodeCreated) {
            this._removeNode();
            this._nodeCreated = false;
        }

        this._notifyDeactivation();
    }

    _createNode() {
        const node = document.createElement(this.tagName);
        this.shadowRoot.appendChild(node);
    }

    _removeNode() {
        this.shadowRoot.innerHTML = '';
    }

    _setParams(path, params, queryParams) {
        const node = this._node;
        node.routePath = typeof path === 'string' ? path : '';
        node.routeParams = typeof params === 'object' ? params : {};
        node.routeQueryParams = typeof queryParams === 'object' ? queryParams : {};
    }

    _notifyActivation() {
        this.dispatchEvent(new CustomEvent('activate'));
    }

    _notifyDeactivation() {
        this.dispatchEvent(new CustomEvent('deactivate'));
    }

    get _node() {
        return this.shadowRoot.childNodes[0];
    }
}

customElements.define(LitRoute.is, LitRoute);
