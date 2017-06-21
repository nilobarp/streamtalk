export class I18N {
    private _locale: string;

    set setLocale (locale: string) {
        this._locale = locale;
    }

    get locale (): string {
        return this._locale;
    }

    tr ( str ): string {
        return str;
    }
}