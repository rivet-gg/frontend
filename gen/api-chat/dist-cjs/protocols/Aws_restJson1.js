"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1WatchThreadCommand = exports.deserializeAws_restJson1SetTypingStatusCommand = exports.deserializeAws_restJson1SetThreadReadCommand = exports.deserializeAws_restJson1SendChatMessageCommand = exports.deserializeAws_restJson1GetThreadTopicCommand = exports.deserializeAws_restJson1GetThreadHistoryCommand = exports.deserializeAws_restJson1GetDirectThreadCommand = exports.serializeAws_restJson1WatchThreadCommand = exports.serializeAws_restJson1SetTypingStatusCommand = exports.serializeAws_restJson1SetThreadReadCommand = exports.serializeAws_restJson1SendChatMessageCommand = exports.serializeAws_restJson1GetThreadTopicCommand = exports.serializeAws_restJson1GetThreadHistoryCommand = exports.serializeAws_restJson1GetDirectThreadCommand = void 0;
const ChatServiceServiceException_1 = require("../models/ChatServiceServiceException");
const models_0_1 = require("../models/models_0");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1GetDirectThreadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/identities/{identity_id}/thread";
    if (input.identityId !== undefined) {
        const labelValue = input.identityId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: identityId.');
        }
        resolvedPath = resolvedPath.replace("{identity_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: identityId.');
    }
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetDirectThreadCommand = serializeAws_restJson1GetDirectThreadCommand;
const serializeAws_restJson1GetThreadHistoryCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/history";
    if (input.threadId !== undefined) {
        const labelValue = input.threadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: threadId.');
        }
        resolvedPath = resolvedPath.replace("{thread_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: threadId.');
    }
    const query = {
        ...(input.ts !== undefined && { "ts": input.ts.toISOString().toString() }),
        ...(input.count !== undefined && { "count": input.count.toString() }),
        ...(input.queryDirection !== undefined && { "query_direction": input.queryDirection }),
    };
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1GetThreadHistoryCommand = serializeAws_restJson1GetThreadHistoryCommand;
const serializeAws_restJson1GetThreadTopicCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/topic";
    if (input.threadId !== undefined) {
        const labelValue = input.threadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: threadId.');
        }
        resolvedPath = resolvedPath.replace("{thread_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: threadId.');
    }
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetThreadTopicCommand = serializeAws_restJson1GetThreadTopicCommand;
const serializeAws_restJson1SendChatMessageCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/messages";
    let body;
    body = JSON.stringify({
        ...(input.messageBody !== undefined && input.messageBody !== null && { "message_body": serializeAws_restJson1SendMessageBody(input.messageBody, context) }),
        ...(input.topic !== undefined && input.topic !== null && { "topic": serializeAws_restJson1SendChatTopic(input.topic, context) }),
    });
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1SendChatMessageCommand = serializeAws_restJson1SendChatMessageCommand;
const serializeAws_restJson1SetThreadReadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/read";
    if (input.threadId !== undefined) {
        const labelValue = input.threadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: threadId.');
        }
        resolvedPath = resolvedPath.replace("{thread_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: threadId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.lastReadTs !== undefined && input.lastReadTs !== null && { "last_read_ts": input.lastReadTs.toISOString() }),
    });
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1SetThreadReadCommand = serializeAws_restJson1SetThreadReadCommand;
const serializeAws_restJson1SetTypingStatusCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/typing-status";
    if (input.threadId !== undefined) {
        const labelValue = input.threadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: threadId.');
        }
        resolvedPath = resolvedPath.replace("{thread_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: threadId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.status !== undefined && input.status !== null && { "status": serializeAws_restJson1ChatTypingStatus(input.status, context) }),
    });
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "PUT",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1SetTypingStatusCommand = serializeAws_restJson1SetTypingStatusCommand;
const serializeAws_restJson1WatchThreadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/threads/{thread_id}/live";
    if (input.threadId !== undefined) {
        const labelValue = input.threadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: threadId.');
        }
        resolvedPath = resolvedPath.replace("{thread_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: threadId.');
    }
    const query = {
        ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
    };
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1WatchThreadCommand = serializeAws_restJson1WatchThreadCommand;
const deserializeAws_restJson1GetDirectThreadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetDirectThreadCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        identity: undefined,
        threadId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.identity !== undefined && data.identity !== null) {
        contents.identity = deserializeAws_restJson1IdentityHandle(data.identity, context);
    }
    if (data.thread_id !== undefined && data.thread_id !== null) {
        contents.threadId = (0, smithy_client_1.expectString)(data.thread_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetDirectThreadCommand = deserializeAws_restJson1GetDirectThreadCommand;
const deserializeAws_restJson1GetDirectThreadCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context)
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            response = new ChatServiceServiceException_1.ChatServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetThreadHistoryCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetThreadHistoryCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        chatMessages: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.chat_messages !== undefined && data.chat_messages !== null) {
        contents.chatMessages = deserializeAws_restJson1ChatMessages(data.chat_messages, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetThreadHistoryCommand = deserializeAws_restJson1GetThreadHistoryCommand;
const deserializeAws_restJson1GetThreadHistoryCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context)
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            response = new ChatServiceServiceException_1.ChatServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetThreadTopicCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetThreadTopicCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        topic: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.topic !== undefined && data.topic !== null) {
        contents.topic = deserializeAws_restJson1ChatSimpleTopic((0, smithy_client_1.expectUnion)(data.topic), context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetThreadTopicCommand = deserializeAws_restJson1GetThreadTopicCommand;
const deserializeAws_restJson1GetThreadTopicCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context)
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            response = new ChatServiceServiceException_1.ChatServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1SendChatMessageCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1SendChatMessageCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        chatMessageId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.chat_message_id !== undefined && data.chat_message_id !== null) {
        contents.chatMessageId = (0, smithy_client_1.expectString)(data.chat_message_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1SendChatMessageCommand = deserializeAws_restJson1SendChatMessageCommand;
const deserializeAws_restJson1SendChatMessageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context)
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            response = new ChatServiceServiceException_1.ChatServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1SetThreadReadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1SetThreadReadCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1SetThreadReadCommand = deserializeAws_restJson1SetThreadReadCommand;
const deserializeAws_restJson1SetThreadReadCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context)
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            response = new ChatServiceServiceException_1.ChatServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1SetTypingStatusCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1SetTypingStatusCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1SetTypingStatusCommand = deserializeAws_restJson1SetTypingStatusCommand;
const deserializeAws_restJson1SetTypingStatusCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context)
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            response = new ChatServiceServiceException_1.ChatServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1WatchThreadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1WatchThreadCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        chatMessages: undefined,
        typingStatuses: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.chat_messages !== undefined && data.chat_messages !== null) {
        contents.chatMessages = deserializeAws_restJson1ChatMessages(data.chat_messages, context);
    }
    if (data.typing_statuses !== undefined && data.typing_statuses !== null) {
        contents.typingStatuses = deserializeAws_restJson1ChatIdentityTypingStatuses(data.typing_statuses, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1WatchThreadCommand = deserializeAws_restJson1WatchThreadCommand;
const deserializeAws_restJson1WatchThreadCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context)
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BadRequestError":
        case "rivet.error#BadRequestError":
            throw await deserializeAws_restJson1BadRequestErrorResponse(parsedOutput, context);
        case "ForbiddenError":
        case "rivet.error#ForbiddenError":
            throw await deserializeAws_restJson1ForbiddenErrorResponse(parsedOutput, context);
        case "InternalError":
        case "rivet.error#InternalError":
            throw await deserializeAws_restJson1InternalErrorResponse(parsedOutput, context);
        case "NotFoundError":
        case "rivet.error#NotFoundError":
            throw await deserializeAws_restJson1NotFoundErrorResponse(parsedOutput, context);
        case "RateLimitError":
        case "rivet.error#RateLimitError":
            throw await deserializeAws_restJson1RateLimitErrorResponse(parsedOutput, context);
        case "UnauthorizedError":
        case "rivet.error#UnauthorizedError":
            throw await deserializeAws_restJson1UnauthorizedErrorResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            response = new ChatServiceServiceException_1.ChatServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1BadRequestErrorResponse = async (parsedOutput, context) => {
    const contents = {};
    const data = parsedOutput.body;
    if (data.code !== undefined && data.code !== null) {
        contents.code = (0, smithy_client_1.expectString)(data.code);
    }
    if (data.documentation !== undefined && data.documentation !== null) {
        contents.documentation = (0, smithy_client_1.expectString)(data.documentation);
    }
    if (data.message !== undefined && data.message !== null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    if (data.metadata !== undefined && data.metadata !== null) {
        contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
    }
    const exception = new models_0_1.BadRequestError({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1ForbiddenErrorResponse = async (parsedOutput, context) => {
    const contents = {};
    const data = parsedOutput.body;
    if (data.code !== undefined && data.code !== null) {
        contents.code = (0, smithy_client_1.expectString)(data.code);
    }
    if (data.documentation !== undefined && data.documentation !== null) {
        contents.documentation = (0, smithy_client_1.expectString)(data.documentation);
    }
    if (data.message !== undefined && data.message !== null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    if (data.metadata !== undefined && data.metadata !== null) {
        contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
    }
    const exception = new models_0_1.ForbiddenError({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1InternalErrorResponse = async (parsedOutput, context) => {
    const contents = {};
    const data = parsedOutput.body;
    if (data.code !== undefined && data.code !== null) {
        contents.code = (0, smithy_client_1.expectString)(data.code);
    }
    if (data.documentation !== undefined && data.documentation !== null) {
        contents.documentation = (0, smithy_client_1.expectString)(data.documentation);
    }
    if (data.message !== undefined && data.message !== null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    if (data.metadata !== undefined && data.metadata !== null) {
        contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
    }
    const exception = new models_0_1.InternalError({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1NotFoundErrorResponse = async (parsedOutput, context) => {
    const contents = {};
    const data = parsedOutput.body;
    if (data.code !== undefined && data.code !== null) {
        contents.code = (0, smithy_client_1.expectString)(data.code);
    }
    if (data.documentation !== undefined && data.documentation !== null) {
        contents.documentation = (0, smithy_client_1.expectString)(data.documentation);
    }
    if (data.message !== undefined && data.message !== null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    if (data.metadata !== undefined && data.metadata !== null) {
        contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
    }
    const exception = new models_0_1.NotFoundError({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1RateLimitErrorResponse = async (parsedOutput, context) => {
    const contents = {};
    const data = parsedOutput.body;
    if (data.code !== undefined && data.code !== null) {
        contents.code = (0, smithy_client_1.expectString)(data.code);
    }
    if (data.documentation !== undefined && data.documentation !== null) {
        contents.documentation = (0, smithy_client_1.expectString)(data.documentation);
    }
    if (data.message !== undefined && data.message !== null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    if (data.metadata !== undefined && data.metadata !== null) {
        contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
    }
    const exception = new models_0_1.RateLimitError({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const deserializeAws_restJson1UnauthorizedErrorResponse = async (parsedOutput, context) => {
    const contents = {};
    const data = parsedOutput.body;
    if (data.code !== undefined && data.code !== null) {
        contents.code = (0, smithy_client_1.expectString)(data.code);
    }
    if (data.documentation !== undefined && data.documentation !== null) {
        contents.documentation = (0, smithy_client_1.expectString)(data.documentation);
    }
    if (data.message !== undefined && data.message !== null) {
        contents.message = (0, smithy_client_1.expectString)(data.message);
    }
    if (data.metadata !== undefined && data.metadata !== null) {
        contents.metadata = deserializeAws_restJson1ErrorMetadata(data.metadata, context);
    }
    const exception = new models_0_1.UnauthorizedError({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents
    });
    return (0, smithy_client_1.decorateServiceException)(exception, parsedOutput.body);
};
const serializeAws_restJson1SendChatTopic = (input, context) => {
    return models_0_1.SendChatTopic.visit(input, {
        groupId: value => ({ "group_id": value }),
        identityId: value => ({ "identity_id": value }),
        partyId: value => ({ "party_id": value }),
        threadId: value => ({ "thread_id": value }),
        _: (name, value) => ({ name: value })
    });
};
const serializeAws_restJson1SendMessageBody = (input, context) => {
    return models_0_1.SendMessageBody.visit(input, {
        partyInvite: value => ({ "party_invite": serializeAws_restJson1SendMessageBodyPartyInvite(value, context) }),
        text: value => ({ "text": serializeAws_restJson1SendMessageBodyText(value, context) }),
        _: (name, value) => ({ name: value })
    });
};
const serializeAws_restJson1SendMessageBodyPartyInvite = (input, context) => {
    return {
        ...(input.token !== undefined && input.token !== null && { "token": input.token }),
    };
};
const serializeAws_restJson1SendMessageBodyText = (input, context) => {
    return {
        ...(input.body !== undefined && input.body !== null && { "body": input.body }),
    };
};
const serializeAws_restJson1ChatTypingStatus = (input, context) => {
    return models_0_1.ChatTypingStatus.visit(input, {
        idle: value => ({ "idle": serializeAws_restJson1Unit(value, context) }),
        typing: value => ({ "typing": serializeAws_restJson1Unit(value, context) }),
        _: (name, value) => ({ name: value })
    });
};
const serializeAws_restJson1Unit = (input, context) => {
    return {};
};
const deserializeAws_restJson1ChatIdentityTypingStatus = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
        status: (output.status !== undefined && output.status !== null) ? deserializeAws_restJson1ChatTypingStatus((0, smithy_client_1.expectUnion)(output.status), context) : undefined,
    };
};
const deserializeAws_restJson1ChatIdentityTypingStatuses = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1ChatIdentityTypingStatus(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1ChatMessage = (output, context) => {
    return {
        body: (output.body !== undefined && output.body !== null) ? deserializeAws_restJson1ChatMessageBody((0, smithy_client_1.expectUnion)(output.body), context) : undefined,
        chatMessageId: (0, smithy_client_1.expectString)(output.chat_message_id),
        sendTs: (output.send_ts !== undefined && output.send_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.send_ts)) : undefined,
        threadId: (0, smithy_client_1.expectString)(output.thread_id),
    };
};
const deserializeAws_restJson1ChatMessageBody = (output, context) => {
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
const deserializeAws_restJson1ChatMessageBodyChatCreate = (output, context) => {
    return {};
};
const deserializeAws_restJson1ChatMessageBodyDeleted = (output, context) => {
    return {
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyGroupJoin = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyGroupLeave = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyGroupMemberKick = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyIdentityFollow = (output, context) => {
    return {};
};
const deserializeAws_restJson1ChatMessageBodyPartyActivityChange = (output, context) => {
    return {
        activity: (output.activity !== undefined && output.activity !== null) ? deserializeAws_restJson1PartyActivity((0, smithy_client_1.expectUnion)(output.activity), context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyPartyInvite = (output, context) => {
    return {
        inviteToken: (0, smithy_client_1.expectString)(output.invite_token),
        party: (output.party !== undefined && output.party !== null) ? deserializeAws_restJson1PartyHandle(output.party, context) : undefined,
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyPartyJoin = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyPartyJoinRequest = (output, context) => {
    return {
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyPartyLeave = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessageBodyText = (output, context) => {
    return {
        body: (0, smithy_client_1.expectString)(output.body),
        sender: (output.sender !== undefined && output.sender !== null) ? deserializeAws_restJson1IdentityHandle(output.sender, context) : undefined,
    };
};
const deserializeAws_restJson1ChatMessages = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1ChatMessage(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1ChatSimpleTopic = (output, context) => {
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
const deserializeAws_restJson1ChatSimpleTopicDirect = (output, context) => {
    return {
        identityAId: (0, smithy_client_1.expectString)(output.identity_a_id),
        identityBId: (0, smithy_client_1.expectString)(output.identity_b_id),
    };
};
const deserializeAws_restJson1ChatSimpleTopicGroup = (output, context) => {
    return {
        groupId: (0, smithy_client_1.expectString)(output.group_id),
    };
};
const deserializeAws_restJson1ChatSimpleTopicParty = (output, context) => {
    return {
        partyId: (0, smithy_client_1.expectString)(output.party_id),
    };
};
const deserializeAws_restJson1ChatTypingStatus = (output, context) => {
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
const deserializeAws_restJson1WatchResponse = (output, context) => {
    return {
        index: (0, smithy_client_1.expectString)(output.index),
    };
};
const deserializeAws_restJson1ErrorMetadata = (output, context) => {
    return output;
};
const deserializeAws_restJson1GameHandle = (output, context) => {
    return {
        bannerUrl: (0, smithy_client_1.expectString)(output.banner_url),
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        gameId: (0, smithy_client_1.expectString)(output.game_id),
        logoUrl: (0, smithy_client_1.expectString)(output.logo_url),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
    };
};
const deserializeAws_restJson1IdentityExternalLinks = (output, context) => {
    return {
        chat: (0, smithy_client_1.expectString)(output.chat),
        profile: (0, smithy_client_1.expectString)(output.profile),
        settings: (0, smithy_client_1.expectString)(output.settings),
    };
};
const deserializeAws_restJson1IdentityGameActivity = (output, context) => {
    return {
        game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context) : undefined,
        message: (0, smithy_client_1.expectString)(output.message),
        mutualMetadata: (output.mutual_metadata !== undefined && output.mutual_metadata !== null) ? deserializeAws_restJson1Document(output.mutual_metadata, context) : undefined,
        publicMetadata: (output.public_metadata !== undefined && output.public_metadata !== null) ? deserializeAws_restJson1Document(output.public_metadata, context) : undefined,
    };
};
const deserializeAws_restJson1IdentityHandle = (output, context) => {
    return {
        accountNumber: (0, smithy_client_1.expectInt32)(output.account_number),
        avatarUrl: (0, smithy_client_1.expectString)(output.avatar_url),
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1IdentityExternalLinks(output.external, context) : undefined,
        identityId: (0, smithy_client_1.expectString)(output.identity_id),
        isRegistered: (0, smithy_client_1.expectBoolean)(output.is_registered),
        party: (output.party !== undefined && output.party !== null) ? deserializeAws_restJson1PartyHandle(output.party, context) : undefined,
        presence: (output.presence !== undefined && output.presence !== null) ? deserializeAws_restJson1IdentityPresence(output.presence, context) : undefined,
    };
};
const deserializeAws_restJson1IdentityPresence = (output, context) => {
    return {
        gameActivity: (output.game_activity !== undefined && output.game_activity !== null) ? deserializeAws_restJson1IdentityGameActivity(output.game_activity, context) : undefined,
        status: (0, smithy_client_1.expectString)(output.status),
        updateTs: (output.update_ts !== undefined && output.update_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.update_ts)) : undefined,
    };
};
const deserializeAws_restJson1PartyActivity = (output, context) => {
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
const deserializeAws_restJson1PartyActivityIdle = (output, context) => {
    return {};
};
const deserializeAws_restJson1PartyActivityMatchmakerFindingLobby = (output, context) => {
    return {
        game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context) : undefined,
    };
};
const deserializeAws_restJson1PartyActivityMatchmakerLobby = (output, context) => {
    return {
        game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context) : undefined,
        lobby: (output.lobby !== undefined && output.lobby !== null) ? deserializeAws_restJson1PartyMatchmakerLobby(output.lobby, context) : undefined,
    };
};
const deserializeAws_restJson1PartyExternalLinks = (output, context) => {
    return {
        chat: (0, smithy_client_1.expectString)(output.chat),
    };
};
const deserializeAws_restJson1PartyHandle = (output, context) => {
    return {
        activity: (output.activity !== undefined && output.activity !== null) ? deserializeAws_restJson1PartyActivity((0, smithy_client_1.expectUnion)(output.activity), context) : undefined,
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1PartyExternalLinks(output.external, context) : undefined,
        partyId: (0, smithy_client_1.expectString)(output.party_id),
    };
};
const deserializeAws_restJson1PartyMatchmakerLobby = (output, context) => {
    return {
        lobbyId: (0, smithy_client_1.expectString)(output.lobby_id),
    };
};
const deserializeAws_restJson1Document = (output, context) => {
    return output;
};
const deserializeAws_restJson1Unit = (output, context) => {
    return {};
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then(body => context.utf8Encoder(body));
const isSerializableHeaderValue = (value) => value !== undefined &&
    value !== null &&
    value !== "" &&
    (!Object.getOwnPropertyNames(value).includes("length") ||
        value.length != 0) &&
    (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then(encoded => {
    if (encoded.length) {
        return JSON.parse(encoded);
    }
    return {};
});
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
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
