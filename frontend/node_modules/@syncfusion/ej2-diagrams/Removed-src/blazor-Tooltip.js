var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BlazorAnimation = (function (_super) {
        __extends(BlazorAnimation, _super);
        function BlazorAnimation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            ej2_base_1.Property({ effect: 'FadeIn', duration: 150, delay: 0 })
        ], BlazorAnimation.prototype, "open", void 0);
        __decorate([
            ej2_base_1.Property({ effect: 'FadeOut', duration: 150, delay: 0 })
        ], BlazorAnimation.prototype, "close", void 0);
        return BlazorAnimation;
    }(ej2_base_1.ChildProperty));
    exports.BlazorAnimation = BlazorAnimation;
    var SHOW_POINTER_TIP_GAP = 0;
    var HIDE_POINTER_TIP_GAP = 8;
    var POINTER_ADJUST = 2;
    var ROOT = 'e-tooltip';
    var RTL = 'e-rtl';
    var DEVICE = 'e-bigger';
    var CLOSE = 'e-tooltip-close';
    var TOOLTIP_WRAP = 'e-tooltip-wrap';
    var CONTENT = 'e-tip-content';
    var ARROW_TIP = 'e-arrow-tip';
    var ARROW_TIP_OUTER = 'e-arrow-tip-outer';
    var ARROW_TIP_INNER = 'e-arrow-tip-inner';
    var TIP_BOTTOM = 'e-tip-bottom';
    var TIP_TOP = 'e-tip-top';
    var TIP_LEFT = 'e-tip-left';
    var TIP_RIGHT = 'e-tip-right';
    var POPUP_ROOT = 'e-popup';
    var POPUP_OPEN = 'e-popup-open';
    var POPUP_CLOSE = 'e-popup-close';
    var POPUP_LIB = 'e-lib';
    var HIDE_POPUP = 'e-hidden';
    var CLASSNAMES = {
        ROOT: 'e-popup',
        RTL: 'e-rtl',
        OPEN: 'e-popup-open',
        CLOSE: 'e-popup-close'
    };
    var BlazorTooltip = (function () {
        function BlazorTooltip(diagram) {
            this.isBlazorTooltip = false;
            this.contentEvent = null;
            this.width = 'auto';
            this.height = 'auto';
            this.content = '';
            this.target = '';
            this.position = 'TopCenter';
            this.offsetX = 0;
            this.offsetY = 0;
            this.tipPointerPosition = 'Auto';
            this.openDelay = 0;
            this.closeDelay = 0;
            this.cssClass = '';
        }
        BlazorTooltip.prototype.open = function (target, showAnimation, e) {
        };
        BlazorTooltip.prototype.updateTooltip = function (target) {
        };
        BlazorTooltip.prototype.formatPosition = function () {
        };
        BlazorTooltip.prototype.destroy = function () {
        };
        BlazorTooltip.prototype.close = function () {
        };
        BlazorTooltip.prototype.showTooltip = function (target, showAnimation, e) {
        };
        BlazorTooltip.prototype.beforeRenderCallback = function (beforeRenderArgs, target, e, showAnimation) {
        };
        BlazorTooltip.prototype.afterRenderBlazor = function (target, e, showAnimation, ctrlObj) {
        };
        BlazorTooltip.prototype.setTipClass = function (position) {
        };
        BlazorTooltip.prototype.renderArrow = function () {
        };
        BlazorTooltip.prototype.reposition = function (target) {
        };
        BlazorTooltip.prototype.beforeRenderBlazor = function (target, ctrlObj) {
        };
        BlazorTooltip.prototype.addDescribedBy = function (target, id) {
        };
        BlazorTooltip.prototype.renderContent = function (target) {
        };
        BlazorTooltip.prototype.updateTipPosition = function (position) {
        };
        BlazorTooltip.prototype.adjustArrow = function (target, position, tooltipPositionX, tooltipPositionY) {
        };
        BlazorTooltip.prototype.getModuleName = function () {
            return 'BlazorTooltip';
        };
        return BlazorTooltip;
    }());
    exports.BlazorTooltip = BlazorTooltip;
});
