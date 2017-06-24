import { AutoWired, Inject } from 'typescript-ioc/es6';
import { I18N } from './i18n.provider';

@AutoWired
export class ErrorProvider extends Error {
    @Inject
    private i18n: I18N;

    constructor () {
        super();
    }

    throwAppSecretUndefined () {
        this.message = 'App secret key is not defined';
        throw this;
    }
}