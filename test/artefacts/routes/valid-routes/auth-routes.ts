import { HttpRoute, AuthGuard } from '../../../../core/types';
import { IOC } from '../../../../core';

let authController: AuthGuard = IOC.Container.get(AuthGuard);

export let loginRoute: HttpRoute = {
    method: 'POST',
    path: '/login',
    handler: authController.authorize,
    protected: false
};

export let protectedRoute: HttpRoute = {
    method: 'GET',
    path: '/protected',
    handler: function (req, res, next) { res.send(); },
    protected: true
};