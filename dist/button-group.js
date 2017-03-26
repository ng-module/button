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
var AsButtonGroup = (function () {
    function AsButtonGroup() {
        var _this = this;
        this.updateClass = function () {
            var _a = _this, size = _a.size, prefixCls = _a.prefixCls;
            var sizeCls = ({
                large: 'lg',
                small: 'sm',
            })[size] || '';
            _this.classes = classNames(prefixCls, (_b = {},
                _b[prefixCls + "-" + sizeCls] = !!sizeCls,
                _b));
            var _b;
        };
        this.prefixCls = "as-btn-group";
    }
    AsButtonGroup.prototype.ngOnInit = function () {
        this.updateClass();
    };
    return AsButtonGroup;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonGroup.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AsButtonGroup.prototype, "prefixCls", void 0);
AsButtonGroup = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'as-button-group',
        templateUrl: 'button-group.html',
        styleUrls: ['style/button.css'],
        encapsulation: core_1.ViewEncapsulation.None,
    }),
    __metadata("design:paramtypes", [])
], AsButtonGroup);
exports.AsButtonGroup = AsButtonGroup;
