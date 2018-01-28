import { ApplicationRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Injectable, Injector, Input, NgModule, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
var HtmlDirective = /** @class */ (function () {
    /**
     * @param {?} elmRef
     */
    function HtmlDirective(elmRef) {
        this.elmRef = elmRef;
    }
    /**
     * @return {?}
     */
    HtmlDirective.prototype.ngAfterContentInit = function () {
        this.elmRef.nativeElement.insertAdjacentHTML('afterbegin', this.content);
    };
    return HtmlDirective;
}());
HtmlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sh-html]'
            },] },
];
/**
 * @nocollapse
 */
HtmlDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
HtmlDirective.propDecorators = {
    'content': [{ type: Input, args: ['sh-html',] },],
};
var ShContextOverlayComponent = /** @class */ (function () {
    function ShContextOverlayComponent() {
        this.onClick = new EventEmitter();
    }
    return ShContextOverlayComponent;
}());
ShContextOverlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'sh-context-overlay',
                template: "<div class=\"sh-context-overlay\" (mousedown)=\"onClick.emit()\"></div>",
                styles: ["\n    .sh-context-overlay{\n      position: fixed;\n      top:0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      z-index: 9998;\n      background-color: transparent;\n   }\n  "]
            },] },
];
/**
 * @nocollapse
 */
