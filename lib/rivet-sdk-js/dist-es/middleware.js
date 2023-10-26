import { __awaiter, __generator, __read } from "tslib";
import { default as nodeFetch } from 'node-fetch';
export function requestHandlerMiddleware(token, init) {
    var _this = this;
    if (token === void 0) { token = undefined; }
    if (init === void 0) { init = { credentials: 'omit' }; }
    if (typeof window !== 'undefined') {
        console.warn('Using NodeJs handler middleware in a browser environment');
    }
    return {
        handle: function (req, opts) { return __awaiter(_this, void 0, void 0, function () {
            var auth, res_1, queryParameters, query, uri, res;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(typeof token == 'string')) return [3, 1];
                        auth = token;
                        return [3, 4];
                    case 1:
                        if (!(typeof token == 'function')) return [3, 4];
                        res_1 = token();
                        if (!(res_1 instanceof Promise)) return [3, 3];
                        return [4, res_1];
                    case 2:
                        auth = _c.sent();
                        return [3, 4];
                    case 3:
                        auth = res_1;
                        _c.label = 4;
                    case 4:
                        req.headers = Object.fromEntries(Object.entries(req.headers).filter(function (_a) {
                            var _b = __read(_a, 1), key = _b[0];
                            return !key.startsWith('amz-') && !key.startsWith('x-amz-');
                        }));
                        if (auth)
                            req.headers.Authorization = "Bearer ".concat(auth);
                        if (!req.body) {
                            if (req.method == 'GET' || req.method == 'HEAD')
                                req.body = undefined;
                            else if (req.method == 'POST')
                                req.body = '{}';
                        }
                        queryParameters = req.query ? Object.entries(req.query) : [];
                        query = queryParameters
                            .flatMap(function (_a) {
                            var _b = __read(_a, 2), k = _b[0], v = _b[1];
                            if (v instanceof Array) {
                                return v.map(function (vi) { return "".concat(k, "=").concat(encodeURIComponent(vi)); });
                            }
                            else {
                                return ["".concat(k, "=").concat(encodeURIComponent(v))];
                            }
                        })
                            .join('&');
                        uri = "".concat(req.protocol, "//").concat(req.hostname).concat(req.port ? ":".concat(req.port) : '').concat(req.path).concat(query ? "?".concat(query) : '');
                        return [4, nodeFetch(uri, Object.assign(req, init, {
                                signal: opts.abortSignal
                            }))];
                    case 5:
                        res = _c.sent();
                        _a = {};
                        _b = {
                            statusCode: res.status
                        };
                        return [4, res.body];
                    case 6: return [2, (_a.response = (_b.body = _c.sent(),
                            _b.headers = Array.from(res.headers.entries()).reduce(function (s, _a) {
                                var _b = __read(_a, 2), k = _b[0], v = _b[1];
                                s[k] = v;
                                return s;
                            }, {}),
                            _b),
                            _a)];
                }
            });
        }); }
    };
}
