import { CloudServiceClient } from "./CloudServiceClient";
import { AddNamespaceDomainCommandInput, AddNamespaceDomainCommandOutput } from "./commands/AddNamespaceDomainCommand";
import { CompleteCustomAvatarUploadCommandInput, CompleteCustomAvatarUploadCommandOutput } from "./commands/CompleteCustomAvatarUploadCommand";
import { CompleteUploadCommandInput, CompleteUploadCommandOutput } from "./commands/CompleteUploadCommand";
import { ConvertGroupCommandInput, ConvertGroupCommandOutput } from "./commands/ConvertGroupCommand";
import { CreateCloudTokenCommandInput, CreateCloudTokenCommandOutput } from "./commands/CreateCloudTokenCommand";
import { CreateGameBuildCommandInput, CreateGameBuildCommandOutput } from "./commands/CreateGameBuildCommand";
import { CreateGameCdnSiteCommandInput, CreateGameCdnSiteCommandOutput } from "./commands/CreateGameCdnSiteCommand";
import { CreateGameCommandInput, CreateGameCommandOutput } from "./commands/CreateGameCommand";
import { CreateGameNamespaceCommandInput, CreateGameNamespaceCommandOutput } from "./commands/CreateGameNamespaceCommand";
import { CreateGameNamespaceTokenDevelopmentCommandInput, CreateGameNamespaceTokenDevelopmentCommandOutput } from "./commands/CreateGameNamespaceTokenDevelopmentCommand";
import { CreateGameNamespaceTokenPublicCommandInput, CreateGameNamespaceTokenPublicCommandOutput } from "./commands/CreateGameNamespaceTokenPublicCommand";
import { CreateGameVersionCommandInput, CreateGameVersionCommandOutput } from "./commands/CreateGameVersionCommand";
import { DeleteMatchmakerLobbyCommandInput, DeleteMatchmakerLobbyCommandOutput } from "./commands/DeleteMatchmakerLobbyCommand";
import { ExportLobbyLogsCommandInput, ExportLobbyLogsCommandOutput } from "./commands/ExportLobbyLogsCommand";
import { ExportMatchmakerLobbyHistoryCommandInput, ExportMatchmakerLobbyHistoryCommandOutput } from "./commands/ExportMatchmakerLobbyHistoryCommand";
import { GameBannerUploadCompleteCommandInput, GameBannerUploadCompleteCommandOutput } from "./commands/GameBannerUploadCompleteCommand";
import { GameBannerUploadPrepareCommandInput, GameBannerUploadPrepareCommandOutput } from "./commands/GameBannerUploadPrepareCommand";
import { GameLogoUploadCompleteCommandInput, GameLogoUploadCompleteCommandOutput } from "./commands/GameLogoUploadCompleteCommand";
import { GameLogoUploadPrepareCommandInput, GameLogoUploadPrepareCommandOutput } from "./commands/GameLogoUploadPrepareCommand";
import { GetGameBillingCommandInput, GetGameBillingCommandOutput } from "./commands/GetGameBillingCommand";
import { GetGameBillingPlansCommandInput, GetGameBillingPlansCommandOutput } from "./commands/GetGameBillingPlansCommand";
import { GetGameByIdCommandInput, GetGameByIdCommandOutput } from "./commands/GetGameByIdCommand";
import { GetGameNamespaceByIdCommandInput, GetGameNamespaceByIdCommandOutput } from "./commands/GetGameNamespaceByIdCommand";
import { GetGameVersionByIdCommandInput, GetGameVersionByIdCommandOutput } from "./commands/GetGameVersionByIdCommand";
import { GetGamesCommandInput, GetGamesCommandOutput } from "./commands/GetGamesCommand";
import { GetGroupBillingCommandInput, GetGroupBillingCommandOutput } from "./commands/GetGroupBillingCommand";
import { GetGroupInvoicesListCommandInput, GetGroupInvoicesListCommandOutput } from "./commands/GetGroupInvoicesListCommand";
import { GetLobbyLogsCommandInput, GetLobbyLogsCommandOutput } from "./commands/GetLobbyLogsCommand";
import { GetNamespaceAnalyticsMatchmakerLiveCommandInput, GetNamespaceAnalyticsMatchmakerLiveCommandOutput } from "./commands/GetNamespaceAnalyticsMatchmakerLiveCommand";
import { GetNamespaceLobbyCommandInput, GetNamespaceLobbyCommandOutput } from "./commands/GetNamespaceLobbyCommand";
import { GetRayPerfLogsCommandInput, GetRayPerfLogsCommandOutput } from "./commands/GetRayPerfLogsCommand";
import { GetRegionTiersCommandInput, GetRegionTiersCommandOutput } from "./commands/GetRegionTiersCommand";
import { GroupBillingCheckoutCommandInput, GroupBillingCheckoutCommandOutput } from "./commands/GroupBillingCheckoutCommand";
import { InspectCommandInput, InspectCommandOutput } from "./commands/InspectCommand";
import { ListGameBuildsCommandInput, ListGameBuildsCommandOutput } from "./commands/ListGameBuildsCommand";
import { ListGameCdnSitesCommandInput, ListGameCdnSitesCommandOutput } from "./commands/ListGameCdnSitesCommand";
import { ListGameCustomAvatarsCommandInput, ListGameCustomAvatarsCommandOutput } from "./commands/ListGameCustomAvatarsCommand";
import { ListNamespaceLobbiesCommandInput, ListNamespaceLobbiesCommandOutput } from "./commands/ListNamespaceLobbiesCommand";
import { PrepareCustomAvatarUploadCommandInput, PrepareCustomAvatarUploadCommandOutput } from "./commands/PrepareCustomAvatarUploadCommand";
import { RemoveNamespaceCdnAuthUserCommandInput, RemoveNamespaceCdnAuthUserCommandOutput } from "./commands/RemoveNamespaceCdnAuthUserCommand";
import { RemoveNamespaceDomainCommandInput, RemoveNamespaceDomainCommandOutput } from "./commands/RemoveNamespaceDomainCommand";
import { SetGameBillingPlanCommandInput, SetGameBillingPlanCommandOutput } from "./commands/SetGameBillingPlanCommand";
import { SetNamespaceCdnAuthTypeCommandInput, SetNamespaceCdnAuthTypeCommandOutput } from "./commands/SetNamespaceCdnAuthTypeCommand";
import { ToggleNamespaceDomainPublicAuthCommandInput, ToggleNamespaceDomainPublicAuthCommandOutput } from "./commands/ToggleNamespaceDomainPublicAuthCommand";
import { UpdateGameNamespaceMatchmakerConfigCommandInput, UpdateGameNamespaceMatchmakerConfigCommandOutput } from "./commands/UpdateGameNamespaceMatchmakerConfigCommand";
import { UpdateGameNamespaceVersionCommandInput, UpdateGameNamespaceVersionCommandOutput } from "./commands/UpdateGameNamespaceVersionCommand";
import { UpdateNamespaceCdnAuthUserCommandInput, UpdateNamespaceCdnAuthUserCommandOutput } from "./commands/UpdateNamespaceCdnAuthUserCommand";
import { ValidateGameCommandInput, ValidateGameCommandOutput } from "./commands/ValidateGameCommand";
import { ValidateGameNamespaceCommandInput, ValidateGameNamespaceCommandOutput } from "./commands/ValidateGameNamespaceCommand";
import { ValidateGameNamespaceMatchmakerConfigCommandInput, ValidateGameNamespaceMatchmakerConfigCommandOutput } from "./commands/ValidateGameNamespaceMatchmakerConfigCommand";
import { ValidateGameNamespaceTokenDevelopmentCommandInput, ValidateGameNamespaceTokenDevelopmentCommandOutput } from "./commands/ValidateGameNamespaceTokenDevelopmentCommand";
import { ValidateGameVersionCommandInput, ValidateGameVersionCommandOutput } from "./commands/ValidateGameVersionCommand";
import { ValidateGroupCommandInput, ValidateGroupCommandOutput } from "./commands/ValidateGroupCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
export declare class CloudService extends CloudServiceClient {
    /**
     * Adds a domain to the given game namespace.
     */
    addNamespaceDomain(args: AddNamespaceDomainCommandInput, options?: __HttpHandlerOptions): Promise<AddNamespaceDomainCommandOutput>;
    addNamespaceDomain(args: AddNamespaceDomainCommandInput, cb: (err: any, data?: AddNamespaceDomainCommandOutput) => void): void;
    addNamespaceDomain(args: AddNamespaceDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: AddNamespaceDomainCommandOutput) => void): void;
    /**
     * Completes a custom avatar image upload. Must be called after the file upload process completes.
     */
    completeCustomAvatarUpload(args: CompleteCustomAvatarUploadCommandInput, options?: __HttpHandlerOptions): Promise<CompleteCustomAvatarUploadCommandOutput>;
    completeCustomAvatarUpload(args: CompleteCustomAvatarUploadCommandInput, cb: (err: any, data?: CompleteCustomAvatarUploadCommandOutput) => void): void;
    completeCustomAvatarUpload(args: CompleteCustomAvatarUploadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CompleteCustomAvatarUploadCommandOutput) => void): void;
    /**
     * Marks an upload as complete.
     */
    completeUpload(args: CompleteUploadCommandInput, options?: __HttpHandlerOptions): Promise<CompleteUploadCommandOutput>;
    completeUpload(args: CompleteUploadCommandInput, cb: (err: any, data?: CompleteUploadCommandOutput) => void): void;
    completeUpload(args: CompleteUploadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CompleteUploadCommandOutput) => void): void;
    /**
     * Converts the given group into a developer group.
     */
    convertGroup(args: ConvertGroupCommandInput, options?: __HttpHandlerOptions): Promise<ConvertGroupCommandOutput>;
    convertGroup(args: ConvertGroupCommandInput, cb: (err: any, data?: ConvertGroupCommandOutput) => void): void;
    convertGroup(args: ConvertGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ConvertGroupCommandOutput) => void): void;
    /**
     * Creates a new game cloud token.
     */
    createCloudToken(args: CreateCloudTokenCommandInput, options?: __HttpHandlerOptions): Promise<CreateCloudTokenCommandOutput>;
    createCloudToken(args: CreateCloudTokenCommandInput, cb: (err: any, data?: CreateCloudTokenCommandOutput) => void): void;
    createCloudToken(args: CreateCloudTokenCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateCloudTokenCommandOutput) => void): void;
    /**
     * Creates a new game.
     */
    createGame(args: CreateGameCommandInput, options?: __HttpHandlerOptions): Promise<CreateGameCommandOutput>;
    createGame(args: CreateGameCommandInput, cb: (err: any, data?: CreateGameCommandOutput) => void): void;
    createGame(args: CreateGameCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGameCommandOutput) => void): void;
    /**
     * Creates a new game build for the given game.
     */
    createGameBuild(args: CreateGameBuildCommandInput, options?: __HttpHandlerOptions): Promise<CreateGameBuildCommandOutput>;
    createGameBuild(args: CreateGameBuildCommandInput, cb: (err: any, data?: CreateGameBuildCommandOutput) => void): void;
    createGameBuild(args: CreateGameBuildCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGameBuildCommandOutput) => void): void;
    /**
     * Creates a new CDN site for the given game.
     */
    createGameCdnSite(args: CreateGameCdnSiteCommandInput, options?: __HttpHandlerOptions): Promise<CreateGameCdnSiteCommandOutput>;
    createGameCdnSite(args: CreateGameCdnSiteCommandInput, cb: (err: any, data?: CreateGameCdnSiteCommandOutput) => void): void;
    createGameCdnSite(args: CreateGameCdnSiteCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGameCdnSiteCommandOutput) => void): void;
    /**
     * Creates a new namespace for the given game.
     */
    createGameNamespace(args: CreateGameNamespaceCommandInput, options?: __HttpHandlerOptions): Promise<CreateGameNamespaceCommandOutput>;
    createGameNamespace(args: CreateGameNamespaceCommandInput, cb: (err: any, data?: CreateGameNamespaceCommandOutput) => void): void;
    createGameNamespace(args: CreateGameNamespaceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGameNamespaceCommandOutput) => void): void;
    /**
     * Creates a development token for the given namespace.
     */
    createGameNamespaceTokenDevelopment(args: CreateGameNamespaceTokenDevelopmentCommandInput, options?: __HttpHandlerOptions): Promise<CreateGameNamespaceTokenDevelopmentCommandOutput>;
    createGameNamespaceTokenDevelopment(args: CreateGameNamespaceTokenDevelopmentCommandInput, cb: (err: any, data?: CreateGameNamespaceTokenDevelopmentCommandOutput) => void): void;
    createGameNamespaceTokenDevelopment(args: CreateGameNamespaceTokenDevelopmentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGameNamespaceTokenDevelopmentCommandOutput) => void): void;
    /**
     * Creates a public token for the given namespace.
     */
    createGameNamespaceTokenPublic(args: CreateGameNamespaceTokenPublicCommandInput, options?: __HttpHandlerOptions): Promise<CreateGameNamespaceTokenPublicCommandOutput>;
    createGameNamespaceTokenPublic(args: CreateGameNamespaceTokenPublicCommandInput, cb: (err: any, data?: CreateGameNamespaceTokenPublicCommandOutput) => void): void;
    createGameNamespaceTokenPublic(args: CreateGameNamespaceTokenPublicCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGameNamespaceTokenPublicCommandOutput) => void): void;
    /**
     * Creates a new game version.
     */
    createGameVersion(args: CreateGameVersionCommandInput, options?: __HttpHandlerOptions): Promise<CreateGameVersionCommandOutput>;
    createGameVersion(args: CreateGameVersionCommandInput, cb: (err: any, data?: CreateGameVersionCommandOutput) => void): void;
    createGameVersion(args: CreateGameVersionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CreateGameVersionCommandOutput) => void): void;
    /**
     * Deletes a matchmaker lobby, stopping it immediately.
     */
    deleteMatchmakerLobby(args: DeleteMatchmakerLobbyCommandInput, options?: __HttpHandlerOptions): Promise<DeleteMatchmakerLobbyCommandOutput>;
    deleteMatchmakerLobby(args: DeleteMatchmakerLobbyCommandInput, cb: (err: any, data?: DeleteMatchmakerLobbyCommandOutput) => void): void;
    deleteMatchmakerLobby(args: DeleteMatchmakerLobbyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: DeleteMatchmakerLobbyCommandOutput) => void): void;
    /**
     * Generates a download URL for logs.
     */
    exportLobbyLogs(args: ExportLobbyLogsCommandInput, options?: __HttpHandlerOptions): Promise<ExportLobbyLogsCommandOutput>;
    exportLobbyLogs(args: ExportLobbyLogsCommandInput, cb: (err: any, data?: ExportLobbyLogsCommandOutput) => void): void;
    exportLobbyLogs(args: ExportLobbyLogsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ExportLobbyLogsCommandOutput) => void): void;
    /**
     * Exports lobby history over a given query time span.
     */
    exportMatchmakerLobbyHistory(args: ExportMatchmakerLobbyHistoryCommandInput, options?: __HttpHandlerOptions): Promise<ExportMatchmakerLobbyHistoryCommandOutput>;
    exportMatchmakerLobbyHistory(args: ExportMatchmakerLobbyHistoryCommandInput, cb: (err: any, data?: ExportMatchmakerLobbyHistoryCommandOutput) => void): void;
    exportMatchmakerLobbyHistory(args: ExportMatchmakerLobbyHistoryCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ExportMatchmakerLobbyHistoryCommandOutput) => void): void;
    /**
     * Completes an game banner image upload. Must be called after the file upload process completes.
     */
    gameBannerUploadComplete(args: GameBannerUploadCompleteCommandInput, options?: __HttpHandlerOptions): Promise<GameBannerUploadCompleteCommandOutput>;
    gameBannerUploadComplete(args: GameBannerUploadCompleteCommandInput, cb: (err: any, data?: GameBannerUploadCompleteCommandOutput) => void): void;
    gameBannerUploadComplete(args: GameBannerUploadCompleteCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GameBannerUploadCompleteCommandOutput) => void): void;
    /**
     * Prepares a game banner image upload.
     */
    gameBannerUploadPrepare(args: GameBannerUploadPrepareCommandInput, options?: __HttpHandlerOptions): Promise<GameBannerUploadPrepareCommandOutput>;
    gameBannerUploadPrepare(args: GameBannerUploadPrepareCommandInput, cb: (err: any, data?: GameBannerUploadPrepareCommandOutput) => void): void;
    gameBannerUploadPrepare(args: GameBannerUploadPrepareCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GameBannerUploadPrepareCommandOutput) => void): void;
    /**
     * Completes a game logo image upload. Must be called after the file upload process completes.
     */
    gameLogoUploadComplete(args: GameLogoUploadCompleteCommandInput, options?: __HttpHandlerOptions): Promise<GameLogoUploadCompleteCommandOutput>;
    gameLogoUploadComplete(args: GameLogoUploadCompleteCommandInput, cb: (err: any, data?: GameLogoUploadCompleteCommandOutput) => void): void;
    gameLogoUploadComplete(args: GameLogoUploadCompleteCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GameLogoUploadCompleteCommandOutput) => void): void;
    /**
     * Prepares a game logo image upload.
     */
    gameLogoUploadPrepare(args: GameLogoUploadPrepareCommandInput, options?: __HttpHandlerOptions): Promise<GameLogoUploadPrepareCommandOutput>;
    gameLogoUploadPrepare(args: GameLogoUploadPrepareCommandInput, cb: (err: any, data?: GameLogoUploadPrepareCommandOutput) => void): void;
    gameLogoUploadPrepare(args: GameLogoUploadPrepareCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GameLogoUploadPrepareCommandOutput) => void): void;
    /**
     * Returns billing information for the given game over the given query time span.
     */
    getGameBilling(args: GetGameBillingCommandInput, options?: __HttpHandlerOptions): Promise<GetGameBillingCommandOutput>;
    getGameBilling(args: GetGameBillingCommandInput, cb: (err: any, data?: GetGameBillingCommandOutput) => void): void;
    getGameBilling(args: GetGameBillingCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGameBillingCommandOutput) => void): void;
    /**
     * Returns all available billing plans for the given game.
     */
    getGameBillingPlans(args: GetGameBillingPlansCommandInput, options?: __HttpHandlerOptions): Promise<GetGameBillingPlansCommandOutput>;
    getGameBillingPlans(args: GetGameBillingPlansCommandInput, cb: (err: any, data?: GetGameBillingPlansCommandOutput) => void): void;
    getGameBillingPlans(args: GetGameBillingPlansCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGameBillingPlansCommandOutput) => void): void;
    /**
     * Returns a game by its game id.
     */
    getGameById(args: GetGameByIdCommandInput, options?: __HttpHandlerOptions): Promise<GetGameByIdCommandOutput>;
    getGameById(args: GetGameByIdCommandInput, cb: (err: any, data?: GetGameByIdCommandOutput) => void): void;
    getGameById(args: GetGameByIdCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGameByIdCommandOutput) => void): void;
    /**
     * Gets a game namespace by namespace ID.
     */
    getGameNamespaceById(args: GetGameNamespaceByIdCommandInput, options?: __HttpHandlerOptions): Promise<GetGameNamespaceByIdCommandOutput>;
    getGameNamespaceById(args: GetGameNamespaceByIdCommandInput, cb: (err: any, data?: GetGameNamespaceByIdCommandOutput) => void): void;
    getGameNamespaceById(args: GetGameNamespaceByIdCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGameNamespaceByIdCommandOutput) => void): void;
    /**
     * Returns a list of games in which the current identity is a group member of its development team.
     */
    getGames(args: GetGamesCommandInput, options?: __HttpHandlerOptions): Promise<GetGamesCommandOutput>;
    getGames(args: GetGamesCommandInput, cb: (err: any, data?: GetGamesCommandOutput) => void): void;
    getGames(args: GetGamesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGamesCommandOutput) => void): void;
    /**
     * Returns a game version by its version ID.
     */
    getGameVersionById(args: GetGameVersionByIdCommandInput, options?: __HttpHandlerOptions): Promise<GetGameVersionByIdCommandOutput>;
    getGameVersionById(args: GetGameVersionByIdCommandInput, cb: (err: any, data?: GetGameVersionByIdCommandOutput) => void): void;
    getGameVersionById(args: GetGameVersionByIdCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGameVersionByIdCommandOutput) => void): void;
    /**
     * Returns billing information for the given group over the given query time span.
     */
    getGroupBilling(args: GetGroupBillingCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupBillingCommandOutput>;
    getGroupBilling(args: GetGroupBillingCommandInput, cb: (err: any, data?: GetGroupBillingCommandOutput) => void): void;
    getGroupBilling(args: GetGroupBillingCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupBillingCommandOutput) => void): void;
    /**
     * Returns a list of invoices for the given group.
     */
    getGroupInvoicesList(args: GetGroupInvoicesListCommandInput, options?: __HttpHandlerOptions): Promise<GetGroupInvoicesListCommandOutput>;
    getGroupInvoicesList(args: GetGroupInvoicesListCommandInput, cb: (err: any, data?: GetGroupInvoicesListCommandOutput) => void): void;
    getGroupInvoicesList(args: GetGroupInvoicesListCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGroupInvoicesListCommandOutput) => void): void;
    /**
     * Returns the logs for a given lobby.
     */
    getLobbyLogs(args: GetLobbyLogsCommandInput, options?: __HttpHandlerOptions): Promise<GetLobbyLogsCommandOutput>;
    getLobbyLogs(args: GetLobbyLogsCommandInput, cb: (err: any, data?: GetLobbyLogsCommandOutput) => void): void;
    getLobbyLogs(args: GetLobbyLogsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetLobbyLogsCommandOutput) => void): void;
    /**
     * Returns live information about all active lobies for a given namespace.
     */
    getNamespaceAnalyticsMatchmakerLive(args: GetNamespaceAnalyticsMatchmakerLiveCommandInput, options?: __HttpHandlerOptions): Promise<GetNamespaceAnalyticsMatchmakerLiveCommandOutput>;
    getNamespaceAnalyticsMatchmakerLive(args: GetNamespaceAnalyticsMatchmakerLiveCommandInput, cb: (err: any, data?: GetNamespaceAnalyticsMatchmakerLiveCommandOutput) => void): void;
    getNamespaceAnalyticsMatchmakerLive(args: GetNamespaceAnalyticsMatchmakerLiveCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetNamespaceAnalyticsMatchmakerLiveCommandOutput) => void): void;
    /**
     * Returns a lobby from the given game namespace.
     */
    getNamespaceLobby(args: GetNamespaceLobbyCommandInput, options?: __HttpHandlerOptions): Promise<GetNamespaceLobbyCommandOutput>;
    getNamespaceLobby(args: GetNamespaceLobbyCommandInput, cb: (err: any, data?: GetNamespaceLobbyCommandOutput) => void): void;
    getNamespaceLobby(args: GetNamespaceLobbyCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetNamespaceLobbyCommandOutput) => void): void;
    /**
     * Returns performance information about a Rivet Ray.
     */
    getRayPerfLogs(args: GetRayPerfLogsCommandInput, options?: __HttpHandlerOptions): Promise<GetRayPerfLogsCommandOutput>;
    getRayPerfLogs(args: GetRayPerfLogsCommandInput, cb: (err: any, data?: GetRayPerfLogsCommandOutput) => void): void;
    getRayPerfLogs(args: GetRayPerfLogsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetRayPerfLogsCommandOutput) => void): void;
    /**
     * Returns all available region tiers.
     */
    getRegionTiers(args: GetRegionTiersCommandInput, options?: __HttpHandlerOptions): Promise<GetRegionTiersCommandOutput>;
    getRegionTiers(args: GetRegionTiersCommandInput, cb: (err: any, data?: GetRegionTiersCommandOutput) => void): void;
    getRegionTiers(args: GetRegionTiersCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetRegionTiersCommandOutput) => void): void;
    /**
     * Creates a checkout session for the given group.
     */
    groupBillingCheckout(args: GroupBillingCheckoutCommandInput, options?: __HttpHandlerOptions): Promise<GroupBillingCheckoutCommandOutput>;
    groupBillingCheckout(args: GroupBillingCheckoutCommandInput, cb: (err: any, data?: GroupBillingCheckoutCommandOutput) => void): void;
    groupBillingCheckout(args: GroupBillingCheckoutCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GroupBillingCheckoutCommandOutput) => void): void;
    /**
     * Returns information about the current authenticated agent.
     */
    inspect(args: InspectCommandInput, options?: __HttpHandlerOptions): Promise<InspectCommandOutput>;
    inspect(args: InspectCommandInput, cb: (err: any, data?: InspectCommandOutput) => void): void;
    inspect(args: InspectCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: InspectCommandOutput) => void): void;
    /**
     * Lists game builds for the given game.
     */
    listGameBuilds(args: ListGameBuildsCommandInput, options?: __HttpHandlerOptions): Promise<ListGameBuildsCommandOutput>;
    listGameBuilds(args: ListGameBuildsCommandInput, cb: (err: any, data?: ListGameBuildsCommandOutput) => void): void;
    listGameBuilds(args: ListGameBuildsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListGameBuildsCommandOutput) => void): void;
    /**
     * Lists CDN sites for a game.
     */
    listGameCdnSites(args: ListGameCdnSitesCommandInput, options?: __HttpHandlerOptions): Promise<ListGameCdnSitesCommandOutput>;
    listGameCdnSites(args: ListGameCdnSitesCommandInput, cb: (err: any, data?: ListGameCdnSitesCommandOutput) => void): void;
    listGameCdnSites(args: ListGameCdnSitesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListGameCdnSitesCommandOutput) => void): void;
    /**
     * Lists custom avatars for the given game.
     */
    listGameCustomAvatars(args: ListGameCustomAvatarsCommandInput, options?: __HttpHandlerOptions): Promise<ListGameCustomAvatarsCommandOutput>;
    listGameCustomAvatars(args: ListGameCustomAvatarsCommandInput, cb: (err: any, data?: ListGameCustomAvatarsCommandOutput) => void): void;
    listGameCustomAvatars(args: ListGameCustomAvatarsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListGameCustomAvatarsCommandOutput) => void): void;
    /**
     * Returns a list of lobbies for the given game namespace.
     */
    listNamespaceLobbies(args: ListNamespaceLobbiesCommandInput, options?: __HttpHandlerOptions): Promise<ListNamespaceLobbiesCommandOutput>;
    listNamespaceLobbies(args: ListNamespaceLobbiesCommandInput, cb: (err: any, data?: ListNamespaceLobbiesCommandOutput) => void): void;
    listNamespaceLobbies(args: ListNamespaceLobbiesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ListNamespaceLobbiesCommandOutput) => void): void;
    /**
     * Prepares a custom avatar image upload.
     *
     * Complete upload with `rivet.api.cloud#CompleteCustomAvatarUpload`.
     */
    prepareCustomAvatarUpload(args: PrepareCustomAvatarUploadCommandInput, options?: __HttpHandlerOptions): Promise<PrepareCustomAvatarUploadCommandOutput>;
    prepareCustomAvatarUpload(args: PrepareCustomAvatarUploadCommandInput, cb: (err: any, data?: PrepareCustomAvatarUploadCommandOutput) => void): void;
    prepareCustomAvatarUpload(args: PrepareCustomAvatarUploadCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: PrepareCustomAvatarUploadCommandOutput) => void): void;
    /**
     * Removes an authenticated user from the given game namespace.
     */
    removeNamespaceCdnAuthUser(args: RemoveNamespaceCdnAuthUserCommandInput, options?: __HttpHandlerOptions): Promise<RemoveNamespaceCdnAuthUserCommandOutput>;
    removeNamespaceCdnAuthUser(args: RemoveNamespaceCdnAuthUserCommandInput, cb: (err: any, data?: RemoveNamespaceCdnAuthUserCommandOutput) => void): void;
    removeNamespaceCdnAuthUser(args: RemoveNamespaceCdnAuthUserCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RemoveNamespaceCdnAuthUserCommandOutput) => void): void;
    /**
     * Removes a domain from the given game namespace.
     */
    removeNamespaceDomain(args: RemoveNamespaceDomainCommandInput, options?: __HttpHandlerOptions): Promise<RemoveNamespaceDomainCommandOutput>;
    removeNamespaceDomain(args: RemoveNamespaceDomainCommandInput, cb: (err: any, data?: RemoveNamespaceDomainCommandOutput) => void): void;
    removeNamespaceDomain(args: RemoveNamespaceDomainCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RemoveNamespaceDomainCommandOutput) => void): void;
    /**
     * Sets the current billing plan of the given developer game.
     */
    setGameBillingPlan(args: SetGameBillingPlanCommandInput, options?: __HttpHandlerOptions): Promise<SetGameBillingPlanCommandOutput>;
    setGameBillingPlan(args: SetGameBillingPlanCommandInput, cb: (err: any, data?: SetGameBillingPlanCommandOutput) => void): void;
    setGameBillingPlan(args: SetGameBillingPlanCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SetGameBillingPlanCommandOutput) => void): void;
    /**
     * Updates the CDN authentication type of the given game namesapce.
     */
    setNamespaceCdnAuthType(args: SetNamespaceCdnAuthTypeCommandInput, options?: __HttpHandlerOptions): Promise<SetNamespaceCdnAuthTypeCommandOutput>;
    setNamespaceCdnAuthType(args: SetNamespaceCdnAuthTypeCommandInput, cb: (err: any, data?: SetNamespaceCdnAuthTypeCommandOutput) => void): void;
    setNamespaceCdnAuthType(args: SetNamespaceCdnAuthTypeCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: SetNamespaceCdnAuthTypeCommandOutput) => void): void;
    /**
     * Toggles whether or not to allow authentication based on domain for the given game namesapce.
     */
    toggleNamespaceDomainPublicAuth(args: ToggleNamespaceDomainPublicAuthCommandInput, options?: __HttpHandlerOptions): Promise<ToggleNamespaceDomainPublicAuthCommandOutput>;
    toggleNamespaceDomainPublicAuth(args: ToggleNamespaceDomainPublicAuthCommandInput, cb: (err: any, data?: ToggleNamespaceDomainPublicAuthCommandOutput) => void): void;
    toggleNamespaceDomainPublicAuth(args: ToggleNamespaceDomainPublicAuthCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ToggleNamespaceDomainPublicAuthCommandOutput) => void): void;
    /**
     * Updates matchmaker config for the given game namespace.
     */
    updateGameNamespaceMatchmakerConfig(args: UpdateGameNamespaceMatchmakerConfigCommandInput, options?: __HttpHandlerOptions): Promise<UpdateGameNamespaceMatchmakerConfigCommandOutput>;
    updateGameNamespaceMatchmakerConfig(args: UpdateGameNamespaceMatchmakerConfigCommandInput, cb: (err: any, data?: UpdateGameNamespaceMatchmakerConfigCommandOutput) => void): void;
    updateGameNamespaceMatchmakerConfig(args: UpdateGameNamespaceMatchmakerConfigCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateGameNamespaceMatchmakerConfigCommandOutput) => void): void;
    /**
     * Updates the version of a game namespace.
     */
    updateGameNamespaceVersion(args: UpdateGameNamespaceVersionCommandInput, options?: __HttpHandlerOptions): Promise<UpdateGameNamespaceVersionCommandOutput>;
    updateGameNamespaceVersion(args: UpdateGameNamespaceVersionCommandInput, cb: (err: any, data?: UpdateGameNamespaceVersionCommandOutput) => void): void;
    updateGameNamespaceVersion(args: UpdateGameNamespaceVersionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateGameNamespaceVersionCommandOutput) => void): void;
    /**
     * Adds an authenticated user to the given game namespace.
     */
    updateNamespaceCdnAuthUser(args: UpdateNamespaceCdnAuthUserCommandInput, options?: __HttpHandlerOptions): Promise<UpdateNamespaceCdnAuthUserCommandOutput>;
    updateNamespaceCdnAuthUser(args: UpdateNamespaceCdnAuthUserCommandInput, cb: (err: any, data?: UpdateNamespaceCdnAuthUserCommandOutput) => void): void;
    updateNamespaceCdnAuthUser(args: UpdateNamespaceCdnAuthUserCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UpdateNamespaceCdnAuthUserCommandOutput) => void): void;
    /**
     * Validates information used to create a new game.
     */
    validateGame(args: ValidateGameCommandInput, options?: __HttpHandlerOptions): Promise<ValidateGameCommandOutput>;
    validateGame(args: ValidateGameCommandInput, cb: (err: any, data?: ValidateGameCommandOutput) => void): void;
    validateGame(args: ValidateGameCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ValidateGameCommandOutput) => void): void;
    /**
     * Validates information used to create a new game namespace.
     */
    validateGameNamespace(args: ValidateGameNamespaceCommandInput, options?: __HttpHandlerOptions): Promise<ValidateGameNamespaceCommandOutput>;
    validateGameNamespace(args: ValidateGameNamespaceCommandInput, cb: (err: any, data?: ValidateGameNamespaceCommandOutput) => void): void;
    validateGameNamespace(args: ValidateGameNamespaceCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ValidateGameNamespaceCommandOutput) => void): void;
    /**
     * Validates information used to update a game namespace's matchmaker config.
     */
    validateGameNamespaceMatchmakerConfig(args: ValidateGameNamespaceMatchmakerConfigCommandInput, options?: __HttpHandlerOptions): Promise<ValidateGameNamespaceMatchmakerConfigCommandOutput>;
    validateGameNamespaceMatchmakerConfig(args: ValidateGameNamespaceMatchmakerConfigCommandInput, cb: (err: any, data?: ValidateGameNamespaceMatchmakerConfigCommandOutput) => void): void;
    validateGameNamespaceMatchmakerConfig(args: ValidateGameNamespaceMatchmakerConfigCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ValidateGameNamespaceMatchmakerConfigCommandOutput) => void): void;
    /**
     * Validates information used to create a new game namespace development token.
     */
    validateGameNamespaceTokenDevelopment(args: ValidateGameNamespaceTokenDevelopmentCommandInput, options?: __HttpHandlerOptions): Promise<ValidateGameNamespaceTokenDevelopmentCommandOutput>;
    validateGameNamespaceTokenDevelopment(args: ValidateGameNamespaceTokenDevelopmentCommandInput, cb: (err: any, data?: ValidateGameNamespaceTokenDevelopmentCommandOutput) => void): void;
    validateGameNamespaceTokenDevelopment(args: ValidateGameNamespaceTokenDevelopmentCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ValidateGameNamespaceTokenDevelopmentCommandOutput) => void): void;
    /**
     * Validates information used to create a new game version.
     */
    validateGameVersion(args: ValidateGameVersionCommandInput, options?: __HttpHandlerOptions): Promise<ValidateGameVersionCommandOutput>;
    validateGameVersion(args: ValidateGameVersionCommandInput, cb: (err: any, data?: ValidateGameVersionCommandOutput) => void): void;
    validateGameVersion(args: ValidateGameVersionCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ValidateGameVersionCommandOutput) => void): void;
    /**
     * Validates information used to create a new group.
     */
    validateGroup(args: ValidateGroupCommandInput, options?: __HttpHandlerOptions): Promise<ValidateGroupCommandOutput>;
    validateGroup(args: ValidateGroupCommandInput, cb: (err: any, data?: ValidateGroupCommandOutput) => void): void;
    validateGroup(args: ValidateGroupCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ValidateGroupCommandOutput) => void): void;
}
