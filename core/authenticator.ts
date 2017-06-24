import { Container, AutoWired, Inject } from 'typescript-ioc/es6';
import { AuthGuard } from './types';

export class Authenticator {
    private authGuard: AuthGuard;
    constructor (@Inject authGuard: AuthGuard) {
        this.authGuard = authGuard;
    }

    get enabled(): boolean {
        return ('initialize' in this.authGuard && 'authenticate' in this.authGuard);
    }

    initialize (options?: any): any {
        return this.authGuard.initialize(options);
    }

    authenticate (): any {
        return this.authGuard.authenticate();
    }
}