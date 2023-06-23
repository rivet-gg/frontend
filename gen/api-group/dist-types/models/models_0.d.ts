import { GroupServiceServiceException as __BaseException } from "./GroupServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";
export interface BanGroupIdentityInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
}
export declare namespace BanGroupIdentityInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: BanGroupIdentityInput) => any;
}
export interface BanGroupIdentityOutput {
}
export declare namespace BanGroupIdentityOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: BanGroupIdentityOutput) => any;
}
export interface CompleteGroupAvatarUploadInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * A universally unique identifier.
     */
    uploadId: string | undefined;
}
export declare namespace CompleteGroupAvatarUploadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteGroupAvatarUploadInput) => any;
}
export interface CompleteGroupAvatarUploadOutput {
}
export declare namespace CompleteGroupAvatarUploadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteGroupAvatarUploadOutput) => any;
}
export interface ConsumeGroupInviteInput {
    /**
     * Provided by `rivet.api.group#CreateGroupInviteOutput$code`.
     */
    groupInviteCode: string | undefined;
}
export declare namespace ConsumeGroupInviteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ConsumeGroupInviteInput) => any;
}
export interface ConsumeGroupInviteOutput {
    /**
     * A universally unique identifier.
     */
    groupId?: string;
}
export declare namespace ConsumeGroupInviteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ConsumeGroupInviteOutput) => any;
}
export interface CreateGroupInput {
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
}
export declare namespace CreateGroupInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGroupInput) => any;
}
export interface CreateGroupOutput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
}
export declare namespace CreateGroupOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGroupOutput) => any;
}
export interface CreateGroupInviteInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * How long until the group invite expires (in milliseconds).
     */
    ttl?: number;
    /**
     * How many times the group invite can be used.
     */
    useCount?: number;
}
export declare namespace CreateGroupInviteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGroupInviteInput) => any;
}
export interface CreateGroupInviteOutput {
    /**
     * The code that will be passed to `rivet.api.group#ConsumeGroupInvite` to join a group.
     */
    code: string | undefined;
}
export declare namespace CreateGroupInviteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGroupInviteOutput) => any;
}
export interface CreateGroupJoinRequestInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
}
export declare namespace CreateGroupJoinRequestInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGroupJoinRequestInput) => any;
}
export interface CreateGroupJoinRequestOutput {
}
export declare namespace CreateGroupJoinRequestOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGroupJoinRequestOutput) => any;
}
export interface GetGroupBansInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * The pagination anchor. Set to the returned anchor of this endpoint to receive the next set of items.
     */
    anchor?: string;
    /**
     * Amount of bans to return.
     */
    count?: number;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetGroupBansInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupBansInput) => any;
}
/**
 * External links for an identity.
 */
export interface IdentityExternalLinks {
    /**
     * A link to this identity's profile page.
     */
    profile: string | undefined;
    /**
     * A link to the Rivet settings page.
     */
    settings?: string;
    /**
     * A link to a chat page with the given identity.
     */
    chat?: string;
}
export declare namespace IdentityExternalLinks {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: IdentityExternalLinks) => any;
}
/**
 * A party activity denoting that the party is idle.
 */
export interface PartyActivityIdle {
}
export declare namespace PartyActivityIdle {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyActivityIdle) => any;
}
/**
 * A game handle.
 */
export interface GameHandle {
    /**
     * A universally unique identifier.
     */
    gameId: string | undefined;
    /**
     * A human readable short identifier used to references resources.
     *
     * Different than a `rivet.common#Uuid` because this is intended to be human readable.
     *
     * Different than `rivet.common#DisplayName` because this should not include special
     * characters and be short.
     */
    nameId: string | undefined;
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
    /**
     * The URL of this game's logo image.
     */
    logoUrl?: string;
    /**
     * The URL of this game's banner image.
     */
    bannerUrl?: string;
}
export declare namespace GameHandle {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameHandle) => any;
}
/**
 * A party activity denoting that the party is currently searching for a lobby.
 */
