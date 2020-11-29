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
    }

    deactivate() {
        this.active = false;
    }
}

customElements.define(LitRoute.is, LitRoute);
