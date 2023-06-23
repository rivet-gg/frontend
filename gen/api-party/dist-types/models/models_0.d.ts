import { PartyServiceServiceException as __BaseException } from "./PartyServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";
/**
 * Configuration for creating a party invite.
 */
export interface CreatePartyInviteConfig {
    /**
     * An alias used to join a given party.
     *
     * This alias must be unique for all invites for your game.
     *
     * Pass this alias to `rivet.api.party.common#CreatedInvite$alias` to consume
     * the invite.
     */
    alias?: string;
}
export declare namespace CreatePartyInviteConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreatePartyInviteConfig) => any;
}
export declare enum PartyPublicityLevel {
    JOIN = "join",
    NONE = "none",
    VIEW = "view"
}
/**
 * Publicity configuration for creating a party.
 *
 * Null values will default
 */
export interface CreatePartyPublicityConfig {
    /**
     * Defaults to `rivet.party#PartyPublicityLevel$VIEW`.
     */
    public?: PartyPublicityLevel | string;
    /**
     * Defaults to `rivet.party#PartyPublicityLevel$JOIN`.
     */
    mutualFollowers?: PartyPublicityLevel | string;
    /**
     * Defaults to `rivet.party#PartyPublicityLevel$VIEW`.
     */
    groups?: PartyPublicityLevel | string;
}
export declare namespace CreatePartyPublicityConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreatePartyPublicityConfig) => any;
}
export interface CreatePartyInput {
    /**
     * How many members can join the party.
     *
     * If using this party with the matchmaker, this number should be less than
     * or equal to your party player limit. Super large parties may not be able
     * to fit insite a lobby and be unable to join the game.
     */
    partySize: number | undefined;
    /**
     * Publicity configuration for creating a party.
     *
     * Null values will default
     */
    publicity?: CreatePartyPublicityConfig;
    invites?: (CreatePartyInviteConfig)[];
    /**
     * If the player is currently in the lobby, pass the token from
     * `rivet.matchmaker#MatchmakerLobbyJoinInfoPlayer$token`.
     *
     * This will prevent issuing a new player token and automatically set the
     * party state to the player's current lobby.
     */
    matchmakerCurrentPlayerToken?: string;
}
export declare namespace CreatePartyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreatePartyInput) => any;
}
/**
 * Output from a created invite.
 */
export interface CreatedInvite {
    /**
     * An alias used to join a given party.
     *
     * This alias must be unique for all invites for your game.
     *
     * Pass this alias to `rivet.api.party.common#CreatedInvite$alias` to consume
     * the invite.
     */
    alias?: string;
    /**
     * A JSON Web Token.
     *
     * Slightly modified to include a description prefix and use Protobufs of
     * JSON.
     */
    token: string | undefined;
}
export declare namespace CreatedInvite {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreatedInvite) => any;
}
export interface CreatePartyOutput {
    /**
     * A universally unique identifier.
     */
    partyId: string | undefined;
    invites: (CreatedInvite)[] | undefined;
}
export declare namespace CreatePartyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreatePartyOutput) => any;
}
export interface CreatePartyInviteInput {
    /**
     * An alias used to join a given party.
     */
    alias?: string;
}
export declare namespace CreatePartyInviteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreatePartyInviteInput) => any;
}
export interface CreatePartyInviteOutput {
    /**
     * Output from a created invite.
     */
    invite: CreatedInvite | undefined;
}
export declare namespace CreatePartyInviteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreatePartyInviteOutput) => any;
}
export interface GetPartyFromInviteInput {
    /**
     * See `rivet.api.party#CreatedInvite$token`.
     */
    token?: string;
    /**
     * An alias used to join a given party.
     *
     * This alias must be unique for all invites for your game.
     *
     * Pass this alias to `rivet.api.party.common#CreatedInvite$alias` to consume
     * the invite.
     */
    alias?: string;
}
export declare namespace GetPartyFromInviteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartyFromInviteInput) => any;
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
 * A party member state denoting that the member is inactive.
 */
export interface PartyMemberStateInactive {
}
export declare namespace PartyMemberStateInactive {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyMemberStateInactive) => any;
}
/**
 * A party member state denoting that the member is currently searching for a lobby.
 */