export interface PartyActivityMatchmakerFindingLobby {
    /**
     * A game handle.
     */
    game: GameHandle | undefined;
}
export declare namespace PartyActivityMatchmakerFindingLobby {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyActivityMatchmakerFindingLobby) => any;
}
/**
 * A party lobby.
 */
export interface PartyMatchmakerLobby {
    /**
     * A universally unique identifier.
     */
    lobbyId: string | undefined;
}
export declare namespace PartyMatchmakerLobby {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyMatchmakerLobby) => any;
}
/**
 * A party activity denoting that the party is currently in a lobby.
 */
export interface PartyActivityMatchmakerLobby {
    /**
     * A party lobby.
     */
    lobby: PartyMatchmakerLobby | undefined;
    /**
     * A game handle.
     */
    game: GameHandle | undefined;
}
export declare namespace PartyActivityMatchmakerLobby {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyActivityMatchmakerLobby) => any;
}
/**
 * A union representing the activity of a given party.
 * -   `Idle`: The party is not doing anything. For example, the leader is sitting in the game menu or the players are hanging out on the hub.
 * -   `MatchmakerFindingLobby`: There is a find request in progress for the lobby. If the find request fails, it will go back to `Idle`. If the find request succeeds, it will go to `MatchmakerLobby`.
 * -   `MatchmakerLobby`: The party is in a lobby. This does not mean that all of the party members are in the lobby, see the member-specific states.
 */
export declare type PartyActivity = PartyActivity.IdleMember | PartyActivity.MatchmakerFindingLobbyMember | PartyActivity.MatchmakerLobbyMember | PartyActivity.$UnknownMember;
export declare namespace PartyActivity {
    /**
     * A party activity denoting that the party is idle.
     */
    interface IdleMember {
        idle: PartyActivityIdle;
        matchmakerFindingLobby?: never;
        matchmakerLobby?: never;
        $unknown?: never;
    }
    /**
     * A party activity denoting that the party is currently searching for a lobby.
     */
    interface MatchmakerFindingLobbyMember {
        idle?: never;
        matchmakerFindingLobby: PartyActivityMatchmakerFindingLobby;
        matchmakerLobby?: never;
        $unknown?: never;
    }
    /**
     * A party activity denoting that the party is currently in a lobby.
     */
    interface MatchmakerLobbyMember {
        idle?: never;
        matchmakerFindingLobby?: never;
        matchmakerLobby: PartyActivityMatchmakerLobby;
        $unknown?: never;
    }
    interface $UnknownMember {
        idle?: never;
        matchmakerFindingLobby?: never;
        matchmakerLobby?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        idle: (value: PartyActivityIdle) => T;
        matchmakerFindingLobby: (value: PartyActivityMatchmakerFindingLobby) => T;
        matchmakerLobby: (value: PartyActivityMatchmakerLobby) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: PartyActivity, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyActivity) => any;
}
/**
 * External links for a party.
 */
export interface PartyExternalLinks {
    /**
     * A link to the given party's chat thread.
     */
    chat: string | undefined;
}
export declare namespace PartyExternalLinks {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyExternalLinks) => any;
}
/**
 * A party handle.
 */
export interface PartyHandle {
    /**
     * A universally unique identifier.
     */
    partyId: string | undefined;
    /**
     * RFC3339 timestamp.
     */
    createTs: Date | undefined;
    /**
     * A union representing the activity of a given party.
     * -   `Idle`: The party is not doing anything. For example, the leader is sitting in the game menu or the players are hanging out on the hub.
     * -   `MatchmakerFindingLobby`: There is a find request in progress for the lobby. If the find request fails, it will go back to `Idle`. If the find request succeeds, it will go to `MatchmakerLobby`.
     * -   `MatchmakerLobby`: The party is in a lobby. This does not mean that all of the party members are in the lobby, see the member-specific states.
     */
    activity: PartyActivity | undefined;
    /**
     * External links for a party.
     */
    external: PartyExternalLinks | undefined;
}
export declare namespace PartyHandle {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyHandle) => any;
}
/**
 * The game an identity is currently participating in.
 */
