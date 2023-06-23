// smithy-typescript generated code
import { CloudServiceServiceException as __BaseException } from "./CloudServiceServiceException";
import {
  SENSITIVE_STRING,
  ExceptionOptionType as __ExceptionOptionType,
} from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";

export interface AddNamespaceDomainInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A valid domain name (no protocol).
   */
  domain: string | undefined;
}

export namespace AddNamespaceDomainInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: AddNamespaceDomainInput): any => ({
    ...obj,
  })
}

export interface AddNamespaceDomainOutput {
}

export namespace AddNamespaceDomainOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: AddNamespaceDomainOutput): any => ({
    ...obj,
  })
}

export interface InspectInput {
}

export namespace InspectInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: InspectInput): any => ({
    ...obj,
  })
}

/**
 * The current authenticated game cloud.
 */
export interface AuthAgentGameCloud {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;
}

export namespace AuthAgentGameCloud {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: AuthAgentGameCloud): any => ({
    ...obj,
  })
}

/**
 * The current authenticated identity.
 */
export interface AuthAgentIdentity {
  /**
   * A universally unique identifier.
   */
  identityId: string | undefined;
}

export namespace AuthAgentIdentity {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: AuthAgentIdentity): any => ({
    ...obj,
  })
}

/**
 * The current authenticated agent.
 */
export type AuthAgent =
  | AuthAgent.GameCloudMember
  | AuthAgent.IdentityMember
  | AuthAgent.$UnknownMember

export namespace AuthAgent {

  /**
   * The current authenticated identity.
   */
  export interface IdentityMember {
    identity: AuthAgentIdentity;
    gameCloud?: never;
    $unknown?: never;
  }

  /**
   * The current authenticated game cloud.
   */
  export interface GameCloudMember {
    identity?: never;
    gameCloud: AuthAgentGameCloud;
    $unknown?: never;
  }

  export interface $UnknownMember {
    identity?: never;
    gameCloud?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    identity: (value: AuthAgentIdentity) => T;
    gameCloud: (value: AuthAgentGameCloud) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: AuthAgent,
    visitor: Visitor<T>
  ): T => {
    if (value.identity !== undefined) return visitor.identity(value.identity);
    if (value.gameCloud !== undefined) return visitor.gameCloud(value.gameCloud);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: AuthAgent): any => {
    if (obj.identity !== undefined) return {identity:
      AuthAgentIdentity.filterSensitiveLog(obj.identity)
    };
    if (obj.gameCloud !== undefined) return {gameCloud:
      AuthAgentGameCloud.filterSensitiveLog(obj.gameCloud)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

export interface InspectOutput {
  /**
   * The current authenticated agent.
   */
  agent: AuthAgent | undefined;
}

export namespace InspectOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: InspectOutput): any => ({
    ...obj,
    ...(obj.agent && { agent:
      AuthAgent.filterSensitiveLog(obj.agent)
    }),
  })
}

export interface CreateGameInput {
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
   * A universally unique identifier.
   */
  developerGroupId: string | undefined;
}

export namespace CreateGameInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameInput): any => ({
    ...obj,
  })
}

export interface CreateGameOutput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;
}

export namespace CreateGameOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameOutput): any => ({
    ...obj,
  })
}

export interface GameBannerUploadCompleteInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;
}

export namespace GameBannerUploadCompleteInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameBannerUploadCompleteInput): any => ({
    ...obj,
  })
}

export interface GameBannerUploadCompleteOutput {
}

export namespace GameBannerUploadCompleteOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameBannerUploadCompleteOutput): any => ({
    ...obj,
  })
}

export interface GameBannerUploadPrepareInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * The path/filename of the game banner.
   */
  path: string | undefined;

  /**
   * The MIME type of the game banner.
   */
  mime?: string;

  /**
   * Unsigned 64 bit integer.
   */
  contentLength: number | undefined;
}

export namespace GameBannerUploadPrepareInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameBannerUploadPrepareInput): any => ({
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

export interface GameBannerUploadPrepareOutput {
  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  /**
   * A presigned request used to upload files. Upload your file to the given URL via a PUT request.
   */
  presignedRequest: UploadPresignedRequest | undefined;
}

export namespace GameBannerUploadPrepareOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameBannerUploadPrepareOutput): any => ({
    ...obj,
  })
}

export interface GameLogoUploadCompleteInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;
}

export namespace GameLogoUploadCompleteInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameLogoUploadCompleteInput): any => ({
    ...obj,
  })
}

export interface GameLogoUploadCompleteOutput {
}

export namespace GameLogoUploadCompleteOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameLogoUploadCompleteOutput): any => ({
    ...obj,
  })
}

export interface GameLogoUploadPrepareInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * The path/filename of the game logo.
   */
  path: string | undefined;

  /**
   * The MIME type of the game logo.
   */
  mime?: string;

  /**
   * Unsigned 64 bit integer.
   */
  contentLength: number | undefined;
}

export namespace GameLogoUploadPrepareInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameLogoUploadPrepareInput): any => ({
    ...obj,
  })
}

export interface GameLogoUploadPrepareOutput {
  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  /**
   * A presigned request used to upload files. Upload your file to the given URL via a PUT request.
   */
  presignedRequest: UploadPresignedRequest | undefined;
}

export namespace GameLogoUploadPrepareOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameLogoUploadPrepareOutput): any => ({
    ...obj,
  })
}

export interface GetGameBillingInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Unsigned 64 bit integer.
   */
  queryStart?: number;

  /**
   * Unsigned 64 bit integer.
   */
  queryEnd?: number;
}

export namespace GetGameBillingInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameBillingInput): any => ({
    ...obj,
  })
}

/**
 * A region summary.
 */
export interface RegionSummary {
  /**
   * A universally unique identifier.
   */
  regionId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  regionNameId: string | undefined;

  /**
   * The server provider of this region.
   */
  provider: string | undefined;

  /**
   * A universal number given to this region.
   */
  universalRegion: number | undefined;

  /**
   * Represent a resource's readable display name.
   */
  providerDisplayName: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  regionDisplayName: string | undefined;
}

export namespace RegionSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RegionSummary): any => ({
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

export enum GroupStatus {
  ACTIVE = "active",
  PAYMENT_FAILED = "payment_failed",
  SETUP_INCOMPLETE = "setup_incomplete",
  SPENDING_LIMIT_REACHED = "spending_limit_reached",
}

/**
 * Region tier metrics.
 */
export interface RegionTierMetrics {
  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A universally unique identifier.
   */
  regionId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  tierNameId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  lobbyGroupNameId: string | undefined;

  /**
   * How long a region tier has been active (in seconds).
   */
  uptime: number | undefined;
}

export namespace RegionTierMetrics {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RegionTierMetrics): any => ({
    ...obj,
  })
}

/**
 * A namespace summary.
 */
export interface NamespaceSummary {
  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  nameId: string | undefined;
}

export namespace NamespaceSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: NamespaceSummary): any => ({
    ...obj,
  })
}

export enum GameBillingPlanCode {
  ENTERPRISE = "enterprise",
  FREE = "free",
  GAME_HOBBY_MONTHLY = "game_hobby_monthly",
  GAME_HOBBY_YEARLY = "game_hobby_yearly",
  GAME_STUDIO_MONTHLY = "game_studio_monthly",
  GAME_STUDIO_YEARLY = "game_studio_yearly",
}

export interface GetGameBillingOutput {
  /**
   * A game handle.
   */
  game: GameHandle | undefined;

  /**
   * A list of namespace summaries.
   */
  namespaces: (NamespaceSummary)[] | undefined;

