"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1ValidateGroupProfileCommand = exports.deserializeAws_restJson1UpdateGroupProfileCommand = exports.deserializeAws_restJson1UnbanGroupIdentityCommand = exports.deserializeAws_restJson1TransferGroupOwnershipCommand = exports.deserializeAws_restJson1SearchGroupsCommand = exports.deserializeAws_restJson1ResolveGroupJoinRequestCommand = exports.deserializeAws_restJson1PrepareGroupAvatarUploadCommand = exports.deserializeAws_restJson1ListSuggestedGroupsCommand = exports.deserializeAws_restJson1LeaveGroupCommand = exports.deserializeAws_restJson1KickGroupMemberCommand = exports.deserializeAws_restJson1GetGroupSummaryCommand = exports.deserializeAws_restJson1GetGroupProfileCommand = exports.deserializeAws_restJson1GetGroupMembersCommand = exports.deserializeAws_restJson1GetGroupJoinRequestsCommand = exports.deserializeAws_restJson1GetGroupInviteCommand = exports.deserializeAws_restJson1GetGroupBansCommand = exports.deserializeAws_restJson1CreateGroupJoinRequestCommand = exports.deserializeAws_restJson1CreateGroupInviteCommand = exports.deserializeAws_restJson1CreateGroupCommand = exports.deserializeAws_restJson1ConsumeGroupInviteCommand = exports.deserializeAws_restJson1CompleteGroupAvatarUploadCommand = exports.deserializeAws_restJson1BanGroupIdentityCommand = exports.serializeAws_restJson1ValidateGroupProfileCommand = exports.serializeAws_restJson1UpdateGroupProfileCommand = exports.serializeAws_restJson1UnbanGroupIdentityCommand = exports.serializeAws_restJson1TransferGroupOwnershipCommand = exports.serializeAws_restJson1SearchGroupsCommand = exports.serializeAws_restJson1ResolveGroupJoinRequestCommand = exports.serializeAws_restJson1PrepareGroupAvatarUploadCommand = exports.serializeAws_restJson1ListSuggestedGroupsCommand = exports.serializeAws_restJson1LeaveGroupCommand = exports.serializeAws_restJson1KickGroupMemberCommand = exports.serializeAws_restJson1GetGroupSummaryCommand = exports.serializeAws_restJson1GetGroupProfileCommand = exports.serializeAws_restJson1GetGroupMembersCommand = exports.serializeAws_restJson1GetGroupJoinRequestsCommand = exports.serializeAws_restJson1GetGroupInviteCommand = exports.serializeAws_restJson1GetGroupBansCommand = exports.serializeAws_restJson1CreateGroupJoinRequestCommand = exports.serializeAws_restJson1CreateGroupInviteCommand = exports.serializeAws_restJson1CreateGroupCommand = exports.serializeAws_restJson1ConsumeGroupInviteCommand = exports.serializeAws_restJson1CompleteGroupAvatarUploadCommand = exports.serializeAws_restJson1BanGroupIdentityCommand = void 0;
const GroupServiceServiceException_1 = require("../models/GroupServiceServiceException");
const models_0_1 = require("../models/models_0");
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1BanGroupIdentityCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/bans/{identity_id}";
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
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1BanGroupIdentityCommand = serializeAws_restJson1BanGroupIdentityCommand;
const serializeAws_restJson1CompleteGroupAvatarUploadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/avatar-upload/{upload_id}/complete";
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
exports.serializeAws_restJson1CompleteGroupAvatarUploadCommand = serializeAws_restJson1CompleteGroupAvatarUploadCommand;
const serializeAws_restJson1ConsumeGroupInviteCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/invites/{group_invite_code}/consume";
    if (input.groupInviteCode !== undefined) {
        const labelValue = input.groupInviteCode;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: groupInviteCode.');
        }
        resolvedPath = resolvedPath.replace("{group_invite_code}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: groupInviteCode.');
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
exports.serializeAws_restJson1ConsumeGroupInviteCommand = serializeAws_restJson1ConsumeGroupInviteCommand;
const serializeAws_restJson1CreateGroupCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups";
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
exports.serializeAws_restJson1CreateGroupCommand = serializeAws_restJson1CreateGroupCommand;
const serializeAws_restJson1CreateGroupInviteCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/invites";
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
    body = JSON.stringify({
        ...(input.ttl !== undefined && input.ttl !== null && { "ttl": input.ttl }),
        ...(input.useCount !== undefined && input.useCount !== null && { "use_count": input.useCount }),
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
exports.serializeAws_restJson1CreateGroupInviteCommand = serializeAws_restJson1CreateGroupInviteCommand;
const serializeAws_restJson1CreateGroupJoinRequestCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/join-request";
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
exports.serializeAws_restJson1CreateGroupJoinRequestCommand = serializeAws_restJson1CreateGroupJoinRequestCommand;
const serializeAws_restJson1GetGroupBansCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/bans";
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
        ...(input.anchor !== undefined && { "anchor": input.anchor }),
        ...(input.count !== undefined && { "count": input.count.toString() }),
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
exports.serializeAws_restJson1GetGroupBansCommand = serializeAws_restJson1GetGroupBansCommand;
const serializeAws_restJson1GetGroupInviteCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/invites/{group_invite_code}";
    if (input.groupInviteCode !== undefined) {
        const labelValue = input.groupInviteCode;
        if (labelValue.length <= 0) {
            throw new Error('Empty value provided for input HTTP label: groupInviteCode.');
        }
        resolvedPath = resolvedPath.replace("{group_invite_code}", (0, smithy_client_1.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error('No value provided for input HTTP label: groupInviteCode.');
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
exports.serializeAws_restJson1GetGroupInviteCommand = serializeAws_restJson1GetGroupInviteCommand;
const serializeAws_restJson1GetGroupJoinRequestsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/join-requests";
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
        ...(input.anchor !== undefined && { "anchor": input.anchor }),
        ...(input.count !== undefined && { "count": input.count.toString() }),
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
exports.serializeAws_restJson1GetGroupJoinRequestsCommand = serializeAws_restJson1GetGroupJoinRequestsCommand;
const serializeAws_restJson1GetGroupMembersCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/members";
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
        ...(input.anchor !== undefined && { "anchor": input.anchor }),
        ...(input.count !== undefined && { "count": input.count.toString() }),
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
exports.serializeAws_restJson1GetGroupMembersCommand = serializeAws_restJson1GetGroupMembersCommand;
const serializeAws_restJson1GetGroupProfileCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/profile";
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
exports.serializeAws_restJson1GetGroupProfileCommand = serializeAws_restJson1GetGroupProfileCommand;
const serializeAws_restJson1GetGroupSummaryCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/summary";
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
exports.serializeAws_restJson1GetGroupSummaryCommand = serializeAws_restJson1GetGroupSummaryCommand;
const serializeAws_restJson1KickGroupMemberCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/kick/{identity_id}";
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
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1KickGroupMemberCommand = serializeAws_restJson1KickGroupMemberCommand;
const serializeAws_restJson1LeaveGroupCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/leave";
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
exports.serializeAws_restJson1LeaveGroupCommand = serializeAws_restJson1LeaveGroupCommand;
const serializeAws_restJson1ListSuggestedGroupsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups";
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
exports.serializeAws_restJson1ListSuggestedGroupsCommand = serializeAws_restJson1ListSuggestedGroupsCommand;
const serializeAws_restJson1PrepareGroupAvatarUploadCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/avatar-upload/prepare";
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
exports.serializeAws_restJson1PrepareGroupAvatarUploadCommand = serializeAws_restJson1PrepareGroupAvatarUploadCommand;
const serializeAws_restJson1ResolveGroupJoinRequestCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/join-request/{identity_id}";
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
exports.serializeAws_restJson1ResolveGroupJoinRequestCommand = serializeAws_restJson1ResolveGroupJoinRequestCommand;
const serializeAws_restJson1SearchGroupsCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/search";
    const query = {
        ...(input.query !== undefined && { "query": input.query }),
        ...(input.anchor !== undefined && { "anchor": input.anchor }),
        ...(input.limit !== undefined && { "limit": input.limit.toString() }),
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
exports.serializeAws_restJson1SearchGroupsCommand = serializeAws_restJson1SearchGroupsCommand;
const serializeAws_restJson1TransferGroupOwnershipCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/transfer-owner";
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
    body = JSON.stringify({
        ...(input.newOwnerIdentityId !== undefined && input.newOwnerIdentityId !== null && { "new_owner_identity_id": input.newOwnerIdentityId }),
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
exports.serializeAws_restJson1TransferGroupOwnershipCommand = serializeAws_restJson1TransferGroupOwnershipCommand;
const serializeAws_restJson1UnbanGroupIdentityCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {};
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/bans/{identity_id}";
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
        method: "DELETE",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1UnbanGroupIdentityCommand = serializeAws_restJson1UnbanGroupIdentityCommand;
const serializeAws_restJson1UpdateGroupProfileCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/profile";
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
    body = JSON.stringify({
        ...(input.bio !== undefined && input.bio !== null && { "bio": input.bio }),
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.publicity !== undefined && input.publicity !== null && { "publicity": input.publicity }),
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
exports.serializeAws_restJson1UpdateGroupProfileCommand = serializeAws_restJson1UpdateGroupProfileCommand;
const serializeAws_restJson1ValidateGroupProfileCommand = async (input, context) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const headers = {
        'content-type': "application/json",
    };
    let resolvedPath = `${(basePath === null || basePath === void 0 ? void 0 : basePath.endsWith('/')) ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/profile/validate";
    let body;
    body = JSON.stringify({
        ...(input.bio !== undefined && input.bio !== null && { "bio": input.bio }),
        ...(input.displayName !== undefined && input.displayName !== null && { "display_name": input.displayName }),
        ...(input.publicity !== undefined && input.publicity !== null && { "publicity": input.publicity }),
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
exports.serializeAws_restJson1ValidateGroupProfileCommand = serializeAws_restJson1ValidateGroupProfileCommand;
const deserializeAws_restJson1BanGroupIdentityCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1BanGroupIdentityCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1BanGroupIdentityCommand = deserializeAws_restJson1BanGroupIdentityCommand;
const deserializeAws_restJson1BanGroupIdentityCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CompleteGroupAvatarUploadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CompleteGroupAvatarUploadCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CompleteGroupAvatarUploadCommand = deserializeAws_restJson1CompleteGroupAvatarUploadCommand;
const deserializeAws_restJson1CompleteGroupAvatarUploadCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ConsumeGroupInviteCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ConsumeGroupInviteCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        groupId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.group_id !== undefined && data.group_id !== null) {
        contents.groupId = (0, smithy_client_1.expectString)(data.group_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ConsumeGroupInviteCommand = deserializeAws_restJson1ConsumeGroupInviteCommand;
const deserializeAws_restJson1ConsumeGroupInviteCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGroupCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGroupCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        groupId: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.group_id !== undefined && data.group_id !== null) {
        contents.groupId = (0, smithy_client_1.expectString)(data.group_id);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGroupCommand = deserializeAws_restJson1CreateGroupCommand;
const deserializeAws_restJson1CreateGroupCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGroupInviteCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGroupInviteCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        code: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.code !== undefined && data.code !== null) {
        contents.code = (0, smithy_client_1.expectString)(data.code);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGroupInviteCommand = deserializeAws_restJson1CreateGroupInviteCommand;
const deserializeAws_restJson1CreateGroupInviteCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1CreateGroupJoinRequestCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1CreateGroupJoinRequestCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1CreateGroupJoinRequestCommand = deserializeAws_restJson1CreateGroupJoinRequestCommand;
const deserializeAws_restJson1CreateGroupJoinRequestCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupBansCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupBansCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        anchor: undefined,
        bannedIdentities: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.anchor !== undefined && data.anchor !== null) {
        contents.anchor = (0, smithy_client_1.expectString)(data.anchor);
    }
    if (data.banned_identities !== undefined && data.banned_identities !== null) {
        contents.bannedIdentities = deserializeAws_restJson1GroupBannedIdentities(data.banned_identities, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupBansCommand = deserializeAws_restJson1GetGroupBansCommand;
const deserializeAws_restJson1GetGroupBansCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupInviteCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupInviteCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        group: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.group !== undefined && data.group !== null) {
        contents.group = deserializeAws_restJson1GroupHandle(data.group, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupInviteCommand = deserializeAws_restJson1GetGroupInviteCommand;
const deserializeAws_restJson1GetGroupInviteCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupJoinRequestsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupJoinRequestsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        anchor: undefined,
        joinRequests: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.anchor !== undefined && data.anchor !== null) {
        contents.anchor = (0, smithy_client_1.expectString)(data.anchor);
    }
    if (data.join_requests !== undefined && data.join_requests !== null) {
        contents.joinRequests = deserializeAws_restJson1GroupJoinRequests(data.join_requests, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupJoinRequestsCommand = deserializeAws_restJson1GetGroupJoinRequestsCommand;
const deserializeAws_restJson1GetGroupJoinRequestsCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupMembersCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupMembersCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        anchor: undefined,
        members: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.anchor !== undefined && data.anchor !== null) {
        contents.anchor = (0, smithy_client_1.expectString)(data.anchor);
    }
    if (data.members !== undefined && data.members !== null) {
        contents.members = deserializeAws_restJson1GroupMembers(data.members, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupMembersCommand = deserializeAws_restJson1GetGroupMembersCommand;
const deserializeAws_restJson1GetGroupMembersCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupProfileCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupProfileCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        group: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.group !== undefined && data.group !== null) {
        contents.group = deserializeAws_restJson1GroupProfile(data.group, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupProfileCommand = deserializeAws_restJson1GetGroupProfileCommand;
const deserializeAws_restJson1GetGroupProfileCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1GetGroupSummaryCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetGroupSummaryCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        group: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.group !== undefined && data.group !== null) {
        contents.group = deserializeAws_restJson1GroupSummary(data.group, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetGroupSummaryCommand = deserializeAws_restJson1GetGroupSummaryCommand;
const deserializeAws_restJson1GetGroupSummaryCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1KickGroupMemberCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1KickGroupMemberCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1KickGroupMemberCommand = deserializeAws_restJson1KickGroupMemberCommand;
const deserializeAws_restJson1KickGroupMemberCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1LeaveGroupCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1LeaveGroupCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1LeaveGroupCommand = deserializeAws_restJson1LeaveGroupCommand;
const deserializeAws_restJson1LeaveGroupCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ListSuggestedGroupsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListSuggestedGroupsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        groups: undefined,
        watch: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.groups !== undefined && data.groups !== null) {
        contents.groups = deserializeAws_restJson1GroupSummaries(data.groups, context);
    }
    if (data.watch !== undefined && data.watch !== null) {
        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListSuggestedGroupsCommand = deserializeAws_restJson1ListSuggestedGroupsCommand;
const deserializeAws_restJson1ListSuggestedGroupsCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1PrepareGroupAvatarUploadCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PrepareGroupAvatarUploadCommandError(output, context);
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
exports.deserializeAws_restJson1PrepareGroupAvatarUploadCommand = deserializeAws_restJson1PrepareGroupAvatarUploadCommand;
const deserializeAws_restJson1PrepareGroupAvatarUploadCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ResolveGroupJoinRequestCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ResolveGroupJoinRequestCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ResolveGroupJoinRequestCommand = deserializeAws_restJson1ResolveGroupJoinRequestCommand;
const deserializeAws_restJson1ResolveGroupJoinRequestCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1SearchGroupsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1SearchGroupsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        anchor: undefined,
        groups: undefined,
    };
    const data = (0, smithy_client_1.expectNonNull)(((0, smithy_client_1.expectObject)(await parseBody(output.body, context))), "body");
    if (data.anchor !== undefined && data.anchor !== null) {
        contents.anchor = (0, smithy_client_1.expectString)(data.anchor);
    }
    if (data.groups !== undefined && data.groups !== null) {
        contents.groups = deserializeAws_restJson1GroupHandles(data.groups, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1SearchGroupsCommand = deserializeAws_restJson1SearchGroupsCommand;
const deserializeAws_restJson1SearchGroupsCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1TransferGroupOwnershipCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1TransferGroupOwnershipCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1TransferGroupOwnershipCommand = deserializeAws_restJson1TransferGroupOwnershipCommand;
const deserializeAws_restJson1TransferGroupOwnershipCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1UnbanGroupIdentityCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UnbanGroupIdentityCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UnbanGroupIdentityCommand = deserializeAws_restJson1UnbanGroupIdentityCommand;
const deserializeAws_restJson1UnbanGroupIdentityCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1UpdateGroupProfileCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1UpdateGroupProfileCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1UpdateGroupProfileCommand = deserializeAws_restJson1UpdateGroupProfileCommand;
const deserializeAws_restJson1UpdateGroupProfileCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
            });
            throw (0, smithy_client_1.decorateServiceException)(response, parsedBody);
    }
};
const deserializeAws_restJson1ValidateGroupProfileCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ValidateGroupProfileCommandError(output, context);
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
exports.deserializeAws_restJson1ValidateGroupProfileCommand = deserializeAws_restJson1ValidateGroupProfileCommand;
const deserializeAws_restJson1ValidateGroupProfileCommandError = async (output, context) => {
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
            response = new GroupServiceServiceException_1.GroupServiceServiceException({
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
const deserializeAws_restJson1GroupBannedIdentities = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupBannedIdentity(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GroupBannedIdentity = (output, context) => {
    return {
        banTs: (output.ban_ts !== undefined && output.ban_ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.ban_ts)) : undefined,
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
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
const deserializeAws_restJson1GroupHandles = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupHandle(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GroupJoinRequest = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
        ts: (output.ts !== undefined && output.ts !== null) ? (0, smithy_client_1.expectNonNull)((0, smithy_client_1.parseRfc3339DateTime)(output.ts)) : undefined,
    };
};
const deserializeAws_restJson1GroupJoinRequests = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupJoinRequest(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GroupMember = (output, context) => {
    return {
        identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context) : undefined,
    };
};
const deserializeAws_restJson1GroupMembers = (output, context) => {
    const retVal = (output || []).filter((e) => e != null).map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1GroupMember(entry, context);
    });
    return retVal;
};
const deserializeAws_restJson1GroupProfile = (output, context) => {
    return {
        avatarUrl: (0, smithy_client_1.expectString)(output.avatar_url),
        bio: (0, smithy_client_1.expectString)(output.bio),
        displayName: (0, smithy_client_1.expectString)(output.display_name),
        external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context) : undefined,
        groupId: (0, smithy_client_1.expectString)(output.group_id),
        isCurrentIdentityMember: (0, smithy_client_1.expectBoolean)(output.is_current_identity_member),
        isCurrentIdentityRequestingJoin: (0, smithy_client_1.expectBoolean)(output.is_current_identity_requesting_join),
        isDeveloper: (0, smithy_client_1.expectBoolean)(output.is_developer),
        joinRequests: (output.join_requests !== undefined && output.join_requests !== null) ? deserializeAws_restJson1GroupJoinRequests(output.join_requests, context) : undefined,
        memberCount: (0, smithy_client_1.expectInt32)(output.member_count),
        members: (output.members !== undefined && output.members !== null) ? deserializeAws_restJson1GroupMembers(output.members, context) : undefined,
        ownerIdentityId: (0, smithy_client_1.expectString)(output.owner_identity_id),
        publicity: (0, smithy_client_1.expectString)(output.publicity),
        threadId: (0, smithy_client_1.expectString)(output.thread_id),
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
const deserializeAws_restJson1UploadPresignedRequest = (output, context) => {
    return {
        path: (0, smithy_client_1.expectString)(output.path),
        url: (0, smithy_client_1.expectString)(output.url),
    };
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
