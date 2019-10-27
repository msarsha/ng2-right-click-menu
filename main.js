(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../dist/ng2-right-click-menu/fesm5/ng2-right-click-menu.js":
/*!***************************************************************************************************************!*\
  !*** /home/travis/build/msarsha/ng2-right-click-menu/dist/ng2-right-click-menu/fesm5/ng2-right-click-menu.js ***!
  \***************************************************************************************************************/
/*! exports provided: ShAttachMenuDirective, ShContextMenuComponent, ShContextMenuItemDirective, ShContextMenuModule, ShContextMenuService, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShAttachMenuDirective", function() { return ShAttachMenuDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShContextMenuComponent", function() { return ShContextMenuComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShContextMenuItemDirective", function() { return ShContextMenuItemDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShContextMenuModule", function() { return ShContextMenuModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShContextMenuService", function() { return ShContextMenuService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return MenuItemContext; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/overlay */ "../../node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/portal */ "../../node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MenuItemContext = /** @class */ (function () {
    function MenuItemContext() {
        this.$implicit = {};
    }
    return MenuItemContext;
}());
if (false) {}
var ShContextMenuItemDirective = /** @class */ (function () {
    function ShContextMenuItemDirective(template) {
        this.template = template;
        this.closeOnClick = true;
        this.click = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.context = new MenuItemContext();
    }
    /**
     * @return {?}
     */
    ShContextMenuItemDirective.prototype.setNotActive = /**
     * @return {?}
     */
    function () {
        this._active = false;
        if (this.subMenu) {
            this.subMenu.setNotActive();
        }
    };
    /**
     * @return {?}
     */
    ShContextMenuItemDirective.prototype.setActive = /**
     * @return {?}
     */
    function () {
        this._active = true;
    };
    ShContextMenuItemDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[shContextMenuItem]'
                },] }
    ];
    /** @nocollapse */
    ShContextMenuItemDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] }
    ]; };
    ShContextMenuItemDirective.propDecorators = {
        subMenu: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        divider: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        visible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        closeOnClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        click: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
    };
    return ShContextMenuItemDirective;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShContextMenuService = /** @class */ (function () {
    function ShContextMenuService(overlay) {
        this.overlay = overlay;
        this.activeOverlays = [];
    }
    /**
     * @param {?} ctxEvent
     * @return {?}
     */
    ShContextMenuService.prototype.openMenu = /**
     * @param {?} ctxEvent
     * @return {?}
     */
    function (ctxEvent) {
        this.closeCurrentOverlays();
        var menu = ctxEvent.menu, mouseEvent = ctxEvent.mouseEvent, data = ctxEvent.data;
        this.activeMenu = menu;
        this.anchorElement = this.createAnchorElement();
        /** @type {?} */
        var scrollStrategy = this.buildScrollStrategy();
        /** @type {?} */
        var positionStrategy = this.buildPositionStrategy(this.anchorElement, mouseEvent);
        this.attachContextToItems(menu, data);
        /** @type {?} */
        var overlayRef = this.createAndAttachOverlay(positionStrategy, scrollStrategy, menu, true);
        this.attachOverlayRef(menu, overlayRef);
        this.registerDetachEvents(overlayRef);
    };
    /**
     * @param {?} ctxEvent
     * @return {?}
     */
    ShContextMenuService.prototype.openSubMenu = /**
     * @param {?} ctxEvent
     * @return {?}
     */
    function (ctxEvent) {
        var menu = ctxEvent.menu, mouseEvent = ctxEvent.mouseEvent, targetElement = ctxEvent.targetElement, data = ctxEvent.data, parentMenu = ctxEvent.parentMenu;
        mouseEvent.preventDefault();
        mouseEvent.stopPropagation();
        /** @type {?} */
        var scrollStrategy = this.buildScrollStrategy();
        /** @type {?} */
        var positionStrategy = this.buildPositionStrategyForSubMenu(targetElement);
        /** @type {?} */
        var overlayRef = this.createAndAttachOverlay(positionStrategy, scrollStrategy, menu, false);
        this.attachContextToItems(menu, data);
        this.attachThisContext(menu, parentMenu);
        this.attachOverlayRef(menu, overlayRef);
    };
    /**
     * @return {?}
     */
    ShContextMenuService.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.closeCurrentOverlays();
        this.subs.unsubscribe();
    };
    /**
     * @return {?}
     */
    ShContextMenuService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy();
    };
    /**
     * @param {?} menu
     * @return {?}
     */
    ShContextMenuService.prototype.closeSubMenus = /**
     * @param {?} menu
     * @return {?}
     */
    function (menu) {
        var _this = this;
        /** @type {?} */
        var itemsWithSubMenus = menu.menuItems.filter((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return !!i.subMenu && !!i.subMenu.overlayRef; }));
        if (itemsWithSubMenus.length) {
            itemsWithSubMenus.forEach((/**
             * @param {?} sm
             * @return {?}
             */
            function (sm) { return _this.closeSubMenus(sm.subMenu); }));
            /** @type {?} */
            var overlayRefs = itemsWithSubMenus.map((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.subMenu.overlayRef; }));
            overlayRefs.forEach((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return r.dispose(); }));
        }
    };
    /**
     * @private
     * @param {?} overlayRef
     * @return {?}
     */
    ShContextMenuService.prototype.registerDetachEvents = /**
     * @private
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        this.subs = overlayRef
            .backdropClick()
            .subscribe(this.closeCurrentOverlays.bind(this));
        this.subs.add(overlayRef.detachments().subscribe(this.closeCurrentOverlays.bind(this)));
    };
    /**
     * @private
     * @param {?} positionStrategy
     * @param {?} scrollStrategy
     * @param {?} menu
     * @param {?=} hasBackdrop
     * @return {?}
     */
    ShContextMenuService.prototype.createAndAttachOverlay = /**
     * @private
     * @param {?} positionStrategy
     * @param {?} scrollStrategy
     * @param {?} menu
     * @param {?=} hasBackdrop
     * @return {?}
     */
    function (positionStrategy, scrollStrategy, menu, hasBackdrop) {
        if (hasBackdrop === void 0) { hasBackdrop = true; }
        /** @type {?} */
        var overlayRef = this.overlay.create({
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy,
            hasBackdrop: hasBackdrop,
            backdropClass: 'sh-backdrop'
        });
        /*
             TODO: try passing the TemplatePortal context (data)
             and then injecting it to the *ngTemplateOutlet in the component template
            */
        /** @type {?} */
        var menuPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_3__["TemplatePortal"](menu.menuTemplate, menu.menuContainer);
        overlayRef.attach(menuPortal);
        this.activeOverlays.push(overlayRef);
        return overlayRef;
    };
    /**
     * @private
     * @return {?}
     */
    ShContextMenuService.prototype.buildScrollStrategy = /**
     * @private
     * @return {?}
     */
    function () {
        return this.overlay.scrollStrategies.reposition({ autoClose: true });
    };
    /**
     * @private
     * @param {?} ele
     * @param {?} event
     * @return {?}
     */
    ShContextMenuService.prototype.buildPositionStrategy = /**
     * @private
     * @param {?} ele
     * @param {?} event
     * @return {?}
     */
    function (ele, event) {
        var x = event.x, y = event.y;
        return this.overlay
            .position()
            .flexibleConnectedTo(ele)
            .withDefaultOffsetX(x)
            .withDefaultOffsetY(y)
            .withPositions(this.buildPositions())
            .withFlexibleDimensions(false)
            .withPush(true);
    };
    /**
     * @private
     * @param {?} elm
     * @return {?}
     */
    ShContextMenuService.prototype.buildPositionStrategyForSubMenu = /**
     * @private
     * @param {?} elm
     * @return {?}
     */
    function (elm) {
        return this.overlay
            .position()
            .flexibleConnectedTo(elm)
            .withPositions(this.buildSubMenuPositions())
            .withFlexibleDimensions(false)
            .withPush(true);
    };
    /**
     * @private
     * @return {?}
     */
    ShContextMenuService.prototype.closeCurrentOverlays = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.anchorElement) {
            this.anchorElement.remove();
        }
        this.activeOverlays.forEach((/**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            o.detach();
            o.dispose();
        }));
        this.activeOverlays = [];
        // TODO: create close subject and emit.
        // subscribe in component
        if (this.activeMenu) {
            this.activeMenu.close();
        }
    };
    /**
     * @private
     * @param {?} menu
     * @param {?} data
     * @return {?}
     */
    ShContextMenuService.prototype.attachContextToItems = /**
     * @private
     * @param {?} menu
     * @param {?} data
     * @return {?}
     */
    function (menu, data) {
        menu.menuItems.forEach((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return (i.context.$implicit = data); }));
    };
    /**
     * @private
     * @param {?} menu
     * @param {?} parentMenu
     * @return {?}
     */
    ShContextMenuService.prototype.attachThisContext = /**
     * @private
     * @param {?} menu
     * @param {?} parentMenu
     * @return {?}
     */
    function (menu, parentMenu) {
        menu.thisContext = parentMenu.thisContext;
    };
    /**
     * @private
     * @param {?} menu
     * @param {?} overlayRef
     * @return {?}
     */
    ShContextMenuService.prototype.attachOverlayRef = /**
     * @private
     * @param {?} menu
     * @param {?} overlayRef
     * @return {?}
     */
    function (menu, overlayRef) {
        menu.overlayRef = overlayRef;
    };
    /**
     * @private
     * @return {?}
     */
    ShContextMenuService.prototype.createAnchorElement = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.bottom = '0';
        div.style.left = '0';
        div.style.right = '0';
        document.body.appendChild(div);
        return div;
    };
    /**
     * @private
     * @return {?}
     */
    ShContextMenuService.prototype.buildSubMenuPositions = /**
     * @private
     * @return {?}
     */
    function () {
        return [
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ];
    };
    /**
     * @private
     * @return {?}
     */
    ShContextMenuService.prototype.buildPositions = /**
     * @private
     * @return {?}
     */
    function () {
        return [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ];
    };
    ShContextMenuService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    /** @nocollapse */
    ShContextMenuService.ctorParameters = function () { return [
        { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["Overlay"] }
    ]; };
    return ShContextMenuService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShContextMenuComponent = /** @class */ (function () {
    function ShContextMenuComponent(ctxService) {
        this.ctxService = ctxService;
        this.contentChildrenItems = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"]();
        this.viewChildrenItems = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"]();
    }
    Object.defineProperty(ShContextMenuComponent.prototype, "menuItems", {
        get: /**
         * @return {?}
         */
        function () {
            // when using the ShContextMenuComponent as menu, the ContentChildren is the source
            if (this.contentChildrenItems.length) {
                return this.contentChildrenItems;
            }
            // when using a custom component as menu the ViewChildren is the source
            return this.viewChildrenItems;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} $event
     * @param {?} item
     * @param {?} elm
     * @return {?}
     */
    ShContextMenuComponent.prototype.onEnter = /**
     * @param {?} $event
     * @param {?} item
     * @param {?} elm
     * @return {?}
     */
    function ($event, item, elm) {
        this.ctxService.closeSubMenus(this);
        this.setNotActive();
        if (!item.subMenu) {
            return;
        }
        this.setActive(item);
        this.ctxService.openSubMenu({
            data: item.context.$implicit,
            targetElement: new _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"](elm),
            menu: item.subMenu,
            mouseEvent: $event,
            parentMenu: this
        });
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.setActive = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        item.setActive();
        this.subActive = true;
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.onClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        // TODO: move click handling to service
        if (item.divider) {
            return;
        }
        if (!item.subMenu && item.closeOnClick) {
            this.ctxService.destroy();
            item.click.emit({
                data: item.context.$implicit,
                event: event
            });
        }
    };
    /**
     * @private
     * @param {?} fn
     * @param {?} fallbackContext
     * @param {?} data
     * @param {?} event
     * @return {?}
     */
    ShContextMenuComponent.prototype.callWithContext = /**
     * @private
     * @param {?} fn
     * @param {?} fallbackContext
     * @param {?} data
     * @param {?} event
     * @return {?}
     */
    function (fn, fallbackContext, data, event) {
        return fn.call(this.thisContext ? this.thisContext : fallbackContext, {
            data: data,
            event: event
        });
    };
    /**
     * @return {?}
     */
    ShContextMenuComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.setNotActive();
        this.menuContainer.detach();
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    };
    /**
     * @return {?}
     */
    ShContextMenuComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
    };
    /**
     * @return {?}
     */
    ShContextMenuComponent.prototype.setNotActive = /**
     * @return {?}
     */
    function () {
        this.subActive = false;
        this.menuItems.forEach((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return i.setNotActive(); }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ShContextMenuComponent.prototype.isVisible = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item.visible) {
            return true;
        }
        return this.callWithContext(item.visible, this, item.context.$implicit, null);
    };
    ShContextMenuComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'sh-context-menu',
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                    template: "\n\t\t<ng-container #menuContainer></ng-container>\n\t\t<ng-template #menuTemplate>\n\t\t\t<div class=\"sh-context-menu\">\n\t\t\t\t<div\n\t\t\t\t\t*ngFor=\"let menuItem of menuItems\"\n\t\t\t\t\t#itemElement\n\t\t\t\t\t[ngClass]=\"{\n\t\t\t\t\t\t'sh-sub-anchor': menuItem.subMenu,\n\t\t\t\t\t\t'sh-context-menu--item__divider': menuItem.divider,\n\t\t\t\t\t\t'sh-context-menu--item__sub-active': subActive && menuItem.active\n\t\t\t\t\t}\"\n\t\t\t\t\tclass=\"sh-context-menu--item\"\n\t\t\t\t\t(mouseenter)=\"onEnter($event, menuItem, itemElement)\"\n\t\t\t\t\t(click)=\"onClick($event, menuItem)\"\n\t\t\t\t>\n\t\t\t\t\t<ng-container *ngIf=\"!menuItem.divider || !isVisible(menuItem)\">\n\t\t\t\t\t\t<ng-content\n\t\t\t\t\t\t\t*ngTemplateOutlet=\"menuItem.template; context: menuItem.context\"\n\t\t\t\t\t\t></ng-content>\n\t\t\t\t\t</ng-container>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</ng-template>\n\t",
                    styles: [".sh-backdrop{background-color:transparent}.sh-context-menu{background:#ececec;min-width:150px;border:1px solid rgba(0,0,0,.2);border-radius:3px;box-shadow:0 0 10px 2px rgba(0,0,0,.1);color:#000;padding:5px 0;margin:0}.sh-context-menu--item{padding:5px 10px 5px 15px;-webkit-transition:.15s;transition:.15s}.sh-context-menu--item:hover,.sh-context-menu--item__sub-active{background-color:#4b8bec;color:#fff;cursor:pointer}.sh-context-menu--item.sh-context-menu--item__divider:hover{background-color:#ececec;color:#000;cursor:default}.sh-context-menu--item__divider{height:1px;margin:1px 1px 8px;overflow:hidden;border-bottom:1px solid #d0d0d0}.sh-context-menu--item.sh-sub-anchor{position:relative;min-width:160px}.sh-sub-anchor:after{content:'';top:50%;right:6px;-webkit-transform:translateY(-50%);transform:translateY(-50%);position:absolute;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:8px solid #000}"]
                }] }
    ];
    /** @nocollapse */
    ShContextMenuComponent.ctorParameters = function () { return [
        { type: ShContextMenuService }
    ]; };
    ShContextMenuComponent.propDecorators = {
        thisContext: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['this',] }],
        contentChildrenItems: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"], args: [ShContextMenuItemDirective, {
                        read: ShContextMenuItemDirective
                    },] }],
        viewChildrenItems: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"], args: [ShContextMenuItemDirective, {
                        read: ShContextMenuItemDirective
                    },] }],
        menuTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['menuTemplate', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], static: true },] }],
        menuContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['menuContainer', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], static: true },] }]
    };
    return ShContextMenuComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ContextOpenEvent() { }