export interface IdentityGameActivity {
    /**
     * A game handle.
     */
    game: GameHandle | undefined;
    /**
     * A short activity message about the current game activity.
     */
    message: string | undefined;
    /**
     * JSON data seen by anyone.
     */
    publicMetadata?: __DocumentType;
    /**
     * JSON data seen only by the given identity and their mutual followers.
     */
    mutualMetadata?: __DocumentType;
}
export declare namespace IdentityGameActivity {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: IdentityGameActivity) => any;
}
export declare enum IdentityStatus {
    AWAY = "away",
    OFFLINE = "offline",
    ONLINE = "online"
}
/**
 * Information about the identity's current status, party, and active game.
 */
export interface IdentityPresence {
    /**
     * RFC3339 timestamp.
     */
    updateTs: Date | undefined;
    /**
     * The current status of an identity. This helps players understand if another
     * player is currently playing or has their game in the background.
     */
    status: IdentityStatus | string | undefined;
    /**
     * The game an identity is currently participating in.
     */
    gameActivity?: IdentityGameActivity;
}
export declare namespace IdentityPresence {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: IdentityPresence) => any;
}
/**
 * An identity handle.
 */
export interface IdentityHandle {
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
    /**
     * Identity profile account number (#1234).
     *
     * These are assigned in addition to an identity's display name in order to
     * allow multiple identities to have the same display name while still
     * providing a unique handle.
     *
     * These are unique to each display name; you can have multiple accounts with
     * different display names and the same account number.
     */
    accountNumber: number | undefined;
    /**
     * The URL of this identity's avatar image.
     */
    avatarUrl: string | undefined;
    /**
     * Information about the identity's current status, party, and active game.
     */
    presence?: IdentityPresence;
    /**
     * A party handle.
     */
    party?: PartyHandle;
    /**
     * Whether or not this identity is registered with a linked account.
     */
    isRegistered: boolean | undefined;
    /**
     * External links for an identity.
     */
    external: IdentityExternalLinks | undefined;
}
export declare namespace IdentityHandle {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: IdentityHandle) => any;
}
/**
 * A banned identity.
 */
export interface GroupBannedIdentity {
    /**
     * An identity handle.
     */
    identity: IdentityHandle | undefined;
    /**
     * RFC3339 timestamp.
     */
    banTs: Date | undefined;
}
export declare namespace GroupBannedIdentity {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupBannedIdentity) => any;
}
/**
 * Provided by watchable endpoints used in blocking loops.
 */
export interface WatchResponse {
    /**
     * Index indicating the version of the data responded.
     *
     * Pas this to `rivet.common#WatchQuery` to block and wait for the next response.
     */
    index: string | undefined;
}
export declare namespace WatchResponse {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: WatchResponse) => any;
}
export interface GetGroupBansOutput {
    /**
     * A list of banned group members.
     */
    bannedIdentities: (GroupBannedIdentity)[] | undefined;
    /**
     * The pagination anchor.
     */
    anchor?: string;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetGroupBansOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupBansOutput) => any;
}
export interface GetGroupInviteInput {
    /**
     * Provided by `rivet.api.group#CreateGroupInviteOutput$code`.
     */
    groupInviteCode: string | undefined;
}
export declare namespace GetGroupInviteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupInviteInput) => any;
}
/**
 * External links for this group.
 */
export interface GroupExternalLinks {
    /**
     * A link to this group's profile page.
     */
    profile: string | undefined;
    /**
     * A link to this group's chat page.
     */
    chat: string | undefined;
}
export declare namespace GroupExternalLinks {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupExternalLinks) => any;
}
/**
 * A group handle.
 */
