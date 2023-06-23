// smithy-typescript generated code
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

export namespace BanGroupIdentityInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: BanGroupIdentityInput): any => ({
    ...obj,
  })
}

export interface BanGroupIdentityOutput {
}

export namespace BanGroupIdentityOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: BanGroupIdentityOutput): any => ({
    ...obj,
  })
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

export namespace CompleteGroupAvatarUploadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteGroupAvatarUploadInput): any => ({
    ...obj,
  })
}

export interface CompleteGroupAvatarUploadOutput {
}

export namespace CompleteGroupAvatarUploadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteGroupAvatarUploadOutput): any => ({
    ...obj,
  })
}

export interface ConsumeGroupInviteInput {
  /**
   * Provided by `rivet.api.group#CreateGroupInviteOutput$code`.
   */
  groupInviteCode: string | undefined;
}

export namespace ConsumeGroupInviteInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ConsumeGroupInviteInput): any => ({
    ...obj,
  })
}

export interface ConsumeGroupInviteOutput {
  /**
   * A universally unique identifier.
   */
  groupId?: string;
}

export namespace ConsumeGroupInviteOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ConsumeGroupInviteOutput): any => ({
    ...obj,
  })
}

export interface CreateGroupInput {
  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;
}

export namespace CreateGroupInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGroupInput): any => ({
    ...obj,
  })
}

export interface CreateGroupOutput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace CreateGroupOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGroupOutput): any => ({
    ...obj,
  })
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

export namespace CreateGroupInviteInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGroupInviteInput): any => ({
    ...obj,
  })
}

export interface CreateGroupInviteOutput {
  /**
   * The code that will be passed to `rivet.api.group#ConsumeGroupInvite` to join a group.
   */
  code: string | undefined;
}

export namespace CreateGroupInviteOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGroupInviteOutput): any => ({
    ...obj,
  })
}

export interface CreateGroupJoinRequestInput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace CreateGroupJoinRequestInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGroupJoinRequestInput): any => ({
    ...obj,
  })
}

export interface CreateGroupJoinRequestOutput {
}

export namespace CreateGroupJoinRequestOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGroupJoinRequestOutput): any => ({
    ...obj,
  })
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

export namespace GetGroupBansInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupBansInput): any => ({
    ...obj,
  })
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

export namespace IdentityExternalLinks {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: IdentityExternalLinks): any => ({
    ...obj,
  })
}

/**
 * A party activity denoting that the party is idle.
 */
export interface PartyActivityIdle {
}

export namespace PartyActivityIdle {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PartyActivityIdle): any => ({
    ...obj,
  })
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

export namespace GameHandle {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameHandle): any => ({
    ...obj,
  })
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

export namespace PartyActivityMatchmakerFindingLobby {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PartyActivityMatchmakerFindingLobby): any => ({
    ...obj,
  })
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

export namespace PartyMatchmakerLobby {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PartyMatchmakerLobby): any => ({
    ...obj,
  })
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

export namespace PartyActivityMatchmakerLobby {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PartyActivityMatchmakerLobby): any => ({
    ...obj,
  })
}

/**
 * A union representing the activity of a given party.
 * -   `Idle`: The party is not doing anything. For example, the leader is sitting in the game menu or the players are hanging out on the hub.
 * -   `MatchmakerFindingLobby`: There is a find request in progress for the lobby. If the find request fails, it will go back to `Idle`. If the find request succeeds, it will go to `MatchmakerLobby`.
 * -   `MatchmakerLobby`: The party is in a lobby. This does not mean that all of the party members are in the lobby, see the member-specific states.
 */
export type PartyActivity =
  | PartyActivity.IdleMember
  | PartyActivity.MatchmakerFindingLobbyMember
  | PartyActivity.MatchmakerLobbyMember
  | PartyActivity.$UnknownMember

export namespace PartyActivity {

  /**
   * A party activity denoting that the party is idle.
   */
  export interface IdleMember {
    idle: PartyActivityIdle;
    matchmakerFindingLobby?: never;
    matchmakerLobby?: never;
    $unknown?: never;
  }

  /**
   * A party activity denoting that the party is currently searching for a lobby.
   */
  export interface MatchmakerFindingLobbyMember {
    idle?: never;
    matchmakerFindingLobby: PartyActivityMatchmakerFindingLobby;
    matchmakerLobby?: never;
    $unknown?: never;
  }

  /**
   * A party activity denoting that the party is currently in a lobby.
   */
  export interface MatchmakerLobbyMember {
    idle?: never;
    matchmakerFindingLobby?: never;
    matchmakerLobby: PartyActivityMatchmakerLobby;
    $unknown?: never;
  }

