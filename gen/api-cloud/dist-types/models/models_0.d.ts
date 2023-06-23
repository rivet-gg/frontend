import { CloudServiceServiceException as __BaseException } from "./CloudServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
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
export declare namespace AddNamespaceDomainInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: AddNamespaceDomainInput) => any;
}
export interface AddNamespaceDomainOutput {
}
export declare namespace AddNamespaceDomainOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: AddNamespaceDomainOutput) => any;
}
export interface InspectInput {
}
export declare namespace InspectInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: InspectInput) => any;
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
export declare namespace AuthAgentGameCloud {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: AuthAgentGameCloud) => any;
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
export declare namespace AuthAgentIdentity {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: AuthAgentIdentity) => any;
}
/**
 * The current authenticated agent.
 */
export declare type AuthAgent = AuthAgent.GameCloudMember | AuthAgent.IdentityMember | AuthAgent.$UnknownMember;
export declare namespace AuthAgent {
    /**
     * The current authenticated identity.
     */
    interface IdentityMember {
        identity: AuthAgentIdentity;
        gameCloud?: never;
        $unknown?: never;
    }
    /**
     * The current authenticated game cloud.
     */
    interface GameCloudMember {
        identity?: never;
        gameCloud: AuthAgentGameCloud;
        $unknown?: never;
    }
    interface $UnknownMember {
        identity?: never;
        gameCloud?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        identity: (value: AuthAgentIdentity) => T;
        gameCloud: (value: AuthAgentGameCloud) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: AuthAgent, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: AuthAgent) => any;
}
export interface InspectOutput {
    /**
     * The current authenticated agent.
     */
    agent: AuthAgent | undefined;
}
export declare namespace InspectOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: InspectOutput) => any;
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
export declare namespace CreateGameInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameInput) => any;
}
export interface CreateGameOutput {
    /**
     * A universally unique identifier.
     */
    gameId: string | undefined;
}
export declare namespace CreateGameOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameOutput) => any;
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
export declare namespace GameBannerUploadCompleteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameBannerUploadCompleteInput) => any;
}
export interface GameBannerUploadCompleteOutput {
}
export declare namespace GameBannerUploadCompleteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameBannerUploadCompleteOutput) => any;
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
export declare namespace GameBannerUploadPrepareInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameBannerUploadPrepareInput) => any;
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
export declare namespace GameBannerUploadPrepareOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameBannerUploadPrepareOutput) => any;
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
export declare namespace GameLogoUploadCompleteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameLogoUploadCompleteInput) => any;
}
export interface GameLogoUploadCompleteOutput {
}
export declare namespace GameLogoUploadCompleteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameLogoUploadCompleteOutput) => any;
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
export declare namespace GameLogoUploadPrepareInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameLogoUploadPrepareInput) => any;
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
export declare namespace GameLogoUploadPrepareOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameLogoUploadPrepareOutput) => any;
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
export declare namespace GetGameBillingInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameBillingInput) => any;
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
export declare namespace RegionSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RegionSummary) => any;
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
export declare enum GroupStatus {
    ACTIVE = "active",
    PAYMENT_FAILED = "payment_failed",
    SETUP_INCOMPLETE = "setup_incomplete",
    SPENDING_LIMIT_REACHED = "spending_limit_reached"
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
export declare namespace RegionTierMetrics {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RegionTierMetrics) => any;
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
export declare namespace NamespaceSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: NamespaceSummary) => any;
}
export declare enum GameBillingPlanCode {
    ENTERPRISE = "enterprise",
    FREE = "free",
    GAME_HOBBY_MONTHLY = "game_hobby_monthly",
    GAME_HOBBY_YEARLY = "game_hobby_yearly",
    GAME_STUDIO_MONTHLY = "game_studio_monthly",
    GAME_STUDIO_YEARLY = "game_studio_yearly"
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
export declare namespace GetGameBillingOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameBillingOutput) => any;
}
export interface GetGameBillingPlansInput {
    /**
     * A universally unique identifier.
     */
    gameId: string | undefined;
}
export declare namespace GetGameBillingPlansInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameBillingPlansInput) => any;
}
export declare enum BillingInterval {
    MONTHLY = "monthly",
    YEARLY = "yearly"
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
export declare namespace GameBillingPlan {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameBillingPlan) => any;
}
export interface GetGameBillingPlansOutput {
    /**
     * A list of billing plans.
     */
    plans: (GameBillingPlan)[] | undefined;
}
export declare namespace GetGameBillingPlansOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameBillingPlansOutput) => any;
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
export declare namespace GetGameByIdInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameByIdInput) => any;
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
export declare namespace VersionSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: VersionSummary) => any;
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
export declare namespace GameFull {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameFull) => any;
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
export declare namespace GetGameByIdOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameByIdOutput) => any;
}
export interface GetGamesInput {
    /**
     * A query parameter denoting the requests watch index.
     */
    watchIndex?: string;
}
export declare namespace GetGamesInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGamesInput) => any;
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
export declare namespace GameSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GameSummary) => any;
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
export declare namespace GetGamesOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGamesOutput) => any;
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
export declare namespace SetGameBillingPlanInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetGameBillingPlanInput) => any;
}
export interface SetGameBillingPlanOutput {
}
export declare namespace SetGameBillingPlanOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetGameBillingPlanOutput) => any;
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
export declare namespace ValidateGameInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameInput) => any;
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
export interface ValidateGameOutput {
    /**
     * A list of validation errors.
     */
    errors: (ValidationError)[] | undefined;
}
export declare namespace ValidateGameOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameOutput) => any;
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
export declare namespace UploadPrepareFile {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UploadPrepareFile) => any;
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
export declare namespace CreateGameBuildInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameBuildInput) => any;
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
export declare namespace CreateGameBuildOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameBuildOutput) => any;
}
export interface ListGameBuildsInput {
    /**
     * A universally unique identifier.
     */
    gameId: string | undefined;
}
export declare namespace ListGameBuildsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListGameBuildsInput) => any;
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
export declare namespace BuildSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: BuildSummary) => any;
}
export interface ListGameBuildsOutput {
    /**
     * A list of build summaries.
     */
    builds: (BuildSummary)[] | undefined;
}
export declare namespace ListGameBuildsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListGameBuildsOutput) => any;
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
export declare namespace CreateGameCdnSiteInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameCdnSiteInput) => any;
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
export declare namespace CreateGameCdnSiteOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameCdnSiteOutput) => any;
}
export interface ListGameCdnSitesInput {
    /**
     * A universally unique identifier.
     */
    gameId: string | undefined;
}
export declare namespace ListGameCdnSitesInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListGameCdnSitesInput) => any;
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
export declare namespace CdnSiteSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnSiteSummary) => any;
}
export interface ListGameCdnSitesOutput {
    /**
     * A list of CDN site summaries.
     */
    sites: (CdnSiteSummary)[] | undefined;
}
export declare namespace ListGameCdnSitesOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListGameCdnSitesOutput) => any;
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
export declare namespace CompleteCustomAvatarUploadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteCustomAvatarUploadInput) => any;
}
export interface CompleteCustomAvatarUploadOutput {
}
export declare namespace CompleteCustomAvatarUploadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteCustomAvatarUploadOutput) => any;
}
export interface ListGameCustomAvatarsInput {
    /**
     * A universally unique identifier.
     */
    gameId: string | undefined;
}
export declare namespace ListGameCustomAvatarsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListGameCustomAvatarsInput) => any;
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
export declare namespace CustomAvatarSummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CustomAvatarSummary) => any;
}
export interface ListGameCustomAvatarsOutput {
    /**
     * A list of custom avatar summaries.
     */
    customAvatars: (CustomAvatarSummary)[] | undefined;
}
export declare namespace ListGameCustomAvatarsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListGameCustomAvatarsOutput) => any;
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
export declare namespace PrepareCustomAvatarUploadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PrepareCustomAvatarUploadInput) => any;
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
export declare namespace PrepareCustomAvatarUploadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PrepareCustomAvatarUploadOutput) => any;
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
export declare namespace DeleteMatchmakerLobbyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: DeleteMatchmakerLobbyInput) => any;
}
export interface DeleteMatchmakerLobbyOutput {
    /**
     * Whether or not the lobby was successfully stopped.
     */
    didRemove: boolean | undefined;
}
export declare namespace DeleteMatchmakerLobbyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: DeleteMatchmakerLobbyOutput) => any;
}
export declare enum LogStream {
    /**
     * Stderrs tream from the given process.
     */
    STD_ERR = "std_err",
    /**
     * Stdout stream from the given processs.
     */
    STD_OUT = "std_out"
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
export declare namespace ExportLobbyLogsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ExportLobbyLogsInput) => any;
}
export interface ExportLobbyLogsOutput {
    /**
     * The URL to a CSV file for the given lobby history.
     */
    url: string | undefined;
}
export declare namespace ExportLobbyLogsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ExportLobbyLogsOutput) => any;
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
export declare namespace ExportMatchmakerLobbyHistoryInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ExportMatchmakerLobbyHistoryInput) => any;
}
export interface ExportMatchmakerLobbyHistoryOutput {
    /**
     * The URL to a CSV file for the given lobby history.
     */
    url: string | undefined;
}
export declare namespace ExportMatchmakerLobbyHistoryOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ExportMatchmakerLobbyHistoryOutput) => any;
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
export declare namespace GetLobbyLogsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetLobbyLogsInput) => any;
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
export declare namespace GetLobbyLogsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetLobbyLogsOutput) => any;
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
export declare namespace CreateGameNamespaceInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameNamespaceInput) => any;
}
export interface CreateGameNamespaceOutput {
    /**
     * A universally unique identifier.
     */
    namespaceId: string | undefined;
}
export declare namespace CreateGameNamespaceOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameNamespaceOutput) => any;
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
export declare namespace PortRange {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: PortRange) => any;
}
export declare enum ProxyProtocol {
    HTTP = "http",
    HTTPS = "https",
    UDP = "udp"
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
export declare namespace LobbyGroupRuntimeDockerPort {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LobbyGroupRuntimeDockerPort) => any;
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
export declare namespace CreateGameNamespaceTokenDevelopmentInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameNamespaceTokenDevelopmentInput) => any;
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
export declare namespace CreateGameNamespaceTokenDevelopmentOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameNamespaceTokenDevelopmentOutput) => any;
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
export declare namespace CreateGameNamespaceTokenPublicInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameNamespaceTokenPublicInput) => any;
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
export declare namespace CreateGameNamespaceTokenPublicOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameNamespaceTokenPublicOutput) => any;
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
export declare namespace GetGameNamespaceByIdInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameNamespaceByIdInput) => any;
}
export declare enum CdnAuthType {
    BASIC = "basic",
    NONE = "none"
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
export declare namespace CdnNamespaceAuthUser {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnNamespaceAuthUser) => any;
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
export declare namespace CdnNamespaceDomainVerificationMethodHttp {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnNamespaceDomainVerificationMethodHttp) => any;
}
/**
 * CDN Namespace domain verification method variant denoting that this record is invalid.
 */
