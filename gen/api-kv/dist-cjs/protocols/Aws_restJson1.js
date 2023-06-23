"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1PutBatchCommand = exports.deserializeAws_restJson1PutCommand = exports.deserializeAws_restJson1GetBatchCommand = exports.deserializeAws_restJson1GetCommand = exports.deserializeAws_restJson1DeleteBatchCommand = exports.deserializeAws_restJson1DeleteCommand = exports.serializeAws_restJson1PutBatchCommand = exports.serializeAws_restJson1PutCommand = exports.serializeAws_restJson1GetBatchCommand = exports.serializeAws_restJson1GetCommand = exports.serializeAws_restJson1DeleteBatchCommand = exports.serializeAws_restJson1DeleteCommand = void 0;
const KvServiceServiceException_1 = require("../models/KvServiceServiceException");
const models_0_1 = require("../models/models_0");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1DeleteCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/entries";
    const query = {
        ...(input.key !== undefined && { "key": input.key }),
        ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
    };
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "DELETE",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1DeleteCommand = serializeAws_restJson1DeleteCommand;
const serializeAws_restJson1DeleteBatchCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/entries/batch";
    const query = {
        ...(input.keys !== undefined && { "keys": (input.keys || []).map(_entry => _entry) }),
        ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
    };
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "DELETE",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1DeleteBatchCommand = serializeAws_restJson1DeleteBatchCommand;
const serializeAws_restJson1GetCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/entries";
    const query = {
        ...(input.key !== undefined && { "key": input.key }),
        ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
        ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
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
exports.serializeAws_restJson1GetCommand = serializeAws_restJson1GetCommand;
const serializeAws_restJson1GetBatchCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/entries/batch";
    const query = {
        ...(input.keys !== undefined && { "keys": (input.keys || []).map(_entry => _entry) }),
        ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
        ...(input.namespaceId !== undefined && { "namespace_id": input.namespaceId }),
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
exports.serializeAws_restJson1GetBatchCommand = serializeAws_restJson1GetBatchCommand;
const serializeAws_restJson1PutCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/entries";
    let body;
    body = JSON.stringify({
        ...(input.key !== undefined && input.key !== null && { "key": input.key }),
        ...(input.namespaceId !== undefined && input.namespaceId !== null && { "namespace_id": input.namespaceId }),
        ...(input.value !== undefined && input.value !== null && { "value": serializeAws_restJson1Document(input.value, context) }),
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
exports.serializeAws_restJson1PutCommand = serializeAws_restJson1PutCommand;
const serializeAws_restJson1PutBatchCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/entries/batch";
    let body;
    body = JSON.stringify({
        ...(input.entries !== undefined && input.entries !== null && { "entries": serializeAws_restJson1PutEntries(input.entries, context) }),
        ...(input.namespaceId !== undefined && input.namespaceId !== null && { "namespace_id": input.namespaceId }),
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
exports.serializeAws_restJson1PutBatchCommand = serializeAws_restJson1PutBatchCommand;
const deserializeAws_restJson1DeleteCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeleteCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeleteCommand = deserializeAws_restJson1DeleteCommand;
const deserializeAws_restJson1DeleteCommandError = async (output, context) => {
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
            response = new KvServiceServiceException_1.KvServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1DeleteBatchCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeleteBatchCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeleteBatchCommand = deserializeAws_restJson1DeleteBatchCommand;
const deserializeAws_restJson1DeleteBatchCommandError = async (output, context) => {
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
            response = new KvServiceServiceException_1.KvServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        deleted: undefined,
        value: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.deleted !== undefined && data.deleted !== null) {
        contents.deleted = (0, smithy_client_1.expectBoolean)(data.deleted);
    }
    if (data.value !== undefined && data.value !== null) {
        contents.value = deserializeAws_restJson1Document(data.value, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetCommand = deserializeAws_restJson1GetCommand;
const deserializeAws_restJson1GetCommandError = async (output, context) => {
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
            response = new KvServiceServiceException_1.KvServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetBatchCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetBatchCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        entries: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.entries !== undefined && data.entries !== null) {
        contents.entries = deserializeAws_restJson1KvEntries(data.entries, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetBatchCommand = deserializeAws_restJson1GetBatchCommand;
const deserializeAws_restJson1GetBatchCommandError = async (output, context) => {
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
            response = new KvServiceServiceException_1.KvServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1PutCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PutCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PutCommand = deserializeAws_restJson1PutCommand;
const deserializeAws_restJson1PutCommandError = async (output, context) => {
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
            response = new KvServiceServiceException_1.KvServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1PutBatchCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PutBatchCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PutBatchCommand = deserializeAws_restJson1PutBatchCommand;
const deserializeAws_restJson1PutBatchCommandError = async (output, context) => {
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
            response = new KvServiceServiceException_1.KvServiceServiceException({
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
const serializeAws_restJson1PutEntries = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1PutEntry(entry, context);
    });
};
const serializeAws_restJson1PutEntry = (input, context) => {
    return {
        ...(input.key !== undefined && input.key !== null && { "key": input.key }),
        ...(input.value !== undefined && input.value !== null && { "value": serializeAws_restJson1Document(input.value, context) }),
    };
};
const serializeAws_restJson1Document = (input, context) => {
    return input;
};
const deserializeAws_restJson1KeyComponents = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1KvEntries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1KvEntry(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1KvEntry = (output, context) => {
    return {
        deleted: (0, smithy_client_1.expectBoolean)(output.deleted),
        key: (output.key !== undefined && output.key !== null) ? deserializeAws_restJson1KeyComponents(output.key, context) : undefined,
        value: (output.value !== undefined && output.value !== null) ? deserializeAws_restJson1Document(output.value, context) : undefined,
    };
};
const deserializeAws_restJson1WatchResponse = (output, context) => {
    return {
        index: (0, smithy_client_1.expectString)(output.index),
    };
};
const deserializeAws_restJson1ErrorMetadata = (output, context) => {
    return output;
};
const deserializeAws_restJson1Document = (output, context) => {
    return output;
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
