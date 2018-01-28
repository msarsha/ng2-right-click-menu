import { ApplicationRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Injectable, Injector, Input, NgModule, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

class HtmlDirective {
    /**
     * @param {?} elmRef
     */
    constructor(elmRef) {
        this.elmRef = elmRef;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.elmRef.nativeElement.insertAdjacentHTML('afterbegin', this.content);
    }
}
HtmlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sh-html]'
            },] },
];
/**
 * @nocollapse
 */
HtmlDirective.ctorParameters = () => [
    { type: ElementRef, },
];
HtmlDirective.propDecorators = {
    'content': [{ type: Input, args: ['sh-html',] },],
};

class ShContextOverlayComponent {
    constructor() {
        this.onClick = new EventEmitter();
    }
}
ShContextOverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'sh-context-overlay',
                template: `<div class="sh-context-overlay" (mousedown)="onClick.emit()"></div>`,
                styles: [`
    .sh-context-overlay{
      position: fixed;
      top:0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9998;
      background-color: transparent;
   }
  `]
            },] },
];
/**
 * @nocollapse
 */
ShContextOverlayComponent.ctorParameters = () => [];
ShContextOverlayComponent.propDecorators = {
    'onClick': [{ type: Output },],
};

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * \@class InjectionService
 */
class InjectionService {
    /**
     * @param {?} applicationRef
     * @param {?} componentFactoryResolver
     * @param {?} injector
     */
    constructor(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     *
     * \@memberOf InjectionService
     * @return {?}
     */
    getRootViewContainer() {
        if (this._container)
            return this._container;
        const /** @type {?} */ rootComponents = this.applicationRef['components'];
        if (rootComponents.length)
            return rootComponents[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    }
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     *
     * \@memberOf InjectionService
     * @param {?} container
     * @return {?}
     */
    setRootViewContainer(container) {
        this._container = container;
    }
    /**
     * Gets the html element for a component ref.
     *
     *
     * \@memberOf InjectionService
     * @param {?} componentRef
     * @return {?}
     */
    getComponentRootNode(componentRef) {
        return /** @type {?} */ (((componentRef.hostView)).rootNodes[0]);
    }
    /**
     * Gets the root component container html element.
     *
     *
     * \@memberOf InjectionService
     * @return {?}
     */
    getRootViewContainerNode() {
        return this.getComponentRootNode(this.getRootViewContainer());
    }
    /**
     * Projects the inputs onto the component
     *
     *
     * \@memberOf InjectionService
     * @param {?} component
     * @param {?} options
     * @return {?}
     */
    projectComponentInputs(component, options) {
        if (options) {
            const /** @type {?} */ props = Object.getOwnPropertyNames(options);
            for (const /** @type {?} */ prop of props) {
                component.instance[prop] = options[prop];
            }
        }
        return component;
    }
    /**
     * Appends a component to a adjacent location
     *
     *
     * \@memberOf InjectionService
     * @template T
     * @param {?} componentClass
     * @param {?=} options
     * @param {?=} location
     * @return {?}
     */
    appendComponent(componentClass, options = {}, location = this.getRootViewContainerNode()) {
        let /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        let /** @type {?} */ componentRef = componentFactory.create(this.injector);
        let /** @type {?} */ appRef = this.applicationRef;
        let /** @type {?} */ componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentInputs(componentRef, options);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            appRef.detachView(componentRef.hostView);
        });
        location.appendChild(componentRootNode);
        return componentRef;
    }
}
InjectionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
InjectionService.ctorParameters = () => [
    { type: ApplicationRef, },
    { type: ComponentFactoryResolver, },
    { type: Injector, },
];

const ShContextDefaultOptions = {
    rtl: false,
    theme: 'light'
};

class ShContextService {
    /**
     * @param {?} opts
     * @return {?}
     */
    setOptions(opts) {
        this.options = Object.assign({}, ShContextDefaultOptions, opts);
        return this.options;
    }
    /**
     * @return {?}
     */
    getOptions() {
        return this.options;
    }
}
ShContextService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ShContextService.ctorParameters = () => [];
class ShContextServiceModule {
}
ShContextServiceModule.decorators = [
    { type: NgModule, args: [{
                providers: [ShContextService, InjectionService]
            },] },
];
/**
 * @nocollapse
 */
ShContextServiceModule.ctorParameters = () => [];