export interface GroupHandle {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
    /**
     * The URL of this group's avatar image.
     */
    avatarUrl?: string;
    /**
     * External links for this group.
     */
    external: GroupExternalLinks | undefined;
    /**
     * Whether or not this group is a developer group.
     */
    isDeveloper?: boolean;
}
export declare namespace GroupHandle {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupHandle) => any;
}
export interface GetGroupInviteOutput {
    /**
     * A group handle.
     */
    group: GroupHandle | undefined;
}
export declare namespace GetGroupInviteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupInviteOutput) => any;
}
export interface GetGroupJoinRequestsInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * The pagination anchor. Set to the returned anchor of this endpoint to receive the next set of items.
     */
    anchor?: string;
    /**
     * Amount of join requests to return.
     */
    count?: number;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetGroupJoinRequestsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupJoinRequestsInput) => any;
}
/**
 * A group join request.
 */
export interface GroupJoinRequest {
    /**
     * An identity handle.
     */
    identity: IdentityHandle | undefined;
    /**
     * RFC3339 timestamp.
     */
    ts: Date | undefined;
}
export declare namespace GroupJoinRequest {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupJoinRequest) => any;
}
export interface GetGroupJoinRequestsOutput {
    /**
     * A list of group join requests.
     */
    joinRequests: (GroupJoinRequest)[] | undefined;
    /**
     * The pagination anchor.
     */
    anchor?: string;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetGroupJoinRequestsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupJoinRequestsOutput) => any;
}
export interface GetGroupMembersInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * The pagination anchor. Set to the returned anchor of this endpoint to receive the next set of items.
     */
    anchor?: string;
    /**
     * Amount of members to return.
     */
    count?: number;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetGroupMembersInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupMembersInput) => any;
}
/**
 * A group member.
 */
export interface GroupMember {
    /**
     * An identity handle.
     */
    identity: IdentityHandle | undefined;
}
export declare namespace GroupMember {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupMember) => any;
}
export interface GetGroupMembersOutput {
    /**
     * A list of group members.
     */
    members: (GroupMember)[] | undefined;
    /**
     * The pagination anchor.
     */
    anchor?: string;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetGroupMembersOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupMembersOutput) => any;
}
export interface GetGroupProfileInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetGroupProfileInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupProfileInput) => any;
}
export declare enum GroupPublicity {
    CLOSED = "closed",
    OPEN = "open"
}
/**
 * A list of group profiles.
 */
export interface GroupProfile {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
    /**
     * The URL of this group's avatar image.
     */
    avatarUrl?: string;
    /**
     * External links for this group.
     */
    external: GroupExternalLinks | undefined;
    /**
     * Whether or not this group is a developer.
     */
    isDeveloper: boolean | undefined;
    /**
     * Detailed information about a profile.
     */
    bio: string | undefined;
    /**
     * Whether or not the current identity is a member of this group.
     */
    isCurrentIdentityMember: boolean | undefined;
    /**
     * The current publicity value for the given group.
     */
    publicity: GroupPublicity | string | undefined;
    /**
     * Unsigned 32 bit integer.
     */
    memberCount: number | undefined;
    /**
     * A universally unique identifier.
     */
    ownerIdentityId: string | undefined;
    /**
     * @deprecated
     *
     * A list of group members.
     */
    members: (GroupMember)[] | undefined;
    /**
     * @deprecated
     *
     * A list of group join requests.
     */
    joinRequests: (GroupJoinRequest)[] | undefined;
    /**
     * Whether or not the current identity is currently requesting to join this group.
     */
    isCurrentIdentityRequestingJoin: boolean | undefined;
    /**
     * A universally unique identifier.
     */
    threadId?: string;
}
export declare namespace GroupProfile {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupProfile) => any;
}
export interface GetGroupProfileOutput {
    /**
     * A list of group profiles.
     */
    group: GroupProfile | undefined;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetGroupProfileOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupProfileOutput) => any;
}
export interface GetGroupSummaryInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
}
export declare namespace GetGroupSummaryInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupSummaryInput) => any;
}
/**
 * A group summary.
 */
