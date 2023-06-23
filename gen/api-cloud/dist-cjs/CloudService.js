"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudService = void 0;
const CloudServiceClient_1 = require("./CloudServiceClient");
const AddNamespaceDomainCommand_1 = require("./commands/AddNamespaceDomainCommand");
const CompleteCustomAvatarUploadCommand_1 = require("./commands/CompleteCustomAvatarUploadCommand");
const CompleteUploadCommand_1 = require("./commands/CompleteUploadCommand");
const ConvertGroupCommand_1 = require("./commands/ConvertGroupCommand");
const CreateCloudTokenCommand_1 = require("./commands/CreateCloudTokenCommand");
const CreateGameBuildCommand_1 = require("./commands/CreateGameBuildCommand");
const CreateGameCdnSiteCommand_1 = require("./commands/CreateGameCdnSiteCommand");
const CreateGameCommand_1 = require("./commands/CreateGameCommand");
const CreateGameNamespaceCommand_1 = require("./commands/CreateGameNamespaceCommand");
const CreateGameNamespaceTokenDevelopmentCommand_1 = require("./commands/CreateGameNamespaceTokenDevelopmentCommand");
const CreateGameNamespaceTokenPublicCommand_1 = require("./commands/CreateGameNamespaceTokenPublicCommand");
const CreateGameVersionCommand_1 = require("./commands/CreateGameVersionCommand");
const DeleteMatchmakerLobbyCommand_1 = require("./commands/DeleteMatchmakerLobbyCommand");
const ExportLobbyLogsCommand_1 = require("./commands/ExportLobbyLogsCommand");
const ExportMatchmakerLobbyHistoryCommand_1 = require("./commands/ExportMatchmakerLobbyHistoryCommand");
const GameBannerUploadCompleteCommand_1 = require("./commands/GameBannerUploadCompleteCommand");
const GameBannerUploadPrepareCommand_1 = require("./commands/GameBannerUploadPrepareCommand");
const GameLogoUploadCompleteCommand_1 = require("./commands/GameLogoUploadCompleteCommand");
const GameLogoUploadPrepareCommand_1 = require("./commands/GameLogoUploadPrepareCommand");
const GetGameBillingCommand_1 = require("./commands/GetGameBillingCommand");
const GetGameBillingPlansCommand_1 = require("./commands/GetGameBillingPlansCommand");
const GetGameByIdCommand_1 = require("./commands/GetGameByIdCommand");
const GetGameNamespaceByIdCommand_1 = require("./commands/GetGameNamespaceByIdCommand");
const GetGameVersionByIdCommand_1 = require("./commands/GetGameVersionByIdCommand");
const GetGamesCommand_1 = require("./commands/GetGamesCommand");
const GetGroupBillingCommand_1 = require("./commands/GetGroupBillingCommand");
const GetGroupInvoicesListCommand_1 = require("./commands/GetGroupInvoicesListCommand");
const GetLobbyLogsCommand_1 = require("./commands/GetLobbyLogsCommand");
const GetNamespaceAnalyticsMatchmakerLiveCommand_1 = require("./commands/GetNamespaceAnalyticsMatchmakerLiveCommand");
const GetNamespaceLobbyCommand_1 = require("./commands/GetNamespaceLobbyCommand");
const GetRayPerfLogsCommand_1 = require("./commands/GetRayPerfLogsCommand");
const GetRegionTiersCommand_1 = require("./commands/GetRegionTiersCommand");
const GroupBillingCheckoutCommand_1 = require("./commands/GroupBillingCheckoutCommand");
const InspectCommand_1 = require("./commands/InspectCommand");
const ListGameBuildsCommand_1 = require("./commands/ListGameBuildsCommand");
const ListGameCdnSitesCommand_1 = require("./commands/ListGameCdnSitesCommand");
const ListGameCustomAvatarsCommand_1 = require("./commands/ListGameCustomAvatarsCommand");
const ListNamespaceLobbiesCommand_1 = require("./commands/ListNamespaceLobbiesCommand");
const PrepareCustomAvatarUploadCommand_1 = require("./commands/PrepareCustomAvatarUploadCommand");
const RemoveNamespaceCdnAuthUserCommand_1 = require("./commands/RemoveNamespaceCdnAuthUserCommand");
const RemoveNamespaceDomainCommand_1 = require("./commands/RemoveNamespaceDomainCommand");
const SetGameBillingPlanCommand_1 = require("./commands/SetGameBillingPlanCommand");
const SetNamespaceCdnAuthTypeCommand_1 = require("./commands/SetNamespaceCdnAuthTypeCommand");
const ToggleNamespaceDomainPublicAuthCommand_1 = require("./commands/ToggleNamespaceDomainPublicAuthCommand");
const UpdateGameNamespaceMatchmakerConfigCommand_1 = require("./commands/UpdateGameNamespaceMatchmakerConfigCommand");
const UpdateGameNamespaceVersionCommand_1 = require("./commands/UpdateGameNamespaceVersionCommand");
const UpdateNamespaceCdnAuthUserCommand_1 = require("./commands/UpdateNamespaceCdnAuthUserCommand");
const ValidateGameCommand_1 = require("./commands/ValidateGameCommand");
const ValidateGameNamespaceCommand_1 = require("./commands/ValidateGameNamespaceCommand");
const ValidateGameNamespaceMatchmakerConfigCommand_1 = require("./commands/ValidateGameNamespaceMatchmakerConfigCommand");
const ValidateGameNamespaceTokenDevelopmentCommand_1 = require("./commands/ValidateGameNamespaceTokenDevelopmentCommand");
const ValidateGameVersionCommand_1 = require("./commands/ValidateGameVersionCommand");
const ValidateGroupCommand_1 = require("./commands/ValidateGroupCommand");
class CloudService extends CloudServiceClient_1.CloudServiceClient {
    addNamespaceDomain(args, optionsOrCb, cb) {
        const command = new AddNamespaceDomainCommand_1.AddNamespaceDomainCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    completeCustomAvatarUpload(args, optionsOrCb, cb) {
        const command = new CompleteCustomAvatarUploadCommand_1.CompleteCustomAvatarUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    completeUpload(args, optionsOrCb, cb) {
        const command = new CompleteUploadCommand_1.CompleteUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    convertGroup(args, optionsOrCb, cb) {
        const command = new ConvertGroupCommand_1.ConvertGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createCloudToken(args, optionsOrCb, cb) {
        const command = new CreateCloudTokenCommand_1.CreateCloudTokenCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGame(args, optionsOrCb, cb) {
        const command = new CreateGameCommand_1.CreateGameCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGameBuild(args, optionsOrCb, cb) {
        const command = new CreateGameBuildCommand_1.CreateGameBuildCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGameCdnSite(args, optionsOrCb, cb) {
        const command = new CreateGameCdnSiteCommand_1.CreateGameCdnSiteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGameNamespace(args, optionsOrCb, cb) {
        const command = new CreateGameNamespaceCommand_1.CreateGameNamespaceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGameNamespaceTokenDevelopment(args, optionsOrCb, cb) {
        const command = new CreateGameNamespaceTokenDevelopmentCommand_1.CreateGameNamespaceTokenDevelopmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGameNamespaceTokenPublic(args, optionsOrCb, cb) {
        const command = new CreateGameNamespaceTokenPublicCommand_1.CreateGameNamespaceTokenPublicCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createGameVersion(args, optionsOrCb, cb) {
        const command = new CreateGameVersionCommand_1.CreateGameVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteMatchmakerLobby(args, optionsOrCb, cb) {
        const command = new DeleteMatchmakerLobbyCommand_1.DeleteMatchmakerLobbyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    exportLobbyLogs(args, optionsOrCb, cb) {
        const command = new ExportLobbyLogsCommand_1.ExportLobbyLogsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    exportMatchmakerLobbyHistory(args, optionsOrCb, cb) {
        const command = new ExportMatchmakerLobbyHistoryCommand_1.ExportMatchmakerLobbyHistoryCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    gameBannerUploadComplete(args, optionsOrCb, cb) {
        const command = new GameBannerUploadCompleteCommand_1.GameBannerUploadCompleteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    gameBannerUploadPrepare(args, optionsOrCb, cb) {
        const command = new GameBannerUploadPrepareCommand_1.GameBannerUploadPrepareCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    gameLogoUploadComplete(args, optionsOrCb, cb) {
        const command = new GameLogoUploadCompleteCommand_1.GameLogoUploadCompleteCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    gameLogoUploadPrepare(args, optionsOrCb, cb) {
        const command = new GameLogoUploadPrepareCommand_1.GameLogoUploadPrepareCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGameBilling(args, optionsOrCb, cb) {
        const command = new GetGameBillingCommand_1.GetGameBillingCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGameBillingPlans(args, optionsOrCb, cb) {
        const command = new GetGameBillingPlansCommand_1.GetGameBillingPlansCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGameById(args, optionsOrCb, cb) {
        const command = new GetGameByIdCommand_1.GetGameByIdCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGameNamespaceById(args, optionsOrCb, cb) {
        const command = new GetGameNamespaceByIdCommand_1.GetGameNamespaceByIdCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGames(args, optionsOrCb, cb) {
        const command = new GetGamesCommand_1.GetGamesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGameVersionById(args, optionsOrCb, cb) {
        const command = new GetGameVersionByIdCommand_1.GetGameVersionByIdCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupBilling(args, optionsOrCb, cb) {
        const command = new GetGroupBillingCommand_1.GetGroupBillingCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getGroupInvoicesList(args, optionsOrCb, cb) {
        const command = new GetGroupInvoicesListCommand_1.GetGroupInvoicesListCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getLobbyLogs(args, optionsOrCb, cb) {
        const command = new GetLobbyLogsCommand_1.GetLobbyLogsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getNamespaceAnalyticsMatchmakerLive(args, optionsOrCb, cb) {
        const command = new GetNamespaceAnalyticsMatchmakerLiveCommand_1.GetNamespaceAnalyticsMatchmakerLiveCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getNamespaceLobby(args, optionsOrCb, cb) {
        const command = new GetNamespaceLobbyCommand_1.GetNamespaceLobbyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getRayPerfLogs(args, optionsOrCb, cb) {
        const command = new GetRayPerfLogsCommand_1.GetRayPerfLogsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getRegionTiers(args, optionsOrCb, cb) {
        const command = new GetRegionTiersCommand_1.GetRegionTiersCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    groupBillingCheckout(args, optionsOrCb, cb) {
        const command = new GroupBillingCheckoutCommand_1.GroupBillingCheckoutCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    inspect(args, optionsOrCb, cb) {
        const command = new InspectCommand_1.InspectCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listGameBuilds(args, optionsOrCb, cb) {
        const command = new ListGameBuildsCommand_1.ListGameBuildsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listGameCdnSites(args, optionsOrCb, cb) {
        const command = new ListGameCdnSitesCommand_1.ListGameCdnSitesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listGameCustomAvatars(args, optionsOrCb, cb) {
        const command = new ListGameCustomAvatarsCommand_1.ListGameCustomAvatarsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listNamespaceLobbies(args, optionsOrCb, cb) {
        const command = new ListNamespaceLobbiesCommand_1.ListNamespaceLobbiesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    prepareCustomAvatarUpload(args, optionsOrCb, cb) {
        const command = new PrepareCustomAvatarUploadCommand_1.PrepareCustomAvatarUploadCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    removeNamespaceCdnAuthUser(args, optionsOrCb, cb) {
        const command = new RemoveNamespaceCdnAuthUserCommand_1.RemoveNamespaceCdnAuthUserCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    removeNamespaceDomain(args, optionsOrCb, cb) {
        const command = new RemoveNamespaceDomainCommand_1.RemoveNamespaceDomainCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    setGameBillingPlan(args, optionsOrCb, cb) {
        const command = new SetGameBillingPlanCommand_1.SetGameBillingPlanCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    setNamespaceCdnAuthType(args, optionsOrCb, cb) {
        const command = new SetNamespaceCdnAuthTypeCommand_1.SetNamespaceCdnAuthTypeCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    toggleNamespaceDomainPublicAuth(args, optionsOrCb, cb) {
        const command = new ToggleNamespaceDomainPublicAuthCommand_1.ToggleNamespaceDomainPublicAuthCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateGameNamespaceMatchmakerConfig(args, optionsOrCb, cb) {
        const command = new UpdateGameNamespaceMatchmakerConfigCommand_1.UpdateGameNamespaceMatchmakerConfigCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateGameNamespaceVersion(args, optionsOrCb, cb) {
        const command = new UpdateGameNamespaceVersionCommand_1.UpdateGameNamespaceVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateNamespaceCdnAuthUser(args, optionsOrCb, cb) {
        const command = new UpdateNamespaceCdnAuthUserCommand_1.UpdateNamespaceCdnAuthUserCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    validateGame(args, optionsOrCb, cb) {
        const command = new ValidateGameCommand_1.ValidateGameCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    validateGameNamespace(args, optionsOrCb, cb) {
        const command = new ValidateGameNamespaceCommand_1.ValidateGameNamespaceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    validateGameNamespaceMatchmakerConfig(args, optionsOrCb, cb) {
        const command = new ValidateGameNamespaceMatchmakerConfigCommand_1.ValidateGameNamespaceMatchmakerConfigCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    validateGameNamespaceTokenDevelopment(args, optionsOrCb, cb) {
        const command = new ValidateGameNamespaceTokenDevelopmentCommand_1.ValidateGameNamespaceTokenDevelopmentCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    validateGameVersion(args, optionsOrCb, cb) {
        const command = new ValidateGameVersionCommand_1.ValidateGameVersionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    validateGroup(args, optionsOrCb, cb) {
        const command = new ValidateGroupCommand_1.ValidateGroupCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.CloudService = CloudService;
