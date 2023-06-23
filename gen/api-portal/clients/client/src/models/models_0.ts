// smithy-typescript generated code
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

export namespace ResolveBetaJoinRequestInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ResolveBetaJoinRequestInput): any => ({
    ...obj,
  })
}

export interface ResolveBetaJoinRequestOutput {
}

export namespace ResolveBetaJoinRequestOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ResolveBetaJoinRequestOutput): any => ({
    ...obj,
  })
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

export namespace GetGameProfileInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameProfileInput): any => ({
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

export enum GroupPublicity {
  CLOSED = "closed",
  OPEN = "open",
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

/**
 * A game leaderboard category.
 */
export interface GameLeaderboardCategory {
  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;
}

export namespace GameLeaderboardCategory {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameLeaderboardCategory): any => ({
    ...obj,
  })
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

export namespace GamePlatformLink {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GamePlatformLink): any => ({
    ...obj,
  })
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

export namespace GameProfile {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameProfile): any => ({
    ...obj,
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

export namespace GetGameProfileOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameProfileOutput): any => ({
    ...obj,
  })
}

export interface GetSuggestedGamesInput {
  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;
}

export namespace GetSuggestedGamesInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetSuggestedGamesInput): any => ({
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

export namespace GameSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameSummary): any => ({
    ...obj,
  })
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

export namespace GetSuggestedGamesOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetSuggestedGamesOutput): any => ({
    ...obj,
  })
}

/**
 * Represents push notification configuration for Firebase.
 */
export interface NotificationRegisterFirebaseService {
  accessKey: string | undefined;
}

export namespace NotificationRegisterFirebaseService {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: NotificationRegisterFirebaseService): any => ({
    ...obj,
  })
}

/**
 * A union representing which notification service to register.
 */
export type NotificationRegisterService =
  | NotificationRegisterService.FirebaseMember
  | NotificationRegisterService.$UnknownMember

export namespace NotificationRegisterService {

  /**
   * Represents push notification configuration for Firebase.
   */
  export interface FirebaseMember {
    firebase: NotificationRegisterFirebaseService;
    $unknown?: never;
  }

  export interface $UnknownMember {
    firebase?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    firebase: (value: NotificationRegisterFirebaseService) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: NotificationRegisterService,
    visitor: Visitor<T>
  ): T => {
    if (value.firebase !== undefined) return visitor.firebase(value.firebase);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: NotificationRegisterService): any => {
    if (obj.firebase !== undefined) return {firebase:
      NotificationRegisterFirebaseService.filterSensitiveLog(obj.firebase)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

export interface RegisterNotificationsInput {
  /**
   * A union representing which notification service to register.
   */
  service: NotificationRegisterService | undefined;
}

export namespace RegisterNotificationsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RegisterNotificationsInput): any => ({
    ...obj,
    ...(obj.service && { service:
      NotificationRegisterService.filterSensitiveLog(obj.service)
    }),
  })
}

export interface RegisterNotificationsOutput {
}

export namespace RegisterNotificationsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RegisterNotificationsOutput): any => ({
    ...obj,
  })
}

export enum NotificationUnregisterService {
  /**
   * Firebase service.
   */
  FIREBASE = "firebase",
}

export interface UnregisterNotificationsInput {
  /**
   * Represents a value for which notification service to unregister.
   */
  service: NotificationUnregisterService | string | undefined;
}

export namespace UnregisterNotificationsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UnregisterNotificationsInput): any => ({
    ...obj,
  })
}

export interface UnregisterNotificationsOutput {
}

export namespace UnregisterNotificationsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UnregisterNotificationsOutput): any => ({
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
