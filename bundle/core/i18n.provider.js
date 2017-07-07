"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var I18N = (function () {
    function I18N() {
    }
    Object.defineProperty(I18N.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (locale) {
            this._locale = locale;
        },
        enumerable: true,
        configurable: true
    });
    I18N.prototype.tr = function (str) {
        return str;
    };
    return I18N;
}());
exports.I18N = I18N;
//# sourceMappingURL=i18n.provider.js.map