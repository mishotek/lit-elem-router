# THIS IS NOT FINISHED PACKAGE PLEASE CONTACT ME BEFORE USAGE mtekt16@freeuni.edu.ge

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
    <lit-route path="/" tag-name="app-home"></lit-route>
    <lit-route path="/register" tag-name="app-register"></lit-route>
    <lit-route path="/login" tag-name="app-login"></lit-route>
</lit-router>
```
> Router uses hash navigation, so path to 'register' page will be /#/register and not /register. If you don't want to add /#/ to every href, you can use ```<lit-router-link>``` instead of ```<a>```, it will just add /#/ to the href for you.

You can nest routers
```html
<lit-router>
    <lit-route path="/" tag-name="app-home"></lit-route>
    <lit-route path="/auth" tag-name="app-auth"></lit-route>
</lit-router>
```
Now in AppAuth.js you can have
```html
<lit-router>
    <lit-route path="/auth/register" tag-name="app-register"></lit-route>
    <lit-route path="/auth/login" tag-name="app-login"></lit-route>
<lit-router>
```


Lazy loading can be done by listening to the route activation:
```html
<lit-router>
    <lit-route path="/"
               tag-name="app-home-page"
               @activate="${this._loadHome}"></lit-route>
    <lit-route path="/register"
               tag-name="app-register-page"
               @activate="${this._loadRegister}">
    </lit-route>
</lit-router>
```
Now you can load your components:
```javascript
function _loadHome() {
    import('./pages/app-home-page');
}
```

If you want a default route, that will be activated if nothing else matches the path, you can use ```**``` as a fragment in your path
```html
<lit-router>
    <lit-route path="/home" tag-name="app-home-page"></lit-route>
    <lit-route path="/register" tag-name="app-register-page"></lit-route>
    <lit-route path="/**" tag-name="app-404-page"></lit-route>
</lit-router>
```
