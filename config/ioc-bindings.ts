import { IOC, Types } from '../core';
import { SrvConf } from '../config/app';
import { DatabaseConfig } from '../config/database';
import { HomeController } from '../app/controllers/home-controller';
import { AuthController } from '../app/controllers/auth-controller';

IOC.Container.bind(Types.ServerConfig).to(SrvConf);
IOC.Container.bind(Types.DatabaseConfig).to(DatabaseConfig);
IOC.Container.bind(HomeController).to(HomeController);
IOC.Container.bind(Types.AuthGuard).to(AuthController);