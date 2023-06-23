import { __assign, __awaiter, __generator } from "tslib";
import { CloudServiceServiceException as __BaseException } from "../models/CloudServiceServiceException";
import { BadRequestError, CdnVersionMiddlewareKind, ForbiddenError, InternalError, LobbyGroupRuntime, NotFoundError, RateLimitError, UnauthorizedError, } from "../models/models_0";
import { HttpRequest as __HttpRequest, } from "@aws-sdk/protocol-http";
import { decorateServiceException as __decorateServiceException, expectBoolean as __expectBoolean, expectInt32 as __expectInt32, expectLong as __expectLong, expectNonNull as __expectNonNull, expectObject as __expectObject, expectShort as __expectShort, expectString as __expectString, expectUnion as __expectUnion, extendedEncodeURIComponent as __extendedEncodeURIComponent, limitedParseFloat32 as __limitedParseFloat32, parseRfc3339DateTime as __parseRfc3339DateTime, } from "@aws-sdk/smithy-client";
export var serializeAws_restJson1AddNamespaceDomainCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/domains";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign({}, (input.domain !== undefined && input.domain !== null && { "domain": input.domain })));
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
export var serializeAws_restJson1CompleteCustomAvatarUploadCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/avatar-upload/{upload_id}/complete";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.uploadId !== undefined) {
                    labelValue = input.uploadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: uploadId.');
                    }
                    resolvedPath = resolvedPath.replace("{upload_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: uploadId.');
                }
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
export var serializeAws_restJson1CompleteUploadCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/uploads/{upload_id}/complete";
                if (input.uploadId !== undefined) {
                    labelValue = input.uploadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: uploadId.');
                    }
                    resolvedPath = resolvedPath.replace("{upload_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: uploadId.');
                }
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
export var serializeAws_restJson1ConvertGroupCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/groups/{group_id}/convert";
                if (input.groupId !== undefined) {
                    labelValue = input.groupId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: groupId.');
                    }
                    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: groupId.');
                }
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
export var serializeAws_restJson1CreateCloudTokenCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/tokens/cloud";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
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
export var serializeAws_restJson1CreateGameCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games";
                body = JSON.stringify(__assign(__assign(__assign({}, (input.developerGroupId !== undefined && input.developerGroupId !== null && { "developer_group_id": input.developerGroupId })), (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })), (input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId })));
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
export var serializeAws_restJson1CreateGameBuildCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/builds";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign(__assign({}, (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })), (input.imageFile !== undefined && input.imageFile !== null && { "image_file": serializeAws_restJson1UploadPrepareFile(input.imageFile, context) })), (input.imageTag !== undefined && input.imageTag !== null && { "image_tag": input.imageTag })));
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
export var serializeAws_restJson1CreateGameCdnSiteCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/cdn/sites";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })), (input.files !== undefined && input.files !== null && { "files": serializeAws_restJson1UploadPrepareFiles(input.files, context) })));
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
export var serializeAws_restJson1CreateGameNamespaceCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign(__assign({}, (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })), (input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId })), (input.versionId !== undefined && input.versionId !== null && { "version_id": input.versionId })));
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
export var serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/tokens/development";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.hostname !== undefined && input.hostname !== null && { "hostname": input.hostname })), (input.lobbyPorts !== undefined && input.lobbyPorts !== null && { "lobby_ports": serializeAws_restJson1LobbyGroupRuntimeDockerPorts(input.lobbyPorts, context) })));
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
export var serializeAws_restJson1CreateGameNamespaceTokenPublicCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/tokens/public";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
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
export var serializeAws_restJson1CreateGameVersionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/versions";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.config !== undefined && input.config !== null && { "config": serializeAws_restJson1CloudVersionConfig(input.config, context) })), (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })));
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
export var serializeAws_restJson1DeleteMatchmakerLobbyCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/matchmaker/lobbies/{lobby_id}";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.lobbyId !== undefined) {
                    labelValue = input.lobbyId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: lobbyId.');
                    }
                    resolvedPath = resolvedPath.replace("{lobby_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: lobbyId.');
                }
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "DELETE",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1ExportLobbyLogsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/matchmaker/lobbies/{lobby_id}/logs/export";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.lobbyId !== undefined) {
                    labelValue = input.lobbyId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: lobbyId.');
                    }
                    resolvedPath = resolvedPath.replace("{lobby_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: lobbyId.');
                }
                body = JSON.stringify(__assign({}, (input.stream !== undefined && input.stream !== null && { "stream": input.stream })));
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
export var serializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/matchmaker/lobbies/export-history";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.queryEnd !== undefined && input.queryEnd !== null && { "query_end": input.queryEnd })), (input.queryStart !== undefined && input.queryStart !== null && { "query_start": input.queryStart })));
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
export var serializeAws_restJson1GameBannerUploadCompleteCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/banner-upload/{upload_id}/complete";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.uploadId !== undefined) {
                    labelValue = input.uploadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: uploadId.');
                    }
                    resolvedPath = resolvedPath.replace("{upload_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: uploadId.');
                }
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
export var serializeAws_restJson1GameBannerUploadPrepareCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/banner-upload/prepare";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign(__assign({}, (input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength })), (input.mime !== undefined && input.mime !== null && { "mime": input.mime })), (input.path !== undefined && input.path !== null && { "path": input.path })));
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
export var serializeAws_restJson1GameLogoUploadCompleteCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/logo-upload/{upload_id}/complete";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.uploadId !== undefined) {
                    labelValue = input.uploadId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: uploadId.');
                    }
                    resolvedPath = resolvedPath.replace("{upload_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: uploadId.');
                }
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
export var serializeAws_restJson1GameLogoUploadPrepareCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/logo-upload/prepare";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign(__assign({}, (input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength })), (input.mime !== undefined && input.mime !== null && { "mime": input.mime })), (input.path !== undefined && input.path !== null && { "path": input.path })));
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
export var serializeAws_restJson1GetGameBillingCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/billing";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                query = __assign(__assign({}, (input.queryStart !== undefined && { "query_start": input.queryStart.toString() })), (input.queryEnd !== undefined && { "query_end": input.queryEnd.toString() }));
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
export var serializeAws_restJson1GetGameBillingPlansCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/billing/plans";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
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
export var serializeAws_restJson1GetGameByIdCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
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
export var serializeAws_restJson1GetGameNamespaceByIdCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
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
export var serializeAws_restJson1GetGamesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var serializeAws_restJson1GetGameVersionByIdCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/versions/{version_id}";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.versionId !== undefined) {
                    labelValue = input.versionId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: versionId.');
                    }
                    resolvedPath = resolvedPath.replace("{version_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: versionId.');
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
export var serializeAws_restJson1GetGroupBillingCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/groups/{group_id}/billing";
                if (input.groupId !== undefined) {
                    labelValue = input.groupId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: groupId.');
                    }
                    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: groupId.');
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
export var serializeAws_restJson1GetGroupInvoicesListCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/groups/{group_id}/billing/invoices";
                if (input.groupId !== undefined) {
                    labelValue = input.groupId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: groupId.');
                    }
                    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: groupId.');
                }
                query = __assign(__assign({}, (input.page !== undefined && { "page": input.page.toString() })), (input.perPage !== undefined && { "per_page": input.perPage.toString() }));
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
export var serializeAws_restJson1GetLobbyLogsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/matchmaker/lobbies/{lobby_id}/logs";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.lobbyId !== undefined) {
                    labelValue = input.lobbyId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: lobbyId.');
                    }
                    resolvedPath = resolvedPath.replace("{lobby_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: lobbyId.');
                }
                query = __assign(__assign({}, (input.stream !== undefined && { "stream": input.stream })), (input.watchIndex !== undefined && { "watch_index": input.watchIndex }));
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
export var serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/analytics/matchmaker/live";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
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
export var serializeAws_restJson1GetNamespaceLobbyCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/logs/lobbies/{lobby_id}";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                if (input.lobbyId !== undefined) {
                    labelValue = input.lobbyId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: lobbyId.');
                    }
                    resolvedPath = resolvedPath.replace("{lobby_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: lobbyId.');
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
export var serializeAws_restJson1GetRayPerfLogsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/rays/{ray_id}/perf";
                if (input.rayId !== undefined) {
                    labelValue = input.rayId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: rayId.');
                    }
                    resolvedPath = resolvedPath.replace("{ray_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: rayId.');
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
export var serializeAws_restJson1GetRegionTiersCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/region-tiers";
                body = "";
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
export var serializeAws_restJson1GroupBillingCheckoutCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/groups/{group_id}/checkout";
                if (input.groupId !== undefined) {
                    labelValue = input.groupId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: groupId.');
                    }
                    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: groupId.');
                }
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
export var serializeAws_restJson1InspectCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/auth/inspect";
                body = "";
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
export var serializeAws_restJson1ListGameBuildsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/builds";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
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
export var serializeAws_restJson1ListGameCdnSitesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/cdn/sites";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
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
export var serializeAws_restJson1ListGameCustomAvatarsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/avatars";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
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
export var serializeAws_restJson1ListNamespaceLobbiesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, query, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/logs/lobbies";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                query = __assign({}, (input.beforeCreateTs !== undefined && { "before_create_ts": input.beforeCreateTs.toISOString().toString() }));
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
export var serializeAws_restJson1PrepareCustomAvatarUploadCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/avatar-upload/prepare";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign(__assign({}, (input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength })), (input.mime !== undefined && input.mime !== null && { "mime": input.mime })), (input.path !== undefined && input.path !== null && { "path": input.path })));
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
export var serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/auth-user/{user}";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                if (input.user !== undefined) {
                    labelValue = input.user;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: user.');
                    }
                    resolvedPath = resolvedPath.replace("{user}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: user.');
                }
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "DELETE",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1RemoveNamespaceDomainCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {};
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/domains/{domain}";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                if (input.domain !== undefined) {
                    labelValue = input.domain;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: domain.');
                    }
                    resolvedPath = resolvedPath.replace("{domain}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: domain.');
                }
                return [2, new __HttpRequest({
                        protocol: protocol,
                        hostname: hostname,
                        port: port,
                        method: "DELETE",
                        headers: headers,
                        path: resolvedPath,
                        body: body,
                    })];
        }
    });
}); };
export var serializeAws_restJson1SetGameBillingPlanCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/billing/plan";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign({}, (input.plan !== undefined && input.plan !== null && { "plan": input.plan })));
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
export var serializeAws_restJson1SetNamespaceCdnAuthTypeCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/cdn-auth";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign({}, (input.authType !== undefined && input.authType !== null && { "auth_type": input.authType })));
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
export var serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/domain-public-auth";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign({}, (input.enabled !== undefined && input.enabled !== null && { "enabled": input.enabled })));
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
export var serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/mm-config";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.lobbyCountMax !== undefined && input.lobbyCountMax !== null && { "lobby_count_max": input.lobbyCountMax })), (input.maxPlayers !== undefined && input.maxPlayers !== null && { "max_players": input.maxPlayers })));
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
export var serializeAws_restJson1UpdateGameNamespaceVersionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/version";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign({}, (input.versionId !== undefined && input.versionId !== null && { "version_id": input.versionId })));
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
export var serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/auth-user";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.password !== undefined && input.password !== null && { "password": input.password })), (input.user !== undefined && input.user !== null && { "user": input.user })));
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
export var serializeAws_restJson1ValidateGameCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/validate";
                body = JSON.stringify(__assign(__assign({}, (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })), (input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId })));
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
export var serializeAws_restJson1ValidateGameNamespaceCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/validate";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })), (input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId })));
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
export var serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/mm-config/validate";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.lobbyCountMax !== undefined && input.lobbyCountMax !== null && { "lobby_count_max": input.lobbyCountMax })), (input.maxPlayers !== undefined && input.maxPlayers !== null && { "max_players": input.maxPlayers })));
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
export var serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/namespaces/{namespace_id}/tokens/development/validate";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                if (input.namespaceId !== undefined) {
                    labelValue = input.namespaceId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: namespaceId.');
                    }
                    resolvedPath = resolvedPath.replace("{namespace_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: namespaceId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.hostname !== undefined && input.hostname !== null && { "hostname": input.hostname })), (input.lobbyPorts !== undefined && input.lobbyPorts !== null && { "lobby_ports": serializeAws_restJson1LobbyGroupRuntimeDockerPorts(input.lobbyPorts, context) })));
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
export var serializeAws_restJson1ValidateGameVersionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/games/{game_id}/versions/validate";
                if (input.gameId !== undefined) {
                    labelValue = input.gameId;
                    if (labelValue.length <= 0) {
                        throw new Error('Empty value provided for input HTTP label: gameId.');
                    }
                    resolvedPath = resolvedPath.replace("{game_id}", __extendedEncodeURIComponent(labelValue));
                }
                else {
                    throw new Error('No value provided for input HTTP label: gameId.');
                }
                body = JSON.stringify(__assign(__assign({}, (input.config !== undefined && input.config !== null && { "config": serializeAws_restJson1CloudVersionConfig(input.config, context) })), (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })));
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
export var serializeAws_restJson1ValidateGroupCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, body;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
                headers = {
                    'content-type': "application/json",
                };
                resolvedPath = "".concat((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')) + "/groups/validate";
                body = JSON.stringify(__assign({}, (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName })));
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
export var deserializeAws_restJson1AddNamespaceDomainCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1AddNamespaceDomainCommandError(output, context)];
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
var deserializeAws_restJson1AddNamespaceDomainCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CompleteCustomAvatarUploadCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CompleteCustomAvatarUploadCommandError(output, context)];
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
var deserializeAws_restJson1CompleteCustomAvatarUploadCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CompleteUploadCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CompleteUploadCommandError(output, context)];
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
var deserializeAws_restJson1CompleteUploadCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ConvertGroupCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ConvertGroupCommandError(output, context)];
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
var deserializeAws_restJson1ConvertGroupCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateCloudTokenCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateCloudTokenCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    token: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.token !== undefined && data.token !== null) {
                    contents.token = __expectString(data.token);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateCloudTokenCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateGameCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateGameCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    gameId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.game_id !== undefined && data.game_id !== null) {
                    contents.gameId = __expectString(data.game_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateGameCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateGameBuildCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateGameBuildCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    buildId: undefined,
                    imagePresignedRequest: undefined,
                    uploadId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.build_id !== undefined && data.build_id !== null) {
                    contents.buildId = __expectString(data.build_id);
                }
                if (data.image_presigned_request !== undefined && data.image_presigned_request !== null) {
                    contents.imagePresignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.image_presigned_request, context);
                }
                if (data.upload_id !== undefined && data.upload_id !== null) {
                    contents.uploadId = __expectString(data.upload_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateGameBuildCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateGameCdnSiteCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateGameCdnSiteCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    presignedRequests: undefined,
                    siteId: undefined,
                    uploadId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.presigned_requests !== undefined && data.presigned_requests !== null) {
                    contents.presignedRequests = deserializeAws_restJson1UploadPresignedRequests(data.presigned_requests, context);
                }
                if (data.site_id !== undefined && data.site_id !== null) {
                    contents.siteId = __expectString(data.site_id);
                }
                if (data.upload_id !== undefined && data.upload_id !== null) {
                    contents.uploadId = __expectString(data.upload_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateGameCdnSiteCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateGameNamespaceCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateGameNamespaceCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    namespaceId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.namespace_id !== undefined && data.namespace_id !== null) {
                    contents.namespaceId = __expectString(data.namespace_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateGameNamespaceCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    token: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.token !== undefined && data.token !== null) {
                    contents.token = __expectString(data.token);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateGameNamespaceTokenPublicCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    token: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.token !== undefined && data.token !== null) {
                    contents.token = __expectString(data.token);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateGameNamespaceTokenPublicCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1CreateGameVersionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1CreateGameVersionCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    versionId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.version_id !== undefined && data.version_id !== null) {
                    contents.versionId = __expectString(data.version_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1CreateGameVersionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1DeleteMatchmakerLobbyCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1DeleteMatchmakerLobbyCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    didRemove: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.did_remove !== undefined && data.did_remove !== null) {
                    contents.didRemove = __expectBoolean(data.did_remove);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1DeleteMatchmakerLobbyCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ExportLobbyLogsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ExportLobbyLogsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    url: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.url !== undefined && data.url !== null) {
                    contents.url = __expectString(data.url);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ExportLobbyLogsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    url: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.url !== undefined && data.url !== null) {
                    contents.url = __expectString(data.url);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GameBannerUploadCompleteCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GameBannerUploadCompleteCommandError(output, context)];
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
var deserializeAws_restJson1GameBannerUploadCompleteCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GameBannerUploadPrepareCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GameBannerUploadPrepareCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    presignedRequest: undefined,
                    uploadId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.presigned_request !== undefined && data.presigned_request !== null) {
                    contents.presignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.presigned_request, context);
                }
                if (data.upload_id !== undefined && data.upload_id !== null) {
                    contents.uploadId = __expectString(data.upload_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GameBannerUploadPrepareCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GameLogoUploadCompleteCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GameLogoUploadCompleteCommandError(output, context)];
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
var deserializeAws_restJson1GameLogoUploadCompleteCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GameLogoUploadPrepareCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GameLogoUploadPrepareCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    presignedRequest: undefined,
                    uploadId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.presigned_request !== undefined && data.presigned_request !== null) {
                    contents.presignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.presigned_request, context);
                }
                if (data.upload_id !== undefined && data.upload_id !== null) {
                    contents.uploadId = __expectString(data.upload_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GameLogoUploadPrepareCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGameBillingCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGameBillingCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    availableRegions: undefined,
                    game: undefined,
                    groupActive: undefined,
                    groupStatus: undefined,
                    metrics: undefined,
                    namespaces: undefined,
                    plan: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.available_regions !== undefined && data.available_regions !== null) {
                    contents.availableRegions = deserializeAws_restJson1RegionSummaries(data.available_regions, context);
                }
                if (data.game !== undefined && data.game !== null) {
                    contents.game = deserializeAws_restJson1GameHandle(data.game, context);
                }
                if (data.group_active !== undefined && data.group_active !== null) {
                    contents.groupActive = __expectBoolean(data.group_active);
                }
                if (data.group_status !== undefined && data.group_status !== null) {
                    contents.groupStatus = __expectString(data.group_status);
                }
                if (data.metrics !== undefined && data.metrics !== null) {
                    contents.metrics = deserializeAws_restJson1MultipleRegionTierMetrics(data.metrics, context);
                }
                if (data.namespaces !== undefined && data.namespaces !== null) {
                    contents.namespaces = deserializeAws_restJson1NamespaceSummaries(data.namespaces, context);
                }
                if (data.plan !== undefined && data.plan !== null) {
                    contents.plan = __expectString(data.plan);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGameBillingCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGameBillingPlansCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGameBillingPlansCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    plans: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.plans !== undefined && data.plans !== null) {
                    contents.plans = deserializeAws_restJson1GameBillingPlans(data.plans, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGameBillingPlansCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGameByIdCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGameByIdCommandError(output, context)];
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
                    contents.game = deserializeAws_restJson1GameFull(data.game, context);
                }
                if (data.watch !== undefined && data.watch !== null) {
                    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGameByIdCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGameNamespaceByIdCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGameNamespaceByIdCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    namespace: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.namespace !== undefined && data.namespace !== null) {
                    contents.namespace = deserializeAws_restJson1NamespaceFull(data.namespace, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGameNamespaceByIdCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGamesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGamesCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    games: undefined,
                    groups: undefined,
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
                if (data.groups !== undefined && data.groups !== null) {
                    contents.groups = deserializeAws_restJson1GroupSummaries(data.groups, context);
                }
                if (data.watch !== undefined && data.watch !== null) {
                    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGamesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGameVersionByIdCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGameVersionByIdCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    version: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.version !== undefined && data.version !== null) {
                    contents.version = deserializeAws_restJson1VersionFull(data.version, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGameVersionByIdCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGroupBillingCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGroupBillingCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    active: undefined,
                    status: undefined,
                    usage: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.active !== undefined && data.active !== null) {
                    contents.active = __expectBoolean(data.active);
                }
                if (data.status !== undefined && data.status !== null) {
                    contents.status = __expectString(data.status);
                }
                if (data.usage !== undefined && data.usage !== null) {
                    contents.usage = __expectLong(data.usage);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGroupBillingCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetGroupInvoicesListCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetGroupInvoicesListCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    invoices: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.invoices !== undefined && data.invoices !== null) {
                    contents.invoices = deserializeAws_restJson1GroupBillingInvoices(data.invoices, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetGroupInvoicesListCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetLobbyLogsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetLobbyLogsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    lines: undefined,
                    timestamps: undefined,
                    watch: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.lines !== undefined && data.lines !== null) {
                    contents.lines = deserializeAws_restJson1LobbyLogLines(data.lines, context);
                }
                if (data.timestamps !== undefined && data.timestamps !== null) {
                    contents.timestamps = deserializeAws_restJson1LobbyLogTimestamps(data.timestamps, context);
                }
                if (data.watch !== undefined && data.watch !== null) {
                    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetLobbyLogsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    lobbies: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.lobbies !== undefined && data.lobbies !== null) {
                    contents.lobbies = deserializeAws_restJson1AnalyticsLobbySummaries(data.lobbies, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetNamespaceLobbyCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetNamespaceLobbyCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    lobby: undefined,
                    metrics: undefined,
                    perfLists: undefined,
                    stderrPresignedUrls: undefined,
                    stdoutPresignedUrls: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.lobby !== undefined && data.lobby !== null) {
                    contents.lobby = deserializeAws_restJson1LogsLobbySummary(data.lobby, context);
                }
                if (data.metrics !== undefined && data.metrics !== null) {
                    contents.metrics = deserializeAws_restJson1SvcMetrics(data.metrics, context);
                }
                if (data.perf_lists !== undefined && data.perf_lists !== null) {
                    contents.perfLists = deserializeAws_restJson1SvcPerfs(data.perf_lists, context);
                }
                if (data.stderr_presigned_urls !== undefined && data.stderr_presigned_urls !== null) {
                    contents.stderrPresignedUrls = deserializeAws_restJson1Urls(data.stderr_presigned_urls, context);
                }
                if (data.stdout_presigned_urls !== undefined && data.stdout_presigned_urls !== null) {
                    contents.stdoutPresignedUrls = deserializeAws_restJson1Urls(data.stdout_presigned_urls, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetNamespaceLobbyCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetRayPerfLogsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetRayPerfLogsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    perfLists: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.perf_lists !== undefined && data.perf_lists !== null) {
                    contents.perfLists = deserializeAws_restJson1SvcPerfs(data.perf_lists, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetRayPerfLogsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GetRegionTiersCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GetRegionTiersCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    tiers: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.tiers !== undefined && data.tiers !== null) {
                    contents.tiers = deserializeAws_restJson1RegionTiers(data.tiers, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GetRegionTiersCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1GroupBillingCheckoutCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1GroupBillingCheckoutCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    url: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.url !== undefined && data.url !== null) {
                    contents.url = __expectString(data.url);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1GroupBillingCheckoutCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1InspectCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1InspectCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    agent: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.agent !== undefined && data.agent !== null) {
                    contents.agent = deserializeAws_restJson1AuthAgent(__expectUnion(data.agent), context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1InspectCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ListGameBuildsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ListGameBuildsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    builds: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.builds !== undefined && data.builds !== null) {
                    contents.builds = deserializeAws_restJson1BuildSummaries(data.builds, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ListGameBuildsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ListGameCdnSitesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ListGameCdnSitesCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    sites: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.sites !== undefined && data.sites !== null) {
                    contents.sites = deserializeAws_restJson1CdnSiteSummaries(data.sites, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ListGameCdnSitesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ListGameCustomAvatarsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ListGameCustomAvatarsCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    customAvatars: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.custom_avatars !== undefined && data.custom_avatars !== null) {
                    contents.customAvatars = deserializeAws_restJson1CustomAvatarSummaries(data.custom_avatars, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ListGameCustomAvatarsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ListNamespaceLobbiesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ListNamespaceLobbiesCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    lobbies: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.lobbies !== undefined && data.lobbies !== null) {
                    contents.lobbies = deserializeAws_restJson1LogsLobbySummaries(data.lobbies, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ListNamespaceLobbiesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1PrepareCustomAvatarUploadCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1PrepareCustomAvatarUploadCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    presignedRequest: undefined,
                    uploadId: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.presigned_request !== undefined && data.presigned_request !== null) {
                    contents.presignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.presigned_request, context);
                }
                if (data.upload_id !== undefined && data.upload_id !== null) {
                    contents.uploadId = __expectString(data.upload_id);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1PrepareCustomAvatarUploadCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommandError(output, context)];
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
var deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1RemoveNamespaceDomainCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1RemoveNamespaceDomainCommandError(output, context)];
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
var deserializeAws_restJson1RemoveNamespaceDomainCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1SetGameBillingPlanCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1SetGameBillingPlanCommandError(output, context)];
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
var deserializeAws_restJson1SetGameBillingPlanCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1SetNamespaceCdnAuthTypeCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1SetNamespaceCdnAuthTypeCommandError(output, context)];
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
var deserializeAws_restJson1SetNamespaceCdnAuthTypeCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommandError(output, context)];
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
var deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommandError(output, context)];
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
var deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1UpdateGameNamespaceVersionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1UpdateGameNamespaceVersionCommandError(output, context)];
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
var deserializeAws_restJson1UpdateGameNamespaceVersionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommandError(output, context)];
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
var deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ValidateGameCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ValidateGameCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    errors: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.errors !== undefined && data.errors !== null) {
                    contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ValidateGameCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ValidateGameNamespaceCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ValidateGameNamespaceCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    errors: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.errors !== undefined && data.errors !== null) {
                    contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ValidateGameNamespaceCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    errors: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.errors !== undefined && data.errors !== null) {
                    contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    errors: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.errors !== undefined && data.errors !== null) {
                    contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ValidateGameVersionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ValidateGameVersionCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    errors: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.errors !== undefined && data.errors !== null) {
                    contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ValidateGameVersionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
export var deserializeAws_restJson1ValidateGroupCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var contents, data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return [2, deserializeAws_restJson1ValidateGroupCommandError(output, context)];
                }
                contents = {
                    $metadata: deserializeMetadata(output),
                    errors: undefined,
                };
                _a = __expectNonNull;
                _b = __expectObject;
                return [4, parseBody(output.body, context)];
            case 1:
                data = _a.apply(void 0, [(_b.apply(void 0, [_c.sent()])), "body"]);
                if (data.errors !== undefined && data.errors !== null) {
                    contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
                }
                return [2, Promise.resolve(contents)];
        }
    });
}); };
var deserializeAws_restJson1ValidateGroupCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
var serializeAws_restJson1UploadPrepareFile = function (input, context) {
    return __assign(__assign(__assign({}, (input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength })), (input.contentType !== undefined && input.contentType !== null && { "content_type": input.contentType })), (input.path !== undefined && input.path !== null && { "path": input.path }));
};
var serializeAws_restJson1UploadPrepareFiles = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1UploadPrepareFile(entry, context);
    });
};
var serializeAws_restJson1CdnVersionConfig = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.buildCommand !== undefined && input.buildCommand !== null && { "build_command": input.buildCommand })), (input.buildOutput !== undefined && input.buildOutput !== null && { "build_output": input.buildOutput })), (input.routes !== undefined && input.routes !== null && { "routes": serializeAws_restJson1CdnVersionRoutes(input.routes, context) })), (input.siteId !== undefined && input.siteId !== null && { "site_id": input.siteId }));
};
var serializeAws_restJson1CdnVersionCustomHeadersMiddleware = function (input, context) {
    return __assign({}, (input.headers !== undefined && input.headers !== null && { "headers": serializeAws_restJson1CdnVersionHeaders(input.headers, context) }));
};
var serializeAws_restJson1CdnVersionHeader = function (input, context) {
    return __assign(__assign({}, (input.name !== undefined && input.name !== null && { "name": input.name })), (input.value !== undefined && input.value !== null && { "value": input.value }));
};
var serializeAws_restJson1CdnVersionHeaders = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CdnVersionHeader(entry, context);
    });
};
var serializeAws_restJson1CdnVersionMiddleware = function (input, context) {
    return __assign({}, (input.kind !== undefined && input.kind !== null && { "kind": serializeAws_restJson1CdnVersionMiddlewareKind(input.kind, context) }));
};
var serializeAws_restJson1CdnVersionMiddlewareKind = function (input, context) {
    return CdnVersionMiddlewareKind.visit(input, {
        customHeaders: function (value) { return ({ "custom_headers": serializeAws_restJson1CdnVersionCustomHeadersMiddleware(value, context) }); },
        _: function (name, value) { return ({ name: value }); }
    });
};
var serializeAws_restJson1CdnVersionMiddlewares = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CdnVersionMiddleware(entry, context);
    });
};
var serializeAws_restJson1CdnVersionRoute = function (input, context) {
    return __assign(__assign(__assign({}, (input.glob !== undefined && input.glob !== null && { "glob": input.glob })), (input.middlewares !== undefined && input.middlewares !== null && { "middlewares": serializeAws_restJson1CdnVersionMiddlewares(input.middlewares, context) })), (input.priority !== undefined && input.priority !== null && { "priority": input.priority }));
};
var serializeAws_restJson1CdnVersionRoutes = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CdnVersionRoute(entry, context);
    });
};
var serializeAws_restJson1CloudVersionConfig = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.cdn !== undefined && input.cdn !== null && { "cdn": serializeAws_restJson1CdnVersionConfig(input.cdn, context) })), (input.identity !== undefined && input.identity !== null && { "identity": serializeAws_restJson1IdentityVersionConfig(input.identity, context) })), (input.kv !== undefined && input.kv !== null && { "kv": serializeAws_restJson1KvVersionConfig(input.kv, context) })), (input.matchmaker !== undefined && input.matchmaker !== null && { "matchmaker": serializeAws_restJson1MatchmakerVersionConfig(input.matchmaker, context) }));
};
var serializeAws_restJson1CustomAvatar = function (input, context) {
    return __assign({}, (input.uploadId !== undefined && input.uploadId !== null && { "upload_id": input.uploadId }));
};
var serializeAws_restJson1CustomAvatars = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CustomAvatar(entry, context);
    });
};
var serializeAws_restJson1CustomDisplayName = function (input, context) {
    return __assign({}, (input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }));
};
var serializeAws_restJson1CustomDisplayNames = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CustomDisplayName(entry, context);
    });
};
var serializeAws_restJson1IdentityVersionConfig = function (input, context) {
    return __assign(__assign({}, (input.customAvatars !== undefined && input.customAvatars !== null && { "custom_avatars": serializeAws_restJson1CustomAvatars(input.customAvatars, context) })), (input.customDisplayNames !== undefined && input.customDisplayNames !== null && { "custom_display_names": serializeAws_restJson1CustomDisplayNames(input.customDisplayNames, context) }));
};
var serializeAws_restJson1IdleLobbiesConfig = function (input, context) {
    return __assign(__assign({}, (input.maxIdleLobbies !== undefined && input.maxIdleLobbies !== null && { "max_idle_lobbies": input.maxIdleLobbies })), (input.minIdleLobbies !== undefined && input.minIdleLobbies !== null && { "min_idle_lobbies": input.minIdleLobbies }));
};
var serializeAws_restJson1KvVersionConfig = function (input, context) {
    return {};
};
var serializeAws_restJson1LobbyGroup = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.maxPlayersDirect !== undefined && input.maxPlayersDirect !== null && { "max_players_direct": input.maxPlayersDirect })), (input.maxPlayersNormal !== undefined && input.maxPlayersNormal !== null && { "max_players_normal": input.maxPlayersNormal })), (input.maxPlayersParty !== undefined && input.maxPlayersParty !== null && { "max_players_party": input.maxPlayersParty })), (input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId })), (input.regions !== undefined && input.regions !== null && { "regions": serializeAws_restJson1LobbyGroupRegions(input.regions, context) })), (input.runtime !== undefined && input.runtime !== null && { "runtime": serializeAws_restJson1LobbyGroupRuntime(input.runtime, context) }));
};
var serializeAws_restJson1LobbyGroupRegion = function (input, context) {
    return __assign(__assign(__assign({}, (input.idleLobbies !== undefined && input.idleLobbies !== null && { "idle_lobbies": serializeAws_restJson1IdleLobbiesConfig(input.idleLobbies, context) })), (input.regionId !== undefined && input.regionId !== null && { "region_id": input.regionId })), (input.tierNameId !== undefined && input.tierNameId !== null && { "tier_name_id": input.tierNameId }));
};
var serializeAws_restJson1LobbyGroupRegions = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroupRegion(entry, context);
    });
};
var serializeAws_restJson1LobbyGroupRuntime = function (input, context) {
    return LobbyGroupRuntime.visit(input, {
        docker: function (value) { return ({ "docker": serializeAws_restJson1LobbyGroupRuntimeDocker(value, context) }); },
        _: function (name, value) { return ({ name: value }); }
    });
};
var serializeAws_restJson1LobbyGroupRuntimeDocker = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.args !== undefined && input.args !== null && { "args": serializeAws_restJson1LobbyGroupRuntimeDockerArgs(input.args, context) })), (input.buildId !== undefined && input.buildId !== null && { "build_id": input.buildId })), (input.envVars !== undefined && input.envVars !== null && { "env_vars": serializeAws_restJson1LobbyGroupRuntimeDockerEnvVars(input.envVars, context) })), (input.networkMode !== undefined && input.networkMode !== null && { "network_mode": input.networkMode })), (input.ports !== undefined && input.ports !== null && { "ports": serializeAws_restJson1LobbyGroupRuntimeDockerPorts(input.ports, context) }));
};
var serializeAws_restJson1LobbyGroupRuntimeDockerArgs = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_restJson1LobbyGroupRuntimeDockerEnvVar = function (input, context) {
    return __assign(__assign({}, (input.key !== undefined && input.key !== null && { "key": input.key })), (input.value !== undefined && input.value !== null && { "value": input.value }));
};
var serializeAws_restJson1LobbyGroupRuntimeDockerEnvVars = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroupRuntimeDockerEnvVar(entry, context);
    });
};
var serializeAws_restJson1LobbyGroupRuntimeDockerPort = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.label !== undefined && input.label !== null && { "label": input.label })), (input.portRange !== undefined && input.portRange !== null && { "port_range": serializeAws_restJson1PortRange(input.portRange, context) })), (input.proxyProtocol !== undefined && input.proxyProtocol !== null && { "proxy_protocol": input.proxyProtocol })), (input.targetPort !== undefined && input.targetPort !== null && { "target_port": input.targetPort }));
};
var serializeAws_restJson1LobbyGroupRuntimeDockerPorts = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroupRuntimeDockerPort(entry, context);
    });
};
var serializeAws_restJson1LobbyGroups = function (input, context) {
    return input.filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroup(entry, context);
    });
};
var serializeAws_restJson1MatchmakerCaptcha = function (input, context) {
    return __assign(__assign(__assign({}, (input.hcaptcha !== undefined && input.hcaptcha !== null && { "hcaptcha": serializeAws_restJson1MatchmakerCaptchaHcaptcha(input.hcaptcha, context) })), (input.requestsBeforeReverify !== undefined && input.requestsBeforeReverify !== null && { "requests_before_reverify": input.requestsBeforeReverify })), (input.verificationTtl !== undefined && input.verificationTtl !== null && { "verification_ttl": input.verificationTtl }));
};
var serializeAws_restJson1MatchmakerCaptchaHcaptcha = function (input, context) {
    return __assign({}, (input.level !== undefined && input.level !== null && { "level": input.level }));
};
var serializeAws_restJson1MatchmakerVersionConfig = function (input, context) {
    return __assign(__assign({}, (input.captcha !== undefined && input.captcha !== null && { "captcha": serializeAws_restJson1MatchmakerCaptcha(input.captcha, context) })), (input.lobbyGroups !== undefined && input.lobbyGroups !== null && { "lobby_groups": serializeAws_restJson1LobbyGroups(input.lobbyGroups, context) }));
};
var serializeAws_restJson1PortRange = function (input, context) {
    return __assign(__assign({}, (input.max !== undefined && input.max !== null && { "max": input.max })), (input.min !== undefined && input.min !== null && { "min": input.min }));
};
var deserializeAws_restJson1LobbyLogLines = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectString(entry);
    });
    return retVal;
};
var deserializeAws_restJson1LobbyLogTimestamps = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectNonNull(__parseRfc3339DateTime(entry));
    });
    return retVal;
};
var deserializeAws_restJson1AnalyticsLobbySummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1AnalyticsLobbySummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1AnalyticsLobbySummary = function (output, context) {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        isClosed: __expectBoolean(output.is_closed),
        isIdle: __expectBoolean(output.is_idle),
        isOutdated: __expectBoolean(output.is_outdated),
        isReady: __expectBoolean(output.is_ready),
        lobbyGroupId: __expectString(output.lobby_group_id),
        lobbyGroupNameId: __expectString(output.lobby_group_name_id),
        lobbyId: __expectString(output.lobby_id),
        maxPlayersDirect: __expectInt32(output.max_players_direct),
        maxPlayersNormal: __expectInt32(output.max_players_normal),
        maxPlayersParty: __expectInt32(output.max_players_party),
        regionId: __expectString(output.region_id),
        registeredPlayerCount: __expectInt32(output.registered_player_count),
        totalPlayerCount: __expectInt32(output.total_player_count),
    };
};
var deserializeAws_restJson1FloatMetrics = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __limitedParseFloat32(entry);
    });
    return retVal;
};
var deserializeAws_restJson1IntMetrics = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectLong(entry);
    });
    return retVal;
};
var deserializeAws_restJson1LogsLobbyStatus = function (output, context) {
    if (output.running !== undefined && output.running !== null) {
        return {
            running: deserializeAws_restJson1Unit(output.running, context)
        };
    }
    if (output.stopped !== undefined && output.stopped !== null) {
        return {
            stopped: deserializeAws_restJson1LogsLobbyStatusStopped(output.stopped, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1LogsLobbyStatusStopped = function (output, context) {
    return {
        exitCode: __expectInt32(output.exit_code),
        failed: __expectBoolean(output.failed),
        stopTs: (output.stop_ts !== undefined && output.stop_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.stop_ts)) : undefined,
    };
};
var deserializeAws_restJson1LogsLobbySummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LogsLobbySummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1LogsLobbySummary = function (output, context) {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        lobbyGroupNameId: __expectString(output.lobby_group_name_id),
        lobbyId: __expectString(output.lobby_id),
        namespaceId: __expectString(output.namespace_id),
        readyTs: (output.ready_ts !== undefined && output.ready_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.ready_ts)) : undefined,
        regionId: __expectString(output.region_id),
        startTs: (output.start_ts !== undefined && output.start_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.start_ts)) : undefined,
        status: (output.status !== undefined && output.status !== null) ? deserializeAws_restJson1LogsLobbyStatus(__expectUnion(output.status), context) : undefined,
    };
};
var deserializeAws_restJson1LogsPerfMark = function (output, context) {
    return {
        label: __expectString(output.label),
        rayId: __expectString(output.ray_id),
        reqId: __expectString(output.req_id),
        ts: (output.ts !== undefined && output.ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.ts)) : undefined,
    };
};
var deserializeAws_restJson1LogsPerfMarks = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LogsPerfMark(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1LogsPerfSpan = function (output, context) {
    return {
        finishTs: (output.finish_ts !== undefined && output.finish_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.finish_ts)) : undefined,
        label: __expectString(output.label),
        reqId: __expectString(output.req_id),
        startTs: (output.start_ts !== undefined && output.start_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.start_ts)) : undefined,
    };
};
var deserializeAws_restJson1LogsPerfSpans = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LogsPerfSpan(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1SvcMetrics = function (output, context) {
    return {
        allocatedMemory: __expectLong(output.allocated_memory),
        cpu: (output.cpu !== undefined && output.cpu !== null) ? deserializeAws_restJson1FloatMetrics(output.cpu, context) : undefined,
        job: __expectString(output.job),
        memory: (output.memory !== undefined && output.memory !== null) ? deserializeAws_restJson1IntMetrics(output.memory, context) : undefined,
        memoryMax: (output.memory_max !== undefined && output.memory_max !== null) ? deserializeAws_restJson1IntMetrics(output.memory_max, context) : undefined,
    };
};
var deserializeAws_restJson1SvcPerf = function (output, context) {
    return {
        duration: __expectLong(output.duration),
        marks: (output.marks !== undefined && output.marks !== null) ? deserializeAws_restJson1LogsPerfMarks(output.marks, context) : undefined,
        reqId: __expectString(output.req_id),
        spans: (output.spans !== undefined && output.spans !== null) ? deserializeAws_restJson1LogsPerfSpans(output.spans, context) : undefined,
        svcName: __expectString(output.svc_name),
        ts: (output.ts !== undefined && output.ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.ts)) : undefined,
    };
};
var deserializeAws_restJson1SvcPerfs = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1SvcPerf(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1Urls = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectString(entry);
    });
    return retVal;
};
var deserializeAws_restJson1AuthAgent = function (output, context) {
    if (output.game_cloud !== undefined && output.game_cloud !== null) {
        return {
            gameCloud: deserializeAws_restJson1AuthAgentGameCloud(output.game_cloud, context)
        };
    }
    if (output.identity !== undefined && output.identity !== null) {
        return {
            identity: deserializeAws_restJson1AuthAgentIdentity(output.identity, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1AuthAgentGameCloud = function (output, context) {
    return {
        gameId: __expectString(output.game_id),
    };
};
var deserializeAws_restJson1AuthAgentIdentity = function (output, context) {
    return {
        identityId: __expectString(output.identity_id),
    };
};
var deserializeAws_restJson1BuildSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1BuildSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1BuildSummary = function (output, context) {
    return {
        buildId: __expectString(output.build_id),
        complete: __expectBoolean(output.complete),
        contentLength: __expectLong(output.content_length),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        displayName: __expectString(output.display_name),
        uploadId: __expectString(output.upload_id),
    };
};
var deserializeAws_restJson1CdnNamespaceAuthUser = function (output, context) {
    return {
        user: __expectString(output.user),
    };
};
var deserializeAws_restJson1CdnNamespaceAuthUsers = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnNamespaceAuthUser(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CdnNamespaceConfig = function (output, context) {
    return {
        authType: __expectString(output.auth_type),
        authUserList: (output.auth_user_list !== undefined && output.auth_user_list !== null) ? deserializeAws_restJson1CdnNamespaceAuthUsers(output.auth_user_list, context) : undefined,
        domains: (output.domains !== undefined && output.domains !== null) ? deserializeAws_restJson1CdnNamespaceDomains(output.domains, context) : undefined,
        enableDomainPublicAuth: __expectBoolean(output.enable_domain_public_auth),
    };
};
var deserializeAws_restJson1CdnNamespaceDomain = function (output, context) {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        domain: __expectString(output.domain),
        verificationErrors: (output.verification_errors !== undefined && output.verification_errors !== null) ? deserializeAws_restJson1CdnNamespaceDomainVerificationErrors(output.verification_errors, context) : undefined,
        verificationMethod: (output.verification_method !== undefined && output.verification_method !== null) ? deserializeAws_restJson1CdnNamespaceDomainVerificationMethod(__expectUnion(output.verification_method), context) : undefined,
        verificationStatus: __expectString(output.verification_status),
    };
};
var deserializeAws_restJson1CdnNamespaceDomains = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnNamespaceDomain(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CdnNamespaceDomainVerificationErrors = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectString(entry);
    });
    return retVal;
};
var deserializeAws_restJson1CdnNamespaceDomainVerificationMethod = function (output, context) {
    if (output.http !== undefined && output.http !== null) {
        return {
            http: deserializeAws_restJson1CdnNamespaceDomainVerificationMethodHttp(output.http, context)
        };
    }
    if (output.invalid !== undefined && output.invalid !== null) {
        return {
            invalid: deserializeAws_restJson1CdnNamespaceDomainVerificationMethodInvalid(output.invalid, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1CdnNamespaceDomainVerificationMethodHttp = function (output, context) {
    return {
        cnameRecord: __expectString(output.cname_record),
    };
};
var deserializeAws_restJson1CdnNamespaceDomainVerificationMethodInvalid = function (output, context) {
    return {};
};
var deserializeAws_restJson1CdnSiteSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnSiteSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CdnSiteSummary = function (output, context) {
    return {
        complete: __expectBoolean(output.complete),
        contentLength: __expectLong(output.content_length),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        displayName: __expectString(output.display_name),
        siteId: __expectString(output.site_id),
        uploadId: __expectString(output.upload_id),
    };
};
var deserializeAws_restJson1CdnVersionConfig = function (output, context) {
    return {
        buildCommand: __expectString(output.build_command),
        buildOutput: __expectString(output.build_output),
        routes: (output.routes !== undefined && output.routes !== null) ? deserializeAws_restJson1CdnVersionRoutes(output.routes, context) : undefined,
        siteId: __expectString(output.site_id),
    };
};
var deserializeAws_restJson1CdnVersionCustomHeadersMiddleware = function (output, context) {
    return {
        headers: (output.headers !== undefined && output.headers !== null) ? deserializeAws_restJson1CdnVersionHeaders(output.headers, context) : undefined,
    };
};
var deserializeAws_restJson1CdnVersionHeader = function (output, context) {
    return {
        name: __expectString(output.name),
        value: __expectString(output.value),
    };
};
var deserializeAws_restJson1CdnVersionHeaders = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnVersionHeader(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CdnVersionMiddleware = function (output, context) {
    return {
        kind: (output.kind !== undefined && output.kind !== null) ? deserializeAws_restJson1CdnVersionMiddlewareKind(__expectUnion(output.kind), context) : undefined,
    };
};
var deserializeAws_restJson1CdnVersionMiddlewareKind = function (output, context) {
    if (output.custom_headers !== undefined && output.custom_headers !== null) {
        return {
            customHeaders: deserializeAws_restJson1CdnVersionCustomHeadersMiddleware(output.custom_headers, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1CdnVersionMiddlewares = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnVersionMiddleware(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CdnVersionRoute = function (output, context) {
    return {
        glob: __expectString(output.glob),
        middlewares: (output.middlewares !== undefined && output.middlewares !== null) ? deserializeAws_restJson1CdnVersionMiddlewares(output.middlewares, context) : undefined,
        priority: __expectInt32(output.priority),
    };
};
var deserializeAws_restJson1CdnVersionRoutes = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnVersionRoute(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CloudNamespaceConfig = function (output, context) {
    return {
        cdn: (output.cdn !== undefined && output.cdn !== null) ? deserializeAws_restJson1CdnNamespaceConfig(output.cdn, context) : undefined,
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityNamespaceConfig(output.identity, context) : undefined,
        kv: (output.kv !== undefined && output.kv !== null) ? deserializeAws_restJson1KvNamespaceConfig(output.kv, context) : undefined,
        matchmaker: (output.matchmaker !== undefined && output.matchmaker !== null) ? deserializeAws_restJson1MatchmakerNamespaceConfig(output.matchmaker, context) : undefined,
    };
};
var deserializeAws_restJson1CloudVersionConfig = function (output, context) {
    return {
        cdn: (output.cdn !== undefined && output.cdn !== null) ? deserializeAws_restJson1CdnVersionConfig(output.cdn, context) : undefined,
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityVersionConfig(output.identity, context) : undefined,
        kv: (output.kv !== undefined && output.kv !== null) ? deserializeAws_restJson1KvVersionConfig(output.kv, context) : undefined,
        matchmaker: (output.matchmaker !== undefined && output.matchmaker !== null) ? deserializeAws_restJson1MatchmakerVersionConfig(output.matchmaker, context) : undefined,
    };
};
var deserializeAws_restJson1CustomAvatar = function (output, context) {
    return {
        uploadId: __expectString(output.upload_id),
    };
};
var deserializeAws_restJson1CustomAvatars = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CustomAvatar(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CustomAvatarSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CustomAvatarSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1CustomAvatarSummary = function (output, context) {
    return {
        complete: __expectBoolean(output.complete),
        contentLength: __expectLong(output.content_length),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        displayName: __expectString(output.display_name),
        uploadId: __expectString(output.upload_id),
        url: __expectString(output.url),
    };
};
var deserializeAws_restJson1CustomDisplayName = function (output, context) {
    return {
        displayName: __expectString(output.display_name),
    };
};
var deserializeAws_restJson1CustomDisplayNames = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CustomDisplayName(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1GameBillingPlan = function (output, context) {
    return {
        amount: __expectLong(output.amount),
        code: __expectString(output.code),
        currency: __expectString(output.currency),
        interval: __expectString(output.interval),
        name: __expectString(output.name),
    };
};
var deserializeAws_restJson1GameBillingPlans = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GameBillingPlan(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1GameFull = function (output, context) {
    return {
        availableRegions: (output.available_regions !== undefined && output.available_regions !== null) ? deserializeAws_restJson1RegionSummaries(output.available_regions, context) : undefined,
        bannerUrl: __expectString(output.banner_url),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        developerGroupId: __expectString(output.developer_group_id),
        displayName: __expectString(output.display_name),
        gameId: __expectString(output.game_id),
        logoUrl: __expectString(output.logo_url),
        nameId: __expectString(output.name_id),
        namespaces: (output.namespaces !== undefined && output.namespaces !== null) ? deserializeAws_restJson1NamespaceSummaries(output.namespaces, context) : undefined,
        totalPlayerCount: __expectInt32(output.total_player_count),
        versions: (output.versions !== undefined && output.versions !== null) ? deserializeAws_restJson1VersionSummaries(output.versions, context) : undefined,
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
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        developerGroupId: __expectString(output.developer_group_id),
        displayName: __expectString(output.display_name),
        gameId: __expectString(output.game_id),
        logoUrl: __expectString(output.logo_url),
        nameId: __expectString(output.name_id),
        totalPlayerCount: __expectInt32(output.total_player_count),
    };
};
var deserializeAws_restJson1GroupBillingInvoice = function (output, context) {
    return {
        fileUrl: __expectString(output.file_url),
        issuingTs: (output.issuing_ts !== undefined && output.issuing_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.issuing_ts)) : undefined,
    };
};
var deserializeAws_restJson1GroupBillingInvoices = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupBillingInvoice(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1IdentityNamespaceConfig = function (output, context) {
    return {};
};
var deserializeAws_restJson1IdentityVersionConfig = function (output, context) {
    return {
        customAvatars: (output.custom_avatars !== undefined && output.custom_avatars !== null) ? deserializeAws_restJson1CustomAvatars(output.custom_avatars, context) : undefined,
        customDisplayNames: (output.custom_display_names !== undefined && output.custom_display_names !== null) ? deserializeAws_restJson1CustomDisplayNames(output.custom_display_names, context) : undefined,
    };
};
var deserializeAws_restJson1IdleLobbiesConfig = function (output, context) {
    return {
        maxIdleLobbies: __expectInt32(output.max_idle_lobbies),
        minIdleLobbies: __expectInt32(output.min_idle_lobbies),
    };
};
var deserializeAws_restJson1KvNamespaceConfig = function (output, context) {
    return {};
};
var deserializeAws_restJson1KvVersionConfig = function (output, context) {
    return {};
};
var deserializeAws_restJson1LobbyGroup = function (output, context) {
    return {
        maxPlayersDirect: __expectInt32(output.max_players_direct),
        maxPlayersNormal: __expectInt32(output.max_players_normal),
        maxPlayersParty: __expectInt32(output.max_players_party),
        nameId: __expectString(output.name_id),
        regions: (output.regions !== undefined && output.regions !== null) ? deserializeAws_restJson1LobbyGroupRegions(output.regions, context) : undefined,
        runtime: (output.runtime !== undefined && output.runtime !== null) ? deserializeAws_restJson1LobbyGroupRuntime(__expectUnion(output.runtime), context) : undefined,
    };
};
var deserializeAws_restJson1LobbyGroupRegion = function (output, context) {
    return {
        idleLobbies: (output.idle_lobbies !== undefined && output.idle_lobbies !== null) ? deserializeAws_restJson1IdleLobbiesConfig(output.idle_lobbies, context) : undefined,
        regionId: __expectString(output.region_id),
        tierNameId: __expectString(output.tier_name_id),
    };
};
var deserializeAws_restJson1LobbyGroupRegions = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroupRegion(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1LobbyGroupRuntime = function (output, context) {
    if (output.docker !== undefined && output.docker !== null) {
        return {
            docker: deserializeAws_restJson1LobbyGroupRuntimeDocker(output.docker, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
var deserializeAws_restJson1LobbyGroupRuntimeDocker = function (output, context) {
    return {
        args: (output.args !== undefined && output.args !== null) ? deserializeAws_restJson1LobbyGroupRuntimeDockerArgs(output.args, context) : undefined,
        buildId: __expectString(output.build_id),
        envVars: (output.env_vars !== undefined && output.env_vars !== null) ? deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVars(output.env_vars, context) : undefined,
        networkMode: __expectString(output.network_mode),
        ports: (output.ports !== undefined && output.ports !== null) ? deserializeAws_restJson1LobbyGroupRuntimeDockerPorts(output.ports, context) : undefined,
    };
};
var deserializeAws_restJson1LobbyGroupRuntimeDockerArgs = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectString(entry);
    });
    return retVal;
};
var deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVar = function (output, context) {
    return {
        key: __expectString(output.key),
        value: __expectString(output.value),
    };
};
var deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVars = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVar(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1LobbyGroupRuntimeDockerPort = function (output, context) {
    return {
        label: __expectString(output.label),
        portRange: (output.port_range !== undefined && output.port_range !== null) ? deserializeAws_restJson1PortRange(output.port_range, context) : undefined,
        proxyProtocol: __expectString(output.proxy_protocol),
        targetPort: __expectInt32(output.target_port),
    };
};
var deserializeAws_restJson1LobbyGroupRuntimeDockerPorts = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroupRuntimeDockerPort(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1LobbyGroups = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroup(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1MatchmakerCaptcha = function (output, context) {
    return {
        hcaptcha: (output.hcaptcha !== undefined && output.hcaptcha !== null) ? deserializeAws_restJson1MatchmakerCaptchaHcaptcha(output.hcaptcha, context) : undefined,
        requestsBeforeReverify: __expectInt32(output.requests_before_reverify),
        verificationTtl: __expectLong(output.verification_ttl),
    };
};
var deserializeAws_restJson1MatchmakerCaptchaHcaptcha = function (output, context) {
    return {
        level: __expectString(output.level),
    };
};
var deserializeAws_restJson1MatchmakerNamespaceConfig = function (output, context) {
    return {
        lobbyCountMax: __expectInt32(output.lobby_count_max),
        maxPlayersPerClient: __expectInt32(output.max_players_per_client),
        maxPlayersPerClientHosting: __expectInt32(output.max_players_per_client_hosting),
        maxPlayersPerClientProxy: __expectInt32(output.max_players_per_client_proxy),
        maxPlayersPerClientTor: __expectInt32(output.max_players_per_client_tor),
        maxPlayersPerClientVpn: __expectInt32(output.max_players_per_client_vpn),
    };
};
var deserializeAws_restJson1MatchmakerVersionConfig = function (output, context) {
    return {
        captcha: (output.captcha !== undefined && output.captcha !== null) ? deserializeAws_restJson1MatchmakerCaptcha(output.captcha, context) : undefined,
        lobbyGroups: (output.lobby_groups !== undefined && output.lobby_groups !== null) ? deserializeAws_restJson1LobbyGroups(output.lobby_groups, context) : undefined,
    };
};
var deserializeAws_restJson1MultipleRegionTierMetrics = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RegionTierMetrics(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1NamespaceFull = function (output, context) {
    return {
        config: (output.config !== undefined && output.config !== null) ? deserializeAws_restJson1CloudNamespaceConfig(output.config, context) : undefined,
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        displayName: __expectString(output.display_name),
        nameId: __expectString(output.name_id),
        namespaceId: __expectString(output.namespace_id),
        versionId: __expectString(output.version_id),
    };
};
var deserializeAws_restJson1NamespaceSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1NamespaceSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1NamespaceSummary = function (output, context) {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        displayName: __expectString(output.display_name),
        nameId: __expectString(output.name_id),
        namespaceId: __expectString(output.namespace_id),
        versionId: __expectString(output.version_id),
    };
};
var deserializeAws_restJson1PortRange = function (output, context) {
    return {
        max: __expectInt32(output.max),
        min: __expectInt32(output.min),
    };
};
var deserializeAws_restJson1RegionSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RegionSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1RegionSummary = function (output, context) {
    return {
        provider: __expectString(output.provider),
        providerDisplayName: __expectString(output.provider_display_name),
        regionDisplayName: __expectString(output.region_display_name),
        regionId: __expectString(output.region_id),
        regionNameId: __expectString(output.region_name_id),
        universalRegion: __expectShort(output.universal_region),
    };
};
var deserializeAws_restJson1RegionTier = function (output, context) {
    return {
        bandwidth: __expectLong(output.bandwidth),
        cpu: __expectLong(output.cpu),
        disk: __expectLong(output.disk),
        memory: __expectLong(output.memory),
        rivetCoresDenominator: __expectInt32(output.rivet_cores_denominator),
        rivetCoresNumerator: __expectInt32(output.rivet_cores_numerator),
        tierNameId: __expectString(output.tier_name_id),
    };
};
var deserializeAws_restJson1RegionTierMetrics = function (output, context) {
    return {
        lobbyGroupNameId: __expectString(output.lobby_group_name_id),
        namespaceId: __expectString(output.namespace_id),
        regionId: __expectString(output.region_id),
        tierNameId: __expectString(output.tier_name_id),
        uptime: __expectLong(output.uptime),
    };
};
var deserializeAws_restJson1RegionTiers = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RegionTier(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1VersionFull = function (output, context) {
    return {
        config: (output.config !== undefined && output.config !== null) ? deserializeAws_restJson1CloudVersionConfig(output.config, context) : undefined,
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        displayName: __expectString(output.display_name),
        versionId: __expectString(output.version_id),
    };
};
var deserializeAws_restJson1VersionSummaries = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1VersionSummary(entry, context);
    });
    return retVal;
};
var deserializeAws_restJson1VersionSummary = function (output, context) {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)) : undefined,
        displayName: __expectString(output.display_name),
        versionId: __expectString(output.version_id),
    };
};
var deserializeAws_restJson1ValidationError = function (output, context) {
    return {
        path: (output.path !== undefined && output.path !== null) ? deserializeAws_restJson1ValidationErrorPath(output.path, context) : undefined,
    };
};
var deserializeAws_restJson1ValidationErrorPath = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return __expectString(entry);
    });
    return retVal;
};
var deserializeAws_restJson1ValidationErrors = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1ValidationError(entry, context);
    });
    return retVal;
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
var deserializeAws_restJson1GroupExternalLinks = function (output, context) {
    return {
        chat: __expectString(output.chat),
        profile: __expectString(output.profile),
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
var deserializeAws_restJson1UploadPresignedRequest = function (output, context) {
    return {
        path: __expectString(output.path),
        url: __expectString(output.url),
    };
};
var deserializeAws_restJson1UploadPresignedRequests = function (output, context) {
    var retVal = (output || []).filter(function (e) { return e != null; }).map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1UploadPresignedRequest(entry, context);
    });
    return retVal;
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
