import { Types, IOC } from '../core';
import { HomeController } from '../app/controllers/home-controller';

let controller: HomeController = IOC.Container.get(HomeController);

let home: Types.HttpRoute = {
    method: 'GET',
    path: '/',
    name: 'home',
    handler: controller.show,
    protected: false
};

export {
    home
};