export interface CdnNamespaceDomainVerificationMethodInvalid {
}
export declare namespace CdnNamespaceDomainVerificationMethodInvalid {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnNamespaceDomainVerificationMethodInvalid) => any;
}
/**
 * A union representing the verification method used for this CDN domain.
 */
export declare type CdnNamespaceDomainVerificationMethod = CdnNamespaceDomainVerificationMethod.HttpMember | CdnNamespaceDomainVerificationMethod.InvalidMember | CdnNamespaceDomainVerificationMethod.$UnknownMember;
export declare namespace CdnNamespaceDomainVerificationMethod {
    /**
     * CDN Namespace domain verification method variant denoting that this record is invalid.
     */
    interface InvalidMember {
        invalid: CdnNamespaceDomainVerificationMethodInvalid;
        http?: never;
        $unknown?: never;
    }
    /**
     * CDN Namespace domain verification method HTTP variant.
     */
    interface HttpMember {
        invalid?: never;
        http: CdnNamespaceDomainVerificationMethodHttp;
        $unknown?: never;
    }
    interface $UnknownMember {
        invalid?: never;
        http?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        invalid: (value: CdnNamespaceDomainVerificationMethodInvalid) => T;
        http: (value: CdnNamespaceDomainVerificationMethodHttp) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: CdnNamespaceDomainVerificationMethod, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnNamespaceDomainVerificationMethod) => any;
}
export declare enum CdnNamespaceDomainVerificationStatus {
    ACTIVE = "active",
    FAILED = "failed",
    PENDING = "pending"
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
export declare namespace CdnNamespaceDomain {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnNamespaceDomain) => any;
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
export declare namespace CdnNamespaceConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnNamespaceConfig) => any;
}
/**
 * Identity configuration for a given namespace.
 */
