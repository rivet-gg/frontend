"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlerMiddleware = void 0;
function requestHandlerMiddleware(token = undefined, init = { credentials: 'omit' }) {
    if (typeof window === 'undefined') {
        throw new Error('Using browser handler middleware in a non-browser environment');
    }
    return {
        handle: async (req, opts) => {
            let auth;
            if (typeof token == 'string') {
                auth = token;
            }
            else if (typeof token == 'function') {
                let res = token();
                if (res instanceof Promise)
                    auth = await res;
                else
                    auth = res;
            }
            req.headers = Object.fromEntries(Object.entries(req.headers).filter(([key]) => !key.startsWith('amz-') && !key.startsWith('x-amz-')));
            if (token)
                req.headers.Authorization = `Bearer ${auth}`;
            if (!req.body) {
                if (req.method == 'GET' || req.method == 'HEAD')
                    req.body = undefined;
                else if (req.method == 'POST')
                    req.body = '{}';
            }
            let queryParameters = req.query ? Object.entries(req.query) : [];
            let query = queryParameters
                .flatMap(([k, v]) => {
                if (v instanceof Array) {
                    return v.map(vi => `${k}=${encodeURIComponent(vi)}`);
                }
                else {
                    return [`${k}=${encodeURIComponent(v)}`];
                }
            })
                .join('&');
            let uri = `${req.protocol}//${req.hostname}${req.port ? `:${req.port}` : ''}${req.path}${query ? `?${query}` : ''}`;
            let res = await window.fetch(uri, Object.assign(req, init, {
                signal: opts.abortSignal
            }));
            return {
                response: {
                    statusCode: res.status,
                    body: await res.clone().blob(),
                    headers: Array.from(res.headers.entries()).reduce((s, [k, v]) => {
                        s[k] = v;
                        return s;
                    }, {})
                }
            };
        }
    };
}
exports.requestHandlerMiddleware = requestHandlerMiddleware;