class ShContextMenuComponent {
    /**
     * @param {?} ctxService
     */
    constructor(ctxService) {
        this.ctxService = ctxService;
        this.onClose = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.ctxService.getOptions();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.options.rtl)
            this.setRtlLocation();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getLabel(item) {
        if (typeof item.label === 'string') {
            return item.label;
        }
        else if (typeof item.label === 'function') {
            return item.label(this.dataContext);
        }
        return '';
    }
    /**
     * @return {?}
     */
    close() {
        this.onClose.emit();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onClick(item) {
        if (this.isItemDisabled(item))
            return;
        if (item.onClick) {
            this.close();
            // invoke the onClick handler with a timeout of 0,
            // so that the menu gets a chance to be closed before (screen refresh)
            this.invokeOnClickWithTimeOut(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    invokeOnClickWithTimeOut(item) {
        setTimeout(() => {
            if (item.onClick) {
                item.onClick({
                    menuItem: item,
                    dataContext: this.dataContext
                });
            }
        }, 0);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isItemDisabled(item) {
        if (!item.disabled)
            return false;
        return item.disabled(this.dataContext);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isItemVisible(item) {
        if (!item.visible)
            return true;
        return item.visible(this.dataContext);
    }
    /**
     * @return {?}
     */
    setRtlLocation() {
        const /** @type {?} */ elmRect = this.childRef.nativeElement.getClientRects()[0];
        this.position.left = this.position.left - elmRect.width;
    }
}
ShContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'sh-context-menu',
                template: `
    <div #childRef class="sh-context--container"
      [class.dark]="options.theme == 'dark'"
      [style.left]="position.left + 'px'"
      [style.top]="position.top + 'px'"
      [style.direction]="(options.rtl ? 'rtl' : 'ltr' )">
      <ul>
          <li *ngFor="let item of items"
            [ngClass]="{'sh-menu-item': !item.divider, 'sh-context-divider': item.divider, 'sh-menu-disabled': isItemDisabled(item), 'sh-menu-hidden': !isItemVisible(item)}"
            (click)="onClick(item)">
              <div *ngIf="!item.divider && !item.subMenu" [sh-html]="getLabel(item)">
              </div> 
              <div *ngIf="item.subMenu"
                [sh-context-sub-menu]="item.subMenuItems"
                [sh-data-context]="dataContext"
                (closeSubMenu)="close()"
                [sh-html]="item.label">
               <div [ngClass]="{'right-arrow': !options.rtl, 'left-arrow': options.rtl}"></div>
              </div>
          </li>
      </ul>
    </div>
`,
                styles: [`
  .sh-context--container{
    font-family: sans-serif;
    position: fixed;
    background: #ececec;
    min-width: 150px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 3px;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
    z-index: 9999;
    color: black;

    
  }
  .dark{
      background:#383737 !important;
      color:white !important;
    }
  .sh-context--container ul{
    list-style: none;
    padding: 5px 0;
    margin: 0;
  }

  .sh-context--container ul li{
      padding: 5px 10px 5px 15px;
      transition: all 0.15s;
  }

  .sh-context--container ul li.sh-context-divider{
      height: 1px;
      margin: 1px 1px 8px 1px;
      overflow: hidden;
      border-bottom: 1px solid #d0d0d0;
      line-height: 10px;
    }

  .sh-context--container ul li.sh-menu-item:hover{
      cursor: pointer;
      background: #4b8bec;
      color: white;
  }
 
   .sh-context--container.dark ul li.sh-menu-item:hover{
      cursor: pointer;
      background: #4b8bec;
      color: white;
  }
  .sh-context--container ul li.sh-menu-disabled{
      color: #d0d0d0;
   }

   .sh-context--container ul li.sh-menu-item.sh-menu-hidden{
      display: none;
   }

  .sh-context--container ul li.sh-menu-disabled:hover{
      cursor: not-allowed;
      color: #d0d0d0;
      background: #ececec;
  }

  .right-arrow{
    float: right;
    margin-left: 10px;
    margin-top: 3px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid black;
  }

  .left-arrow{
    float: left;
    margin-right: 10px;
    margin-top: 3px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 8px solid black;
  }
`]
            },] },
];
/**
 * @nocollapse
 */
ShContextMenuComponent.ctorParameters = () => [
    { type: ShContextService, },
];
ShContextMenuComponent.propDecorators = {
    'position': [{ type: Input },],
    'items': [{ type: Input },],
    'dataContext': [{ type: Input },],
    'onClose': [{ type: Output },],
    'childRef': [{ type: ViewChild, args: ['childRef',] },],
};

class ShContextMenuDirective {
    /**
     * @param {?} ctxService
     * @param {?} injectionService
     */
    constructor(ctxService, injectionService) {
        this.ctxService = ctxService;
        this.injectionService = injectionService;
        this.onBeforeMenuOpen = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this.options = this.ctxService.setOptions(this.options);
        this.closeMenu();
        if (this.contextMenuIsEmpty()) {
            return;
        }
        if (this.onBeforeMenuOpen.observers.length > 0) {
            this.onBeforeMenuOpen.emit({
                event: event,
                items: this.menuItems,
                open: (modifiedItems = this.menuItems) => this.createMenu(event, modifiedItems)
            });
        }
        else {
            this.createMenu(event);
        }
        return false;
    }
    /**
     * @param {?} event
     * @param {?=} items
     * @return {?}
     */
    createMenu(event, items = this.menuItems) {
        this.overlayComponent = this.createOverlayComponent();
        this.ctxComponent = this.createContextComponent();
        this.registerBindings(items);
        this.registerEvents();
        this.setLocation(event);
    }
    /**
     * @return {?}
     */
    registerEvents() {
        this.ctxComponent.instance.onClose.subscribe(() => {
            this.closeMenu();
        });
        this.overlayComponent.instance.onClick.subscribe(() => {
            this.closeMenu();
        });
    }
    /**
     * @param {?} menuItems
     * @return {?}
     */
    registerBindings(menuItems) {
        this.ctxComponent.instance.items = menuItems;
        this.ctxComponent.instance.dataContext = this.dataContext;
    }
    /**
     * @return {?}
     */
    createContextComponent() {
        return this.injectionService.appendComponent(ShContextMenuComponent);
    }
    /**
     * @return {?}
     */
    createOverlayComponent() {
        return this.injectionService.appendComponent(ShContextOverlayComponent);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setLocation(event) {
        let { clientX, clientY } = event;
        this.ctxComponent.instance.position = {
            top: clientY,
            left: clientX
        };
    }
    /**
     * @return {?}
     */
    closeMenu() {
        if (this.ctxComponent)
            this.ctxComponent.destroy();
        if (this.overlayComponent)
            this.overlayComponent.destroy();
    }
    /**
     * @return {?}
     */
    contextMenuIsEmpty() {
        return !this.menuItems || this.menuItems.length === 0;
    }
}
ShContextMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sh-context]'
            },] },
];
/**
 * @nocollapse
 */