  /**
   * A list of multiple region tier metrics.
   */
  metrics: (RegionTierMetrics)[] | undefined;

  /**
   * The status of a developer group.
   */
  groupStatus: GroupStatus | string | undefined;

  /**
   * Whether or not the given game can actively host games.
   */
  groupActive: boolean | undefined;

  /**
   * A value denoting a game's billing plan.
   */
  plan: GameBillingPlanCode | string | undefined;

  /**
   * A list of region summaries.
   */
  availableRegions: (RegionSummary)[] | undefined;
}

export namespace GetGameBillingOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameBillingOutput): any => ({
    ...obj,
  })
}

export interface GetGameBillingPlansInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;
}

export namespace GetGameBillingPlansInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameBillingPlansInput): any => ({
    ...obj,
  })
}

export enum BillingInterval {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

/**
 * A billing plan.
 */
export interface GameBillingPlan {
  /**
   * A value denoting a game's billing plan.
   */
  code: GameBillingPlanCode | string | undefined;

  name: string | undefined;
  /**
   * The interval a billing plan acts on.
   */
  interval: BillingInterval | string | undefined;

  /**
   * Signed 64 bit integer.
   */
  amount: number | undefined;

  currency: string | undefined;
}

export namespace GameBillingPlan {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameBillingPlan): any => ({
    ...obj,
  })
}

export interface GetGameBillingPlansOutput {
  /**
   * A list of billing plans.
   */
  plans: (GameBillingPlan)[] | undefined;
}

export namespace GetGameBillingPlansOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameBillingPlansOutput): any => ({
    ...obj,
  })
}

export interface GetGameByIdInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;
}

export namespace GetGameByIdInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameByIdInput): any => ({
    ...obj,
  })
}

/**
 * A version summary.
 */
export interface VersionSummary {
  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;
}

export namespace VersionSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: VersionSummary): any => ({
    ...obj,
  })
}

/**
 * A full game.
 */
export interface GameFull {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

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
   * A universally unique identifier.
   */
  developerGroupId: string | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  totalPlayerCount: number | undefined;

  /**
   * The URL of this game's logo image.
   */
  logoUrl?: string;

  /**
   * The URL of this game's banner image.
   */
  bannerUrl?: string;

  /**
   * A list of namespace summaries.
   */
  namespaces: (NamespaceSummary)[] | undefined;

  /**
   * A list of version summaries.
   */
  versions: (VersionSummary)[] | undefined;

  /**
   * A list of region summaries.
   */
  availableRegions: (RegionSummary)[] | undefined;
}

export namespace GameFull {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameFull): any => ({
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

export interface GetGameByIdOutput {
  /**
   * A full game.
   */
  game: GameFull | undefined;

  /**
   * Provided by watchable endpoints used in blocking loops.
   */
  watch: WatchResponse | undefined;
}

export namespace GetGameByIdOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameByIdOutput): any => ({
    ...obj,
  })
}

export interface GetGamesInput {
  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;
}

export namespace GetGamesInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGamesInput): any => ({
    ...obj,
  })
}

/**
 * A game summary.
 */
export interface GameSummary {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

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
   * A universally unique identifier.
   */
  developerGroupId: string | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  totalPlayerCount: number | undefined;

  /**
   * The URL of this game's logo image.
   */
  logoUrl?: string;

  /**
   * The URL of this game's banner image.
   */
  bannerUrl?: string;
}

export namespace GameSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GameSummary): any => ({
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

export interface GetGamesOutput {
  /**
   * A list of game summaries.
   */
  games: (GameSummary)[] | undefined;

  /**
   * A list of group summaries.
   */
  groups: (GroupSummary)[] | undefined;

  /**
   * Provided by watchable endpoints used in blocking loops.
   */
  watch: WatchResponse | undefined;
}

export namespace GetGamesOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGamesOutput): any => ({
    ...obj,
  })
}

export interface SetGameBillingPlanInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A value denoting a game's billing plan.
   */
  plan: GameBillingPlanCode | string | undefined;
}

export namespace SetGameBillingPlanInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetGameBillingPlanInput): any => ({
    ...obj,
  })
}

export interface SetGameBillingPlanOutput {
}

export namespace SetGameBillingPlanOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetGameBillingPlanOutput): any => ({
    ...obj,
  })
}

export interface ValidateGameInput {
  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  nameId: string | undefined;
}

export namespace ValidateGameInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameInput): any => ({
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

export interface ValidateGameOutput {
  /**
   * A list of validation errors.
   */
  errors: (ValidationError)[] | undefined;
}

export namespace ValidateGameOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameOutput): any => ({
    ...obj,
  })
}

/**
 * A file being prepared to upload.
 */
export interface UploadPrepareFile {
  /**
   * The path/filename of the file.
   */
  path: string | undefined;

  /**
   * The MIME type of the file.
   */
  contentType?: string;

  /**
   * Unsigned 64 bit integer.
   */
  contentLength: number | undefined;
}

export namespace UploadPrepareFile {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UploadPrepareFile): any => ({
    ...obj,
  })
}

export interface CreateGameBuildInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * A tag given to the game build.
   */
  imageTag: string | undefined;

  /**
   * A file being prepared to upload.
   */
  imageFile: UploadPrepareFile | undefined;
}

export namespace CreateGameBuildInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameBuildInput): any => ({
    ...obj,
  })
}

export interface CreateGameBuildOutput {
  /**
   * A universally unique identifier.
   */
  buildId: string | undefined;

  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  /**
   * A presigned request used to upload files. Upload your file to the given URL via a PUT request.
   */
  imagePresignedRequest: UploadPresignedRequest | undefined;
}

export namespace CreateGameBuildOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameBuildOutput): any => ({
    ...obj,
  })
}

export interface ListGameBuildsInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;
}

export namespace ListGameBuildsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListGameBuildsInput): any => ({
    ...obj,
  })
}

/**
 * A build summary.
 */
export interface BuildSummary {
  /**
   * A universally unique identifier.
   */
  buildId: string | undefined;

  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * Unsigned 64 bit integer.
   */
  contentLength: number | undefined;

  /**
   * Whether or not this build has completely been uploaded.
   */
  complete: boolean | undefined;
}

export namespace BuildSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: BuildSummary): any => ({
    ...obj,
  })
}

export interface ListGameBuildsOutput {
  /**
   * A list of build summaries.
   */
  builds: (BuildSummary)[] | undefined;
}

export namespace ListGameBuildsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListGameBuildsOutput): any => ({
    ...obj,
  })
}

export interface CreateGameCdnSiteInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * A list of files preparing to upload.
   */
  files: (UploadPrepareFile)[] | undefined;
}

export namespace CreateGameCdnSiteInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameCdnSiteInput): any => ({
    ...obj,
  })
}

export interface CreateGameCdnSiteOutput {
  /**
   * A universally unique identifier.
   */
  siteId: string | undefined;

  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  presignedRequests: (UploadPresignedRequest)[] | undefined;
}

export namespace CreateGameCdnSiteOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameCdnSiteOutput): any => ({
    ...obj,
  })
}

export interface ListGameCdnSitesInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;
}

export namespace ListGameCdnSitesInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListGameCdnSitesInput): any => ({
    ...obj,
  })
}

/**
 * A CDN site summary.
 */
export interface CdnSiteSummary {
  /**
   * A universally unique identifier.
   */
  siteId: string | undefined;

  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * Unsigned 64 bit integer.
   */
  contentLength: number | undefined;

