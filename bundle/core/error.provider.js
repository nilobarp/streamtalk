"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var es6_1 = require("typescript-ioc/es6");
var i18n_provider_1 = require("./i18n.provider");
var ErrorProvider = (function (_super) {
    __extends(ErrorProvider, _super);
    function ErrorProvider() {
        return _super.call(this) || this;
    }
    ErrorProvider.prototype.throwAppSecretUndefined = function () {
        this.message = 'App secret key is not defined';
        throw this;
    };
    return ErrorProvider;
}(Error));
__decorate([
    es6_1.Inject,
    __metadata("design:type", i18n_provider_1.I18N)
], ErrorProvider.prototype, "i18n", void 0);
ErrorProvider = __decorate([
    es6_1.AutoWired,
    __metadata("design:paramtypes", [])
], ErrorProvider);
exports.ErrorProvider = ErrorProvider;
//# sourceMappingURL=error.provider.js.map