  export interface $UnknownMember {
    idle?: never;
    matchmakerFindingLobby?: never;
    matchmakerLobby?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    idle: (value: PartyActivityIdle) => T;
    matchmakerFindingLobby: (value: PartyActivityMatchmakerFindingLobby) => T;
    matchmakerLobby: (value: PartyActivityMatchmakerLobby) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: PartyActivity,
    visitor: Visitor<T>
  ): T => {
    if (value.idle !== undefined) return visitor.idle(value.idle);
    if (value.matchmakerFindingLobby !== undefined) return visitor.matchmakerFindingLobby(value.matchmakerFindingLobby);
    if (value.matchmakerLobby !== undefined) return visitor.matchmakerLobby(value.matchmakerLobby);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PartyActivity): any => {
    if (obj.idle !== undefined) return {idle:
      PartyActivityIdle.filterSensitiveLog(obj.idle)
    };
    if (obj.matchmakerFindingLobby !== undefined) return {matchmakerFindingLobby:
      PartyActivityMatchmakerFindingLobby.filterSensitiveLog(obj.matchmakerFindingLobby)
    };
    if (obj.matchmakerLobby !== undefined) return {matchmakerLobby:
      PartyActivityMatchmakerLobby.filterSensitiveLog(obj.matchmakerLobby)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
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

export namespace PartyExternalLinks {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PartyExternalLinks): any => ({
    ...obj,
  })
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

export namespace PartyHandle {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PartyHandle): any => ({
    ...obj,
    ...(obj.activity && { activity:
      PartyActivity.filterSensitiveLog(obj.activity)
    }),
  })
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

export namespace IdentityGameActivity {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: IdentityGameActivity): any => ({
    ...obj,
  })
}

export enum IdentityStatus {
  AWAY = "away",
  OFFLINE = "offline",
  ONLINE = "online",
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

export namespace IdentityPresence {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: IdentityPresence): any => ({
    ...obj,
  })
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

export namespace IdentityHandle {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: IdentityHandle): any => ({
    ...obj,
    ...(obj.party && { party:
      PartyHandle.filterSensitiveLog(obj.party)
    }),
  })
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

export namespace GroupBannedIdentity {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupBannedIdentity): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
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

export namespace WatchResponse {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: WatchResponse): any => ({
    ...obj,
  })
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

export namespace GetGroupBansOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupBansOutput): any => ({
    ...obj,
    ...(obj.bannedIdentities && { bannedIdentities:
      obj.bannedIdentities.map(
        item =>
        GroupBannedIdentity.filterSensitiveLog(item)
      )
    }),
  })
}

export interface GetGroupInviteInput {
  /**
   * Provided by `rivet.api.group#CreateGroupInviteOutput$code`.
   */
  groupInviteCode: string | undefined;
}

export namespace GetGroupInviteInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupInviteInput): any => ({
    ...obj,
  })
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

export namespace GroupExternalLinks {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupExternalLinks): any => ({
    ...obj,
  })
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

export namespace GroupHandle {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupHandle): any => ({
    ...obj,
  })
}

export interface GetGroupInviteOutput {
  /**
   * A group handle.
   */
  group: GroupHandle | undefined;
}

export namespace GetGroupInviteOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupInviteOutput): any => ({
    ...obj,
  })
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

export namespace GetGroupJoinRequestsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupJoinRequestsInput): any => ({
    ...obj,
  })
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

export namespace GroupJoinRequest {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupJoinRequest): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
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

export namespace GetGroupJoinRequestsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupJoinRequestsOutput): any => ({
    ...obj,
    ...(obj.joinRequests && { joinRequests:
      obj.joinRequests.map(
        item =>
        GroupJoinRequest.filterSensitiveLog(item)
      )
    }),
  })
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

export namespace GetGroupMembersInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupMembersInput): any => ({
    ...obj,
  })
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

export namespace GroupMember {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupMember): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
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

export namespace GetGroupMembersOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupMembersOutput): any => ({
    ...obj,
    ...(obj.members && { members:
      obj.members.map(
        item =>
        GroupMember.filterSensitiveLog(item)
      )
    }),
  })
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

export namespace GetGroupProfileInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupProfileInput): any => ({
    ...obj,
  })
}

export enum GroupPublicity {
  CLOSED = "closed",
  OPEN = "open",
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

export namespace GroupProfile {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupProfile): any => ({
    ...obj,
    ...(obj.members && { members:
      obj.members.map(
        item =>
        GroupMember.filterSensitiveLog(item)
      )
    }),
    ...(obj.joinRequests && { joinRequests:
      obj.joinRequests.map(
        item =>
        GroupJoinRequest.filterSensitiveLog(item)
      )
    }),
  })
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

export namespace GetGroupProfileOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupProfileOutput): any => ({
    ...obj,
    ...(obj.group && { group:
      GroupProfile.filterSensitiveLog(obj.group)
    }),
  })
}

export interface GetGroupSummaryInput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace GetGroupSummaryInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupSummaryInput): any => ({
    ...obj,
  })
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

export namespace GroupSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupSummary): any => ({
    ...obj,
  })
}

export interface GetGroupSummaryOutput {
  /**
   * A group summary.
   */
  group: GroupSummary | undefined;
}