export interface IdentityNamespaceConfig {
}
export declare namespace IdentityNamespaceConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: IdentityNamespaceConfig) => any;
}
/**
 * KV configuration for a given namespace.
 */
export interface KvNamespaceConfig {
}
export declare namespace KvNamespaceConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: KvNamespaceConfig) => any;
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
export declare namespace MatchmakerNamespaceConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: MatchmakerNamespaceConfig) => any;
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
export declare namespace CloudNamespaceConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CloudNamespaceConfig) => any;
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
export declare namespace NamespaceFull {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: NamespaceFull) => any;
}
export interface GetGameNamespaceByIdOutput {
    /**
     * A full namespace.
     */
    namespace: NamespaceFull | undefined;
}
export declare namespace GetGameNamespaceByIdOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameNamespaceByIdOutput) => any;
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
export declare namespace RemoveNamespaceCdnAuthUserInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RemoveNamespaceCdnAuthUserInput) => any;
}
export interface RemoveNamespaceCdnAuthUserOutput {
}
export declare namespace RemoveNamespaceCdnAuthUserOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RemoveNamespaceCdnAuthUserOutput) => any;
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
export declare namespace RemoveNamespaceDomainInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RemoveNamespaceDomainInput) => any;
}
export interface RemoveNamespaceDomainOutput {
}
export declare namespace RemoveNamespaceDomainOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RemoveNamespaceDomainOutput) => any;
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
export declare namespace SetNamespaceCdnAuthTypeInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetNamespaceCdnAuthTypeInput) => any;
}
export interface SetNamespaceCdnAuthTypeOutput {
}
export declare namespace SetNamespaceCdnAuthTypeOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SetNamespaceCdnAuthTypeOutput) => any;
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
export declare namespace ToggleNamespaceDomainPublicAuthInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ToggleNamespaceDomainPublicAuthInput) => any;
}
export interface ToggleNamespaceDomainPublicAuthOutput {
}
export declare namespace ToggleNamespaceDomainPublicAuthOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ToggleNamespaceDomainPublicAuthOutput) => any;
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
export declare namespace UpdateGameNamespaceMatchmakerConfigInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateGameNamespaceMatchmakerConfigInput) => any;
}
export interface UpdateGameNamespaceMatchmakerConfigOutput {
}
export declare namespace UpdateGameNamespaceMatchmakerConfigOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateGameNamespaceMatchmakerConfigOutput) => any;
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
export declare namespace UpdateGameNamespaceVersionInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateGameNamespaceVersionInput) => any;
}
export interface UpdateGameNamespaceVersionOutput {
}
export declare namespace UpdateGameNamespaceVersionOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateGameNamespaceVersionOutput) => any;
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
export declare namespace UpdateNamespaceCdnAuthUserInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateNamespaceCdnAuthUserInput) => any;
}
export interface UpdateNamespaceCdnAuthUserOutput {
}
export declare namespace UpdateNamespaceCdnAuthUserOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: UpdateNamespaceCdnAuthUserOutput) => any;
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
export declare namespace ValidateGameNamespaceInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameNamespaceInput) => any;
}
export interface ValidateGameNamespaceOutput {
    /**
     * A list of validation errors.
     */
    errors: (ValidationError)[] | undefined;
}
export declare namespace ValidateGameNamespaceOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameNamespaceOutput) => any;
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
export declare namespace ValidateGameNamespaceMatchmakerConfigInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameNamespaceMatchmakerConfigInput) => any;
}
export interface ValidateGameNamespaceMatchmakerConfigOutput {
    /**
     * A list of validation errors.
     */
    errors: (ValidationError)[] | undefined;
}
export declare namespace ValidateGameNamespaceMatchmakerConfigOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameNamespaceMatchmakerConfigOutput) => any;
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
export declare namespace ValidateGameNamespaceTokenDevelopmentInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameNamespaceTokenDevelopmentInput) => any;
}
export interface ValidateGameNamespaceTokenDevelopmentOutput {
    /**
     * A list of validation errors.
     */
    errors: (ValidationError)[] | undefined;
}
export declare namespace ValidateGameNamespaceTokenDevelopmentOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameNamespaceTokenDevelopmentOutput) => any;
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
export declare namespace GetNamespaceAnalyticsMatchmakerLiveInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetNamespaceAnalyticsMatchmakerLiveInput) => any;
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
export declare namespace AnalyticsLobbySummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: AnalyticsLobbySummary) => any;
}
export interface GetNamespaceAnalyticsMatchmakerLiveOutput {
    /**
     * A list of analytics lobby summaries.
     */
    lobbies: (AnalyticsLobbySummary)[] | undefined;
}
export declare namespace GetNamespaceAnalyticsMatchmakerLiveOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetNamespaceAnalyticsMatchmakerLiveOutput) => any;
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
export declare namespace GetNamespaceLobbyInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetNamespaceLobbyInput) => any;
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
export declare namespace LogsLobbyStatusStopped {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LogsLobbyStatusStopped) => any;
}
/**
 * A union representing the state of a lobby.
 */
