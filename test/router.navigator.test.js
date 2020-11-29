import {RouterNavigator} from '../src/router.navigator';

test('Two instances of navigator should be the same object', () => {
    const navigator1 = RouterNavigator.getInstance();
    const navigator2 = RouterNavigator.getInstance();

    expect(navigator1).toBe(navigator2);
});

test('On navigation should add callback to listeners', () => {
    const navigator = RouterNavigator.getInstance();
    navigator.onNavigation(() => {});
    expect(navigator._listeners.length).toBe(1);
});

test('Callback should be called once on navigation', () => {
    let counter = 0;
    const navigator = RouterNavigator.getInstance();
    navigator.onNavigation(() => { counter++; });
    navigator._onHashChange();
    setTimeout(() => expect(counter).toBe(1), 5);
})