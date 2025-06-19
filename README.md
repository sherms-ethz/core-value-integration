# Core-Value Widget - how to integrate

**Project by ETH Zürich, Professur für Architektur und Bauprozess**

This repository holds basic examples on how to embed the core-value as a widget/iframe into a client system.
An API-Key from core-value is required.

## How to embed the core-value widget into a client system

### Plain Javascript
1. Add a div with id «core-value-widget» and your apiKey - see [index.html](./index.html).
2. Add the stringified meta JSON as data-meta attribute - see [demo-project.json](./demo-project.json).
3. (Optional) If you have already a project add the stringified project JSON as data-entry attribute. If you have no project yet - the core-value will return an empty default-project.
4. (Optional) Add relative path to your stylesheet as data-csspath attribute. Here you can overwrite the core-value styles to fit Corporate Identity. - [demo-client.css](./demo-client.css).
5. (Optional) Add a nonce if you use shared secret based authentication 16-char long random string and timestamp in seconds.
6. (Optional) Add the hashed message containing th apiKey and the nonce to the data-message attribute if you use shared secret based authentication
7. Add a callbackFunction for onSave action to data-callback attribute - see [index.html](./index.html).
8. Load JS init-core-widget.js at end of body - [init-core-widget-JS.js](./init-core-widget-JS.js).
9. Load core-widget.css in head -  [core-widget.css](./core-widget.css).

### Typescript with VUE
1. Add a div with id «core-value-widget» and apiKey to your vue project - see [WidgetPage.vue](./WidgetPage.vue).
2. Add the other data-attributes as described in previous chapter Plain Javascript Step 2 - 6.
3. Add a callbackFunction for onSave action to data-callback attribute. Make function globally available in window object onMounted - see [WidgetPage.vue](./WidgetPage.vue).
4. Import and Call «loadWidget» (onMounted) and «unloadWidget» (onBeforeUnmount) from [init-core-widget-TS](./init-core-widget-TS.ts) - see [WidgetPage.vue](./WidgetPage.vue).
5. Add general iframe style - see [WidgetPage.vue](./WidgetPage.vue).

## Content of this Repository
| File | Content                                                                                                                                                | Example             |
|------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| index.html | Loads div **#core-value-widget** / provides a onSaveCallback function / loads core-widget.css and init-core-widget-JS.js                               | Plain Javascript    |
| init-core-widget-JS.js | Initializes the iframe into the client system. You do not have to edit anything here.                                                                  | Plain Javascript    |
| core-widget.css | Basic css - sizes the iframe.                                                                                                                          | Plain Javascript    |
| demo-client.css | Example css for SIA. Here you can overwrite the core-value styles to fit Corporate Identity. It is fetched by core-value and embedded into the iframe. | All                 |
| demo-project.json | Example for the meta-object. Send this meta-object into the widget as attribute.                                                                       | All                 |
| WidgetPage.vue | Vue Template with loading div **#core-value-widget** / provides a onSaveProject function / imports init-core-widget-TS.ts                              | Typescript with vue |
| init-core-widget-TS.ts | Initializes the iframe into the client system. Provides the functions loadWidget and unloadWidget                                                      | Typescript with vue |

## project-meta
The project-meta object describes die role(s) and permissions for each user.
The client system is responsible for the user and the project management.
The core-value won't change this object.
- canEdit:  true | false // if false only project summary is visible | if true general part can be edited (Description)
- canView: true | false // if false the project is not visible at all! | if true summary is visible
- isGP: true | false  // for Design Contractor - not in use yet
- roles: ['ARHCITECT'] // if role is set user can edit setup and service part - only ARCHITECT yet
- parts: ['ARHCITECT'] // defines which parts are available (setup & service) - only ARCHITECT yet
- title: 'Project Title' // project title
- userId: 'de000000-0000-0000-0000-000000000000' // uuid of current user - for statistical purposes

## Widget Authentication with Shared Secret-Based Authentication

To secure your widget using shared secret-based authentication, you need to send a **nonce** and 
a **HMAC message** (Hash-based Message Authentication Code). 
Contact us to enable this authentication level, and share your secret with us.

Here is an example for a Backend-Service Implementation with crypto that returns the HMAC Message and the nonce for you.

Alternative you can 
- install crypto-js (npm install crypto-js) 
- uncomment and use the createNonce and hashMessage functions in [init-core-widget-JS.js](./init-core-widget-JS.js).

### Create a nonce
Combine a 16-char long random string and the timestamp in seconds.
```js
const createNonce = function() {
    const nonce = crypto.randomBytes(16).toString('hex');
    const now = Math.floor(Date.now() / 1000); // Timestamp in seconds !
    return `${nonce}:${now}`;
}
```
- add nonce to the div #core-value-widget using the data-nonce attribute.
- use same nonce to create the hash message

### Create the HMAC Message
The HMAC message is generated using your API key, the nonce, and the shared secret.
```js
const hashMessage = function(nonce: string, apiKey: string, sharedSecret: string) {
    const message = apiKey + nonce; // Nonce generated in the previous step
    return crypto.createHmac('sha256', sharedSecret).update(message).digest('hex');
}
```
- Add the hashed message to the div #core-value-widget using the data-message attribute.




