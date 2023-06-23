import { ChatServiceServiceException as __BaseException } from "./ChatServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";
export declare enum QueryDirection {
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
    BEFORE_AND_AFTER = "before_and_after"
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
export declare namespace GetThreadHistoryInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetThreadHistoryInput) => any;
}
/**
 * `rivet.chat#ChatMessageBody` variant for indicating a new chat was created.
 */
export interface ChatMessageBodyChatCreate {
}
export declare namespace ChatMessageBodyChatCreate {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyChatCreate) => any;
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
 * `rivet.chat#ChatMessageBody` variant for deleted messages.
 */
export interface ChatMessageBodyDeleted {
    /**
     * An identity handle.
     */
    sender: IdentityHandle | undefined;
}
export declare namespace ChatMessageBodyDeleted {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyDeleted) => any;
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
export declare namespace ChatMessageBodyGroupJoin {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyGroupJoin) => any;
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
export declare namespace ChatMessageBodyGroupLeave {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyGroupLeave) => any;
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
export declare namespace ChatMessageBodyGroupMemberKick {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyGroupMemberKick) => any;
}
/**
 * `rivet.chat#ChatMessageBody` variant for indicating an identity followed the identity.
 */
export interface ChatMessageBodyIdentityFollow {
}
export declare namespace ChatMessageBodyIdentityFollow {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyIdentityFollow) => any;
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
export declare namespace ChatMessageBodyPartyActivityChange {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyPartyActivityChange) => any;
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
export declare namespace ChatMessageBodyPartyInvite {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyPartyInvite) => any;
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
export declare namespace ChatMessageBodyPartyJoin {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyPartyJoin) => any;
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
export declare namespace ChatMessageBodyPartyJoinRequest {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyPartyJoinRequest) => any;
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
export declare namespace ChatMessageBodyPartyLeave {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyPartyLeave) => any;
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
export declare namespace ChatMessageBodyText {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBodyText) => any;
}
/**
 * Represents types of chat message bodies.
 */
