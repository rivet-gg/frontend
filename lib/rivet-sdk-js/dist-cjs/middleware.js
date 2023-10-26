"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandlerMiddleware = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
function requestHandlerMiddleware(token = undefined, init = { credentials: 'omit' }) {
    if (typeof window !== 'undefined') {
        console.warn('Using NodeJs handler middleware in a browser environment');
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
            if (auth)
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
            let res = await (0, node_fetch_1.default)(uri, Object.assign(req, init, {
                signal: opts.abortSignal
            }));
            return {
                response: {
                    statusCode: res.status,
                    body: await res.body,
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
