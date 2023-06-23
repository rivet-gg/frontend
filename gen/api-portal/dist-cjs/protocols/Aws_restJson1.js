"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1UnregisterNotificationsCommand = exports.deserializeAws_restJson1ResolveBetaJoinRequestCommand = exports.deserializeAws_restJson1RegisterNotificationsCommand = exports.deserializeAws_restJson1GetSuggestedGamesCommand = exports.deserializeAws_restJson1GetGameProfileCommand = exports.serializeAws_restJson1UnregisterNotificationsCommand = exports.serializeAws_restJson1ResolveBetaJoinRequestCommand = exports.serializeAws_restJson1RegisterNotificationsCommand = exports.serializeAws_restJson1GetSuggestedGamesCommand = exports.serializeAws_restJson1GetGameProfileCommand = void 0;
const PortalServiceServiceException_1 = require("../models/PortalServiceServiceException");
const models_0_1 = require("../models/models_0");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1GetGameProfileCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_name_id}/profile";
    if (input.gameNameId !== undefined) {
        const labelValue = input.gameNameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameNameId.');
        }
        resolvedPath = resolvedPath.replace("{game_name_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameNameId.');
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
exports.serializeAws_restJson1GetGameProfileCommand = serializeAws_restJson1GetGameProfileCommand;
const serializeAws_restJson1GetSuggestedGamesCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games";
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
exports.serializeAws_restJson1GetSuggestedGamesCommand = serializeAws_restJson1GetSuggestedGamesCommand;
const serializeAws_restJson1RegisterNotificationsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/notifications/register";
    let body;
    body = JSON.stringify({
        ...(input.service !== undefined && input.service !== null && { "service": serializeAws_restJson1NotificationRegisterService(input.service, context) }),
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
exports.serializeAws_restJson1RegisterNotificationsCommand = serializeAws_restJson1RegisterNotificationsCommand;
const serializeAws_restJson1ResolveBetaJoinRequestCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/beta-join-request/{identity_id}";
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
    body = JSON.stringify({
        ...(input.resolution !== undefined && input.resolution !== null && { "resolution": input.resolution }),
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
exports.serializeAws_restJson1ResolveBetaJoinRequestCommand = serializeAws_restJson1ResolveBetaJoinRequestCommand;
const serializeAws_restJson1UnregisterNotificationsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/notifications/register";
    const query = {
        ...(input.service !== undefined && { "service": input.service }),
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
exports.serializeAws_restJson1UnregisterNotificationsCommand = serializeAws_restJson1UnregisterNotificationsCommand;
const deserializeAws_restJson1GetGameProfileCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGameProfileCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        game: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.game !== undefined && data.game !== null) {
        contents.game = deserializeAws_restJson1GameProfile(data.game, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGameProfileCommand = deserializeAws_restJson1GetGameProfileCommand;
const deserializeAws_restJson1GetGameProfileCommandError = async (output, context) => {
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
            response = new PortalServiceServiceException_1.PortalServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetSuggestedGamesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetSuggestedGamesCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        games: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.games !== undefined && data.games !== null) {
        contents.games = deserializeAws_restJson1GameSummaries(data.games, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetSuggestedGamesCommand = deserializeAws_restJson1GetSuggestedGamesCommand;
const deserializeAws_restJson1GetSuggestedGamesCommandError = async (output, context) => {
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
            response = new PortalServiceServiceException_1.PortalServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1RegisterNotificationsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1RegisterNotificationsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1RegisterNotificationsCommand = deserializeAws_restJson1RegisterNotificationsCommand;
const deserializeAws_restJson1RegisterNotificationsCommandError = async (output, context) => {
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
            response = new PortalServiceServiceException_1.PortalServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ResolveBetaJoinRequestCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ResolveBetaJoinRequestCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ResolveBetaJoinRequestCommand = deserializeAws_restJson1ResolveBetaJoinRequestCommand;
const deserializeAws_restJson1ResolveBetaJoinRequestCommandError = async (output, context) => {
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
            response = new PortalServiceServiceException_1.PortalServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1UnregisterNotificationsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UnregisterNotificationsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UnregisterNotificationsCommand = deserializeAws_restJson1UnregisterNotificationsCommand;
const deserializeAws_restJson1UnregisterNotificationsCommandError = async (output, context) => {
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
            response = new PortalServiceServiceException_1.PortalServiceServiceException({
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
const serializeAws_restJson1NotificationRegisterFirebaseService = (input, context) => {
    return {
        ...(input.accessKey !== undefined && input.accessKey !== null && { "access_key": input.accessKey }),
    };
};
const serializeAws_restJson1NotificationRegisterService = (input, context) => {
    return models_0_1.NotificationRegisterService.visit(input, {
        firebase: value => ({ "firebase": serializeAws_restJson1NotificationRegisterFirebaseService(value, context) }),
        _: (name, value) => ({ name: value })
    });
};
const deserializeAws_restJson1WatchResponse = (output, context) => {
    return {
        index: (0, smithy_client_1.expectString)(output.index),
    };
};
const deserializeAws_restJson1ErrorMetadata = (output, context) => {
    return output;
};
const deserializeAws_restJson1GameLeaderboardCategories = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GameLeaderboardCategory(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GameLeaderboardCategory = (output, context) => {
    return {
        displayName: (0, smithy_client_1.expectString)(output.display_name),
    };
};
const deserializeAws_restJson1GamePlatformLink = (output, context) => {
    return {
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        url: (0, smithy_client_1.expectString)(output.url),
    };
};
const deserializeAws_restJson1GamePlatforms = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GamePlatformLink(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GameProfile = (output, context) => {
    return {
        bannerUrl: (0, smithy_client_1.expectString)(output.banner_url),
        description: (0, smithy_client_1.expectString)(output.description),
        developer: (output.developer !== undefined && output.developer !== null) ? deserializeAws_restJson1GroupSummary(output.developer, context) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        gameId: (0, smithy_client_1.expectString)(output.game_id),
        groupLeaderboardCategories: (output.group_leaderboard_categories !== undefined && output.group_leaderboard_categories !== null) ? deserializeAws_restJson1GameLeaderboardCategories(output.group_leaderboard_categories, context) : undefined,
        identityLeaderboardCategories: (output.identity_leaderboard_categories !== undefined && output.identity_leaderboard_categories !== null) ? deserializeAws_restJson1GameLeaderboardCategories(output.identity_leaderboard_categories, context) : undefined,
        logoUrl: (0, smithy_client_1.expectString)(output.logo_url),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
        platforms: (output.platforms !== undefined && output.platforms !== null) ? deserializeAws_restJson1GamePlatforms(output.platforms, context) : undefined,
        recommendedGroups: (output.recommended_groups !== undefined && output.recommended_groups !== null) ? deserializeAws_restJson1GroupSummaries(output.recommended_groups, context) : undefined,
        tags: (output.tags !== undefined && output.tags !== null) ? deserializeAws_restJson1GameTags(output.tags, context) : undefined,
        url: (0, smithy_client_1.expectString)(output.url),
    };
};
const deserializeAws_restJson1GameSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GameSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GameSummary = (output, context) => {
    return {
        bannerUrl: (0, smithy_client_1.expectString)(output.banner_url),
        developer: (output.developer !== undefined && output.developer !== null) ? deserializeAws_restJson1GroupHandle(output.developer, context) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        gameId: (0, smithy_client_1.expectString)(output.game_id),
        logoUrl: (0, smithy_client_1.expectString)(output.logo_url),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
        tags: (output.tags !== undefined && output.tags !== null) ? deserializeAws_restJson1GameTags(output.tags, context) : undefined,
        url: (0, smithy_client_1.expectString)(output.url),
    };
};
const deserializeAws_restJson1GameTags = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1GroupExternalLinks = (output, context) => {
    return {
        chat: (0, smithy_client_1.expectString)(output.chat),
        profile: (0, smithy_client_1.expectString)(output.profile),
    };
};
const deserializeAws_restJson1GroupHandle = (output, context) => {
    return {
        avatarUrl: (0, smithy_client_1.expectString)(output.avatar_url),
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context) : undefined,
        groupId: (0, smithy_client_1.expectString)(output.group_id),
        isDeveloper: (0, smithy_client_1.expectBoolean)(output.is_developer),
    };
};
const deserializeAws_restJson1GroupSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GroupSummary = (output, context) => {
    return {
        avatarUrl: (0, smithy_client_1.expectString)(output.avatar_url),
        bio: (0, smithy_client_1.expectString)(output.bio),
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context) : undefined,
        groupId: (0, smithy_client_1.expectString)(output.group_id),
        isCurrentIdentityMember: (0, smithy_client_1.expectBoolean)(output.is_current_identity_member),
        isDeveloper: (0, smithy_client_1.expectBoolean)(output.is_developer),
        memberCount: (0, smithy_client_1.expectInt32)(output.member_count),
        ownerIdentityId: (0, smithy_client_1.expectString)(output.owner_identity_id),
        publicity: (0, smithy_client_1.expectString)(output.publicity),
    };
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
