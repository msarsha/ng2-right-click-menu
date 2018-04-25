## ng2-right-click-menu
_Right click context menu for Angular 2+_

__DEMO__ https://msarsha.github.io/ng2-right-click-menu/

### Dependencies

`@angular/cdk`

`@angular/cdk/overlay-prebuilt.css`

### Setup

`npm install --save ng2-right-click-menu @angular/cdk`

import `ShContextMenuModule`

````typescript
import {ShContextMenuModule} from 'ng2-right-click-menu'

@NgModule({
  //...
  imports: [ShContextMenuModule]
  //...
})
````

import css file in your `styles.css`:

````css
  @import "~@angular/cdk/overlay-prebuilt.css";
````

## Usage

#### Defining a Basic Menu Template

The menu template is built using the `sh-context-menu` component as the menu wrapper,
and nested `ng-template` with the `shContextMenuItem` directive for every menu item:

The `shContextMenuItem` directive provide a template variable (`let-data`) that gives you access to the data object attached to the menu.

````html
<sh-context-menu #menu>
  <ng-template shContextMenuItem let-data (click)="onClick($event)">
    <div>
      Menu Item - {{data.label}}
    </div>
  </ng-template>
</sh-context-menu>
````

#### Attaching Menu To An Element

Attaching works by using the `shAttachMenu` directive and providing the `#menu` (from the above example) template variable:

The object provided to the `[shMenuData]` input will be available as a template variable inside `ng-template`s with `shContextMenuItem`

```html
<div [shAttachMenu]="menu" [shMenuData]="data">Right Click Me</div>
```

## Sub Menus

Sub menu is attached to the `shContextMenuItem` directive using the `[subMenu]` input.

The `[subMenu]` input is provided with a `sh-context-menu`'s template variable (just like attaching a menu to an element).

````html
<sh-context-menu #menu>
  <ng-template shContextMenuItem [subMenu]="#nestedMenu">
    <div>
      Menu Item - {{data.label}}
    </div>
  </ng-template>
  <sh-context-menu #nestedMenu>
    <ng-template shContextMenuItem let-data>
      <div>
        Menu Item - {{data.label}}
      </div>
    </ng-template>
  </sh-context-menu>
</sh-context-menu>
````

## API

#### sh-context-menu

Name | Type | Default | Description
:---:|:---:|:---:|:---:
[this]|any|null|the `this` context for input callbacks (visible) - typically the menu's host component

#### shContextMenuItem

Name | Type | Default | Description
:---:|:---:|:---:|:---:
[subMenu]|ShContextMenuComponent|null|sub menu
[divider]|boolean|false|render a divider
[closeOnClick]|boolean|true|should the menu close on click
[visible]|(event: ShContextMenuClickEvent) => boolean|null|function to determine if a item is visible
(click)|ShContextMenuClickEvent|null|click handler

#### shAttachMenu

Name | Type | Default | Description
:---:|:---:|:---:|:---:
[shAttachMenu]|ShContextMenuComponent|null|the menu that will be attached to the element
[shMenuTriggers]|string[]|null|list of event names that will trigger the menu
[shMenuData]|any|null|the data object that will be injected to the menu item's template

### Setting up development env

`npm start` to run the demo application

develop the library under `/lib`