export interface GroupSummary {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
    /**
     * The URL of this group's avatar image.
     */
    avatarUrl?: string;
    /**
     * External links for this group.
     */
    external: GroupExternalLinks | undefined;
    /**
     * Whether or not this group is a developer.
     */
    isDeveloper: boolean | undefined;
    /**
     * Detailed information about a profile.
     */
    bio: string | undefined;
    /**
     * Whether or not the current identity is a member of this group.
     */
    isCurrentIdentityMember: boolean | undefined;
    /**
     * The current publicity value for the given group.
     */
    publicity: GroupPublicity | string | undefined;
    /**
     * Unsigned 32 bit integer.
     */
    memberCount: number | undefined;
    /**
     * A universally unique identifier.
     */
    ownerIdentityId: string | undefined;
}
export declare namespace GroupSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupSummary) => any;
}
export interface GetGroupSummaryOutput {
    /**
     * A group summary.
     */
    group: GroupSummary | undefined;
}
export declare namespace GetGroupSummaryOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupSummaryOutput) => any;
}
export interface KickGroupMemberInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
}
export declare namespace KickGroupMemberInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: KickGroupMemberInput) => any;
}
export interface KickGroupMemberOutput {
}
export declare namespace KickGroupMemberOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: KickGroupMemberOutput) => any;
}
export interface LeaveGroupInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
}
export declare namespace LeaveGroupInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LeaveGroupInput) => any;
}
export interface LeaveGroupOutput {
}
export declare namespace LeaveGroupOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LeaveGroupOutput) => any;
}
export interface ListSuggestedGroupsInput {
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace ListSuggestedGroupsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListSuggestedGroupsInput) => any;
}
export interface ListSuggestedGroupsOutput {
    /**
     * A list of group summaries.
     */
    groups: (GroupSummary)[] | undefined;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace ListSuggestedGroupsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListSuggestedGroupsOutput) => any;
}
export interface PrepareGroupAvatarUploadInput {
    /**
     * The path/filename of the group avatar.
     */
    path: string | undefined;
    /**
     * The MIME type of the group avatar.
     */
    mime?: string;
    /**
     * Unsigned 64 bit integer.
     */
    contentLength: number | undefined;
}
export declare namespace PrepareGroupAvatarUploadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PrepareGroupAvatarUploadInput) => any;
}
/**
 * A presigned request used to upload files. Upload your file to the given URL via a PUT request.
 */
