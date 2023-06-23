import { __assign, __awaiter, __generator } from "tslib";
import { AuthServiceServiceException as __BaseException } from "../models/AuthServiceServiceException";
import { BadRequestError, CaptchaConfig, ForbiddenError, InternalError, NotFoundError, RateLimitError, UnauthorizedError, } from "../models/models_0";
import { HttpRequest as __HttpRequest, } from "@aws-sdk/protocol-http";
import { decorateServiceException as __decorateServiceException, expectNonNull as __expectNonNull, expectObject as __expectObject, expectString as __expectString, parseRfc3339DateTime as __parseRfc3339DateTime, } from "@aws-sdk/smithy-client";
export var serializeAws_restJson1CompleteEmailVerificationCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/identity/email/complete-verification";
                body = JSON.stringify(__assign(__assign({}, (input.code !== undefined && input.code !== null && { "code": input.code })), (input.verificationId !== undefined && input.verificationId !== null && { "verification_id": input.verificationId })));
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "POST",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1RefreshIdentityTokenCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = __assign({ 'content-type': "application/json" }, isSerializableHeaderValue(input.cookie) && { "cookie": (input.cookie || []).map(function (_entry) { return _entry; }).join(', ') });
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/tokens/identity";
                body = JSON.stringify(__assign({}, (input.logout !== undefined && input.logout !== null && { "logout": input.logout })));
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "POST",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1StartEmailVerificationCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/identity/email/start-verification";
                body = JSON.stringify(__assign(__assign(__assign({}, (input.captcha !== undefined && input.captcha !== null && { "captcha": serializeAws_restJson1CaptchaConfig(input.captcha, context) })), (input.email !== undefined && input.email !== null && { "email": input.email })), (input.gameId !== undefined && input.gameId !== null && { "game_id": input.gameId })));
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "POST",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var deserializeAws_restJson1CompleteEmailVerificationCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CompleteEmailVerificationCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    status: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.status !== undefined && data.status !== null) {
                    contents.status = __expectString(data.status);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CompleteEmailVerificationCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, parsedBody;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = [__assign({}, output)];
                _c = {};
                return [4, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_c.body = _d.sent(), _c)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "BadRequestError": return [3, 2];
                    case "rivet.error#BadRequestError": return [3, 2];
                    case "ForbiddenError": return [3, 4];
                    case "rivet.error#ForbiddenError": return [3, 4];
                    case "InternalError": return [3, 6];
                    case "rivet.error#InternalError": return [3, 6];
                    case "NotFoundError": return [3, 8];
                    case "rivet.error#NotFoundError": return [3, 8];
                    case "RateLimitError": return [3, 10];
                    case "rivet.error#RateLimitError": return [3, 10];
                    case "UnauthorizedError": return [3, 12];
                    case "rivet.error#UnauthorizedError": return [3, 12];
                }
                return [3, 14];
            case 2: return [4, deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context)];
            case 3: throw _d.sent();
            case 4: return [4, deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context)];
            case 5: throw _d.sent();
            case 6: return [4, deserializeAws_restJson1InternalErrorResponse(parsedOutput, context)];
            case 7: throw _d.sent();
            case 8: return [4, deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context)];
            case 9: throw _d.sent();
            case 10: return [4, deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context)];
            case 11: throw _d.sent();
            case 12: return [4, deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context)];
            case 13: throw _d.sent();
            case 14:
                parsedBody = parsedOutput.body;
                response = new __BaseException({
                    name: parsedBody.code || parsedBody.Code || errorCode,
                    $fault: "client",
                    $metadata: deserializeMetadata(output)
                });
                throw __decorateServiceException(response, parsedBody);
        }
    });
}); };
export var deserializeAws_restJson1RefreshIdentityTokenCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1RefreshIdentityTokenCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    exp: undefined,
                    identityId: undefined,
                    setCookie: undefined,
                    token: undefined,
                };
                if (output.headers["set-cookie"] !== undefined) {
                    contents.setCookie = (output.headers['set-cookie'] || "").split(',').map(function (_entry) { return _entry.trim(); });
                }
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.exp !== undefined && data.exp !== null) {
                    contents.exp = __expectNonNull(__parseRfc3339DateTime(data.exp));
                }
                if (data.identity_id !== undefined && data.identity_id !== null) {
                    contents.identityId = __expectString(data.identity_id);
                }
                if (data.token !== undefined && data.token !== null) {
                    contents.token = __expectString(data.token);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1RefreshIdentityTokenCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, parsedBody;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = [__assign({}, output)];
                _c = {};
                return [4, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_c.body = _d.sent(), _c)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "BadRequestError": return [3, 2];
                    case "rivet.error#BadRequestError": return [3, 2];
                    case "ForbiddenError": return [3, 4];
                    case "rivet.error#ForbiddenError": return [3, 4];
                    case "InternalError": return [3, 6];
                    case "rivet.error#InternalError": return [3, 6];
                    case "NotFoundError": return [3, 8];
                    case "rivet.error#NotFoundError": return [3, 8];
                    case "RateLimitError": return [3, 10];
                    case "rivet.error#RateLimitError": return [3, 10];
                    case "UnauthorizedError": return [3, 12];
                    case "rivet.error#UnauthorizedError": return [3, 12];
                }
                return [3, 14];
            case 2: return [4, deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context)];
            case 3: throw _d.sent();
            case 4: return [4, deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context)];
            case 5: throw _d.sent();
            case 6: return [4, deserializeAws_restJson1InternalErrorResponse(parsedOutput, context)];
            case 7: throw _d.sent();
            case 8: return [4, deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context)];
            case 9: throw _d.sent();
            case 10: return [4, deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context)];
            case 11: throw _d.sent();
            case 12: return [4, deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context)];
            case 13: throw _d.sent();
            case 14:
                parsedBody = parsedOutput.body;
                response = new __BaseException({
                    name: parsedBody.code || parsedBody.Code || errorCode,
                    $fault: "client",
                    $metadata: deserializeMetadata(output)
                });
                throw __decorateServiceException(response, parsedBody);
        }
    });
}); };
export var deserializeAws_restJson1StartEmailVerificationCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1StartEmailVerificationCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    verificationId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.verification_id !== undefined && data.verification_id !== null) {
                    contents.verificationId = __expectString(data.verification_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1StartEmailVerificationCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, parsedBody;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = [__assign({}, output)];
                _c = {};
                return [4, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_c.body = _d.sent(), _c)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "BadRequestError": return [3, 2];
                    case "rivet.error#BadRequestError": return [3, 2];
                    case "ForbiddenError": return [3, 4];
                    case "rivet.error#ForbiddenError": return [3, 4];
                    case "InternalError": return [3, 6];
                    case "rivet.error#InternalError": return [3, 6];
                    case "NotFoundError": return [3, 8];
                    case "rivet.error#NotFoundError": return [3, 8];
                    case "RateLimitError": return [3, 10];
                    case "rivet.error#RateLimitError": return [3, 10];
                    case "UnauthorizedError": return [3, 12];
                    case "rivet.error#UnauthorizedError": return [3, 12];
                }
                return [3, 14];
            case 2: return [4, deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context)];
            case 3: throw _d.sent();
            case 4: return [4, deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context)];
            case 5: throw _d.sent();
            case 6: return [4, deserializeAws_restJson1InternalErrorResponse(parsedOutput, context)];
            case 7: throw _d.sent();
            case 8: return [4, deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context)];
            case 9: throw _d.sent();
            case 10: return [4, deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context)];
            case 11: throw _d.sent();
            case 12: return [4, deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context)];
            case 13: throw _d.sent();
            case 14:
                parsedBody = parsedOutput.body;
                response = new __BaseException({
                    name: parsedBody.code || parsedBody.Code || errorCode,
                    $fault: "client",
                    $metadata: deserializeMetadata(output)
                });
                throw __decorateServiceException(response, parsedBody);
        }
    });
}); };
var deserializeAws_restJson1BadRequestErrorResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, exception;
    return __generator(this, function (_a) {
        contents = {};
        data = parsedOutput.body;
        if (data.code !== undefined && data.code !== null) {
            contents.code = __expectString(data.code);
        }
        if (data.documentation !== undefined && data.documentation !== null) {
            contents.documentation = __expectString(data.documentation);
        }
        if (data.message !== undefined && data.message !== null) {
            contents.message = __expectString(data.message);
        }
        if (data.metadata !== undefined && data.metadata !== null) {
            contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
        }
        exception = new BadRequestError(__assign({ $metadata: deserializeMetadata(parsedOutput) }, contents));
        return [2, __decorateServiceException(exception, parsedOutput.body)];
    });
}); };
var deserializeAws_restJson1ForbiddenErrorResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, exception;
    return __generator(this, function (_a) {
        contents = {};
        data = parsedOutput.body;
        if (data.code !== undefined && data.code !== null) {
            contents.code = __expectString(data.code);
        }
        if (data.documentation !== undefined && data.documentation !== null) {
            contents.documentation = __expectString(data.documentation);
        }
        if (data.message !== undefined && data.message !== null) {
            contents.message = __expectString(data.message);
        }
        if (data.metadata !== undefined && data.metadata !== null) {
            contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
        }
        exception = new ForbiddenError(__assign({ $metadata: deserializeMetadata(parsedOutput) }, contents));
        return [2, __decorateServiceException(exception, parsedOutput.body)];
    });
}); };
var deserializeAws_restJson1InternalErrorResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, exception;
    return __generator(this, function (_a) {
        contents = {};
        data = parsedOutput.body;
        if (data.code !== undefined && data.code !== null) {
            contents.code = __expectString(data.code);
        }
        if (data.documentation !== undefined && data.documentation !== null) {
            contents.documentation = __expectString(data.documentation);
        }
        if (data.message !== undefined && data.message !== null) {
            contents.message = __expectString(data.message);
        }
        if (data.metadata !== undefined && data.metadata !== null) {
            contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
        }
        exception = new InternalError(__assign({ $metadata: deserializeMetadata(parsedOutput) }, contents));
        return [2, __decorateServiceException(exception, parsedOutput.body)];
    });
}); };
var deserializeAws_restJson1NotFoundErrorResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, exception;
    return __generator(this, function (_a) {
        contents = {};
        data = parsedOutput.body;
        if (data.code !== undefined && data.code !== null) {
            contents.code = __expectString(data.code);
        }
        if (data.documentation !== undefined && data.documentation !== null) {
            contents.documentation = __expectString(data.documentation);
        }
        if (data.message !== undefined && data.message !== null) {
            contents.message = __expectString(data.message);
        }
        if (data.metadata !== undefined && data.metadata !== null) {
            contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
        }
        exception = new NotFoundError(__assign({ $metadata: deserializeMetadata(parsedOutput) }, contents));
        return [2, __decorateServiceException(exception, parsedOutput.body)];
    });
}); };
var deserializeAws_restJson1RateLimitErrorResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, exception;
    return __generator(this, function (_a) {
        contents = {};
        data = parsedOutput.body;
        if (data.code !== undefined && data.code !== null) {
            contents.code = __expectString(data.code);
        }
        if (data.documentation !== undefined && data.documentation !== null) {
            contents.documentation = __expectString(data.documentation);
        }
        if (data.message !== undefined && data.message !== null) {
            contents.message = __expectString(data.message);
        }
        if (data.metadata !== undefined && data.metadata !== null) {
            contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
        }
        exception = new RateLimitError(__assign({ $metadata: deserializeMetadata(parsedOutput) }, contents));
        return [2, __decorateServiceException(exception, parsedOutput.body)];
    });
}); };
var deserializeAws_restJson1UnauthorizedErrorResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, exception;
    return __generator(this, function (_a) {
        contents = {};
        data = parsedOutput.body;
        if (data.code !== undefined && data.code !== null) {
            contents.code = __expectString(data.code);
        }
        if (data.documentation !== undefined && data.documentation !== null) {
            contents.documentation = __expectString(data.documentation);
        }
        if (data.message !== undefined && data.message !== null) {
            contents.message = __expectString(data.message);
        }
        if (data.metadata !== undefined && data.metadata !== null) {
            contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
        }
        exception = new UnauthorizedError(__assign({ $metadata: deserializeMetadata(parsedOutput) }, contents));
        return [2, __decorateServiceException(exception, parsedOutput.body)];
    });
}); };
var serializeAws_restJson1CaptchaConfig = function (input, context) {
    return CaptchaConfig.visit(input, {
        hcaptcha: function (value) { return ({ "hcaptcha": serializeAws_restJson1CaptchaConfigHcaptcha(value, context) }); },
        turnstile: function (value) { return ({ "turnstile": serializeAws_restJson1CaptchaConfigTurnstile(value, context) }); },
        _: function (name, value) { return ({ name: value }); }
    });
};
var serializeAws_restJson1CaptchaConfigHcaptcha = function (input, context) {
    return __assign({}, (input.clientResponse !== undefined && input.clientResponse !== null && { "client_response": input.clientResponse }));
};
var serializeAws_restJson1CaptchaConfigTurnstile = function (input, context) {
    return __assign({}, (input.clientResponse !== undefined && input.clientResponse !== null && { "client_response": input.clientResponse }));
};
var deserializeAws_restJson1ErrorMetadata = function (output, context) {
    return output;
};
var deserializeMetadata = function (output) {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
var collectBody = function (streamBody, context) {
    if (streamBody === void 0) { streamBody = new Uint8Array(); }
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
var collectBodyString = function (streamBody, context) { return collectBody(streamBody, context).then(function (body) { return context.utf8Encoder(body); }); };
var isSerializableHeaderValue = function (value) {
    return value !== undefined &&
        value !== null &&
        value !== "" &&
        (!Object.getOwnPropertyNames(value).includes("length") ||
            value.length != 0) &&
        (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
};
var parseBody = function (streamBody, context) { return collectBodyString(streamBody, context).then(function (encoded) {
    if (encoded.length) {
        return JSON.parse(encoded);
    }
    return {};
}); };
var loadRestJsonErrorCode = function (output, data) {
    var findKey = function (object, key) { return Object.keys(object).find(function (k) { return k.toLowerCase() === key.toLowerCase(); }); };
    var sanitizeErrorCode = function (rawValue) {
        var cleanValue = rawValue;
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    var headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
    return "";
};