  /**
   * Whether or not this site has completely been uploaded.
   */
  complete: boolean | undefined;
}

export namespace CdnSiteSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnSiteSummary): any => ({
    ...obj,
  })
}

export interface ListGameCdnSitesOutput {
  /**
   * A list of CDN site summaries.
   */
  sites: (CdnSiteSummary)[] | undefined;
}

export namespace ListGameCdnSitesOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListGameCdnSitesOutput): any => ({
    ...obj,
  })
}

export interface CompleteCustomAvatarUploadInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;
}

export namespace CompleteCustomAvatarUploadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteCustomAvatarUploadInput): any => ({
    ...obj,
  })
}

export interface CompleteCustomAvatarUploadOutput {
}

export namespace CompleteCustomAvatarUploadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteCustomAvatarUploadOutput): any => ({
    ...obj,
  })
}

export interface ListGameCustomAvatarsInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;
}

export namespace ListGameCustomAvatarsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListGameCustomAvatarsInput): any => ({
    ...obj,
  })
}

/**
 * A custom avatar summary.
 */
export interface CustomAvatarSummary {
  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * The URL of this custom avatar image. Only present if upload is complete.
   */
  url?: string;

  /**
   * Unsigned 64 bit integer.
   */
  contentLength: number | undefined;

  /**
   * Whether or not this custom avatar has completely been uploaded.
   */
  complete: boolean | undefined;
}

export namespace CustomAvatarSummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CustomAvatarSummary): any => ({
    ...obj,
  })
}

export interface ListGameCustomAvatarsOutput {
  /**
   * A list of custom avatar summaries.
   */
  customAvatars: (CustomAvatarSummary)[] | undefined;
}

export namespace ListGameCustomAvatarsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListGameCustomAvatarsOutput): any => ({
    ...obj,
  })
}

export interface PrepareCustomAvatarUploadInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * The path/filename of the custom avatar.
   */
  path: string | undefined;

  /**
   * The MIME type of the custom avatar.
   */
  mime?: string;

  /**
   * Unsigned 64 bit integer.
   */
  contentLength: number | undefined;
}

export namespace PrepareCustomAvatarUploadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PrepareCustomAvatarUploadInput): any => ({
    ...obj,
  })
}

export interface PrepareCustomAvatarUploadOutput {
  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;

  /**
   * A presigned request used to upload files. Upload your file to the given URL via a PUT request.
   */
  presignedRequest: UploadPresignedRequest | undefined;
}

export namespace PrepareCustomAvatarUploadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PrepareCustomAvatarUploadOutput): any => ({
    ...obj,
  })
}

export interface DeleteMatchmakerLobbyInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  lobbyId: string | undefined;
}

export namespace DeleteMatchmakerLobbyInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: DeleteMatchmakerLobbyInput): any => ({
    ...obj,
  })
}

export interface DeleteMatchmakerLobbyOutput {
  /**
   * Whether or not the lobby was successfully stopped.
   */
  didRemove: boolean | undefined;
}

export namespace DeleteMatchmakerLobbyOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: DeleteMatchmakerLobbyOutput): any => ({
    ...obj,
  })
}

export enum LogStream {
  /**
   * Stderrs tream from the given process.
   */
  STD_ERR = "std_err",
  /**
   * Stdout stream from the given processs.
   */
  STD_OUT = "std_out",
}

export interface ExportLobbyLogsInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  lobbyId: string | undefined;

  stream: LogStream | string | undefined;
}

export namespace ExportLobbyLogsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ExportLobbyLogsInput): any => ({
    ...obj,
  })
}

export interface ExportLobbyLogsOutput {
  /**
   * The URL to a CSV file for the given lobby history.
   */
  url: string | undefined;
}

export namespace ExportLobbyLogsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ExportLobbyLogsOutput): any => ({
    ...obj,
  })
}

export interface ExportMatchmakerLobbyHistoryInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Unsigned 64 bit integer.
   */
  queryStart: number | undefined;

  /**
   * Unsigned 64 bit integer.
   */
  queryEnd: number | undefined;
}

export namespace ExportMatchmakerLobbyHistoryInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ExportMatchmakerLobbyHistoryInput): any => ({
    ...obj,
  })
}

export interface ExportMatchmakerLobbyHistoryOutput {
  /**
   * The URL to a CSV file for the given lobby history.
   */
  url: string | undefined;
}

export namespace ExportMatchmakerLobbyHistoryOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ExportMatchmakerLobbyHistoryOutput): any => ({
    ...obj,
  })
}

export interface GetLobbyLogsInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  lobbyId: string | undefined;

  stream: LogStream | string | undefined;
  /**
   * A query parameter denoting the requests watch index.
   */
  watchIndex?: string;
}

export namespace GetLobbyLogsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetLobbyLogsInput): any => ({
    ...obj,
  })
}

export interface GetLobbyLogsOutput {
  /**
   * Sorted old to new.
   */
  lines: (string)[] | undefined;

  /**
   * Sorted old to new.
   */
  timestamps: (Date)[] | undefined;

  /**
   * Provided by watchable endpoints used in blocking loops.
   */
  watch: WatchResponse | undefined;
}

export namespace GetLobbyLogsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetLobbyLogsOutput): any => ({
    ...obj,
  })
}

export interface CreateGameNamespaceInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  nameId: string | undefined;
}

export namespace CreateGameNamespaceInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameNamespaceInput): any => ({
    ...obj,
  })
}

export interface CreateGameNamespaceOutput {
  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;
}

export namespace CreateGameNamespaceOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameNamespaceOutput): any => ({
    ...obj,
  })
}

/**
 * Range of ports that can be connected to.
 */
export interface PortRange {
  /**
   * Unsigned 32 bit integer.
   */
  min: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  max: number | undefined;
}

export namespace PortRange {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: PortRange): any => ({
    ...obj,
  })
}

export enum ProxyProtocol {
  HTTP = "http",
  HTTPS = "https",
  UDP = "udp",
}

/**
 * @deprecated
 *
 * A docker port.
 */
export interface LobbyGroupRuntimeDockerPort {
  /**
   * The label of this docker port.
   */
  label: string | undefined;

  /**
   * The port number to connect to.
   */
  targetPort?: number;

  /**
   * The port range to connect to for UDP.
   */
  portRange?: PortRange;

  /**
   * A proxy protocol.
   */
  proxyProtocol: ProxyProtocol | string | undefined;
}

export namespace LobbyGroupRuntimeDockerPort {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LobbyGroupRuntimeDockerPort): any => ({
    ...obj,
  })
}

export interface CreateGameNamespaceTokenDevelopmentInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * The hostname used for the token.
   */
  hostname: string | undefined;

  /**
   * @deprecated
   *
   * A list of docker ports.
   */
  lobbyPorts: (LobbyGroupRuntimeDockerPort)[] | undefined;
}

export namespace CreateGameNamespaceTokenDevelopmentInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameNamespaceTokenDevelopmentInput): any => ({
    ...obj,
  })
}

export interface CreateGameNamespaceTokenDevelopmentOutput {
  /**
   * A JSON Web Token.
   *
   * Slightly modified to include a description prefix and use Protobufs of
   * JSON.
   */
  token: string | undefined;
}

export namespace CreateGameNamespaceTokenDevelopmentOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameNamespaceTokenDevelopmentOutput): any => ({
    ...obj,
    ...(obj.token && { token:
      SENSITIVE_STRING
    }),
  })
}

export interface CreateGameNamespaceTokenPublicInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;
}

export namespace CreateGameNamespaceTokenPublicInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameNamespaceTokenPublicInput): any => ({
    ...obj,
  })
}

