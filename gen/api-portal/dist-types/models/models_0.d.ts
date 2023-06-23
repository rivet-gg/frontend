import { PortalServiceServiceException as __BaseException } from "./PortalServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";
export interface ResolveBetaJoinRequestInput {
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
    /**
     * Whether or not to accept the beta join request.
     */
    resolution: boolean | undefined;
}
export declare namespace ResolveBetaJoinRequestInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ResolveBetaJoinRequestInput) => any;
}
export interface ResolveBetaJoinRequestOutput {
}
export declare namespace ResolveBetaJoinRequestOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ResolveBetaJoinRequestOutput) => any;
}
export interface GetGameProfileInput {
    /**
     * A human readable short identifier used to references resources.
     *
     * Different than a `rivet.common#Uuid` because this is intended to be human readable.
     *
     * Different than `rivet.common#DisplayName` because this should not include special
     * characters and be short.
     */
    gameNameId: string | undefined;
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetGameProfileInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameProfileInput) => any;
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
export declare enum GroupPublicity {
    CLOSED = "closed",
    OPEN = "open"
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
/**
 * A game leaderboard category.
 */
export interface GameLeaderboardCategory {
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
}
export declare namespace GameLeaderboardCategory {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameLeaderboardCategory) => any;
}
/**
 * A platform link denoting a supported platform.
 */
export interface GamePlatformLink {
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
    /**
     * The URL to the given game's method of distribution on this platform.
     */
    url: string | undefined;
}
export declare namespace GamePlatformLink {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GamePlatformLink) => any;
}
/**
 * A game profile.
 */
export interface GameProfile {
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
    /**
     * The URL to this game's website.
     */
    url: string | undefined;
    /**
     * A group summary.
     */
    developer: GroupSummary | undefined;
    /**
     * A list of game tags.
     */
    tags: (string)[] | undefined;
    /**
     * A description of the given game.
     */
    description: string | undefined;
    /**
     * A list of platform links.
     */
    platforms: (GamePlatformLink)[] | undefined;
    /**
     * A list of group summaries.
     */
    recommendedGroups: (GroupSummary)[] | undefined;
    /**
     * A list of game leaderboard categories.
     */
    identityLeaderboardCategories: (GameLeaderboardCategory)[] | undefined;
    /**
     * A list of game leaderboard categories.
     */
    groupLeaderboardCategories: (GameLeaderboardCategory)[] | undefined;
}
export declare namespace GameProfile {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameProfile) => any;
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
export interface GetGameProfileOutput {
    /**
     * A game profile.
     */
    game: GameProfile | undefined;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetGameProfileOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameProfileOutput) => any;
}
export interface GetSuggestedGamesInput {
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetSuggestedGamesInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetSuggestedGamesInput) => any;
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
export interface GameSummary {
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
    /**
     * The URL to this game's website.
     */
    url: string | undefined;
    /**
     * A group handle.
     */
    developer: GroupHandle | undefined;
    /**
     * A list of game tags.
     */
    tags: (string)[] | undefined;
}
export declare namespace GameSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameSummary) => any;
}
export interface GetSuggestedGamesOutput {
    /**
     * A list of game summaries.
     */
    games: (GameSummary)[] | undefined;
    /**
     * Provided by watchable endpoints used in blocking loops.
     */
    watch: WatchResponse | undefined;
}
export declare namespace GetSuggestedGamesOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetSuggestedGamesOutput) => any;
}
/**
 * Represents push notification configuration for Firebase.
 */
export interface NotificationRegisterFirebaseService {
    accessKey: string | undefined;
}
export declare namespace NotificationRegisterFirebaseService {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: NotificationRegisterFirebaseService) => any;
}
/**
 * A union representing which notification service to register.
 */
export declare type NotificationRegisterService = NotificationRegisterService.FirebaseMember | NotificationRegisterService.$UnknownMember;
export declare namespace NotificationRegisterService {
    /**
     * Represents push notification configuration for Firebase.
     */
    interface FirebaseMember {
        firebase: NotificationRegisterFirebaseService;
        $unknown?: never;
    }
    interface $UnknownMember {
        firebase?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        firebase: (value: NotificationRegisterFirebaseService) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: NotificationRegisterService, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: NotificationRegisterService) => any;
}
export interface RegisterNotificationsInput {
    /**
     * A union representing which notification service to register.
     */
    service: NotificationRegisterService | undefined;
}
export declare namespace RegisterNotificationsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RegisterNotificationsInput) => any;
}
export interface RegisterNotificationsOutput {
}
export declare namespace RegisterNotificationsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RegisterNotificationsOutput) => any;
}
export declare enum NotificationUnregisterService {
    /**
     * Firebase service.
     */
    FIREBASE = "firebase"
}
export interface UnregisterNotificationsInput {
    /**
     * Represents a value for which notification service to unregister.
     */
    service: NotificationUnregisterService | string | undefined;
}
export declare namespace UnregisterNotificationsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UnregisterNotificationsInput) => any;
}
export interface UnregisterNotificationsOutput {
}
export declare namespace UnregisterNotificationsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UnregisterNotificationsOutput) => any;
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
