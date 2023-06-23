"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = exports.serializeAws_restJson1ValidateGameNamespaceCommand = exports.serializeAws_restJson1ValidateGameCommand = exports.serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = exports.serializeAws_restJson1UpdateGameNamespaceVersionCommand = exports.serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = exports.serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = exports.serializeAws_restJson1SetNamespaceCdnAuthTypeCommand = exports.serializeAws_restJson1SetGameBillingPlanCommand = exports.serializeAws_restJson1RemoveNamespaceDomainCommand = exports.serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = exports.serializeAws_restJson1PrepareCustomAvatarUploadCommand = exports.serializeAws_restJson1ListNamespaceLobbiesCommand = exports.serializeAws_restJson1ListGameCustomAvatarsCommand = exports.serializeAws_restJson1ListGameCdnSitesCommand = exports.serializeAws_restJson1ListGameBuildsCommand = exports.serializeAws_restJson1InspectCommand = exports.serializeAws_restJson1GroupBillingCheckoutCommand = exports.serializeAws_restJson1GetRegionTiersCommand = exports.serializeAws_restJson1GetRayPerfLogsCommand = exports.serializeAws_restJson1GetNamespaceLobbyCommand = exports.serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = exports.serializeAws_restJson1GetLobbyLogsCommand = exports.serializeAws_restJson1GetGroupInvoicesListCommand = exports.serializeAws_restJson1GetGroupBillingCommand = exports.serializeAws_restJson1GetGameVersionByIdCommand = exports.serializeAws_restJson1GetGamesCommand = exports.serializeAws_restJson1GetGameNamespaceByIdCommand = exports.serializeAws_restJson1GetGameByIdCommand = exports.serializeAws_restJson1GetGameBillingPlansCommand = exports.serializeAws_restJson1GetGameBillingCommand = exports.serializeAws_restJson1GameLogoUploadPrepareCommand = exports.serializeAws_restJson1GameLogoUploadCompleteCommand = exports.serializeAws_restJson1GameBannerUploadPrepareCommand = exports.serializeAws_restJson1GameBannerUploadCompleteCommand = exports.serializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = exports.serializeAws_restJson1ExportLobbyLogsCommand = exports.serializeAws_restJson1DeleteMatchmakerLobbyCommand = exports.serializeAws_restJson1CreateGameVersionCommand = exports.serializeAws_restJson1CreateGameNamespaceTokenPublicCommand = exports.serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = exports.serializeAws_restJson1CreateGameNamespaceCommand = exports.serializeAws_restJson1CreateGameCdnSiteCommand = exports.serializeAws_restJson1CreateGameBuildCommand = exports.serializeAws_restJson1CreateGameCommand = exports.serializeAws_restJson1CreateCloudTokenCommand = exports.serializeAws_restJson1ConvertGroupCommand = exports.serializeAws_restJson1CompleteUploadCommand = exports.serializeAws_restJson1CompleteCustomAvatarUploadCommand = exports.serializeAws_restJson1AddNamespaceDomainCommand = void 0;
exports.deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = exports.deserializeAws_restJson1UpdateGameNamespaceVersionCommand = exports.deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = exports.deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = exports.deserializeAws_restJson1SetNamespaceCdnAuthTypeCommand = exports.deserializeAws_restJson1SetGameBillingPlanCommand = exports.deserializeAws_restJson1RemoveNamespaceDomainCommand = exports.deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = exports.deserializeAws_restJson1PrepareCustomAvatarUploadCommand = exports.deserializeAws_restJson1ListNamespaceLobbiesCommand = exports.deserializeAws_restJson1ListGameCustomAvatarsCommand = exports.deserializeAws_restJson1ListGameCdnSitesCommand = exports.deserializeAws_restJson1ListGameBuildsCommand = exports.deserializeAws_restJson1InspectCommand = exports.deserializeAws_restJson1GroupBillingCheckoutCommand = exports.deserializeAws_restJson1GetRegionTiersCommand = exports.deserializeAws_restJson1GetRayPerfLogsCommand = exports.deserializeAws_restJson1GetNamespaceLobbyCommand = exports.deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = exports.deserializeAws_restJson1GetLobbyLogsCommand = exports.deserializeAws_restJson1GetGroupInvoicesListCommand = exports.deserializeAws_restJson1GetGroupBillingCommand = exports.deserializeAws_restJson1GetGameVersionByIdCommand = exports.deserializeAws_restJson1GetGamesCommand = exports.deserializeAws_restJson1GetGameNamespaceByIdCommand = exports.deserializeAws_restJson1GetGameByIdCommand = exports.deserializeAws_restJson1GetGameBillingPlansCommand = exports.deserializeAws_restJson1GetGameBillingCommand = exports.deserializeAws_restJson1GameLogoUploadPrepareCommand = exports.deserializeAws_restJson1GameLogoUploadCompleteCommand = exports.deserializeAws_restJson1GameBannerUploadPrepareCommand = exports.deserializeAws_restJson1GameBannerUploadCompleteCommand = exports.deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = exports.deserializeAws_restJson1ExportLobbyLogsCommand = exports.deserializeAws_restJson1DeleteMatchmakerLobbyCommand = exports.deserializeAws_restJson1CreateGameVersionCommand = exports.deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand = exports.deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = exports.deserializeAws_restJson1CreateGameNamespaceCommand = exports.deserializeAws_restJson1CreateGameCdnSiteCommand = exports.deserializeAws_restJson1CreateGameBuildCommand = exports.deserializeAws_restJson1CreateGameCommand = exports.deserializeAws_restJson1CreateCloudTokenCommand = exports.deserializeAws_restJson1ConvertGroupCommand = exports.deserializeAws_restJson1CompleteUploadCommand = exports.deserializeAws_restJson1CompleteCustomAvatarUploadCommand = exports.deserializeAws_restJson1AddNamespaceDomainCommand = exports.serializeAws_restJson1ValidateGroupCommand = exports.serializeAws_restJson1ValidateGameVersionCommand = exports.serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = void 0;
exports.deserializeAws_restJson1ValidateGroupCommand = exports.deserializeAws_restJson1ValidateGameVersionCommand = exports.deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = exports.deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = exports.deserializeAws_restJson1ValidateGameNamespaceCommand = exports.deserializeAws_restJson1ValidateGameCommand = void 0;
const CloudServiceServiceException_1 = require("../models/CloudServiceServiceException");
const models_0_1 = require("../models/models_0");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1AddNamespaceDomainCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/domains";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.domain !== undefined && input.domain !== null && { "domain": input.domain }),
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
exports.serializeAws_restJson1AddNamespaceDomainCommand = serializeAws_restJson1AddNamespaceDomainCommand;
const serializeAws_restJson1CompleteCustomAvatarUploadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/avatar-upload/{upload_id}/complete";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.uploadId !== undefined) {
        const labelValue = input.uploadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: uploadId.');
        }
        resolvedPath = resolvedPath.replace("{upload_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: uploadId.');
    }
    let body;
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
exports.serializeAws_restJson1CompleteCustomAvatarUploadCommand = serializeAws_restJson1CompleteCustomAvatarUploadCommand;
const serializeAws_restJson1CompleteUploadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/uploads/{upload_id}/complete";
    if (input.uploadId !== undefined) {
        const labelValue = input.uploadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: uploadId.');
        }
        resolvedPath = resolvedPath.replace("{upload_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: uploadId.');
    }
    let body;
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
exports.serializeAws_restJson1CompleteUploadCommand = serializeAws_restJson1CompleteUploadCommand;
const serializeAws_restJson1ConvertGroupCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/convert";
    if (input.groupId !== undefined) {
        const labelValue = input.groupId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: groupId.');
        }
        resolvedPath = resolvedPath.replace("{group_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: groupId.');
    }
    let body;
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
exports.serializeAws_restJson1ConvertGroupCommand = serializeAws_restJson1ConvertGroupCommand;
const serializeAws_restJson1CreateCloudTokenCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/tokens/cloud";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
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
exports.serializeAws_restJson1CreateCloudTokenCommand = serializeAws_restJson1CreateCloudTokenCommand;
const serializeAws_restJson1CreateGameCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games";
    let body;
    body = JSON.stringify({
        ...(input.developerGroupId !== undefined && input.developerGroupId !== null && { "developer_group_id": input.developerGroupId }),
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId }),
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
exports.serializeAws_restJson1CreateGameCommand = serializeAws_restJson1CreateGameCommand;
const serializeAws_restJson1CreateGameBuildCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/builds";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.imageFile !== undefined && input.imageFile !== null && { "image_file": serializeAws_restJson1UploadPrepareFile(input.imageFile, context) }),
        ...(input.imageTag !== undefined && input.imageTag !== null && { "image_tag": input.imageTag }),
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
exports.serializeAws_restJson1CreateGameBuildCommand = serializeAws_restJson1CreateGameBuildCommand;
const serializeAws_restJson1CreateGameCdnSiteCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/cdn/sites";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.files !== undefined && input.files !== null && { "files": serializeAws_restJson1UploadPrepareFiles(input.files, context) }),
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
exports.serializeAws_restJson1CreateGameCdnSiteCommand = serializeAws_restJson1CreateGameCdnSiteCommand;
const serializeAws_restJson1CreateGameNamespaceCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId }),
        ...(input.versionId !== undefined && input.versionId !== null && { "version_id": input.versionId }),
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
exports.serializeAws_restJson1CreateGameNamespaceCommand = serializeAws_restJson1CreateGameNamespaceCommand;
const serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/tokens/development";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.hostname !== undefined && input.hostname !== null && { "hostname": input.hostname }),
        ...(input.lobbyPorts !== undefined && input.lobbyPorts !== null && { "lobby_ports": serializeAws_restJson1LobbyGroupRuntimeDockerPorts(input.lobbyPorts, context) }),
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
exports.serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand;
const serializeAws_restJson1CreateGameNamespaceTokenPublicCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/tokens/public";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
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
exports.serializeAws_restJson1CreateGameNamespaceTokenPublicCommand = serializeAws_restJson1CreateGameNamespaceTokenPublicCommand;
const serializeAws_restJson1CreateGameVersionCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/versions";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.config !== undefined && input.config !== null && { "config": serializeAws_restJson1CloudVersionConfig(input.config, context) }),
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
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
exports.serializeAws_restJson1CreateGameVersionCommand = serializeAws_restJson1CreateGameVersionCommand;
const serializeAws_restJson1DeleteMatchmakerLobbyCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/matchmaker/lobbies/{lobby_id}";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.lobbyId !== undefined) {
        const labelValue = input.lobbyId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: lobbyId.');
        }
        resolvedPath = resolvedPath.replace("{lobby_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: lobbyId.');
    }
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "DELETE",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1DeleteMatchmakerLobbyCommand = serializeAws_restJson1DeleteMatchmakerLobbyCommand;
const serializeAws_restJson1ExportLobbyLogsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/matchmaker/lobbies/{lobby_id}/logs/export";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.lobbyId !== undefined) {
        const labelValue = input.lobbyId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: lobbyId.');
        }
        resolvedPath = resolvedPath.replace("{lobby_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: lobbyId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.stream !== undefined && input.stream !== null && { "stream": input.stream }),
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
exports.serializeAws_restJson1ExportLobbyLogsCommand = serializeAws_restJson1ExportLobbyLogsCommand;
const serializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/matchmaker/lobbies/export-history";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.queryEnd !== undefined && input.queryEnd !== null && { "query_end": input.queryEnd }),
        ...(input.queryStart !== undefined && input.queryStart !== null && { "query_start": input.queryStart }),
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
exports.serializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = serializeAws_restJson1ExportMatchmakerLobbyHistoryCommand;
const serializeAws_restJson1GameBannerUploadCompleteCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/banner-upload/{upload_id}/complete";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.uploadId !== undefined) {
        const labelValue = input.uploadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: uploadId.');
        }
        resolvedPath = resolvedPath.replace("{upload_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: uploadId.');
    }
    let body;
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
exports.serializeAws_restJson1GameBannerUploadCompleteCommand = serializeAws_restJson1GameBannerUploadCompleteCommand;
const serializeAws_restJson1GameBannerUploadPrepareCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/banner-upload/prepare";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength }),
        ...(input.mime !== undefined && input.mime !== null && { "mime": input.mime }),
        ...(input.path !== undefined && input.path !== null && { "path": input.path }),
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
exports.serializeAws_restJson1GameBannerUploadPrepareCommand = serializeAws_restJson1GameBannerUploadPrepareCommand;
const serializeAws_restJson1GameLogoUploadCompleteCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/logo-upload/{upload_id}/complete";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.uploadId !== undefined) {
        const labelValue = input.uploadId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: uploadId.');
        }
        resolvedPath = resolvedPath.replace("{upload_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: uploadId.');
    }
    let body;
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
exports.serializeAws_restJson1GameLogoUploadCompleteCommand = serializeAws_restJson1GameLogoUploadCompleteCommand;
const serializeAws_restJson1GameLogoUploadPrepareCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/logo-upload/prepare";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength }),
        ...(input.mime !== undefined && input.mime !== null && { "mime": input.mime }),
        ...(input.path !== undefined && input.path !== null && { "path": input.path }),
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
exports.serializeAws_restJson1GameLogoUploadPrepareCommand = serializeAws_restJson1GameLogoUploadPrepareCommand;
const serializeAws_restJson1GetGameBillingCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/billing";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    const query = {
        ...(input.queryStart !== undefined && { "query_start": input.queryStart.toString() }),
        ...(input.queryEnd !== undefined && { "query_end": input.queryEnd.toString() }),
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
exports.serializeAws_restJson1GetGameBillingCommand = serializeAws_restJson1GetGameBillingCommand;
const serializeAws_restJson1GetGameBillingPlansCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/billing/plans";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
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
exports.serializeAws_restJson1GetGameBillingPlansCommand = serializeAws_restJson1GetGameBillingPlansCommand;
const serializeAws_restJson1GetGameByIdCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
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
exports.serializeAws_restJson1GetGameByIdCommand = serializeAws_restJson1GetGameByIdCommand;
const serializeAws_restJson1GetGameNamespaceByIdCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
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
exports.serializeAws_restJson1GetGameNamespaceByIdCommand = serializeAws_restJson1GetGameNamespaceByIdCommand;
const serializeAws_restJson1GetGamesCommand = async (input, context) => {
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
exports.serializeAws_restJson1GetGamesCommand = serializeAws_restJson1GetGamesCommand;
const serializeAws_restJson1GetGameVersionByIdCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/versions/{version_id}";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.versionId !== undefined) {
        const labelValue = input.versionId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: versionId.');
        }
        resolvedPath = resolvedPath.replace("{version_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: versionId.');
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
exports.serializeAws_restJson1GetGameVersionByIdCommand = serializeAws_restJson1GetGameVersionByIdCommand;
const serializeAws_restJson1GetGroupBillingCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/billing";
    if (input.groupId !== undefined) {
        const labelValue = input.groupId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: groupId.');
        }
        resolvedPath = resolvedPath.replace("{group_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: groupId.');
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
exports.serializeAws_restJson1GetGroupBillingCommand = serializeAws_restJson1GetGroupBillingCommand;
const serializeAws_restJson1GetGroupInvoicesListCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/billing/invoices";
    if (input.groupId !== undefined) {
        const labelValue = input.groupId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: groupId.');
        }
        resolvedPath = resolvedPath.replace("{group_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: groupId.');
    }
    const query = {
        ...(input.page !== undefined && { "page": input.page.toString() }),
        ...(input.perPage !== undefined && { "per_page": input.perPage.toString() }),
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
exports.serializeAws_restJson1GetGroupInvoicesListCommand = serializeAws_restJson1GetGroupInvoicesListCommand;
const serializeAws_restJson1GetLobbyLogsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/matchmaker/lobbies/{lobby_id}/logs";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.lobbyId !== undefined) {
        const labelValue = input.lobbyId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: lobbyId.');
        }
        resolvedPath = resolvedPath.replace("{lobby_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: lobbyId.');
    }
    const query = {
        ...(input.stream !== undefined && { "stream": input.stream }),
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
exports.serializeAws_restJson1GetLobbyLogsCommand = serializeAws_restJson1GetLobbyLogsCommand;
const serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/analytics/matchmaker/live";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
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
exports.serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand;
const serializeAws_restJson1GetNamespaceLobbyCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/logs/lobbies/{lobby_id}";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    if (input.lobbyId !== undefined) {
        const labelValue = input.lobbyId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: lobbyId.');
        }
        resolvedPath = resolvedPath.replace("{lobby_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: lobbyId.');
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
exports.serializeAws_restJson1GetNamespaceLobbyCommand = serializeAws_restJson1GetNamespaceLobbyCommand;
const serializeAws_restJson1GetRayPerfLogsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/rays/{ray_id}/perf";
    if (input.rayId !== undefined) {
        const labelValue = input.rayId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: rayId.');
        }
        resolvedPath = resolvedPath.replace("{ray_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: rayId.');
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
exports.serializeAws_restJson1GetRayPerfLogsCommand = serializeAws_restJson1GetRayPerfLogsCommand;
const serializeAws_restJson1GetRegionTiersCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/region-tiers";
    let body;
    body = "";
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
exports.serializeAws_restJson1GetRegionTiersCommand = serializeAws_restJson1GetRegionTiersCommand;
const serializeAws_restJson1GroupBillingCheckoutCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/checkout";
    if (input.groupId !== undefined) {
        const labelValue = input.groupId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: groupId.');
        }
        resolvedPath = resolvedPath.replace("{group_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: groupId.');
    }
    let body;
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
exports.serializeAws_restJson1GroupBillingCheckoutCommand = serializeAws_restJson1GroupBillingCheckoutCommand;
const serializeAws_restJson1InspectCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/auth/inspect";
    let body;
    body = "";
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
exports.serializeAws_restJson1InspectCommand = serializeAws_restJson1InspectCommand;
const serializeAws_restJson1ListGameBuildsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/builds";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
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
exports.serializeAws_restJson1ListGameBuildsCommand = serializeAws_restJson1ListGameBuildsCommand;
const serializeAws_restJson1ListGameCdnSitesCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/cdn/sites";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
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
exports.serializeAws_restJson1ListGameCdnSitesCommand = serializeAws_restJson1ListGameCdnSitesCommand;
const serializeAws_restJson1ListGameCustomAvatarsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/avatars";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
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
exports.serializeAws_restJson1ListGameCustomAvatarsCommand = serializeAws_restJson1ListGameCustomAvatarsCommand;
const serializeAws_restJson1ListNamespaceLobbiesCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/logs/lobbies";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    const query = {
        ...(input.beforeCreateTs !== undefined && { "before_create_ts": input.beforeCreateTs.toISOString().toString() }),
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
exports.serializeAws_restJson1ListNamespaceLobbiesCommand = serializeAws_restJson1ListNamespaceLobbiesCommand;
const serializeAws_restJson1PrepareCustomAvatarUploadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/avatar-upload/prepare";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength }),
        ...(input.mime !== undefined && input.mime !== null && { "mime": input.mime }),
        ...(input.path !== undefined && input.path !== null && { "path": input.path }),
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
exports.serializeAws_restJson1PrepareCustomAvatarUploadCommand = serializeAws_restJson1PrepareCustomAvatarUploadCommand;
const serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/auth-user/{user}";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    if (input.user !== undefined) {
        const labelValue = input.user;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: user.');
        }
        resolvedPath = resolvedPath.replace("{user}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: user.');
    }
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "DELETE",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand;
const serializeAws_restJson1RemoveNamespaceDomainCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/domains/{domain}";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    if (input.domain !== undefined) {
        const labelValue = input.domain;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: domain.');
        }
        resolvedPath = resolvedPath.replace("{domain}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: domain.');
    }
    let body;
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "DELETE",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1RemoveNamespaceDomainCommand = serializeAws_restJson1RemoveNamespaceDomainCommand;
const serializeAws_restJson1SetGameBillingPlanCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/billing/plan";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.plan !== undefined && input.plan !== null && { "plan": input.plan }),
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
exports.serializeAws_restJson1SetGameBillingPlanCommand = serializeAws_restJson1SetGameBillingPlanCommand;
const serializeAws_restJson1SetNamespaceCdnAuthTypeCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/cdn-auth";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.authType !== undefined && input.authType !== null && { "auth_type": input.authType }),
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
exports.serializeAws_restJson1SetNamespaceCdnAuthTypeCommand = serializeAws_restJson1SetNamespaceCdnAuthTypeCommand;
const serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/domain-public-auth";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.enabled !== undefined && input.enabled !== null && { "enabled": input.enabled }),
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
exports.serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand;
const serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/mm-config";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.lobbyCountMax !== undefined && input.lobbyCountMax !== null && { "lobby_count_max": input.lobbyCountMax }),
        ...(input.maxPlayers !== undefined && input.maxPlayers !== null && { "max_players": input.maxPlayers }),
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
exports.serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand;
const serializeAws_restJson1UpdateGameNamespaceVersionCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/version";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.versionId !== undefined && input.versionId !== null && { "version_id": input.versionId }),
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
exports.serializeAws_restJson1UpdateGameNamespaceVersionCommand = serializeAws_restJson1UpdateGameNamespaceVersionCommand;
const serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/auth-user";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.password !== undefined && input.password !== null && { "password": input.password }),
        ...(input.user !== undefined && input.user !== null && { "user": input.user }),
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
exports.serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand;
const serializeAws_restJson1ValidateGameCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/validate";
    let body;
    body = JSON.stringify({
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId }),
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
exports.serializeAws_restJson1ValidateGameCommand = serializeAws_restJson1ValidateGameCommand;
const serializeAws_restJson1ValidateGameNamespaceCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/validate";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId }),
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
exports.serializeAws_restJson1ValidateGameNamespaceCommand = serializeAws_restJson1ValidateGameNamespaceCommand;
const serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/mm-config/validate";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.lobbyCountMax !== undefined && input.lobbyCountMax !== null && { "lobby_count_max": input.lobbyCountMax }),
        ...(input.maxPlayers !== undefined && input.maxPlayers !== null && { "max_players": input.maxPlayers }),
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
exports.serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand;
const serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/namespaces/{namespace_id}/tokens/development/validate";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    if (input.namespaceId !== undefined) {
        const labelValue = input.namespaceId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: namespaceId.');
        }
        resolvedPath = resolvedPath.replace("{namespace_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: namespaceId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.hostname !== undefined && input.hostname !== null && { "hostname": input.hostname }),
        ...(input.lobbyPorts !== undefined && input.lobbyPorts !== null && { "lobby_ports": serializeAws_restJson1LobbyGroupRuntimeDockerPorts(input.lobbyPorts, context) }),
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
exports.serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand;
const serializeAws_restJson1ValidateGameVersionCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/games/{game_id}/versions/validate";
    if (input.gameId !== undefined) {
        const labelValue = input.gameId;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: gameId.');
        }
        resolvedPath = resolvedPath.replace("{game_id}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: gameId.');
    }
    let body;
    body = JSON.stringify({
        ...(input.config !== undefined && input.config !== null && { "config": serializeAws_restJson1CloudVersionConfig(input.config, context) }),
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
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
exports.serializeAws_restJson1ValidateGameVersionCommand = serializeAws_restJson1ValidateGameVersionCommand;
const serializeAws_restJson1ValidateGroupCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/validate";
    let body;
    body = JSON.stringify({
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
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
exports.serializeAws_restJson1ValidateGroupCommand = serializeAws_restJson1ValidateGroupCommand;
const deserializeAws_restJson1AddNamespaceDomainCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1AddNamespaceDomainCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1AddNamespaceDomainCommand = deserializeAws_restJson1AddNamespaceDomainCommand;
const deserializeAws_restJson1AddNamespaceDomainCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CompleteCustomAvatarUploadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CompleteCustomAvatarUploadCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CompleteCustomAvatarUploadCommand = deserializeAws_restJson1CompleteCustomAvatarUploadCommand;
const deserializeAws_restJson1CompleteCustomAvatarUploadCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CompleteUploadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CompleteUploadCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CompleteUploadCommand = deserializeAws_restJson1CompleteUploadCommand;
const deserializeAws_restJson1CompleteUploadCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ConvertGroupCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ConvertGroupCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ConvertGroupCommand = deserializeAws_restJson1ConvertGroupCommand;
const deserializeAws_restJson1ConvertGroupCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateCloudTokenCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateCloudTokenCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        token: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.token !== undefined && data.token !== null) {
        contents.token = (0, smithy_client_1.expectString)(data.token);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateCloudTokenCommand = deserializeAws_restJson1CreateCloudTokenCommand;
const deserializeAws_restJson1CreateCloudTokenCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGameCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGameCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        gameId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.game_id !== undefined && data.game_id !== null) {
        contents.gameId = (0, smithy_client_1.expectString)(data.game_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGameCommand = deserializeAws_restJson1CreateGameCommand;
const deserializeAws_restJson1CreateGameCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGameBuildCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGameBuildCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        buildId: undefined,
        imagePresignedRequest: undefined,
        uploadId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.build_id !== undefined && data.build_id !== null) {
        contents.buildId = (0, smithy_client_1.expectString)(data.build_id);
    }
    if (data.image_presigned_request !== undefined && data.image_presigned_request !== null) {
        contents.imagePresignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.image_presigned_request, context);
    }
    if (data.upload_id !== undefined && data.upload_id !== null) {
        contents.uploadId = (0, smithy_client_1.expectString)(data.upload_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGameBuildCommand = deserializeAws_restJson1CreateGameBuildCommand;
const deserializeAws_restJson1CreateGameBuildCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGameCdnSiteCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGameCdnSiteCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        presignedRequests: undefined,
        siteId: undefined,
        uploadId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.presigned_requests !== undefined && data.presigned_requests !== null) {
        contents.presignedRequests = deserializeAws_restJson1UploadPresignedRequests(data.presigned_requests, context);
    }
    if (data.site_id !== undefined && data.site_id !== null) {
        contents.siteId = (0, smithy_client_1.expectString)(data.site_id);
    }
    if (data.upload_id !== undefined && data.upload_id !== null) {
        contents.uploadId = (0, smithy_client_1.expectString)(data.upload_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGameCdnSiteCommand = deserializeAws_restJson1CreateGameCdnSiteCommand;
const deserializeAws_restJson1CreateGameCdnSiteCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGameNamespaceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGameNamespaceCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        namespaceId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.namespace_id !== undefined && data.namespace_id !== null) {
        contents.namespaceId = (0, smithy_client_1.expectString)(data.namespace_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGameNamespaceCommand = deserializeAws_restJson1CreateGameNamespaceCommand;
const deserializeAws_restJson1CreateGameNamespaceCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        token: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.token !== undefined && data.token !== null) {
        contents.token = (0, smithy_client_1.expectString)(data.token);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand = deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand;
const deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGameNamespaceTokenPublicCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        token: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.token !== undefined && data.token !== null) {
        contents.token = (0, smithy_client_1.expectString)(data.token);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand = deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand;
const deserializeAws_restJson1CreateGameNamespaceTokenPublicCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGameVersionCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGameVersionCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        versionId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.version_id !== undefined && data.version_id !== null) {
        contents.versionId = (0, smithy_client_1.expectString)(data.version_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGameVersionCommand = deserializeAws_restJson1CreateGameVersionCommand;
const deserializeAws_restJson1CreateGameVersionCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1DeleteMatchmakerLobbyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeleteMatchmakerLobbyCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        didRemove: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.did_remove !== undefined && data.did_remove !== null) {
        contents.didRemove = (0, smithy_client_1.expectBoolean)(data.did_remove);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeleteMatchmakerLobbyCommand = deserializeAws_restJson1DeleteMatchmakerLobbyCommand;
const deserializeAws_restJson1DeleteMatchmakerLobbyCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ExportLobbyLogsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ExportLobbyLogsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        url: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.url !== undefined && data.url !== null) {
        contents.url = (0, smithy_client_1.expectString)(data.url);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ExportLobbyLogsCommand = deserializeAws_restJson1ExportLobbyLogsCommand;
const deserializeAws_restJson1ExportLobbyLogsCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        url: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.url !== undefined && data.url !== null) {
        contents.url = (0, smithy_client_1.expectString)(data.url);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommand = deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommand;
const deserializeAws_restJson1ExportMatchmakerLobbyHistoryCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GameBannerUploadCompleteCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GameBannerUploadCompleteCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GameBannerUploadCompleteCommand = deserializeAws_restJson1GameBannerUploadCompleteCommand;
const deserializeAws_restJson1GameBannerUploadCompleteCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GameBannerUploadPrepareCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GameBannerUploadPrepareCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        presignedRequest: undefined,
        uploadId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.presigned_request !== undefined && data.presigned_request !== null) {
        contents.presignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.presigned_request, context);
    }
    if (data.upload_id !== undefined && data.upload_id !== null) {
        contents.uploadId = (0, smithy_client_1.expectString)(data.upload_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GameBannerUploadPrepareCommand = deserializeAws_restJson1GameBannerUploadPrepareCommand;
const deserializeAws_restJson1GameBannerUploadPrepareCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GameLogoUploadCompleteCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GameLogoUploadCompleteCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GameLogoUploadCompleteCommand = deserializeAws_restJson1GameLogoUploadCompleteCommand;
const deserializeAws_restJson1GameLogoUploadCompleteCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GameLogoUploadPrepareCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GameLogoUploadPrepareCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        presignedRequest: undefined,
        uploadId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.presigned_request !== undefined && data.presigned_request !== null) {
        contents.presignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.presigned_request, context);
    }
    if (data.upload_id !== undefined && data.upload_id !== null) {
        contents.uploadId = (0, smithy_client_1.expectString)(data.upload_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GameLogoUploadPrepareCommand = deserializeAws_restJson1GameLogoUploadPrepareCommand;
const deserializeAws_restJson1GameLogoUploadPrepareCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGameBillingCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGameBillingCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        availableRegions: undefined,
        game: undefined,
        groupActive: undefined,
        groupStatus: undefined,
        metrics: undefined,
        namespaces: undefined,
        plan: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.available_regions !== undefined && data.available_regions !== null) {
        contents.availableRegions = deserializeAws_restJson1RegionSummaries(data.available_regions, context);
    }
    if (data.game !== undefined && data.game !== null) {
        contents.game = deserializeAws_restJson1GameHandle(data.game, context);
    }
    if (data.group_active !== undefined && data.group_active !== null) {
        contents.groupActive = (0, smithy_client_1.expectBoolean)(data.group_active);
    }
    if (data.group_status !== undefined && data.group_status !== null) {
        contents.groupStatus = (0, smithy_client_1.expectString)(data.group_status);
    }
    if (data.metrics !== undefined && data.metrics !== null) {
        contents.metrics = deserializeAws_restJson1MultipleRegionTierMetrics(data.metrics, context);
    }
    if (data.namespaces !== undefined && data.namespaces !== null) {
        contents.namespaces = deserializeAws_restJson1NamespaceSummaries(data.namespaces, context);
    }
    if (data.plan !== undefined && data.plan !== null) {
        contents.plan = (0, smithy_client_1.expectString)(data.plan);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGameBillingCommand = deserializeAws_restJson1GetGameBillingCommand;
const deserializeAws_restJson1GetGameBillingCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGameBillingPlansCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGameBillingPlansCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        plans: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.plans !== undefined && data.plans !== null) {
        contents.plans = deserializeAws_restJson1GameBillingPlans(data.plans, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGameBillingPlansCommand = deserializeAws_restJson1GetGameBillingPlansCommand;
const deserializeAws_restJson1GetGameBillingPlansCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGameByIdCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGameByIdCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        game: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.game !== undefined && data.game !== null) {
        contents.game = deserializeAws_restJson1GameFull(data.game, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGameByIdCommand = deserializeAws_restJson1GetGameByIdCommand;
const deserializeAws_restJson1GetGameByIdCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGameNamespaceByIdCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGameNamespaceByIdCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        namespace: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.namespace !== undefined && data.namespace !== null) {
        contents.namespace = deserializeAws_restJson1NamespaceFull(data.namespace, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGameNamespaceByIdCommand = deserializeAws_restJson1GetGameNamespaceByIdCommand;
const deserializeAws_restJson1GetGameNamespaceByIdCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGamesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGamesCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        games: undefined,
        groups: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.games !== undefined && data.games !== null) {
        contents.games = deserializeAws_restJson1GameSummaries(data.games, context);
    }
    if (data.groups !== undefined && data.groups !== null) {
        contents.groups = deserializeAws_restJson1GroupSummaries(data.groups, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGamesCommand = deserializeAws_restJson1GetGamesCommand;
const deserializeAws_restJson1GetGamesCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGameVersionByIdCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGameVersionByIdCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        version: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.version !== undefined && data.version !== null) {
        contents.version = deserializeAws_restJson1VersionFull(data.version, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGameVersionByIdCommand = deserializeAws_restJson1GetGameVersionByIdCommand;
const deserializeAws_restJson1GetGameVersionByIdCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupBillingCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupBillingCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        active: undefined,
        status: undefined,
        usage: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.active !== undefined && data.active !== null) {
        contents.active = (0, smithy_client_1.expectBoolean)(data.active);
    }
    if (data.status !== undefined && data.status !== null) {
        contents.status = (0, smithy_client_1.expectString)(data.status);
    }
    if (data.usage !== undefined && data.usage !== null) {
        contents.usage = (0, smithy_client_1.expectLong)(data.usage);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupBillingCommand = deserializeAws_restJson1GetGroupBillingCommand;
const deserializeAws_restJson1GetGroupBillingCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupInvoicesListCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupInvoicesListCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        invoices: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.invoices !== undefined && data.invoices !== null) {
        contents.invoices = deserializeAws_restJson1GroupBillingInvoices(data.invoices, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupInvoicesListCommand = deserializeAws_restJson1GetGroupInvoicesListCommand;
const deserializeAws_restJson1GetGroupInvoicesListCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetLobbyLogsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetLobbyLogsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        lines: undefined,
        timestamps: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.lines !== undefined && data.lines !== null) {
        contents.lines = deserializeAws_restJson1LobbyLogLines(data.lines, context);
    }
    if (data.timestamps !== undefined && data.timestamps !== null) {
        contents.timestamps = deserializeAws_restJson1LobbyLogTimestamps(data.timestamps, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetLobbyLogsCommand = deserializeAws_restJson1GetLobbyLogsCommand;
const deserializeAws_restJson1GetLobbyLogsCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        lobbies: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.lobbies !== undefined && data.lobbies !== null) {
        contents.lobbies = deserializeAws_restJson1AnalyticsLobbySummaries(data.lobbies, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand = deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand;
const deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetNamespaceLobbyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetNamespaceLobbyCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        lobby: undefined,
        metrics: undefined,
        perfLists: undefined,
        stderrPresignedUrls: undefined,
        stdoutPresignedUrls: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
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
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetNamespaceLobbyCommand = deserializeAws_restJson1GetNamespaceLobbyCommand;
const deserializeAws_restJson1GetNamespaceLobbyCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetRayPerfLogsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetRayPerfLogsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        perfLists: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.perf_lists !== undefined && data.perf_lists !== null) {
        contents.perfLists = deserializeAws_restJson1SvcPerfs(data.perf_lists, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetRayPerfLogsCommand = deserializeAws_restJson1GetRayPerfLogsCommand;
const deserializeAws_restJson1GetRayPerfLogsCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetRegionTiersCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetRegionTiersCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        tiers: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.tiers !== undefined && data.tiers !== null) {
        contents.tiers = deserializeAws_restJson1RegionTiers(data.tiers, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetRegionTiersCommand = deserializeAws_restJson1GetRegionTiersCommand;
const deserializeAws_restJson1GetRegionTiersCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GroupBillingCheckoutCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GroupBillingCheckoutCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        url: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.url !== undefined && data.url !== null) {
        contents.url = (0, smithy_client_1.expectString)(data.url);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GroupBillingCheckoutCommand = deserializeAws_restJson1GroupBillingCheckoutCommand;
const deserializeAws_restJson1GroupBillingCheckoutCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1InspectCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1InspectCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        agent: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.agent !== undefined && data.agent !== null) {
        contents.agent = deserializeAws_restJson1AuthAgent((0, smithy_client_1.expectUnion)(data.agent), context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1InspectCommand = deserializeAws_restJson1InspectCommand;
const deserializeAws_restJson1InspectCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ListGameBuildsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListGameBuildsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        builds: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.builds !== undefined && data.builds !== null) {
        contents.builds = deserializeAws_restJson1BuildSummaries(data.builds, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListGameBuildsCommand = deserializeAws_restJson1ListGameBuildsCommand;
const deserializeAws_restJson1ListGameBuildsCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ListGameCdnSitesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListGameCdnSitesCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        sites: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.sites !== undefined && data.sites !== null) {
        contents.sites = deserializeAws_restJson1CdnSiteSummaries(data.sites, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListGameCdnSitesCommand = deserializeAws_restJson1ListGameCdnSitesCommand;
const deserializeAws_restJson1ListGameCdnSitesCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ListGameCustomAvatarsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListGameCustomAvatarsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        customAvatars: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.custom_avatars !== undefined && data.custom_avatars !== null) {
        contents.customAvatars = deserializeAws_restJson1CustomAvatarSummaries(data.custom_avatars, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListGameCustomAvatarsCommand = deserializeAws_restJson1ListGameCustomAvatarsCommand;
const deserializeAws_restJson1ListGameCustomAvatarsCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ListNamespaceLobbiesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListNamespaceLobbiesCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        lobbies: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.lobbies !== undefined && data.lobbies !== null) {
        contents.lobbies = deserializeAws_restJson1LogsLobbySummaries(data.lobbies, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListNamespaceLobbiesCommand = deserializeAws_restJson1ListNamespaceLobbiesCommand;
const deserializeAws_restJson1ListNamespaceLobbiesCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1PrepareCustomAvatarUploadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PrepareCustomAvatarUploadCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        presignedRequest: undefined,
        uploadId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.presigned_request !== undefined && data.presigned_request !== null) {
        contents.presignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.presigned_request, context);
    }
    if (data.upload_id !== undefined && data.upload_id !== null) {
        contents.uploadId = (0, smithy_client_1.expectString)(data.upload_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PrepareCustomAvatarUploadCommand = deserializeAws_restJson1PrepareCustomAvatarUploadCommand;
const deserializeAws_restJson1PrepareCustomAvatarUploadCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand = deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand;
const deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1RemoveNamespaceDomainCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1RemoveNamespaceDomainCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1RemoveNamespaceDomainCommand = deserializeAws_restJson1RemoveNamespaceDomainCommand;
const deserializeAws_restJson1RemoveNamespaceDomainCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1SetGameBillingPlanCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1SetGameBillingPlanCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1SetGameBillingPlanCommand = deserializeAws_restJson1SetGameBillingPlanCommand;
const deserializeAws_restJson1SetGameBillingPlanCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1SetNamespaceCdnAuthTypeCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1SetNamespaceCdnAuthTypeCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1SetNamespaceCdnAuthTypeCommand = deserializeAws_restJson1SetNamespaceCdnAuthTypeCommand;
const deserializeAws_restJson1SetNamespaceCdnAuthTypeCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand = deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand;
const deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand = deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand;
const deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1UpdateGameNamespaceVersionCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UpdateGameNamespaceVersionCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UpdateGameNamespaceVersionCommand = deserializeAws_restJson1UpdateGameNamespaceVersionCommand;
const deserializeAws_restJson1UpdateGameNamespaceVersionCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand = deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand;
const deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ValidateGameCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ValidateGameCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        errors: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ValidateGameCommand = deserializeAws_restJson1ValidateGameCommand;
const deserializeAws_restJson1ValidateGameCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ValidateGameNamespaceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ValidateGameNamespaceCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        errors: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ValidateGameNamespaceCommand = deserializeAws_restJson1ValidateGameNamespaceCommand;
const deserializeAws_restJson1ValidateGameNamespaceCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        errors: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand = deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand;
const deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        errors: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand = deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand;
const deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ValidateGameVersionCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ValidateGameVersionCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        errors: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ValidateGameVersionCommand = deserializeAws_restJson1ValidateGameVersionCommand;
const deserializeAws_restJson1ValidateGameVersionCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ValidateGroupCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ValidateGroupCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        errors: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.errors !== undefined && data.errors !== null) {
        contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ValidateGroupCommand = deserializeAws_restJson1ValidateGroupCommand;
const deserializeAws_restJson1ValidateGroupCommandError = async (output, context) => {
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
            response = new CloudServiceServiceException_1.CloudServiceServiceException({
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
const serializeAws_restJson1UploadPrepareFile = (input, context) => {
    return {
        ...(input.contentLength !== undefined && input.contentLength !== null && { "content_length": input.contentLength }),
        ...(input.contentType !== undefined && input.contentType !== null && { "content_type": input.contentType }),
        ...(input.path !== undefined && input.path !== null && { "path": input.path }),
    };
};
const serializeAws_restJson1UploadPrepareFiles = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1UploadPrepareFile(entry, context);
    });
};
const serializeAws_restJson1CdnVersionConfig = (input, context) => {
    return {
        ...(input.buildCommand !== undefined && input.buildCommand !== null && { "build_command": input.buildCommand }),
        ...(input.buildOutput !== undefined && input.buildOutput !== null && { "build_output": input.buildOutput }),
        ...(input.routes !== undefined && input.routes !== null && { "routes": serializeAws_restJson1CdnVersionRoutes(input.routes, context) }),
        ...(input.siteId !== undefined && input.siteId !== null && { "site_id": input.siteId }),
    };
};
const serializeAws_restJson1CdnVersionCustomHeadersMiddleware = (input, context) => {
    return {
        ...(input.headers !== undefined && input.headers !== null && { "headers": serializeAws_restJson1CdnVersionHeaders(input.headers, context) }),
    };
};
const serializeAws_restJson1CdnVersionHeader = (input, context) => {
    return {
        ...(input.name !== undefined && input.name !== null && { "name": input.name }),
        ...(input.value !== undefined && input.value !== null && { "value": input.value }),
    };
};
const serializeAws_restJson1CdnVersionHeaders = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CdnVersionHeader(entry, context);
    });
};
const serializeAws_restJson1CdnVersionMiddleware = (input, context) => {
    return {
        ...(input.kind !== undefined && input.kind !== null && { "kind": serializeAws_restJson1CdnVersionMiddlewareKind(input.kind, context) }),
    };
};
const serializeAws_restJson1CdnVersionMiddlewareKind = (input, context) => {
    return models_0_1.CdnVersionMiddlewareKind.visit(input, {
        customHeaders: value => ({ "custom_headers": serializeAws_restJson1CdnVersionCustomHeadersMiddleware(value, context) }),
        _: (name, value) => ({ name: value })
    });
};
const serializeAws_restJson1CdnVersionMiddlewares = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CdnVersionMiddleware(entry, context);
    });
};
const serializeAws_restJson1CdnVersionRoute = (input, context) => {
    return {
        ...(input.glob !== undefined && input.glob !== null && { "glob": input.glob }),
        ...(input.middlewares !== undefined && input.middlewares !== null && { "middlewares": serializeAws_restJson1CdnVersionMiddlewares(input.middlewares, context) }),
        ...(input.priority !== undefined && input.priority !== null && { "priority": input.priority }),
    };
};
const serializeAws_restJson1CdnVersionRoutes = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CdnVersionRoute(entry, context);
    });
};
const serializeAws_restJson1CloudVersionConfig = (input, context) => {
    return {
        ...(input.cdn !== undefined && input.cdn !== null && { "cdn": serializeAws_restJson1CdnVersionConfig(input.cdn, context) }),
        ...(input.identity !== undefined && input.identity !== null && { "identity": serializeAws_restJson1IdentityVersionConfig(input.identity, context) }),
        ...(input.kv !== undefined && input.kv !== null && { "kv": serializeAws_restJson1KvVersionConfig(input.kv, context) }),
        ...(input.matchmaker !== undefined && input.matchmaker !== null && { "matchmaker": serializeAws_restJson1MatchmakerVersionConfig(input.matchmaker, context) }),
    };
};
const serializeAws_restJson1CustomAvatar = (input, context) => {
    return {
        ...(input.uploadId !== undefined && input.uploadId !== null && { "upload_id": input.uploadId }),
    };
};
const serializeAws_restJson1CustomAvatars = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CustomAvatar(entry, context);
    });
};
const serializeAws_restJson1CustomDisplayName = (input, context) => {
    return {
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
    };
};
const serializeAws_restJson1CustomDisplayNames = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1CustomDisplayName(entry, context);
    });
};
const serializeAws_restJson1IdentityVersionConfig = (input, context) => {
    return {
        ...(input.customAvatars !== undefined && input.customAvatars !== null && { "custom_avatars": serializeAws_restJson1CustomAvatars(input.customAvatars, context) }),
        ...(input.customDisplayNames !== undefined && input.customDisplayNames !== null && { "custom_display_names": serializeAws_restJson1CustomDisplayNames(input.customDisplayNames, context) }),
    };
};
const serializeAws_restJson1IdleLobbiesConfig = (input, context) => {
    return {
        ...(input.maxIdleLobbies !== undefined && input.maxIdleLobbies !== null && { "max_idle_lobbies": input.maxIdleLobbies }),
        ...(input.minIdleLobbies !== undefined && input.minIdleLobbies !== null && { "min_idle_lobbies": input.minIdleLobbies }),
    };
};
const serializeAws_restJson1KvVersionConfig = (input, context) => {
    return {};
};
const serializeAws_restJson1LobbyGroup = (input, context) => {
    return {
        ...(input.maxPlayersDirect !== undefined && input.maxPlayersDirect !== null && { "max_players_direct": input.maxPlayersDirect }),
        ...(input.maxPlayersNormal !== undefined && input.maxPlayersNormal !== null && { "max_players_normal": input.maxPlayersNormal }),
        ...(input.maxPlayersParty !== undefined && input.maxPlayersParty !== null && { "max_players_party": input.maxPlayersParty }),
        ...(input.nameId !== undefined && input.nameId !== null && { "name_id": input.nameId }),
        ...(input.regions !== undefined && input.regions !== null && { "regions": serializeAws_restJson1LobbyGroupRegions(input.regions, context) }),
        ...(input.runtime !== undefined && input.runtime !== null && { "runtime": serializeAws_restJson1LobbyGroupRuntime(input.runtime, context) }),
    };
};
const serializeAws_restJson1LobbyGroupRegion = (input, context) => {
    return {
        ...(input.idleLobbies !== undefined && input.idleLobbies !== null && { "idle_lobbies": serializeAws_restJson1IdleLobbiesConfig(input.idleLobbies, context) }),
        ...(input.regionId !== undefined && input.regionId !== null && { "region_id": input.regionId }),
        ...(input.tierNameId !== undefined && input.tierNameId !== null && { "tier_name_id": input.tierNameId }),
    };
};
const serializeAws_restJson1LobbyGroupRegions = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroupRegion(entry, context);
    });
};
const serializeAws_restJson1LobbyGroupRuntime = (input, context) => {
    return models_0_1.LobbyGroupRuntime.visit(input, {
        docker: value => ({ "docker": serializeAws_restJson1LobbyGroupRuntimeDocker(value, context) }),
        _: (name, value) => ({ name: value })
    });
};
const serializeAws_restJson1LobbyGroupRuntimeDocker = (input, context) => {
    return {
        ...(input.args !== undefined && input.args !== null && { "args": serializeAws_restJson1LobbyGroupRuntimeDockerArgs(input.args, context) }),
        ...(input.buildId !== undefined && input.buildId !== null && { "build_id": input.buildId }),
        ...(input.envVars !== undefined && input.envVars !== null && { "env_vars": serializeAws_restJson1LobbyGroupRuntimeDockerEnvVars(input.envVars, context) }),
        ...(input.networkMode !== undefined && input.networkMode !== null && { "network_mode": input.networkMode }),
        ...(input.ports !== undefined && input.ports !== null && { "ports": serializeAws_restJson1LobbyGroupRuntimeDockerPorts(input.ports, context) }),
    };
};
const serializeAws_restJson1LobbyGroupRuntimeDockerArgs = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_restJson1LobbyGroupRuntimeDockerEnvVar = (input, context) => {
    return {
        ...(input.key !== undefined && input.key !== null && { "key": input.key }),
        ...(input.value !== undefined && input.value !== null && { "value": input.value }),
    };
};
const serializeAws_restJson1LobbyGroupRuntimeDockerEnvVars = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroupRuntimeDockerEnvVar(entry, context);
    });
};
const serializeAws_restJson1LobbyGroupRuntimeDockerPort = (input, context) => {
    return {
        ...(input.label !== undefined && input.label !== null && { "label": input.label }),
        ...(input.portRange !== undefined && input.portRange !== null && { "port_range": serializeAws_restJson1PortRange(input.portRange, context) }),
        ...(input.proxyProtocol !== undefined && input.proxyProtocol !== null && { "proxy_protocol": input.proxyProtocol }),
        ...(input.targetPort !== undefined && input.targetPort !== null && { "target_port": input.targetPort }),
    };
};
const serializeAws_restJson1LobbyGroupRuntimeDockerPorts = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroupRuntimeDockerPort(entry, context);
    });
};
const serializeAws_restJson1LobbyGroups = (input, context) => {
    return input.filter((e) => e != null).map(entry => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1LobbyGroup(entry, context);
    });
};
const serializeAws_restJson1MatchmakerCaptcha = (input, context) => {
    return {
        ...(input.hcaptcha !== undefined && input.hcaptcha !== null && { "hcaptcha": serializeAws_restJson1MatchmakerCaptchaHcaptcha(input.hcaptcha, context) }),
        ...(input.requestsBeforeReverify !== undefined && input.requestsBeforeReverify !== null && { "requests_before_reverify": input.requestsBeforeReverify }),
        ...(input.verificationTtl !== undefined && input.verificationTtl !== null && { "verification_ttl": input.verificationTtl }),
    };
};
const serializeAws_restJson1MatchmakerCaptchaHcaptcha = (input, context) => {
    return {
        ...(input.level !== undefined && input.level !== null && { "level": input.level }),
    };
};
const serializeAws_restJson1MatchmakerVersionConfig = (input, context) => {
    return {
        ...(input.captcha !== undefined && input.captcha !== null && { "captcha": serializeAws_restJson1MatchmakerCaptcha(input.captcha, context) }),
        ...(input.lobbyGroups !== undefined && input.lobbyGroups !== null && { "lobby_groups": serializeAws_restJson1LobbyGroups(input.lobbyGroups, context) }),
    };
};
const serializeAws_restJson1PortRange = (input, context) => {
    return {
        ...(input.max !== undefined && input.max !== null && { "max": input.max }),
        ...(input.min !== undefined && input.min !== null && { "min": input.min }),
    };
};
const deserializeAws_restJson1LobbyLogLines = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1LobbyLogTimestamps = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(entry));
    });
    return retVal;
};
const deserializeAws_restJson1AnalyticsLobbySummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1AnalyticsLobbySummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1AnalyticsLobbySummary = (output, context) => {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        isClosed: (0, smithy_client_1.expectBoolean)(output.is_closed),
        isIdle: (0, smithy_client_1.expectBoolean)(output.is_idle),
        isOutdated: (0, smithy_client_1.expectBoolean)(output.is_outdated),
        isReady: (0, smithy_client_1.expectBoolean)(output.is_ready),
        lobbyGroupId: (0, smithy_client_1.expectString)(output.lobby_group_id),
        lobbyGroupNameId: (0, smithy_client_1.expectString)(output.lobby_group_name_id),
        lobbyId: (0, smithy_client_1.expectString)(output.lobby_id),
        maxPlayersDirect: (0, smithy_client_1.expectInt32)(output.max_players_direct),
        maxPlayersNormal: (0, smithy_client_1.expectInt32)(output.max_players_normal),
        maxPlayersParty: (0, smithy_client_1.expectInt32)(output.max_players_party),
        regionId: (0, smithy_client_1.expectString)(output.region_id),
        registeredPlayerCount: (0, smithy_client_1.expectInt32)(output.registered_player_count),
        totalPlayerCount: (0, smithy_client_1.expectInt32)(output.total_player_count),
    };
};
const deserializeAws_restJson1FloatMetrics = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.limitedParseFloat32)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1IntMetrics = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectLong)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1LogsLobbyStatus = (output, context) => {
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
const deserializeAws_restJson1LogsLobbyStatusStopped = (output, context) => {
    return {
        exitCode: (0, smithy_client_1.expectInt32)(output.exit_code),
        failed: (0, smithy_client_1.expectBoolean)(output.failed),
        stopTs: (output.stop_ts !== undefined && output.stop_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.stop_ts)) : undefined,
    };
};
const deserializeAws_restJson1LogsLobbySummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LogsLobbySummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1LogsLobbySummary = (output, context) => {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        lobbyGroupNameId: (0, smithy_client_1.expectString)(output.lobby_group_name_id),
        lobbyId: (0, smithy_client_1.expectString)(output.lobby_id),
        namespaceId: (0, smithy_client_1.expectString)(output.namespace_id),
        readyTs: (output.ready_ts !== undefined && output.ready_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.ready_ts)) : undefined,
        regionId: (0, smithy_client_1.expectString)(output.region_id),
        startTs: (output.start_ts !== undefined && output.start_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.start_ts)) : undefined,
        status: (output.status !== undefined && output.status !== null) ? deserializeAws_restJson1LogsLobbyStatus((0, smithy_client_1.expectUnion)(output.status), context) : undefined,
    };
};
const deserializeAws_restJson1LogsPerfMark = (output, context) => {
    return {
        label: (0, smithy_client_1.expectString)(output.label),
        rayId: (0, smithy_client_1.expectString)(output.ray_id),
        reqId: (0, smithy_client_1.expectString)(output.req_id),
        ts: (output.ts !== undefined && output.ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.ts)) : undefined,
    };
};
const deserializeAws_restJson1LogsPerfMarks = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LogsPerfMark(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1LogsPerfSpan = (output, context) => {
    return {
        finishTs: (output.finish_ts !== undefined && output.finish_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.finish_ts)) : undefined,
        label: (0, smithy_client_1.expectString)(output.label),
        reqId: (0, smithy_client_1.expectString)(output.req_id),
        startTs: (output.start_ts !== undefined && output.start_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.start_ts)) : undefined,
    };
};
const deserializeAws_restJson1LogsPerfSpans = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LogsPerfSpan(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1SvcMetrics = (output, context) => {
    return {
        allocatedMemory: (0, smithy_client_1.expectLong)(output.allocated_memory),
        cpu: (output.cpu !== undefined && output.cpu !== null) ? deserializeAws_restJson1FloatMetrics(output.cpu, context) : undefined,
        job: (0, smithy_client_1.expectString)(output.job),
        memory: (output.memory !== undefined && output.memory !== null) ? deserializeAws_restJson1IntMetrics(output.memory, context) : undefined,
        memoryMax: (output.memory_max !== undefined && output.memory_max !== null) ? deserializeAws_restJson1IntMetrics(output.memory_max, context) : undefined,
    };
};
const deserializeAws_restJson1SvcPerf = (output, context) => {
    return {
        duration: (0, smithy_client_1.expectLong)(output.duration),
        marks: (output.marks !== undefined && output.marks !== null) ? deserializeAws_restJson1LogsPerfMarks(output.marks, context) : undefined,
        reqId: (0, smithy_client_1.expectString)(output.req_id),
        spans: (output.spans !== undefined && output.spans !== null) ? deserializeAws_restJson1LogsPerfSpans(output.spans, context) : undefined,
        svcName: (0, smithy_client_1.expectString)(output.svc_name),
        ts: (output.ts !== undefined && output.ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.ts)) : undefined,
    };
};
const deserializeAws_restJson1SvcPerfs = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1SvcPerf(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1Urls = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1AuthAgent = (output, context) => {
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
const deserializeAws_restJson1AuthAgentGameCloud = (output, context) => {
    return {
        gameId: (0, smithy_client_1.expectString)(output.game_id),
    };
};
const deserializeAws_restJson1AuthAgentIdentity = (output, context) => {
    return {
        identityId: (0, smithy_client_1.expectString)(output.identity_id),
    };
};
const deserializeAws_restJson1BuildSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1BuildSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1BuildSummary = (output, context) => {
    return {
        buildId: (0, smithy_client_1.expectString)(output.build_id),
        complete: (0, smithy_client_1.expectBoolean)(output.complete),
        contentLength: (0, smithy_client_1.expectLong)(output.content_length),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        uploadId: (0, smithy_client_1.expectString)(output.upload_id),
    };
};
const deserializeAws_restJson1CdnNamespaceAuthUser = (output, context) => {
    return {
        user: (0, smithy_client_1.expectString)(output.user),
    };
};
const deserializeAws_restJson1CdnNamespaceAuthUsers = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnNamespaceAuthUser(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CdnNamespaceConfig = (output, context) => {
    return {
        authType: (0, smithy_client_1.expectString)(output.auth_type),
        authUserList: (output.auth_user_list !== undefined && output.auth_user_list !== null) ? deserializeAws_restJson1CdnNamespaceAuthUsers(output.auth_user_list, context) : undefined,
        domains: (output.domains !== undefined && output.domains !== null) ? deserializeAws_restJson1CdnNamespaceDomains(output.domains, context) : undefined,
        enableDomainPublicAuth: (0, smithy_client_1.expectBoolean)(output.enable_domain_public_auth),
    };
};
const deserializeAws_restJson1CdnNamespaceDomain = (output, context) => {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        domain: (0, smithy_client_1.expectString)(output.domain),
        verificationErrors: (output.verification_errors !== undefined && output.verification_errors !== null) ? deserializeAws_restJson1CdnNamespaceDomainVerificationErrors(output.verification_errors, context) : undefined,
        verificationMethod: (output.verification_method !== undefined && output.verification_method !== null) ? deserializeAws_restJson1CdnNamespaceDomainVerificationMethod((0, smithy_client_1.expectUnion)(output.verification_method), context) : undefined,
        verificationStatus: (0, smithy_client_1.expectString)(output.verification_status),
    };
};
const deserializeAws_restJson1CdnNamespaceDomains = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnNamespaceDomain(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CdnNamespaceDomainVerificationErrors = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1CdnNamespaceDomainVerificationMethod = (output, context) => {
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
const deserializeAws_restJson1CdnNamespaceDomainVerificationMethodHttp = (output, context) => {
    return {
        cnameRecord: (0, smithy_client_1.expectString)(output.cname_record),
    };
};
const deserializeAws_restJson1CdnNamespaceDomainVerificationMethodInvalid = (output, context) => {
    return {};
};
const deserializeAws_restJson1CdnSiteSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnSiteSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CdnSiteSummary = (output, context) => {
    return {
        complete: (0, smithy_client_1.expectBoolean)(output.complete),
        contentLength: (0, smithy_client_1.expectLong)(output.content_length),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        siteId: (0, smithy_client_1.expectString)(output.site_id),
        uploadId: (0, smithy_client_1.expectString)(output.upload_id),
    };
};
const deserializeAws_restJson1CdnVersionConfig = (output, context) => {
    return {
        buildCommand: (0, smithy_client_1.expectString)(output.build_command),
        buildOutput: (0, smithy_client_1.expectString)(output.build_output),
        routes: (output.routes !== undefined && output.routes !== null) ? deserializeAws_restJson1CdnVersionRoutes(output.routes, context) : undefined,
        siteId: (0, smithy_client_1.expectString)(output.site_id),
    };
};
const deserializeAws_restJson1CdnVersionCustomHeadersMiddleware = (output, context) => {
    return {
        headers: (output.headers !== undefined && output.headers !== null) ? deserializeAws_restJson1CdnVersionHeaders(output.headers, context) : undefined,
    };
};
const deserializeAws_restJson1CdnVersionHeader = (output, context) => {
    return {
        name: (0, smithy_client_1.expectString)(output.name),
        value: (0, smithy_client_1.expectString)(output.value),
    };
};
const deserializeAws_restJson1CdnVersionHeaders = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnVersionHeader(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CdnVersionMiddleware = (output, context) => {
    return {
        kind: (output.kind !== undefined && output.kind !== null) ? deserializeAws_restJson1CdnVersionMiddlewareKind((0, smithy_client_1.expectUnion)(output.kind), context) : undefined,
    };
};
const deserializeAws_restJson1CdnVersionMiddlewareKind = (output, context) => {
    if (output.custom_headers !== undefined && output.custom_headers !== null) {
        return {
            customHeaders: deserializeAws_restJson1CdnVersionCustomHeadersMiddleware(output.custom_headers, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
const deserializeAws_restJson1CdnVersionMiddlewares = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnVersionMiddleware(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CdnVersionRoute = (output, context) => {
    return {
        glob: (0, smithy_client_1.expectString)(output.glob),
        middlewares: (output.middlewares !== undefined && output.middlewares !== null) ? deserializeAws_restJson1CdnVersionMiddlewares(output.middlewares, context) : undefined,
        priority: (0, smithy_client_1.expectInt32)(output.priority),
    };
};
const deserializeAws_restJson1CdnVersionRoutes = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CdnVersionRoute(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CloudNamespaceConfig = (output, context) => {
    return {
        cdn: (output.cdn !== undefined && output.cdn !== null) ? deserializeAws_restJson1CdnNamespaceConfig(output.cdn, context) : undefined,
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityNamespaceConfig(output.identity, context) : undefined,
        kv: (output.kv !== undefined && output.kv !== null) ? deserializeAws_restJson1KvNamespaceConfig(output.kv, context) : undefined,
        matchmaker: (output.matchmaker !== undefined && output.matchmaker !== null) ? deserializeAws_restJson1MatchmakerNamespaceConfig(output.matchmaker, context) : undefined,
    };
};
const deserializeAws_restJson1CloudVersionConfig = (output, context) => {
    return {
        cdn: (output.cdn !== undefined && output.cdn !== null) ? deserializeAws_restJson1CdnVersionConfig(output.cdn, context) : undefined,
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityVersionConfig(output.identity, context) : undefined,
        kv: (output.kv !== undefined && output.kv !== null) ? deserializeAws_restJson1KvVersionConfig(output.kv, context) : undefined,
        matchmaker: (output.matchmaker !== undefined && output.matchmaker !== null) ? deserializeAws_restJson1MatchmakerVersionConfig(output.matchmaker, context) : undefined,
    };
};
const deserializeAws_restJson1CustomAvatar = (output, context) => {
    return {
        uploadId: (0, smithy_client_1.expectString)(output.upload_id),
    };
};
const deserializeAws_restJson1CustomAvatars = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CustomAvatar(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CustomAvatarSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CustomAvatarSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1CustomAvatarSummary = (output, context) => {
    return {
        complete: (0, smithy_client_1.expectBoolean)(output.complete),
        contentLength: (0, smithy_client_1.expectLong)(output.content_length),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        uploadId: (0, smithy_client_1.expectString)(output.upload_id),
        url: (0, smithy_client_1.expectString)(output.url),
    };
};
const deserializeAws_restJson1CustomDisplayName = (output, context) => {
    return {
        displayName: (0, smithy_client_1.expectString)(output.display_name),
    };
};
const deserializeAws_restJson1CustomDisplayNames = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1CustomDisplayName(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GameBillingPlan = (output, context) => {
    return {
        amount: (0, smithy_client_1.expectLong)(output.amount),
        code: (0, smithy_client_1.expectString)(output.code),
        currency: (0, smithy_client_1.expectString)(output.currency),
        interval: (0, smithy_client_1.expectString)(output.interval),
        name: (0, smithy_client_1.expectString)(output.name),
    };
};
const deserializeAws_restJson1GameBillingPlans = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GameBillingPlan(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GameFull = (output, context) => {
    return {
        availableRegions: (output.available_regions !== undefined && output.available_regions !== null) ? deserializeAws_restJson1RegionSummaries(output.available_regions, context) : undefined,
        bannerUrl: (0, smithy_client_1.expectString)(output.banner_url),
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        developerGroupId: (0, smithy_client_1.expectString)(output.developer_group_id),
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        gameId: (0, smithy_client_1.expectString)(output.game_id),
        logoUrl: (0, smithy_client_1.expectString)(output.logo_url),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
        namespaces: (output.namespaces !== undefined && output.namespaces !== null) ? deserializeAws_restJson1NamespaceSummaries(output.namespaces, context) : undefined,
        totalPlayerCount: (0, smithy_client_1.expectInt32)(output.total_player_count),
        versions: (output.versions !== undefined && output.versions !== null) ? deserializeAws_restJson1VersionSummaries(output.versions, context) : undefined,
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
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        developerGroupId: (0, smithy_client_1.expectString)(output.developer_group_id),
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        gameId: (0, smithy_client_1.expectString)(output.game_id),
        logoUrl: (0, smithy_client_1.expectString)(output.logo_url),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
        totalPlayerCount: (0, smithy_client_1.expectInt32)(output.total_player_count),
    };
};
const deserializeAws_restJson1GroupBillingInvoice = (output, context) => {
    return {
        fileUrl: (0, smithy_client_1.expectString)(output.file_url),
        issuingTs: (output.issuing_ts !== undefined && output.issuing_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.issuing_ts)) : undefined,
    };
};
const deserializeAws_restJson1GroupBillingInvoices = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupBillingInvoice(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1IdentityNamespaceConfig = (output, context) => {
    return {};
};
const deserializeAws_restJson1IdentityVersionConfig = (output, context) => {
    return {
        customAvatars: (output.custom_avatars !== undefined && output.custom_avatars !== null) ? deserializeAws_restJson1CustomAvatars(output.custom_avatars, context) : undefined,
        customDisplayNames: (output.custom_display_names !== undefined && output.custom_display_names !== null) ? deserializeAws_restJson1CustomDisplayNames(output.custom_display_names, context) : undefined,
    };
};
const deserializeAws_restJson1IdleLobbiesConfig = (output, context) => {
    return {
        maxIdleLobbies: (0, smithy_client_1.expectInt32)(output.max_idle_lobbies),
        minIdleLobbies: (0, smithy_client_1.expectInt32)(output.min_idle_lobbies),
    };
};
const deserializeAws_restJson1KvNamespaceConfig = (output, context) => {
    return {};
};
const deserializeAws_restJson1KvVersionConfig = (output, context) => {
    return {};
};
const deserializeAws_restJson1LobbyGroup = (output, context) => {
    return {
        maxPlayersDirect: (0, smithy_client_1.expectInt32)(output.max_players_direct),
        maxPlayersNormal: (0, smithy_client_1.expectInt32)(output.max_players_normal),
        maxPlayersParty: (0, smithy_client_1.expectInt32)(output.max_players_party),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
        regions: (output.regions !== undefined && output.regions !== null) ? deserializeAws_restJson1LobbyGroupRegions(output.regions, context) : undefined,
        runtime: (output.runtime !== undefined && output.runtime !== null) ? deserializeAws_restJson1LobbyGroupRuntime((0, smithy_client_1.expectUnion)(output.runtime), context) : undefined,
    };
};
const deserializeAws_restJson1LobbyGroupRegion = (output, context) => {
    return {
        idleLobbies: (output.idle_lobbies !== undefined && output.idle_lobbies !== null) ? deserializeAws_restJson1IdleLobbiesConfig(output.idle_lobbies, context) : undefined,
        regionId: (0, smithy_client_1.expectString)(output.region_id),
        tierNameId: (0, smithy_client_1.expectString)(output.tier_name_id),
    };
};
const deserializeAws_restJson1LobbyGroupRegions = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroupRegion(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1LobbyGroupRuntime = (output, context) => {
    if (output.docker !== undefined && output.docker !== null) {
        return {
            docker: deserializeAws_restJson1LobbyGroupRuntimeDocker(output.docker, context)
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
const deserializeAws_restJson1LobbyGroupRuntimeDocker = (output, context) => {
    return {
        args: (output.args !== undefined && output.args !== null) ? deserializeAws_restJson1LobbyGroupRuntimeDockerArgs(output.args, context) : undefined,
        buildId: (0, smithy_client_1.expectString)(output.build_id),
        envVars: (output.env_vars !== undefined && output.env_vars !== null) ? deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVars(output.env_vars, context) : undefined,
        networkMode: (0, smithy_client_1.expectString)(output.network_mode),
        ports: (output.ports !== undefined && output.ports !== null) ? deserializeAws_restJson1LobbyGroupRuntimeDockerPorts(output.ports, context) : undefined,
    };
};
const deserializeAws_restJson1LobbyGroupRuntimeDockerArgs = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVar = (output, context) => {
    return {
        key: (0, smithy_client_1.expectString)(output.key),
        value: (0, smithy_client_1.expectString)(output.value),
    };
};
const deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVars = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroupRuntimeDockerEnvVar(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1LobbyGroupRuntimeDockerPort = (output, context) => {
    return {
        label: (0, smithy_client_1.expectString)(output.label),
        portRange: (output.port_range !== undefined && output.port_range !== null) ? deserializeAws_restJson1PortRange(output.port_range, context) : undefined,
        proxyProtocol: (0, smithy_client_1.expectString)(output.proxy_protocol),
        targetPort: (0, smithy_client_1.expectInt32)(output.target_port),
    };
};
const deserializeAws_restJson1LobbyGroupRuntimeDockerPorts = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroupRuntimeDockerPort(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1LobbyGroups = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LobbyGroup(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1MatchmakerCaptcha = (output, context) => {
    return {
        hcaptcha: (output.hcaptcha !== undefined && output.hcaptcha !== null) ? deserializeAws_restJson1MatchmakerCaptchaHcaptcha(output.hcaptcha, context) : undefined,
        requestsBeforeReverify: (0, smithy_client_1.expectInt32)(output.requests_before_reverify),
        verificationTtl: (0, smithy_client_1.expectLong)(output.verification_ttl),
    };
};
const deserializeAws_restJson1MatchmakerCaptchaHcaptcha = (output, context) => {
    return {
        level: (0, smithy_client_1.expectString)(output.level),
    };
};
const deserializeAws_restJson1MatchmakerNamespaceConfig = (output, context) => {
    return {
        lobbyCountMax: (0, smithy_client_1.expectInt32)(output.lobby_count_max),
        maxPlayersPerClient: (0, smithy_client_1.expectInt32)(output.max_players_per_client),
        maxPlayersPerClientHosting: (0, smithy_client_1.expectInt32)(output.max_players_per_client_hosting),
        maxPlayersPerClientProxy: (0, smithy_client_1.expectInt32)(output.max_players_per_client_proxy),
        maxPlayersPerClientTor: (0, smithy_client_1.expectInt32)(output.max_players_per_client_tor),
        maxPlayersPerClientVpn: (0, smithy_client_1.expectInt32)(output.max_players_per_client_vpn),
    };
};
const deserializeAws_restJson1MatchmakerVersionConfig = (output, context) => {
    return {
        captcha: (output.captcha !== undefined && output.captcha !== null) ? deserializeAws_restJson1MatchmakerCaptcha(output.captcha, context) : undefined,
        lobbyGroups: (output.lobby_groups !== undefined && output.lobby_groups !== null) ? deserializeAws_restJson1LobbyGroups(output.lobby_groups, context) : undefined,
    };
};
const deserializeAws_restJson1MultipleRegionTierMetrics = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RegionTierMetrics(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1NamespaceFull = (output, context) => {
    return {
        config: (output.config !== undefined && output.config !== null) ? deserializeAws_restJson1CloudNamespaceConfig(output.config, context) : undefined,
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
        namespaceId: (0, smithy_client_1.expectString)(output.namespace_id),
        versionId: (0, smithy_client_1.expectString)(output.version_id),
    };
};
const deserializeAws_restJson1NamespaceSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1NamespaceSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1NamespaceSummary = (output, context) => {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        nameId: (0, smithy_client_1.expectString)(output.name_id),
        namespaceId: (0, smithy_client_1.expectString)(output.namespace_id),
        versionId: (0, smithy_client_1.expectString)(output.version_id),
    };
};
const deserializeAws_restJson1PortRange = (output, context) => {
    return {
        max: (0, smithy_client_1.expectInt32)(output.max),
        min: (0, smithy_client_1.expectInt32)(output.min),
    };
};
const deserializeAws_restJson1RegionSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RegionSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1RegionSummary = (output, context) => {
    return {
        provider: (0, smithy_client_1.expectString)(output.provider),
        providerDisplayName: (0, smithy_client_1.expectString)(output.provider_display_name),
        regionDisplayName: (0, smithy_client_1.expectString)(output.region_display_name),
        regionId: (0, smithy_client_1.expectString)(output.region_id),
        regionNameId: (0, smithy_client_1.expectString)(output.region_name_id),
        universalRegion: (0, smithy_client_1.expectShort)(output.universal_region),
    };
};
const deserializeAws_restJson1RegionTier = (output, context) => {
    return {
        bandwidth: (0, smithy_client_1.expectLong)(output.bandwidth),
        cpu: (0, smithy_client_1.expectLong)(output.cpu),
        disk: (0, smithy_client_1.expectLong)(output.disk),
        memory: (0, smithy_client_1.expectLong)(output.memory),
        rivetCoresDenominator: (0, smithy_client_1.expectInt32)(output.rivet_cores_denominator),
        rivetCoresNumerator: (0, smithy_client_1.expectInt32)(output.rivet_cores_numerator),
        tierNameId: (0, smithy_client_1.expectString)(output.tier_name_id),
    };
};
const deserializeAws_restJson1RegionTierMetrics = (output, context) => {
    return {
        lobbyGroupNameId: (0, smithy_client_1.expectString)(output.lobby_group_name_id),
        namespaceId: (0, smithy_client_1.expectString)(output.namespace_id),
        regionId: (0, smithy_client_1.expectString)(output.region_id),
        tierNameId: (0, smithy_client_1.expectString)(output.tier_name_id),
        uptime: (0, smithy_client_1.expectLong)(output.uptime),
    };
};
const deserializeAws_restJson1RegionTiers = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1RegionTier(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1VersionFull = (output, context) => {
    return {
        config: (output.config !== undefined && output.config !== null) ? deserializeAws_restJson1CloudVersionConfig(output.config, context) : undefined,
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        versionId: (0, smithy_client_1.expectString)(output.version_id),
    };
};
const deserializeAws_restJson1VersionSummaries = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1VersionSummary(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1VersionSummary = (output, context) => {
    return {
        createTs: (output.create_ts !== undefined && output.create_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.create_ts)) : undefined,
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        versionId: (0, smithy_client_1.expectString)(output.version_id),
    };
};
const deserializeAws_restJson1ValidationError = (output, context) => {
    return {
        path: (output.path !== undefined && output.path !== null) ? deserializeAws_restJson1ValidationErrorPath(output.path, context) : undefined,
    };
};
const deserializeAws_restJson1ValidationErrorPath = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return (0, smithy_client_1.expectString)(entry);
    });
    return retVal;
};
const deserializeAws_restJson1ValidationErrors = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1ValidationError(entry, context);
    });
    return retVal;
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
const deserializeAws_restJson1GroupExternalLinks = (output, context) => {
    return {
        chat: (0, smithy_client_1.expectString)(output.chat),
        profile: (0, smithy_client_1.expectString)(output.profile),
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
const deserializeAws_restJson1UploadPresignedRequest = (output, context) => {
    return {
        path: (0, smithy_client_1.expectString)(output.path),
        url: (0, smithy_client_1.expectString)(output.url),
    };
};
const deserializeAws_restJson1UploadPresignedRequests = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1UploadPresignedRequest(entry, context);
    });
    return retVal;
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