if (false) {}
var ShAttachMenuDirective = /** @class */ (function () {
    function ShAttachMenuDirective(ctxService, elm) {
        this.ctxService = ctxService;
        this.elm = elm;
        this.open = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    ShAttachMenuDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setupEvents();
    };
    /**
     * @private
     * @return {?}
     */
    ShAttachMenuDirective.prototype.setupEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var observables = [];
        if (!this.triggers) {
            observables.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(this.elm.nativeElement, 'contextmenu'));
        }
        else {
            this.triggers.forEach((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                observables.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(_this.elm.nativeElement, t));
            }));
        }
        this.sub = rxjs__WEBPACK_IMPORTED_MODULE_5__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__spread"])(observables)).subscribe(this.openMenu.bind(this));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShAttachMenuDirective.prototype.openMenu = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        /** @type {?} */
        var preventOpen = false;
        this.open.emit({
            data: this.data,
            mouseEvent: event,
            preventOpen: (/**
             * @return {?}
             */
            function () {
                preventOpen = true;
            })
        });
        if (preventOpen)
            return;
        this.ctxService.openMenu({
            menu: this.menu,
            mouseEvent: event,
            targetElement: this.elm,
            data: this.data
        });
    };
    /**
     * @return {?}
     */
    ShAttachMenuDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    ShAttachMenuDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[shAttachMenu]'
                },] }
    ];
    /** @nocollapse */
    ShAttachMenuDirective.ctorParameters = function () { return [
        { type: ShContextMenuService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }
    ]; };
    ShAttachMenuDirective.propDecorators = {
        menu: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['shAttachMenu',] }],
        triggers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['shMenuTriggers',] }],
        data: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['shMenuData',] }],
        open: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
    };
    return ShAttachMenuDirective;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShContextMenuModule = /** @class */ (function () {
    function ShContextMenuModule() {
    }
    ShContextMenuModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [
                        ShAttachMenuDirective,
                        ShContextMenuComponent,
                        ShContextMenuItemDirective
                    ],
                    exports: [
                        ShAttachMenuDirective,
                        ShContextMenuComponent,
                        ShContextMenuItemDirective
                    ],
                    providers: [ShContextMenuService],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["OverlayModule"]],
                    entryComponents: [ShContextMenuComponent]
                },] }
    ];
    return ShContextMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ng2-right-click-menu.js.map


