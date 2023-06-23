// smithy-typescript generated code
import { ChatServiceServiceException as __BaseException } from "./ChatServiceServiceException";
import {
  SENSITIVE_STRING,
  ExceptionOptionType as __ExceptionOptionType,
} from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";

export enum QueryDirection {
  /**
   * Query messages after given timestamp.
   */
  AFTER = "after",
  /**
   * Query messages send before given timestamp.
   */
  BEFORE = "before",
  /**
   * Query messages before and after the given timestamp. This will return at most `count * 2` messages.
   */
  BEFORE_AND_AFTER = "before_and_after",
}

export interface GetThreadHistoryInput {
  /**
   * A universally unique identifier.
   */
  threadId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  ts?: Date;

  /**
   * How many messages to collect in each direction.
   *
   * If querying `rivet.api.chat.common#QueryDirection$before_and_after`,
   * `rivet.api.chat.common#QueryDirection$chat_messages` will be `count *
   * 2`.
   */
  count: number | undefined;

  /**
   * Represents which direction to query messages from relative to the given
   * timestamp.
   */
  queryDirection?: QueryDirection | string;
}

export namespace GetThreadHistoryInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetThreadHistoryInput): any => ({
    ...obj,
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating a new chat was created.
 */
export interface ChatMessageBodyChatCreate {
}

export namespace ChatMessageBodyChatCreate {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyChatCreate): any => ({
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
 * `rivet.chat#ChatMessageBody` variant for deleted messages.
 */
export interface ChatMessageBodyDeleted {
  /**
   * An identity handle.
   */
  sender: IdentityHandle | undefined;
}

export namespace ChatMessageBodyDeleted {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyDeleted): any => ({
    ...obj,
    ...(obj.sender && { sender:
      IdentityHandle.filterSensitiveLog(obj.sender)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity joined the group.
 */
export interface ChatMessageBodyGroupJoin {
  /**
   * An identity handle.
   */
  identity: IdentityHandle | undefined;
}

export namespace ChatMessageBodyGroupJoin {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyGroupJoin): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity left the group.
 */
export interface ChatMessageBodyGroupLeave {
  /**
   * An identity handle.
   */
  identity: IdentityHandle | undefined;
}

export namespace ChatMessageBodyGroupLeave {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyGroupLeave): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity has been kicked from the group.
 */
export interface ChatMessageBodyGroupMemberKick {
  /**
   * An identity handle.
   */
  identity: IdentityHandle | undefined;
}

export namespace ChatMessageBodyGroupMemberKick {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyGroupMemberKick): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity followed the identity.
 */
export interface ChatMessageBodyIdentityFollow {
}

export namespace ChatMessageBodyIdentityFollow {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyIdentityFollow): any => ({
    ...obj,
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating a change in the party's current
 * activity.
 */
export interface ChatMessageBodyPartyActivityChange {
  /**
   * A union representing the activity of a given party.
   * -   `Idle`: The party is not doing anything. For example, the leader is sitting in the game menu or the players are hanging out on the hub.
   * -   `MatchmakerFindingLobby`: There is a find request in progress for the lobby. If the find request fails, it will go back to `Idle`. If the find request succeeds, it will go to `MatchmakerLobby`.
   * -   `MatchmakerLobby`: The party is in a lobby. This does not mean that all of the party members are in the lobby, see the member-specific states.
   */
  activity: PartyActivity | undefined;
}

export namespace ChatMessageBodyPartyActivityChange {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyPartyActivityChange): any => ({
    ...obj,
    ...(obj.activity && { activity:
      PartyActivity.filterSensitiveLog(obj.activity)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant holding an a party invitation.
 */
export interface ChatMessageBodyPartyInvite {
  /**
   * An identity handle.
   */
  sender: IdentityHandle | undefined;

  /**
   * A party handle.
   */
  party?: PartyHandle;

  /**
   * Pass to `rivet.api.party#GetPartyFromInvite$token` to view more information about the party.
   *
   * Pass to `rivet.api.party.common#JoinPartyInvite$token` to join the party.
   */
  inviteToken?: string;
}

export namespace ChatMessageBodyPartyInvite {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyPartyInvite): any => ({
    ...obj,
    ...(obj.sender && { sender:
      IdentityHandle.filterSensitiveLog(obj.sender)
    }),
    ...(obj.party && { party:
      PartyHandle.filterSensitiveLog(obj.party)
    }),
    ...(obj.inviteToken && { inviteToken:
      SENSITIVE_STRING
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity joined the party.
 */
export interface ChatMessageBodyPartyJoin {
  /**
   * An identity handle.
   */
  identity: IdentityHandle | undefined;
}

export namespace ChatMessageBodyPartyJoin {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyPartyJoin): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity requesting to join your party.
 */
export interface ChatMessageBodyPartyJoinRequest {
  /**
   * An identity handle.
   */
  sender: IdentityHandle | undefined;
}

export namespace ChatMessageBodyPartyJoinRequest {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyPartyJoinRequest): any => ({
    ...obj,
    ...(obj.sender && { sender:
      IdentityHandle.filterSensitiveLog(obj.sender)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity left the party.
 */
export interface ChatMessageBodyPartyLeave {
  /**
   * An identity handle.
   */
  identity: IdentityHandle | undefined;
}

export namespace ChatMessageBodyPartyLeave {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyPartyLeave): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
  })
}

/**
 * `rivet.chat#ChatMessageBody` variant for text messages.
 *
 * Sent by other identities using the chat interface.
 */
export interface ChatMessageBodyText {
  /**
   * An identity handle.
   */
  sender: IdentityHandle | undefined;

  /**
   * The text in the message.
   */
  body: string | undefined;
}

export namespace ChatMessageBodyText {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBodyText): any => ({
    ...obj,
    ...(obj.sender && { sender:
      IdentityHandle.filterSensitiveLog(obj.sender)
    }),
  })
}

/**
 * Represents types of chat message bodies.
 */
export type ChatMessageBody =
  | ChatMessageBody.ChatCreateMember
  | ChatMessageBody.DeletedMember
  | ChatMessageBody.GroupJoinMember
  | ChatMessageBody.GroupLeaveMember
  | ChatMessageBody.GroupMemberKickMember
  | ChatMessageBody.IdentityFollowMember
  | ChatMessageBody.PartyActivityChangeMember
  | ChatMessageBody.PartyInviteMember
  | ChatMessageBody.PartyJoinMember
  | ChatMessageBody.PartyJoinRequestMember
  | ChatMessageBody.PartyLeaveMember
  | ChatMessageBody.TextMember
  | ChatMessageBody.$UnknownMember

export namespace ChatMessageBody {

  /**
   * `rivet.chat#ChatMessageBody` variant for text messages.
   *
   * Sent by other identities using the chat interface.
   */
  export interface TextMember {
    text: ChatMessageBodyText;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating a new chat was created.
   */
  export interface ChatCreateMember {
    text?: never;
    chatCreate: ChatMessageBodyChatCreate;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for deleted messages.
   */
  export interface DeletedMember {
    text?: never;
    chatCreate?: never;
    deleted: ChatMessageBodyDeleted;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating an identity followed the identity.
   */
  export interface IdentityFollowMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow: ChatMessageBodyIdentityFollow;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating an identity joined the group.
   */
  export interface GroupJoinMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin: ChatMessageBodyGroupJoin;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating an identity left the group.
   */
  export interface GroupLeaveMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave: ChatMessageBodyGroupLeave;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating an identity has been kicked from the group.
   */
  export interface GroupMemberKickMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick: ChatMessageBodyGroupMemberKick;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant holding an a party invitation.
   */
  export interface PartyInviteMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite: ChatMessageBodyPartyInvite;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating an identity requesting to join your party.
   */
  export interface PartyJoinRequestMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest: ChatMessageBodyPartyJoinRequest;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating an identity joined the party.
   */
  export interface PartyJoinMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin: ChatMessageBodyPartyJoin;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating an identity left the party.
   */
  export interface PartyLeaveMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave: ChatMessageBodyPartyLeave;
    partyActivityChange?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatMessageBody` variant for indicating a change in the party's current
   * activity.
   */
  export interface PartyActivityChangeMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange: ChatMessageBodyPartyActivityChange;
    $unknown?: never;
  }

  export interface $UnknownMember {
    text?: never;
    chatCreate?: never;
    deleted?: never;
    identityFollow?: never;
    groupJoin?: never;
    groupLeave?: never;
    groupMemberKick?: never;
    partyInvite?: never;
    partyJoinRequest?: never;
    partyJoin?: never;
    partyLeave?: never;
    partyActivityChange?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    text: (value: ChatMessageBodyText) => T;
    chatCreate: (value: ChatMessageBodyChatCreate) => T;
    deleted: (value: ChatMessageBodyDeleted) => T;
    identityFollow: (value: ChatMessageBodyIdentityFollow) => T;
    groupJoin: (value: ChatMessageBodyGroupJoin) => T;
    groupLeave: (value: ChatMessageBodyGroupLeave) => T;
    groupMemberKick: (value: ChatMessageBodyGroupMemberKick) => T;
    partyInvite: (value: ChatMessageBodyPartyInvite) => T;
    partyJoinRequest: (value: ChatMessageBodyPartyJoinRequest) => T;
    partyJoin: (value: ChatMessageBodyPartyJoin) => T;
    partyLeave: (value: ChatMessageBodyPartyLeave) => T;
    partyActivityChange: (value: ChatMessageBodyPartyActivityChange) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: ChatMessageBody,
    visitor: Visitor<T>
  ): T => {
    if (value.text !== undefined) return visitor.text(value.text);
    if (value.chatCreate !== undefined) return visitor.chatCreate(value.chatCreate);
    if (value.deleted !== undefined) return visitor.deleted(value.deleted);
    if (value.identityFollow !== undefined) return visitor.identityFollow(value.identityFollow);
    if (value.groupJoin !== undefined) return visitor.groupJoin(value.groupJoin);
    if (value.groupLeave !== undefined) return visitor.groupLeave(value.groupLeave);
    if (value.groupMemberKick !== undefined) return visitor.groupMemberKick(value.groupMemberKick);
    if (value.partyInvite !== undefined) return visitor.partyInvite(value.partyInvite);
    if (value.partyJoinRequest !== undefined) return visitor.partyJoinRequest(value.partyJoinRequest);
    if (value.partyJoin !== undefined) return visitor.partyJoin(value.partyJoin);
    if (value.partyLeave !== undefined) return visitor.partyLeave(value.partyLeave);
    if (value.partyActivityChange !== undefined) return visitor.partyActivityChange(value.partyActivityChange);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessageBody): any => {
    if (obj.text !== undefined) return {text:
      ChatMessageBodyText.filterSensitiveLog(obj.text)
    };
    if (obj.chatCreate !== undefined) return {chatCreate:
      ChatMessageBodyChatCreate.filterSensitiveLog(obj.chatCreate)
    };
    if (obj.deleted !== undefined) return {deleted:
      ChatMessageBodyDeleted.filterSensitiveLog(obj.deleted)
    };
    if (obj.identityFollow !== undefined) return {identityFollow:
      ChatMessageBodyIdentityFollow.filterSensitiveLog(obj.identityFollow)
    };
    if (obj.groupJoin !== undefined) return {groupJoin:
      ChatMessageBodyGroupJoin.filterSensitiveLog(obj.groupJoin)
    };
    if (obj.groupLeave !== undefined) return {groupLeave:
      ChatMessageBodyGroupLeave.filterSensitiveLog(obj.groupLeave)
    };
    if (obj.groupMemberKick !== undefined) return {groupMemberKick:
      ChatMessageBodyGroupMemberKick.filterSensitiveLog(obj.groupMemberKick)
    };
    if (obj.partyInvite !== undefined) return {partyInvite:
      ChatMessageBodyPartyInvite.filterSensitiveLog(obj.partyInvite)
    };
    if (obj.partyJoinRequest !== undefined) return {partyJoinRequest:
      ChatMessageBodyPartyJoinRequest.filterSensitiveLog(obj.partyJoinRequest)
    };
    if (obj.partyJoin !== undefined) return {partyJoin:
      ChatMessageBodyPartyJoin.filterSensitiveLog(obj.partyJoin)
    };
    if (obj.partyLeave !== undefined) return {partyLeave:
      ChatMessageBodyPartyLeave.filterSensitiveLog(obj.partyLeave)
    };
    if (obj.partyActivityChange !== undefined) return {partyActivityChange:
      ChatMessageBodyPartyActivityChange.filterSensitiveLog(obj.partyActivityChange)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

/**
 * A chat message.
 */
export interface ChatMessage {
  /**
   * A universally unique identifier.
   */
  chatMessageId: string | undefined;

  /**
   * A universally unique identifier.
   */
  threadId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  sendTs: Date | undefined;

  /**
   * Represents types of chat message bodies.
   */
  body: ChatMessageBody | undefined;
}

export namespace ChatMessage {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatMessage): any => ({
    ...obj,
    ...(obj.body && { body:
      ChatMessageBody.filterSensitiveLog(obj.body)
    }),
  })
}

export interface GetThreadHistoryOutput {
  /**
   * Ordered old to new.
   *
   * If querying `rivet.api.chat.common#before_and_after`, this will be
   * `count * 2` long.
   */
  chatMessages: (ChatMessage)[] | undefined;
}

export namespace GetThreadHistoryOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetThreadHistoryOutput): any => ({
    ...obj,
    ...(obj.chatMessages && { chatMessages:
      obj.chatMessages.map(
        item =>
        ChatMessage.filterSensitiveLog(item)
      )
    }),
  })
}

export interface GetThreadTopicInput {
  /**
   * A universally unique identifier.
   */
  threadId: string | undefined;
}

export namespace GetThreadTopicInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetThreadTopicInput): any => ({
    ...obj,
  })
}

/**
 * `rivet.chat#ChatSimpleTopic` variant for direct (identity to identity) chats.
 */
export interface ChatSimpleTopicDirect {
  /**
   * A universally unique identifier.
   */
  identityAId: string | undefined;

  /**
   * A universally unique identifier.
   */
  identityBId: string | undefined;
}

export namespace ChatSimpleTopicDirect {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatSimpleTopicDirect): any => ({
    ...obj,
  })
}

/**
 * `rivet.chat#ChatSimpleTopic` variant for groups.
 */
export interface ChatSimpleTopicGroup {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace ChatSimpleTopicGroup {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatSimpleTopicGroup): any => ({
    ...obj,
  })
}

/**
 * `rivet.chat#ChatSimpleTopic` variant for parties.
 */
export interface ChatSimpleTopicParty {
  /**
   * A universally unique identifier.
   */
  partyId: string | undefined;
}

export namespace ChatSimpleTopicParty {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatSimpleTopicParty): any => ({
    ...obj,
  })
}

/**
 * Represents a topic of the given chat thread without the associated handles
 * for the topic.
 */
export type ChatSimpleTopic =
  | ChatSimpleTopic.DirectMember
  | ChatSimpleTopic.GroupMember
  | ChatSimpleTopic.PartyMember
  | ChatSimpleTopic.$UnknownMember

export namespace ChatSimpleTopic {

  /**
   * `rivet.chat#ChatSimpleTopic` variant for groups.
   */
  export interface GroupMember {
    group: ChatSimpleTopicGroup;
    party?: never;
    direct?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatSimpleTopic` variant for parties.
   */
  export interface PartyMember {
    group?: never;
    party: ChatSimpleTopicParty;
    direct?: never;
    $unknown?: never;
  }

  /**
   * `rivet.chat#ChatSimpleTopic` variant for direct (identity to identity) chats.
   */
  export interface DirectMember {
    group?: never;
    party?: never;
    direct: ChatSimpleTopicDirect;
    $unknown?: never;
  }

  export interface $UnknownMember {
    group?: never;
    party?: never;
    direct?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    group: (value: ChatSimpleTopicGroup) => T;
    party: (value: ChatSimpleTopicParty) => T;
    direct: (value: ChatSimpleTopicDirect) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: ChatSimpleTopic,
    visitor: Visitor<T>
  ): T => {
    if (value.group !== undefined) return visitor.group(value.group);
    if (value.party !== undefined) return visitor.party(value.party);
    if (value.direct !== undefined) return visitor.direct(value.direct);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatSimpleTopic): any => {
    if (obj.group !== undefined) return {group:
      ChatSimpleTopicGroup.filterSensitiveLog(obj.group)
    };
    if (obj.party !== undefined) return {party:
      ChatSimpleTopicParty.filterSensitiveLog(obj.party)
    };
    if (obj.direct !== undefined) return {direct:
      ChatSimpleTopicDirect.filterSensitiveLog(obj.direct)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

export interface GetThreadTopicOutput {
  /**
   * Represents a topic of the given chat thread without the associated handles
   * for the topic.
   */
  topic: ChatSimpleTopic | undefined;
}

export namespace GetThreadTopicOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetThreadTopicOutput): any => ({
    ...obj,
    ...(obj.topic && { topic:
      ChatSimpleTopic.filterSensitiveLog(obj.topic)
    }),
  })
}

/**
 * `SendMessageBody` variant for party invite messages. Cannot send to party topics.
 */
export interface SendMessageBodyPartyInvite {
  /**
   * An invite token.
   */
  token: string | undefined;
}

export namespace SendMessageBodyPartyInvite {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SendMessageBodyPartyInvite): any => ({
    ...obj,
    ...(obj.token && { token:
      SENSITIVE_STRING
    }),
  })
}

/**
 * `rivet.api.chat.common#SendMessageBody` variant for text messages.
 */
export interface SendMessageBodyText {
  body: string | undefined;
}

export namespace SendMessageBodyText {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SendMessageBodyText): any => ({
    ...obj,
  })
}

/**
 * Data to send in a chat message.
 */
export type SendMessageBody =
  | SendMessageBody.PartyInviteMember
  | SendMessageBody.TextMember
  | SendMessageBody.$UnknownMember

export namespace SendMessageBody {

  /**
   * `rivet.api.chat.common#SendMessageBody` variant for text messages.
   */
  export interface TextMember {
    text: SendMessageBodyText;
    partyInvite?: never;
    $unknown?: never;
  }

  /**
   * `SendMessageBody` variant for party invite messages. Cannot send to party topics.
   */
  export interface PartyInviteMember {
    text?: never;
    partyInvite: SendMessageBodyPartyInvite;
    $unknown?: never;
  }

  export interface $UnknownMember {
    text?: never;
    partyInvite?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    text: (value: SendMessageBodyText) => T;
    partyInvite: (value: SendMessageBodyPartyInvite) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: SendMessageBody,
    visitor: Visitor<T>
  ): T => {
    if (value.text !== undefined) return visitor.text(value.text);
    if (value.partyInvite !== undefined) return visitor.partyInvite(value.partyInvite);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SendMessageBody): any => {
    if (obj.text !== undefined) return {text:
      SendMessageBodyText.filterSensitiveLog(obj.text)
    };
    if (obj.partyInvite !== undefined) return {partyInvite:
      SendMessageBodyPartyInvite.filterSensitiveLog(obj.partyInvite)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

/**
 * Topic to send a chat message to.
 *
 * If you already know the thread ID, use `thread_id`.
 */
export type SendChatTopic =
  | SendChatTopic.GroupIdMember
  | SendChatTopic.IdentityIdMember
  | SendChatTopic.PartyIdMember
  | SendChatTopic.ThreadIdMember
  | SendChatTopic.$UnknownMember

export namespace SendChatTopic {

  /**
   * A universally unique identifier.
   */
  export interface ThreadIdMember {
    threadId: string;
    groupId?: never;
    partyId?: never;
    identityId?: never;
    $unknown?: never;
  }

  /**
   * A universally unique identifier.
   */
  export interface GroupIdMember {
    threadId?: never;
    groupId: string;
    partyId?: never;
    identityId?: never;
    $unknown?: never;
  }

  /**
   * A universally unique identifier.
   */
  export interface PartyIdMember {
    threadId?: never;
    groupId?: never;
    partyId: string;
    identityId?: never;
    $unknown?: never;
  }

  /**
   * A universally unique identifier.
   */
  export interface IdentityIdMember {
    threadId?: never;
    groupId?: never;
    partyId?: never;
    identityId: string;
    $unknown?: never;
  }

  export interface $UnknownMember {
    threadId?: never;
    groupId?: never;
    partyId?: never;
    identityId?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    threadId: (value: string) => T;
    groupId: (value: string) => T;
    partyId: (value: string) => T;
    identityId: (value: string) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: SendChatTopic,
    visitor: Visitor<T>
  ): T => {
    if (value.threadId !== undefined) return visitor.threadId(value.threadId);
    if (value.groupId !== undefined) return visitor.groupId(value.groupId);
    if (value.partyId !== undefined) return visitor.partyId(value.partyId);
    if (value.identityId !== undefined) return visitor.identityId(value.identityId);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SendChatTopic): any => {
    if (obj.threadId !== undefined) return {threadId:
      obj.threadId
    };
    if (obj.groupId !== undefined) return {groupId:
      obj.groupId
    };
    if (obj.partyId !== undefined) return {partyId:
      obj.partyId
    };
    if (obj.identityId !== undefined) return {identityId:
      obj.identityId
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

export interface SendChatMessageInput {
  /**
   * Topic to send a chat message to.
   *
   * If you already know the thread ID, use `thread_id`.
   */
  topic: SendChatTopic | undefined;

  /**
   * Data to send in a chat message.
   */
  messageBody: SendMessageBody | undefined;
}

export namespace SendChatMessageInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SendChatMessageInput): any => ({
    ...obj,
    ...(obj.topic && { topic:
      SendChatTopic.filterSensitiveLog(obj.topic)
    }),
    ...(obj.messageBody && { messageBody:
      SendMessageBody.filterSensitiveLog(obj.messageBody)
    }),
  })
}

export interface SendChatMessageOutput {
  /**
   * A universally unique identifier.
   */
  chatMessageId: string | undefined;
}

export namespace SendChatMessageOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SendChatMessageOutput): any => ({
    ...obj,
  })
}

export interface SetThreadReadInput {
  /**
   * A universally unique identifier.
   */
  threadId: string | undefined;

  /**
   * Any messages newer than this timestamp will be marked as unread.
   *
   * This should be the current timestamp (in milliseconds).
   */
  lastReadTs: Date | undefined;
}

export namespace SetThreadReadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetThreadReadInput): any => ({
    ...obj,
  })
}

export interface SetThreadReadOutput {
}

export namespace SetThreadReadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetThreadReadOutput): any => ({
    ...obj,
  })
}

export interface Unit {
}

export namespace Unit {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: Unit): any => ({
    ...obj,
  })
}

/**
 * Represents a chat typing status.
 */
export type ChatTypingStatus =
  | ChatTypingStatus.IdleMember
  | ChatTypingStatus.TypingMember
  | ChatTypingStatus.$UnknownMember

export namespace ChatTypingStatus {

  /**
   * Not typing.
   */
  export interface IdleMember {
    idle: Unit;
    typing?: never;
    $unknown?: never;
  }

  /**
   * Typing.
   */
  export interface TypingMember {
    idle?: never;
    typing: Unit;
    $unknown?: never;
  }

  export interface $UnknownMember {
    idle?: never;
    typing?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    idle: (value: Unit) => T;
    typing: (value: Unit) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: ChatTypingStatus,
    visitor: Visitor<T>
  ): T => {
    if (value.idle !== undefined) return visitor.idle(value.idle);
    if (value.typing !== undefined) return visitor.typing(value.typing);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatTypingStatus): any => {
    if (obj.idle !== undefined) return {idle:
      Unit.filterSensitiveLog(obj.idle)
    };
    if (obj.typing !== undefined) return {typing:
      Unit.filterSensitiveLog(obj.typing)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

export interface SetTypingStatusInput {
  /**
   * A universally unique identifier.
   */
  threadId: string | undefined;

  /**
   * Represents a chat typing status.
   */
  status: ChatTypingStatus | undefined;
}

export namespace SetTypingStatusInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetTypingStatusInput): any => ({
    ...obj,
    ...(obj.status && { status:
      ChatTypingStatus.filterSensitiveLog(obj.status)
    }),
  })
}

export interface SetTypingStatusOutput {
}

export namespace SetTypingStatusOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetTypingStatusOutput): any => ({
    ...obj,
  })
}

export interface WatchThreadInput {
  /**
   * A universally unique identifier.
   */
  threadId: string | undefined;

  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;
}

export namespace WatchThreadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: WatchThreadInput): any => ({
    ...obj,
  })
}

/**
 * The chat typing status of an identity.
 */
export interface ChatIdentityTypingStatus {
  /**
   * An identity handle.
   */
  identity: IdentityHandle | undefined;

  /**
   * Represents a chat typing status.
   */
  status: ChatTypingStatus | undefined;
}

export namespace ChatIdentityTypingStatus {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ChatIdentityTypingStatus): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
    ...(obj.status && { status:
      ChatTypingStatus.filterSensitiveLog(obj.status)
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

export interface WatchThreadOutput {
  /**
   * All messages new messages posted to this thread. Ordered
   * old to new.
   */
  chatMessages: (ChatMessage)[] | undefined;

  /**
   * All identities that are currently typing in this thread.
   */
  typingStatuses?: (ChatIdentityTypingStatus)[];

  /**
   * Provided by watchable endpoints used in blocking loops.
   */
  watch: WatchResponse | undefined;
}

export namespace WatchThreadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: WatchThreadOutput): any => ({
    ...obj,
    ...(obj.chatMessages && { chatMessages:
      obj.chatMessages.map(
        item =>
        ChatMessage.filterSensitiveLog(item)
      )
    }),
    ...(obj.typingStatuses && { typingStatuses:
      obj.typingStatuses.map(
        item =>
        ChatIdentityTypingStatus.filterSensitiveLog(item)
      )
    }),
  })
}

export interface GetDirectThreadInput {
  /**
   * A universally unique identifier.
   */
  identityId: string | undefined;
}

export namespace GetDirectThreadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetDirectThreadInput): any => ({
    ...obj,
  })
}

export interface GetDirectThreadOutput {
  /**
   * A universally unique identifier.
   */
  threadId?: string;

  /**
   * An identity handle.
   */
  identity?: IdentityHandle;
}

export namespace GetDirectThreadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetDirectThreadOutput): any => ({
    ...obj,
    ...(obj.identity && { identity:
      IdentityHandle.filterSensitiveLog(obj.identity)
    }),
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
