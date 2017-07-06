### WIP !

# ng2-right-click-menu
_Right click context menu for Angular 2+_

__DEMO__ https://msarsha.github.io/ng2-right-click-menu/

## How to use

- `npm install --save ng2-right-click-menu`
- import `ShContextMenuModule` into your app module

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
    label?: string; // as of version 0.0.11 this property is rendered as HTML
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
      label: '<span class="menu-icon">Save</span>',
      onClick: this.clickEvent
    },
    {
      label: 'Edit',
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
rtl|boolean|false|right to left support

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
1. Fork/Clone the repo.

2. Build:
  ```
  $ npm run build
  ```
  
3. From the `/dist` directory, create a symlink in the global node_modules directory to the `dist` directory of your library:
  ```
  $ cd dist
  $ npm link
  ```

4. Create a new Angular app.
  ```
    $ ng new example
  ```

5. Navigate to the `example` directory:
  ```
  $ cd example
  ``` 
  
6. From the `example` directory, link the global `ng2-right-click-menu` directory to node_modules of the `example` directory:
  ```
  $ npm link ng2-right-click-menu
  ```

7. Import the `ShContextMenuModule` in your `AppModule`:

````typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShContextMenuModule } from 'ng2-right-click-menu';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShContextMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

````

8. If you are using an Angular CLI application make sure to set up a [path mapping](https://github.com/angular/angular-cli/wiki/stories-linked-library#use-typesscript-path-mapping-for-peer-dependencies) in `/src/tsconfig.app.json` of your application:
  ```typescript
  {
    "compilerOptions": {
      // ...
      // Note: these paths are relative to `baseUrl` path.
      "paths": {
        "@angular/*": [
          "../node_modules/@angular/*"
        ]
      }
    }
  }
  ```