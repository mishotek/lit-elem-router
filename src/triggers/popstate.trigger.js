export function popstateTrigger(event, callback) {
    const {pathname, search, hash} = window.location;
    callback(pathname, search, hash);
}
