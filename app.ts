import { Bootstrap, IOC, Types, Database } from './core';
import './config/ioc-bindings';

let instance = new Bootstrap(__dirname);
instance.start();