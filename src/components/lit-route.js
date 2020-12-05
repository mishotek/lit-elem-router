import {LitElement, css} from 'lit-element';

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
            _node: {
                type: Object,
            }
        };
    }

    activate(params = {}, queryParams = {}) {
        this.active = true;

        if (!this._node) {
            this._node = this._createNode();
        }

        this._setParams(this.path, params, queryParams);
        this._notifyActivation();
    }

    deactivate() {
        this.active = false;

        if (this._node) {
            this._removeNode();
            this._node = null;
        }

        this._notifyDeactivation();
    }

    _createNode() {
        const node = document.createElement(this.tagName);
        this.shadowRoot.appendChild(node);
        return node;
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
        this.dispatchEvent(new CustomEvent('activate', {
            detail: {
                path: this.path,
                tagName: this.tagName,
                node: this._node,
            }
        }));
    }

    _notifyDeactivation() {
        this.dispatchEvent(new CustomEvent('deactivate'));
    }
}

customElements.define(LitRoute.is, LitRoute);
