export function litRouterTrigger (event, callback) {
    const {pathname, search, hash} = event.detail;
    callback(pathname, search, hash);
}
