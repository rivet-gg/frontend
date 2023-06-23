// smithy-typescript generated code
import { GroupServiceClient } from "./GroupServiceClient";
import {
  BanGroupIdentityCommand,
  BanGroupIdentityCommandInput,
  BanGroupIdentityCommandOutput,
} from "./commands/BanGroupIdentityCommand";
import {
  CompleteGroupAvatarUploadCommand,
  CompleteGroupAvatarUploadCommandInput,
  CompleteGroupAvatarUploadCommandOutput,
} from "./commands/CompleteGroupAvatarUploadCommand";
import {
  ConsumeGroupInviteCommand,
  ConsumeGroupInviteCommandInput,
  ConsumeGroupInviteCommandOutput,
} from "./commands/ConsumeGroupInviteCommand";
import {
  CreateGroupCommand,
  CreateGroupCommandInput,
  CreateGroupCommandOutput,
} from "./commands/CreateGroupCommand";
import {
  CreateGroupInviteCommand,
  CreateGroupInviteCommandInput,
  CreateGroupInviteCommandOutput,
} from "./commands/CreateGroupInviteCommand";
import {
  CreateGroupJoinRequestCommand,
  CreateGroupJoinRequestCommandInput,
  CreateGroupJoinRequestCommandOutput,
} from "./commands/CreateGroupJoinRequestCommand";
import {
  GetGroupBansCommand,
  GetGroupBansCommandInput,
  GetGroupBansCommandOutput,
} from "./commands/GetGroupBansCommand";
import {
  GetGroupInviteCommand,
  GetGroupInviteCommandInput,
  GetGroupInviteCommandOutput,
} from "./commands/GetGroupInviteCommand";
import {
  GetGroupJoinRequestsCommand,
  GetGroupJoinRequestsCommandInput,
  GetGroupJoinRequestsCommandOutput,
} from "./commands/GetGroupJoinRequestsCommand";
import {
  GetGroupMembersCommand,
  GetGroupMembersCommandInput,
  GetGroupMembersCommandOutput,
} from "./commands/GetGroupMembersCommand";
import {
  GetGroupProfileCommand,
  GetGroupProfileCommandInput,
  GetGroupProfileCommandOutput,
} from "./commands/GetGroupProfileCommand";
import {
  GetGroupSummaryCommand,
  GetGroupSummaryCommandInput,
  GetGroupSummaryCommandOutput,
} from "./commands/GetGroupSummaryCommand";
import {
  KickGroupMemberCommand,
  KickGroupMemberCommandInput,
  KickGroupMemberCommandOutput,
} from "./commands/KickGroupMemberCommand";
import {
  LeaveGroupCommand,
  LeaveGroupCommandInput,
  LeaveGroupCommandOutput,
} from "./commands/LeaveGroupCommand";
import {
  ListSuggestedGroupsCommand,
  ListSuggestedGroupsCommandInput,
  ListSuggestedGroupsCommandOutput,
} from "./commands/ListSuggestedGroupsCommand";
import {
  PrepareGroupAvatarUploadCommand,
  PrepareGroupAvatarUploadCommandInput,
  PrepareGroupAvatarUploadCommandOutput,
} from "./commands/PrepareGroupAvatarUploadCommand";
import {
  ResolveGroupJoinRequestCommand,
  ResolveGroupJoinRequestCommandInput,
  ResolveGroupJoinRequestCommandOutput,
} from "./commands/ResolveGroupJoinRequestCommand";
import {
  SearchGroupsCommand,
  SearchGroupsCommandInput,
  SearchGroupsCommandOutput,
} from "./commands/SearchGroupsCommand";
import {
  TransferGroupOwnershipCommand,
  TransferGroupOwnershipCommandInput,
  TransferGroupOwnershipCommandOutput,
} from "./commands/TransferGroupOwnershipCommand";
import {
  UnbanGroupIdentityCommand,
  UnbanGroupIdentityCommandInput,
  UnbanGroupIdentityCommandOutput,
} from "./commands/UnbanGroupIdentityCommand";
import {
  UpdateGroupProfileCommand,
  UpdateGroupProfileCommandInput,
  UpdateGroupProfileCommandOutput,
} from "./commands/UpdateGroupProfileCommand";
import {
  ValidateGroupProfileCommand,
  ValidateGroupProfileCommandInput,
  ValidateGroupProfileCommandOutput,
} from "./commands/ValidateGroupProfileCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