export interface CreateGameNamespaceTokenPublicOutput {
  /**
   * A JSON Web Token.
   *
   * Slightly modified to include a description prefix and use Protobufs of
   * JSON.
   */
  token: string | undefined;
}

export namespace CreateGameNamespaceTokenPublicOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameNamespaceTokenPublicOutput): any => ({
    ...obj,
    ...(obj.token && { token:
      SENSITIVE_STRING
    }),
  })
}

export interface GetGameNamespaceByIdInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;
}

export namespace GetGameNamespaceByIdInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameNamespaceByIdInput): any => ({
    ...obj,
  })
}

export enum CdnAuthType {
  BASIC = "basic",
  NONE = "none",
}

/**
 * An authenticated CDN user for a given namespace.
 */
export interface CdnNamespaceAuthUser {
  /**
   * A user name.
   */
  user: string | undefined;
}

export namespace CdnNamespaceAuthUser {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnNamespaceAuthUser): any => ({
    ...obj,
  })
}

/**
 * CDN Namespace domain verification method HTTP variant.
 */
export interface CdnNamespaceDomainVerificationMethodHttp {
  /**
   * The CNAME record this domain should point to.
   */
  cnameRecord: string | undefined;
}

export namespace CdnNamespaceDomainVerificationMethodHttp {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnNamespaceDomainVerificationMethodHttp): any => ({
    ...obj,
  })
}

/**
 * CDN Namespace domain verification method variant denoting that this record is invalid.
 */
export interface CdnNamespaceDomainVerificationMethodInvalid {
}

export namespace CdnNamespaceDomainVerificationMethodInvalid {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnNamespaceDomainVerificationMethodInvalid): any => ({
    ...obj,
  })
}

/**
 * A union representing the verification method used for this CDN domain.
 */
export type CdnNamespaceDomainVerificationMethod =
  | CdnNamespaceDomainVerificationMethod.HttpMember
  | CdnNamespaceDomainVerificationMethod.InvalidMember
  | CdnNamespaceDomainVerificationMethod.$UnknownMember

export namespace CdnNamespaceDomainVerificationMethod {

  /**
   * CDN Namespace domain verification method variant denoting that this record is invalid.
   */
  export interface InvalidMember {
    invalid: CdnNamespaceDomainVerificationMethodInvalid;
    http?: never;
    $unknown?: never;
  }

  /**
   * CDN Namespace domain verification method HTTP variant.
   */
  export interface HttpMember {
    invalid?: never;
    http: CdnNamespaceDomainVerificationMethodHttp;
    $unknown?: never;
  }

  export interface $UnknownMember {
    invalid?: never;
    http?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    invalid: (value: CdnNamespaceDomainVerificationMethodInvalid) => T;
    http: (value: CdnNamespaceDomainVerificationMethodHttp) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: CdnNamespaceDomainVerificationMethod,
    visitor: Visitor<T>
  ): T => {
    if (value.invalid !== undefined) return visitor.invalid(value.invalid);
    if (value.http !== undefined) return visitor.http(value.http);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnNamespaceDomainVerificationMethod): any => {
    if (obj.invalid !== undefined) return {invalid:
      CdnNamespaceDomainVerificationMethodInvalid.filterSensitiveLog(obj.invalid)
    };
    if (obj.http !== undefined) return {http:
      CdnNamespaceDomainVerificationMethodHttp.filterSensitiveLog(obj.http)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

export enum CdnNamespaceDomainVerificationStatus {
  ACTIVE = "active",
  FAILED = "failed",
  PENDING = "pending",
}

/**
 * A CDN domain for a given namespace.
 */
export interface CdnNamespaceDomain {
  /**
   * A valid domain name (no protocol).
   */
  domain: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * A value denoting the status of a CDN domain's verification status.
   */
  verificationStatus: CdnNamespaceDomainVerificationStatus | string | undefined;

  /**
   * A union representing the verification method used for this CDN domain.
   */
  verificationMethod: CdnNamespaceDomainVerificationMethod | undefined;

  verificationErrors: (string)[] | undefined;
}

export namespace CdnNamespaceDomain {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnNamespaceDomain): any => ({
    ...obj,
    ...(obj.verificationMethod && { verificationMethod:
      CdnNamespaceDomainVerificationMethod.filterSensitiveLog(obj.verificationMethod)
    }),
  })
}

/**
 * CDN configuration for a given namespace.
 */
export interface CdnNamespaceConfig {
  /**
   * Whether or not to allow users to connect to the given namespace via domain name.
   */
  enableDomainPublicAuth: boolean | undefined;

  /**
   * A list of CDN domains for a given namespace.
   */
  domains: (CdnNamespaceDomain)[] | undefined;

  /**
   * A value denoting what type of authentication to use for a game namespace's CDN.
   */
  authType: CdnAuthType | string | undefined;

  /**
   * A list of CDN authenticated users for a given namespace.
   */
  authUserList: (CdnNamespaceAuthUser)[] | undefined;
}

export namespace CdnNamespaceConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnNamespaceConfig): any => ({
    ...obj,
    ...(obj.domains && { domains:
      obj.domains.map(
        item =>
        CdnNamespaceDomain.filterSensitiveLog(item)
      )
    }),
  })
}

/**
 * Identity configuration for a given namespace.
 */
export interface IdentityNamespaceConfig {
}

export namespace IdentityNamespaceConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: IdentityNamespaceConfig): any => ({
    ...obj,
  })
}

/**
 * KV configuration for a given namespace.
 */
export interface KvNamespaceConfig {
}

export namespace KvNamespaceConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: KvNamespaceConfig): any => ({
    ...obj,
  })
}

/**
 * Matchmaker configuration for a given namespace.
 */
export interface MatchmakerNamespaceConfig {
  /**
   * Unsigned 32 bit integer.
   */
  lobbyCountMax: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersPerClient: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersPerClientVpn: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersPerClientProxy: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersPerClientTor: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersPerClientHosting: number | undefined;
}

export namespace MatchmakerNamespaceConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: MatchmakerNamespaceConfig): any => ({
    ...obj,
  })
}

/**
 * Cloud configuration for a given namespace.
 */
export interface CloudNamespaceConfig {
  /**
   * CDN configuration for a given namespace.
   */
  cdn: CdnNamespaceConfig | undefined;

  /**
   * Matchmaker configuration for a given namespace.
   */
  matchmaker: MatchmakerNamespaceConfig | undefined;

  /**
   * KV configuration for a given namespace.
   */
  kv: KvNamespaceConfig | undefined;

  /**
   * Identity configuration for a given namespace.
   */
  identity: IdentityNamespaceConfig | undefined;
}

export namespace CloudNamespaceConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CloudNamespaceConfig): any => ({
    ...obj,
    ...(obj.cdn && { cdn:
      CdnNamespaceConfig.filterSensitiveLog(obj.cdn)
    }),
  })
}

/**
 * A full namespace.
 */
export interface NamespaceFull {
  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;

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
   * Cloud configuration for a given namespace.
   */
  config: CloudNamespaceConfig | undefined;
}

export namespace NamespaceFull {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: NamespaceFull): any => ({
    ...obj,
    ...(obj.config && { config:
      CloudNamespaceConfig.filterSensitiveLog(obj.config)
    }),
  })
}

export interface GetGameNamespaceByIdOutput {
  /**
   * A full namespace.
   */
  namespace: NamespaceFull | undefined;
}

export namespace GetGameNamespaceByIdOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameNamespaceByIdOutput): any => ({
    ...obj,
    ...(obj.namespace && { namespace:
      NamespaceFull.filterSensitiveLog(obj.namespace)
    }),
  })
}

export interface RemoveNamespaceCdnAuthUserInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A user name.
   */
  user: string | undefined;
}

export namespace RemoveNamespaceCdnAuthUserInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RemoveNamespaceCdnAuthUserInput): any => ({
    ...obj,
  })
}

export interface RemoveNamespaceCdnAuthUserOutput {
}

export namespace RemoveNamespaceCdnAuthUserOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RemoveNamespaceCdnAuthUserOutput): any => ({
    ...obj,
  })
}

export interface RemoveNamespaceDomainInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A valid domain name (no protocol).
   */
  domain: string | undefined;
}

export namespace RemoveNamespaceDomainInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RemoveNamespaceDomainInput): any => ({
    ...obj,
  })
}

export interface RemoveNamespaceDomainOutput {
}

export namespace RemoveNamespaceDomainOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RemoveNamespaceDomainOutput): any => ({
    ...obj,
  })
}

export interface SetNamespaceCdnAuthTypeInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A value denoting what type of authentication to use for a game namespace's CDN.
   */
  authType: CdnAuthType | string | undefined;
}

export namespace SetNamespaceCdnAuthTypeInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetNamespaceCdnAuthTypeInput): any => ({
    ...obj,
  })
}

export interface SetNamespaceCdnAuthTypeOutput {
}

export namespace SetNamespaceCdnAuthTypeOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SetNamespaceCdnAuthTypeOutput): any => ({
    ...obj,
  })
}

export interface ToggleNamespaceDomainPublicAuthInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * Whether or not to enable authentication based on domain.
   */
  enabled: boolean | undefined;
}

export namespace ToggleNamespaceDomainPublicAuthInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ToggleNamespaceDomainPublicAuthInput): any => ({
    ...obj,
  })
}

export interface ToggleNamespaceDomainPublicAuthOutput {
}

export namespace ToggleNamespaceDomainPublicAuthOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ToggleNamespaceDomainPublicAuthOutput): any => ({
    ...obj,
  })
}

export interface UpdateGameNamespaceMatchmakerConfigInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  lobbyCountMax: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayers: number | undefined;
}

export namespace UpdateGameNamespaceMatchmakerConfigInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateGameNamespaceMatchmakerConfigInput): any => ({
    ...obj,
  })
}

export interface UpdateGameNamespaceMatchmakerConfigOutput {
}

export namespace UpdateGameNamespaceMatchmakerConfigOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateGameNamespaceMatchmakerConfigOutput): any => ({
    ...obj,
  })
}

export interface UpdateGameNamespaceVersionInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;
}

export namespace UpdateGameNamespaceVersionInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateGameNamespaceVersionInput): any => ({
    ...obj,
  })
}

export interface UpdateGameNamespaceVersionOutput {
}

export namespace UpdateGameNamespaceVersionOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateGameNamespaceVersionOutput): any => ({
    ...obj,
  })
}

export interface UpdateNamespaceCdnAuthUserInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A user name.
   */
  user: string | undefined;

  /**
   * A bcrypt encrypted password. An error is returned if the given string is not properly encrypted.
   */
  password: string | undefined;
}

export namespace UpdateNamespaceCdnAuthUserInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateNamespaceCdnAuthUserInput): any => ({
    ...obj,
  })
}

export interface UpdateNamespaceCdnAuthUserOutput {
}

export namespace UpdateNamespaceCdnAuthUserOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: UpdateNamespaceCdnAuthUserOutput): any => ({
    ...obj,
  })
}

export interface ValidateGameNamespaceInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  nameId: string | undefined;
}

export namespace ValidateGameNamespaceInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameNamespaceInput): any => ({
    ...obj,
  })
}

export interface ValidateGameNamespaceOutput {
  /**
   * A list of validation errors.
   */
  errors: (ValidationError)[] | undefined;
}

export namespace ValidateGameNamespaceOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameNamespaceOutput): any => ({
    ...obj,
  })
}

export interface ValidateGameNamespaceMatchmakerConfigInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  lobbyCountMax: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayers: number | undefined;
}

export namespace ValidateGameNamespaceMatchmakerConfigInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameNamespaceMatchmakerConfigInput): any => ({
    ...obj,
  })
}

export interface ValidateGameNamespaceMatchmakerConfigOutput {
  /**
   * A list of validation errors.
   */
  errors: (ValidationError)[] | undefined;
}

export namespace ValidateGameNamespaceMatchmakerConfigOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameNamespaceMatchmakerConfigOutput): any => ({
    ...obj,
  })
}

export interface ValidateGameNamespaceTokenDevelopmentInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  hostname: string | undefined;
  /**
   * @deprecated
   *
   * A list of docker ports.
   */
  lobbyPorts: (LobbyGroupRuntimeDockerPort)[] | undefined;
}

export namespace ValidateGameNamespaceTokenDevelopmentInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameNamespaceTokenDevelopmentInput): any => ({
    ...obj,
  })
}

export interface ValidateGameNamespaceTokenDevelopmentOutput {
  /**
   * A list of validation errors.
   */
  errors: (ValidationError)[] | undefined;
}

export namespace ValidateGameNamespaceTokenDevelopmentOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameNamespaceTokenDevelopmentOutput): any => ({
    ...obj,
  })
}

export interface GetNamespaceAnalyticsMatchmakerLiveInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;
}

export namespace GetNamespaceAnalyticsMatchmakerLiveInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetNamespaceAnalyticsMatchmakerLiveInput): any => ({
    ...obj,
  })
}

/**
 * Analyical information about a lobby.
 */
export interface AnalyticsLobbySummary {
  /**
   * A universally unique identifier.
   */
  lobbyId: string | undefined;

  /**
   * A universally unique identifier.
   */
  lobbyGroupId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  lobbyGroupNameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  regionId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * Whether or not this lobby is ready.
   */
  isReady: boolean | undefined;

  /**
   * Whether or not this lobby is idle.
   */
  isIdle: boolean | undefined;

  /**
   * Whether or not this lobby is in a closed state.
   */
  isClosed: boolean | undefined;

  /**
   * Whether or not this lobby is outdated.
   */
  isOutdated: boolean | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersNormal: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersDirect: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersParty: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  totalPlayerCount: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  registeredPlayerCount: number | undefined;
}

export namespace AnalyticsLobbySummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: AnalyticsLobbySummary): any => ({
    ...obj,
  })
}

export interface GetNamespaceAnalyticsMatchmakerLiveOutput {
  /**
   * A list of analytics lobby summaries.
   */
  lobbies: (AnalyticsLobbySummary)[] | undefined;
}

export namespace GetNamespaceAnalyticsMatchmakerLiveOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetNamespaceAnalyticsMatchmakerLiveOutput): any => ({
    ...obj,
  })
}

export interface GetNamespaceLobbyInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A universally unique identifier.
   */
  lobbyId: string | undefined;
}

