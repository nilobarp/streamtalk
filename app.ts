import { IOC, Types, Bootstrap } from 'StreamTalk';
import './config/ioc-bindings';

let instance = new Bootstrap(__dirname);
instance.start();