export interface PartyMemberStateMatchmakerFindingLobby {
}
export declare namespace PartyMemberStateMatchmakerFindingLobby {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyMemberStateMatchmakerFindingLobby) => any;
}
/**
 * A party member state denoting that the member is in a lobby.
 */
export interface PartyMemberStateMatchmakerLobby {
    /**
     * A universally unique identifier.
     */
    playerId: string | undefined;
}
export declare namespace PartyMemberStateMatchmakerLobby {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyMemberStateMatchmakerLobby) => any;
}
/**
 * A party member state denoting that the member is currently waiting to start matchmaking.
 */
export interface PartyMemberStateMatchmakerReady {
}
export declare namespace PartyMemberStateMatchmakerReady {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyMemberStateMatchmakerReady) => any;
}
/**
 * A union representing the current state of a party member.
 * -   `Inactive`: The player is not doing anything. For example, the player can be sitting in the game menu or hanging out on the hub.
 *     -   It's possible for the member to be in an inactive state while the party is in a lobby; this means the player is simply observing/interacting with others in the party and not part of the matchmaking process.
 * -   `MatchmakerReady`: This means the member wants a player created for them.
 *     -   Members can be in the ready state while the party is in an idle state. This means that the player will get a player created for them.
 *     -   Members can be in the ready state while the party is in a lobby. This means that the player could not join the lobby because it was full or the player left the lobby unintentionally.
 * -   `MatchmakerFindingLobby`: A find request is in progress for the member.
 * -   `MatchmakerLobby`: The member is in a lobby.
 */
export declare type PartyMemberState = PartyMemberState.InactiveMember | PartyMemberState.MatchmakerFindingLobbyMember | PartyMemberState.MatchmakerLobbyMember | PartyMemberState.MatchmakerReadyMember | PartyMemberState.$UnknownMember;
export declare namespace PartyMemberState {
    /**
     * A party member state denoting that the member is inactive.
     */
    interface InactiveMember {
        inactive: PartyMemberStateInactive;
        matchmakerReady?: never;
        matchmakerFindingLobby?: never;
        matchmakerLobby?: never;
        $unknown?: never;
    }
    /**
     * A party member state denoting that the member is currently waiting to start matchmaking.
     */
    interface MatchmakerReadyMember {
        inactive?: never;
        matchmakerReady: PartyMemberStateMatchmakerReady;
        matchmakerFindingLobby?: never;
        matchmakerLobby?: never;
        $unknown?: never;
    }
    /**
     * A party member state denoting that the member is currently searching for a lobby.
     */
    interface MatchmakerFindingLobbyMember {
        inactive?: never;
        matchmakerReady?: never;
        matchmakerFindingLobby: PartyMemberStateMatchmakerFindingLobby;
        matchmakerLobby?: never;
        $unknown?: never;
    }
    /**
     * A party member state denoting that the member is in a lobby.
     */
    interface MatchmakerLobbyMember {
        inactive?: never;
        matchmakerReady?: never;
        matchmakerFindingLobby?: never;
        matchmakerLobby: PartyMemberStateMatchmakerLobby;
        $unknown?: never;
    }
    interface $UnknownMember {
        inactive?: never;
        matchmakerReady?: never;
        matchmakerFindingLobby?: never;
        matchmakerLobby?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        inactive: (value: PartyMemberStateInactive) => T;
        matchmakerReady: (value: PartyMemberStateMatchmakerReady) => T;
        matchmakerFindingLobby: (value: PartyMemberStateMatchmakerFindingLobby) => T;
        matchmakerLobby: (value: PartyMemberStateMatchmakerLobby) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: PartyMemberState, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyMemberState) => any;
}
/**
 * A party member summary.
 */
