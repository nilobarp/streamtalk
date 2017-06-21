"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class I18N {
    set setLocale(locale) {
        this._locale = locale;
    }
    get locale() {
        return this._locale;
    }
    tr(str) {
        return str;
    }
}
exports.I18N = I18N;
//# sourceMappingURL=i18n.provider.js.map