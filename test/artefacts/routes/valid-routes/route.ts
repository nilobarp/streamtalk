import { HttpRoute } from '../../../../core/types';

export let get: HttpRoute = {
    method: 'GET',
    path: '/',
    handler: function (req, res, next) { res.send(); },
    protected: false
};

export let post: HttpRoute = {
    method: 'POST',
    path: '/',
    handler: function (req, res, next) { res.send(); },
    protected: false
};

export let put: HttpRoute = {
    method: 'PUT',
    path: '/',
    handler: function (req, res, next) { res.send(); },
    protected: false
};

export let head: HttpRoute = {
    method: 'HEAD',
    path: '/',
    handler: function (req, res, next) { res.send(); },
    protected: false
};

export let opts: HttpRoute = {
    method: 'OPTIONS',
    path: '/',
    handler: function (req, res, next) { res.send(); },
    protected: false
};

export let del: HttpRoute = {
    method: 'DELETE',
    path: '/',
    handler: function (req, res, next) { res.send(); },
    protected: false
};