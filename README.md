# ng2-right-click-menu
_Right click context menu for Angular 2+_

__DEMO__ https://msarsha.github.io/ng2-right-click-menu/

### Dependencies

`@angular/cdk`

`@angular/cdk/overlay-prebuilt.css"`

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
and nesting `ng-template` with the `shContextMenuItem` directive for every menu item:

The `shContextMenuItem` directive provide a template variable (`let-data`) that gives you access to the data object attached to the menu.

````html
<sh-context-menu #menu>
  <ng-template shContextMenuItem let-data>
    <div>
      Menu Item - {{data.label}}
    </div>
  </ng-template>
</sh-context-menu>
````

#### Attaching The Menu To An Element

Attaching works by using the `shMenu` directive and providing the `#menu` template variable:

```html
<div [shAnchorFor]="menu" [shMenuData]="data">Right Click Me</div>
```


### `[sh-context]` (`IShContextMenuItem[]`)

````typescript
  interface IShContextMenuItem {
    label?: ((context: any) => string) | string; // as of version 0.0.11 this property is rendered as HTML
    divider?: boolean;
    onClick?($event: any): void;
    visible?(context: any): boolean;
    disabled?(context: any): boolean;
    subMenu?: boolean;
    subMenuItems?: IShContextMenuItem[];
}
````

Example:

````typescript
  items: IShContextMenuItem[];
  
  this.items = [
    {
      label: '<span class="menu-icon">Save</span>',
      onClick: this.clickEvent
    },
    {
      label: (context) => `Edit ${context.someVariable}`,
      onClick: this.clickEvent
    },
    {
      label: '<b>Sub</b> Menu',
      subMenu: true,
      subMenuItems: [
        {
          label: 'Save',
          onClick: this.clickEvent
        },
        {
          label: 'Edit',
          onClick: this.clickEvent
        }]
    }
    {
      divider: true
    },
    {
      label: 'Remove',
      disabled: ctx => {
        return ctx.Two === 'Two';
      },
      onClick: this.clickEvent
    },
    {
      label: (context) => `Hide ${context.name}`,
      onClick: this.clickEvent,
      visible: ctx => {
        return ctx.One === 'One';
      }
    }
  ];
  
  clickEvent($event: any){
    console.log('clicked ', $event);
  };
````

### Passing a function to the label option

You can pass either a string or a function that returns a string (using the data context as a parameter) to the `label` option of menu items. Passing a function allows the label to contain dynamic content.

### onBeforeMenuOpen (v0.0.14)

The `onBeforeMenuOpen` event can be used to cancel the menu from opening and allow to modify the menu items that will be display by the current event.

The `open()` callback is used to continue the context menu event and can be injected with the new modified `IShContextMenuItem` items array. (optional. if items array is not provided the original array defined by `[sh-context]` will be used.)

````html
<div (onBeforeMenuOpen)="onBefore($event)" [sh-context]="items" [sh-data-context]="dataCtxOne">
  Click Me !
</div>
````

component:

````typescript
onBefore = (event: BeforeMenuEvent) => {
    event.open([new items]);
  };
````

`BeforeMenuEvent` interface:
````typescript
interface BeforeMenuEvent {
  event: MouseEvent;
  items: IShContextMenuItem[];
  open(items?: IShContextMenuItem[]): void;
}
````

### Options Object (v0.0.10)

````html
<div [sh-options]="options"></div>
````

````typescript
  options: IShContextOptions = {
    // set options
  }
````

The options object is of type `IShContextOptions` and currently support the following options:

Options | Type | Default | Description
:---:|:---:|:---:|:---|
rtl|boolean|false|right to left support
theme|string|light|menu color theme

### Sub Menus (v0.0.9)

Setting the `subMenu` property to `true` and the `subMenuItems` property to a `IShContextMenuItem[]` will render a sub menu.

````typescript
{
  label: 'Sub Menu',
  subMenu: true,
  subMenuItems: [
    {
      label: 'Save',
      onClick: this.clickEvent
    },
    {
      label: 'Edit',
      onClick: this.clickEvent
    }]
}
````

#### The `onClick` handler

The `onClick` handler is a function that is being injected with `$event` parameter.

The `$event` structure is:

````typescript
  {
    menuItem: item,
    dataContext: this.dataContext
  }
````

Where the `menuItem` property is of type `IShContextMenuItem` and is the clicked menu item.

And the `dataContext` is the object used on the `[sh-data-context]` binding.


#### The `disabled` and `visible` handlers

Both get injected with the object used on the `[sh-data-context]` binding

And should return a `boolean` to indicate if the current `IShContextMenuItem` is disabled or visible.


### Setting up development env

`npm start` to run the demo application

develop the library under `/lib`
