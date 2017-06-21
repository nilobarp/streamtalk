import { Request, Response, Next } from 'restify';
import { Passport, Strategy } from 'passport';
export abstract class AuthGuard {
    abstract initialize(options?: any): Function;
    abstract authenticate(): Function;
    abstract authorize(req: Request, res: Response, next: Next): void;
}