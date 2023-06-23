// smithy-typescript generated code
import {
  BanGroupIdentityCommandInput,
  BanGroupIdentityCommandOutput,
} from "../commands/BanGroupIdentityCommand";
import {
  CompleteGroupAvatarUploadCommandInput,
  CompleteGroupAvatarUploadCommandOutput,
} from "../commands/CompleteGroupAvatarUploadCommand";
import {
  ConsumeGroupInviteCommandInput,
  ConsumeGroupInviteCommandOutput,
} from "../commands/ConsumeGroupInviteCommand";
import {
  CreateGroupCommandInput,
  CreateGroupCommandOutput,
} from "../commands/CreateGroupCommand";
import {
  CreateGroupInviteCommandInput,
  CreateGroupInviteCommandOutput,
} from "../commands/CreateGroupInviteCommand";
import {
  CreateGroupJoinRequestCommandInput,
  CreateGroupJoinRequestCommandOutput,
} from "../commands/CreateGroupJoinRequestCommand";
import {
  GetGroupBansCommandInput,
  GetGroupBansCommandOutput,
} from "../commands/GetGroupBansCommand";
import {
  GetGroupInviteCommandInput,
  GetGroupInviteCommandOutput,
} from "../commands/GetGroupInviteCommand";
import {
  GetGroupJoinRequestsCommandInput,
  GetGroupJoinRequestsCommandOutput,
} from "../commands/GetGroupJoinRequestsCommand";
import {
  GetGroupMembersCommandInput,
  GetGroupMembersCommandOutput,
} from "../commands/GetGroupMembersCommand";
import {
  GetGroupProfileCommandInput,
  GetGroupProfileCommandOutput,
} from "../commands/GetGroupProfileCommand";
import {
  GetGroupSummaryCommandInput,
  GetGroupSummaryCommandOutput,
} from "../commands/GetGroupSummaryCommand";
import {
  KickGroupMemberCommandInput,
  KickGroupMemberCommandOutput,
} from "../commands/KickGroupMemberCommand";
import {
  LeaveGroupCommandInput,
  LeaveGroupCommandOutput,
} from "../commands/LeaveGroupCommand";
import {
  ListSuggestedGroupsCommandInput,
  ListSuggestedGroupsCommandOutput,
} from "../commands/ListSuggestedGroupsCommand";
import {
  PrepareGroupAvatarUploadCommandInput,
  PrepareGroupAvatarUploadCommandOutput,
} from "../commands/PrepareGroupAvatarUploadCommand";
import {
  ResolveGroupJoinRequestCommandInput,
  ResolveGroupJoinRequestCommandOutput,
} from "../commands/ResolveGroupJoinRequestCommand";
import {
  SearchGroupsCommandInput,
  SearchGroupsCommandOutput,
} from "../commands/SearchGroupsCommand";
import {
  TransferGroupOwnershipCommandInput,
  TransferGroupOwnershipCommandOutput,
} from "../commands/TransferGroupOwnershipCommand";
import {
  UnbanGroupIdentityCommandInput,
  UnbanGroupIdentityCommandOutput,
} from "../commands/UnbanGroupIdentityCommand";
import {
  UpdateGroupProfileCommandInput,
  UpdateGroupProfileCommandOutput,
} from "../commands/UpdateGroupProfileCommand";
import {
  ValidateGroupProfileCommandInput,
  ValidateGroupProfileCommandOutput,
} from "../commands/ValidateGroupProfileCommand";
import { GroupServiceServiceException as __BaseException } from "../models/GroupServiceServiceException";
import {
  BadRequestError,
  ForbiddenError,
  GameHandle,
  GroupBannedIdentity,
  GroupExternalLinks,
  GroupHandle,
  GroupJoinRequest,
  GroupMember,
  GroupProfile,
  GroupSummary,
  IdentityExternalLinks,
  IdentityGameActivity,
  IdentityHandle,
  IdentityPresence,
  InternalError,
  NotFoundError,
  PartyActivity,
  PartyActivityIdle,
  PartyActivityMatchmakerFindingLobby,
  PartyActivityMatchmakerLobby,
  PartyExternalLinks,
  PartyHandle,
  PartyMatchmakerLobby,
  RateLimitError,
  UnauthorizedError,
  UploadPresignedRequest,
  ValidationError,
  WatchResponse,
} from "../models/models_0";
import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@aws-sdk/protocol-http";
import {
  decorateServiceException as __decorateServiceException,
  expectBoolean as __expectBoolean,
  expectInt32 as __expectInt32,
  expectNonNull as __expectNonNull,
  expectObject as __expectObject,
  expectString as __expectString,
  expectUnion as __expectUnion,
  extendedEncodeURIComponent as __extendedEncodeURIComponent,
  parseRfc3339DateTime as __parseRfc3339DateTime,
} from "@aws-sdk/smithy-client";
import {
  DocumentType as __DocumentType,
  Endpoint as __Endpoint,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export const serializeAws_restJson1BanGroupIdentityCommand = async(
  input: BanGroupIdentityCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/bans/{identity_id}";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  if (input.identityId !== undefined) {
    const labelValue: string = input.identityId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: identityId.');
    }
    resolvedPath = resolvedPath.replace("{identity_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: identityId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1CompleteGroupAvatarUploadCommand = async(
  input: CompleteGroupAvatarUploadCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/avatar-upload/{upload_id}/complete";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  if (input.uploadId !== undefined) {
    const labelValue: string = input.uploadId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: uploadId.');
    }
    resolvedPath = resolvedPath.replace("{upload_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: uploadId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1ConsumeGroupInviteCommand = async(
  input: ConsumeGroupInviteCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/invites/{group_invite_code}/consume";
  if (input.groupInviteCode !== undefined) {
    const labelValue: string = input.groupInviteCode;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupInviteCode.');
    }
    resolvedPath = resolvedPath.replace("{group_invite_code}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupInviteCode.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1CreateGroupCommand = async(
  input: CreateGroupCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups";
  let body: any;
  body = JSON.stringify({
    ...(input.displayName !== undefined && input.displayName !== null &&{ "display_name": input.displayName }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1CreateGroupInviteCommand = async(
  input: CreateGroupInviteCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/invites";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  let body: any;
  body = JSON.stringify({
    ...(input.ttl !== undefined && input.ttl !== null &&{ "ttl": input.ttl }),
    ...(input.useCount !== undefined && input.useCount !== null &&{ "use_count": input.useCount }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1CreateGroupJoinRequestCommand = async(
  input: CreateGroupJoinRequestCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/join-request";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1GetGroupBansCommand = async(
  input: GetGroupBansCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/bans";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  const query: any = {
    ...(input.anchor !== undefined && { "anchor": input.anchor }),
    ...(input.count !== undefined && { "count": input.count.toString() }),
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const serializeAws_restJson1GetGroupInviteCommand = async(
  input: GetGroupInviteCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/invites/{group_invite_code}";
  if (input.groupInviteCode !== undefined) {
    const labelValue: string = input.groupInviteCode;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupInviteCode.');
    }
    resolvedPath = resolvedPath.replace("{group_invite_code}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupInviteCode.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1GetGroupJoinRequestsCommand = async(
  input: GetGroupJoinRequestsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/join-requests";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  const query: any = {
    ...(input.anchor !== undefined && { "anchor": input.anchor }),
    ...(input.count !== undefined && { "count": input.count.toString() }),
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const serializeAws_restJson1GetGroupMembersCommand = async(
  input: GetGroupMembersCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/members";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  const query: any = {
    ...(input.anchor !== undefined && { "anchor": input.anchor }),
    ...(input.count !== undefined && { "count": input.count.toString() }),
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const serializeAws_restJson1GetGroupProfileCommand = async(
  input: GetGroupProfileCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/profile";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  const query: any = {
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const serializeAws_restJson1GetGroupSummaryCommand = async(
  input: GetGroupSummaryCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/summary";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1KickGroupMemberCommand = async(
  input: KickGroupMemberCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/kick/{identity_id}";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  if (input.identityId !== undefined) {
    const labelValue: string = input.identityId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: identityId.');
    }
    resolvedPath = resolvedPath.replace("{identity_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: identityId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1LeaveGroupCommand = async(
  input: LeaveGroupCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/leave";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1ListSuggestedGroupsCommand = async(
  input: ListSuggestedGroupsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups";
  const query: any = {
    ...(input.watchIndex !== undefined && { "watch_index": input.watchIndex }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const serializeAws_restJson1PrepareGroupAvatarUploadCommand = async(
  input: PrepareGroupAvatarUploadCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/avatar-upload/prepare";
  let body: any;
  body = JSON.stringify({
    ...(input.contentLength !== undefined && input.contentLength !== null &&{ "content_length": input.contentLength }),
    ...(input.mime !== undefined && input.mime !== null &&{ "mime": input.mime }),
    ...(input.path !== undefined && input.path !== null &&{ "path": input.path }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1ResolveGroupJoinRequestCommand = async(
  input: ResolveGroupJoinRequestCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/join-request/{identity_id}";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  if (input.identityId !== undefined) {
    const labelValue: string = input.identityId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: identityId.');
    }
    resolvedPath = resolvedPath.replace("{identity_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: identityId.');
  }
  let body: any;
  body = JSON.stringify({
    ...(input.resolution !== undefined && input.resolution !== null &&{ "resolution": input.resolution }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1SearchGroupsCommand = async(
  input: SearchGroupsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/search";
  const query: any = {
    ...(input.query !== undefined && { "query": input.query }),
    ...(input.anchor !== undefined && { "anchor": input.anchor }),
    ...(input.limit !== undefined && { "limit": input.limit.toString() }),
  };
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
}

export const serializeAws_restJson1TransferGroupOwnershipCommand = async(
  input: TransferGroupOwnershipCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/transfer-owner";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  let body: any;
  body = JSON.stringify({
    ...(input.newOwnerIdentityId !== undefined && input.newOwnerIdentityId !== null &&{ "new_owner_identity_id": input.newOwnerIdentityId }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1UnbanGroupIdentityCommand = async(
  input: UnbanGroupIdentityCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/bans/{identity_id}";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  if (input.identityId !== undefined) {
    const labelValue: string = input.identityId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: identityId.');
    }
    resolvedPath = resolvedPath.replace("{identity_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: identityId.');
  }
  let body: any;
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "DELETE",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1UpdateGroupProfileCommand = async(
  input: UpdateGroupProfileCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/{group_id}/profile";
  if (input.groupId !== undefined) {
    const labelValue: string = input.groupId;
    if (labelValue.length <= 0) {
      throw new Error('Empty value provided for input HTTP label: groupId.');
    }
    resolvedPath = resolvedPath.replace("{group_id}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error('No value provided for input HTTP label: groupId.');
  }
  let body: any;
  body = JSON.stringify({
    ...(input.bio !== undefined && input.bio !== null &&{ "bio": input.bio }),
    ...(input.displayName !== undefined && input.displayName !== null &&{ "display_name": input.displayName }),
    ...(input.publicity !== undefined && input.publicity !== null &&{ "publicity": input.publicity }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const serializeAws_restJson1ValidateGroupProfileCommand = async(
  input: ValidateGroupProfileCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
  const headers: any = {
    'content-type': "application/json",
  };
  let resolvedPath = `${basePath?.endsWith('/') ? basePath.slice(0, -1) : (basePath || '')}` + "/groups/profile/validate";
  let body: any;
  body = JSON.stringify({
    ...(input.bio !== undefined && input.bio !== null &&{ "bio": input.bio }),
    ...(input.displayName !== undefined && input.displayName !== null &&{ "display_name": input.displayName }),
    ...(input.publicity !== undefined && input.publicity !== null &&{ "publicity": input.publicity }),
  });
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
}

export const deserializeAws_restJson1BanGroupIdentityCommand = async(
  output: __HttpResponse,
  context: __SerdeContext
): Promise<BanGroupIdentityCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1BanGroupIdentityCommandError(output, context);
  }
  const contents: BanGroupIdentityCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  await collectBody(output.body, context);
  return Promise.resolve(contents);
}

const deserializeAws_restJson1BanGroupIdentityCommandError = async(
  output: __HttpResponse,
  context: __SerdeContext,
): Promise<BanGroupIdentityCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context)
  };
  let response: __BaseException;
  let errorCode: string = "UnknownError";
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
      response = new __BaseException({
        name: parsedBody.code || parsedBody.Code || errorCode,
        $fault: "client",
        $metadata: deserializeMetadata(output)
      });
      throw __decorateServiceException(response, parsedBody);
    }
  }

  export const deserializeAws_restJson1CompleteGroupAvatarUploadCommand = async(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CompleteGroupAvatarUploadCommandOutput> => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
      return deserializeAws_restJson1CompleteGroupAvatarUploadCommandError(output, context);
    }
    const contents: CompleteGroupAvatarUploadCommandOutput = {
      $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
  }

  const deserializeAws_restJson1CompleteGroupAvatarUploadCommandError = async(
    output: __HttpResponse,
    context: __SerdeContext,
  ): Promise<CompleteGroupAvatarUploadCommandOutput> => {
    const parsedOutput: any = {
      ...output,
      body: await parseBody(output.body, context)
    };
    let response: __BaseException;
    let errorCode: string = "UnknownError";
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
        response = new __BaseException({
          name: parsedBody.code || parsedBody.Code || errorCode,
          $fault: "client",
          $metadata: deserializeMetadata(output)
        });
        throw __decorateServiceException(response, parsedBody);
      }
    }

    export const deserializeAws_restJson1ConsumeGroupInviteCommand = async(
      output: __HttpResponse,
      context: __SerdeContext
    ): Promise<ConsumeGroupInviteCommandOutput> => {
      if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ConsumeGroupInviteCommandError(output, context);
      }
      const contents: ConsumeGroupInviteCommandOutput = {
        $metadata: deserializeMetadata(output),
        groupId: undefined,
      };
      const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
      if (data.group_id !== undefined && data.group_id !== null) {
        contents.groupId = __expectString(data.group_id);
      }
      return Promise.resolve(contents);
    }

    const deserializeAws_restJson1ConsumeGroupInviteCommandError = async(
      output: __HttpResponse,
      context: __SerdeContext,
    ): Promise<ConsumeGroupInviteCommandOutput> => {
      const parsedOutput: any = {
        ...output,
        body: await parseBody(output.body, context)
      };
      let response: __BaseException;
      let errorCode: string = "UnknownError";
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
          response = new __BaseException({
            name: parsedBody.code || parsedBody.Code || errorCode,
            $fault: "client",
            $metadata: deserializeMetadata(output)
          });
          throw __decorateServiceException(response, parsedBody);
        }
      }

      export const deserializeAws_restJson1CreateGroupCommand = async(
        output: __HttpResponse,
        context: __SerdeContext
      ): Promise<CreateGroupCommandOutput> => {
        if (output.statusCode !== 200 && output.statusCode >= 300) {
          return deserializeAws_restJson1CreateGroupCommandError(output, context);
        }
        const contents: CreateGroupCommandOutput = {
          $metadata: deserializeMetadata(output),
          groupId: undefined,
        };
        const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
        if (data.group_id !== undefined && data.group_id !== null) {
          contents.groupId = __expectString(data.group_id);
        }
        return Promise.resolve(contents);
      }

      const deserializeAws_restJson1CreateGroupCommandError = async(
        output: __HttpResponse,
        context: __SerdeContext,
      ): Promise<CreateGroupCommandOutput> => {
        const parsedOutput: any = {
          ...output,
          body: await parseBody(output.body, context)
        };
        let response: __BaseException;
        let errorCode: string = "UnknownError";
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
            response = new __BaseException({
              name: parsedBody.code || parsedBody.Code || errorCode,
              $fault: "client",
              $metadata: deserializeMetadata(output)
            });
            throw __decorateServiceException(response, parsedBody);
          }
        }

        export const deserializeAws_restJson1CreateGroupInviteCommand = async(
          output: __HttpResponse,
          context: __SerdeContext
        ): Promise<CreateGroupInviteCommandOutput> => {
          if (output.statusCode !== 200 && output.statusCode >= 300) {
            return deserializeAws_restJson1CreateGroupInviteCommandError(output, context);
          }
          const contents: CreateGroupInviteCommandOutput = {
            $metadata: deserializeMetadata(output),
            code: undefined,
          };
          const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
          if (data.code !== undefined && data.code !== null) {
            contents.code = __expectString(data.code);
          }
          return Promise.resolve(contents);
        }

        const deserializeAws_restJson1CreateGroupInviteCommandError = async(
          output: __HttpResponse,
          context: __SerdeContext,
        ): Promise<CreateGroupInviteCommandOutput> => {
          const parsedOutput: any = {
            ...output,
            body: await parseBody(output.body, context)
          };
          let response: __BaseException;
          let errorCode: string = "UnknownError";
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
              response = new __BaseException({
                name: parsedBody.code || parsedBody.Code || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output)
              });
              throw __decorateServiceException(response, parsedBody);
            }
          }

          export const deserializeAws_restJson1CreateGroupJoinRequestCommand = async(
            output: __HttpResponse,
            context: __SerdeContext
          ): Promise<CreateGroupJoinRequestCommandOutput> => {
            if (output.statusCode !== 200 && output.statusCode >= 300) {
              return deserializeAws_restJson1CreateGroupJoinRequestCommandError(output, context);
            }
            const contents: CreateGroupJoinRequestCommandOutput = {
              $metadata: deserializeMetadata(output),
            };
            await collectBody(output.body, context);
            return Promise.resolve(contents);
          }

          const deserializeAws_restJson1CreateGroupJoinRequestCommandError = async(
            output: __HttpResponse,
            context: __SerdeContext,
          ): Promise<CreateGroupJoinRequestCommandOutput> => {
            const parsedOutput: any = {
              ...output,
              body: await parseBody(output.body, context)
            };
            let response: __BaseException;
            let errorCode: string = "UnknownError";
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
                response = new __BaseException({
                  name: parsedBody.code || parsedBody.Code || errorCode,
                  $fault: "client",
                  $metadata: deserializeMetadata(output)
                });
                throw __decorateServiceException(response, parsedBody);
              }
            }

            export const deserializeAws_restJson1GetGroupBansCommand = async(
              output: __HttpResponse,
              context: __SerdeContext
            ): Promise<GetGroupBansCommandOutput> => {
              if (output.statusCode !== 200 && output.statusCode >= 300) {
                return deserializeAws_restJson1GetGroupBansCommandError(output, context);
              }
              const contents: GetGroupBansCommandOutput = {
                $metadata: deserializeMetadata(output),
                anchor: undefined,
                bannedIdentities: undefined,
                watch: undefined,
              };
              const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
              if (data.anchor !== undefined && data.anchor !== null) {
                contents.anchor = __expectString(data.anchor);
              }
              if (data.banned_identities !== undefined && data.banned_identities !== null) {
                contents.bannedIdentities = deserializeAws_restJson1GroupBannedIdentities(data.banned_identities, context);
              }
              if (data.watch !== undefined && data.watch !== null) {
                contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
              }
              return Promise.resolve(contents);
            }

            const deserializeAws_restJson1GetGroupBansCommandError = async(
              output: __HttpResponse,
              context: __SerdeContext,
            ): Promise<GetGroupBansCommandOutput> => {
              const parsedOutput: any = {
                ...output,
                body: await parseBody(output.body, context)
              };
              let response: __BaseException;
              let errorCode: string = "UnknownError";
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
                  response = new __BaseException({
                    name: parsedBody.code || parsedBody.Code || errorCode,
                    $fault: "client",
                    $metadata: deserializeMetadata(output)
                  });
                  throw __decorateServiceException(response, parsedBody);
                }
              }

              export const deserializeAws_restJson1GetGroupInviteCommand = async(
                output: __HttpResponse,
                context: __SerdeContext
              ): Promise<GetGroupInviteCommandOutput> => {
                if (output.statusCode !== 200 && output.statusCode >= 300) {
                  return deserializeAws_restJson1GetGroupInviteCommandError(output, context);
                }
                const contents: GetGroupInviteCommandOutput = {
                  $metadata: deserializeMetadata(output),
                  group: undefined,
                };
                const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                if (data.group !== undefined && data.group !== null) {
                  contents.group = deserializeAws_restJson1GroupHandle(data.group, context);
                }
                return Promise.resolve(contents);
              }

              const deserializeAws_restJson1GetGroupInviteCommandError = async(
                output: __HttpResponse,
                context: __SerdeContext,
              ): Promise<GetGroupInviteCommandOutput> => {
                const parsedOutput: any = {
                  ...output,
                  body: await parseBody(output.body, context)
                };
                let response: __BaseException;
                let errorCode: string = "UnknownError";
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
                    response = new __BaseException({
                      name: parsedBody.code || parsedBody.Code || errorCode,
                      $fault: "client",
                      $metadata: deserializeMetadata(output)
                    });
                    throw __decorateServiceException(response, parsedBody);
                  }
                }

                export const deserializeAws_restJson1GetGroupJoinRequestsCommand = async(
                  output: __HttpResponse,
                  context: __SerdeContext
                ): Promise<GetGroupJoinRequestsCommandOutput> => {
                  if (output.statusCode !== 200 && output.statusCode >= 300) {
                    return deserializeAws_restJson1GetGroupJoinRequestsCommandError(output, context);
                  }
                  const contents: GetGroupJoinRequestsCommandOutput = {
                    $metadata: deserializeMetadata(output),
                    anchor: undefined,
                    joinRequests: undefined,
                    watch: undefined,
                  };
                  const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                  if (data.anchor !== undefined && data.anchor !== null) {
                    contents.anchor = __expectString(data.anchor);
                  }
                  if (data.join_requests !== undefined && data.join_requests !== null) {
                    contents.joinRequests = deserializeAws_restJson1GroupJoinRequests(data.join_requests, context);
                  }
                  if (data.watch !== undefined && data.watch !== null) {
                    contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                  }
                  return Promise.resolve(contents);
                }

                const deserializeAws_restJson1GetGroupJoinRequestsCommandError = async(
                  output: __HttpResponse,
                  context: __SerdeContext,
                ): Promise<GetGroupJoinRequestsCommandOutput> => {
                  const parsedOutput: any = {
                    ...output,
                    body: await parseBody(output.body, context)
                  };
                  let response: __BaseException;
                  let errorCode: string = "UnknownError";
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
                      response = new __BaseException({
                        name: parsedBody.code || parsedBody.Code || errorCode,
                        $fault: "client",
                        $metadata: deserializeMetadata(output)
                      });
                      throw __decorateServiceException(response, parsedBody);
                    }
                  }

                  export const deserializeAws_restJson1GetGroupMembersCommand = async(
                    output: __HttpResponse,
                    context: __SerdeContext
                  ): Promise<GetGroupMembersCommandOutput> => {
                    if (output.statusCode !== 200 && output.statusCode >= 300) {
                      return deserializeAws_restJson1GetGroupMembersCommandError(output, context);
                    }
                    const contents: GetGroupMembersCommandOutput = {
                      $metadata: deserializeMetadata(output),
                      anchor: undefined,
                      members: undefined,
                      watch: undefined,
                    };
                    const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                    if (data.anchor !== undefined && data.anchor !== null) {
                      contents.anchor = __expectString(data.anchor);
                    }
                    if (data.members !== undefined && data.members !== null) {
                      contents.members = deserializeAws_restJson1GroupMembers(data.members, context);
                    }
                    if (data.watch !== undefined && data.watch !== null) {
                      contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                    }
                    return Promise.resolve(contents);
                  }

                  const deserializeAws_restJson1GetGroupMembersCommandError = async(
                    output: __HttpResponse,
                    context: __SerdeContext,
                  ): Promise<GetGroupMembersCommandOutput> => {
                    const parsedOutput: any = {
                      ...output,
                      body: await parseBody(output.body, context)
                    };
                    let response: __BaseException;
                    let errorCode: string = "UnknownError";
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
                        response = new __BaseException({
                          name: parsedBody.code || parsedBody.Code || errorCode,
                          $fault: "client",
                          $metadata: deserializeMetadata(output)
                        });
                        throw __decorateServiceException(response, parsedBody);
                      }
                    }

                    export const deserializeAws_restJson1GetGroupProfileCommand = async(
                      output: __HttpResponse,
                      context: __SerdeContext
                    ): Promise<GetGroupProfileCommandOutput> => {
                      if (output.statusCode !== 200 && output.statusCode >= 300) {
                        return deserializeAws_restJson1GetGroupProfileCommandError(output, context);
                      }
                      const contents: GetGroupProfileCommandOutput = {
                        $metadata: deserializeMetadata(output),
                        group: undefined,
                        watch: undefined,
                      };
                      const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                      if (data.group !== undefined && data.group !== null) {
                        contents.group = deserializeAws_restJson1GroupProfile(data.group, context);
                      }
                      if (data.watch !== undefined && data.watch !== null) {
                        contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                      }
                      return Promise.resolve(contents);
                    }

                    const deserializeAws_restJson1GetGroupProfileCommandError = async(
                      output: __HttpResponse,
                      context: __SerdeContext,
                    ): Promise<GetGroupProfileCommandOutput> => {
                      const parsedOutput: any = {
                        ...output,
                        body: await parseBody(output.body, context)
                      };
                      let response: __BaseException;
                      let errorCode: string = "UnknownError";
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
                          response = new __BaseException({
                            name: parsedBody.code || parsedBody.Code || errorCode,
                            $fault: "client",
                            $metadata: deserializeMetadata(output)
                          });
                          throw __decorateServiceException(response, parsedBody);
                        }
                      }

                      export const deserializeAws_restJson1GetGroupSummaryCommand = async(
                        output: __HttpResponse,
                        context: __SerdeContext
                      ): Promise<GetGroupSummaryCommandOutput> => {
                        if (output.statusCode !== 200 && output.statusCode >= 300) {
                          return deserializeAws_restJson1GetGroupSummaryCommandError(output, context);
                        }
                        const contents: GetGroupSummaryCommandOutput = {
                          $metadata: deserializeMetadata(output),
                          group: undefined,
                        };
                        const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                        if (data.group !== undefined && data.group !== null) {
                          contents.group = deserializeAws_restJson1GroupSummary(data.group, context);
                        }
                        return Promise.resolve(contents);
                      }

                      const deserializeAws_restJson1GetGroupSummaryCommandError = async(
                        output: __HttpResponse,
                        context: __SerdeContext,
                      ): Promise<GetGroupSummaryCommandOutput> => {
                        const parsedOutput: any = {
                          ...output,
                          body: await parseBody(output.body, context)
                        };
                        let response: __BaseException;
                        let errorCode: string = "UnknownError";
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
                            response = new __BaseException({
                              name: parsedBody.code || parsedBody.Code || errorCode,
                              $fault: "client",
                              $metadata: deserializeMetadata(output)
                            });
                            throw __decorateServiceException(response, parsedBody);
                          }
                        }

                        export const deserializeAws_restJson1KickGroupMemberCommand = async(
                          output: __HttpResponse,
                          context: __SerdeContext
                        ): Promise<KickGroupMemberCommandOutput> => {
                          if (output.statusCode !== 200 && output.statusCode >= 300) {
                            return deserializeAws_restJson1KickGroupMemberCommandError(output, context);
                          }
                          const contents: KickGroupMemberCommandOutput = {
                            $metadata: deserializeMetadata(output),
                          };
                          await collectBody(output.body, context);
                          return Promise.resolve(contents);
                        }

                        const deserializeAws_restJson1KickGroupMemberCommandError = async(
                          output: __HttpResponse,
                          context: __SerdeContext,
                        ): Promise<KickGroupMemberCommandOutput> => {
                          const parsedOutput: any = {
                            ...output,
                            body: await parseBody(output.body, context)
                          };
                          let response: __BaseException;
                          let errorCode: string = "UnknownError";
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
                              response = new __BaseException({
                                name: parsedBody.code || parsedBody.Code || errorCode,
                                $fault: "client",
                                $metadata: deserializeMetadata(output)
                              });
                              throw __decorateServiceException(response, parsedBody);
                            }
                          }

                          export const deserializeAws_restJson1LeaveGroupCommand = async(
                            output: __HttpResponse,
                            context: __SerdeContext
                          ): Promise<LeaveGroupCommandOutput> => {
                            if (output.statusCode !== 200 && output.statusCode >= 300) {
                              return deserializeAws_restJson1LeaveGroupCommandError(output, context);
                            }
                            const contents: LeaveGroupCommandOutput = {
                              $metadata: deserializeMetadata(output),
                            };
                            await collectBody(output.body, context);
                            return Promise.resolve(contents);
                          }

                          const deserializeAws_restJson1LeaveGroupCommandError = async(
                            output: __HttpResponse,
                            context: __SerdeContext,
                          ): Promise<LeaveGroupCommandOutput> => {
                            const parsedOutput: any = {
                              ...output,
                              body: await parseBody(output.body, context)
                            };
                            let response: __BaseException;
                            let errorCode: string = "UnknownError";
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
                                response = new __BaseException({
                                  name: parsedBody.code || parsedBody.Code || errorCode,
                                  $fault: "client",
                                  $metadata: deserializeMetadata(output)
                                });
                                throw __decorateServiceException(response, parsedBody);
                              }
                            }

                            export const deserializeAws_restJson1ListSuggestedGroupsCommand = async(
                              output: __HttpResponse,
                              context: __SerdeContext
                            ): Promise<ListSuggestedGroupsCommandOutput> => {
                              if (output.statusCode !== 200 && output.statusCode >= 300) {
                                return deserializeAws_restJson1ListSuggestedGroupsCommandError(output, context);
                              }
                              const contents: ListSuggestedGroupsCommandOutput = {
                                $metadata: deserializeMetadata(output),
                                groups: undefined,
                                watch: undefined,
                              };
                              const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                              if (data.groups !== undefined && data.groups !== null) {
                                contents.groups = deserializeAws_restJson1GroupSummaries(data.groups, context);
                              }
                              if (data.watch !== undefined && data.watch !== null) {
                                contents.watch = deserializeAws_restJson1WatchResponse(data.watch, context);
                              }
                              return Promise.resolve(contents);
                            }

                            const deserializeAws_restJson1ListSuggestedGroupsCommandError = async(
                              output: __HttpResponse,
                              context: __SerdeContext,
                            ): Promise<ListSuggestedGroupsCommandOutput> => {
                              const parsedOutput: any = {
                                ...output,
                                body: await parseBody(output.body, context)
                              };
                              let response: __BaseException;
                              let errorCode: string = "UnknownError";
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
                                  response = new __BaseException({
                                    name: parsedBody.code || parsedBody.Code || errorCode,
                                    $fault: "client",
                                    $metadata: deserializeMetadata(output)
                                  });
                                  throw __decorateServiceException(response, parsedBody);
                                }
                              }

                              export const deserializeAws_restJson1PrepareGroupAvatarUploadCommand = async(
                                output: __HttpResponse,
                                context: __SerdeContext
                              ): Promise<PrepareGroupAvatarUploadCommandOutput> => {
                                if (output.statusCode !== 200 && output.statusCode >= 300) {
                                  return deserializeAws_restJson1PrepareGroupAvatarUploadCommandError(output, context);
                                }
                                const contents: PrepareGroupAvatarUploadCommandOutput = {
                                  $metadata: deserializeMetadata(output),
                                  presignedRequest: undefined,
                                  uploadId: undefined,
                                };
                                const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                                if (data.presigned_request !== undefined && data.presigned_request !== null) {
                                  contents.presignedRequest = deserializeAws_restJson1UploadPresignedRequest(data.presigned_request, context);
                                }
                                if (data.upload_id !== undefined && data.upload_id !== null) {
                                  contents.uploadId = __expectString(data.upload_id);
                                }
                                return Promise.resolve(contents);
                              }

                              const deserializeAws_restJson1PrepareGroupAvatarUploadCommandError = async(
                                output: __HttpResponse,
                                context: __SerdeContext,
                              ): Promise<PrepareGroupAvatarUploadCommandOutput> => {
                                const parsedOutput: any = {
                                  ...output,
                                  body: await parseBody(output.body, context)
                                };
                                let response: __BaseException;
                                let errorCode: string = "UnknownError";
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
                                    response = new __BaseException({
                                      name: parsedBody.code || parsedBody.Code || errorCode,
                                      $fault: "client",
                                      $metadata: deserializeMetadata(output)
                                    });
                                    throw __decorateServiceException(response, parsedBody);
                                  }
                                }

                                export const deserializeAws_restJson1ResolveGroupJoinRequestCommand = async(
                                  output: __HttpResponse,
                                  context: __SerdeContext
                                ): Promise<ResolveGroupJoinRequestCommandOutput> => {
                                  if (output.statusCode !== 200 && output.statusCode >= 300) {
                                    return deserializeAws_restJson1ResolveGroupJoinRequestCommandError(output, context);
                                  }
                                  const contents: ResolveGroupJoinRequestCommandOutput = {
                                    $metadata: deserializeMetadata(output),
                                  };
                                  await collectBody(output.body, context);
                                  return Promise.resolve(contents);
                                }

                                const deserializeAws_restJson1ResolveGroupJoinRequestCommandError = async(
                                  output: __HttpResponse,
                                  context: __SerdeContext,
                                ): Promise<ResolveGroupJoinRequestCommandOutput> => {
                                  const parsedOutput: any = {
                                    ...output,
                                    body: await parseBody(output.body, context)
                                  };
                                  let response: __BaseException;
                                  let errorCode: string = "UnknownError";
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
                                      response = new __BaseException({
                                        name: parsedBody.code || parsedBody.Code || errorCode,
                                        $fault: "client",
                                        $metadata: deserializeMetadata(output)
                                      });
                                      throw __decorateServiceException(response, parsedBody);
                                    }
                                  }

                                  export const deserializeAws_restJson1SearchGroupsCommand = async(
                                    output: __HttpResponse,
                                    context: __SerdeContext
                                  ): Promise<SearchGroupsCommandOutput> => {
                                    if (output.statusCode !== 200 && output.statusCode >= 300) {
                                      return deserializeAws_restJson1SearchGroupsCommandError(output, context);
                                    }
                                    const contents: SearchGroupsCommandOutput = {
                                      $metadata: deserializeMetadata(output),
                                      anchor: undefined,
                                      groups: undefined,
                                    };
                                    const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                                    if (data.anchor !== undefined && data.anchor !== null) {
                                      contents.anchor = __expectString(data.anchor);
                                    }
                                    if (data.groups !== undefined && data.groups !== null) {
                                      contents.groups = deserializeAws_restJson1GroupHandles(data.groups, context);
                                    }
                                    return Promise.resolve(contents);
                                  }

                                  const deserializeAws_restJson1SearchGroupsCommandError = async(
                                    output: __HttpResponse,
                                    context: __SerdeContext,
                                  ): Promise<SearchGroupsCommandOutput> => {
                                    const parsedOutput: any = {
                                      ...output,
                                      body: await parseBody(output.body, context)
                                    };
                                    let response: __BaseException;
                                    let errorCode: string = "UnknownError";
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
                                        response = new __BaseException({
                                          name: parsedBody.code || parsedBody.Code || errorCode,
                                          $fault: "client",
                                          $metadata: deserializeMetadata(output)
                                        });
                                        throw __decorateServiceException(response, parsedBody);
                                      }
                                    }

                                    export const deserializeAws_restJson1TransferGroupOwnershipCommand = async(
                                      output: __HttpResponse,
                                      context: __SerdeContext
                                    ): Promise<TransferGroupOwnershipCommandOutput> => {
                                      if (output.statusCode !== 200 && output.statusCode >= 300) {
                                        return deserializeAws_restJson1TransferGroupOwnershipCommandError(output, context);
                                      }
                                      const contents: TransferGroupOwnershipCommandOutput = {
                                        $metadata: deserializeMetadata(output),
                                      };
                                      await collectBody(output.body, context);
                                      return Promise.resolve(contents);
                                    }

                                    const deserializeAws_restJson1TransferGroupOwnershipCommandError = async(
                                      output: __HttpResponse,
                                      context: __SerdeContext,
                                    ): Promise<TransferGroupOwnershipCommandOutput> => {
                                      const parsedOutput: any = {
                                        ...output,
                                        body: await parseBody(output.body, context)
                                      };
                                      let response: __BaseException;
                                      let errorCode: string = "UnknownError";
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
                                          response = new __BaseException({
                                            name: parsedBody.code || parsedBody.Code || errorCode,
                                            $fault: "client",
                                            $metadata: deserializeMetadata(output)
                                          });
                                          throw __decorateServiceException(response, parsedBody);
                                        }
                                      }

                                      export const deserializeAws_restJson1UnbanGroupIdentityCommand = async(
                                        output: __HttpResponse,
                                        context: __SerdeContext
                                      ): Promise<UnbanGroupIdentityCommandOutput> => {
                                        if (output.statusCode !== 200 && output.statusCode >= 300) {
                                          return deserializeAws_restJson1UnbanGroupIdentityCommandError(output, context);
                                        }
                                        const contents: UnbanGroupIdentityCommandOutput = {
                                          $metadata: deserializeMetadata(output),
                                        };
                                        await collectBody(output.body, context);
                                        return Promise.resolve(contents);
                                      }

                                      const deserializeAws_restJson1UnbanGroupIdentityCommandError = async(
                                        output: __HttpResponse,
                                        context: __SerdeContext,
                                      ): Promise<UnbanGroupIdentityCommandOutput> => {
                                        const parsedOutput: any = {
                                          ...output,
                                          body: await parseBody(output.body, context)
                                        };
                                        let response: __BaseException;
                                        let errorCode: string = "UnknownError";
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
                                            response = new __BaseException({
                                              name: parsedBody.code || parsedBody.Code || errorCode,
                                              $fault: "client",
                                              $metadata: deserializeMetadata(output)
                                            });
                                            throw __decorateServiceException(response, parsedBody);
                                          }
                                        }

                                        export const deserializeAws_restJson1UpdateGroupProfileCommand = async(
                                          output: __HttpResponse,
                                          context: __SerdeContext
                                        ): Promise<UpdateGroupProfileCommandOutput> => {
                                          if (output.statusCode !== 200 && output.statusCode >= 300) {
                                            return deserializeAws_restJson1UpdateGroupProfileCommandError(output, context);
                                          }
                                          const contents: UpdateGroupProfileCommandOutput = {
                                            $metadata: deserializeMetadata(output),
                                          };
                                          await collectBody(output.body, context);
                                          return Promise.resolve(contents);
                                        }

                                        const deserializeAws_restJson1UpdateGroupProfileCommandError = async(
                                          output: __HttpResponse,
                                          context: __SerdeContext,
                                        ): Promise<UpdateGroupProfileCommandOutput> => {
                                          const parsedOutput: any = {
                                            ...output,
                                            body: await parseBody(output.body, context)
                                          };
                                          let response: __BaseException;
                                          let errorCode: string = "UnknownError";
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
                                              response = new __BaseException({
                                                name: parsedBody.code || parsedBody.Code || errorCode,
                                                $fault: "client",
                                                $metadata: deserializeMetadata(output)
                                              });
                                              throw __decorateServiceException(response, parsedBody);
                                            }
                                          }

                                          export const deserializeAws_restJson1ValidateGroupProfileCommand = async(
                                            output: __HttpResponse,
                                            context: __SerdeContext
                                          ): Promise<ValidateGroupProfileCommandOutput> => {
                                            if (output.statusCode !== 200 && output.statusCode >= 300) {
                                              return deserializeAws_restJson1ValidateGroupProfileCommandError(output, context);
                                            }
                                            const contents: ValidateGroupProfileCommandOutput = {
                                              $metadata: deserializeMetadata(output),
                                              errors: undefined,
                                            };
                                            const data: { [key: string] : any } = __expectNonNull((__expectObject(await parseBody(output.body, context))), "body");
                                            if (data.errors !== undefined && data.errors !== null) {
                                              contents.errors = deserializeAws_restJson1ValidationErrors(data.errors, context);
                                            }
                                            return Promise.resolve(contents);
                                          }

                                          const deserializeAws_restJson1ValidateGroupProfileCommandError = async(
                                            output: __HttpResponse,
                                            context: __SerdeContext,
                                          ): Promise<ValidateGroupProfileCommandOutput> => {
                                            const parsedOutput: any = {
                                              ...output,
                                              body: await parseBody(output.body, context)
                                            };
                                            let response: __BaseException;
                                            let errorCode: string = "UnknownError";
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
                                                response = new __BaseException({
                                                  name: parsedBody.code || parsedBody.Code || errorCode,
                                                  $fault: "client",
                                                  $metadata: deserializeMetadata(output)
                                                });
                                                throw __decorateServiceException(response, parsedBody);
                                              }
                                            }

                                            const deserializeAws_restJson1BadRequestErrorResponse = async (
                                              parsedOutput: any,
                                              context: __SerdeContext
                                            ): Promise<BadRequestError> => {
                                              const contents: any = {};
                                              const data: any = parsedOutput.body;
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
                                              const exception = new BadRequestError({
                                                $metadata: deserializeMetadata(parsedOutput),
                                                ...contents
                                              });
                                              return __decorateServiceException(exception, parsedOutput.body);
                                            };

                                            const deserializeAws_restJson1ForbiddenErrorResponse = async (
                                              parsedOutput: any,
                                              context: __SerdeContext
                                            ): Promise<ForbiddenError> => {
                                              const contents: any = {};
                                              const data: any = parsedOutput.body;
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
                                              const exception = new ForbiddenError({
                                                $metadata: deserializeMetadata(parsedOutput),
                                                ...contents
                                              });
                                              return __decorateServiceException(exception, parsedOutput.body);
                                            };

                                            const deserializeAws_restJson1InternalErrorResponse = async (
                                              parsedOutput: any,
                                              context: __SerdeContext
                                            ): Promise<InternalError> => {
                                              const contents: any = {};
                                              const data: any = parsedOutput.body;
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
                                              const exception = new InternalError({
                                                $metadata: deserializeMetadata(parsedOutput),
                                                ...contents
                                              });
                                              return __decorateServiceException(exception, parsedOutput.body);
                                            };

                                            const deserializeAws_restJson1NotFoundErrorResponse = async (
                                              parsedOutput: any,
                                              context: __SerdeContext
                                            ): Promise<NotFoundError> => {
                                              const contents: any = {};
                                              const data: any = parsedOutput.body;
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
                                              const exception = new NotFoundError({
                                                $metadata: deserializeMetadata(parsedOutput),
                                                ...contents
                                              });
                                              return __decorateServiceException(exception, parsedOutput.body);
                                            };

                                            const deserializeAws_restJson1RateLimitErrorResponse = async (
                                              parsedOutput: any,
                                              context: __SerdeContext
                                            ): Promise<RateLimitError> => {
                                              const contents: any = {};
                                              const data: any = parsedOutput.body;
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
                                              const exception = new RateLimitError({
                                                $metadata: deserializeMetadata(parsedOutput),
                                                ...contents
                                              });
                                              return __decorateServiceException(exception, parsedOutput.body);
                                            };

                                            const deserializeAws_restJson1UnauthorizedErrorResponse = async (
                                              parsedOutput: any,
                                              context: __SerdeContext
                                            ): Promise<UnauthorizedError> => {
                                              const contents: any = {};
                                              const data: any = parsedOutput.body;
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
                                              const exception = new UnauthorizedError({
                                                $metadata: deserializeMetadata(parsedOutput),
                                                ...contents
                                              });
                                              return __decorateServiceException(exception, parsedOutput.body);
                                            };

                                            const deserializeAws_restJson1ValidationError = (
                                              output: any,
                                              context: __SerdeContext
                                            ): ValidationError => {
                                              return {
                                                path: (output.path !== undefined && output.path !== null) ? deserializeAws_restJson1ValidationErrorPath(output.path, context): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1ValidationErrorPath = (
                                              output: any,
                                              context: __SerdeContext
                                            ): (string)[] => {
                                              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                                                if (entry === null) {
                                                  return null as any;
                                                }
                                                return __expectString(entry) as any;
                                              });
                                              return retVal;
                                            }

                                            const deserializeAws_restJson1ValidationErrors = (
                                              output: any,
                                              context: __SerdeContext
                                            ): (ValidationError)[] => {
                                              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                                                if (entry === null) {
                                                  return null as any;
                                                }
                                                return deserializeAws_restJson1ValidationError(entry, context);
                                              });
                                              return retVal;
                                            }

                                            const deserializeAws_restJson1WatchResponse = (
                                              output: any,
                                              context: __SerdeContext
                                            ): WatchResponse => {
                                              return {
                                                index: __expectString(output.index),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1ErrorMetadata = (
                                              output: any,
                                              context: __SerdeContext
                                            ): __DocumentType => {
                                              return output;
                                            }

                                            const deserializeAws_restJson1GameHandle = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GameHandle => {
                                              return {
                                                bannerUrl: __expectString(output.banner_url),
                                                displayName: __expectString(output.display_name),
                                                gameId: __expectString(output.game_id),
                                                logoUrl: __expectString(output.logo_url),
                                                nameId: __expectString(output.name_id),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1GroupBannedIdentities = (
                                              output: any,
                                              context: __SerdeContext
                                            ): (GroupBannedIdentity)[] => {
                                              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                                                if (entry === null) {
                                                  return null as any;
                                                }
                                                return deserializeAws_restJson1GroupBannedIdentity(entry, context);
                                              });
                                              return retVal;
                                            }

                                            const deserializeAws_restJson1GroupBannedIdentity = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GroupBannedIdentity => {
                                              return {
                                                banTs: (output.ban_ts !== undefined && output.ban_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.ban_ts)): undefined,
                                                identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1GroupExternalLinks = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GroupExternalLinks => {
                                              return {
                                                chat: __expectString(output.chat),
                                                profile: __expectString(output.profile),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1GroupHandle = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GroupHandle => {
                                              return {
                                                avatarUrl: __expectString(output.avatar_url),
                                                displayName: __expectString(output.display_name),
                                                external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context): undefined,
                                                groupId: __expectString(output.group_id),
                                                isDeveloper: __expectBoolean(output.is_developer),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1GroupHandles = (
                                              output: any,
                                              context: __SerdeContext
                                            ): (GroupHandle)[] => {
                                              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                                                if (entry === null) {
                                                  return null as any;
                                                }
                                                return deserializeAws_restJson1GroupHandle(entry, context);
                                              });
                                              return retVal;
                                            }

                                            const deserializeAws_restJson1GroupJoinRequest = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GroupJoinRequest => {
                                              return {
                                                identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                                                ts: (output.ts !== undefined && output.ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.ts)): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1GroupJoinRequests = (
                                              output: any,
                                              context: __SerdeContext
                                            ): (GroupJoinRequest)[] => {
                                              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                                                if (entry === null) {
                                                  return null as any;
                                                }
                                                return deserializeAws_restJson1GroupJoinRequest(entry, context);
                                              });
                                              return retVal;
                                            }

                                            const deserializeAws_restJson1GroupMember = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GroupMember => {
                                              return {
                                                identity: (output.identity !== undefined && output.identity !== null) ? deserializeAws_restJson1IdentityHandle(output.identity, context): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1GroupMembers = (
                                              output: any,
                                              context: __SerdeContext
                                            ): (GroupMember)[] => {
                                              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                                                if (entry === null) {
                                                  return null as any;
                                                }
                                                return deserializeAws_restJson1GroupMember(entry, context);
                                              });
                                              return retVal;
                                            }

                                            const deserializeAws_restJson1GroupProfile = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GroupProfile => {
                                              return {
                                                avatarUrl: __expectString(output.avatar_url),
                                                bio: __expectString(output.bio),
                                                displayName: __expectString(output.display_name),
                                                external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context): undefined,
                                                groupId: __expectString(output.group_id),
                                                isCurrentIdentityMember: __expectBoolean(output.is_current_identity_member),
                                                isCurrentIdentityRequestingJoin: __expectBoolean(output.is_current_identity_requesting_join),
                                                isDeveloper: __expectBoolean(output.is_developer),
                                                joinRequests: (output.join_requests !== undefined && output.join_requests !== null) ? deserializeAws_restJson1GroupJoinRequests(output.join_requests, context): undefined,
                                                memberCount: __expectInt32(output.member_count),
                                                members: (output.members !== undefined && output.members !== null) ? deserializeAws_restJson1GroupMembers(output.members, context): undefined,
                                                ownerIdentityId: __expectString(output.owner_identity_id),
                                                publicity: __expectString(output.publicity),
                                                threadId: __expectString(output.thread_id),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1GroupSummaries = (
                                              output: any,
                                              context: __SerdeContext
                                            ): (GroupSummary)[] => {
                                              const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
                                                if (entry === null) {
                                                  return null as any;
                                                }
                                                return deserializeAws_restJson1GroupSummary(entry, context);
                                              });
                                              return retVal;
                                            }

                                            const deserializeAws_restJson1GroupSummary = (
                                              output: any,
                                              context: __SerdeContext
                                            ): GroupSummary => {
                                              return {
                                                avatarUrl: __expectString(output.avatar_url),
                                                bio: __expectString(output.bio),
                                                displayName: __expectString(output.display_name),
                                                external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1GroupExternalLinks(output.external, context): undefined,
                                                groupId: __expectString(output.group_id),
                                                isCurrentIdentityMember: __expectBoolean(output.is_current_identity_member),
                                                isDeveloper: __expectBoolean(output.is_developer),
                                                memberCount: __expectInt32(output.member_count),
                                                ownerIdentityId: __expectString(output.owner_identity_id),
                                                publicity: __expectString(output.publicity),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1IdentityExternalLinks = (
                                              output: any,
                                              context: __SerdeContext
                                            ): IdentityExternalLinks => {
                                              return {
                                                chat: __expectString(output.chat),
                                                profile: __expectString(output.profile),
                                                settings: __expectString(output.settings),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1IdentityGameActivity = (
                                              output: any,
                                              context: __SerdeContext
                                            ): IdentityGameActivity => {
                                              return {
                                                game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context): undefined,
                                                message: __expectString(output.message),
                                                mutualMetadata: (output.mutual_metadata !== undefined && output.mutual_metadata !== null) ? deserializeAws_restJson1Document(output.mutual_metadata, context): undefined,
                                                publicMetadata: (output.public_metadata !== undefined && output.public_metadata !== null) ? deserializeAws_restJson1Document(output.public_metadata, context): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1IdentityHandle = (
                                              output: any,
                                              context: __SerdeContext
                                            ): IdentityHandle => {
                                              return {
                                                accountNumber: __expectInt32(output.account_number),
                                                avatarUrl: __expectString(output.avatar_url),
                                                displayName: __expectString(output.display_name),
                                                external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1IdentityExternalLinks(output.external, context): undefined,
                                                identityId: __expectString(output.identity_id),
                                                isRegistered: __expectBoolean(output.is_registered),
                                                party: (output.party !== undefined && output.party !== null) ? deserializeAws_restJson1PartyHandle(output.party, context): undefined,
                                                presence: (output.presence !== undefined && output.presence !== null) ? deserializeAws_restJson1IdentityPresence(output.presence, context): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1IdentityPresence = (
                                              output: any,
                                              context: __SerdeContext
                                            ): IdentityPresence => {
                                              return {
                                                gameActivity: (output.game_activity !== undefined && output.game_activity !== null) ? deserializeAws_restJson1IdentityGameActivity(output.game_activity, context): undefined,
                                                status: __expectString(output.status),
                                                updateTs: (output.update_ts !== undefined && output.update_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.update_ts)): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1PartyActivity = (
                                              output: any,
                                              context: __SerdeContext
                                            ): PartyActivity => {
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
                                            }

                                            const deserializeAws_restJson1PartyActivityIdle = (
                                              output: any,
                                              context: __SerdeContext
                                            ): PartyActivityIdle => {
                                              return {
                                              } as any;
                                            }

                                            const deserializeAws_restJson1PartyActivityMatchmakerFindingLobby = (
                                              output: any,
                                              context: __SerdeContext
                                            ): PartyActivityMatchmakerFindingLobby => {
                                              return {
                                                game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1PartyActivityMatchmakerLobby = (
                                              output: any,
                                              context: __SerdeContext
                                            ): PartyActivityMatchmakerLobby => {
                                              return {
                                                game: (output.game !== undefined && output.game !== null) ? deserializeAws_restJson1GameHandle(output.game, context): undefined,
                                                lobby: (output.lobby !== undefined && output.lobby !== null) ? deserializeAws_restJson1PartyMatchmakerLobby(output.lobby, context): undefined,
                                              } as any;
                                            }

                                            const deserializeAws_restJson1PartyExternalLinks = (
                                              output: any,
                                              context: __SerdeContext
                                            ): PartyExternalLinks => {
                                              return {
                                                chat: __expectString(output.chat),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1PartyHandle = (
                                              output: any,
                                              context: __SerdeContext
                                            ): PartyHandle => {
                                              return {
                                                activity: (output.activity !== undefined && output.activity !== null) ? deserializeAws_restJson1PartyActivity(__expectUnion(output.activity), context): undefined,
                                                createTs: (output.create_ts !== undefined && output.create_ts !== null) ? __expectNonNull(__parseRfc3339DateTime(output.create_ts)): undefined,
                                                external: (output.external !== undefined && output.external !== null) ? deserializeAws_restJson1PartyExternalLinks(output.external, context): undefined,
                                                partyId: __expectString(output.party_id),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1PartyMatchmakerLobby = (
                                              output: any,
                                              context: __SerdeContext
                                            ): PartyMatchmakerLobby => {
                                              return {
                                                lobbyId: __expectString(output.lobby_id),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1UploadPresignedRequest = (
                                              output: any,
                                              context: __SerdeContext
                                            ): UploadPresignedRequest => {
                                              return {
                                                path: __expectString(output.path),
                                                url: __expectString(output.url),
                                              } as any;
                                            }

                                            const deserializeAws_restJson1Document = (
                                              output: any,
                                              context: __SerdeContext
                                            ): __DocumentType => {
                                              return output;
                                            }

                                            const deserializeMetadata = (output: __HttpResponse): __ResponseMetadata => ({
                                              httpStatusCode: output.statusCode,
                                              requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"],
                                              extendedRequestId: output.headers["x-amz-id-2"],
                                              cfId: output.headers["x-amz-cf-id"],
                                            });

                                            // Collect low-level response body stream to Uint8Array.
                                            const collectBody = (streamBody: any = new Uint8Array(), context: __SerdeContext): Promise<Uint8Array> => {
                                              if (streamBody instanceof Uint8Array) {
                                                return Promise.resolve(streamBody);
                                              }
                                              return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
                                            };

                                            // Encode Uint8Array data into string with utf-8.
                                            const collectBodyString = (streamBody: any, context: __SerdeContext): Promise<string> => collectBody(streamBody, context).then(body => context.utf8Encoder(body))

                                            const isSerializableHeaderValue = (value: any): boolean =>
                                              value !== undefined &&
                                              value !== null &&
                                              value !== "" &&
                                              (!Object.getOwnPropertyNames(value).includes("length") ||
                                                value.length != 0) &&
                                              (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);

                                            const parseBody = (streamBody: any, context: __SerdeContext): any => collectBodyString(streamBody, context).then(encoded => {
                                              if (encoded.length) {
                                                return JSON.parse(encoded);
                                              }
                                              return {};
                                            });

                                            /**
                                             * Load an error code for the aws.rest-json-1.1 protocol.
                                             */
                                            const loadRestJsonErrorCode = (output: __HttpResponse, data: any): string => {
                                              const findKey = (object: any, key: string) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());

                                              const sanitizeErrorCode = (rawValue: string): string => {
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
