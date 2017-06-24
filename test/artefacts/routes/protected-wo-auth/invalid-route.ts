import { HttpRoute } from '../../../../core/types';

export let protectedRoute: HttpRoute = {
    method: 'GET',
    path: '/protected',
    handler: function (req, res, next) { res.send(); },
    protected: true
};