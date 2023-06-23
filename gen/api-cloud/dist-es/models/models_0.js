import { __assign, __extends } from "tslib";
import { CloudServiceServiceException as __BaseException } from "./CloudServiceServiceException";
import { SENSITIVE_STRING, } from "@aws-sdk/smithy-client";
export var AddNamespaceDomainInput;
(function (AddNamespaceDomainInput) {
    AddNamespaceDomainInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AddNamespaceDomainInput || (AddNamespaceDomainInput = {}));
export var AddNamespaceDomainOutput;
(function (AddNamespaceDomainOutput) {
    AddNamespaceDomainOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AddNamespaceDomainOutput || (AddNamespaceDomainOutput = {}));
export var InspectInput;
(function (InspectInput) {
    InspectInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InspectInput || (InspectInput = {}));
export var AuthAgentGameCloud;
(function (AuthAgentGameCloud) {
    AuthAgentGameCloud.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AuthAgentGameCloud || (AuthAgentGameCloud = {}));
export var AuthAgentIdentity;
(function (AuthAgentIdentity) {
    AuthAgentIdentity.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AuthAgentIdentity || (AuthAgentIdentity = {}));
export var AuthAgent;
(function (AuthAgent) {
    AuthAgent.visit = function (value, visitor) {
        if (value.identity !== undefined)
            return visitor.identity(value.identity);
        if (value.gameCloud !== undefined)
            return visitor.gameCloud(value.gameCloud);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    AuthAgent.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.identity !== undefined)
            return { identity: AuthAgentIdentity.filterSensitiveLog(obj.identity)
            };
        if (obj.gameCloud !== undefined)
            return { gameCloud: AuthAgentGameCloud.filterSensitiveLog(obj.gameCloud)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(AuthAgent || (AuthAgent = {}));
export var InspectOutput;
(function (InspectOutput) {
    InspectOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.agent && { agent: AuthAgent.filterSensitiveLog(obj.agent)
    }))); };
})(InspectOutput || (InspectOutput = {}));
export var CreateGameInput;
(function (CreateGameInput) {
    CreateGameInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameInput || (CreateGameInput = {}));
export var CreateGameOutput;
(function (CreateGameOutput) {
    CreateGameOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameOutput || (CreateGameOutput = {}));
export var GameBannerUploadCompleteInput;
(function (GameBannerUploadCompleteInput) {
    GameBannerUploadCompleteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameBannerUploadCompleteInput || (GameBannerUploadCompleteInput = {}));
export var GameBannerUploadCompleteOutput;
(function (GameBannerUploadCompleteOutput) {
    GameBannerUploadCompleteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameBannerUploadCompleteOutput || (GameBannerUploadCompleteOutput = {}));
export var GameBannerUploadPrepareInput;
(function (GameBannerUploadPrepareInput) {
    GameBannerUploadPrepareInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameBannerUploadPrepareInput || (GameBannerUploadPrepareInput = {}));
export var UploadPresignedRequest;
(function (UploadPresignedRequest) {
    UploadPresignedRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UploadPresignedRequest || (UploadPresignedRequest = {}));
export var GameBannerUploadPrepareOutput;
(function (GameBannerUploadPrepareOutput) {
    GameBannerUploadPrepareOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameBannerUploadPrepareOutput || (GameBannerUploadPrepareOutput = {}));
export var GameLogoUploadCompleteInput;
(function (GameLogoUploadCompleteInput) {
    GameLogoUploadCompleteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameLogoUploadCompleteInput || (GameLogoUploadCompleteInput = {}));
export var GameLogoUploadCompleteOutput;
(function (GameLogoUploadCompleteOutput) {
    GameLogoUploadCompleteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameLogoUploadCompleteOutput || (GameLogoUploadCompleteOutput = {}));
export var GameLogoUploadPrepareInput;
(function (GameLogoUploadPrepareInput) {
    GameLogoUploadPrepareInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameLogoUploadPrepareInput || (GameLogoUploadPrepareInput = {}));
export var GameLogoUploadPrepareOutput;
(function (GameLogoUploadPrepareOutput) {
    GameLogoUploadPrepareOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameLogoUploadPrepareOutput || (GameLogoUploadPrepareOutput = {}));
export var GetGameBillingInput;
(function (GetGameBillingInput) {
    GetGameBillingInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameBillingInput || (GetGameBillingInput = {}));
export var RegionSummary;
(function (RegionSummary) {
    RegionSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RegionSummary || (RegionSummary = {}));
export var GameHandle;
(function (GameHandle) {
    GameHandle.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameHandle || (GameHandle = {}));
export var GroupStatus;
(function (GroupStatus) {
    GroupStatus["ACTIVE"] = "active";
    GroupStatus["PAYMENT_FAILED"] = "payment_failed";
    GroupStatus["SETUP_INCOMPLETE"] = "setup_incomplete";
    GroupStatus["SPENDING_LIMIT_REACHED"] = "spending_limit_reached";
})(GroupStatus || (GroupStatus = {}));
export var RegionTierMetrics;
(function (RegionTierMetrics) {
    RegionTierMetrics.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RegionTierMetrics || (RegionTierMetrics = {}));
export var NamespaceSummary;
(function (NamespaceSummary) {
    NamespaceSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NamespaceSummary || (NamespaceSummary = {}));
export var GameBillingPlanCode;
(function (GameBillingPlanCode) {
    GameBillingPlanCode["ENTERPRISE"] = "enterprise";
    GameBillingPlanCode["FREE"] = "free";
    GameBillingPlanCode["GAME_HOBBY_MONTHLY"] = "game_hobby_monthly";
    GameBillingPlanCode["GAME_HOBBY_YEARLY"] = "game_hobby_yearly";
    GameBillingPlanCode["GAME_STUDIO_MONTHLY"] = "game_studio_monthly";
    GameBillingPlanCode["GAME_STUDIO_YEARLY"] = "game_studio_yearly";
})(GameBillingPlanCode || (GameBillingPlanCode = {}));
export var GetGameBillingOutput;
(function (GetGameBillingOutput) {
    GetGameBillingOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameBillingOutput || (GetGameBillingOutput = {}));
export var GetGameBillingPlansInput;
(function (GetGameBillingPlansInput) {
    GetGameBillingPlansInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameBillingPlansInput || (GetGameBillingPlansInput = {}));
export var BillingInterval;
(function (BillingInterval) {
    BillingInterval["MONTHLY"] = "monthly";
    BillingInterval["YEARLY"] = "yearly";
})(BillingInterval || (BillingInterval = {}));
export var GameBillingPlan;
(function (GameBillingPlan) {
    GameBillingPlan.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameBillingPlan || (GameBillingPlan = {}));
export var GetGameBillingPlansOutput;
(function (GetGameBillingPlansOutput) {
    GetGameBillingPlansOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameBillingPlansOutput || (GetGameBillingPlansOutput = {}));
export var GetGameByIdInput;
(function (GetGameByIdInput) {
    GetGameByIdInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameByIdInput || (GetGameByIdInput = {}));
export var VersionSummary;
(function (VersionSummary) {
    VersionSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(VersionSummary || (VersionSummary = {}));
export var GameFull;
(function (GameFull) {
    GameFull.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameFull || (GameFull = {}));
export var WatchResponse;
(function (WatchResponse) {
    WatchResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(WatchResponse || (WatchResponse = {}));
export var GetGameByIdOutput;
(function (GetGameByIdOutput) {
    GetGameByIdOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameByIdOutput || (GetGameByIdOutput = {}));
export var GetGamesInput;
(function (GetGamesInput) {
    GetGamesInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGamesInput || (GetGamesInput = {}));
export var GameSummary;
(function (GameSummary) {
    GameSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GameSummary || (GameSummary = {}));
export var GroupExternalLinks;
(function (GroupExternalLinks) {
    GroupExternalLinks.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupExternalLinks || (GroupExternalLinks = {}));
export var GroupPublicity;
(function (GroupPublicity) {
    GroupPublicity["CLOSED"] = "closed";
    GroupPublicity["OPEN"] = "open";
})(GroupPublicity || (GroupPublicity = {}));
export var GroupSummary;
(function (GroupSummary) {
    GroupSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupSummary || (GroupSummary = {}));
export var GetGamesOutput;
(function (GetGamesOutput) {
    GetGamesOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGamesOutput || (GetGamesOutput = {}));
export var SetGameBillingPlanInput;
(function (SetGameBillingPlanInput) {
    SetGameBillingPlanInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetGameBillingPlanInput || (SetGameBillingPlanInput = {}));
export var SetGameBillingPlanOutput;
(function (SetGameBillingPlanOutput) {
    SetGameBillingPlanOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetGameBillingPlanOutput || (SetGameBillingPlanOutput = {}));
export var ValidateGameInput;
(function (ValidateGameInput) {
    ValidateGameInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameInput || (ValidateGameInput = {}));
export var ValidationError;
(function (ValidationError) {
    ValidationError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidationError || (ValidationError = {}));
export var ValidateGameOutput;
(function (ValidateGameOutput) {
    ValidateGameOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameOutput || (ValidateGameOutput = {}));
export var UploadPrepareFile;
(function (UploadPrepareFile) {
    UploadPrepareFile.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UploadPrepareFile || (UploadPrepareFile = {}));
export var CreateGameBuildInput;
(function (CreateGameBuildInput) {
    CreateGameBuildInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameBuildInput || (CreateGameBuildInput = {}));
export var CreateGameBuildOutput;
(function (CreateGameBuildOutput) {
    CreateGameBuildOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameBuildOutput || (CreateGameBuildOutput = {}));
export var ListGameBuildsInput;
(function (ListGameBuildsInput) {
    ListGameBuildsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListGameBuildsInput || (ListGameBuildsInput = {}));
export var BuildSummary;
(function (BuildSummary) {
    BuildSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BuildSummary || (BuildSummary = {}));
export var ListGameBuildsOutput;
(function (ListGameBuildsOutput) {
    ListGameBuildsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListGameBuildsOutput || (ListGameBuildsOutput = {}));
export var CreateGameCdnSiteInput;
(function (CreateGameCdnSiteInput) {
    CreateGameCdnSiteInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameCdnSiteInput || (CreateGameCdnSiteInput = {}));
export var CreateGameCdnSiteOutput;
(function (CreateGameCdnSiteOutput) {
    CreateGameCdnSiteOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameCdnSiteOutput || (CreateGameCdnSiteOutput = {}));
export var ListGameCdnSitesInput;
(function (ListGameCdnSitesInput) {
    ListGameCdnSitesInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListGameCdnSitesInput || (ListGameCdnSitesInput = {}));
export var CdnSiteSummary;
(function (CdnSiteSummary) {
    CdnSiteSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CdnSiteSummary || (CdnSiteSummary = {}));
export var ListGameCdnSitesOutput;
(function (ListGameCdnSitesOutput) {
    ListGameCdnSitesOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListGameCdnSitesOutput || (ListGameCdnSitesOutput = {}));
export var CompleteCustomAvatarUploadInput;
(function (CompleteCustomAvatarUploadInput) {
    CompleteCustomAvatarUploadInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteCustomAvatarUploadInput || (CompleteCustomAvatarUploadInput = {}));
export var CompleteCustomAvatarUploadOutput;
(function (CompleteCustomAvatarUploadOutput) {
    CompleteCustomAvatarUploadOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteCustomAvatarUploadOutput || (CompleteCustomAvatarUploadOutput = {}));
export var ListGameCustomAvatarsInput;
(function (ListGameCustomAvatarsInput) {
    ListGameCustomAvatarsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListGameCustomAvatarsInput || (ListGameCustomAvatarsInput = {}));
export var CustomAvatarSummary;
(function (CustomAvatarSummary) {
    CustomAvatarSummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CustomAvatarSummary || (CustomAvatarSummary = {}));
export var ListGameCustomAvatarsOutput;
(function (ListGameCustomAvatarsOutput) {
    ListGameCustomAvatarsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListGameCustomAvatarsOutput || (ListGameCustomAvatarsOutput = {}));
export var PrepareCustomAvatarUploadInput;
(function (PrepareCustomAvatarUploadInput) {
    PrepareCustomAvatarUploadInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PrepareCustomAvatarUploadInput || (PrepareCustomAvatarUploadInput = {}));
export var PrepareCustomAvatarUploadOutput;
(function (PrepareCustomAvatarUploadOutput) {
    PrepareCustomAvatarUploadOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PrepareCustomAvatarUploadOutput || (PrepareCustomAvatarUploadOutput = {}));
export var DeleteMatchmakerLobbyInput;
(function (DeleteMatchmakerLobbyInput) {
    DeleteMatchmakerLobbyInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteMatchmakerLobbyInput || (DeleteMatchmakerLobbyInput = {}));
export var DeleteMatchmakerLobbyOutput;
(function (DeleteMatchmakerLobbyOutput) {
    DeleteMatchmakerLobbyOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteMatchmakerLobbyOutput || (DeleteMatchmakerLobbyOutput = {}));
export var LogStream;
(function (LogStream) {
    LogStream["STD_ERR"] = "std_err";
    LogStream["STD_OUT"] = "std_out";
})(LogStream || (LogStream = {}));
export var ExportLobbyLogsInput;
(function (ExportLobbyLogsInput) {
    ExportLobbyLogsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ExportLobbyLogsInput || (ExportLobbyLogsInput = {}));
export var ExportLobbyLogsOutput;
(function (ExportLobbyLogsOutput) {
    ExportLobbyLogsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ExportLobbyLogsOutput || (ExportLobbyLogsOutput = {}));
export var ExportMatchmakerLobbyHistoryInput;
(function (ExportMatchmakerLobbyHistoryInput) {
    ExportMatchmakerLobbyHistoryInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ExportMatchmakerLobbyHistoryInput || (ExportMatchmakerLobbyHistoryInput = {}));
export var ExportMatchmakerLobbyHistoryOutput;
(function (ExportMatchmakerLobbyHistoryOutput) {
    ExportMatchmakerLobbyHistoryOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ExportMatchmakerLobbyHistoryOutput || (ExportMatchmakerLobbyHistoryOutput = {}));
export var GetLobbyLogsInput;
(function (GetLobbyLogsInput) {
    GetLobbyLogsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetLobbyLogsInput || (GetLobbyLogsInput = {}));
export var GetLobbyLogsOutput;
(function (GetLobbyLogsOutput) {
    GetLobbyLogsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetLobbyLogsOutput || (GetLobbyLogsOutput = {}));
export var CreateGameNamespaceInput;
(function (CreateGameNamespaceInput) {
    CreateGameNamespaceInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameNamespaceInput || (CreateGameNamespaceInput = {}));
export var CreateGameNamespaceOutput;
(function (CreateGameNamespaceOutput) {
    CreateGameNamespaceOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameNamespaceOutput || (CreateGameNamespaceOutput = {}));
export var PortRange;
(function (PortRange) {
    PortRange.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PortRange || (PortRange = {}));
export var ProxyProtocol;
(function (ProxyProtocol) {
    ProxyProtocol["HTTP"] = "http";
    ProxyProtocol["HTTPS"] = "https";
    ProxyProtocol["UDP"] = "udp";
})(ProxyProtocol || (ProxyProtocol = {}));
export var LobbyGroupRuntimeDockerPort;
(function (LobbyGroupRuntimeDockerPort) {
    LobbyGroupRuntimeDockerPort.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LobbyGroupRuntimeDockerPort || (LobbyGroupRuntimeDockerPort = {}));
export var CreateGameNamespaceTokenDevelopmentInput;
(function (CreateGameNamespaceTokenDevelopmentInput) {
    CreateGameNamespaceTokenDevelopmentInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameNamespaceTokenDevelopmentInput || (CreateGameNamespaceTokenDevelopmentInput = {}));
export var CreateGameNamespaceTokenDevelopmentOutput;
(function (CreateGameNamespaceTokenDevelopmentOutput) {
    CreateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.token && { token: SENSITIVE_STRING
    }))); };
})(CreateGameNamespaceTokenDevelopmentOutput || (CreateGameNamespaceTokenDevelopmentOutput = {}));
export var CreateGameNamespaceTokenPublicInput;
(function (CreateGameNamespaceTokenPublicInput) {
    CreateGameNamespaceTokenPublicInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameNamespaceTokenPublicInput || (CreateGameNamespaceTokenPublicInput = {}));
export var CreateGameNamespaceTokenPublicOutput;
(function (CreateGameNamespaceTokenPublicOutput) {
    CreateGameNamespaceTokenPublicOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.token && { token: SENSITIVE_STRING
    }))); };
})(CreateGameNamespaceTokenPublicOutput || (CreateGameNamespaceTokenPublicOutput = {}));
export var GetGameNamespaceByIdInput;
(function (GetGameNamespaceByIdInput) {
    GetGameNamespaceByIdInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameNamespaceByIdInput || (GetGameNamespaceByIdInput = {}));
export var CdnAuthType;
(function (CdnAuthType) {
    CdnAuthType["BASIC"] = "basic";
    CdnAuthType["NONE"] = "none";
})(CdnAuthType || (CdnAuthType = {}));
export var CdnNamespaceAuthUser;
(function (CdnNamespaceAuthUser) {
    CdnNamespaceAuthUser.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CdnNamespaceAuthUser || (CdnNamespaceAuthUser = {}));
export var CdnNamespaceDomainVerificationMethodHttp;
(function (CdnNamespaceDomainVerificationMethodHttp) {
    CdnNamespaceDomainVerificationMethodHttp.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CdnNamespaceDomainVerificationMethodHttp || (CdnNamespaceDomainVerificationMethodHttp = {}));
export var CdnNamespaceDomainVerificationMethodInvalid;
(function (CdnNamespaceDomainVerificationMethodInvalid) {
    CdnNamespaceDomainVerificationMethodInvalid.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CdnNamespaceDomainVerificationMethodInvalid || (CdnNamespaceDomainVerificationMethodInvalid = {}));
export var CdnNamespaceDomainVerificationMethod;
(function (CdnNamespaceDomainVerificationMethod) {
    CdnNamespaceDomainVerificationMethod.visit = function (value, visitor) {
        if (value.invalid !== undefined)
            return visitor.invalid(value.invalid);
        if (value.http !== undefined)
            return visitor.http(value.http);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    CdnNamespaceDomainVerificationMethod.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.invalid !== undefined)
            return { invalid: CdnNamespaceDomainVerificationMethodInvalid.filterSensitiveLog(obj.invalid)
            };
        if (obj.http !== undefined)
            return { http: CdnNamespaceDomainVerificationMethodHttp.filterSensitiveLog(obj.http)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(CdnNamespaceDomainVerificationMethod || (CdnNamespaceDomainVerificationMethod = {}));
export var CdnNamespaceDomainVerificationStatus;
(function (CdnNamespaceDomainVerificationStatus) {
    CdnNamespaceDomainVerificationStatus["ACTIVE"] = "active";
    CdnNamespaceDomainVerificationStatus["FAILED"] = "failed";
    CdnNamespaceDomainVerificationStatus["PENDING"] = "pending";
})(CdnNamespaceDomainVerificationStatus || (CdnNamespaceDomainVerificationStatus = {}));
export var CdnNamespaceDomain;
(function (CdnNamespaceDomain) {
    CdnNamespaceDomain.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.verificationMethod && { verificationMethod: CdnNamespaceDomainVerificationMethod.filterSensitiveLog(obj.verificationMethod)
    }))); };
})(CdnNamespaceDomain || (CdnNamespaceDomain = {}));
export var CdnNamespaceConfig;
(function (CdnNamespaceConfig) {
    CdnNamespaceConfig.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.domains && { domains: obj.domains.map(function (item) {
            return CdnNamespaceDomain.filterSensitiveLog(item);
        })
    }))); };
})(CdnNamespaceConfig || (CdnNamespaceConfig = {}));
export var IdentityNamespaceConfig;
(function (IdentityNamespaceConfig) {
    IdentityNamespaceConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityNamespaceConfig || (IdentityNamespaceConfig = {}));
export var KvNamespaceConfig;
(function (KvNamespaceConfig) {
    KvNamespaceConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KvNamespaceConfig || (KvNamespaceConfig = {}));
export var MatchmakerNamespaceConfig;
(function (MatchmakerNamespaceConfig) {
    MatchmakerNamespaceConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MatchmakerNamespaceConfig || (MatchmakerNamespaceConfig = {}));
export var CloudNamespaceConfig;
(function (CloudNamespaceConfig) {
    CloudNamespaceConfig.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.cdn && { cdn: CdnNamespaceConfig.filterSensitiveLog(obj.cdn)
    }))); };
})(CloudNamespaceConfig || (CloudNamespaceConfig = {}));
export var NamespaceFull;
(function (NamespaceFull) {
    NamespaceFull.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.config && { config: CloudNamespaceConfig.filterSensitiveLog(obj.config)
    }))); };
})(NamespaceFull || (NamespaceFull = {}));
export var GetGameNamespaceByIdOutput;
(function (GetGameNamespaceByIdOutput) {
    GetGameNamespaceByIdOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.namespace && { namespace: NamespaceFull.filterSensitiveLog(obj.namespace)
    }))); };
})(GetGameNamespaceByIdOutput || (GetGameNamespaceByIdOutput = {}));
export var RemoveNamespaceCdnAuthUserInput;
(function (RemoveNamespaceCdnAuthUserInput) {
    RemoveNamespaceCdnAuthUserInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveNamespaceCdnAuthUserInput || (RemoveNamespaceCdnAuthUserInput = {}));
export var RemoveNamespaceCdnAuthUserOutput;
(function (RemoveNamespaceCdnAuthUserOutput) {
    RemoveNamespaceCdnAuthUserOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveNamespaceCdnAuthUserOutput || (RemoveNamespaceCdnAuthUserOutput = {}));
export var RemoveNamespaceDomainInput;
(function (RemoveNamespaceDomainInput) {
    RemoveNamespaceDomainInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveNamespaceDomainInput || (RemoveNamespaceDomainInput = {}));
export var RemoveNamespaceDomainOutput;
(function (RemoveNamespaceDomainOutput) {
    RemoveNamespaceDomainOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RemoveNamespaceDomainOutput || (RemoveNamespaceDomainOutput = {}));
export var SetNamespaceCdnAuthTypeInput;
(function (SetNamespaceCdnAuthTypeInput) {
    SetNamespaceCdnAuthTypeInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetNamespaceCdnAuthTypeInput || (SetNamespaceCdnAuthTypeInput = {}));
export var SetNamespaceCdnAuthTypeOutput;
(function (SetNamespaceCdnAuthTypeOutput) {
    SetNamespaceCdnAuthTypeOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SetNamespaceCdnAuthTypeOutput || (SetNamespaceCdnAuthTypeOutput = {}));
export var ToggleNamespaceDomainPublicAuthInput;
(function (ToggleNamespaceDomainPublicAuthInput) {
    ToggleNamespaceDomainPublicAuthInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ToggleNamespaceDomainPublicAuthInput || (ToggleNamespaceDomainPublicAuthInput = {}));
export var ToggleNamespaceDomainPublicAuthOutput;
(function (ToggleNamespaceDomainPublicAuthOutput) {
    ToggleNamespaceDomainPublicAuthOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ToggleNamespaceDomainPublicAuthOutput || (ToggleNamespaceDomainPublicAuthOutput = {}));
export var UpdateGameNamespaceMatchmakerConfigInput;
(function (UpdateGameNamespaceMatchmakerConfigInput) {
    UpdateGameNamespaceMatchmakerConfigInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGameNamespaceMatchmakerConfigInput || (UpdateGameNamespaceMatchmakerConfigInput = {}));
export var UpdateGameNamespaceMatchmakerConfigOutput;
(function (UpdateGameNamespaceMatchmakerConfigOutput) {
    UpdateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGameNamespaceMatchmakerConfigOutput || (UpdateGameNamespaceMatchmakerConfigOutput = {}));
export var UpdateGameNamespaceVersionInput;
(function (UpdateGameNamespaceVersionInput) {
    UpdateGameNamespaceVersionInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGameNamespaceVersionInput || (UpdateGameNamespaceVersionInput = {}));
export var UpdateGameNamespaceVersionOutput;
(function (UpdateGameNamespaceVersionOutput) {
    UpdateGameNamespaceVersionOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateGameNamespaceVersionOutput || (UpdateGameNamespaceVersionOutput = {}));
export var UpdateNamespaceCdnAuthUserInput;
(function (UpdateNamespaceCdnAuthUserInput) {
    UpdateNamespaceCdnAuthUserInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateNamespaceCdnAuthUserInput || (UpdateNamespaceCdnAuthUserInput = {}));
export var UpdateNamespaceCdnAuthUserOutput;
(function (UpdateNamespaceCdnAuthUserOutput) {
    UpdateNamespaceCdnAuthUserOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateNamespaceCdnAuthUserOutput || (UpdateNamespaceCdnAuthUserOutput = {}));
export var ValidateGameNamespaceInput;
(function (ValidateGameNamespaceInput) {
    ValidateGameNamespaceInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameNamespaceInput || (ValidateGameNamespaceInput = {}));
export var ValidateGameNamespaceOutput;
(function (ValidateGameNamespaceOutput) {
    ValidateGameNamespaceOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameNamespaceOutput || (ValidateGameNamespaceOutput = {}));
export var ValidateGameNamespaceMatchmakerConfigInput;
(function (ValidateGameNamespaceMatchmakerConfigInput) {
    ValidateGameNamespaceMatchmakerConfigInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameNamespaceMatchmakerConfigInput || (ValidateGameNamespaceMatchmakerConfigInput = {}));
export var ValidateGameNamespaceMatchmakerConfigOutput;
(function (ValidateGameNamespaceMatchmakerConfigOutput) {
    ValidateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameNamespaceMatchmakerConfigOutput || (ValidateGameNamespaceMatchmakerConfigOutput = {}));
export var ValidateGameNamespaceTokenDevelopmentInput;
(function (ValidateGameNamespaceTokenDevelopmentInput) {
    ValidateGameNamespaceTokenDevelopmentInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameNamespaceTokenDevelopmentInput || (ValidateGameNamespaceTokenDevelopmentInput = {}));
export var ValidateGameNamespaceTokenDevelopmentOutput;
(function (ValidateGameNamespaceTokenDevelopmentOutput) {
    ValidateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameNamespaceTokenDevelopmentOutput || (ValidateGameNamespaceTokenDevelopmentOutput = {}));
export var GetNamespaceAnalyticsMatchmakerLiveInput;
(function (GetNamespaceAnalyticsMatchmakerLiveInput) {
    GetNamespaceAnalyticsMatchmakerLiveInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetNamespaceAnalyticsMatchmakerLiveInput || (GetNamespaceAnalyticsMatchmakerLiveInput = {}));
export var AnalyticsLobbySummary;
(function (AnalyticsLobbySummary) {
    AnalyticsLobbySummary.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AnalyticsLobbySummary || (AnalyticsLobbySummary = {}));
export var GetNamespaceAnalyticsMatchmakerLiveOutput;
(function (GetNamespaceAnalyticsMatchmakerLiveOutput) {
    GetNamespaceAnalyticsMatchmakerLiveOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetNamespaceAnalyticsMatchmakerLiveOutput || (GetNamespaceAnalyticsMatchmakerLiveOutput = {}));
export var GetNamespaceLobbyInput;
(function (GetNamespaceLobbyInput) {
    GetNamespaceLobbyInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetNamespaceLobbyInput || (GetNamespaceLobbyInput = {}));
export var Unit;
(function (Unit) {
    Unit.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Unit || (Unit = {}));
export var LogsLobbyStatusStopped;
(function (LogsLobbyStatusStopped) {
    LogsLobbyStatusStopped.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LogsLobbyStatusStopped || (LogsLobbyStatusStopped = {}));
export var LogsLobbyStatus;
(function (LogsLobbyStatus) {
    LogsLobbyStatus.visit = function (value, visitor) {
        if (value.running !== undefined)
            return visitor.running(value.running);
        if (value.stopped !== undefined)
            return visitor.stopped(value.stopped);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    LogsLobbyStatus.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.running !== undefined)
            return { running: Unit.filterSensitiveLog(obj.running)
            };
        if (obj.stopped !== undefined)
            return { stopped: LogsLobbyStatusStopped.filterSensitiveLog(obj.stopped)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(LogsLobbyStatus || (LogsLobbyStatus = {}));
export var LogsLobbySummary;
(function (LogsLobbySummary) {
    LogsLobbySummary.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.status && { status: LogsLobbyStatus.filterSensitiveLog(obj.status)
    }))); };
})(LogsLobbySummary || (LogsLobbySummary = {}));
export var SvcMetrics;
(function (SvcMetrics) {
    SvcMetrics.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SvcMetrics || (SvcMetrics = {}));
export var LogsPerfMark;
(function (LogsPerfMark) {
    LogsPerfMark.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LogsPerfMark || (LogsPerfMark = {}));
export var LogsPerfSpan;
(function (LogsPerfSpan) {
    LogsPerfSpan.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LogsPerfSpan || (LogsPerfSpan = {}));
export var SvcPerf;
(function (SvcPerf) {
    SvcPerf.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SvcPerf || (SvcPerf = {}));
export var GetNamespaceLobbyOutput;
(function (GetNamespaceLobbyOutput) {
    GetNamespaceLobbyOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.lobby && { lobby: LogsLobbySummary.filterSensitiveLog(obj.lobby)
    }))); };
})(GetNamespaceLobbyOutput || (GetNamespaceLobbyOutput = {}));
export var ListNamespaceLobbiesInput;
(function (ListNamespaceLobbiesInput) {
    ListNamespaceLobbiesInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListNamespaceLobbiesInput || (ListNamespaceLobbiesInput = {}));
export var ListNamespaceLobbiesOutput;
(function (ListNamespaceLobbiesOutput) {
    ListNamespaceLobbiesOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.lobbies && { lobbies: obj.lobbies.map(function (item) {
            return LogsLobbySummary.filterSensitiveLog(item);
        })
    }))); };
})(ListNamespaceLobbiesOutput || (ListNamespaceLobbiesOutput = {}));
export var CreateCloudTokenInput;
(function (CreateCloudTokenInput) {
    CreateCloudTokenInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateCloudTokenInput || (CreateCloudTokenInput = {}));
export var CreateCloudTokenOutput;
(function (CreateCloudTokenOutput) {
    CreateCloudTokenOutput.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.token && { token: SENSITIVE_STRING
    }))); };
})(CreateCloudTokenOutput || (CreateCloudTokenOutput = {}));
export var CdnVersionHeader;
(function (CdnVersionHeader) {
    CdnVersionHeader.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CdnVersionHeader || (CdnVersionHeader = {}));
export var CdnVersionCustomHeadersMiddleware;
(function (CdnVersionCustomHeadersMiddleware) {
    CdnVersionCustomHeadersMiddleware.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CdnVersionCustomHeadersMiddleware || (CdnVersionCustomHeadersMiddleware = {}));
export var CdnVersionMiddlewareKind;
(function (CdnVersionMiddlewareKind) {
    CdnVersionMiddlewareKind.visit = function (value, visitor) {
        if (value.customHeaders !== undefined)
            return visitor.customHeaders(value.customHeaders);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    CdnVersionMiddlewareKind.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.customHeaders !== undefined)
            return { customHeaders: CdnVersionCustomHeadersMiddleware.filterSensitiveLog(obj.customHeaders)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(CdnVersionMiddlewareKind || (CdnVersionMiddlewareKind = {}));
export var CdnVersionMiddleware;
(function (CdnVersionMiddleware) {
    CdnVersionMiddleware.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.kind && { kind: CdnVersionMiddlewareKind.filterSensitiveLog(obj.kind)
    }))); };
})(CdnVersionMiddleware || (CdnVersionMiddleware = {}));
export var CdnVersionRoute;
(function (CdnVersionRoute) {
    CdnVersionRoute.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.middlewares && { middlewares: obj.middlewares.map(function (item) {
            return CdnVersionMiddleware.filterSensitiveLog(item);
        })
    }))); };
})(CdnVersionRoute || (CdnVersionRoute = {}));
export var CdnVersionConfig;
(function (CdnVersionConfig) {
    CdnVersionConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CdnVersionConfig || (CdnVersionConfig = {}));
export var CustomAvatar;
(function (CustomAvatar) {
    CustomAvatar.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CustomAvatar || (CustomAvatar = {}));
export var CustomDisplayName;
(function (CustomDisplayName) {
    CustomDisplayName.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CustomDisplayName || (CustomDisplayName = {}));
export var IdentityVersionConfig;
(function (IdentityVersionConfig) {
    IdentityVersionConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdentityVersionConfig || (IdentityVersionConfig = {}));
export var KvVersionConfig;
(function (KvVersionConfig) {
    KvVersionConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KvVersionConfig || (KvVersionConfig = {}));
export var CaptchaLevel;
(function (CaptchaLevel) {
    CaptchaLevel["ALWAYS_ON"] = "always_on";
    CaptchaLevel["DIFFICULT"] = "difficult";
    CaptchaLevel["EASY"] = "easy";
    CaptchaLevel["MODERATE"] = "moderate";
})(CaptchaLevel || (CaptchaLevel = {}));
export var MatchmakerCaptchaHcaptcha;
(function (MatchmakerCaptchaHcaptcha) {
    MatchmakerCaptchaHcaptcha.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MatchmakerCaptchaHcaptcha || (MatchmakerCaptchaHcaptcha = {}));
export var MatchmakerCaptcha;
(function (MatchmakerCaptcha) {
    MatchmakerCaptcha.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(MatchmakerCaptcha || (MatchmakerCaptcha = {}));
export var IdleLobbiesConfig;
(function (IdleLobbiesConfig) {
    IdleLobbiesConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdleLobbiesConfig || (IdleLobbiesConfig = {}));
export var LobbyGroupRegion;
(function (LobbyGroupRegion) {
    LobbyGroupRegion.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LobbyGroupRegion || (LobbyGroupRegion = {}));
export var LobbyGroupRuntimeDockerEnvVar;
(function (LobbyGroupRuntimeDockerEnvVar) {
    LobbyGroupRuntimeDockerEnvVar.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LobbyGroupRuntimeDockerEnvVar || (LobbyGroupRuntimeDockerEnvVar = {}));
export var NetworkMode;
(function (NetworkMode) {
    NetworkMode["BRIDGE"] = "bridge";
    NetworkMode["HOST"] = "host";
})(NetworkMode || (NetworkMode = {}));
export var LobbyGroupRuntimeDocker;
(function (LobbyGroupRuntimeDocker) {
    LobbyGroupRuntimeDocker.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LobbyGroupRuntimeDocker || (LobbyGroupRuntimeDocker = {}));
export var LobbyGroupRuntime;
(function (LobbyGroupRuntime) {
    LobbyGroupRuntime.visit = function (value, visitor) {
        if (value.docker !== undefined)
            return visitor.docker(value.docker);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
    LobbyGroupRuntime.filterSensitiveLog = function (obj) {
        var _a;
        if (obj.docker !== undefined)
            return { docker: LobbyGroupRuntimeDocker.filterSensitiveLog(obj.docker)
            };
        if (obj.$unknown !== undefined)
            return _a = {}, _a[obj.$unknown[0]] = 'UNKNOWN', _a;
    };
})(LobbyGroupRuntime || (LobbyGroupRuntime = {}));
export var LobbyGroup;
(function (LobbyGroup) {
    LobbyGroup.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.runtime && { runtime: LobbyGroupRuntime.filterSensitiveLog(obj.runtime)
    }))); };
})(LobbyGroup || (LobbyGroup = {}));
export var MatchmakerVersionConfig;
(function (MatchmakerVersionConfig) {
    MatchmakerVersionConfig.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.lobbyGroups && { lobbyGroups: obj.lobbyGroups.map(function (item) {
            return LobbyGroup.filterSensitiveLog(item);
        })
    }))); };
})(MatchmakerVersionConfig || (MatchmakerVersionConfig = {}));
export var CloudVersionConfig;
(function (CloudVersionConfig) {
    CloudVersionConfig.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.matchmaker && { matchmaker: MatchmakerVersionConfig.filterSensitiveLog(obj.matchmaker)
    }))); };
})(CloudVersionConfig || (CloudVersionConfig = {}));
export var CreateGameVersionInput;
(function (CreateGameVersionInput) {
    CreateGameVersionInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameVersionInput || (CreateGameVersionInput = {}));
export var CreateGameVersionOutput;
(function (CreateGameVersionOutput) {
    CreateGameVersionOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateGameVersionOutput || (CreateGameVersionOutput = {}));
export var GetGameVersionByIdInput;
(function (GetGameVersionByIdInput) {
    GetGameVersionByIdInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameVersionByIdInput || (GetGameVersionByIdInput = {}));
export var VersionFull;
(function (VersionFull) {
    VersionFull.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(VersionFull || (VersionFull = {}));
export var GetGameVersionByIdOutput;
(function (GetGameVersionByIdOutput) {
    GetGameVersionByIdOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGameVersionByIdOutput || (GetGameVersionByIdOutput = {}));
export var ValidateGameVersionInput;
(function (ValidateGameVersionInput) {
    ValidateGameVersionInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameVersionInput || (ValidateGameVersionInput = {}));
export var ValidateGameVersionOutput;
(function (ValidateGameVersionOutput) {
    ValidateGameVersionOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGameVersionOutput || (ValidateGameVersionOutput = {}));
export var ConvertGroupInput;
(function (ConvertGroupInput) {
    ConvertGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConvertGroupInput || (ConvertGroupInput = {}));
export var ConvertGroupOutput;
(function (ConvertGroupOutput) {
    ConvertGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConvertGroupOutput || (ConvertGroupOutput = {}));
export var GetGroupBillingInput;
(function (GetGroupBillingInput) {
    GetGroupBillingInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupBillingInput || (GetGroupBillingInput = {}));
export var GetGroupBillingOutput;
(function (GetGroupBillingOutput) {
    GetGroupBillingOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupBillingOutput || (GetGroupBillingOutput = {}));
export var GetGroupInvoicesListInput;
(function (GetGroupInvoicesListInput) {
    GetGroupInvoicesListInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupInvoicesListInput || (GetGroupInvoicesListInput = {}));
export var GroupBillingInvoice;
(function (GroupBillingInvoice) {
    GroupBillingInvoice.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupBillingInvoice || (GroupBillingInvoice = {}));
export var GetGroupInvoicesListOutput;
(function (GetGroupInvoicesListOutput) {
    GetGroupInvoicesListOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetGroupInvoicesListOutput || (GetGroupInvoicesListOutput = {}));
export var GroupBillingCheckoutInput;
(function (GroupBillingCheckoutInput) {
    GroupBillingCheckoutInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupBillingCheckoutInput || (GroupBillingCheckoutInput = {}));
export var GroupBillingCheckoutOutput;
(function (GroupBillingCheckoutOutput) {
    GroupBillingCheckoutOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GroupBillingCheckoutOutput || (GroupBillingCheckoutOutput = {}));
export var ValidateGroupInput;
(function (ValidateGroupInput) {
    ValidateGroupInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGroupInput || (ValidateGroupInput = {}));
export var ValidateGroupOutput;
(function (ValidateGroupOutput) {
    ValidateGroupOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ValidateGroupOutput || (ValidateGroupOutput = {}));
export var GetRayPerfLogsInput;
(function (GetRayPerfLogsInput) {
    GetRayPerfLogsInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetRayPerfLogsInput || (GetRayPerfLogsInput = {}));
export var GetRayPerfLogsOutput;
(function (GetRayPerfLogsOutput) {
    GetRayPerfLogsOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetRayPerfLogsOutput || (GetRayPerfLogsOutput = {}));
export var GetRegionTiersInput;
(function (GetRegionTiersInput) {
    GetRegionTiersInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetRegionTiersInput || (GetRegionTiersInput = {}));
export var RegionTier;
(function (RegionTier) {
    RegionTier.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RegionTier || (RegionTier = {}));
export var GetRegionTiersOutput;
(function (GetRegionTiersOutput) {
    GetRegionTiersOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetRegionTiersOutput || (GetRegionTiersOutput = {}));
export var CompleteUploadInput;
(function (CompleteUploadInput) {
    CompleteUploadInput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteUploadInput || (CompleteUploadInput = {}));
export var CompleteUploadOutput;
(function (CompleteUploadOutput) {
    CompleteUploadOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CompleteUploadOutput || (CompleteUploadOutput = {}));
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(opts) {
        var _this = _super.call(this, __assign({ name: "BadRequestError", $fault: "client" }, opts)) || this;
        _this.name = "BadRequestError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return BadRequestError;
}(__BaseException));
export { BadRequestError };
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(opts) {
        var _this = _super.call(this, __assign({ name: "ForbiddenError", $fault: "client" }, opts)) || this;
        _this.name = "ForbiddenError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return ForbiddenError;
}(__BaseException));
export { ForbiddenError };
var InternalError = (function (_super) {
    __extends(InternalError, _super);
    function InternalError(opts) {
        var _this = _super.call(this, __assign({ name: "InternalError", $fault: "server" }, opts)) || this;
        _this.name = "InternalError";
        _this.$fault = "server";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, InternalError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return InternalError;
}(__BaseException));
export { InternalError };
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(opts) {
        var _this = _super.call(this, __assign({ name: "NotFoundError", $fault: "client" }, opts)) || this;
        _this.name = "NotFoundError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return NotFoundError;
}(__BaseException));
export { NotFoundError };
var RateLimitError = (function (_super) {
    __extends(RateLimitError, _super);
    function RateLimitError(opts) {
        var _this = _super.call(this, __assign({ name: "RateLimitError", $fault: "client" }, opts)) || this;
        _this.name = "RateLimitError";
        _this.$fault = "client";
        Object.setPrototypeOf(_this, RateLimitError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return RateLimitError;
}(__BaseException));
export { RateLimitError };
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(opts) {
        var _this = _super.call(this, __assign({ name: "UnauthorizedError", $fault: "client" }, opts)) || this;
        _this.name = "UnauthorizedError";
        _this.$fault = "client";
        _this.$retryable = {};
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        _this.code = opts.code;
        _this.documentation = opts.documentation;
        _this.metadata = opts.metadata;
        return _this;
    }
    return UnauthorizedError;
}(__BaseException));
export { UnauthorizedError };
