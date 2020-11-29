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
        return this.active ? html`<slot></slot>` : '';
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

    activate() {
        this.active = true;
        this._notifyActivation();
    }

    deactivate() {
        this.active = false;
        this._notifyDeactivation();
    }

    _notifyActivation() {
        this.dispatchEvent(new CustomEvent('activate'));
    }

    _notifyDeactivation() {
        this.dispatchEvent(new CustomEvent('deactivate'));
    }
}

customElements.define(LitRoute.is, LitRoute);