/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!************************************************************************************************************!*\
  !*** /home/travis/build/msarsha/ng2-right-click-menu/node_modules/raw-loader!./src/app/app.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div\n\tclass=\"box\"\n\t*ngFor=\"let item of items\"\n\t[shAttachMenu]=\"menu\"\n\t[shMenuData]=\"item\"\n\t(open)=\"onOpen($event)\"\n>\n\t<h2>Menu One</h2>\n</div>\n\n<!--<div class=\"box\" *ngFor=\"let item of items\" [shAnchorFor]=\"myMenu\" [shMenuData]=\"item\" [shMenuTriggers]=\"['click']\">-->\n<!--<h2>Menu Two</h2>-->\n<!--</div>-->\n\n<sh-context-menu #menu [this]=\"thisContext\">\n\t<ng-template\n\t\tshContextMenuItem\n\t\tlet-item\n\t\t[subMenu]=\"subMenu\"\n\t\t[visible]=\"isVisible\"\n\t>\n\t\t<div>two - {{ item.label }}</div>\n\t</ng-template>\n\t<div shContextMenuItem [divider]=\"true\"></div>\n\t<ng-template shContextMenuItem let-item (click)=\"onClick($event)\">\n\t\t<div>one - {{ item.label }}</div>\n\t</ng-template>\n\t<ng-container *ngIf=\"itemVisible\">\n\t\t<ng-template shContextMenuItem let-item (click)=\"onClick($event)\">\n\t\t\t<h4>Hi !</h4>\n\t\t</ng-template>\n\t</ng-container>\n\n\t<sh-context-menu #subMenu>\n\t\t<ng-template shContextMenuItem let-item [subMenu]=\"nestedSubMenu\">\n\t\t\t<div>From Sub Menu - {{ item.label }}</div>\n\t\t</ng-template>\n\t\t<ng-template shContextMenuItem [divider]=\"true\"></ng-template>\n\t\t<ng-template shContextMenuItem let-item (click)=\"onClick($event)\">\n\t\t\t<div>one - {{ item.label }}</div>\n\t\t</ng-template>\n\t\t<ng-template shContextMenuItem let-item [subMenu]=\"nestedSubMenu\">\n\t\t\t<div>From Sub Menu - {{ item.label }}</div>\n\t\t</ng-template>\n\n\t\t<sh-context-menu #nestedSubMenu>\n\t\t\t<ng-template shContextMenuItem let-item (click)=\"onClick($event)\">\n\t\t\t\tFrom Sub Menu Two - {{ item.label }}\n\t\t\t</ng-template>\n\t\t</sh-context-menu>\n\t</sh-context-menu>\n</sh-context-menu>\n\n<button (click)=\"itemVisible = !itemVisible\">Toggle Visible</button>\n{{ itemVisible }}\n\n<div class=\"tall-wrapper\">\n\t<div style=\"text-align: center\"><span>Scroll Down</span></div>\n\t<div class=\"tall\">\n\t\t<div class=\"space\"></div>\n\t\t<div\n\t\t\tclass=\"box\"\n\t\t\t*ngFor=\"let item of items\"\n\t\t\t[shAttachMenu]=\"menu\"\n\t\t\t[shMenuData]=\"item\"\n\t\t\t(open)=\"onOpen($event)\"\n\t\t>\n\t\t\t<h2>Menu One</h2>\n\t\t</div>\n\t</div>\n</div>\n\n<!--<my-menu #myMenu></my-menu>-->\n\n<!--<sh-context-menu #menu>-->\n<!--<ng-template shContextMenuItem let-item>-->\n<!--<div>-->\n<!--Menu Item - {{item.label}}-->\n<!--</div>-->\n<!--</ng-template>-->\n<!--</sh-context-menu>-->\n<!--<div shContextMenuItem [divider]=\"true\">-->\n<!--</div>-->\n<!--<ng-template shContextMenuItem let-item (click)=\"onClick($event)\">-->\n<!--<div>-->\n<!--one - {{item.label}}-->\n<!--</div>-->\n<!--</ng-template>-->\n<!--<ng-template shContextMenuItem let-item [closeOnClick]=\"false\">-->\n<!--<my-content [item]=\"item\"></my-content>-->\n<!--</ng-template>-->\n<!--<ng-container *ngIf=\"itemVisible\">-->\n<!--<ng-template shContextMenuItem let-item (click)=\"onClick($event)\">-->\n<!--<h4>Hi !</h4>-->\n<!--</ng-template>-->\n<!--</ng-container>-->\n"

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".box {\n\theight: 180px;\n\twidth: 180px;\n\tbackground-color: #e3e4c2;\n\tline-height: 140px;\n\ttext-align: center;\n\tbox-shadow: 6px 6px 15px 2px rgba(0, 0, 0, 0.3);\n\tdisplay: inline-block;\n\tmargin: 20px;\n}\n\n.box.box-right {\n\tfloat: right;\n\twidth: 240px;\n}\n\ni.menu-icon {\n\tmargin-right: 3px;\n\tdisplay: inline-block;\n\tcolor: green;\n}\n\n.tall-wrapper {\n\toverflow: scroll;\n\theight: 500px;\n\twidth: 600px;\n\tmargin-top: 20px;\n}\n\n.space {\n\theight: 500px;\n\twidth: 600px;\n}\n\n.tall-wrapper .tall {\n\theight: 2000px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25nMi1yaWdodC1jbGljay1tZW51LWRlbW8vc3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtDQUNDLGFBQWE7Q0FDYixZQUFZO0NBQ1oseUJBQXlCO0NBQ3pCLGtCQUFrQjtDQUNsQixrQkFBa0I7Q0FDbEIsK0NBQStDO0NBQy9DLHFCQUFxQjtDQUNyQixZQUFZO0FBQ2I7O0FBRUE7Q0FDQyxZQUFZO0NBQ1osWUFBWTtBQUNiOztBQUVBO0NBQ0MsaUJBQWlCO0NBQ2pCLHFCQUFxQjtDQUNyQixZQUFZO0FBQ2I7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsYUFBYTtDQUNiLFlBQVk7Q0FDWixnQkFBZ0I7QUFDakI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsWUFBWTtBQUNiOztBQUVBO0NBQ0MsY0FBYztBQUNmIiwiZmlsZSI6InByb2plY3RzL25nMi1yaWdodC1jbGljay1tZW51LWRlbW8vc3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib3gge1xuXHRoZWlnaHQ6IDE4MHB4O1xuXHR3aWR0aDogMTgwcHg7XG5cdGJhY2tncm91bmQtY29sb3I6ICNlM2U0YzI7XG5cdGxpbmUtaGVpZ2h0OiAxNDBweDtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRib3gtc2hhZG93OiA2cHggNnB4IDE1cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRtYXJnaW46IDIwcHg7XG59XG5cbi5ib3guYm94LXJpZ2h0IHtcblx0ZmxvYXQ6IHJpZ2h0O1xuXHR3aWR0aDogMjQwcHg7XG59XG5cbmkubWVudS1pY29uIHtcblx0bWFyZ2luLXJpZ2h0OiAzcHg7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0Y29sb3I6IGdyZWVuO1xufVxuXG4udGFsbC13cmFwcGVyIHtcblx0b3ZlcmZsb3c6IHNjcm9sbDtcblx0aGVpZ2h0OiA1MDBweDtcblx0d2lkdGg6IDYwMHB4O1xuXHRtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4uc3BhY2Uge1xuXHRoZWlnaHQ6IDUwMHB4O1xuXHR3aWR0aDogNjAwcHg7XG59XG5cbi50YWxsLXdyYXBwZXIgLnRhbGwge1xuXHRoZWlnaHQ6IDIwMDBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Right Click Me';
        this.thisContext = this;
        this.itemVisible = false;
        this.items = [
            {
                label: 'Item One'
            },
            {
                label: 'Item Two'
            }
        ];
    }
    AppComponent.prototype.onOpen = function (event) {
        if (event.data.label === 'Item One') {
            event.preventOpen();
        }
    };
    AppComponent.prototype.onClick = function (event) {
        console.log('clicked', this, event);
    };
    AppComponent.prototype.isVisible = function (event) {
        return true;
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());

// @Component({
// 	selector: 'my-menu',
// 	template: `
// 		<div *shContextMenuItem="let item">from comp !! - {{ item.label }}</div>
// 		<div *shContextMenuItem="let item">from comp !! - {{ item.label }}</div>
// 	`
// })
// TODO: this is not possible now (because the use of TemplatePortal instead of ComponentPortal)
// should later define an interface for using a custom component as context menu
// export class MyMenuComponent extends ShContextMenuComponent {}
//
// @Component({
// 	selector: 'my-content',
// 	template: `
// 		<div class="box">
// 			<input type="text" [value]="item.label" />
// 		</div>
// 	`
// })
// export class MyContentComponent {
// 	@Input() item: any;
// }


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var ng2_right_click_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-right-click-menu */ "../../dist/ng2-right-click-menu/fesm5/ng2-right-click-menu.js");





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], ng2_right_click_menu__WEBPACK_IMPORTED_MODULE_4__["ShContextMenuModule"]],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/msarsha/ng2-right-click-menu/projects/ng2-right-click-menu-demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map