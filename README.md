# Core-Value Widget - how to integrate it into the client system

**Project by ETH Zürich, Professur für Architektur und Bauprozess**

This repository holds basic examples on how to embed the core-value as a widget/iframe into a client system.
You need an API-Key from core-value. Please contact us if you do not have one yet.

[value-app@ethz.ch](mailto:value-app.ethz.ch)

## How to embed the core-value widget into a client system

#### Plain Javascript
1. Add a div with id «core-value-widget» and your apiKey - see [index.html](./index.html).
2. Add the stringified meta JSON as data-meta attribute - see [demo-project.json](./demo-project.json).
3. (Optional) If you have already a project add the stringified project JSON as data-entry attribute. If you have no project yet - the core-value will return an empty default-project.
5. Add a callbackFunction for onSave action to data-callback attribute - see [index.html](./index.html).
6. (Optional) Add relative path to your stylesheet to data-csspath attribute. Here you can overwrite the core-value styles to fit Corporate Identity. - [demo-client.css](./demo-client.css).
7. Load core-widget.css in head -  [core-widget.css](./core-widget.css).
8. Load JS init-core-widget.js at end of body - [init-core-widget-JS.js](./init-core-widget-JS.js).

#### Typescript with VUE
1. Add a div with id «core-value-widget» and apiKey to your vue project - see [WidgetPage.vue](./WidgetPage.vue).
2. Add the stringified meta JSON as data-meta attribute - see [demo-project.json](./demo-project.json).
3. (Optional) If you have already a project add the stringified project JSON as data-entry attribute. If you have no project yet - the core-value will return an empty default-project.
4. Add a callbackFunction for onSave action to data-callback attribute. Make function globally available in window object onMounted - see [WidgetPage.vue](./WidgetPage.vue).
5. Import and Call «loadWidget» (onMounted) and «unloadWidget» (onBeforeUnmount) from [init-core-widget-TS](./init-core-widget-TS.ts) - see [WidgetPage.vue](./WidgetPage.vue).
6. (Optional) Add relative path to your stylesheet to data-csspath attribute. Here you can overwrite the core-value styles to fit Corporate Identity. - [demo-client.css](./demo-client.css).
7. Add general iframe style - see [WidgetPage.vue](./WidgetPage.vue).

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
- parts: ['ARHCITECT']// defines which parts are available (setup & service) - only ARCHITECT yet
- title: 'Project Title' // project title
- userId: 'de000000-0000-0000-0000-000000000000' // uuid of current user - for statistical purposes






