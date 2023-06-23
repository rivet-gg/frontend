import { __assign, __awaiter, __generator } from "tslib";
import { ChatServiceServiceException as __BaseException } from "../models/ChatServiceServiceException";
import { BadRequestError, ChatTypingStatus, ForbiddenError, InternalError, NotFoundError, RateLimitError, SendChatTopic, SendMessageBody, UnauthorizedError, } from "../models/models_0";
import { HttpRequest as __HttpRequest, } from "@aws-sdk/protocol-http";
import { decorateServiceException as __decorateServiceException, expectBoolean as __expectBoolean, expectInt32 as __expectInt32, expectNonNull as __expectNonNull, expectObject as __expectObject, expectString as __expectString, expectUnion as __expectUnion, extendedEncodeURIComponent as __extendedEncodeURIComponent, parseRfc3339DateTime as __parseRfc3339DateTime, } from "@aws-sdk/smithy-client";
export var serializeAws_restJson1GetDirectThreadCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/identities/{identity_id}/thread";
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
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "GET",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1GetThreadHistoryCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/threads/{thread_id}/history";
                if (input.threadId !== undefined) {
                    labelValue = input.threadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: threadId.');
                    }
                    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: threadId.');
                }
                query = __assign(__assign(__assign({}, (input.ts !== undefined && { "ts": input.ts.toISOString().toString() })), (input.count !== undefined && { "count": input.count.toString() })), (input.queryDirection !== undefined && { "query_direction": input.queryDirection }));
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
export var serializeAws_restJson1GetThreadTopicCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/threads/{thread_id}/topic";
                if (input.threadId !== undefined) {
                    labelValue = input.threadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: threadId.');
                    }
                    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: threadId.');
                }
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "GET",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1SendChatMessageCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/messages";
                body = JSON.stringify(__assign(__assign({}, (input.messageBody !== undefined && input.messageBody !== null && { "message_body": serializeAws_restJson1SendMessageBody(input.messageBody, context) })), (input.topic !== undefined && input.topic !== null && { "topic": serializeAws_restJson1SendChatTopic(input.topic, context) })));
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
export var serializeAws_restJson1SetThreadReadCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/threads/{thread_id}/read";
                if (input.threadId !== undefined) {
                    labelValue = input.threadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: threadId.');
                    }
                    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: threadId.');
                }
                body = JSON.stringify(__assign({}, (input.lastReadTs !== undefined && input.lastReadTs !== null && { "last_read_ts": input.lastReadTs.toISOString() })));
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
export var serializeAws_restJson1SetTypingStatusCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/threads/{thread_id}/typing-status";
                if (input.threadId !== undefined) {
                    labelValue = input.threadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: threadId.');
                    }
                    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: threadId.');
                }
                body = JSON.stringify(__assign({}, (input.status !== undefined && input.status !== null && { "status": serializeAws_restJson1ChatTypingStatus(input.status, context) })));
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "PUT",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1WatchThreadCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/threads/{thread_id}/live";
                if (input.threadId !== undefined) {
                    labelValue = input.threadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: threadId.');
                    }
                    resolvedPath = resolvedPath.replace("{thread_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: threadId.');
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
export var deserializeAws_restJson1GetDirectThreadCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetDirectThreadCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    identity: undefined,
                    threadId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.identity !== undefined && data.identity !== null) {
                    contents.identity = deserializeAws_restJson1IdentityHandle(data.identity, context);
                }
                if (data.thread_id !== undefined && data.thread_id !== null) {
                    contents.threadId = __expectString(data.thread_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetDirectThreadCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetThreadHistoryCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetThreadHistoryCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    chatMessages: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.chat_messages !== undefined && data.chat_messages !== null) {
                    contents.chatMessages = deserializeAws_restJson1ChatMessages(data.chat_messages, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetThreadHistoryCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetThreadTopicCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetThreadTopicCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    topic: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.topic !== undefined && data.topic !== null) {
                    contents.topic = deserializeAws_restJson1ChatSimpleTopic(__expectUnion(data.topic), context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetThreadTopicCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1SendChatMessageCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1SendChatMessageCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    chatMessageId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.chat_message_id !== undefined && data.chat_message_id !== null) {
                    contents.chatMessageId = __expectString(data.chat_message_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1SendChatMessageCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1SetThreadReadCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1SetThreadReadCommandError(output, context)];
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
var deserializeAws_restJson1SetThreadReadCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1SetTypingStatusCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1SetTypingStatusCommandError(output, context)];
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
var deserializeAws_restJson1SetTypingStatusCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1WatchThreadCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1WatchThreadCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    chatMessages: undefined,
                    typingStatuses: undefined,
                    watch: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.chat_messages !== undefined && data.chat_messages !== null) {
                    contents.chatMessages = deserializeAws_restJson1ChatMessages(data.chat_messages, context);
                }
                if (data.typing_statuses !== undefined && data.typing_statuses !== null) {
                    contents.typingStatuses = deserializeAws_restJson1ChatIdentityTypingStatuses(data.typing_statuses, context);
                }
                if (data.watch !== undefined && data.watch !== null) {
                    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1WatchThreadCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
var serializeAws_restJson1SendChatTopic = function (input, context) {
    return SendChatTopic.visit(input, {
        groupId: function (value) { return ({ "group_id": value }); },
        identityId: function (value) { return ({ "identity_id": value }); },
        partyId: function (value) { return ({ "party_id": value }); },
        threadId: function (value) { return ({ "thread_id": value }); },
        _: function (name, value) { return ({ name: value }); }
    });
};
var serializeAws_restJson1SendMessageBody = function (input, context) {
    return SendMessageBody.visit(input, {
        partyInvite: function (value) { return ({ "party_invite": serializeAws_restJson1SendMessageBodyPartyInvite(value, context) }); },
        text: function (value) { return ({ "text": serializeAws_restJson1SendMessageBodyText(value, context) }); },
        _: function (name, value) { return ({ name: value }); }
    });
};
var serializeAws_restJson1SendMessageBodyPartyInvite = function (input, context) {
    return __assign({}, (input.token !== undefined && input.token !== null && { "token": input.token }));
};
var serializeAws_restJson1SendMessageBodyText = function (input, context) {
    return __assign({}, (input.body !== undefined && input.body !== null && { "body": input.body }));
};
var serializeAws_restJson1ChatTypingStatus = function (input, context) {
    return ChatTypingStatus.visit(input, {
        idle: function (value) { return ({ "idle": serializeAws_restJson1Unit(value, context) }); },
        typing: function (value) { return ({ "typing": serializeAws_restJson1Unit(value, context) }); },
        _: function (name, value) { return ({ name: value }); }
    });
};
var serializeAws_restJson1Unit = function (input, context) {
    return {};
};
var deserializeAws_restJson1ChatIdentityTypingStatus = function (output, context) {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
        status: (output.status !== undefined && output.status !== null) ? deserializeAws_restJson1ChatTypingStatus(__expectUnion(output.status), context) : undefined,
    };
};
var deserializeAws_restJson1ChatIdentityTypingStatuses = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1ChatIdentityTypingStatus(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1ChatMessage = function (output, context) {
    return {
        body: (output.body !== undefined && output.body !== null) ? deserializeAws_restJson1ChatMessageBody(__expectUnion(output.body), context) : undefined,
        chatMessageId: __expectString(output.chat_message_id),
        sendTs: (output.send_ts !== undefined && output.send_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.send_ts)) : undefined,
        threadId: __expectString(output.thread_id),
    };
};
var deserializeAws_restJson1ChatMessageBody = function (output, context) {
    if (output.chat_create !== undefined && output.chat_create !== null) {
        return {
            chatCreate: deserializeAws_restJson1ChatMessageBodyChatCreate(output.chat_create, context)
        };
    }
    if (output.deleted !== undefined && output.deleted !== null) {
        return {
            deleted: deserializeAws_restJson1ChatMessageBodyDeleted(output.deleted, context)
        };
    }
    if (output.group_join !== undefined && output.group_join !== null) {
        return {
            groupJoin: deserializeAws_restJson1ChatMessageBodyGroupJoin(output.group_join, context)
        };
    }
    if (output.group_leave !== undefined && output.group_leave !== null) {
        return {
            groupLeave: deserializeAws_restJson1ChatMessageBodyGroupLeave(output.group_leave, context)
        };
    }
    if (output.group_member_kick !== undefined && output.group_member_kick !== null) {
        return {
            groupMemberKick: deserializeAws_restJson1ChatMessageBodyGroupMemberKick(output.group_member_kick, context)
        };
    }
    if (output.identity_follow !== undefined && output.identity_follow !== null) {
        return {
            identityFollow: deserializeAws_restJson1ChatMessageBodyIdentityFollow(output.identity_follow, context)
        };
    }
    if (output.party_activity_change !== undefined && output.party_activity_change !== null) {
        return {
            partyActivityChange: deserializeAws_restJson1ChatMessageBodyPartyActivityChange(output.party_activity_change, context)
        };
    }
    if (output.party_invite !== undefined && output.party_invite !== null) {
        return {
            partyInvite: deserializeAws_restJson1ChatMessageBodyPartyInvite(output.party_invite, context)
        };
    }
    if (output.party_join !== undefined && output.party_join !== null) {
        return {
            partyJoin: deserializeAws_restJson1ChatMessageBodyPartyJoin(output.party_join, context)
        };
    }
    if (output.party_join_request !== undefined && output.party_join_request !== null) {
        return {
            partyJoinRequest: deserializeAws_restJson1ChatMessageBodyPartyJoinRequest(output.party_join_request, context)
        };
    }
    if (output.party_leave !== undefined && output.party_leave !== null) {
        return {
            partyLeave: deserializeAws_restJson1ChatMessageBodyPartyLeave(output.party_leave, context)
        };
    }
    if (output.text !== undefined && output.text !== null) {
        return {
            text: deserializeAws_restJson1ChatMessageBodyText(output.text, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1ChatMessageBodyChatCreate = function (output, context) {
    return {};
};
var deserializeAws_restJson1ChatMessageBodyDeleted = function (output, context) {
    return {
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyGroupJoin = function (output, context) {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyGroupLeave = function (output, context) {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyGroupMemberKick = function (output, context) {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyIdentityFollow = function (output, context) {
    return {};
};
var deserializeAws_restJson1ChatMessageBodyPartyActivityChange = function (output, context) {
    return {
        activity: (output.activity !== undefined && output.activity !== null) ? deserializeAws_restJson1PartyActivity(__expectUnion(output.activity), context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyPartyInvite = function (output, context) {
    return {
        inviteToken: __expectString(output.invite_token),
        party: (output.party !== undefined && output.party !== null) ? deserializeAws_restJson1PartyHandle(output.party, context) : undefined,
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyPartyJoin = function (output, context) {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyPartyJoinRequest = function (output, context) {
    return {
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyPartyLeave = function (output, context) {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessageBodyText = function (output, context) {
    return {
        body: __expectString(output.body),
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
var deserializeAws_restJson1ChatMessages = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1ChatMessage(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1ChatSimpleTopic = function (output, context) {
    if (output.direct !== undefined && output.direct !== null) {
        return {
            direct: deserializeAws_restJson1ChatSimpleTopicDirect(output.direct, context)
        };
    }
    if (output.group !== undefined && output.group !== null) {
        return {
            group: deserializeAws_restJson1ChatSimpleTopicGroup(output.group, context)
        };
    }
    if (output.party !== undefined && output.party !== null) {
        return {
            party: deserializeAws_restJson1ChatSimpleTopicParty(output.party, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1ChatSimpleTopicDirect = function (output, context) {
    return {
        identityAId: __expectString(output.identity_a_id),
        identityBId: __expectString(output.identity_b_id),
    };
};
var deserializeAws_restJson1ChatSimpleTopicGroup = function (output, context) {
    return {
        groupId: __expectString(output.group_id),
    };
};
var deserializeAws_restJson1ChatSimpleTopicParty = function (output, context) {
    return {
        partyId: __expectString(output.party_id),
    };
};
var deserializeAws_restJson1ChatTypingStatus = function (output, context) {
    if (output.idle !== undefined && output.idle !== null) {
        return {
            idle: deserializeAws_restJson1Unit(output.idle, context)
        };
    }
    if (output.typing !== undefined && output.typing !== null) {
        return {
            typing: deserializeAws_restJson1Unit(output.typing, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1WatchResponse = function (output, context) {
    return {
        index: __expectString(output.index),
    };
};
var deserializeAws_restJson1ErrorMetadata = function (output, context) {
    return output;
};
var deserializeAws_restJson1GameHandle = function (output, context) {
    return {
        bannerUrl: __expectString(output.banner_url),
        displayName: __expectString(output.display_name),
        gameId: __expectString(output.game_id),
        logoUrl: __expectString(output.logo_url),
        nameId: __expectString(output.name_id),
    };
};
var deserializeAws_restJson1IdentityExternalLinks = function (output, context) {
    return {
        chat: __expectString(output.chat),
        profile: __expectString(output.profile),
        settings: __expectString(output.settings),
    };
};
var deserializeAws_restJson1IdentityGameActivity = function (output, context) {
    return {
        game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context) : undefined,
        message: __expectString(output.message),
        mutualMetadata: (output.mutual_metadata !== undefined && output.mutual_metadata !== null) ? deserializeAws_restJson1Document(output.mutual_metadata, context) : undefined,
        publicMetadata: (output.public_metadata !== undefined && output.public_metadata !== null) ? deserializeAws_restJson1Document(output.public_metadata, context) : undefined,
    };
};
var deserializeAws_restJson1IdentityHandle = function (output, context) {
    return {
        accountNumber: __expectInt32(output.account_number),
        avatarUrl: __expectString(output.avatar_url),
        displayName: __expectString(output.display_name),
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1IdentityExternalLinks(output.external, context) : undefined,
        identityId: __expectString(output.identity_id),
        isRegistered: __expectBoolean(output.is_registered),
        party: (output.party !== undefined && output.party !== null) ? deserializeAws_restJson1PartyHandle(output.party, context) : undefined,
        presence: (output.presence !== undefined && output.presence !== null) ? deserializeAws_restJson1IdentityPresence(output.presence, context) : undefined,
    };
};
var deserializeAws_restJson1IdentityPresence = function (output, context) {
    return {
        gameActivity: (output.game_activity !== undefined && output.game_activity !== null) ? deserializeAws_restJson1IdentityGameActivity(output.game_activity, context) : undefined,
        status: __expectString(output.status),
        updateTs: (output.update_ts !== undefined && output.update_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.update_ts)) : undefined,
    };
};
var deserializeAws_restJson1PartyActivity = function (output, context) {
    if (output.idle !== undefined && output.idle !== null) {
        return {
            idle: deserializeAws_restJson1PartyActivityIdle(output.idle, context)
        };
    }
    if (output.matchmaker_finding_lobby !== undefined && output.matchmaker_finding_lobby !== null) {
        return {
            matchmakerFindingLobby: deserializeAws_restJson1PartyActivityMatchmakerFindingLobby(output.matchmaker_finding_lobby, context)
        };
    }
    if (output.matchmaker_lobby !== undefined && output.matchmaker_lobby !== null) {
        return {
            matchmakerLobby: deserializeAws_restJson1PartyActivityMatchmakerLobby(output.matchmaker_lobby, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1PartyActivityIdle = function (output, context) {
    return {};
};
var deserializeAws_restJson1PartyActivityMatchmakerFindingLobby = function (output, context) {
    return {
        game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context) : undefined,
    };
};
var deserializeAws_restJson1PartyActivityMatchmakerLobby = function (output, context) {
    return {
        game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context) : undefined,
        lobby: (output.lobby !== undefined && output.lobby !== null) ? deserializeAws_restJson1PartyMatchmakerLobby(output.lobby, context) : undefined,
    };
};
var deserializeAws_restJson1PartyExternalLinks = function (output, context) {
    return {
        chat: __expectString(output.chat),
    };
};
var deserializeAws_restJson1PartyHandle = function (output, context) {
    return {
        activity: (output.activity !== undefined && output.activity !== null) ? deserializeAws_restJson1PartyActivity(__expectUnion(output.activity), context) : undefined,
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1PartyExternalLinks(output.external, context) : undefined,
        partyId: __expectString(output.party_id),
    };
};
var deserializeAws_restJson1PartyMatchmakerLobby = function (output, context) {
    return {
        lobbyId: __expectString(output.lobby_id),
    };
};
var deserializeAws_restJson1Document = function (output, context) {
    return output;
};
var deserializeAws_restJson1Unit = function (output, context) {
    return {};
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