ShContextOverlayComponent.ctorParameters = function () { return []; };
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
var InjectionService = /** @class */ (function () {
    /**
     * @param {?} applicationRef
     * @param {?} componentFactoryResolver
     * @param {?} injector
     */
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
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
    InjectionService.prototype.getRootViewContainer = function () {
        if (this._container)
            return this._container;
        var /** @type {?} */ rootComponents = this.applicationRef['components'];
        if (rootComponents.length)
            return rootComponents[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     *
     * \@memberOf InjectionService
     * @param {?} container
     * @return {?}
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     *
     * \@memberOf InjectionService
     * @param {?} componentRef
     * @return {?}
     */
    InjectionService.prototype.getComponentRootNode = function (componentRef) {
        return /** @type {?} */ (((componentRef.hostView)).rootNodes[0]);
    };
    /**
     * Gets the root component container html element.
     *
     *
     * \@memberOf InjectionService
     * @return {?}
     */
    InjectionService.prototype.getRootViewContainerNode = function () {
        return this.getComponentRootNode(this.getRootViewContainer());
    };
    /**
     * Projects the inputs onto the component
     *
     *
     * \@memberOf InjectionService
     * @param {?} component
     * @param {?} options
     * @return {?}
     */
    InjectionService.prototype.projectComponentInputs = function (component, options) {
        if (options) {
            var /** @type {?} */ props = Object.getOwnPropertyNames(options);
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var prop = props_1[_i];
                component.instance[prop] = options[prop];
            }
        }
        return component;
    };
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
    InjectionService.prototype.appendComponent = function (componentClass, options, location) {
        if (options === void 0) { options = {}; }
        if (location === void 0) { location = this.getRootViewContainerNode(); }
        var /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var /** @type {?} */ componentRef = componentFactory.create(this.injector);
        var /** @type {?} */ appRef = this.applicationRef;
        var /** @type {?} */ componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentInputs(componentRef, options);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            appRef.detachView(componentRef.hostView);
        });
        location.appendChild(componentRootNode);
        return componentRef;
    };
    return InjectionService;
}());
InjectionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
InjectionService.ctorParameters = function () { return [
    { type: ApplicationRef, },
    { type: ComponentFactoryResolver, },
    { type: Injector, },
]; };
var ShContextDefaultOptions = {
    rtl: false,
    theme: 'light'
};
var ShContextService = /** @class */ (function () {
    function ShContextService() {
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    ShContextService.prototype.setOptions = function (opts) {
        this.options = Object.assign({}, ShContextDefaultOptions, opts);
        return this.options;
    };
    /**
     * @return {?}
     */
    ShContextService.prototype.getOptions = function () {
        return this.options;
    };
    return ShContextService;
}());
ShContextService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ShContextService.ctorParameters = function () { return []; };
var ShContextServiceModule = /** @class */ (function () {
    function ShContextServiceModule() {
    }
    return ShContextServiceModule;
}());
ShContextServiceModule.decorators = [
    { type: NgModule, args: [{
                providers: [ShContextService, InjectionService]
            },] },
];
/**
 * @nocollapse
 */
ShContextServiceModule.ctorParameters = function () { return []; };
var ShContextMenuComponent = /** @class */ (function () {
    /**
     * @param {?} ctxService
     */
    function ShContextMenuComponent(ctxService) {
        this.ctxService = ctxService;
        this.onClose = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ShContextMenuComponent.prototype.ngOnInit = function () {
        this.options = this.ctxService.getOptions();
    };
    /**
     * @return {?}
     */
    ShContextMenuComponent.prototype.ngAfterContentInit = function () {
        if (this.options.rtl)
            this.setRtlLocation();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.getLabel = function (item) {
        if (typeof item.label === 'string') {
            return item.label;
        }
        else if (typeof item.label === 'function') {
            return item.label(this.dataContext);
        }
        return '';
    };
    /**
     * @return {?}
     */
    ShContextMenuComponent.prototype.close = function () {
        this.onClose.emit();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.onClick = function (item) {
        if (this.isItemDisabled(item))
            return;
        if (item.onClick) {
            this.close();
            // invoke the onClick handler with a timeout of 0,
            // so that the menu gets a chance to be closed before (screen refresh)
            this.invokeOnClickWithTimeOut(item);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.invokeOnClickWithTimeOut = function (item) {
        var _this = this;
        setTimeout(function () {
            if (item.onClick) {
                item.onClick({
                    menuItem: item,
                    dataContext: _this.dataContext
                });
            }
        }, 0);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.isItemDisabled = function (item) {
        if (!item.disabled)
            return false;
        return item.disabled(this.dataContext);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.isItemVisible = function (item) {
        if (!item.visible)
            return true;
        return item.visible(this.dataContext);
    };
    /**
     * @return {?}
     */
    ShContextMenuComponent.prototype.setRtlLocation = function () {
        var /** @type {?} */ elmRect = this.childRef.nativeElement.getClientRects()[0];
        this.position.left = this.position.left - elmRect.width;
    };
    return ShContextMenuComponent;
}());
ShContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'sh-context-menu',
                template: "\n    <div #childRef class=\"sh-context--container\"\n      [class.dark]=\"options.theme == 'dark'\"\n      [style.left]=\"position.left + 'px'\"\n      [style.top]=\"position.top + 'px'\"\n      [style.direction]=\"(options.rtl ? 'rtl' : 'ltr' )\">\n      <ul>\n          <li *ngFor=\"let item of items\"\n            [ngClass]=\"{'sh-menu-item': !item.divider, 'sh-context-divider': item.divider, 'sh-menu-disabled': isItemDisabled(item), 'sh-menu-hidden': !isItemVisible(item)}\"\n            (click)=\"onClick(item)\">\n              <div *ngIf=\"!item.divider && !item.subMenu\" [sh-html]=\"getLabel(item)\">\n              </div> \n              <div *ngIf=\"item.subMenu\"\n                [sh-context-sub-menu]=\"item.subMenuItems\"\n                [sh-data-context]=\"dataContext\"\n                (closeSubMenu)=\"close()\"\n                [sh-html]=\"item.label\">\n               <div [ngClass]=\"{'right-arrow': !options.rtl, 'left-arrow': options.rtl}\"></div>\n              </div>\n          </li>\n      </ul>\n    </div>\n",
                styles: ["\n  .sh-context--container{\n    font-family: sans-serif;\n    position: fixed;\n    background: #ececec;\n    min-width: 150px;\n    border: 1px solid rgba(0,0,0,0.2);\n    border-radius: 3px;\n    box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);\n    z-index: 9999;\n    color: black;\n\n    \n  }\n  .dark{\n      background:#383737 !important;\n      color:white !important;\n    }\n  .sh-context--container ul{\n    list-style: none;\n    padding: 5px 0;\n    margin: 0;\n  }\n\n  .sh-context--container ul li{\n      padding: 5px 10px 5px 15px;\n      transition: all 0.15s;\n  }\n\n  .sh-context--container ul li.sh-context-divider{\n      height: 1px;\n      margin: 1px 1px 8px 1px;\n      overflow: hidden;\n      border-bottom: 1px solid #d0d0d0;\n      line-height: 10px;\n    }\n\n  .sh-context--container ul li.sh-menu-item:hover{\n      cursor: pointer;\n      background: #4b8bec;\n      color: white;\n  }\n \n   .sh-context--container.dark ul li.sh-menu-item:hover{\n      cursor: pointer;\n      background: #4b8bec;\n      color: white;\n  }\n  .sh-context--container ul li.sh-menu-disabled{\n      color: #d0d0d0;\n   }\n\n   .sh-context--container ul li.sh-menu-item.sh-menu-hidden{\n      display: none;\n   }\n\n  .sh-context--container ul li.sh-menu-disabled:hover{\n      cursor: not-allowed;\n      color: #d0d0d0;\n      background: #ececec;\n  }\n\n  .right-arrow{\n    float: right;\n    margin-left: 10px;\n    margin-top: 3px;\n    border-top: 6px solid transparent;\n    border-bottom: 6px solid transparent;\n    border-left: 8px solid black;\n  }\n\n  .left-arrow{\n    float: left;\n    margin-right: 10px;\n    margin-top: 3px;\n    border-top: 6px solid transparent;\n    border-bottom: 6px solid transparent;\n    border-right: 8px solid black;\n  }\n"]
            },] },
];
/**
 * @nocollapse
 */
ShContextMenuComponent.ctorParameters = function () { return [
    { type: ShContextService, },
]; };
ShContextMenuComponent.propDecorators = {
    'position': [{ type: Input },],
    'items': [{ type: Input },],
    'dataContext': [{ type: Input },],
    'onClose': [{ type: Output },],
    'childRef': [{ type: ViewChild, args: ['childRef',] },],
};
var ShContextMenuDirective = /** @class */ (function () {
    /**
     * @param {?} ctxService
     * @param {?} injectionService
     */
    function ShContextMenuDirective(ctxService, injectionService) {
        this.ctxService = ctxService;
        this.injectionService = injectionService;
        this.onBeforeMenuOpen = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ShContextMenuDirective.prototype.onClick = function (event) {
        var _this = this;
        this.options = this.ctxService.setOptions(this.options);
        this.closeMenu();
        if (this.contextMenuIsEmpty()) {
            return;
        }
        if (this.onBeforeMenuOpen.observers.length > 0) {
            this.onBeforeMenuOpen.emit({
                event: event,
                items: this.menuItems,
                open: function (modifiedItems) {
                    if (modifiedItems === void 0) { modifiedItems = _this.menuItems; }
                    return _this.createMenu(event, modifiedItems);
                }
            });
        }
        else {
            this.createMenu(event);
        }
        return false;
    };
    /**
     * @param {?} event
     * @param {?=} items
     * @return {?}
     */
    ShContextMenuDirective.prototype.createMenu = function (event, items) {
        if (items === void 0) { items = this.menuItems; }
        this.overlayComponent = this.createOverlayComponent();
        this.ctxComponent = this.createContextComponent();
        this.registerBindings(items);
        this.registerEvents();
        this.setLocation(event);
    };
    /**
     * @return {?}
     */
    ShContextMenuDirective.prototype.registerEvents = function () {
        var _this = this;
        this.ctxComponent.instance.onClose.subscribe(function () {
            _this.closeMenu();
        });
        this.overlayComponent.instance.onClick.subscribe(function () {
            _this.closeMenu();
        });
    };
    /**
     * @param {?} menuItems
     * @return {?}
     */
    ShContextMenuDirective.prototype.registerBindings = function (menuItems) {
        this.ctxComponent.instance.items = menuItems;
        this.ctxComponent.instance.dataContext = this.dataContext;
    };
    /**
     * @return {?}
     */
    ShContextMenuDirective.prototype.createContextComponent = function () {
        return this.injectionService.appendComponent(ShContextMenuComponent);
    };
    /**
     * @return {?}
     */
    ShContextMenuDirective.prototype.createOverlayComponent = function () {
        return this.injectionService.appendComponent(ShContextOverlayComponent);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShContextMenuDirective.prototype.setLocation = function (event) {
        var clientX = event.clientX, clientY = event.clientY;
        this.ctxComponent.instance.position = {
            top: clientY,
            left: clientX
        };
    };
    /**
     * @return {?}
     */
    ShContextMenuDirective.prototype.closeMenu = function () {
        if (this.ctxComponent)
            this.ctxComponent.destroy();
        if (this.overlayComponent)
            this.overlayComponent.destroy();
    };
    /**
     * @return {?}
     */
    ShContextMenuDirective.prototype.contextMenuIsEmpty = function () {
        return !this.menuItems || this.menuItems.length === 0;
    };
    return ShContextMenuDirective;
}());
ShContextMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sh-context]'
            },] },
];
/**
 * @nocollapse
 */
ShContextMenuDirective.ctorParameters = function () { return [
    { type: ShContextService, },
    { type: InjectionService, },
]; };
ShContextMenuDirective.propDecorators = {
    'menuItems': [{ type: Input, args: ['sh-context',] },],
    'dataContext': [{ type: Input, args: ['sh-data-context',] },],
    'options': [{ type: Input, args: ['sh-options',] },],
    'onBeforeMenuOpen': [{ type: Output, args: ['onBeforeMenuOpen',] },],
    'onClick': [{ type: HostListener, args: ['contextmenu', ['$event'],] },],
};
var ShContextSubMenuDirective = /** @class */ (function () {
    /**
     * @param {?} viewRef
     * @param {?} elmRef
     * @param {?} resolver
     * @param {?} ctxService
     */
    function ShContextSubMenuDirective(viewRef, elmRef, resolver, ctxService) {
        this.viewRef = viewRef;
        this.elmRef = elmRef;
        this.resolver = resolver;
        this.ctxService = ctxService;
        this.closeSubMenu = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.ngOnInit = function () {
        this.options = this.ctxService.getOptions();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.onMouseOver = function (event) {
        this.closeCurrent();
        this.ctxComponent = this.createContextComponent();
        this.registerBindings();
        this.registerEvents();
        this.setLocation();
        return false;
    };
    /**
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.registerEvents = function () {
        var _this = this;
        this.ctxComponent.instance.onClose.subscribe(function () {
            _this.closeSubMenu.emit();
        });
    };
    /**
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.registerBindings = function () {
        this.ctxComponent.instance.items = this.menuItems;
        this.ctxComponent.instance.dataContext = this.dataContext;
    };
    /**
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.createContextComponent = function () {
        var /** @type {?} */ shContextMenuFactory = this.resolver.resolveComponentFactory(ShContextMenuComponent);
        var /** @type {?} */ shContextComponentRef = this.viewRef.createComponent(shContextMenuFactory);
        return shContextComponentRef;
    };
    /**
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.setLocation = function () {
        var _a = this.elmRef.nativeElement.getClientRects()[0], top = _a.top, left = _a.left, width = _a.width;
        var /** @type {?} */ position = {
            top: top,
            left: this.options.rtl ? left : left + width
        };
        this.ctxComponent.instance.position = position;
    };
    /**
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.closeMenu = function () {
        this.closeSubMenu.emit();
    };
    /**
     * @return {?}
     */
    ShContextSubMenuDirective.prototype.closeCurrent = function () {
        this.viewRef.clear();
    };
    return ShContextSubMenuDirective;
}());
ShContextSubMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[sh-context-sub-menu]'
            },] },
];
/**
 * @nocollapse
 */
ShContextSubMenuDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: ComponentFactoryResolver, },
    { type: ShContextService, },
]; };
ShContextSubMenuDirective.propDecorators = {
    'menuItems': [{ type: Input, args: ['sh-context-sub-menu',] },],
    'dataContext': [{ type: Input, args: ['sh-data-context',] },],
    'closeSubMenu': [{ type: Output },],
    'onMouseOver': [{ type: HostListener, args: ['mouseover', ['$event'],] },],
};
var ShContextMenuModule = /** @class */ (function () {
    function ShContextMenuModule() {
    }
    return ShContextMenuModule;
}());
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
ShContextMenuModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { ShContextMenuModule, HtmlDirective as ɵh, InjectionService as ɵd, ShContextMenuComponent as ɵe, ShContextMenuDirective as ɵa, ShContextOverlayComponent as ɵg, ShContextService as ɵb, ShContextServiceModule as ɵc, ShContextSubMenuDirective as ɵf };
//# sourceMappingURL=ng2-right-click-menu.es5.js.map