export interface UploadPresignedRequest {
    /**
     * The name of the file to upload. This is the same as the one given in the upload prepare file.
     */
    path: string | undefined;
    /**
     * The URL of the presigned request for which to upload your file to.
     */
    url: string | undefined;
}
export declare namespace UploadPresignedRequest {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UploadPresignedRequest) => any;
}
export interface PrepareGroupAvatarUploadOutput {
    /**
     * A universally unique identifier.
     */
    uploadId: string | undefined;
    /**
     * A presigned request used to upload files. Upload your file to the given URL via a PUT request.
     */
    presignedRequest: UploadPresignedRequest | undefined;
}
export declare namespace PrepareGroupAvatarUploadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PrepareGroupAvatarUploadOutput) => any;
}
export interface SearchGroupsInput {
    /**
     * The query to match group display names against.
     */
    query: string | undefined;
    anchor?: string;
    /**
     * Unsigned 32 bit integer.
     */
    limit?: number;
}
export declare namespace SearchGroupsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SearchGroupsInput) => any;
}
export interface SearchGroupsOutput {
    /**
     * A list of group handles.
     */
    groups: (GroupHandle)[] | undefined;
    anchor?: string;
}
export declare namespace SearchGroupsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SearchGroupsOutput) => any;
}
export interface TransferGroupOwnershipInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * Idnetity to transfer the group to.
     *
     * Must be a member of the group.
     */
    newOwnerIdentityId: string | undefined;
}
export declare namespace TransferGroupOwnershipInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: TransferGroupOwnershipInput) => any;
}
export interface TransferGroupOwnershipOutput {
}
export declare namespace TransferGroupOwnershipOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: TransferGroupOwnershipOutput) => any;
}
export interface UnbanGroupIdentityInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
}
export declare namespace UnbanGroupIdentityInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UnbanGroupIdentityInput) => any;
}
export interface UnbanGroupIdentityOutput {
}
export declare namespace UnbanGroupIdentityOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UnbanGroupIdentityOutput) => any;
}
export interface UpdateGroupProfileInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * Represent a resource's readable display name.
     */
    displayName?: string;
    /**
     * Detailed information about a profile.
     */
    bio?: string;
    /**
     * The current publicity value for the given group.
     */
    publicity?: GroupPublicity | string;
}
export declare namespace UpdateGroupProfileInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateGroupProfileInput) => any;
}
export interface UpdateGroupProfileOutput {
}
export declare namespace UpdateGroupProfileOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateGroupProfileOutput) => any;
}
export interface ValidateGroupProfileInput {
    /**
     * Represent a resource's readable display name.
     */
    displayName?: string;
    /**
     * Detailed information about a profile.
     */
    bio?: string;
    /**
     * The current publicity value for the given group.
     */
    publicity?: GroupPublicity | string;
}
export declare namespace ValidateGroupProfileInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGroupProfileInput) => any;
}
/**
 * An error given by failed content validation.
 */
export interface ValidationError {
    /**
     * A list of strings denoting the origin of a validation error.
     */
    path: (string)[] | undefined;
}
export declare namespace ValidationError {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidationError) => any;
}
export interface ValidateGroupProfileOutput {
    /**
     * A list of validation errors.
     */
    errors: (ValidationError)[] | undefined;
}
export declare namespace ValidateGroupProfileOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGroupProfileOutput) => any;
}
export interface ResolveGroupJoinRequestInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
    resolution: boolean | undefined;
}
export declare namespace ResolveGroupJoinRequestInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ResolveGroupJoinRequestInput) => any;
}
export interface ResolveGroupJoinRequestOutput {
}
export declare namespace ResolveGroupJoinRequestOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ResolveGroupJoinRequestOutput) => any;
}
/**
 * An error thrown when the requestee has sent an invalid or malformed request.
 */
export declare class BadRequestError extends __BaseException {
    readonly name: "BadRequestError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<BadRequestError, __BaseException>);
}
/**
 * An error thrown when the requestee requests a resource they do not have access to.
 */
export declare class ForbiddenError extends __BaseException {
    readonly name: "ForbiddenError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ForbiddenError, __BaseException>);
}
/**
 * An error caused by internal server problems.
 */
export declare class InternalError extends __BaseException {
    readonly name: "InternalError";
    readonly $fault: "server";
    $retryable: {};
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InternalError, __BaseException>);
}
/**
 * An error thrown when the requestee requests a non existant resource.
 */
export declare class NotFoundError extends __BaseException {
    readonly name: "NotFoundError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NotFoundError, __BaseException>);
}
/**
 * An error thrown when the requestee has hit a rate limit. You are sending too many requests too quickly.
 */
export declare class RateLimitError extends __BaseException {
    readonly name: "RateLimitError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<RateLimitError, __BaseException>);
}
/**
 * An error thrown when the requestee is not authenticated.
 */
export declare class UnauthorizedError extends __BaseException {
    readonly name: "UnauthorizedError";
    readonly $fault: "client";
    $retryable: {};
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<UnauthorizedError, __BaseException>);
}
