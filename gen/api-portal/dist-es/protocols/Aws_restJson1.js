import { __assign, __awaiter, __generator } from "tslib";
import { PortalServiceServiceException as __BaseException } from "../models/PortalServiceServiceException";
import { BadRequestError, ForbiddenError, InternalError, NotFoundError, NotificationRegisterService, RateLimitError, UnauthorizedError, } from "../models/models_0";
import { HttpRequest as __HttpRequest, } from "@aws-sdk/protocol-http";
import { decorateServiceException as __decorateServiceException, expectBoolean as __expectBoolean, expectInt32 as __expectInt32, expectNonNull as __expectNonNull, expectObject as __expectObject, expectString as __expectString, extendedEncodeURIComponent as __extendedEncodeURIComponent, } from "@aws-sdk/smithy-client";
export var serializeAws_restJson1GetGameProfileCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_name_id}/profile";
                if (input.gameNameId !== undefined) {
                    labelValue = input.gameNameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameNameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_name_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameNameId.');
                }
                query = __assign({}, (input.watchIndex !== undefined && { "watch_index": input.watchIndex }));
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "GET",
                        headers: headers,
                        path: resolvedPath,
                        query: query,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1GetSuggestedGamesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games";
                query = __assign({}, (input.watchIndex !== undefined && { "watch_index": input.watchIndex }));
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "GET",
                        headers: headers,
                        path: resolvedPath,
                        query: query,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1RegisterNotificationsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/notifications/register";
                body = JSON.stringify(__assign({}, (input.service !== undefined && input.service !== null && { "service": serializeAws_restJson1NotificationRegisterService(input.service, context) })));
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
export var serializeAws_restJson1ResolveBetaJoinRequestCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/beta-join-request/{identity_id}";
                if (input.identityId !== undefined) {
                    labelValue = input.identityId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: identityId.');
                    }
                    resolvedPath = resolvedPath.replace("{identity_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: identityId.');
                }
                body = JSON.stringify(__assign({}, (input.resolution !== undefined && input.resolution !== null && { "resolution": input.resolution })));
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
export var serializeAws_restJson1UnregisterNotificationsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/notifications/register";
                query = __assign({}, (input.service !== undefined && { "service": input.service }));
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "DELETE",
                        headers: headers,
                        path: resolvedPath,
                        query: query,
                        body: body,
                    })];
        }
    });
}); };
export var deserializeAws_restJson1GetGameProfileCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGameProfileCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    game: undefined,
                    watch: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.game !== undefined && data.game !== null) {
                    contents.game = deserializeAws_restJson1GameProfile(data.game, context);
                }
                if (data.watch !== undefined && data.watch !== null) {
                    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGameProfileCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetSuggestedGamesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetSuggestedGamesCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    games: undefined,
                    watch: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.games !== undefined && data.games !== null) {
                    contents.games = deserializeAws_restJson1GameSummaries(data.games, context);
                }
                if (data.watch !== undefined && data.watch !== null) {
                    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetSuggestedGamesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1RegisterNotificationsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1RegisterNotificationsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                };
                return [4, collectBody(output.body, context)];
            case 1:
                _a.sent();
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1RegisterNotificationsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ResolveBetaJoinRequestCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ResolveBetaJoinRequestCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                };
                return [4, collectBody(output.body, context)];
            case 1:
                _a.sent();
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ResolveBetaJoinRequestCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1UnregisterNotificationsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1UnregisterNotificationsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                };
                return [4, collectBody(output.body, context)];
            case 1:
                _a.sent();
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1UnregisterNotificationsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
var serializeAws_restJson1NotificationRegisterFirebaseService = function (input, context) {
    return __assign({}, (input.accessKey !== undefined && input.accessKey !== null && { "access_key": input.accessKey }));
};
var serializeAws_restJson1NotificationRegisterService = function (input, context) {
    return NotificationRegisterService.visit(input, {
        firebase: function (value) { return ({ "firebase": serializeAws_restJson1NotificationRegisterFirebaseService(value, context) }); },
        _: function (name, value) { return ({ name: value }); }
    });
};
var deserializeAws_restJson1WatchResponse = function (output, context) {
    return {
        index: __expectString(output.index),
    };
};
var deserializeAws_restJson1ErrorMetadata = function (output, context) {
    return output;
};
var deserializeAws_restJson1GameLeaderboardCategories = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GameLeaderboardCategory(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1GameLeaderboardCategory = function (output, context) {
    return {
        displayName: __expectString(output.display_name),
    };
};
var deserializeAws_restJson1GamePlatformLink = function (output, context) {
    return {
        displayName: __expectString(output.display_name),
        url: __expectString(output.url),
    };
};
var deserializeAws_restJson1GamePlatforms = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GamePlatformLink(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1GameProfile = function (output, context) {
    return {
        bannerUrl: __expectString(output.banner_url),
        description: __expectString(output.description),
        developer: (output.developer !== undefined && output.developer !== null) ? deserializeAws_restJson1GroupSummary(output.developer, context) : undefined,
        displayName: __expectString(output.display_name),
        gameId: __expectString(output.game_id),
        groupLeaderboardCategories: (output.group_leaderboard_categories !== undefined && output.group_leaderboard_categories !== null) ? deserializeAws_restJson1GameLeaderboardCategories(output.group_leaderboard_categories, context) : undefined,
        identityLeaderboardCategories: (output.identity_leaderboard_categories !== undefined && output.identity_leaderboard_categories !== null) ? deserializeAws_restJson1GameLeaderboardCategories(output.identity_leaderboard_categories, context) : undefined,
        logoUrl: __expectString(output.logo_url),
        nameId: __expectString(output.name_id),
        platforms: (output.platforms !== undefined && output.platforms !== null) ? deserializeAws_restJson1GamePlatforms(output.platforms, context) : undefined,
        recommendedGroups: (output.recommended_groups !== undefined && output.recommended_groups !== null) ? deserializeAws_restJson1GroupSummaries(output.recommended_groups, context) : undefined,
        tags: (output.tags !== undefined && output.tags !== null) ? deserializeAws_restJson1GameTags(output.tags, context) : undefined,
        url: __expectString(output.url),
    };
};
var deserializeAws_restJson1GameSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GameSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1GameSummary = function (output, context) {
    return {
        bannerUrl: __expectString(output.banner_url),
        developer: (output.developer !== undefined && output.developer !== null) ? deserializeAws_restJson1GroupHandle(output.developer, context) : undefined,
        displayName: __expectString(output.display_name),
        gameId: __expectString(output.game_id),
        logoUrl: __expectString(output.logo_url),
        nameId: __expectString(output.name_id),
        tags: (output.tags !== undefined && output.tags !== null) ? deserializeAws_restJson1GameTags(output.tags, context) : undefined,
        url: __expectString(output.url),
    };
};
var deserializeAws_restJson1GameTags = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectString(entry);
    });
    return retVal;
};
var deserializeAws_restJson1GroupExternalLinks = function (output, context) {
    return {
        chat: __expectString(output.chat),
        profile: __expectString(output.profile),
    };
};
var deserializeAws_restJson1GroupHandle = function (output, context) {
    return {
        avatarUrl: __expectString(output.avatar_url),
        displayName: __expectString(output.display_name),
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context) : undefined,
        groupId: __expectString(output.group_id),
        isDeveloper: __expectBoolean(output.is_developer),
    };
};
var deserializeAws_restJson1GroupSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1GroupSummary = function (output, context) {
    return {
        avatarUrl: __expectString(output.avatar_url),
        bio: __expectString(output.bio),
        displayName: __expectString(output.display_name),
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context) : undefined,
        groupId: __expectString(output.group_id),
        isCurrentIdentityMember: __expectBoolean(output.is_current_identity_member),
        isDeveloper: __expectBoolean(output.is_developer),
        memberCount: __expectInt32(output.member_count),
        ownerIdentityId: __expectString(output.owner_identity_id),
        publicity: __expectString(output.publicity),
    };
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
