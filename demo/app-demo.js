import {css, html, LitElement} from "lit-element";
import '../src/components/lit-route';
import '../src/components/lit-router';
import {Users} from "./users";
import {Router} from "../src/router";

export class AppDemo extends LitElement {
    static get is() {
        return 'app-demo';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: block;
            }
            
            .header, .header-list {
                display: flex;
                align-items: center;
            }

            .header {
                height: 60px;
                background: rebeccapurple;
            }
            
            .header-item {
                list-style: none;
                margin-right: 24px;
                color: white;
            }
            
            .pages {
                padding: 20px 60px;
                min-height: calc(100vh - 60px);
                background: aliceblue;
                box-sizing: border-box;
            }
        `;
    }

    render() {
        // language=html
        return html`
            ${this._header}
            
            <div class="pages">
                <lit-router>
                    <lit-route path="/" tag-name="app-home-demo"></lit-route>
                    <lit-route path="/user/:id" tag-name="app-user-demo"></lit-route>
                </lit-router>
            </div>
        `;
    }

    get _header() {
        // language=html
        return html`                
            <div class="header">
                <ul class="header-list">
                    <li class="header-item">
                        <a href="/">Home</a>
                    </li>
                    <li class="header-item">
                        <a href="/user/1">User #1</a>
                    </li>
                    <li class="header-item">
                        <a href="/?odd=true&even=false">Users with odd ids</a>
                    </li>
                    <li class="header-item">
                        <button @click="${() => Router.back()}">Back</button>
                    </li>
                </ul>
            </div>
        `;
    }
}

export class AppUserDemo extends LitElement {
    static get is() {
        return 'app-user-demo';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: block;
            }
            
            .user {
                padding: 24px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                margin-bottom: 24px;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <h3>User page</h3>
            ${this._user ? html`
                <div class="user">
                    <p>Id: ${this._user.id}</p>
                    <p>Name: ${this._user.name}</p>
                    <p>Username: ${this._user.username}</p>
                    <p>Phone: ${this._user.phone}</p>
                </div>
            ` : 'User not found'}
        `;
    }

    static get properties() {
        return {
            _user: {
                type: Object,
            },
            routePath: {
                type: String,
            },
            routeParams: {
                type: Object,
            },
            routeQueryParams: {
                type: Object,
            },
        };
    }

    constructor() {
        super();
        this._user = null;
        this.routeQueryParams = {};
        this.routeParams = {};
        this.routePath = {};
    }

    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has('routeParams')) {
            this._user = Users
                .find(user => user.id === Number(this.routeParams['id']));
        }
    }
}

export class AppHomeDemo extends LitElement {
    static get is() {
        return 'app-home-demo';
    }

    static get styles() {
        // language=css
        return css`
            :host {
                display: block;
            }
            
            .user {
                padding: 24px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                margin-bottom: 24px;
            }
        `;
    }

    render() {
        // language=html
        return html`
            <h3>Home page</h3>
            <div class="users">
                ${this._users.map(user => html`
                    <div class="user">
                        <p>Id: ${user.id}</p>
                        <p>Name: ${user.name}</p>
                        <button @click="${() => Router.navigate(`/user/${user.id}`)}">
                            Details
                        </button>
                    </div>
                `)}
            </div>
        `;
    }

    static get properties() {
        return {
            _users: {
                type: Array,
            },
            routePath: {
                type: String,
            },
            routeParams: {
                type: Object,
            },
            routeQueryParams: {
                type: Object,
            },
        };
    }

    constructor() {
        super();
        this._users = Users;
        this.routeQueryParams = {};
        this.routeParams = {};
        this.routePath = {};
    }

    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has('routeQueryParams')) {
            this._users = this.routeQueryParams['odd'] ?
                Users.filter(user => user.id % 2 === 0) :
                Users;
        }
    }
}

customElements.define(AppDemo.is, AppDemo);
customElements.define(AppHomeDemo.is, AppHomeDemo);
customElements.define(AppUserDemo.is, AppUserDemo);
