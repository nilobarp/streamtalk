import * as Bunyan from 'bunyan';
import { Decorators, Types, IOC, LogProvider } from 'StreamTalk';

@IOC.Resolve
@Decorators.Controller
export class HomeController {
    private log: Bunyan;
    constructor (@IOC.Inject logProvider: LogProvider) {
        this.log = logProvider.factory();
    }
    show (req, res, next) {
        res.send(200, 'Hello world');
        next();
    }
}