export interface PartyMemberSummary {
    /**
     * An identity handle.
     */
    identity: IdentityHandle | undefined;
    /**
     * Whether or not this party member is the leader of the given party.
     */
    isLeader: boolean | undefined;
    /**
     * RFC3339 timestamp.
     */
    joinTs: Date | undefined;
    /**
     * A union representing the current state of a party member.
     * -   `Inactive`: The player is not doing anything. For example, the player can be sitting in the game menu or hanging out on the hub.
     *     -   It's possible for the member to be in an inactive state while the party is in a lobby; this means the player is simply observing/interacting with others in the party and not part of the matchmaking process.
     * -   `MatchmakerReady`: This means the member wants a player created for them.
     *     -   Members can be in the ready state while the party is in an idle state. This means that the player will get a player created for them.
     *     -   Members can be in the ready state while the party is in a lobby. This means that the player could not join the lobby because it was full or the player left the lobby unintentionally.
     * -   `MatchmakerFindingLobby`: A find request is in progress for the member.
     * -   `MatchmakerLobby`: The member is in a lobby.
     */
    state: PartyMemberState | undefined;
}
export declare namespace PartyMemberSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyMemberSummary) => any;
}
export interface PartyPublicity {
    public: PartyPublicityLevel | string | undefined;
    mutualFollowers: PartyPublicityLevel | string | undefined;
    groups: PartyPublicityLevel | string | undefined;
}
export declare namespace PartyPublicity {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyPublicity) => any;
}
/**
 * A party summary.
 */
export interface PartySummary {
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
    publicity: PartyPublicity | undefined;
    /**
     * Unsigned 32 bit integer.
     */
    partySize: number | undefined;
    /**
     * A list of party members.
     */
    members: (PartyMemberSummary)[] | undefined;
    /**
     * A universally unique identifier.
     */
    threadId: string | undefined;
}
export declare namespace PartySummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartySummary) => any;
}
export interface GetPartyFromInviteOutput {
    /**
     * A party summary.
     */
    party: PartySummary | undefined;
}
export declare namespace GetPartyFromInviteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartyFromInviteOutput) => any;
}
export interface GetPartyProfileInput {
    /**
     * A universally unique identifier.
     */
    partyId: string | undefined;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetPartyProfileInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartyProfileInput) => any;
}
/**
 * An alias used to join a given party.
 */
export interface PartyInviteAlias {
    /**
     * A universally unique identifier.
     */
    namespaceId: string | undefined;
    /**
     * The alias used to join a given party.
     */
    alias: string | undefined;
}
export declare namespace PartyInviteAlias {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyInviteAlias) => any;
}
/**
 * Extenral links for a party invite.
 */
export interface PartyInviteExternalLinks {
    /**
     * The invite link used to join this party from an external site.
     */
    invite: string | undefined;
}
export declare namespace PartyInviteExternalLinks {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyInviteExternalLinks) => any;
}
/**
 * A party invite.
 */
export interface PartyInvite {
    /**
     * A universally unique identifier.
     */
    inviteId: string | undefined;
    /**
     * RFC3339 timestamp.
     */
    createTs: Date | undefined;
    /**
     * A JSON Web Token.
     *
     * Slightly modified to include a description prefix and use Protobufs of
     * JSON.
     */
    token: string | undefined;
    /**
     * An alias used to join a given party.
     */
    alias?: PartyInviteAlias;
    /**
     * Extenral links for a party invite.
     */
    external: PartyInviteExternalLinks | undefined;
}
export declare namespace PartyInvite {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyInvite) => any;
}
export interface PartyProfile {
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
    publicity: PartyPublicity | undefined;
    /**
     * Unsigned 32 bit integer.
     */
    partySize: number | undefined;
    /**
     * A list of party members.
     */
    members: (PartyMemberSummary)[] | undefined;
    /**
     * A universally unique identifier.
     */
    threadId: string | undefined;
    /**
     * A list of party invites.
     */
    invites: (PartyInvite)[] | undefined;
}
export declare namespace PartyProfile {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PartyProfile) => any;
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
export interface GetPartyProfileOutput {
    party: PartyProfile | undefined;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetPartyProfileOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartyProfileOutput) => any;
}
export interface GetPartySelfProfileInput {
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetPartySelfProfileInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartySelfProfileInput) => any;
}
export interface GetPartySelfProfileOutput {
    party?: PartyProfile;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetPartySelfProfileOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartySelfProfileOutput) => any;
}
export interface GetPartySelfSummaryInput {
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetPartySelfSummaryInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartySelfSummaryInput) => any;
}
export interface GetPartySelfSummaryOutput {
    /**
     * A party summary.
     */
    party?: PartySummary;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetPartySelfSummaryOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartySelfSummaryOutput) => any;
}
export interface GetPartySummaryInput {
    /**
     * A universally unique identifier.
     */
    partyId: string | undefined;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetPartySummaryInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartySummaryInput) => any;
}
export interface GetPartySummaryOutput {
    /**
     * A party summary.
     */
    party: PartySummary | undefined;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetPartySummaryOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetPartySummaryOutput) => any;
}
/**
 * Represents methods of joining a party.
 */