export declare type LogsLobbyStatus = LogsLobbyStatus.RunningMember | LogsLobbyStatus.StoppedMember | LogsLobbyStatus.$UnknownMember;
export declare namespace LogsLobbyStatus {
    /**
     * A running lobby.
     */
    interface RunningMember {
        running: Unit;
        stopped?: never;
        $unknown?: never;
    }
    /**
     * The status of a stopped lobby.
     */
    interface StoppedMember {
        running?: never;
        stopped: LogsLobbyStatusStopped;
        $unknown?: never;
    }
    interface $UnknownMember {
        running?: never;
        stopped?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        running: (value: Unit) => T;
        stopped: (value: LogsLobbyStatusStopped) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: LogsLobbyStatus, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LogsLobbyStatus) => any;
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
export declare namespace LogsLobbySummary {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LogsLobbySummary) => any;
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
export declare namespace SvcMetrics {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SvcMetrics) => any;
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
export declare namespace LogsPerfMark {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LogsPerfMark) => any;
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
export declare namespace LogsPerfSpan {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LogsPerfSpan) => any;
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
export declare namespace SvcPerf {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: SvcPerf) => any;
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
export declare namespace GetNamespaceLobbyOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetNamespaceLobbyOutput) => any;
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
export declare namespace ListNamespaceLobbiesInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListNamespaceLobbiesInput) => any;
}
export interface ListNamespaceLobbiesOutput {
    /**
     * A list of lobby log summaries.
     */
    lobbies: (LogsLobbySummary)[] | undefined;
}
export declare namespace ListNamespaceLobbiesOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ListNamespaceLobbiesOutput) => any;
}
export interface CreateCloudTokenInput {
    /**
     * A universally unique identifier.
     */
    gameId: string | undefined;
}
export declare namespace CreateCloudTokenInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateCloudTokenInput) => any;
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
export declare namespace CreateCloudTokenOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateCloudTokenOutput) => any;
}
export interface CdnVersionHeader {
    name: string | undefined;
    value: string | undefined;
}
export declare namespace CdnVersionHeader {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnVersionHeader) => any;
}
export interface CdnVersionCustomHeadersMiddleware {
    headers: (CdnVersionHeader)[] | undefined;
}
export declare namespace CdnVersionCustomHeadersMiddleware {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnVersionCustomHeadersMiddleware) => any;
}
export declare type CdnVersionMiddlewareKind = CdnVersionMiddlewareKind.CustomHeadersMember | CdnVersionMiddlewareKind.$UnknownMember;
export declare namespace CdnVersionMiddlewareKind {
    interface CustomHeadersMember {
        customHeaders: CdnVersionCustomHeadersMiddleware;
        $unknown?: never;
    }
    interface $UnknownMember {
        customHeaders?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        customHeaders: (value: CdnVersionCustomHeadersMiddleware) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: CdnVersionMiddlewareKind, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnVersionMiddlewareKind) => any;
}
export interface CdnVersionMiddleware {
    kind: CdnVersionMiddlewareKind | undefined;
}
export declare namespace CdnVersionMiddleware {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnVersionMiddleware) => any;
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
export declare namespace CdnVersionRoute {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnVersionRoute) => any;
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
export declare namespace CdnVersionConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CdnVersionConfig) => any;
}
export interface CustomAvatar {
    /**
     * A universally unique identifier.
     */
    uploadId: string | undefined;
}
export declare namespace CustomAvatar {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CustomAvatar) => any;
}
export interface CustomDisplayName {
    displayName: string | undefined;
}
export declare namespace CustomDisplayName {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CustomDisplayName) => any;
}
/**
 * Identity configuration for a given version.
 */
