# Core-Value Widget Demo Client

**Project by ETH Zürich, Professur für Architektur und Bauprozess**

This repository holds basic examples on how to embed the core-value as a widget/iframe into a client system.
To embed it you need an API-Key from core-value. Please contact us if you do not have one yet.

[value-app@ethz.ch](mailto:value-app.ethz.ch)

## How to embed the core-value widget into a client system

#### Plain Javascript
1. Add a div with id «core-value-widget» and apiKey - see index.html
2. Add the stringified meta JSON as data-meta attribute
3. If you have already a project add the stringified project JSON as data-entry attribute. If you have no project yet - the core-value will return an empty default-project.
5. Add a callbackFunction for onSave action to data-callback attribute. This function should be globally available in window object
6. Add relative path to your stylesheet to data-csspath attribute
7. Load core-widget.css in head
8. Load JS init-core-widget.js at end of body

#### Typescript with VUE
1. Add a div with id «core-value-widget» and apiKey to your vue project - see WidgetPage.vue
2. Add the stringified meta JSON as data-meta attribute
3. If you have already a project add the stringified project JSON as data-entry attribute. If you have no project yet - the core-value will return an empty default-project.
5. Add a callbackFunction for onSave action to data-callback attribute. Make function globally available in window object onMounted
6. onMounted call loadWidget from init-core-widget-TS file. onBeforeUnmount unloadWidget it.
6. Add relative path to your stylesheet to data-csspath attribute
7. Load core-widget.css in head
8. import { loadWidget, unloadWidget } from '@/init-core-widget-TS';

## Content of this Repository

#### - index.html 
Example index.html file with loading DIV **#core-value-widget**. Add your api-key and a meta-object JSON.
- provides a onSaveCallback function
- loads core-widget.css and init-core-widget.js

#### - init-core-widget-JS.js - Javascript
This file loads the core-widget iframe into the client system. Load this script at the end of the body.

#### - core-widget.css
Basic css - sizes the iframe.

#### - demo-client.css
Example css for SIA. Here you can overwrite the core-value styles to fit Corporate Identity.
This css file is passed to the widget and then embedded into the iframe.
Set relative path as attribute on the loading DIV. (index.html) 

#### - demo-project.json
Example for the meta-object. Send this meta-object into the widget as attribute.
- canEdit true|false // if false project summary only is visible 
- canView true|false // if false the project is not visible at all!
- isGP true|false  // for GeneralPlanner not available yet
- roles & parts // only ARCHITECT yet
- title // project title
- userId // uuid of current user - for statistical usage

#### - WidgetPage.vue
Example Vue Template with loading DIV **#core-value-widget**. Add your api-key and a meta-object JSON.
- provides a onSaveCallback function
- import { loadWidget, unloadWidget } from '@/init-core-widget-TS';

#### - init-core-widget-TS.ts Typescript
inits core-widget as iframe into client system. Import functions loadWidget and unloadWidget, call loadWidget onMounted | call unloadWidget onBeforeUnmount



