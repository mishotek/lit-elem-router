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
        return this.active ? html`<slot id="contents"></slot>` : '';
    }

    static get properties() {
        return {
            path: {
                type: String,
            },
            active: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    activate(params = {}, queryParams = {}) {
        this.active = true;
        this._notifyActivation();

        setTimeout(() => {
            this._setParams(this.path, params, queryParams);
        }, 100);
    }

    deactivate() {
        this.active = false;
        this._notifyDeactivation();
    }

    _setParams(path, params, queryParams) {
        this.shadowRoot.getElementById('contents')
            .assignedNodes()
            .filter(this._isHtmlNode)
            .forEach((node) => {
                node.routePath = typeof path === 'object' ? path : {};
                node.routeParams = typeof params === 'object' ? params : {};
                node.routeQueryParams = typeof queryParams === 'object' ? queryParams : {};
            });
    }

    _notifyActivation() {
        this.dispatchEvent(new CustomEvent('activate'));
    }

    _notifyDeactivation() {
        this.dispatchEvent(new CustomEvent('deactivate'));
    }

    _isHtmlNode(node) {
        return node.nodeType !== Node.TEXT_NODE;
    }
}

customElements.define(LitRoute.is, LitRoute);
