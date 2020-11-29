import {RouterUtils} from '../src/router.utils';

test('pathToFragments should correctly parse', () => {
    expect(RouterUtils.pathToFragments('/hello/:world/something'))
        .toEqual(['hello', ':world', 'something']);
});

test('getFragmentCount should return 0 when given null', () => {
    expect(RouterUtils.getFragmentCount(null)).toBe(0);
});

test('getFragmentCount should return correct count', () => {
    expect(RouterUtils.getFragmentCount('/hello/:world/something')).toBe(3);
});

test('isFragmentFallback should return true', () => {
    expect(RouterUtils.isFragmentFallback('**')).toBeTruthy();
});

test('isFragmentFallback should return false', () => {
    expect(RouterUtils.isFragmentFallback('rame')).toBeFalsy();
});

test('isFragmentParam should return true', () => {
    expect(RouterUtils.isFragmentParam(':id')).toBeTruthy();
});

test('isFragmentParam should return false', () => {
    expect(RouterUtils.isFragmentParam('id')).toBeFalsy();
});

test('isFragmentMatching should return true for same fragments', () => {
    expect(RouterUtils.isFragmentMatching('id', 'id')).toBeTruthy();
});

test('isFragmentMatching should return true for id param', () => {
    expect(RouterUtils.isFragmentMatching(':id', 'rame')).toBeTruthy();
});

test('isFragmentMatching should return false for different fragments', () => {
    expect(RouterUtils.isFragmentMatching('rame', 'rume')).toBeFalsy();
});

test('Same paths must match', () => {
    const routePath = '/hi';
    const navigationPath = '/hi';
    expect(RouterUtils.isMatchingPath(routePath, navigationPath)).toBeTruthy();
});

test('Different paths must not match', () => {
    const routePath = '/hi';
    const navigationPath = '/hello';
    expect(RouterUtils.isMatchingPath(routePath, navigationPath)).toBeFalsy();
});

test('Should match routePath with variable', () => {
    const routePath = '/:id';
    const navigationPath = '/myId';
    expect(RouterUtils.isMatchingPath(routePath, navigationPath)).toBeTruthy();
});

test('Should not match navigationPath with variable', () => {
    const routePath = '/someId';
    const navigationPath = '/:id';
    expect(RouterUtils.isMatchingPath(routePath, navigationPath)).toBeFalsy();
});

test('Should not match longer route', () => {
    const routePath = '/someId/another/andAnother';
    const navigationPath = '/someId';
    expect(RouterUtils.isMatchingPath(routePath, navigationPath)).toBeFalsy();
});

test('Should match route with fallback', () => {
    const routePath = '/someId/**/andAnother';
    const navigationPath = '/someId/rame/andAnother';
    expect(RouterUtils.isMatchingPath(routePath, navigationPath)).toBeTruthy();
});

test('Should match a fallback path', () => {
    const routePath = '/**';
    const navigationPath = '/something';
    expect(RouterUtils.isFallbackPath(routePath, navigationPath)).toBeTruthy();
});

test('Should not match a fallback path with root', () => {
    const routePath = '/**';
    const navigationPath = '/';
    expect(RouterUtils.isFallbackPath(routePath, navigationPath)).toBeFalsy();
});

test('Should match a fallback path with param', () => {
    const routePath = '/**';
    const navigationPath = '/:id';
    expect(RouterUtils.isFallbackPath(routePath, navigationPath)).toBeTruthy();
});

test('Should match a long path', () => {
    const routePath = '/rame/**';
    const navigationPath = '/rame/rume';
    expect(RouterUtils.isFallbackPath(routePath, navigationPath)).toBeTruthy();
});

test('Should match multiple fallback paths', () => {
    const routePath = '/**/rume/**';
    const navigationPath = '/rame/rume/:ramme';
    expect(RouterUtils.isFallbackPath(routePath, navigationPath)).toBeTruthy();
});

test('Should match route without fallback framgent in the end', () => {
    const routePath = '/**/rume';
    const navigationPath = '/rame/rume';
    expect(RouterUtils.isFallbackPath(routePath, navigationPath)).toBeFalsy();
});

test('Should match route without matching fragment', () => {
    const routePath = '/rume/magaria/**';
    const navigationPath = '/rume/dzaan/rame';
    expect(RouterUtils.isFallbackPath(routePath, navigationPath)).toBeFalsy();
});