export namespace GetNamespaceLobbyInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetNamespaceLobbyInput): any => ({
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
 * The status of a stopped lobby.
 */
export interface LogsLobbyStatusStopped {
  /**
   * RFC3339 timestamp.
   */
  stopTs: Date | undefined;

  /**
   * Whether or not the lobby failed or stopped successfully.
   */
  failed: boolean | undefined;

  /**
   * The exit code returned by the lobby's main process when stopped.
   */
  exitCode: number | undefined;
}

export namespace LogsLobbyStatusStopped {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LogsLobbyStatusStopped): any => ({
    ...obj,
  })
}

/**
 * A union representing the state of a lobby.
 */
export type LogsLobbyStatus =
  | LogsLobbyStatus.RunningMember
  | LogsLobbyStatus.StoppedMember
  | LogsLobbyStatus.$UnknownMember

export namespace LogsLobbyStatus {

  /**
   * A running lobby.
   */
  export interface RunningMember {
    running: Unit;
    stopped?: never;
    $unknown?: never;
  }

  /**
   * The status of a stopped lobby.
   */
  export interface StoppedMember {
    running?: never;
    stopped: LogsLobbyStatusStopped;
    $unknown?: never;
  }

  export interface $UnknownMember {
    running?: never;
    stopped?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    running: (value: Unit) => T;
    stopped: (value: LogsLobbyStatusStopped) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: LogsLobbyStatus,
    visitor: Visitor<T>
  ): T => {
    if (value.running !== undefined) return visitor.running(value.running);
    if (value.stopped !== undefined) return visitor.stopped(value.stopped);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LogsLobbyStatus): any => {
    if (obj.running !== undefined) return {running:
      Unit.filterSensitiveLog(obj.running)
    };
    if (obj.stopped !== undefined) return {stopped:
      LogsLobbyStatusStopped.filterSensitiveLog(obj.stopped)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

/**
 * A logs summary for a lobby.
 */
export interface LogsLobbySummary {
  /**
   * A universally unique identifier.
   */
  lobbyId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  lobbyGroupNameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  regionId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * RFC3339 timestamp.
   */
  startTs?: Date;

  /**
   * RFC3339 timestamp.
   */
  readyTs?: Date;

  /**
   * A union representing the state of a lobby.
   */
  status: LogsLobbyStatus | undefined;
}

export namespace LogsLobbySummary {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LogsLobbySummary): any => ({
    ...obj,
    ...(obj.status && { status:
      LogsLobbyStatus.filterSensitiveLog(obj.status)
    }),
  })
}

/**
 * Metrics relating to a job service.
 */
export interface SvcMetrics {
  /**
   * The job name.
   */
  job: string | undefined;

  /**
   * CPU metrics.
   */
  cpu: (number)[] | undefined;

  /**
   * Memory metrics.
   */
  memory: (number)[] | undefined;

  /**
   * Peak memory metrics.
   */
  memoryMax: (number)[] | undefined;

  /**
   * Total allocated memory (MB).
   */
  allocatedMemory: number | undefined;
}

export namespace SvcMetrics {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SvcMetrics): any => ({
    ...obj,
  })
}

/**
 * A performance mark.
 */
export interface LogsPerfMark {
  /**
   * The label given to this performance mark.
   */
  label: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  ts: Date | undefined;

  /**
   * A universally unique identifier.
   */
  rayId?: string;

  /**
   * A universally unique identifier.
   */
  reqId?: string;
}

export namespace LogsPerfMark {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LogsPerfMark): any => ({
    ...obj,
  })
}

/**
 * A performance span.
 */
export interface LogsPerfSpan {
  /**
   * The label given to this performance span.
   */
  label: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  startTs: Date | undefined;

  /**
   * RFC3339 timestamp.
   */
  finishTs?: Date;

  /**
   * A universally unique identifier.
   */
  reqId?: string;
}

export namespace LogsPerfSpan {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LogsPerfSpan): any => ({
    ...obj,
  })
}

/**
 * A service performance summary.
 */
export interface SvcPerf {
  /**
   * The name of the service.
   */
  svcName: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  ts: Date | undefined;

  /**
   * Unsigned 64 bit integer.
   */
  duration: number | undefined;

  /**
   * A universally unique identifier.
   */
  reqId?: string;

  /**
   * A list of performance spans.
   */
  spans: (LogsPerfSpan)[] | undefined;

  /**
   * A list of performance marks.
   */
  marks: (LogsPerfMark)[] | undefined;
}

export namespace SvcPerf {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: SvcPerf): any => ({
    ...obj,
  })
}

export interface GetNamespaceLobbyOutput {
  /**
   * A logs summary for a lobby.
   */
  lobby: LogsLobbySummary | undefined;

  /**
   * Metrics relating to a job service.
   */
  metrics?: SvcMetrics;

  /**
   * @deprecated
   *
   * A list of URLs.
   */
  stdoutPresignedUrls: (string)[] | undefined;

  /**
   * @deprecated
   *
   * A list of URLs.
   */
  stderrPresignedUrls: (string)[] | undefined;

  /**
   * @deprecated
   *
   * A list of service performance summaries.
   */
  perfLists: (SvcPerf)[] | undefined;
}

export namespace GetNamespaceLobbyOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetNamespaceLobbyOutput): any => ({
    ...obj,
    ...(obj.lobby && { lobby:
      LogsLobbySummary.filterSensitiveLog(obj.lobby)
    }),
  })
}

export interface ListNamespaceLobbiesInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  namespaceId: string | undefined;

  /**
   * Returns lobbies created before this timestamp.
   */
  beforeCreateTs?: Date;
}

export namespace ListNamespaceLobbiesInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListNamespaceLobbiesInput): any => ({
    ...obj,
  })
}

export interface ListNamespaceLobbiesOutput {
  /**
   * A list of lobby log summaries.
   */
  lobbies: (LogsLobbySummary)[] | undefined;
}

export namespace ListNamespaceLobbiesOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ListNamespaceLobbiesOutput): any => ({
    ...obj,
    ...(obj.lobbies && { lobbies:
      obj.lobbies.map(
        item =>
        LogsLobbySummary.filterSensitiveLog(item)
      )
    }),
  })
}

export interface CreateCloudTokenInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;
}

export namespace CreateCloudTokenInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateCloudTokenInput): any => ({
    ...obj,
  })
}

export interface CreateCloudTokenOutput {
  /**
   * A JSON Web Token.
   *
   * Slightly modified to include a description prefix and use Protobufs of
   * JSON.
   */
  token: string | undefined;
}

export namespace CreateCloudTokenOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateCloudTokenOutput): any => ({
    ...obj,
    ...(obj.token && { token:
      SENSITIVE_STRING
    }),
  })
}

export interface CdnVersionHeader {
  name: string | undefined;
  value: string | undefined;
}

export namespace CdnVersionHeader {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnVersionHeader): any => ({
    ...obj,
  })
}

export interface CdnVersionCustomHeadersMiddleware {
  headers: (CdnVersionHeader)[] | undefined;
}

export namespace CdnVersionCustomHeadersMiddleware {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnVersionCustomHeadersMiddleware): any => ({
    ...obj,
  })
}

export type CdnVersionMiddlewareKind =
  | CdnVersionMiddlewareKind.CustomHeadersMember
  | CdnVersionMiddlewareKind.$UnknownMember

export namespace CdnVersionMiddlewareKind {

  export interface CustomHeadersMember {
    customHeaders: CdnVersionCustomHeadersMiddleware;
    $unknown?: never;
  }

