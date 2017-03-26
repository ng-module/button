"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var classNames = require("classnames");
var AsButtonStyle = (function () {
    function AsButtonStyle(el) {
        var _this = this;
        this.el = el;
        this.onClick = new core_1.EventEmitter();
        this.onMouseUp = new core_1.EventEmitter();
        this.handleClick = function (e) {
            _this.clicked = true;
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () { return _this.clicked = false; }, 500);
            var onClick = _this.onClick;
            if (onClick) {
                onClick.emit(e);
            }
        };
        this.handleMouseUp = function (e) {
            _this.el.nativeElement.blur();
            if (_this.onMouseUp) {
                _this.onMouseUp.emit(e);
            }
        };
        this.updateClass = function () {
            var _a = _this, type = _a.type, htmlType = _a.htmlType, icon = _a.icon, shape = _a.shape, prefixCls = _a.prefixCls, size = _a.size, ghost = _a.ghost;
            var sizeCls = ({
                large: 'lg',
                small: 'sm',
            })[size] || '';
            _this.el.nativeElement.className = classNames(prefixCls, (_b = {},
                _b[prefixCls + "-" + type] = !!type,
                _b[prefixCls + "-" + shape] = !!shape,
                _b[prefixCls + "-" + sizeCls] = !!sizeCls,
                // [`${prefixCls}-icon-only`]: !children && icon,
                _b[prefixCls + "-loading"] = !!_this._loading,
                _b[prefixCls + "-clicked"] = !!_this.clicked,
                _b[prefixCls + "-background-ghost"] = !!ghost,
                _b));
            var _b;
        };
        this.prefixCls = "as-btn";
        this.clicked = false;
        this.ghost = false;
        this._loading = false;
    }
    AsButtonStyle.prototype.ngOnInit = function () {
        this.updateClass();
    };
    AsButtonStyle.prototype.ngOnChange = function (changes) {
        var _this = this;
        var currentLoading = this.loading;
        var loading = changes["loading"];
        if (currentLoading) {
            clearTimeout(this.delayTimeout);
        }
        if (loading) {
            this.delayTimeout = setTimeout(function () {
                _this._loading = !!loading;
            });
        }
        else {
            this._loading = !!loading;
        }
    };
    AsButtonStyle.prototype.ngDoCheck = function () {
        if (this.clicked !== this.oldClicked) {
            this.updateClass();
            this.oldClicked = this.clicked;
        }
    };
    return AsButtonStyle;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonStyle.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonStyle.prototype, "htmlType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonStyle.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonStyle.prototype, "shape", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonStyle.prototype, "prefixCls", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonStyle.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AsButtonStyle.prototype, "loading", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AsButtonStyle.prototype, "ghost", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AsButtonStyle.prototype, "onClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AsButtonStyle.prototype, "onMouseUp", void 0);
AsButtonStyle = __decorate([
    core_1.Directive({
        selector: "button[as-btn]"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], AsButtonStyle);
exports.AsButtonStyle = AsButtonStyle;
var AsButton = (function () {
    function AsButton() {
    }
    return AsButton;
}());
AsButton = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'button',
        templateUrl: 'button.html',
        styleUrls: ['style/button.css'],
        encapsulation: core_1.ViewEncapsulation.None
    })
], AsButton);
exports.AsButton = AsButton;
