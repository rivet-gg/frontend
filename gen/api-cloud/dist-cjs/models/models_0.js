"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGameBuildsInput = exports.CreateGameBuildOutput = exports.CreateGameBuildInput = exports.UploadPrepareFile = exports.ValidateGameOutput = exports.ValidationError = exports.ValidateGameInput = exports.SetGameBillingPlanOutput = exports.SetGameBillingPlanInput = exports.GetGamesOutput = exports.GroupSummary = exports.GroupPublicity = exports.GroupExternalLinks = exports.GameSummary = exports.GetGamesInput = exports.GetGameByIdOutput = exports.WatchResponse = exports.GameFull = exports.VersionSummary = exports.GetGameByIdInput = exports.GetGameBillingPlansOutput = exports.GameBillingPlan = exports.BillingInterval = exports.GetGameBillingPlansInput = exports.GetGameBillingOutput = exports.GameBillingPlanCode = exports.NamespaceSummary = exports.RegionTierMetrics = exports.GroupStatus = exports.GameHandle = exports.RegionSummary = exports.GetGameBillingInput = exports.GameLogoUploadPrepareOutput = exports.GameLogoUploadPrepareInput = exports.GameLogoUploadCompleteOutput = exports.GameLogoUploadCompleteInput = exports.GameBannerUploadPrepareOutput = exports.UploadPresignedRequest = exports.GameBannerUploadPrepareInput = exports.GameBannerUploadCompleteOutput = exports.GameBannerUploadCompleteInput = exports.CreateGameOutput = exports.CreateGameInput = exports.InspectOutput = exports.AuthAgent = exports.AuthAgentIdentity = exports.AuthAgentGameCloud = exports.InspectInput = exports.AddNamespaceDomainOutput = exports.AddNamespaceDomainInput = void 0;
exports.RemoveNamespaceDomainInput = exports.RemoveNamespaceCdnAuthUserOutput = exports.RemoveNamespaceCdnAuthUserInput = exports.GetGameNamespaceByIdOutput = exports.NamespaceFull = exports.CloudNamespaceConfig = exports.MatchmakerNamespaceConfig = exports.KvNamespaceConfig = exports.IdentityNamespaceConfig = exports.CdnNamespaceConfig = exports.CdnNamespaceDomain = exports.CdnNamespaceDomainVerificationStatus = exports.CdnNamespaceDomainVerificationMethod = exports.CdnNamespaceDomainVerificationMethodInvalid = exports.CdnNamespaceDomainVerificationMethodHttp = exports.CdnNamespaceAuthUser = exports.CdnAuthType = exports.GetGameNamespaceByIdInput = exports.CreateGameNamespaceTokenPublicOutput = exports.CreateGameNamespaceTokenPublicInput = exports.CreateGameNamespaceTokenDevelopmentOutput = exports.CreateGameNamespaceTokenDevelopmentInput = exports.LobbyGroupRuntimeDockerPort = exports.ProxyProtocol = exports.PortRange = exports.CreateGameNamespaceOutput = exports.CreateGameNamespaceInput = exports.GetLobbyLogsOutput = exports.GetLobbyLogsInput = exports.ExportMatchmakerLobbyHistoryOutput = exports.ExportMatchmakerLobbyHistoryInput = exports.ExportLobbyLogsOutput = exports.ExportLobbyLogsInput = exports.LogStream = exports.DeleteMatchmakerLobbyOutput = exports.DeleteMatchmakerLobbyInput = exports.PrepareCustomAvatarUploadOutput = exports.PrepareCustomAvatarUploadInput = exports.ListGameCustomAvatarsOutput = exports.CustomAvatarSummary = exports.ListGameCustomAvatarsInput = exports.CompleteCustomAvatarUploadOutput = exports.CompleteCustomAvatarUploadInput = exports.ListGameCdnSitesOutput = exports.CdnSiteSummary = exports.ListGameCdnSitesInput = exports.CreateGameCdnSiteOutput = exports.CreateGameCdnSiteInput = exports.ListGameBuildsOutput = exports.BuildSummary = void 0;
exports.LobbyGroupRuntimeDockerEnvVar = exports.LobbyGroupRegion = exports.IdleLobbiesConfig = exports.MatchmakerCaptcha = exports.MatchmakerCaptchaHcaptcha = exports.CaptchaLevel = exports.KvVersionConfig = exports.IdentityVersionConfig = exports.CustomDisplayName = exports.CustomAvatar = exports.CdnVersionConfig = exports.CdnVersionRoute = exports.CdnVersionMiddleware = exports.CdnVersionMiddlewareKind = exports.CdnVersionCustomHeadersMiddleware = exports.CdnVersionHeader = exports.CreateCloudTokenOutput = exports.CreateCloudTokenInput = exports.ListNamespaceLobbiesOutput = exports.ListNamespaceLobbiesInput = exports.GetNamespaceLobbyOutput = exports.SvcPerf = exports.LogsPerfSpan = exports.LogsPerfMark = exports.SvcMetrics = exports.LogsLobbySummary = exports.LogsLobbyStatus = exports.LogsLobbyStatusStopped = exports.Unit = exports.GetNamespaceLobbyInput = exports.GetNamespaceAnalyticsMatchmakerLiveOutput = exports.AnalyticsLobbySummary = exports.GetNamespaceAnalyticsMatchmakerLiveInput = exports.ValidateGameNamespaceTokenDevelopmentOutput = exports.ValidateGameNamespaceTokenDevelopmentInput = exports.ValidateGameNamespaceMatchmakerConfigOutput = exports.ValidateGameNamespaceMatchmakerConfigInput = exports.ValidateGameNamespaceOutput = exports.ValidateGameNamespaceInput = exports.UpdateNamespaceCdnAuthUserOutput = exports.UpdateNamespaceCdnAuthUserInput = exports.UpdateGameNamespaceVersionOutput = exports.UpdateGameNamespaceVersionInput = exports.UpdateGameNamespaceMatchmakerConfigOutput = exports.UpdateGameNamespaceMatchmakerConfigInput = exports.ToggleNamespaceDomainPublicAuthOutput = exports.ToggleNamespaceDomainPublicAuthInput = exports.SetNamespaceCdnAuthTypeOutput = exports.SetNamespaceCdnAuthTypeInput = exports.RemoveNamespaceDomainOutput = void 0;
exports.UnauthorizedError = exports.RateLimitError = exports.NotFoundError = exports.InternalError = exports.ForbiddenError = exports.BadRequestError = exports.CompleteUploadOutput = exports.CompleteUploadInput = exports.GetRegionTiersOutput = exports.RegionTier = exports.GetRegionTiersInput = exports.GetRayPerfLogsOutput = exports.GetRayPerfLogsInput = exports.ValidateGroupOutput = exports.ValidateGroupInput = exports.GroupBillingCheckoutOutput = exports.GroupBillingCheckoutInput = exports.GetGroupInvoicesListOutput = exports.GroupBillingInvoice = exports.GetGroupInvoicesListInput = exports.GetGroupBillingOutput = exports.GetGroupBillingInput = exports.ConvertGroupOutput = exports.ConvertGroupInput = exports.ValidateGameVersionOutput = exports.ValidateGameVersionInput = exports.GetGameVersionByIdOutput = exports.VersionFull = exports.GetGameVersionByIdInput = exports.CreateGameVersionOutput = exports.CreateGameVersionInput = exports.CloudVersionConfig = exports.MatchmakerVersionConfig = exports.LobbyGroup = exports.LobbyGroupRuntime = exports.LobbyGroupRuntimeDocker = exports.NetworkMode = void 0;
const CloudServiceServiceException_1 = require("./CloudServiceServiceException");
const smithy_client_1 = require("@aws-sdk/smithy-client");
var AddNamespaceDomainInput;
(function (AddNamespaceDomainInput) {
    AddNamespaceDomainInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AddNamespaceDomainInput = exports.AddNamespaceDomainInput || (exports.AddNamespaceDomainInput = {}));
var AddNamespaceDomainOutput;
(function (AddNamespaceDomainOutput) {
    AddNamespaceDomainOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AddNamespaceDomainOutput = exports.AddNamespaceDomainOutput || (exports.AddNamespaceDomainOutput = {}));
var InspectInput;
(function (InspectInput) {
    InspectInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InspectInput = exports.InspectInput || (exports.InspectInput = {}));
var AuthAgentGameCloud;
(function (AuthAgentGameCloud) {
    AuthAgentGameCloud.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AuthAgentGameCloud = exports.AuthAgentGameCloud || (exports.AuthAgentGameCloud = {}));
var AuthAgentIdentity;
(function (AuthAgentIdentity) {
    AuthAgentIdentity.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AuthAgentIdentity = exports.AuthAgentIdentity || (exports.AuthAgentIdentity = {}));
var AuthAgent;
(function (AuthAgent) {
    AuthAgent.visit = (value, visitor) => {
        if (value.identity !== undefined)
            return visitor.identity(value.identity);
        if (value.gameCloud !== undefined)
            return visitor.gameCloud(value.gameCloud);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    AuthAgent.filterSensitiveLog = (obj) => {
        if (obj.identity !== undefined)
            return { identity: AuthAgentIdentity.filterSensitiveLog(obj.identity)
            };
        if (obj.gameCloud !== undefined)
            return { gameCloud: AuthAgentGameCloud.filterSensitiveLog(obj.gameCloud)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(AuthAgent = exports.AuthAgent || (exports.AuthAgent = {}));
var InspectOutput;
(function (InspectOutput) {
    InspectOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.agent && { agent: AuthAgent.filterSensitiveLog(obj.agent)
        }),
    });
})(InspectOutput = exports.InspectOutput || (exports.InspectOutput = {}));
var CreateGameInput;
(function (CreateGameInput) {
    CreateGameInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameInput = exports.CreateGameInput || (exports.CreateGameInput = {}));
var CreateGameOutput;
(function (CreateGameOutput) {
    CreateGameOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameOutput = exports.CreateGameOutput || (exports.CreateGameOutput = {}));
var GameBannerUploadCompleteInput;
(function (GameBannerUploadCompleteInput) {
    GameBannerUploadCompleteInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameBannerUploadCompleteInput = exports.GameBannerUploadCompleteInput || (exports.GameBannerUploadCompleteInput = {}));
var GameBannerUploadCompleteOutput;
(function (GameBannerUploadCompleteOutput) {
    GameBannerUploadCompleteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameBannerUploadCompleteOutput = exports.GameBannerUploadCompleteOutput || (exports.GameBannerUploadCompleteOutput = {}));
var GameBannerUploadPrepareInput;
(function (GameBannerUploadPrepareInput) {
    GameBannerUploadPrepareInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameBannerUploadPrepareInput = exports.GameBannerUploadPrepareInput || (exports.GameBannerUploadPrepareInput = {}));
var UploadPresignedRequest;
(function (UploadPresignedRequest) {
    UploadPresignedRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UploadPresignedRequest = exports.UploadPresignedRequest || (exports.UploadPresignedRequest = {}));
var GameBannerUploadPrepareOutput;
(function (GameBannerUploadPrepareOutput) {
    GameBannerUploadPrepareOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameBannerUploadPrepareOutput = exports.GameBannerUploadPrepareOutput || (exports.GameBannerUploadPrepareOutput = {}));
var GameLogoUploadCompleteInput;
(function (GameLogoUploadCompleteInput) {
    GameLogoUploadCompleteInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameLogoUploadCompleteInput = exports.GameLogoUploadCompleteInput || (exports.GameLogoUploadCompleteInput = {}));
var GameLogoUploadCompleteOutput;
(function (GameLogoUploadCompleteOutput) {
    GameLogoUploadCompleteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameLogoUploadCompleteOutput = exports.GameLogoUploadCompleteOutput || (exports.GameLogoUploadCompleteOutput = {}));
var GameLogoUploadPrepareInput;
(function (GameLogoUploadPrepareInput) {
    GameLogoUploadPrepareInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameLogoUploadPrepareInput = exports.GameLogoUploadPrepareInput || (exports.GameLogoUploadPrepareInput = {}));
var GameLogoUploadPrepareOutput;
(function (GameLogoUploadPrepareOutput) {
    GameLogoUploadPrepareOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameLogoUploadPrepareOutput = exports.GameLogoUploadPrepareOutput || (exports.GameLogoUploadPrepareOutput = {}));
var GetGameBillingInput;
(function (GetGameBillingInput) {
    GetGameBillingInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameBillingInput = exports.GetGameBillingInput || (exports.GetGameBillingInput = {}));
var RegionSummary;
(function (RegionSummary) {
    RegionSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RegionSummary = exports.RegionSummary || (exports.RegionSummary = {}));
var GameHandle;
(function (GameHandle) {
    GameHandle.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameHandle = exports.GameHandle || (exports.GameHandle = {}));
var GroupStatus;
(function (GroupStatus) {
    GroupStatus["ACTIVE"] = "active";
    GroupStatus["PAYMENT_FAILED"] = "payment_failed";
    GroupStatus["SETUP_INCOMPLETE"] = "setup_incomplete";
    GroupStatus["SPENDING_LIMIT_REACHED"] = "spending_limit_reached";
})(GroupStatus = exports.GroupStatus || (exports.GroupStatus = {}));
var RegionTierMetrics;
(function (RegionTierMetrics) {
    RegionTierMetrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RegionTierMetrics = exports.RegionTierMetrics || (exports.RegionTierMetrics = {}));
var NamespaceSummary;
(function (NamespaceSummary) {
    NamespaceSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NamespaceSummary = exports.NamespaceSummary || (exports.NamespaceSummary = {}));
var GameBillingPlanCode;
(function (GameBillingPlanCode) {
    GameBillingPlanCode["ENTERPRISE"] = "enterprise";
    GameBillingPlanCode["FREE"] = "free";
    GameBillingPlanCode["GAME_HOBBY_MONTHLY"] = "game_hobby_monthly";
    GameBillingPlanCode["GAME_HOBBY_YEARLY"] = "game_hobby_yearly";
    GameBillingPlanCode["GAME_STUDIO_MONTHLY"] = "game_studio_monthly";
    GameBillingPlanCode["GAME_STUDIO_YEARLY"] = "game_studio_yearly";
})(GameBillingPlanCode = exports.GameBillingPlanCode || (exports.GameBillingPlanCode = {}));
var GetGameBillingOutput;
(function (GetGameBillingOutput) {
    GetGameBillingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameBillingOutput = exports.GetGameBillingOutput || (exports.GetGameBillingOutput = {}));
var GetGameBillingPlansInput;
(function (GetGameBillingPlansInput) {
    GetGameBillingPlansInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameBillingPlansInput = exports.GetGameBillingPlansInput || (exports.GetGameBillingPlansInput = {}));
var BillingInterval;
(function (BillingInterval) {
    BillingInterval["MONTHLY"] = "monthly";
    BillingInterval["YEARLY"] = "yearly";
})(BillingInterval = exports.BillingInterval || (exports.BillingInterval = {}));
var GameBillingPlan;
(function (GameBillingPlan) {
    GameBillingPlan.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameBillingPlan = exports.GameBillingPlan || (exports.GameBillingPlan = {}));
var GetGameBillingPlansOutput;
(function (GetGameBillingPlansOutput) {
    GetGameBillingPlansOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameBillingPlansOutput = exports.GetGameBillingPlansOutput || (exports.GetGameBillingPlansOutput = {}));
var GetGameByIdInput;
(function (GetGameByIdInput) {
    GetGameByIdInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameByIdInput = exports.GetGameByIdInput || (exports.GetGameByIdInput = {}));
var VersionSummary;
(function (VersionSummary) {
    VersionSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VersionSummary = exports.VersionSummary || (exports.VersionSummary = {}));
var GameFull;
(function (GameFull) {
    GameFull.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameFull = exports.GameFull || (exports.GameFull = {}));
var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(WatchResponse = exports.WatchResponse || (exports.WatchResponse = {}));
var GetGameByIdOutput;
(function (GetGameByIdOutput) {
    GetGameByIdOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameByIdOutput = exports.GetGameByIdOutput || (exports.GetGameByIdOutput = {}));
var GetGamesInput;
(function (GetGamesInput) {
    GetGamesInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGamesInput = exports.GetGamesInput || (exports.GetGamesInput = {}));
var GameSummary;
(function (GameSummary) {
    GameSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GameSummary = exports.GameSummary || (exports.GameSummary = {}));
var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupExternalLinks = exports.GroupExternalLinks || (exports.GroupExternalLinks = {}));
var GroupPublicity;
(function (GroupPublicity) {
    GroupPublicity["CLOSED"] = "closed";
    GroupPublicity["OPEN"] = "open";
})(GroupPublicity = exports.GroupPublicity || (exports.GroupPublicity = {}));
var GroupSummary;
(function (GroupSummary) {
    GroupSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupSummary = exports.GroupSummary || (exports.GroupSummary = {}));
var GetGamesOutput;
(function (GetGamesOutput) {
    GetGamesOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGamesOutput = exports.GetGamesOutput || (exports.GetGamesOutput = {}));
var SetGameBillingPlanInput;
(function (SetGameBillingPlanInput) {
    SetGameBillingPlanInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetGameBillingPlanInput = exports.SetGameBillingPlanInput || (exports.SetGameBillingPlanInput = {}));
var SetGameBillingPlanOutput;
(function (SetGameBillingPlanOutput) {
    SetGameBillingPlanOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetGameBillingPlanOutput = exports.SetGameBillingPlanOutput || (exports.SetGameBillingPlanOutput = {}));
var ValidateGameInput;
(function (ValidateGameInput) {
    ValidateGameInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameInput = exports.ValidateGameInput || (exports.ValidateGameInput = {}));
var ValidationError;
(function (ValidationError) {
    ValidationError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidationError = exports.ValidationError || (exports.ValidationError = {}));
var ValidateGameOutput;
(function (ValidateGameOutput) {
    ValidateGameOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameOutput = exports.ValidateGameOutput || (exports.ValidateGameOutput = {}));
var UploadPrepareFile;
(function (UploadPrepareFile) {
    UploadPrepareFile.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UploadPrepareFile = exports.UploadPrepareFile || (exports.UploadPrepareFile = {}));
var CreateGameBuildInput;
(function (CreateGameBuildInput) {
    CreateGameBuildInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameBuildInput = exports.CreateGameBuildInput || (exports.CreateGameBuildInput = {}));
var CreateGameBuildOutput;
(function (CreateGameBuildOutput) {
    CreateGameBuildOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameBuildOutput = exports.CreateGameBuildOutput || (exports.CreateGameBuildOutput = {}));
var ListGameBuildsInput;
(function (ListGameBuildsInput) {
    ListGameBuildsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListGameBuildsInput = exports.ListGameBuildsInput || (exports.ListGameBuildsInput = {}));
var BuildSummary;
(function (BuildSummary) {
    BuildSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BuildSummary = exports.BuildSummary || (exports.BuildSummary = {}));
var ListGameBuildsOutput;
(function (ListGameBuildsOutput) {
    ListGameBuildsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListGameBuildsOutput = exports.ListGameBuildsOutput || (exports.ListGameBuildsOutput = {}));
var CreateGameCdnSiteInput;
(function (CreateGameCdnSiteInput) {
    CreateGameCdnSiteInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameCdnSiteInput = exports.CreateGameCdnSiteInput || (exports.CreateGameCdnSiteInput = {}));
var CreateGameCdnSiteOutput;
(function (CreateGameCdnSiteOutput) {
    CreateGameCdnSiteOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameCdnSiteOutput = exports.CreateGameCdnSiteOutput || (exports.CreateGameCdnSiteOutput = {}));
var ListGameCdnSitesInput;
(function (ListGameCdnSitesInput) {
    ListGameCdnSitesInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListGameCdnSitesInput = exports.ListGameCdnSitesInput || (exports.ListGameCdnSitesInput = {}));
var CdnSiteSummary;
(function (CdnSiteSummary) {
    CdnSiteSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CdnSiteSummary = exports.CdnSiteSummary || (exports.CdnSiteSummary = {}));
var ListGameCdnSitesOutput;
(function (ListGameCdnSitesOutput) {
    ListGameCdnSitesOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListGameCdnSitesOutput = exports.ListGameCdnSitesOutput || (exports.ListGameCdnSitesOutput = {}));
var CompleteCustomAvatarUploadInput;
(function (CompleteCustomAvatarUploadInput) {
    CompleteCustomAvatarUploadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteCustomAvatarUploadInput = exports.CompleteCustomAvatarUploadInput || (exports.CompleteCustomAvatarUploadInput = {}));
var CompleteCustomAvatarUploadOutput;
(function (CompleteCustomAvatarUploadOutput) {
    CompleteCustomAvatarUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteCustomAvatarUploadOutput = exports.CompleteCustomAvatarUploadOutput || (exports.CompleteCustomAvatarUploadOutput = {}));
var ListGameCustomAvatarsInput;
(function (ListGameCustomAvatarsInput) {
    ListGameCustomAvatarsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListGameCustomAvatarsInput = exports.ListGameCustomAvatarsInput || (exports.ListGameCustomAvatarsInput = {}));
var CustomAvatarSummary;
(function (CustomAvatarSummary) {
    CustomAvatarSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomAvatarSummary = exports.CustomAvatarSummary || (exports.CustomAvatarSummary = {}));
var ListGameCustomAvatarsOutput;
(function (ListGameCustomAvatarsOutput) {
    ListGameCustomAvatarsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListGameCustomAvatarsOutput = exports.ListGameCustomAvatarsOutput || (exports.ListGameCustomAvatarsOutput = {}));
var PrepareCustomAvatarUploadInput;
(function (PrepareCustomAvatarUploadInput) {
    PrepareCustomAvatarUploadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PrepareCustomAvatarUploadInput = exports.PrepareCustomAvatarUploadInput || (exports.PrepareCustomAvatarUploadInput = {}));
var PrepareCustomAvatarUploadOutput;
(function (PrepareCustomAvatarUploadOutput) {
    PrepareCustomAvatarUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PrepareCustomAvatarUploadOutput = exports.PrepareCustomAvatarUploadOutput || (exports.PrepareCustomAvatarUploadOutput = {}));
var DeleteMatchmakerLobbyInput;
(function (DeleteMatchmakerLobbyInput) {
    DeleteMatchmakerLobbyInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteMatchmakerLobbyInput = exports.DeleteMatchmakerLobbyInput || (exports.DeleteMatchmakerLobbyInput = {}));
var DeleteMatchmakerLobbyOutput;
(function (DeleteMatchmakerLobbyOutput) {
    DeleteMatchmakerLobbyOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteMatchmakerLobbyOutput = exports.DeleteMatchmakerLobbyOutput || (exports.DeleteMatchmakerLobbyOutput = {}));
var LogStream;
(function (LogStream) {
    LogStream["STD_ERR"] = "std_err";
    LogStream["STD_OUT"] = "std_out";
})(LogStream = exports.LogStream || (exports.LogStream = {}));
var ExportLobbyLogsInput;
(function (ExportLobbyLogsInput) {
    ExportLobbyLogsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExportLobbyLogsInput = exports.ExportLobbyLogsInput || (exports.ExportLobbyLogsInput = {}));
var ExportLobbyLogsOutput;
(function (ExportLobbyLogsOutput) {
    ExportLobbyLogsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExportLobbyLogsOutput = exports.ExportLobbyLogsOutput || (exports.ExportLobbyLogsOutput = {}));
var ExportMatchmakerLobbyHistoryInput;
(function (ExportMatchmakerLobbyHistoryInput) {
    ExportMatchmakerLobbyHistoryInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExportMatchmakerLobbyHistoryInput = exports.ExportMatchmakerLobbyHistoryInput || (exports.ExportMatchmakerLobbyHistoryInput = {}));
var ExportMatchmakerLobbyHistoryOutput;
(function (ExportMatchmakerLobbyHistoryOutput) {
    ExportMatchmakerLobbyHistoryOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExportMatchmakerLobbyHistoryOutput = exports.ExportMatchmakerLobbyHistoryOutput || (exports.ExportMatchmakerLobbyHistoryOutput = {}));
var GetLobbyLogsInput;
(function (GetLobbyLogsInput) {
    GetLobbyLogsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLobbyLogsInput = exports.GetLobbyLogsInput || (exports.GetLobbyLogsInput = {}));
var GetLobbyLogsOutput;
(function (GetLobbyLogsOutput) {
    GetLobbyLogsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLobbyLogsOutput = exports.GetLobbyLogsOutput || (exports.GetLobbyLogsOutput = {}));
var CreateGameNamespaceInput;
(function (CreateGameNamespaceInput) {
    CreateGameNamespaceInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameNamespaceInput = exports.CreateGameNamespaceInput || (exports.CreateGameNamespaceInput = {}));
var CreateGameNamespaceOutput;
(function (CreateGameNamespaceOutput) {
    CreateGameNamespaceOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameNamespaceOutput = exports.CreateGameNamespaceOutput || (exports.CreateGameNamespaceOutput = {}));
var PortRange;
(function (PortRange) {
    PortRange.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PortRange = exports.PortRange || (exports.PortRange = {}));
var ProxyProtocol;
(function (ProxyProtocol) {
    ProxyProtocol["HTTP"] = "http";
    ProxyProtocol["HTTPS"] = "https";
    ProxyProtocol["UDP"] = "udp";
})(ProxyProtocol = exports.ProxyProtocol || (exports.ProxyProtocol = {}));
var LobbyGroupRuntimeDockerPort;
(function (LobbyGroupRuntimeDockerPort) {
    LobbyGroupRuntimeDockerPort.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LobbyGroupRuntimeDockerPort = exports.LobbyGroupRuntimeDockerPort || (exports.LobbyGroupRuntimeDockerPort = {}));
var CreateGameNamespaceTokenDevelopmentInput;
(function (CreateGameNamespaceTokenDevelopmentInput) {
    CreateGameNamespaceTokenDevelopmentInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameNamespaceTokenDevelopmentInput = exports.CreateGameNamespaceTokenDevelopmentInput || (exports.CreateGameNamespaceTokenDevelopmentInput = {}));
var CreateGameNamespaceTokenDevelopmentOutput;
(function (CreateGameNamespaceTokenDevelopmentOutput) {
    CreateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.token && { token: smithy_client_1.SENSITIVE_STRING
        }),
    });
})(CreateGameNamespaceTokenDevelopmentOutput = exports.CreateGameNamespaceTokenDevelopmentOutput || (exports.CreateGameNamespaceTokenDevelopmentOutput = {}));
var CreateGameNamespaceTokenPublicInput;
(function (CreateGameNamespaceTokenPublicInput) {
    CreateGameNamespaceTokenPublicInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameNamespaceTokenPublicInput = exports.CreateGameNamespaceTokenPublicInput || (exports.CreateGameNamespaceTokenPublicInput = {}));
var CreateGameNamespaceTokenPublicOutput;
(function (CreateGameNamespaceTokenPublicOutput) {
    CreateGameNamespaceTokenPublicOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.token && { token: smithy_client_1.SENSITIVE_STRING
        }),
    });
})(CreateGameNamespaceTokenPublicOutput = exports.CreateGameNamespaceTokenPublicOutput || (exports.CreateGameNamespaceTokenPublicOutput = {}));
var GetGameNamespaceByIdInput;
(function (GetGameNamespaceByIdInput) {
    GetGameNamespaceByIdInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameNamespaceByIdInput = exports.GetGameNamespaceByIdInput || (exports.GetGameNamespaceByIdInput = {}));
var CdnAuthType;
(function (CdnAuthType) {
    CdnAuthType["BASIC"] = "basic";
    CdnAuthType["NONE"] = "none";
})(CdnAuthType = exports.CdnAuthType || (exports.CdnAuthType = {}));
var CdnNamespaceAuthUser;
(function (CdnNamespaceAuthUser) {
    CdnNamespaceAuthUser.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CdnNamespaceAuthUser = exports.CdnNamespaceAuthUser || (exports.CdnNamespaceAuthUser = {}));
var CdnNamespaceDomainVerificationMethodHttp;
(function (CdnNamespaceDomainVerificationMethodHttp) {
    CdnNamespaceDomainVerificationMethodHttp.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CdnNamespaceDomainVerificationMethodHttp = exports.CdnNamespaceDomainVerificationMethodHttp || (exports.CdnNamespaceDomainVerificationMethodHttp = {}));
var CdnNamespaceDomainVerificationMethodInvalid;
(function (CdnNamespaceDomainVerificationMethodInvalid) {
    CdnNamespaceDomainVerificationMethodInvalid.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CdnNamespaceDomainVerificationMethodInvalid = exports.CdnNamespaceDomainVerificationMethodInvalid || (exports.CdnNamespaceDomainVerificationMethodInvalid = {}));
var CdnNamespaceDomainVerificationMethod;
(function (CdnNamespaceDomainVerificationMethod) {
    CdnNamespaceDomainVerificationMethod.visit = (value, visitor) => {
        if (value.invalid !== undefined)
            return visitor.invalid(value.invalid);
        if (value.http !== undefined)
            return visitor.http(value.http);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    CdnNamespaceDomainVerificationMethod.filterSensitiveLog = (obj) => {
        if (obj.invalid !== undefined)
            return { invalid: CdnNamespaceDomainVerificationMethodInvalid.filterSensitiveLog(obj.invalid)
            };
        if (obj.http !== undefined)
            return { http: CdnNamespaceDomainVerificationMethodHttp.filterSensitiveLog(obj.http)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(CdnNamespaceDomainVerificationMethod = exports.CdnNamespaceDomainVerificationMethod || (exports.CdnNamespaceDomainVerificationMethod = {}));
var CdnNamespaceDomainVerificationStatus;
(function (CdnNamespaceDomainVerificationStatus) {
    CdnNamespaceDomainVerificationStatus["ACTIVE"] = "active";
    CdnNamespaceDomainVerificationStatus["FAILED"] = "failed";
    CdnNamespaceDomainVerificationStatus["PENDING"] = "pending";
})(CdnNamespaceDomainVerificationStatus = exports.CdnNamespaceDomainVerificationStatus || (exports.CdnNamespaceDomainVerificationStatus = {}));
var CdnNamespaceDomain;
(function (CdnNamespaceDomain) {
    CdnNamespaceDomain.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.verificationMethod && { verificationMethod: CdnNamespaceDomainVerificationMethod.filterSensitiveLog(obj.verificationMethod)
        }),
    });
})(CdnNamespaceDomain = exports.CdnNamespaceDomain || (exports.CdnNamespaceDomain = {}));
var CdnNamespaceConfig;
(function (CdnNamespaceConfig) {
    CdnNamespaceConfig.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.domains && { domains: obj.domains.map(item => CdnNamespaceDomain.filterSensitiveLog(item))
        }),
    });
})(CdnNamespaceConfig = exports.CdnNamespaceConfig || (exports.CdnNamespaceConfig = {}));
var IdentityNamespaceConfig;
(function (IdentityNamespaceConfig) {
    IdentityNamespaceConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityNamespaceConfig = exports.IdentityNamespaceConfig || (exports.IdentityNamespaceConfig = {}));
var KvNamespaceConfig;
(function (KvNamespaceConfig) {
    KvNamespaceConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KvNamespaceConfig = exports.KvNamespaceConfig || (exports.KvNamespaceConfig = {}));
var MatchmakerNamespaceConfig;
(function (MatchmakerNamespaceConfig) {
    MatchmakerNamespaceConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MatchmakerNamespaceConfig = exports.MatchmakerNamespaceConfig || (exports.MatchmakerNamespaceConfig = {}));
var CloudNamespaceConfig;
(function (CloudNamespaceConfig) {
    CloudNamespaceConfig.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.cdn && { cdn: CdnNamespaceConfig.filterSensitiveLog(obj.cdn)
        }),
    });
})(CloudNamespaceConfig = exports.CloudNamespaceConfig || (exports.CloudNamespaceConfig = {}));
var NamespaceFull;
(function (NamespaceFull) {
    NamespaceFull.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.config && { config: CloudNamespaceConfig.filterSensitiveLog(obj.config)
        }),
    });
})(NamespaceFull = exports.NamespaceFull || (exports.NamespaceFull = {}));
var GetGameNamespaceByIdOutput;
(function (GetGameNamespaceByIdOutput) {
    GetGameNamespaceByIdOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.namespace && { namespace: NamespaceFull.filterSensitiveLog(obj.namespace)
        }),
    });
})(GetGameNamespaceByIdOutput = exports.GetGameNamespaceByIdOutput || (exports.GetGameNamespaceByIdOutput = {}));
var RemoveNamespaceCdnAuthUserInput;
(function (RemoveNamespaceCdnAuthUserInput) {
    RemoveNamespaceCdnAuthUserInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RemoveNamespaceCdnAuthUserInput = exports.RemoveNamespaceCdnAuthUserInput || (exports.RemoveNamespaceCdnAuthUserInput = {}));
var RemoveNamespaceCdnAuthUserOutput;
(function (RemoveNamespaceCdnAuthUserOutput) {
    RemoveNamespaceCdnAuthUserOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RemoveNamespaceCdnAuthUserOutput = exports.RemoveNamespaceCdnAuthUserOutput || (exports.RemoveNamespaceCdnAuthUserOutput = {}));
var RemoveNamespaceDomainInput;
(function (RemoveNamespaceDomainInput) {
    RemoveNamespaceDomainInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RemoveNamespaceDomainInput = exports.RemoveNamespaceDomainInput || (exports.RemoveNamespaceDomainInput = {}));
var RemoveNamespaceDomainOutput;
(function (RemoveNamespaceDomainOutput) {
    RemoveNamespaceDomainOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RemoveNamespaceDomainOutput = exports.RemoveNamespaceDomainOutput || (exports.RemoveNamespaceDomainOutput = {}));
var SetNamespaceCdnAuthTypeInput;
(function (SetNamespaceCdnAuthTypeInput) {
    SetNamespaceCdnAuthTypeInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetNamespaceCdnAuthTypeInput = exports.SetNamespaceCdnAuthTypeInput || (exports.SetNamespaceCdnAuthTypeInput = {}));
var SetNamespaceCdnAuthTypeOutput;
(function (SetNamespaceCdnAuthTypeOutput) {
    SetNamespaceCdnAuthTypeOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SetNamespaceCdnAuthTypeOutput = exports.SetNamespaceCdnAuthTypeOutput || (exports.SetNamespaceCdnAuthTypeOutput = {}));
var ToggleNamespaceDomainPublicAuthInput;
(function (ToggleNamespaceDomainPublicAuthInput) {
    ToggleNamespaceDomainPublicAuthInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ToggleNamespaceDomainPublicAuthInput = exports.ToggleNamespaceDomainPublicAuthInput || (exports.ToggleNamespaceDomainPublicAuthInput = {}));
var ToggleNamespaceDomainPublicAuthOutput;
(function (ToggleNamespaceDomainPublicAuthOutput) {
    ToggleNamespaceDomainPublicAuthOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ToggleNamespaceDomainPublicAuthOutput = exports.ToggleNamespaceDomainPublicAuthOutput || (exports.ToggleNamespaceDomainPublicAuthOutput = {}));
var UpdateGameNamespaceMatchmakerConfigInput;
(function (UpdateGameNamespaceMatchmakerConfigInput) {
    UpdateGameNamespaceMatchmakerConfigInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateGameNamespaceMatchmakerConfigInput = exports.UpdateGameNamespaceMatchmakerConfigInput || (exports.UpdateGameNamespaceMatchmakerConfigInput = {}));
var UpdateGameNamespaceMatchmakerConfigOutput;
(function (UpdateGameNamespaceMatchmakerConfigOutput) {
    UpdateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateGameNamespaceMatchmakerConfigOutput = exports.UpdateGameNamespaceMatchmakerConfigOutput || (exports.UpdateGameNamespaceMatchmakerConfigOutput = {}));
var UpdateGameNamespaceVersionInput;
(function (UpdateGameNamespaceVersionInput) {
    UpdateGameNamespaceVersionInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateGameNamespaceVersionInput = exports.UpdateGameNamespaceVersionInput || (exports.UpdateGameNamespaceVersionInput = {}));
var UpdateGameNamespaceVersionOutput;
(function (UpdateGameNamespaceVersionOutput) {
    UpdateGameNamespaceVersionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateGameNamespaceVersionOutput = exports.UpdateGameNamespaceVersionOutput || (exports.UpdateGameNamespaceVersionOutput = {}));
var UpdateNamespaceCdnAuthUserInput;
(function (UpdateNamespaceCdnAuthUserInput) {
    UpdateNamespaceCdnAuthUserInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateNamespaceCdnAuthUserInput = exports.UpdateNamespaceCdnAuthUserInput || (exports.UpdateNamespaceCdnAuthUserInput = {}));
var UpdateNamespaceCdnAuthUserOutput;
(function (UpdateNamespaceCdnAuthUserOutput) {
    UpdateNamespaceCdnAuthUserOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateNamespaceCdnAuthUserOutput = exports.UpdateNamespaceCdnAuthUserOutput || (exports.UpdateNamespaceCdnAuthUserOutput = {}));
var ValidateGameNamespaceInput;
(function (ValidateGameNamespaceInput) {
    ValidateGameNamespaceInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameNamespaceInput = exports.ValidateGameNamespaceInput || (exports.ValidateGameNamespaceInput = {}));
var ValidateGameNamespaceOutput;
(function (ValidateGameNamespaceOutput) {
    ValidateGameNamespaceOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameNamespaceOutput = exports.ValidateGameNamespaceOutput || (exports.ValidateGameNamespaceOutput = {}));
var ValidateGameNamespaceMatchmakerConfigInput;
(function (ValidateGameNamespaceMatchmakerConfigInput) {
    ValidateGameNamespaceMatchmakerConfigInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameNamespaceMatchmakerConfigInput = exports.ValidateGameNamespaceMatchmakerConfigInput || (exports.ValidateGameNamespaceMatchmakerConfigInput = {}));
var ValidateGameNamespaceMatchmakerConfigOutput;
(function (ValidateGameNamespaceMatchmakerConfigOutput) {
    ValidateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameNamespaceMatchmakerConfigOutput = exports.ValidateGameNamespaceMatchmakerConfigOutput || (exports.ValidateGameNamespaceMatchmakerConfigOutput = {}));
var ValidateGameNamespaceTokenDevelopmentInput;
(function (ValidateGameNamespaceTokenDevelopmentInput) {
    ValidateGameNamespaceTokenDevelopmentInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameNamespaceTokenDevelopmentInput = exports.ValidateGameNamespaceTokenDevelopmentInput || (exports.ValidateGameNamespaceTokenDevelopmentInput = {}));
var ValidateGameNamespaceTokenDevelopmentOutput;
(function (ValidateGameNamespaceTokenDevelopmentOutput) {
    ValidateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameNamespaceTokenDevelopmentOutput = exports.ValidateGameNamespaceTokenDevelopmentOutput || (exports.ValidateGameNamespaceTokenDevelopmentOutput = {}));
var GetNamespaceAnalyticsMatchmakerLiveInput;
(function (GetNamespaceAnalyticsMatchmakerLiveInput) {
    GetNamespaceAnalyticsMatchmakerLiveInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetNamespaceAnalyticsMatchmakerLiveInput = exports.GetNamespaceAnalyticsMatchmakerLiveInput || (exports.GetNamespaceAnalyticsMatchmakerLiveInput = {}));
var AnalyticsLobbySummary;
(function (AnalyticsLobbySummary) {
    AnalyticsLobbySummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyticsLobbySummary = exports.AnalyticsLobbySummary || (exports.AnalyticsLobbySummary = {}));
var GetNamespaceAnalyticsMatchmakerLiveOutput;
(function (GetNamespaceAnalyticsMatchmakerLiveOutput) {
    GetNamespaceAnalyticsMatchmakerLiveOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetNamespaceAnalyticsMatchmakerLiveOutput = exports.GetNamespaceAnalyticsMatchmakerLiveOutput || (exports.GetNamespaceAnalyticsMatchmakerLiveOutput = {}));
var GetNamespaceLobbyInput;
(function (GetNamespaceLobbyInput) {
    GetNamespaceLobbyInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetNamespaceLobbyInput = exports.GetNamespaceLobbyInput || (exports.GetNamespaceLobbyInput = {}));
var Unit;
(function (Unit) {
    Unit.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Unit = exports.Unit || (exports.Unit = {}));
var LogsLobbyStatusStopped;
(function (LogsLobbyStatusStopped) {
    LogsLobbyStatusStopped.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LogsLobbyStatusStopped = exports.LogsLobbyStatusStopped || (exports.LogsLobbyStatusStopped = {}));
var LogsLobbyStatus;
(function (LogsLobbyStatus) {
    LogsLobbyStatus.visit = (value, visitor) => {
        if (value.running !== undefined)
            return visitor.running(value.running);
        if (value.stopped !== undefined)
            return visitor.stopped(value.stopped);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    LogsLobbyStatus.filterSensitiveLog = (obj) => {
        if (obj.running !== undefined)
            return { running: Unit.filterSensitiveLog(obj.running)
            };
        if (obj.stopped !== undefined)
            return { stopped: LogsLobbyStatusStopped.filterSensitiveLog(obj.stopped)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(LogsLobbyStatus = exports.LogsLobbyStatus || (exports.LogsLobbyStatus = {}));
var LogsLobbySummary;
(function (LogsLobbySummary) {
    LogsLobbySummary.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.status && { status: LogsLobbyStatus.filterSensitiveLog(obj.status)
        }),
    });
})(LogsLobbySummary = exports.LogsLobbySummary || (exports.LogsLobbySummary = {}));
var SvcMetrics;
(function (SvcMetrics) {
    SvcMetrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SvcMetrics = exports.SvcMetrics || (exports.SvcMetrics = {}));
var LogsPerfMark;
(function (LogsPerfMark) {
    LogsPerfMark.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LogsPerfMark = exports.LogsPerfMark || (exports.LogsPerfMark = {}));
var LogsPerfSpan;
(function (LogsPerfSpan) {
    LogsPerfSpan.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LogsPerfSpan = exports.LogsPerfSpan || (exports.LogsPerfSpan = {}));
var SvcPerf;
(function (SvcPerf) {
    SvcPerf.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SvcPerf = exports.SvcPerf || (exports.SvcPerf = {}));
var GetNamespaceLobbyOutput;
(function (GetNamespaceLobbyOutput) {
    GetNamespaceLobbyOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.lobby && { lobby: LogsLobbySummary.filterSensitiveLog(obj.lobby)
        }),
    });
})(GetNamespaceLobbyOutput = exports.GetNamespaceLobbyOutput || (exports.GetNamespaceLobbyOutput = {}));
var ListNamespaceLobbiesInput;
(function (ListNamespaceLobbiesInput) {
    ListNamespaceLobbiesInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListNamespaceLobbiesInput = exports.ListNamespaceLobbiesInput || (exports.ListNamespaceLobbiesInput = {}));
var ListNamespaceLobbiesOutput;
(function (ListNamespaceLobbiesOutput) {
    ListNamespaceLobbiesOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.lobbies && { lobbies: obj.lobbies.map(item => LogsLobbySummary.filterSensitiveLog(item))
        }),
    });
})(ListNamespaceLobbiesOutput = exports.ListNamespaceLobbiesOutput || (exports.ListNamespaceLobbiesOutput = {}));
var CreateCloudTokenInput;
(function (CreateCloudTokenInput) {
    CreateCloudTokenInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateCloudTokenInput = exports.CreateCloudTokenInput || (exports.CreateCloudTokenInput = {}));
var CreateCloudTokenOutput;
(function (CreateCloudTokenOutput) {
    CreateCloudTokenOutput.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.token && { token: smithy_client_1.SENSITIVE_STRING
        }),
    });
})(CreateCloudTokenOutput = exports.CreateCloudTokenOutput || (exports.CreateCloudTokenOutput = {}));
var CdnVersionHeader;
(function (CdnVersionHeader) {
    CdnVersionHeader.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CdnVersionHeader = exports.CdnVersionHeader || (exports.CdnVersionHeader = {}));
var CdnVersionCustomHeadersMiddleware;
(function (CdnVersionCustomHeadersMiddleware) {
    CdnVersionCustomHeadersMiddleware.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CdnVersionCustomHeadersMiddleware = exports.CdnVersionCustomHeadersMiddleware || (exports.CdnVersionCustomHeadersMiddleware = {}));
var CdnVersionMiddlewareKind;
(function (CdnVersionMiddlewareKind) {
    CdnVersionMiddlewareKind.visit = (value, visitor) => {
        if (value.customHeaders !== undefined)
            return visitor.customHeaders(value.customHeaders);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    CdnVersionMiddlewareKind.filterSensitiveLog = (obj) => {
        if (obj.customHeaders !== undefined)
            return { customHeaders: CdnVersionCustomHeadersMiddleware.filterSensitiveLog(obj.customHeaders)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(CdnVersionMiddlewareKind = exports.CdnVersionMiddlewareKind || (exports.CdnVersionMiddlewareKind = {}));
var CdnVersionMiddleware;
(function (CdnVersionMiddleware) {
    CdnVersionMiddleware.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.kind && { kind: CdnVersionMiddlewareKind.filterSensitiveLog(obj.kind)
        }),
    });
})(CdnVersionMiddleware = exports.CdnVersionMiddleware || (exports.CdnVersionMiddleware = {}));
var CdnVersionRoute;
(function (CdnVersionRoute) {
    CdnVersionRoute.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.middlewares && { middlewares: obj.middlewares.map(item => CdnVersionMiddleware.filterSensitiveLog(item))
        }),
    });
})(CdnVersionRoute = exports.CdnVersionRoute || (exports.CdnVersionRoute = {}));
var CdnVersionConfig;
(function (CdnVersionConfig) {
    CdnVersionConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CdnVersionConfig = exports.CdnVersionConfig || (exports.CdnVersionConfig = {}));
var CustomAvatar;
(function (CustomAvatar) {
    CustomAvatar.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomAvatar = exports.CustomAvatar || (exports.CustomAvatar = {}));
var CustomDisplayName;
(function (CustomDisplayName) {
    CustomDisplayName.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomDisplayName = exports.CustomDisplayName || (exports.CustomDisplayName = {}));
var IdentityVersionConfig;
(function (IdentityVersionConfig) {
    IdentityVersionConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdentityVersionConfig = exports.IdentityVersionConfig || (exports.IdentityVersionConfig = {}));
var KvVersionConfig;
(function (KvVersionConfig) {
    KvVersionConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KvVersionConfig = exports.KvVersionConfig || (exports.KvVersionConfig = {}));
var CaptchaLevel;
(function (CaptchaLevel) {
    CaptchaLevel["ALWAYS_ON"] = "always_on";
    CaptchaLevel["DIFFICULT"] = "difficult";
    CaptchaLevel["EASY"] = "easy";
    CaptchaLevel["MODERATE"] = "moderate";
})(CaptchaLevel = exports.CaptchaLevel || (exports.CaptchaLevel = {}));
var MatchmakerCaptchaHcaptcha;
(function (MatchmakerCaptchaHcaptcha) {
    MatchmakerCaptchaHcaptcha.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MatchmakerCaptchaHcaptcha = exports.MatchmakerCaptchaHcaptcha || (exports.MatchmakerCaptchaHcaptcha = {}));
var MatchmakerCaptcha;
(function (MatchmakerCaptcha) {
    MatchmakerCaptcha.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MatchmakerCaptcha = exports.MatchmakerCaptcha || (exports.MatchmakerCaptcha = {}));
var IdleLobbiesConfig;
(function (IdleLobbiesConfig) {
    IdleLobbiesConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdleLobbiesConfig = exports.IdleLobbiesConfig || (exports.IdleLobbiesConfig = {}));
var LobbyGroupRegion;
(function (LobbyGroupRegion) {
    LobbyGroupRegion.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LobbyGroupRegion = exports.LobbyGroupRegion || (exports.LobbyGroupRegion = {}));
var LobbyGroupRuntimeDockerEnvVar;
(function (LobbyGroupRuntimeDockerEnvVar) {
    LobbyGroupRuntimeDockerEnvVar.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LobbyGroupRuntimeDockerEnvVar = exports.LobbyGroupRuntimeDockerEnvVar || (exports.LobbyGroupRuntimeDockerEnvVar = {}));
var NetworkMode;
(function (NetworkMode) {
    NetworkMode["BRIDGE"] = "bridge";
    NetworkMode["HOST"] = "host";
})(NetworkMode = exports.NetworkMode || (exports.NetworkMode = {}));
var LobbyGroupRuntimeDocker;
(function (LobbyGroupRuntimeDocker) {
    LobbyGroupRuntimeDocker.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LobbyGroupRuntimeDocker = exports.LobbyGroupRuntimeDocker || (exports.LobbyGroupRuntimeDocker = {}));
var LobbyGroupRuntime;
(function (LobbyGroupRuntime) {
    LobbyGroupRuntime.visit = (value, visitor) => {
        if (value.docker !== undefined)
            return visitor.docker(value.docker);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    LobbyGroupRuntime.filterSensitiveLog = (obj) => {
        if (obj.docker !== undefined)
            return { docker: LobbyGroupRuntimeDocker.filterSensitiveLog(obj.docker)
            };
        if (obj.$unknown !== undefined)
            return { [obj.$unknown[0]]: 'UNKNOWN' };
    };
})(LobbyGroupRuntime = exports.LobbyGroupRuntime || (exports.LobbyGroupRuntime = {}));
var LobbyGroup;
(function (LobbyGroup) {
    LobbyGroup.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.runtime && { runtime: LobbyGroupRuntime.filterSensitiveLog(obj.runtime)
        }),
    });
})(LobbyGroup = exports.LobbyGroup || (exports.LobbyGroup = {}));
var MatchmakerVersionConfig;
(function (MatchmakerVersionConfig) {
    MatchmakerVersionConfig.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.lobbyGroups && { lobbyGroups: obj.lobbyGroups.map(item => LobbyGroup.filterSensitiveLog(item))
        }),
    });
})(MatchmakerVersionConfig = exports.MatchmakerVersionConfig || (exports.MatchmakerVersionConfig = {}));
var CloudVersionConfig;
(function (CloudVersionConfig) {
    CloudVersionConfig.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.matchmaker && { matchmaker: MatchmakerVersionConfig.filterSensitiveLog(obj.matchmaker)
        }),
    });
})(CloudVersionConfig = exports.CloudVersionConfig || (exports.CloudVersionConfig = {}));
var CreateGameVersionInput;
(function (CreateGameVersionInput) {
    CreateGameVersionInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameVersionInput = exports.CreateGameVersionInput || (exports.CreateGameVersionInput = {}));
var CreateGameVersionOutput;
(function (CreateGameVersionOutput) {
    CreateGameVersionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateGameVersionOutput = exports.CreateGameVersionOutput || (exports.CreateGameVersionOutput = {}));
var GetGameVersionByIdInput;
(function (GetGameVersionByIdInput) {
    GetGameVersionByIdInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameVersionByIdInput = exports.GetGameVersionByIdInput || (exports.GetGameVersionByIdInput = {}));
var VersionFull;
(function (VersionFull) {
    VersionFull.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VersionFull = exports.VersionFull || (exports.VersionFull = {}));
var GetGameVersionByIdOutput;
(function (GetGameVersionByIdOutput) {
    GetGameVersionByIdOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGameVersionByIdOutput = exports.GetGameVersionByIdOutput || (exports.GetGameVersionByIdOutput = {}));
var ValidateGameVersionInput;
(function (ValidateGameVersionInput) {
    ValidateGameVersionInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameVersionInput = exports.ValidateGameVersionInput || (exports.ValidateGameVersionInput = {}));
var ValidateGameVersionOutput;
(function (ValidateGameVersionOutput) {
    ValidateGameVersionOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGameVersionOutput = exports.ValidateGameVersionOutput || (exports.ValidateGameVersionOutput = {}));
var ConvertGroupInput;
(function (ConvertGroupInput) {
    ConvertGroupInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConvertGroupInput = exports.ConvertGroupInput || (exports.ConvertGroupInput = {}));
var ConvertGroupOutput;
(function (ConvertGroupOutput) {
    ConvertGroupOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConvertGroupOutput = exports.ConvertGroupOutput || (exports.ConvertGroupOutput = {}));
var GetGroupBillingInput;
(function (GetGroupBillingInput) {
    GetGroupBillingInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupBillingInput = exports.GetGroupBillingInput || (exports.GetGroupBillingInput = {}));
var GetGroupBillingOutput;
(function (GetGroupBillingOutput) {
    GetGroupBillingOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupBillingOutput = exports.GetGroupBillingOutput || (exports.GetGroupBillingOutput = {}));
var GetGroupInvoicesListInput;
(function (GetGroupInvoicesListInput) {
    GetGroupInvoicesListInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupInvoicesListInput = exports.GetGroupInvoicesListInput || (exports.GetGroupInvoicesListInput = {}));
var GroupBillingInvoice;
(function (GroupBillingInvoice) {
    GroupBillingInvoice.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupBillingInvoice = exports.GroupBillingInvoice || (exports.GroupBillingInvoice = {}));
var GetGroupInvoicesListOutput;
(function (GetGroupInvoicesListOutput) {
    GetGroupInvoicesListOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetGroupInvoicesListOutput = exports.GetGroupInvoicesListOutput || (exports.GetGroupInvoicesListOutput = {}));
var GroupBillingCheckoutInput;
(function (GroupBillingCheckoutInput) {
    GroupBillingCheckoutInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupBillingCheckoutInput = exports.GroupBillingCheckoutInput || (exports.GroupBillingCheckoutInput = {}));
var GroupBillingCheckoutOutput;
(function (GroupBillingCheckoutOutput) {
    GroupBillingCheckoutOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroupBillingCheckoutOutput = exports.GroupBillingCheckoutOutput || (exports.GroupBillingCheckoutOutput = {}));
var ValidateGroupInput;
(function (ValidateGroupInput) {
    ValidateGroupInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGroupInput = exports.ValidateGroupInput || (exports.ValidateGroupInput = {}));
var ValidateGroupOutput;
(function (ValidateGroupOutput) {
    ValidateGroupOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidateGroupOutput = exports.ValidateGroupOutput || (exports.ValidateGroupOutput = {}));
var GetRayPerfLogsInput;
(function (GetRayPerfLogsInput) {
    GetRayPerfLogsInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRayPerfLogsInput = exports.GetRayPerfLogsInput || (exports.GetRayPerfLogsInput = {}));
var GetRayPerfLogsOutput;
(function (GetRayPerfLogsOutput) {
    GetRayPerfLogsOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRayPerfLogsOutput = exports.GetRayPerfLogsOutput || (exports.GetRayPerfLogsOutput = {}));
var GetRegionTiersInput;
(function (GetRegionTiersInput) {
    GetRegionTiersInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRegionTiersInput = exports.GetRegionTiersInput || (exports.GetRegionTiersInput = {}));
var RegionTier;
(function (RegionTier) {
    RegionTier.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RegionTier = exports.RegionTier || (exports.RegionTier = {}));
var GetRegionTiersOutput;
(function (GetRegionTiersOutput) {
    GetRegionTiersOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetRegionTiersOutput = exports.GetRegionTiersOutput || (exports.GetRegionTiersOutput = {}));
var CompleteUploadInput;
(function (CompleteUploadInput) {
    CompleteUploadInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteUploadInput = exports.CompleteUploadInput || (exports.CompleteUploadInput = {}));
var CompleteUploadOutput;
(function (CompleteUploadOutput) {
    CompleteUploadOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompleteUploadOutput = exports.CompleteUploadOutput || (exports.CompleteUploadOutput = {}));
class BadRequestError extends CloudServiceServiceException_1.CloudServiceServiceException {
    constructor(opts) {
        super({
            name: "BadRequestError",
            $fault: "client",
            ...opts
        });
        this.name = "BadRequestError";
        this.$fault = "client";
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.BadRequestError = BadRequestError;
class ForbiddenError extends CloudServiceServiceException_1.CloudServiceServiceException {
    constructor(opts) {
        super({
            name: "ForbiddenError",
            $fault: "client",
            ...opts
        });
        this.name = "ForbiddenError";
        this.$fault = "client";
        Object.setPrototypeOf(this, ForbiddenError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalError extends CloudServiceServiceException_1.CloudServiceServiceException {
    constructor(opts) {
        super({
            name: "InternalError",
            $fault: "server",
            ...opts
        });
        this.name = "InternalError";
        this.$fault = "server";
        this.$retryable = {};
        Object.setPrototypeOf(this, InternalError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.InternalError = InternalError;
class NotFoundError extends CloudServiceServiceException_1.CloudServiceServiceException {
    constructor(opts) {
        super({
            name: "NotFoundError",
            $fault: "client",
            ...opts
        });
        this.name = "NotFoundError";
        this.$fault = "client";
        Object.setPrototypeOf(this, NotFoundError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.NotFoundError = NotFoundError;
class RateLimitError extends CloudServiceServiceException_1.CloudServiceServiceException {
    constructor(opts) {
        super({
            name: "RateLimitError",
            $fault: "client",
            ...opts
        });
        this.name = "RateLimitError";
        this.$fault = "client";
        Object.setPrototypeOf(this, RateLimitError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.RateLimitError = RateLimitError;
class UnauthorizedError extends CloudServiceServiceException_1.CloudServiceServiceException {
    constructor(opts) {
        super({
            name: "UnauthorizedError",
            $fault: "client",
            ...opts
        });
        this.name = "UnauthorizedError";
        this.$fault = "client";
        this.$retryable = {};
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
        this.code = opts.code;
        this.documentation = opts.documentation;
        this.metadata = opts.metadata;
    }
}
exports.UnauthorizedError = UnauthorizedError;