  export interface $UnknownMember {
    customHeaders?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    customHeaders: (value: CdnVersionCustomHeadersMiddleware) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: CdnVersionMiddlewareKind,
    visitor: Visitor<T>
  ): T => {
    if (value.customHeaders !== undefined) return visitor.customHeaders(value.customHeaders);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnVersionMiddlewareKind): any => {
    if (obj.customHeaders !== undefined) return {customHeaders:
      CdnVersionCustomHeadersMiddleware.filterSensitiveLog(obj.customHeaders)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

export interface CdnVersionMiddleware {
  kind: CdnVersionMiddlewareKind | undefined;
}

export namespace CdnVersionMiddleware {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnVersionMiddleware): any => ({
    ...obj,
    ...(obj.kind && { kind:
      CdnVersionMiddlewareKind.filterSensitiveLog(obj.kind)
    }),
  })
}

export interface CdnVersionRoute {
  glob: string | undefined;
  /**
   * Unsigned 32 bit integer.
   */
  priority: number | undefined;

  /**
   * Multiple CDN version middleware.
   */
  middlewares: (CdnVersionMiddleware)[] | undefined;
}

export namespace CdnVersionRoute {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnVersionRoute): any => ({
    ...obj,
    ...(obj.middlewares && { middlewares:
      obj.middlewares.map(
        item =>
        CdnVersionMiddleware.filterSensitiveLog(item)
      )
    }),
  })
}

/**
 * CDN configuration for a given version.
 */
export interface CdnVersionConfig {
  /**
   * A universally unique identifier.
   */
  siteId?: string;

  /**
   * Client-side configuration
   */
  buildCommand?: string;

  /**
   * Client-side configuration
   */
  buildOutput?: string;

  /**
   * Multiple CDN version routes.
   */
  routes?: (CdnVersionRoute)[];
}

export namespace CdnVersionConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CdnVersionConfig): any => ({
    ...obj,
  })
}

export interface CustomAvatar {
  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;
}

export namespace CustomAvatar {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CustomAvatar): any => ({
    ...obj,
  })
}

export interface CustomDisplayName {
  displayName: string | undefined;
}

export namespace CustomDisplayName {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CustomDisplayName): any => ({
    ...obj,
  })
}

/**
 * Identity configuration for a given version.
 */
export interface IdentityVersionConfig {
  customDisplayNames: (CustomDisplayName)[] | undefined;
  customAvatars: (CustomAvatar)[] | undefined;
}

export namespace IdentityVersionConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: IdentityVersionConfig): any => ({
    ...obj,
  })
}

/**
 * KV configuration for a given version.
 */
export interface KvVersionConfig {
}

export namespace KvVersionConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: KvVersionConfig): any => ({
    ...obj,
  })
}

export enum CaptchaLevel {
  ALWAYS_ON = "always_on",
  DIFFICULT = "difficult",
  EASY = "easy",
  MODERATE = "moderate",
}

/**
 * hCpatcha configuration.
 */
export interface MatchmakerCaptchaHcaptcha {
  /**
   * How hard a captcha should be.
   */
  level: CaptchaLevel | string | undefined;
}

export namespace MatchmakerCaptchaHcaptcha {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: MatchmakerCaptchaHcaptcha): any => ({
    ...obj,
  })
}

/**
 * Matchmaker captcha configuration.
 */
export interface MatchmakerCaptcha {
  /**
   * Denotes how many requests a connection can make before it is required to reverify a captcha.
   */
  requestsBeforeReverify: number | undefined;

  /**
   * Denotes how long a connection can continue to reconnect without having to reverify a captcha (in milliseconds).
   */
  verificationTtl: number | undefined;

  /**
   * hCpatcha configuration.
   */
  hcaptcha?: MatchmakerCaptchaHcaptcha;
}

export namespace MatchmakerCaptcha {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: MatchmakerCaptcha): any => ({
    ...obj,
  })
}

/**
 * @deprecated
 *
 * Configuration for how many idle lobbies a game version should have.
 */
export interface IdleLobbiesConfig {
  /**
   * Unsigned 32 bit integer.
   */
  minIdleLobbies: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxIdleLobbies: number | undefined;
}

export namespace IdleLobbiesConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: IdleLobbiesConfig): any => ({
    ...obj,
  })
}

/**
 * @deprecated
 *
 * A game mode region.
 */
export interface LobbyGroupRegion {
  /**
   * A universally unique identifier.
   */
  regionId: string | undefined;

  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  tierNameId: string | undefined;

  /**
   * @deprecated
   *
   * Configuration for how many idle lobbies a game version should have.
   */
  idleLobbies?: IdleLobbiesConfig;
}

export namespace LobbyGroupRegion {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LobbyGroupRegion): any => ({
    ...obj,
  })
}

/**
 * @deprecated
 *
 * A docker environment variable.
 */
export interface LobbyGroupRuntimeDockerEnvVar {
  /**
   * The key of this environment variable.
   */
  key: string | undefined;

  /**
   * The value of this environment variable.
   */
  value: string | undefined;
}

export namespace LobbyGroupRuntimeDockerEnvVar {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LobbyGroupRuntimeDockerEnvVar): any => ({
    ...obj,
  })
}

export enum NetworkMode {
  BRIDGE = "bridge",
  HOST = "host",
}

/**
 * @deprecated
 *
 * A game mode runtime running through Docker.
 */
export interface LobbyGroupRuntimeDocker {
  /**
   * A universally unique identifier.
   */
  buildId?: string;

  /**
   * @deprecated
   *
   * A list of docker arguments.
   */
  args: (string)[] | undefined;

  /**
   * @deprecated
   *
   * A list of docker environment variables.
   */
  envVars: (LobbyGroupRuntimeDockerEnvVar)[] | undefined;

  /**
   * The network mode the job should run on.
   */
  networkMode?: NetworkMode | string;

  /**
   * @deprecated
   *
   * A list of docker ports.
   */
  ports: (LobbyGroupRuntimeDockerPort)[] | undefined;
}

export namespace LobbyGroupRuntimeDocker {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LobbyGroupRuntimeDocker): any => ({
    ...obj,
  })
}

/**
 * @deprecated
 *
 * A union representing the runtime a game mode runs on.
 */
export type LobbyGroupRuntime =
  | LobbyGroupRuntime.DockerMember
  | LobbyGroupRuntime.$UnknownMember

export namespace LobbyGroupRuntime {

  /**
   * @deprecated
   *
   * A game mode runtime running through Docker.
   */
  export interface DockerMember {
    docker: LobbyGroupRuntimeDocker;
    $unknown?: never;
  }

  export interface $UnknownMember {
    docker?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    docker: (value: LobbyGroupRuntimeDocker) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: LobbyGroupRuntime,
    visitor: Visitor<T>
  ): T => {
    if (value.docker !== undefined) return visitor.docker(value.docker);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LobbyGroupRuntime): any => {
    if (obj.docker !== undefined) return {docker:
      LobbyGroupRuntimeDocker.filterSensitiveLog(obj.docker)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
}

/**
 * @deprecated
 *
 * A game mode.
 */
export interface LobbyGroup {
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
   * @deprecated
   *
   * A list of game mode regions.
   */
  regions: (LobbyGroupRegion)[] | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersNormal: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersDirect: number | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  maxPlayersParty: number | undefined;

  /**
   * @deprecated
   *
   * A union representing the runtime a game mode runs on.
   */
  runtime: LobbyGroupRuntime | undefined;
}

export namespace LobbyGroup {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: LobbyGroup): any => ({
    ...obj,
    ...(obj.runtime && { runtime:
      LobbyGroupRuntime.filterSensitiveLog(obj.runtime)
    }),
  })
}

/**
 * Matchmaker configuration for a given version.
 */
export interface MatchmakerVersionConfig {
  /**
   * @deprecated
   *
   * A list of game modes.
   */
  lobbyGroups?: (LobbyGroup)[];

  /**
   * Matchmaker captcha configuration.
   */
  captcha?: MatchmakerCaptcha;
}

export namespace MatchmakerVersionConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: MatchmakerVersionConfig): any => ({
    ...obj,
    ...(obj.lobbyGroups && { lobbyGroups:
      obj.lobbyGroups.map(
        item =>
        LobbyGroup.filterSensitiveLog(item)
      )
    }),
  })
}