export namespace GetGroupSummaryOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupSummaryOutput): any => ({
    ...obj,
  })
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

export namespace KickGroupMemberInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: KickGroupMemberInput): any => ({
    ...obj,
  })
}

export interface KickGroupMemberOutput {
}

export namespace KickGroupMemberOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: KickGroupMemberOutput): any => ({
    ...obj,
  })
}

export interface LeaveGroupInput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace LeaveGroupInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LeaveGroupInput): any => ({
    ...obj,
  })
}

export interface LeaveGroupOutput {
}

export namespace LeaveGroupOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LeaveGroupOutput): any => ({
    ...obj,
  })
}

export interface ListSuggestedGroupsInput {
  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;
}

export namespace ListSuggestedGroupsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListSuggestedGroupsInput): any => ({
    ...obj,
  })
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

export namespace ListSuggestedGroupsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListSuggestedGroupsOutput): any => ({
    ...obj,
  })
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

export namespace PrepareGroupAvatarUploadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PrepareGroupAvatarUploadInput): any => ({
    ...obj,
  })
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

export namespace UploadPresignedRequest {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UploadPresignedRequest): any => ({
    ...obj,
  })
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

export namespace PrepareGroupAvatarUploadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PrepareGroupAvatarUploadOutput): any => ({
    ...obj,
  })
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

export namespace SearchGroupsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SearchGroupsInput): any => ({
    ...obj,
  })
}

export interface SearchGroupsOutput {
  /**
   * A list of group handles.
   */
  groups: (GroupHandle)[] | undefined;

  anchor?: string;
}

export namespace SearchGroupsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SearchGroupsOutput): any => ({
    ...obj,
  })
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

export namespace TransferGroupOwnershipInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: TransferGroupOwnershipInput): any => ({
    ...obj,
  })
}

export interface TransferGroupOwnershipOutput {
}

export namespace TransferGroupOwnershipOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: TransferGroupOwnershipOutput): any => ({
    ...obj,
  })
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

export namespace UnbanGroupIdentityInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UnbanGroupIdentityInput): any => ({
    ...obj,
  })
}

export interface UnbanGroupIdentityOutput {
}

export namespace UnbanGroupIdentityOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UnbanGroupIdentityOutput): any => ({
    ...obj,
  })
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

export namespace UpdateGroupProfileInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateGroupProfileInput): any => ({
    ...obj,
  })
}

export interface UpdateGroupProfileOutput {
}

export namespace UpdateGroupProfileOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateGroupProfileOutput): any => ({
    ...obj,
  })
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

export namespace ValidateGroupProfileInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGroupProfileInput): any => ({
    ...obj,
  })
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

export namespace ValidationError {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidationError): any => ({
    ...obj,
  })
}

export interface ValidateGroupProfileOutput {
  /**
   * A list of validation errors.
   */
  errors: (ValidationError)[] | undefined;
}

export namespace ValidateGroupProfileOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGroupProfileOutput): any => ({
    ...obj,
  })
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

export namespace ResolveGroupJoinRequestInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ResolveGroupJoinRequestInput): any => ({
    ...obj,
  })
}

export interface ResolveGroupJoinRequestOutput {
}

export namespace ResolveGroupJoinRequestOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ResolveGroupJoinRequestOutput): any => ({
    ...obj,
  })
}

/**
 * An error thrown when the requestee has sent an invalid or malformed request.
 */
export class BadRequestError extends __BaseException {
  readonly name: "BadRequestError" = "BadRequestError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<BadRequestError, __BaseException>) {
    super({
      name: "BadRequestError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, BadRequestError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee requests a resource they do not have access to.
 */
export class ForbiddenError extends __BaseException {
  readonly name: "ForbiddenError" = "ForbiddenError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<ForbiddenError, __BaseException>) {
    super({
      name: "ForbiddenError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, ForbiddenError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error caused by internal server problems.
 */
export class InternalError extends __BaseException {
  readonly name: "InternalError" = "InternalError";
  readonly $fault: "server" = "server";
  $retryable = {
  };
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<InternalError, __BaseException>) {
    super({
      name: "InternalError",
      $fault: "server",
      ...opts
    });
    Object.setPrototypeOf(this, InternalError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee requests a non existant resource.
 */
export class NotFoundError extends __BaseException {
  readonly name: "NotFoundError" = "NotFoundError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<NotFoundError, __BaseException>) {
    super({
      name: "NotFoundError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee has hit a rate limit. You are sending too many requests too quickly.
 */
export class RateLimitError extends __BaseException {
  readonly name: "RateLimitError" = "RateLimitError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<RateLimitError, __BaseException>) {
    super({
      name: "RateLimitError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, RateLimitError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee is not authenticated.
 */
export class UnauthorizedError extends __BaseException {
  readonly name: "UnauthorizedError" = "UnauthorizedError";
  readonly $fault: "client" = "client";
  $retryable = {
  };
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<UnauthorizedError, __BaseException>) {
    super({
      name: "UnauthorizedError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}
