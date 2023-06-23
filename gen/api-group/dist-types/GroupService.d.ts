import { GroupServiceClient } from "./GroupServiceClient";
import { BanGroupIdentityCommandInput, BanGroupIdentityCommandOutput } from "./commands/BanGroupIdentityCommand";
import { CompleteGroupAvatarUploadCommandInput, CompleteGroupAvatarUploadCommandOutput } from "./commands/CompleteGroupAvatarUploadCommand";
import { ConsumeGroupInviteCommandInput, ConsumeGroupInviteCommandOutput } from "./commands/ConsumeGroupInviteCommand";
import { CreateGroupCommandInput, CreateGroupCommandOutput } from "./commands/CreateGroupCommand";
import { CreateGroupInviteCommandInput, CreateGroupInviteCommandOutput } from "./commands/CreateGroupInviteCommand";
import { CreateGroupJoinRequestCommandInput, CreateGroupJoinRequestCommandOutput } from "./commands/CreateGroupJoinRequestCommand";
import { GetGroupBansCommandInput, GetGroupBansCommandOutput } from "./commands/GetGroupBansCommand";
import { GetGroupInviteCommandInput, GetGroupInviteCommandOutput } from "./commands/GetGroupInviteCommand";
import { GetGroupJoinRequestsCommandInput, GetGroupJoinRequestsCommandOutput } from "./commands/GetGroupJoinRequestsCommand";
import { GetGroupMembersCommandInput, GetGroupMembersCommandOutput } from "./commands/GetGroupMembersCommand";
import { GetGroupProfileCommandInput, GetGroupProfileCommandOutput } from "./commands/GetGroupProfileCommand";
import { GetGroupSummaryCommandInput, GetGroupSummaryCommandOutput } from "./commands/GetGroupSummaryCommand";
import { KickGroupMemberCommandInput, KickGroupMemberCommandOutput } from "./commands/KickGroupMemberCommand";
import { LeaveGroupCommandInput, LeaveGroupCommandOutput } from "./commands/LeaveGroupCommand";
import { ListSuggestedGroupsCommandInput, ListSuggestedGroupsCommandOutput } from "./commands/ListSuggestedGroupsCommand";
import { PrepareGroupAvatarUploadCommandInput, PrepareGroupAvatarUploadCommandOutput } from "./commands/PrepareGroupAvatarUploadCommand";
import { ResolveGroupJoinRequestCommandInput, ResolveGroupJoinRequestCommandOutput } from "./commands/ResolveGroupJoinRequestCommand";
import { SearchGroupsCommandInput, SearchGroupsCommandOutput } from "./commands/SearchGroupsCommand";
import { TransferGroupOwnershipCommandInput, TransferGroupOwnershipCommandOutput } from "./commands/TransferGroupOwnershipCommand";
import { UnbanGroupIdentityCommandInput, UnbanGroupIdentityCommandOutput } from "./commands/UnbanGroupIdentityCommand";
import { UpdateGroupProfileCommandInput, UpdateGroupProfileCommandOutput } from "./commands/UpdateGroupProfileCommand";
import { ValidateGroupProfileCommandInput, ValidateGroupProfileCommandOutput } from "./commands/ValidateGroupProfileCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
export declare class GroupService extends GroupServiceClient {
    /**
     * Bans an identity from a group. Must be the owner of the group to perform this action. The banned identity
     * will no longer be able to create a join request or use a group invite.
     */
    banGroupIdentity(args: BanGroupIdentityCommandInput, options?: __HttpHandlerOptions): Promise<BanGroupIdentityCommandOutput>;
    banGroupIdentity(args: BanGroupIdentityCommandInput, cb: (err: any, data?: BanGroupIdentityCommandOutput) => void): void;
    banGroupIdentity(args: BanGroupIdentityCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: BanGroupIdentityCommandOutput) => void): void;
    /**
     * Completes an avatar image upload. Must be called after the file upload
     * process completes.
     *
     * Call `rivet.api.group#PrepareGroupAvatarUpload` first.
     */
    completeGroupAvatarUpload(args: CompleteGroupAvatarUploadCommandInput, options?: __HttpHandlerOptions): Promise<CompleteGroupAvatarUploadCommandOutput>;
    completeGroupAvatarUpload(args: CompleteGroupAvatarUploadCommandInput, cb: (err: any, data?: CompleteGroupAvatarUploadCommandOutput) => void): void;
    completeGroupAvatarUpload(args: CompleteGroupAvatarUploadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CompleteGroupAvatarUploadCommandOutput) => void): void;
    /**
     * Consumes a group invite to join a group.
     */
    consumeGroupInvite(args: ConsumeGroupInviteCommandInput, options?: __HttpHandlerOptions): Promise<ConsumeGroupInviteCommandOutput>;
    consumeGroupInvite(args: ConsumeGroupInviteCommandInput, cb: (err: any, data?: ConsumeGroupInviteCommandOutput) => void): void;
    consumeGroupInvite(args: ConsumeGroupInviteCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ConsumeGroupInviteCommandOutput) => void): void;
    /**
     * Creates a new group.
     */
    createGroup(args: CreateGroupCommandInput, options?: __HttpHandlerOptions): Promise<CreateGroupCommandOutput>;
    createGroup(args: CreateGroupCommandInput, cb: (err: any, data?: CreateGroupCommandOutput) => void): void;
    createGroup(args: CreateGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGroupCommandOutput) => void): void;
    /**
     * Creates a group invite. Can be shared with other identities to let them join
     * this group.
     */
    createGroupInvite(args: CreateGroupInviteCommandInput, options?: __HttpHandlerOptions): Promise<CreateGroupInviteCommandOutput>;
    createGroupInvite(args: CreateGroupInviteCommandInput, cb: (err: any, data?: CreateGroupInviteCommandOutput) => void): void;
    createGroupInvite(args: CreateGroupInviteCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGroupInviteCommandOutput) => void): void;
    /**
     * Requests to join a group.
     */
    createGroupJoinRequest(args: CreateGroupJoinRequestCommandInput, options?: __HttpHandlerOptions): Promise<CreateGroupJoinRequestCommandOutput>;
    createGroupJoinRequest(args: CreateGroupJoinRequestCommandInput, cb: (err: any, data?: CreateGroupJoinRequestCommandOutput) => void): void;
    createGroupJoinRequest(args: CreateGroupJoinRequestCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGroupJoinRequestCommandOutput) => void): void;
    /**
     * Returns a group's bans. Must have valid permissions to view.
     */
    getGroupBans(args: GetGroupBansCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupBansCommandOutput>;
    getGroupBans(args: GetGroupBansCommandInput, cb: (err: any, data?: GetGroupBansCommandOutput) => void): void;
    getGroupBans(args: GetGroupBansCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupBansCommandOutput) => void): void;
    /**
     * Inspects a group invite returning information about the team that created it.
     */
    getGroupInvite(args: GetGroupInviteCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupInviteCommandOutput>;
    getGroupInvite(args: GetGroupInviteCommandInput, cb: (err: any, data?: GetGroupInviteCommandOutput) => void): void;
    getGroupInvite(args: GetGroupInviteCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupInviteCommandOutput) => void): void;
    /**
     * Returns a group's join requests. Must have valid permissions to view.
     */
    getGroupJoinRequests(args: GetGroupJoinRequestsCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupJoinRequestsCommandOutput>;
    getGroupJoinRequests(args: GetGroupJoinRequestsCommandInput, cb: (err: any, data?: GetGroupJoinRequestsCommandOutput) => void): void;
    getGroupJoinRequests(args: GetGroupJoinRequestsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupJoinRequestsCommandOutput) => void): void;
    /**
     * Returns a group's members.
     */
    getGroupMembers(args: GetGroupMembersCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupMembersCommandOutput>;
    getGroupMembers(args: GetGroupMembersCommandInput, cb: (err: any, data?: GetGroupMembersCommandOutput) => void): void;
    getGroupMembers(args: GetGroupMembersCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupMembersCommandOutput) => void): void;
    /**
     * Returns a group profile.
     */
    getGroupProfile(args: GetGroupProfileCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupProfileCommandOutput>;
    getGroupProfile(args: GetGroupProfileCommandInput, cb: (err: any, data?: GetGroupProfileCommandOutput) => void): void;
    getGroupProfile(args: GetGroupProfileCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupProfileCommandOutput) => void): void;
    getGroupSummary(args: GetGroupSummaryCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupSummaryCommandOutput>;
    getGroupSummary(args: GetGroupSummaryCommandInput, cb: (err: any, data?: GetGroupSummaryCommandOutput) => void): void;
    getGroupSummary(args: GetGroupSummaryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupSummaryCommandOutput) => void): void;
    /**
     * Kicks an identity from a group. Must be the owner of the group to perform this action.
     */
    kickGroupMember(args: KickGroupMemberCommandInput, options?: __HttpHandlerOptions): Promise<KickGroupMemberCommandOutput>;
    kickGroupMember(args: KickGroupMemberCommandInput, cb: (err: any, data?: KickGroupMemberCommandOutput) => void): void;
    kickGroupMember(args: KickGroupMemberCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: KickGroupMemberCommandOutput) => void): void;
    /**
     * Leaves a group.
     */
    leaveGroup(args: LeaveGroupCommandInput, options?: __HttpHandlerOptions): Promise<LeaveGroupCommandOutput>;
    leaveGroup(args: LeaveGroupCommandInput, cb: (err: any, data?: LeaveGroupCommandOutput) => void): void;
    leaveGroup(args: LeaveGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: LeaveGroupCommandOutput) => void): void;
    /**
     * Returns a list of suggested groups.
     */
    listSuggestedGroups(args: ListSuggestedGroupsCommandInput, options?: __HttpHandlerOptions): Promise<ListSuggestedGroupsCommandOutput>;
    listSuggestedGroups(args: ListSuggestedGroupsCommandInput, cb: (err: any, data?: ListSuggestedGroupsCommandOutput) => void): void;
    listSuggestedGroups(args: ListSuggestedGroupsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListSuggestedGroupsCommandOutput) => void): void;
    /**
     * Prepares an avatar image upload.
     *
     * Complete upload with `rivet.api.group#CompleteGroupAvatarUpload`.
     */
    prepareGroupAvatarUpload(args: PrepareGroupAvatarUploadCommandInput, options?: __HttpHandlerOptions): Promise<PrepareGroupAvatarUploadCommandOutput>;
    prepareGroupAvatarUpload(args: PrepareGroupAvatarUploadCommandInput, cb: (err: any, data?: PrepareGroupAvatarUploadCommandOutput) => void): void;
    prepareGroupAvatarUpload(args: PrepareGroupAvatarUploadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PrepareGroupAvatarUploadCommandOutput) => void): void;
    /**
     * Resolves a join request for a given group.
     */
    resolveGroupJoinRequest(args: ResolveGroupJoinRequestCommandInput, options?: __HttpHandlerOptions): Promise<ResolveGroupJoinRequestCommandOutput>;
    resolveGroupJoinRequest(args: ResolveGroupJoinRequestCommandInput, cb: (err: any, data?: ResolveGroupJoinRequestCommandOutput) => void): void;
    resolveGroupJoinRequest(args: ResolveGroupJoinRequestCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ResolveGroupJoinRequestCommandOutput) => void): void;
    /**
     * Fuzzy search for groups.
     */
    searchGroups(args: SearchGroupsCommandInput, options?: __HttpHandlerOptions): Promise<SearchGroupsCommandOutput>;
    searchGroups(args: SearchGroupsCommandInput, cb: (err: any, data?: SearchGroupsCommandOutput) => void): void;
    searchGroups(args: SearchGroupsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SearchGroupsCommandOutput) => void): void;
    /**
     * Transfers ownership of a group to another identity.
     */
    transferGroupOwnership(args: TransferGroupOwnershipCommandInput, options?: __HttpHandlerOptions): Promise<TransferGroupOwnershipCommandOutput>;
    transferGroupOwnership(args: TransferGroupOwnershipCommandInput, cb: (err: any, data?: TransferGroupOwnershipCommandOutput) => void): void;
    transferGroupOwnership(args: TransferGroupOwnershipCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: TransferGroupOwnershipCommandOutput) => void): void;
    /**
     * Unbans an identity from a group. Must be the owner of the group to perform this action.
     */
    unbanGroupIdentity(args: UnbanGroupIdentityCommandInput, options?: __HttpHandlerOptions): Promise<UnbanGroupIdentityCommandOutput>;
    unbanGroupIdentity(args: UnbanGroupIdentityCommandInput, cb: (err: any, data?: UnbanGroupIdentityCommandOutput) => void): void;
    unbanGroupIdentity(args: UnbanGroupIdentityCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UnbanGroupIdentityCommandOutput) => void): void;
    updateGroupProfile(args: UpdateGroupProfileCommandInput, options?: __HttpHandlerOptions): Promise<UpdateGroupProfileCommandOutput>;
    updateGroupProfile(args: UpdateGroupProfileCommandInput, cb: (err: any, data?: UpdateGroupProfileCommandOutput) => void): void;
    updateGroupProfile(args: UpdateGroupProfileCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateGroupProfileCommandOutput) => void): void;
    /**
     * Validate contents of group profile.
     *
     * Use to provide immediate feedback on profile changes before committing them.
     */
    validateGroupProfile(args: ValidateGroupProfileCommandInput, options?: __HttpHandlerOptions): Promise<ValidateGroupProfileCommandOutput>;
    validateGroupProfile(args: ValidateGroupProfileCommandInput, cb: (err: any, data?: ValidateGroupProfileCommandOutput) => void): void;
    validateGroupProfile(args: ValidateGroupProfileCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ValidateGroupProfileCommandOutput) => void): void;
}