/**
 * Cloud configuration for a given version.
 */
export interface CloudVersionConfig {
  /**
   * CDN configuration for a given version.
   */
  cdn?: CdnVersionConfig;

  /**
   * Matchmaker configuration for a given version.
   */
  matchmaker?: MatchmakerVersionConfig;

  /**
   * KV configuration for a given version.
   */
  kv?: KvVersionConfig;

  /**
   * Identity configuration for a given version.
   */
  identity?: IdentityVersionConfig;
}

export namespace CloudVersionConfig {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CloudVersionConfig): any => ({
    ...obj,
    ...(obj.matchmaker && { matchmaker:
      MatchmakerVersionConfig.filterSensitiveLog(obj.matchmaker)
    }),
  })
}

export interface CreateGameVersionInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * Cloud configuration for a given version.
   */
  config: CloudVersionConfig | undefined;
}

export namespace CreateGameVersionInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameVersionInput): any => ({
    ...obj,
  })
}

export interface CreateGameVersionOutput {
  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;
}

export namespace CreateGameVersionOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CreateGameVersionOutput): any => ({
    ...obj,
  })
}

export interface GetGameVersionByIdInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;
}

export namespace GetGameVersionByIdInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameVersionByIdInput): any => ({
    ...obj,
  })
}

/**
 * A full version.
 */
export interface VersionFull {
  /**
   * A universally unique identifier.
   */
  versionId: string | undefined;

  /**
   * RFC3339 timestamp.
   */
  createTs: Date | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * Cloud configuration for a given version.
   */
  config: CloudVersionConfig | undefined;
}

export namespace VersionFull {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: VersionFull): any => ({
    ...obj,
  })
}

export interface GetGameVersionByIdOutput {
  /**
   * A full version.
   */
  version: VersionFull | undefined;
}

export namespace GetGameVersionByIdOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGameVersionByIdOutput): any => ({
    ...obj,
  })
}

export interface ValidateGameVersionInput {
  /**
   * A universally unique identifier.
   */
  gameId: string | undefined;

  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;

  /**
   * Cloud configuration for a given version.
   */
  config: CloudVersionConfig | undefined;
}

export namespace ValidateGameVersionInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameVersionInput): any => ({
    ...obj,
  })
}

export interface ValidateGameVersionOutput {
  /**
   * A list of validation errors.
   */
  errors: (ValidationError)[] | undefined;
}

export namespace ValidateGameVersionOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGameVersionOutput): any => ({
    ...obj,
  })
}

export interface ConvertGroupInput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace ConvertGroupInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ConvertGroupInput): any => ({
    ...obj,
  })
}

export interface ConvertGroupOutput {
}

export namespace ConvertGroupOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ConvertGroupOutput): any => ({
    ...obj,
  })
}

export interface GetGroupBillingInput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace GetGroupBillingInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupBillingInput): any => ({
    ...obj,
  })
}

export interface GetGroupBillingOutput {
  /**
   * Signed 64 bit integer.
   */
  usage: number | undefined;

  /**
   * The status of a developer group.
   */
  status: GroupStatus | string | undefined;

  /**
   * Whether or not the given group can actively host games.
   */
  active: boolean | undefined;
}

export namespace GetGroupBillingOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupBillingOutput): any => ({
    ...obj,
  })
}

export interface GetGroupInvoicesListInput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;

  /**
   * Unsigned 32 bit integer.
   */
  page?: number;

  /**
   * Unsigned 32 bit integer.
   */
  perPage?: number;
}

export namespace GetGroupInvoicesListInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupInvoicesListInput): any => ({
    ...obj,
  })
}

/**
 * A group's billing invoice.
 */
export interface GroupBillingInvoice {
  /**
   * RFC3339 timestamp.
   */
  issuingTs: Date | undefined;

  /**
   * A URL to this invoice's PDF document.
   */
  fileUrl?: string;
}

export namespace GroupBillingInvoice {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupBillingInvoice): any => ({
    ...obj,
  })
}

export interface GetGroupInvoicesListOutput {
  /**
   * A list of a group's billing invoices.
   */
  invoices: (GroupBillingInvoice)[] | undefined;
}

export namespace GetGroupInvoicesListOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetGroupInvoicesListOutput): any => ({
    ...obj,
  })
}

export interface GroupBillingCheckoutInput {
  /**
   * A universally unique identifier.
   */
  groupId: string | undefined;
}

export namespace GroupBillingCheckoutInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupBillingCheckoutInput): any => ({
    ...obj,
  })
}

export interface GroupBillingCheckoutOutput {
  /**
   * The URL of the checkout session.
   */
  url: string | undefined;
}

export namespace GroupBillingCheckoutOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GroupBillingCheckoutOutput): any => ({
    ...obj,
  })
}

export interface ValidateGroupInput {
  /**
   * Represent a resource's readable display name.
   */
  displayName: string | undefined;
}

export namespace ValidateGroupInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGroupInput): any => ({
    ...obj,
  })
}

export interface ValidateGroupOutput {
  /**
   * A list of validation errors.
   */
  errors: (ValidationError)[] | undefined;
}

export namespace ValidateGroupOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: ValidateGroupOutput): any => ({
    ...obj,
  })
}

export interface GetRayPerfLogsInput {
  /**
   * A universally unique identifier.
   */
  rayId: string | undefined;
}

export namespace GetRayPerfLogsInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetRayPerfLogsInput): any => ({
    ...obj,
  })
}

export interface GetRayPerfLogsOutput {
  /**
   * A list of service performance summaries.
   */
  perfLists: (SvcPerf)[] | undefined;
}

export namespace GetRayPerfLogsOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetRayPerfLogsOutput): any => ({
    ...obj,
  })
}

export interface GetRegionTiersInput {
}

export namespace GetRegionTiersInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetRegionTiersInput): any => ({
    ...obj,
  })
}

/**
 * A region server tier.
 */
export interface RegionTier {
  /**
   * A human readable short identifier used to references resources.
   *
   * Different than a `rivet.common#Uuid` because this is intended to be human readable.
   *
   * Different than `rivet.common#DisplayName` because this should not include special
   * characters and be short.
   */
  tierNameId: string | undefined;

  /**
   * Together with the denominator, denotes the portion of the CPU a given server uses.
   */
  rivetCoresNumerator: number | undefined;

  /**
   * Together with the numerator, denotes the portion of the CPU a given server uses.
   */
  rivetCoresDenominator: number | undefined;

  /**
   * CPU frequency (MHz).
   */
  cpu: number | undefined;

  /**
   * Allocated memory (MB).
   */
  memory: number | undefined;

  /**
   * Allocated disk space (MB).
   */
  disk: number | undefined;

  /**
   * Internet bandwidth (MB).
   */
  bandwidth: number | undefined;
}

export namespace RegionTier {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RegionTier): any => ({
    ...obj,
  })
}

export interface GetRegionTiersOutput {
  /**
   * A list of region server tiers.
   */
  tiers: (RegionTier)[] | undefined;
}

export namespace GetRegionTiersOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: GetRegionTiersOutput): any => ({
    ...obj,
  })
}

export interface CompleteUploadInput {
  /**
   * A universally unique identifier.
   */
  uploadId: string | undefined;
}

export namespace CompleteUploadInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteUploadInput): any => ({
    ...obj,
  })
}

export interface CompleteUploadOutput {
}

export namespace CompleteUploadOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteUploadOutput): any => ({
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