export class GroupService extends GroupServiceClient {
  /**
   * Bans an identity from a group. Must be the owner of the group to perform this action. The banned identity
   * will no longer be able to create a join request or use a group invite.
   */
  public banGroupIdentity(
    args: BanGroupIdentityCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<BanGroupIdentityCommandOutput>;
  public banGroupIdentity(
    args: BanGroupIdentityCommandInput,
    cb: (err: any, data?: BanGroupIdentityCommandOutput) => void
  ): void;
  public banGroupIdentity(
    args: BanGroupIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: BanGroupIdentityCommandOutput) => void
  ): void;
  public banGroupIdentity(
    args: BanGroupIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: BanGroupIdentityCommandOutput) => void),
    cb?: (err: any, data?: BanGroupIdentityCommandOutput) => void
  ): Promise<BanGroupIdentityCommandOutput> | void {
    const command = new BanGroupIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Completes an avatar image upload. Must be called after the file upload
   * process completes.
   *
   * Call `rivet.api.group#PrepareGroupAvatarUpload` first.
   */
  public completeGroupAvatarUpload(
    args: CompleteGroupAvatarUploadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CompleteGroupAvatarUploadCommandOutput>;
  public completeGroupAvatarUpload(
    args: CompleteGroupAvatarUploadCommandInput,
    cb: (err: any, data?: CompleteGroupAvatarUploadCommandOutput) => void
  ): void;
  public completeGroupAvatarUpload(
    args: CompleteGroupAvatarUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CompleteGroupAvatarUploadCommandOutput) => void
  ): void;
  public completeGroupAvatarUpload(
    args: CompleteGroupAvatarUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CompleteGroupAvatarUploadCommandOutput) => void),
    cb?: (err: any, data?: CompleteGroupAvatarUploadCommandOutput) => void
  ): Promise<CompleteGroupAvatarUploadCommandOutput> | void {
    const command = new CompleteGroupAvatarUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Consumes a group invite to join a group.
   */
  public consumeGroupInvite(
    args: ConsumeGroupInviteCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ConsumeGroupInviteCommandOutput>;
  public consumeGroupInvite(
    args: ConsumeGroupInviteCommandInput,
    cb: (err: any, data?: ConsumeGroupInviteCommandOutput) => void
  ): void;
  public consumeGroupInvite(
    args: ConsumeGroupInviteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ConsumeGroupInviteCommandOutput) => void
  ): void;
  public consumeGroupInvite(
    args: ConsumeGroupInviteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ConsumeGroupInviteCommandOutput) => void),
    cb?: (err: any, data?: ConsumeGroupInviteCommandOutput) => void
  ): Promise<ConsumeGroupInviteCommandOutput> | void {
    const command = new ConsumeGroupInviteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a new group.
   */
  public createGroup(
    args: CreateGroupCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGroupCommandOutput>;
  public createGroup(
    args: CreateGroupCommandInput,
    cb: (err: any, data?: CreateGroupCommandOutput) => void
  ): void;
  public createGroup(
    args: CreateGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGroupCommandOutput) => void
  ): void;
  public createGroup(
    args: CreateGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGroupCommandOutput) => void),
    cb?: (err: any, data?: CreateGroupCommandOutput) => void
  ): Promise<CreateGroupCommandOutput> | void {
    const command = new CreateGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a group invite. Can be shared with other identities to let them join
   * this group.
   */
  public createGroupInvite(
    args: CreateGroupInviteCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGroupInviteCommandOutput>;
  public createGroupInvite(
    args: CreateGroupInviteCommandInput,
    cb: (err: any, data?: CreateGroupInviteCommandOutput) => void
  ): void;
  public createGroupInvite(
    args: CreateGroupInviteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGroupInviteCommandOutput) => void
  ): void;
  public createGroupInvite(
    args: CreateGroupInviteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGroupInviteCommandOutput) => void),
    cb?: (err: any, data?: CreateGroupInviteCommandOutput) => void
  ): Promise<CreateGroupInviteCommandOutput> | void {
    const command = new CreateGroupInviteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Requests to join a group.
   */
  public createGroupJoinRequest(
    args: CreateGroupJoinRequestCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGroupJoinRequestCommandOutput>;
  public createGroupJoinRequest(
    args: CreateGroupJoinRequestCommandInput,
    cb: (err: any, data?: CreateGroupJoinRequestCommandOutput) => void
  ): void;
  public createGroupJoinRequest(
    args: CreateGroupJoinRequestCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGroupJoinRequestCommandOutput) => void
  ): void;
  public createGroupJoinRequest(
    args: CreateGroupJoinRequestCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGroupJoinRequestCommandOutput) => void),
    cb?: (err: any, data?: CreateGroupJoinRequestCommandOutput) => void
  ): Promise<CreateGroupJoinRequestCommandOutput> | void {
    const command = new CreateGroupJoinRequestCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a group's bans. Must have valid permissions to view.
   */
  public getGroupBans(
    args: GetGroupBansCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupBansCommandOutput>;
  public getGroupBans(
    args: GetGroupBansCommandInput,
    cb: (err: any, data?: GetGroupBansCommandOutput) => void
  ): void;
  public getGroupBans(
    args: GetGroupBansCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupBansCommandOutput) => void
  ): void;
  public getGroupBans(
    args: GetGroupBansCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupBansCommandOutput) => void),
    cb?: (err: any, data?: GetGroupBansCommandOutput) => void
  ): Promise<GetGroupBansCommandOutput> | void {
    const command = new GetGroupBansCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Inspects a group invite returning information about the team that created it.
   */
  public getGroupInvite(
    args: GetGroupInviteCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupInviteCommandOutput>;
  public getGroupInvite(
    args: GetGroupInviteCommandInput,
    cb: (err: any, data?: GetGroupInviteCommandOutput) => void
  ): void;
  public getGroupInvite(
    args: GetGroupInviteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupInviteCommandOutput) => void
  ): void;
  public getGroupInvite(
    args: GetGroupInviteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupInviteCommandOutput) => void),
    cb?: (err: any, data?: GetGroupInviteCommandOutput) => void
  ): Promise<GetGroupInviteCommandOutput> | void {
    const command = new GetGroupInviteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a group's join requests. Must have valid permissions to view.
   */
  public getGroupJoinRequests(
    args: GetGroupJoinRequestsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupJoinRequestsCommandOutput>;
  public getGroupJoinRequests(
    args: GetGroupJoinRequestsCommandInput,
    cb: (err: any, data?: GetGroupJoinRequestsCommandOutput) => void
  ): void;
  public getGroupJoinRequests(
    args: GetGroupJoinRequestsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupJoinRequestsCommandOutput) => void
  ): void;
  public getGroupJoinRequests(
    args: GetGroupJoinRequestsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupJoinRequestsCommandOutput) => void),
    cb?: (err: any, data?: GetGroupJoinRequestsCommandOutput) => void
  ): Promise<GetGroupJoinRequestsCommandOutput> | void {
    const command = new GetGroupJoinRequestsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a group's members.
   */
  public getGroupMembers(
    args: GetGroupMembersCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupMembersCommandOutput>;
  public getGroupMembers(
    args: GetGroupMembersCommandInput,
    cb: (err: any, data?: GetGroupMembersCommandOutput) => void
  ): void;
  public getGroupMembers(
    args: GetGroupMembersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupMembersCommandOutput) => void
  ): void;
  public getGroupMembers(
    args: GetGroupMembersCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupMembersCommandOutput) => void),
    cb?: (err: any, data?: GetGroupMembersCommandOutput) => void
  ): Promise<GetGroupMembersCommandOutput> | void {
    const command = new GetGroupMembersCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a group profile.
   */
  public getGroupProfile(
    args: GetGroupProfileCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupProfileCommandOutput>;
  public getGroupProfile(
    args: GetGroupProfileCommandInput,
    cb: (err: any, data?: GetGroupProfileCommandOutput) => void
  ): void;
  public getGroupProfile(
    args: GetGroupProfileCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupProfileCommandOutput) => void
  ): void;
  public getGroupProfile(
    args: GetGroupProfileCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupProfileCommandOutput) => void),
    cb?: (err: any, data?: GetGroupProfileCommandOutput) => void
  ): Promise<GetGroupProfileCommandOutput> | void {
    const command = new GetGroupProfileCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  public getGroupSummary(
    args: GetGroupSummaryCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupSummaryCommandOutput>;
  public getGroupSummary(
    args: GetGroupSummaryCommandInput,
    cb: (err: any, data?: GetGroupSummaryCommandOutput) => void
  ): void;
  public getGroupSummary(
    args: GetGroupSummaryCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupSummaryCommandOutput) => void
  ): void;
  public getGroupSummary(
    args: GetGroupSummaryCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupSummaryCommandOutput) => void),
    cb?: (err: any, data?: GetGroupSummaryCommandOutput) => void
  ): Promise<GetGroupSummaryCommandOutput> | void {
    const command = new GetGroupSummaryCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Kicks an identity from a group. Must be the owner of the group to perform this action.
   */
  public kickGroupMember(
    args: KickGroupMemberCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<KickGroupMemberCommandOutput>;
  public kickGroupMember(
    args: KickGroupMemberCommandInput,
    cb: (err: any, data?: KickGroupMemberCommandOutput) => void
  ): void;
  public kickGroupMember(
    args: KickGroupMemberCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: KickGroupMemberCommandOutput) => void
  ): void;
  public kickGroupMember(
    args: KickGroupMemberCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: KickGroupMemberCommandOutput) => void),
    cb?: (err: any, data?: KickGroupMemberCommandOutput) => void
  ): Promise<KickGroupMemberCommandOutput> | void {
    const command = new KickGroupMemberCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Leaves a group.
   */
  public leaveGroup(
    args: LeaveGroupCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<LeaveGroupCommandOutput>;
  public leaveGroup(
    args: LeaveGroupCommandInput,
    cb: (err: any, data?: LeaveGroupCommandOutput) => void
  ): void;
  public leaveGroup(
    args: LeaveGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: LeaveGroupCommandOutput) => void
  ): void;
  public leaveGroup(
    args: LeaveGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: LeaveGroupCommandOutput) => void),
    cb?: (err: any, data?: LeaveGroupCommandOutput) => void
  ): Promise<LeaveGroupCommandOutput> | void {
    const command = new LeaveGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a list of suggested groups.
   */
  public listSuggestedGroups(
    args: ListSuggestedGroupsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ListSuggestedGroupsCommandOutput>;
  public listSuggestedGroups(
    args: ListSuggestedGroupsCommandInput,
    cb: (err: any, data?: ListSuggestedGroupsCommandOutput) => void
  ): void;
  public listSuggestedGroups(
    args: ListSuggestedGroupsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListSuggestedGroupsCommandOutput) => void
  ): void;
  public listSuggestedGroups(
    args: ListSuggestedGroupsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListSuggestedGroupsCommandOutput) => void),
    cb?: (err: any, data?: ListSuggestedGroupsCommandOutput) => void
  ): Promise<ListSuggestedGroupsCommandOutput> | void {
    const command = new ListSuggestedGroupsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Prepares an avatar image upload.
   *
   * Complete upload with `rivet.api.group#CompleteGroupAvatarUpload`.
   */
  public prepareGroupAvatarUpload(
    args: PrepareGroupAvatarUploadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<PrepareGroupAvatarUploadCommandOutput>;
  public prepareGroupAvatarUpload(
    args: PrepareGroupAvatarUploadCommandInput,
    cb: (err: any, data?: PrepareGroupAvatarUploadCommandOutput) => void
  ): void;
  public prepareGroupAvatarUpload(
    args: PrepareGroupAvatarUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PrepareGroupAvatarUploadCommandOutput) => void
  ): void;
  public prepareGroupAvatarUpload(
    args: PrepareGroupAvatarUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PrepareGroupAvatarUploadCommandOutput) => void),
    cb?: (err: any, data?: PrepareGroupAvatarUploadCommandOutput) => void
  ): Promise<PrepareGroupAvatarUploadCommandOutput> | void {
    const command = new PrepareGroupAvatarUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Resolves a join request for a given group.
   */
  public resolveGroupJoinRequest(
    args: ResolveGroupJoinRequestCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ResolveGroupJoinRequestCommandOutput>;
  public resolveGroupJoinRequest(
    args: ResolveGroupJoinRequestCommandInput,
    cb: (err: any, data?: ResolveGroupJoinRequestCommandOutput) => void
  ): void;
  public resolveGroupJoinRequest(
    args: ResolveGroupJoinRequestCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ResolveGroupJoinRequestCommandOutput) => void
  ): void;
  public resolveGroupJoinRequest(
    args: ResolveGroupJoinRequestCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ResolveGroupJoinRequestCommandOutput) => void),
    cb?: (err: any, data?: ResolveGroupJoinRequestCommandOutput) => void
  ): Promise<ResolveGroupJoinRequestCommandOutput> | void {
    const command = new ResolveGroupJoinRequestCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Fuzzy search for groups.
   */
  public searchGroups(
    args: SearchGroupsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<SearchGroupsCommandOutput>;
  public searchGroups(
    args: SearchGroupsCommandInput,
    cb: (err: any, data?: SearchGroupsCommandOutput) => void
  ): void;
  public searchGroups(
    args: SearchGroupsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SearchGroupsCommandOutput) => void
  ): void;
  public searchGroups(
    args: SearchGroupsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SearchGroupsCommandOutput) => void),
    cb?: (err: any, data?: SearchGroupsCommandOutput) => void
  ): Promise<SearchGroupsCommandOutput> | void {
    const command = new SearchGroupsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Transfers ownership of a group to another identity.
   */
  public transferGroupOwnership(
    args: TransferGroupOwnershipCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<TransferGroupOwnershipCommandOutput>;
  public transferGroupOwnership(
    args: TransferGroupOwnershipCommandInput,
    cb: (err: any, data?: TransferGroupOwnershipCommandOutput) => void
  ): void;
  public transferGroupOwnership(
    args: TransferGroupOwnershipCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: TransferGroupOwnershipCommandOutput) => void
  ): void;
  public transferGroupOwnership(
    args: TransferGroupOwnershipCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: TransferGroupOwnershipCommandOutput) => void),
    cb?: (err: any, data?: TransferGroupOwnershipCommandOutput) => void
  ): Promise<TransferGroupOwnershipCommandOutput> | void {
    const command = new TransferGroupOwnershipCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Unbans an identity from a group. Must be the owner of the group to perform this action.
   */
  public unbanGroupIdentity(
    args: UnbanGroupIdentityCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<UnbanGroupIdentityCommandOutput>;
  public unbanGroupIdentity(
    args: UnbanGroupIdentityCommandInput,
    cb: (err: any, data?: UnbanGroupIdentityCommandOutput) => void
  ): void;
  public unbanGroupIdentity(
    args: UnbanGroupIdentityCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UnbanGroupIdentityCommandOutput) => void
  ): void;
  public unbanGroupIdentity(
    args: UnbanGroupIdentityCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UnbanGroupIdentityCommandOutput) => void),
    cb?: (err: any, data?: UnbanGroupIdentityCommandOutput) => void
  ): Promise<UnbanGroupIdentityCommandOutput> | void {
    const command = new UnbanGroupIdentityCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  public updateGroupProfile(
    args: UpdateGroupProfileCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<UpdateGroupProfileCommandOutput>;
  public updateGroupProfile(
    args: UpdateGroupProfileCommandInput,
    cb: (err: any, data?: UpdateGroupProfileCommandOutput) => void
  ): void;
  public updateGroupProfile(
    args: UpdateGroupProfileCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateGroupProfileCommandOutput) => void
  ): void;
  public updateGroupProfile(
    args: UpdateGroupProfileCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateGroupProfileCommandOutput) => void),
    cb?: (err: any, data?: UpdateGroupProfileCommandOutput) => void
  ): Promise<UpdateGroupProfileCommandOutput> | void {
    const command = new UpdateGroupProfileCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Validate contents of group profile.
   *
   * Use to provide immediate feedback on profile changes before committing them.
   */
  public validateGroupProfile(
    args: ValidateGroupProfileCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ValidateGroupProfileCommandOutput>;
  public validateGroupProfile(
    args: ValidateGroupProfileCommandInput,
    cb: (err: any, data?: ValidateGroupProfileCommandOutput) => void
  ): void;
  public validateGroupProfile(
    args: ValidateGroupProfileCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ValidateGroupProfileCommandOutput) => void
  ): void;
  public validateGroupProfile(
    args: ValidateGroupProfileCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ValidateGroupProfileCommandOutput) => void),
    cb?: (err: any, data?: ValidateGroupProfileCommandOutput) => void
  ): Promise<ValidateGroupProfileCommandOutput> | void {
    const command = new ValidateGroupProfileCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

}