export declare type JoinPartyInvite = JoinPartyInvite.AliasMember | JoinPartyInvite.PartyIdMember | JoinPartyInvite.TokenMember | JoinPartyInvite.$UnknownMember;
export declare namespace JoinPartyInvite {
    /**
     * Requires the party publicity to this identity to be
     * `rivet.party#PartyPublicityLevel$JOIN`.
     */
    interface PartyIdMember {
        partyId: string;
        token?: never;
        alias?: never;
        $unknown?: never;
    }
    /**
     * A party invite token.
     *
     * See `rivet.api.party.common#CreatedInvite$token`.
     */
    interface TokenMember {
        partyId?: never;
        token: string;
        alias?: never;
        $unknown?: never;
    }
    /**
     * A party invite alias.
     *
     * See `rivet.api.party.common#CreatePartyInviteConfig$alias` and
     * `rivet.api.party#CreatePartyInvite$alias`.
     */
    interface AliasMember {
        partyId?: never;
        token?: never;
        alias: string;
        $unknown?: never;
    }
    interface $UnknownMember {
        partyId?: never;
        token?: never;
        alias?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        partyId: (value: string) => T;
        token: (value: string) => T;
        alias: (value: string) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: JoinPartyInvite, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: JoinPartyInvite) => any;
}
export interface JoinPartyInput {
    /**
     * Represents methods of joining a party.
     */
    invite: JoinPartyInvite | undefined;
    /**
     * Whether or not to automatically join the game lobby if a party is currently in game.
     */
    matchmakerAutoJoinLobby?: boolean;
    /**
     * If the player is currently in the lobby, pass the token from
     * `rivet.matchmaker#MatchmakerLobbyJoinInfoPlayer$token`.
     *
     * This will prevent issuing a new player token.
     */
    matchmakerCurrentPlayerToken?: string;
}
export declare namespace JoinPartyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: JoinPartyInput) => any;
}
export interface JoinPartyOutput {
    /**
     * A universally unique identifier.
     */
    partyId: string | undefined;
}
export declare namespace JoinPartyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: JoinPartyOutput) => any;
}
export interface KickMemberInput {
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
}
export declare namespace KickMemberInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: KickMemberInput) => any;
}
export interface KickMemberOutput {
}
export declare namespace KickMemberOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: KickMemberOutput) => any;
}
export interface LeavePartyInput {
}
export declare namespace LeavePartyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LeavePartyInput) => any;
}
export interface LeavePartyOutput {
}
export declare namespace LeavePartyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LeavePartyOutput) => any;
}
export interface RevokePartyInviteInput {
    /**
     * A universally unique identifier.
     */
    inviteId: string | undefined;
}
export declare namespace RevokePartyInviteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RevokePartyInviteInput) => any;
}
export interface RevokePartyInviteOutput {
}
export declare namespace RevokePartyInviteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RevokePartyInviteOutput) => any;
}
export interface SendJoinRequestInput {
    /**
     * A universally unique identifier.
     */
    partyId: string | undefined;
}
export declare namespace SendJoinRequestInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendJoinRequestInput) => any;
}
export interface SendJoinRequestOutput {
}
export declare namespace SendJoinRequestOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SendJoinRequestOutput) => any;
}
export interface SetPartyPublicityInput {
    /**
     * Defaults to `rivet.party#PartyPublicityLevel$VIEW`.
     */
    public?: PartyPublicityLevel | string;
    /**
     * Defaults to `rivet.party#PartyPublicityLevel$JOIN`.
     */
    mutualFollowers?: PartyPublicityLevel | string;
    /**
     * Defaults to `rivet.party#PartyPublicityLevel$VIEW`.
     */
    groups?: PartyPublicityLevel | string;
}
export declare namespace SetPartyPublicityInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetPartyPublicityInput) => any;
}
export interface SetPartyPublicityOutput {
}
export declare namespace SetPartyPublicityOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetPartyPublicityOutput) => any;
}
export interface TransferPartyOwnershipInput {
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
}
export declare namespace TransferPartyOwnershipInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: TransferPartyOwnershipInput) => any;
}
export interface TransferPartyOwnershipOutput {
}
export declare namespace TransferPartyOwnershipOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: TransferPartyOwnershipOutput) => any;
}
export interface SetPartyToIdleInput {
}
export declare namespace SetPartyToIdleInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetPartyToIdleInput) => any;
}
export interface SetPartyToIdleOutput {
}
export declare namespace SetPartyToIdleOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetPartyToIdleOutput) => any;
}
export interface SetSelfInactiveInput {
}
export declare namespace SetSelfInactiveInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetSelfInactiveInput) => any;
}
export interface SetSelfInactiveOutput {
}
export declare namespace SetSelfInactiveOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetSelfInactiveOutput) => any;
}
/**
 * hCaptcha configuration.
 */
