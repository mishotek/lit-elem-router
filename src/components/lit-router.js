import {LitElement, css, html} from 'lit-element';
import {LitRoute} from './lit-route';
import {RouterUtils} from '../router.utils';
import {RouterNavigator} from '../router.navigator';
export * from './lit-route';
export * from './lit-router-link';

export class LitRouter extends LitElement {
    static get is() {
        return 'lit-router';
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
        return html`
            <slot id="route-slot"></slot>
        `;
    }

    static get properties() {
        return {};
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        RouterNavigator
            .getInstance()
            .onNavigation(this._navigate.bind(this));
    }

    _navigate(path) {
        const routeNodes = this._getRouteNodes();
        const routeToActivate = this._findRouteToActivate(routeNodes, path);

        routeNodes.forEach((routeNode) => {
            const isRouteToActivate = routeNode === routeToActivate;
            if (!isRouteToActivate) {
                routeNode.deactivate();
            }
        });

        if (routeToActivate) {
            routeToActivate.activate();
        }
    }

    _findRouteToActivate(routeNodes, path) {
        const matchingRouteNodes = routeNodes
            .filter((routeNode) => this._isMatchingPath(routeNode.path, path));
        const matchingRouteNode = this._getLongestMatch(matchingRouteNodes);

        if (matchingRouteNode) {
            return matchingRouteNode;
        }

        const fallbackNodes = routeNodes
            .filter((routeNode) => this._isFallback(routeNode.path, path));
        return this._getLongestMatch(fallbackNodes);
    }

    _getLongestMatch(routeNodes) {
        const withLength = (node) => ({node, count: RouterUtils.getFragmentCount(node.path)});
        const longestNodeReducer = (acc, curr) => acc.count < curr.count ? curr : acc;

        return routeNodes
            .map(withLength)
            .reduce(longestNodeReducer, {node: null, count: -1})
            .node;
    }

    _isMatchingPath(routePath, navigationPath) {
        return RouterUtils.isMatchingPath(routePath, navigationPath);
    }

    _isFallback(routePath, navigationPath) {
        return RouterUtils.isFallbackPath(routePath, navigationPath);
    }

    _isRouteNode(node) {
        return node.nodeName === LitRoute.is.toUpperCase();
    }

    _getRouteNodes() {
        return this.shadowRoot
            .getElementById('route-slot')
            .assignedNodes()
            .filter(this._isRouteNode);
    }
}

customElements.define(LitRouter.is, LitRouter);
