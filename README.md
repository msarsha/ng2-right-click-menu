### WIP !

# ng2-right-click-menu
_Right click context menu for Angular 2+_


### Build
Clone the repo and run `tsc` to build.

## Installation

- `npm install ng2-right-click-menu`
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
