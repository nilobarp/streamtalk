import * as Restify from 'restify';

export type HttpMethod = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

/**
 * Define HTTP Route configurations
 */
export abstract class HttpRoute {
    /**
     * HTTP method verb
     */
    method: HttpMethod;
    /**
     * Name of the route
     *
     * This name can be used to execute the route during a request cycle.
     */
    name?: string;
    /**
     * Route path
     *
     * Any request that matches the specified path will be handled by this route.
     */
    path: string | RegExp;
    /**
     * Execute this route only if the accept version header matches any of the given versions.
     */
    versions?: string[];
    /**
     * Require authentication to access this route
     */
    protected: boolean;
    /**
     * Function to handle the request
     */
    handler: Restify.RequestHandler;
    /**
     * List of middleware functions executed before the handler
     */
    middlewares?: Restify.RequestHandler[];
    /**
     * Use this route for login
     *
     * Make sure an authEndPoint is not protected.
     */
    authEndPoint?: boolean;
}