ShContextMenuDirective.ctorParameters = () => [
    { type: ShContextService, },
    { type: InjectionService, },
];
ShContextMenuDirective.propDecorators = {
    'menuItems': [{ type: Input, args: ['sh-context',] },],
    'dataContext': [{ type: Input, args: ['sh-data-context',] },],
    'options': [{ type: Input, args: ['sh-options',] },],
    'onBeforeMenuOpen': [{ type: Output, args: ['onBeforeMenuOpen',] },],
    'onClick': [{ type: HostListener, args: ['contextmenu', ['$event'],] },],
};

class ShContextSubMenuDirective {
    /**
     * @param {?} viewRef
     * @param {?} elmRef
     * @param {?} resolver
     * @param {?} ctxService
     */
    constructor(viewRef, elmRef, resolver, ctxService) {
        this.viewRef = viewRef;
        this.elmRef = elmRef;
        this.resolver = resolver;
        this.ctxService = ctxService;
        this.closeSubMenu = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.options = this.ctxService.getOptions();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseOver(event) {
        this.closeCurrent();
        this.ctxComponent = this.createContextComponent();
        this.registerBindings();
        this.registerEvents();
        this.setLocation();
        return false;
    }
    /**
     * @return {?}
     */
    registerEvents() {
        this.ctxComponent.instance.onClose.subscribe(() => {
            this.closeSubMenu.emit();
        });
    }
    /**
     * @return {?}
     */
    registerBindings() {
        this.ctxComponent.instance.items = this.menuItems;
        this.ctxComponent.instance.dataContext = this.dataContext;
    }
    /**
     * @return {?}
     */
    createContextComponent() {
        let /** @type {?} */ shContextMenuFactory = this.resolver.resolveComponentFactory(ShContextMenuComponent);
        let /** @type {?} */ shContextComponentRef = this.viewRef.createComponent(shContextMenuFactory);
        return shContextComponentRef;
    }
    /**
     * @return {?}
     */
    setLocation() {
        const { top, left, width } = this.elmRef.nativeElement.getClientRects()[0];
        let /** @type {?} */ position = {
            top: top,
            left: this.options.rtl ? left : left + width
        };
        this.ctxComponent.instance.position = position;
    }
    /**
     * @return {?}
     */
    closeMenu() {
        this.closeSubMenu.emit();
    }
    /**
     * @return {?}
     */
    closeCurrent() {
        this.viewRef.clear();
    }
}
ShContextSubMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sh-context-sub-menu]'
            },] },
];
/**
 * @nocollapse
 */
ShContextSubMenuDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: ComponentFactoryResolver, },
    { type: ShContextService, },
];
ShContextSubMenuDirective.propDecorators = {
    'menuItems': [{ type: Input, args: ['sh-context-sub-menu',] },],
    'dataContext': [{ type: Input, args: ['sh-data-context',] },],
    'closeSubMenu': [{ type: Output },],
    'onMouseOver': [{ type: HostListener, args: ['mouseover', ['$event'],] },],
};

class ShContextMenuModule {
}
ShContextMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ShContextMenuDirective,
                    ShContextMenuComponent,
                    ShContextSubMenuDirective,
                    ShContextOverlayComponent,
                    HtmlDirective
                ],
                exports: [ShContextMenuDirective],
                imports: [
                    CommonModule,
                    ShContextServiceModule
                ],
                entryComponents: [
                    ShContextMenuComponent,
                    ShContextOverlayComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
ShContextMenuModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { ShContextMenuModule, HtmlDirective as ɵh, InjectionService as ɵd, ShContextMenuComponent as ɵe, ShContextMenuDirective as ɵa, ShContextOverlayComponent as ɵg, ShContextService as ɵb, ShContextServiceModule as ɵc, ShContextSubMenuDirective as ɵf };
//# sourceMappingURL=ng2-right-click-menu.js.map
