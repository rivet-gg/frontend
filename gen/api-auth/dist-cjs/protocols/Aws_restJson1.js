"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1StartEmailVerificationCommand = exports.deserializeAws_restJson1RefreshIdentityTokenCommand = exports.deserializeAws_restJson1CompleteEmailVerificationCommand = exports.serializeAws_restJson1StartEmailVerificationCommand = exports.serializeAws_restJson1RefreshIdentityTokenCommand = exports.serializeAws_restJson1CompleteEmailVerificationCommand = void 0;
const AuthServiceServiceException_1 = require("../models/AuthServiceServiceException");
const models_0_1 = require("../models/models_0");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1CompleteEmailVerificationCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/identity/email/complete-verification";
    let body;
    body = JSON.stringify({
        ...(input.code !== undefined && input.code !== null && { "code": input.code }),
        ...(input.verificationId !== undefined && input.verificationId !== null && { "verification_id": input.verificationId }),
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
exports.serializeAws_restJson1CompleteEmailVerificationCommand = serializeAws_restJson1CompleteEmailVerificationCommand;
const serializeAws_restJson1RefreshIdentityTokenCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
        ...isSerializableHeaderValue(input.cookie) && { "cookie": (input.cookie || []).map(_entry => _entry).join(', ') },
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/tokens/identity";
    let body;
    body = JSON.stringify({
        ...(input.logout !== undefined && input.logout !== null && { "logout": input.logout }),
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
exports.serializeAws_restJson1RefreshIdentityTokenCommand = serializeAws_restJson1RefreshIdentityTokenCommand;
const serializeAws_restJson1StartEmailVerificationCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/identity/email/start-verification";
    let body;
    body = JSON.stringify({
        ...(input.captcha !== undefined && input.captcha !== null && { "captcha": serializeAws_restJson1CaptchaConfig(input.captcha, context) }),
        ...(input.email !== undefined && input.email !== null && { "email": input.email }),
        ...(input.gameId !== undefined && input.gameId !== null && { "game_id": input.gameId }),
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
exports.serializeAws_restJson1StartEmailVerificationCommand = serializeAws_restJson1StartEmailVerificationCommand;
const deserializeAws_restJson1CompleteEmailVerificationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CompleteEmailVerificationCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        status: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.status !== undefined && data.status !== null) {
        contents.status = (0, smithy_client_1.expectString)(data.status);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CompleteEmailVerificationCommand = deserializeAws_restJson1CompleteEmailVerificationCommand;
const deserializeAws_restJson1CompleteEmailVerificationCommandError = async (output, context) => {
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
            response = new AuthServiceServiceException_1.AuthServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1RefreshIdentityTokenCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1RefreshIdentityTokenCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        exp: undefined,
        identityId: undefined,
        setCookie: undefined,
        token: undefined,
    };
    if (output.headers["set-cookie"] !== undefined) {
        contents.setCookie = (output.headers['set-cookie'] || "").split(',').map(_entry => _entry.trim());
    }
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.exp !== undefined && data.exp !== null) {
        contents.exp = (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(data.exp));
    }
    if (data.identity_id !== undefined && data.identity_id !== null) {
        contents.identityId = (0, smithy_client_1.expectString)(data.identity_id);
    }
    if (data.token !== undefined && data.token !== null) {
        contents.token = (0, smithy_client_1.expectString)(data.token);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1RefreshIdentityTokenCommand = deserializeAws_restJson1RefreshIdentityTokenCommand;
const deserializeAws_restJson1RefreshIdentityTokenCommandError = async (output, context) => {
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
            response = new AuthServiceServiceException_1.AuthServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1StartEmailVerificationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1StartEmailVerificationCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        verificationId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.verification_id !== undefined && data.verification_id !== null) {
        contents.verificationId = (0, smithy_client_1.expectString)(data.verification_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1StartEmailVerificationCommand = deserializeAws_restJson1StartEmailVerificationCommand;
const deserializeAws_restJson1StartEmailVerificationCommandError = async (output, context) => {
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
            response = new AuthServiceServiceException_1.AuthServiceServiceException({
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
const serializeAws_restJson1CaptchaConfig = (input, context) => {
    return models_0_1.CaptchaConfig.visit(input, {
        hcaptcha: value => ({ "hcaptcha": serializeAws_restJson1CaptchaConfigHcaptcha(value, context) }),
        turnstile: value => ({ "turnstile": serializeAws_restJson1CaptchaConfigTurnstile(value, context) }),
        _: (name, value) => ({ name: value })
    });
};
const serializeAws_restJson1CaptchaConfigHcaptcha = (input, context) => {
    return {
        ...(input.clientResponse !== undefined && input.clientResponse !== null && { "client_response": input.clientResponse }),
    };
};
const serializeAws_restJson1CaptchaConfigTurnstile = (input, context) => {
    return {
        ...(input.clientResponse !== undefined && input.clientResponse !== null && { "client_response": input.clientResponse }),
    };
};
const deserializeAws_restJson1ErrorMetadata = (output, context) => {
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
