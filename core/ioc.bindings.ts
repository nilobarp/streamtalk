import * as IOC from 'typescript-ioc/es6';

import { ErrorProvider } from './error.provider';
IOC.Container.bind(ErrorProvider).to(ErrorProvider);

import { LogProvider } from './log.provider';
IOC.Container.bind(LogProvider).to(LogProvider);

import { Router } from './router';
IOC.Container.bind(Router).to(Router);

import { Authenticator } from './authenticator';
IOC.Container.bind(Authenticator).to(Authenticator);

import { StreamTalk } from './streamtalk';
IOC.Container.bind(StreamTalk).to(StreamTalk);