export interface IdentityVersionConfig {
    customDisplayNames: (CustomDisplayName)[] | undefined;
    customAvatars: (CustomAvatar)[] | undefined;
}
export declare namespace IdentityVersionConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: IdentityVersionConfig) => any;
}
/**
 * KV configuration for a given version.
 */
export interface KvVersionConfig {
}
export declare namespace KvVersionConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: KvVersionConfig) => any;
}
export declare enum CaptchaLevel {
    ALWAYS_ON = "always_on",
    DIFFICULT = "difficult",
    EASY = "easy",
    MODERATE = "moderate"
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
export declare namespace MatchmakerCaptchaHcaptcha {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: MatchmakerCaptchaHcaptcha) => any;
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
export declare namespace MatchmakerCaptcha {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: MatchmakerCaptcha) => any;
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
export declare namespace IdleLobbiesConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: IdleLobbiesConfig) => any;
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
export declare namespace LobbyGroupRegion {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LobbyGroupRegion) => any;
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
export declare namespace LobbyGroupRuntimeDockerEnvVar {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LobbyGroupRuntimeDockerEnvVar) => any;
}
export declare enum NetworkMode {
    BRIDGE = "bridge",
    HOST = "host"
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
export declare namespace LobbyGroupRuntimeDocker {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LobbyGroupRuntimeDocker) => any;
}
/**
 * @deprecated
 *
 * A union representing the runtime a game mode runs on.
 */
