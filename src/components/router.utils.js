export class RouterUtils {
    static get PARAM_REGEX() {
        return /^:[A-Za-z_]+[A-Za-z0-9_]*$/;
    };

    static isMatchingPath(routePath, navigationPath) {
        const routePathFragments = RouterUtils.pathToFragments(routePath);
        const navigationPathFragments = RouterUtils.pathToFragments(navigationPath);

        if (routePathFragments.length > navigationPathFragments) {
            return false;
        }

        for (let i = 0; i < routePathFragments.length; i++) {
            const routePathFragment = routePathFragments[i];
            const navigationPathFragment = navigationPathFragments[i];
            const fragmentMatches = RouterUtils
                .isFragmentMatching(routePathFragment, navigationPathFragment);

            const isLastFragment = i === routePathFragments.length - 1;
            const isValidFallback = !isLastFragment && RouterUtils
                .isFragmentFallback(routePathFragment);

            const validFragment = fragmentMatches || isValidFallback;
            if (!validFragment) {
                return false;
            }
        }

        return true;
    }

    static isFallbackPath(routePath, navigationPath) {
        const routePathFragments = RouterUtils.pathToFragments(routePath);
        const navigationPathFragments = RouterUtils.pathToFragments(navigationPath);

        if (routePathFragments.length > navigationPathFragments) {
            return false;
        }

        const lastFragmentIsFallback = RouterUtils
            .isFragmentFallback(routePathFragments[routePathFragments.length - 1]);

        if (!lastFragmentIsFallback) {
            return false;
        }

        for (let i = 0; i < routePathFragments.length - 1; i++) {
            const routePathFragment = routePathFragments[i];
            const navigationPathFragment = navigationPathFragments[i];

            const fragmentMatches = RouterUtils
                .isFragmentMatching(routePathFragment, navigationPathFragment);
            const isValidFallback = RouterUtils
                .isFragmentFallback(routePathFragment);

            const validFragment = fragmentMatches || isValidFallback;
            if (!validFragment) {
                return false;
            }
        }

        return true;
    }

    static isFragmentMatching(routePathFragment, navigationPathFragment) {
        const isParam = RouterUtils.isFragmentParam(routePathFragment);
        if (isParam) return true;
        return routePathFragment === navigationPathFragment;
    }

    static isFragmentParam(fragment) {
        return fragment && fragment.match(RouterUtils.PARAM_REGEX);
    }

    static isFragmentFallback(fragment) {
        return fragment === '**';
    }

    static pathToFragments(path) {
        return path ? path
            .split('/')
            .filter((fragment) => !!fragment) :
            [];
    }

    static getFragmentCount(path) {
        return RouterUtils.pathToFragments(path).length;
    }
}