export interface CaptchaConfigHcaptcha {
    clientResponse: string | undefined;
}
export declare namespace CaptchaConfigHcaptcha {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CaptchaConfigHcaptcha) => any;
}
/**
 * Cloudflare Turnstile configuration.
 */
export interface CaptchaConfigTurnstile {
    clientResponse: string | undefined;
}
export declare namespace CaptchaConfigTurnstile {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CaptchaConfigTurnstile) => any;
}
/**
 * Methods to verify a captcha.
 */
export declare type CaptchaConfig = CaptchaConfig.HcaptchaMember | CaptchaConfig.TurnstileMember | CaptchaConfig.$UnknownMember;
export declare namespace CaptchaConfig {
    /**
     * hCaptcha configuration.
     */
    interface HcaptchaMember {
        hcaptcha: CaptchaConfigHcaptcha;
        turnstile?: never;
        $unknown?: never;
    }
    /**
     * Cloudflare Turnstile configuration.
     */
    interface TurnstileMember {
        hcaptcha?: never;
        turnstile: CaptchaConfigTurnstile;
        $unknown?: never;
    }
    interface $UnknownMember {
        hcaptcha?: never;
        turnstile?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        hcaptcha: (value: CaptchaConfigHcaptcha) => T;
        turnstile: (value: CaptchaConfigTurnstile) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: CaptchaConfig, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CaptchaConfig) => any;
}
export interface FindMatchmakerLobbyForPartyInput {
    /**
     * Game modes to match lobbies against.
     */
    gameModes: (string)[] | undefined;
    /**
     * Regions to match lobbies against. If not specified, the optimal region
     * will be determined and will attempt to find lobbies in that region.
     */
    regions?: (string)[];
    /**
     * Prevents a new lobby from being created when finding a lobby. If no
     * lobby is found, `MATCHMAKER_LOBBY_NOT_FOUND` will be returned.
     */
    preventAutoCreateLobby?: boolean;
    /**
     * Methods to verify a captcha.
     */
    captcha?: CaptchaConfig;
    origin?: string;
}
export declare namespace FindMatchmakerLobbyForPartyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: FindMatchmakerLobbyForPartyInput) => any;
}
export interface FindMatchmakerLobbyForPartyOutput {
}
export declare namespace FindMatchmakerLobbyForPartyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: FindMatchmakerLobbyForPartyOutput) => any;
}
export interface JoinMatchmakerLobbyForPartyInput {
    /**
     * A universally unique identifier.
     */
    lobbyId: string | undefined;
    /**
     * Methods to verify a captcha.
     */
    captcha?: CaptchaConfig;
}
export declare namespace JoinMatchmakerLobbyForPartyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: JoinMatchmakerLobbyForPartyInput) => any;
}
export interface JoinMatchmakerLobbyForPartyOutput {
}
export declare namespace JoinMatchmakerLobbyForPartyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: JoinMatchmakerLobbyForPartyOutput) => any;
}
export interface MatchmakerSelfReadyInput {
}
export declare namespace MatchmakerSelfReadyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: MatchmakerSelfReadyInput) => any;
}
export interface MatchmakerSelfReadyOutput {
}
export declare namespace MatchmakerSelfReadyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: MatchmakerSelfReadyOutput) => any;
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
