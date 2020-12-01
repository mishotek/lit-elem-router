import {LitElement, css, html} from 'lit-element';

export class LitRouterLink extends LitElement {
    static get is() {
        return 'lit-router-link';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: inline-block;
            }
            
            .text {
                color: inherit;
                text-decoration: none;
            }
        `;
    }

    render() {
        // language=html
        return html`<a class="text" href="/#${this.href}"><slot></slot></a>`;
    }

    static get properties() {
        return {
            href: {
                type: 'string',
                reflect: true,
            },
        };
    }

    constructor() {
        super();
        this.href = '';
    }
}

customElements.define(LitRouterLink.is, LitRouterLink);
