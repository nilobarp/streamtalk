import { HttpRoute } from '../../../../core/types';

export let route: HttpRoute = {
    method: 'GET',
    path: '/',
    handler: function (req, res, next) { res.send(); },
    protected: false
};

// export let protectedRoute : HttpRoute = {
//     method: 'GET',
//     path: '/protected',
//     handler: function (req, res, next) { res.send(); },
//     protected: true
// }