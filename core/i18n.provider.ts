export class I18N {
    private _locale: string;

    set locale (locale: string) {
        this._locale = locale;
    }

    get locale (): string {
        return this._locale;
    }

    tr ( str ): string {
        return str;
    }
}