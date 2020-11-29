# lit-elem-router
Simple, lightweight router written to be used with web components. Supports lazy loading.

## Usage
Install the package
```
npm i lit-elem-router
```
Import router in your component class
```javascript
import 'lit-elem-router';
```
Create a layout for your page
```html
<lit-router>
    <lit-route path="/">
        root
    </lit-route>
    <lit-route path="/register">
        auth
    </lit-route>
    <lit-route path="/login">
        login
    </lit-route>
</lit-router>
```
> Router uses hash navigation, so path to 'register' page will be /#/register and not /register. If you don't want to add /#/ to every href, you can use ```<lit-router-link>``` instead of ```<a>```, it will just add /#/ to the href for you.

You can nest routers
```html
<lit-router>
    <lit-route path="/">
        root
    </lit-route>
    <lit-route path="/auth">
        auth
        <lit-router>
            <lit-route path="/auth/register">
                auth
            </lit-route>
            <lit-route path="/auth/login">
                login
            </lit-route>
        <lit-router>
    </lit-route>
</lit-router>
```

Lazy loading can be done by listening to the route activation:
```html
<lit-router>
    <lit-route path="/" @activate="${this._loadHome}">
        <app-home-page></app-home-page>
    </lit-route>
    <lit-route path="/register" @activate="${this._loadRegister}">
        <app-register-page></app-register-page>
    </lit-route>
</lit-router>
```

Now you can load your components:
```javascript
function _loadHome() {
    import('./pages/app-home-page');
}
```

If you want a default route, that will be activated if nothing else matches the path, you can use ````**``` as a fragment in your path
```html
<lit-router>
    <lit-route path="/home">
        <app-home-page></app-home-page>
    </lit-route>
    <lit-route path="/register">
        <app-register-page></app-register-page>
    </lit-route>
    <lit-route path="/**">
        <app-404-page></app-404-page>
    </lit-route>
</lit-router>
```