export declare type ChatMessageBody = ChatMessageBody.ChatCreateMember | ChatMessageBody.DeletedMember | ChatMessageBody.GroupJoinMember | ChatMessageBody.GroupLeaveMember | ChatMessageBody.GroupMemberKickMember | ChatMessageBody.IdentityFollowMember | ChatMessageBody.PartyActivityChangeMember | ChatMessageBody.PartyInviteMember | ChatMessageBody.PartyJoinMember | ChatMessageBody.PartyJoinRequestMember | ChatMessageBody.PartyLeaveMember | ChatMessageBody.TextMember | ChatMessageBody.$UnknownMember;
export declare namespace ChatMessageBody {
    /**
     * `rivet.chat#ChatMessageBody` variant for text messages.
     *
     * Sent by other identities using the chat interface.
     */
    interface TextMember {
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
    interface ChatCreateMember {
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
    interface DeletedMember {
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
    interface IdentityFollowMember {
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
    interface GroupJoinMember {
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
    interface GroupLeaveMember {
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
    interface GroupMemberKickMember {
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
    interface PartyInviteMember {
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
    interface PartyJoinRequestMember {
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
    interface PartyJoinMember {
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
    interface PartyLeaveMember {
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
    interface PartyActivityChangeMember {
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
    interface $UnknownMember {
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
    interface Visitor<T> {
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
    const visit: <T>(value: ChatMessageBody, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessageBody) => any;
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
export declare namespace ChatMessage {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatMessage) => any;
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
export declare namespace GetThreadHistoryOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetThreadHistoryOutput) => any;
}
export interface GetThreadTopicInput {
    /**
     * A universally unique identifier.
     */
    threadId: string | undefined;
}
export declare namespace GetThreadTopicInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetThreadTopicInput) => any;
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
export declare namespace ChatSimpleTopicDirect {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatSimpleTopicDirect) => any;
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
export declare namespace ChatSimpleTopicGroup {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatSimpleTopicGroup) => any;
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
export declare namespace ChatSimpleTopicParty {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatSimpleTopicParty) => any;
}
/**
 * Represents a topic of the given chat thread without the associated handles
 * for the topic.
 */
export declare type ChatSimpleTopic = ChatSimpleTopic.DirectMember | ChatSimpleTopic.GroupMember | ChatSimpleTopic.PartyMember | ChatSimpleTopic.$UnknownMember;
export declare namespace ChatSimpleTopic {
    /**
     * `rivet.chat#ChatSimpleTopic` variant for groups.
     */
    interface GroupMember {
        group: ChatSimpleTopicGroup;
        party?: never;
        direct?: never;
        $unknown?: never;
    }
    /**
     * `rivet.chat#ChatSimpleTopic` variant for parties.
     */
    interface PartyMember {
        group?: never;
        party: ChatSimpleTopicParty;
        direct?: never;
        $unknown?: never;
    }
    /**
     * `rivet.chat#ChatSimpleTopic` variant for direct (identity to identity) chats.
     */
    interface DirectMember {
        group?: never;
        party?: never;
        direct: ChatSimpleTopicDirect;
        $unknown?: never;
    }
    interface $UnknownMember {
        group?: never;
        party?: never;
        direct?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        group: (value: ChatSimpleTopicGroup) => T;
        party: (value: ChatSimpleTopicParty) => T;
        direct: (value: ChatSimpleTopicDirect) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: ChatSimpleTopic, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatSimpleTopic) => any;
}
export interface GetThreadTopicOutput {
    /**
     * Represents a topic of the given chat thread without the associated handles
     * for the topic.
     */
    topic: ChatSimpleTopic | undefined;
}
export declare namespace GetThreadTopicOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetThreadTopicOutput) => any;
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
export declare namespace SendMessageBodyPartyInvite {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendMessageBodyPartyInvite) => any;
}
/**
 * `rivet.api.chat.common#SendMessageBody` variant for text messages.
 */
export interface SendMessageBodyText {
    body: string | undefined;
}
export declare namespace SendMessageBodyText {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendMessageBodyText) => any;
}
/**
 * Data to send in a chat message.
 */
export declare type SendMessageBody = SendMessageBody.PartyInviteMember | SendMessageBody.TextMember | SendMessageBody.$UnknownMember;
export declare namespace SendMessageBody {
    /**
     * `rivet.api.chat.common#SendMessageBody` variant for text messages.
     */
    interface TextMember {
        text: SendMessageBodyText;
        partyInvite?: never;
        $unknown?: never;
    }
    /**
     * `SendMessageBody` variant for party invite messages. Cannot send to party topics.
     */
    interface PartyInviteMember {
        text?: never;
        partyInvite: SendMessageBodyPartyInvite;
        $unknown?: never;
    }
    interface $UnknownMember {
        text?: never;
        partyInvite?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        text: (value: SendMessageBodyText) => T;
        partyInvite: (value: SendMessageBodyPartyInvite) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: SendMessageBody, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendMessageBody) => any;
}
/**
 * Topic to send a chat message to.
 *
 * If you already know the thread ID, use `thread_id`.
 */
export declare type SendChatTopic = SendChatTopic.GroupIdMember | SendChatTopic.IdentityIdMember | SendChatTopic.PartyIdMember | SendChatTopic.ThreadIdMember | SendChatTopic.$UnknownMember;
export declare namespace SendChatTopic {
    /**
     * A universally unique identifier.
     */
    interface ThreadIdMember {
        threadId: string;
        groupId?: never;
        partyId?: never;
        identityId?: never;
        $unknown?: never;
    }
    /**
     * A universally unique identifier.
     */
    interface GroupIdMember {
        threadId?: never;
        groupId: string;
        partyId?: never;
        identityId?: never;
        $unknown?: never;
    }
    /**
     * A universally unique identifier.
     */
    interface PartyIdMember {
        threadId?: never;
        groupId?: never;
        partyId: string;
        identityId?: never;
        $unknown?: never;
    }
    /**
     * A universally unique identifier.
     */
    interface IdentityIdMember {
        threadId?: never;
        groupId?: never;
        partyId?: never;
        identityId: string;
        $unknown?: never;
    }
    interface $UnknownMember {
        threadId?: never;
        groupId?: never;
        partyId?: never;
        identityId?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        threadId: (value: string) => T;
        groupId: (value: string) => T;
        partyId: (value: string) => T;
        identityId: (value: string) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: SendChatTopic, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendChatTopic) => any;
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
export declare namespace SendChatMessageInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendChatMessageInput) => any;
}
export interface SendChatMessageOutput {
    /**
     * A universally unique identifier.
     */
    chatMessageId: string | undefined;
}
export declare namespace SendChatMessageOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendChatMessageOutput) => any;
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
export declare namespace SetThreadReadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetThreadReadInput) => any;
}
export interface SetThreadReadOutput {
}
export declare namespace SetThreadReadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetThreadReadOutput) => any;
}
export interface Unit {
}
export declare namespace Unit {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: Unit) => any;
}
/**
 * Represents a chat typing status.
 */
export declare type ChatTypingStatus = ChatTypingStatus.IdleMember | ChatTypingStatus.TypingMember | ChatTypingStatus.$UnknownMember;
export declare namespace ChatTypingStatus {
    /**
     * Not typing.
     */
    interface IdleMember {
        idle: Unit;
        typing?: never;
        $unknown?: never;
    }
    /**
     * Typing.
     */
    interface TypingMember {
        idle?: never;
        typing: Unit;
        $unknown?: never;
    }
    interface $UnknownMember {
        idle?: never;
        typing?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        idle: (value: Unit) => T;
        typing: (value: Unit) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: ChatTypingStatus, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatTypingStatus) => any;
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
export declare namespace SetTypingStatusInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetTypingStatusInput) => any;
}
export interface SetTypingStatusOutput {
}
export declare namespace SetTypingStatusOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetTypingStatusOutput) => any;
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
export declare namespace WatchThreadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: WatchThreadInput) => any;
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
export declare namespace ChatIdentityTypingStatus {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ChatIdentityTypingStatus) => any;
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
export declare namespace WatchThreadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: WatchThreadOutput) => any;
}
export interface GetDirectThreadInput {
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
}
export declare namespace GetDirectThreadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetDirectThreadInput) => any;
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
export declare namespace GetDirectThreadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetDirectThreadOutput) => any;
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
