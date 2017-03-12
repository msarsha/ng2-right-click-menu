### WIP !

# ng2-right-click-menu
_Right click context menu for Angular 2+_

__DEMO__ https://msarsha.github.io/ng2-right-click-menu/

### Build
Clone the repo and run `npm run build` to build.

## Installation

- `npm install --save ng2-right-click-menu`
- import `ShContextMenuModule` into your app module


## How to use

Add the `[sh-context]` directive to the desired element and bind an `IShContextMenuItem` array.

Use the `[sh-data-context]` property to inject a context object of type `any`.

````html
<div class="box" [sh-context]="menuItems" [sh-data-context]="dataObject">
  // content
</div>
````

### `[sh-context]` (`IShContextMenuItem[]`)

````typescript
  interface IShContextMenuItem {
    label?: string;
    divider?: boolean;
    onClick?($event: any): void;
    visible?(context: any): boolean;
    disabled?(context: any): boolean;
    subMenu?: boolean;
    subMenuItems?: IShContextMenuItem[];Ï
}
````

Example:

````typescript
  items: IShContextMenuItem[];
  
  this.items = [
    {
      label: 'Save',
      onClick: this.clickEvent
    },
    {
      label: 'Edit',
      onClick: this.clickEvent
    },
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
      label: 'Hidden',
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
rtl|boolen|false|right to left support

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

And should return a `boolen` to indicate if the current `IShContextMenuItem` is disabled or visible.