export declare type LobbyGroupRuntime = LobbyGroupRuntime.DockerMember | LobbyGroupRuntime.$UnknownMember;
export declare namespace LobbyGroupRuntime {
    /**
     * @deprecated
     *
     * A game mode runtime running through Docker.
     */
    interface DockerMember {
        docker: LobbyGroupRuntimeDocker;
        $unknown?: never;
    }
    interface $UnknownMember {
        docker?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        docker: (value: LobbyGroupRuntimeDocker) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: LobbyGroupRuntime, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LobbyGroupRuntime) => any;
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
export declare namespace LobbyGroup {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: LobbyGroup) => any;
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
export declare namespace MatchmakerVersionConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: MatchmakerVersionConfig) => any;
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
export declare namespace CloudVersionConfig {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CloudVersionConfig) => any;
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
export declare namespace CreateGameVersionInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameVersionInput) => any;
}
export interface CreateGameVersionOutput {
    /**
     * A universally unique identifier.
     */
    versionId: string | undefined;
}
export declare namespace CreateGameVersionOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CreateGameVersionOutput) => any;
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
export declare namespace GetGameVersionByIdInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameVersionByIdInput) => any;
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
export declare namespace VersionFull {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: VersionFull) => any;
}
export interface GetGameVersionByIdOutput {
    /**
     * A full version.
     */
    version: VersionFull | undefined;
}
export declare namespace GetGameVersionByIdOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGameVersionByIdOutput) => any;
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
export declare namespace ValidateGameVersionInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameVersionInput) => any;
}
export interface ValidateGameVersionOutput {
    /**
     * A list of validation errors.
     */
    errors: (ValidationError)[] | undefined;
}
export declare namespace ValidateGameVersionOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGameVersionOutput) => any;
}
export interface ConvertGroupInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
}
export declare namespace ConvertGroupInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ConvertGroupInput) => any;
}
export interface ConvertGroupOutput {
}
export declare namespace ConvertGroupOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ConvertGroupOutput) => any;
}
export interface GetGroupBillingInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
}
export declare namespace GetGroupBillingInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupBillingInput) => any;
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
export declare namespace GetGroupBillingOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupBillingOutput) => any;
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
export declare namespace GetGroupInvoicesListInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupInvoicesListInput) => any;
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
export declare namespace GroupBillingInvoice {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupBillingInvoice) => any;
}
export interface GetGroupInvoicesListOutput {
    /**
     * A list of a group's billing invoices.
     */
    invoices: (GroupBillingInvoice)[] | undefined;
}
export declare namespace GetGroupInvoicesListOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetGroupInvoicesListOutput) => any;
}
export interface GroupBillingCheckoutInput {
    /**
     * A universally unique identifier.
     */
    groupId: string | undefined;
}
export declare namespace GroupBillingCheckoutInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupBillingCheckoutInput) => any;
}
export interface GroupBillingCheckoutOutput {
    /**
     * The URL of the checkout session.
     */
    url: string | undefined;
}
export declare namespace GroupBillingCheckoutOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GroupBillingCheckoutOutput) => any;
}
export interface ValidateGroupInput {
    /**
     * Represent a resource's readable display name.
     */
    displayName: string | undefined;
}
export declare namespace ValidateGroupInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGroupInput) => any;
}
export interface ValidateGroupOutput {
    /**
     * A list of validation errors.
     */
    errors: (ValidationError)[] | undefined;
}
export declare namespace ValidateGroupOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: ValidateGroupOutput) => any;
}
export interface GetRayPerfLogsInput {
    /**
     * A universally unique identifier.
     */
    rayId: string | undefined;
}
export declare namespace GetRayPerfLogsInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetRayPerfLogsInput) => any;
}
export interface GetRayPerfLogsOutput {
    /**
     * A list of service performance summaries.
     */
    perfLists: (SvcPerf)[] | undefined;
}
export declare namespace GetRayPerfLogsOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetRayPerfLogsOutput) => any;
}
export interface GetRegionTiersInput {
}
export declare namespace GetRegionTiersInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetRegionTiersInput) => any;
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
export declare namespace RegionTier {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RegionTier) => any;
}
export interface GetRegionTiersOutput {
    /**
     * A list of region server tiers.
     */
    tiers: (RegionTier)[] | undefined;
}
export declare namespace GetRegionTiersOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: GetRegionTiersOutput) => any;
}
export interface CompleteUploadInput {
    /**
     * A universally unique identifier.
     */
    uploadId: string | undefined;
}
export declare namespace CompleteUploadInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteUploadInput) => any;
}
export interface CompleteUploadOutput {
}
export declare namespace CompleteUploadOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteUploadOutput) => any;
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
