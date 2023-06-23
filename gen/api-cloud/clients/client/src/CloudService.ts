// smithy-typescript generated code
import { CloudServiceClient } from "./CloudServiceClient";
import {
  AddNamespaceDomainCommand,
  AddNamespaceDomainCommandInput,
  AddNamespaceDomainCommandOutput,
} from "./commands/AddNamespaceDomainCommand";
import {
  CompleteCustomAvatarUploadCommand,
  CompleteCustomAvatarUploadCommandInput,
  CompleteCustomAvatarUploadCommandOutput,
} from "./commands/CompleteCustomAvatarUploadCommand";
import {
  CompleteUploadCommand,
  CompleteUploadCommandInput,
  CompleteUploadCommandOutput,
} from "./commands/CompleteUploadCommand";
import {
  ConvertGroupCommand,
  ConvertGroupCommandInput,
  ConvertGroupCommandOutput,
} from "./commands/ConvertGroupCommand";
import {
  CreateCloudTokenCommand,
  CreateCloudTokenCommandInput,
  CreateCloudTokenCommandOutput,
} from "./commands/CreateCloudTokenCommand";
import {
  CreateGameBuildCommand,
  CreateGameBuildCommandInput,
  CreateGameBuildCommandOutput,
} from "./commands/CreateGameBuildCommand";
import {
  CreateGameCdnSiteCommand,
  CreateGameCdnSiteCommandInput,
  CreateGameCdnSiteCommandOutput,
} from "./commands/CreateGameCdnSiteCommand";
import {
  CreateGameCommand,
  CreateGameCommandInput,
  CreateGameCommandOutput,
} from "./commands/CreateGameCommand";
import {
  CreateGameNamespaceCommand,
  CreateGameNamespaceCommandInput,
  CreateGameNamespaceCommandOutput,
} from "./commands/CreateGameNamespaceCommand";
import {
  CreateGameNamespaceTokenDevelopmentCommand,
  CreateGameNamespaceTokenDevelopmentCommandInput,
  CreateGameNamespaceTokenDevelopmentCommandOutput,
} from "./commands/CreateGameNamespaceTokenDevelopmentCommand";
import {
  CreateGameNamespaceTokenPublicCommand,
  CreateGameNamespaceTokenPublicCommandInput,
  CreateGameNamespaceTokenPublicCommandOutput,
} from "./commands/CreateGameNamespaceTokenPublicCommand";
import {
  CreateGameVersionCommand,
  CreateGameVersionCommandInput,
  CreateGameVersionCommandOutput,
} from "./commands/CreateGameVersionCommand";
import {
  DeleteMatchmakerLobbyCommand,
  DeleteMatchmakerLobbyCommandInput,
  DeleteMatchmakerLobbyCommandOutput,
} from "./commands/DeleteMatchmakerLobbyCommand";
import {
  ExportLobbyLogsCommand,
  ExportLobbyLogsCommandInput,
  ExportLobbyLogsCommandOutput,
} from "./commands/ExportLobbyLogsCommand";
import {
  ExportMatchmakerLobbyHistoryCommand,
  ExportMatchmakerLobbyHistoryCommandInput,
  ExportMatchmakerLobbyHistoryCommandOutput,
} from "./commands/ExportMatchmakerLobbyHistoryCommand";
import {
  GameBannerUploadCompleteCommand,
  GameBannerUploadCompleteCommandInput,
  GameBannerUploadCompleteCommandOutput,
} from "./commands/GameBannerUploadCompleteCommand";
import {
  GameBannerUploadPrepareCommand,
  GameBannerUploadPrepareCommandInput,
  GameBannerUploadPrepareCommandOutput,
} from "./commands/GameBannerUploadPrepareCommand";
import {
  GameLogoUploadCompleteCommand,
  GameLogoUploadCompleteCommandInput,
  GameLogoUploadCompleteCommandOutput,
} from "./commands/GameLogoUploadCompleteCommand";
import {
  GameLogoUploadPrepareCommand,
  GameLogoUploadPrepareCommandInput,
  GameLogoUploadPrepareCommandOutput,
} from "./commands/GameLogoUploadPrepareCommand";
import {
  GetGameBillingCommand,
  GetGameBillingCommandInput,
  GetGameBillingCommandOutput,
} from "./commands/GetGameBillingCommand";
import {
  GetGameBillingPlansCommand,
  GetGameBillingPlansCommandInput,
  GetGameBillingPlansCommandOutput,
} from "./commands/GetGameBillingPlansCommand";
import {
  GetGameByIdCommand,
  GetGameByIdCommandInput,
  GetGameByIdCommandOutput,
} from "./commands/GetGameByIdCommand";
import {
  GetGameNamespaceByIdCommand,
  GetGameNamespaceByIdCommandInput,
  GetGameNamespaceByIdCommandOutput,
} from "./commands/GetGameNamespaceByIdCommand";
import {
  GetGameVersionByIdCommand,
  GetGameVersionByIdCommandInput,
  GetGameVersionByIdCommandOutput,
} from "./commands/GetGameVersionByIdCommand";
import {
  GetGamesCommand,
  GetGamesCommandInput,
  GetGamesCommandOutput,
} from "./commands/GetGamesCommand";
import {
  GetGroupBillingCommand,
  GetGroupBillingCommandInput,
  GetGroupBillingCommandOutput,
} from "./commands/GetGroupBillingCommand";
import {
  GetGroupInvoicesListCommand,
  GetGroupInvoicesListCommandInput,
  GetGroupInvoicesListCommandOutput,
} from "./commands/GetGroupInvoicesListCommand";
import {
  GetLobbyLogsCommand,
  GetLobbyLogsCommandInput,
  GetLobbyLogsCommandOutput,
} from "./commands/GetLobbyLogsCommand";
import {
  GetNamespaceAnalyticsMatchmakerLiveCommand,
  GetNamespaceAnalyticsMatchmakerLiveCommandInput,
  GetNamespaceAnalyticsMatchmakerLiveCommandOutput,
} from "./commands/GetNamespaceAnalyticsMatchmakerLiveCommand";
import {
  GetNamespaceLobbyCommand,
  GetNamespaceLobbyCommandInput,
  GetNamespaceLobbyCommandOutput,
} from "./commands/GetNamespaceLobbyCommand";
import {
  GetRayPerfLogsCommand,
  GetRayPerfLogsCommandInput,
  GetRayPerfLogsCommandOutput,
} from "./commands/GetRayPerfLogsCommand";
import {
  GetRegionTiersCommand,
  GetRegionTiersCommandInput,
  GetRegionTiersCommandOutput,
} from "./commands/GetRegionTiersCommand";
import {
  GroupBillingCheckoutCommand,
  GroupBillingCheckoutCommandInput,
  GroupBillingCheckoutCommandOutput,
} from "./commands/GroupBillingCheckoutCommand";
import {
  InspectCommand,
  InspectCommandInput,
  InspectCommandOutput,
} from "./commands/InspectCommand";
import {
  ListGameBuildsCommand,
  ListGameBuildsCommandInput,
  ListGameBuildsCommandOutput,
} from "./commands/ListGameBuildsCommand";
import {
  ListGameCdnSitesCommand,
  ListGameCdnSitesCommandInput,
  ListGameCdnSitesCommandOutput,
} from "./commands/ListGameCdnSitesCommand";
import {
  ListGameCustomAvatarsCommand,
  ListGameCustomAvatarsCommandInput,
  ListGameCustomAvatarsCommandOutput,
} from "./commands/ListGameCustomAvatarsCommand";
import {
  ListNamespaceLobbiesCommand,
  ListNamespaceLobbiesCommandInput,
  ListNamespaceLobbiesCommandOutput,
} from "./commands/ListNamespaceLobbiesCommand";
import {
  PrepareCustomAvatarUploadCommand,
  PrepareCustomAvatarUploadCommandInput,
  PrepareCustomAvatarUploadCommandOutput,
} from "./commands/PrepareCustomAvatarUploadCommand";
import {
  RemoveNamespaceCdnAuthUserCommand,
  RemoveNamespaceCdnAuthUserCommandInput,
  RemoveNamespaceCdnAuthUserCommandOutput,
} from "./commands/RemoveNamespaceCdnAuthUserCommand";
import {
  RemoveNamespaceDomainCommand,
  RemoveNamespaceDomainCommandInput,
  RemoveNamespaceDomainCommandOutput,
} from "./commands/RemoveNamespaceDomainCommand";
import {
  SetGameBillingPlanCommand,
  SetGameBillingPlanCommandInput,
  SetGameBillingPlanCommandOutput,
} from "./commands/SetGameBillingPlanCommand";
import {
  SetNamespaceCdnAuthTypeCommand,
  SetNamespaceCdnAuthTypeCommandInput,
  SetNamespaceCdnAuthTypeCommandOutput,
} from "./commands/SetNamespaceCdnAuthTypeCommand";
import {
  ToggleNamespaceDomainPublicAuthCommand,
  ToggleNamespaceDomainPublicAuthCommandInput,
  ToggleNamespaceDomainPublicAuthCommandOutput,
} from "./commands/ToggleNamespaceDomainPublicAuthCommand";
import {
  UpdateGameNamespaceMatchmakerConfigCommand,
  UpdateGameNamespaceMatchmakerConfigCommandInput,
  UpdateGameNamespaceMatchmakerConfigCommandOutput,
} from "./commands/UpdateGameNamespaceMatchmakerConfigCommand";
import {
  UpdateGameNamespaceVersionCommand,
  UpdateGameNamespaceVersionCommandInput,
  UpdateGameNamespaceVersionCommandOutput,
} from "./commands/UpdateGameNamespaceVersionCommand";
import {
  UpdateNamespaceCdnAuthUserCommand,
  UpdateNamespaceCdnAuthUserCommandInput,
  UpdateNamespaceCdnAuthUserCommandOutput,
} from "./commands/UpdateNamespaceCdnAuthUserCommand";
import {
  ValidateGameCommand,
  ValidateGameCommandInput,
  ValidateGameCommandOutput,
} from "./commands/ValidateGameCommand";
import {
  ValidateGameNamespaceCommand,
  ValidateGameNamespaceCommandInput,
  ValidateGameNamespaceCommandOutput,
} from "./commands/ValidateGameNamespaceCommand";
import {
  ValidateGameNamespaceMatchmakerConfigCommand,
  ValidateGameNamespaceMatchmakerConfigCommandInput,
  ValidateGameNamespaceMatchmakerConfigCommandOutput,
} from "./commands/ValidateGameNamespaceMatchmakerConfigCommand";
import {
  ValidateGameNamespaceTokenDevelopmentCommand,
  ValidateGameNamespaceTokenDevelopmentCommandInput,
  ValidateGameNamespaceTokenDevelopmentCommandOutput,
} from "./commands/ValidateGameNamespaceTokenDevelopmentCommand";
import {
  ValidateGameVersionCommand,
  ValidateGameVersionCommandInput,
  ValidateGameVersionCommandOutput,
} from "./commands/ValidateGameVersionCommand";
import {
  ValidateGroupCommand,
  ValidateGroupCommandInput,
  ValidateGroupCommandOutput,
} from "./commands/ValidateGroupCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

export class CloudService extends CloudServiceClient {
  /**
   * Adds a domain to the given game namespace.
   */
  public addNamespaceDomain(
    args: AddNamespaceDomainCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<AddNamespaceDomainCommandOutput>;
  public addNamespaceDomain(
    args: AddNamespaceDomainCommandInput,
    cb: (err: any, data?: AddNamespaceDomainCommandOutput) => void
  ): void;
  public addNamespaceDomain(
    args: AddNamespaceDomainCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: AddNamespaceDomainCommandOutput) => void
  ): void;
  public addNamespaceDomain(
    args: AddNamespaceDomainCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: AddNamespaceDomainCommandOutput) => void),
    cb?: (err: any, data?: AddNamespaceDomainCommandOutput) => void
  ): Promise<AddNamespaceDomainCommandOutput> | void {
    const command = new AddNamespaceDomainCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Completes a custom avatar image upload. Must be called after the file upload process completes.
   */
  public completeCustomAvatarUpload(
    args: CompleteCustomAvatarUploadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CompleteCustomAvatarUploadCommandOutput>;
  public completeCustomAvatarUpload(
    args: CompleteCustomAvatarUploadCommandInput,
    cb: (err: any, data?: CompleteCustomAvatarUploadCommandOutput) => void
  ): void;
  public completeCustomAvatarUpload(
    args: CompleteCustomAvatarUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CompleteCustomAvatarUploadCommandOutput) => void
  ): void;
  public completeCustomAvatarUpload(
    args: CompleteCustomAvatarUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CompleteCustomAvatarUploadCommandOutput) => void),
    cb?: (err: any, data?: CompleteCustomAvatarUploadCommandOutput) => void
  ): Promise<CompleteCustomAvatarUploadCommandOutput> | void {
    const command = new CompleteCustomAvatarUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Marks an upload as complete.
   */
  public completeUpload(
    args: CompleteUploadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CompleteUploadCommandOutput>;
  public completeUpload(
    args: CompleteUploadCommandInput,
    cb: (err: any, data?: CompleteUploadCommandOutput) => void
  ): void;
  public completeUpload(
    args: CompleteUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CompleteUploadCommandOutput) => void
  ): void;
  public completeUpload(
    args: CompleteUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CompleteUploadCommandOutput) => void),
    cb?: (err: any, data?: CompleteUploadCommandOutput) => void
  ): Promise<CompleteUploadCommandOutput> | void {
    const command = new CompleteUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Converts the given group into a developer group.
   */
  public convertGroup(
    args: ConvertGroupCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ConvertGroupCommandOutput>;
  public convertGroup(
    args: ConvertGroupCommandInput,
    cb: (err: any, data?: ConvertGroupCommandOutput) => void
  ): void;
  public convertGroup(
    args: ConvertGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ConvertGroupCommandOutput) => void
  ): void;
  public convertGroup(
    args: ConvertGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ConvertGroupCommandOutput) => void),
    cb?: (err: any, data?: ConvertGroupCommandOutput) => void
  ): Promise<ConvertGroupCommandOutput> | void {
    const command = new ConvertGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a new game cloud token.
   */
  public createCloudToken(
    args: CreateCloudTokenCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateCloudTokenCommandOutput>;
  public createCloudToken(
    args: CreateCloudTokenCommandInput,
    cb: (err: any, data?: CreateCloudTokenCommandOutput) => void
  ): void;
  public createCloudToken(
    args: CreateCloudTokenCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateCloudTokenCommandOutput) => void
  ): void;
  public createCloudToken(
    args: CreateCloudTokenCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateCloudTokenCommandOutput) => void),
    cb?: (err: any, data?: CreateCloudTokenCommandOutput) => void
  ): Promise<CreateCloudTokenCommandOutput> | void {
    const command = new CreateCloudTokenCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a new game.
   */
  public createGame(
    args: CreateGameCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGameCommandOutput>;
  public createGame(
    args: CreateGameCommandInput,
    cb: (err: any, data?: CreateGameCommandOutput) => void
  ): void;
  public createGame(
    args: CreateGameCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGameCommandOutput) => void
  ): void;
  public createGame(
    args: CreateGameCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGameCommandOutput) => void),
    cb?: (err: any, data?: CreateGameCommandOutput) => void
  ): Promise<CreateGameCommandOutput> | void {
    const command = new CreateGameCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a new game build for the given game.
   */
  public createGameBuild(
    args: CreateGameBuildCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGameBuildCommandOutput>;
  public createGameBuild(
    args: CreateGameBuildCommandInput,
    cb: (err: any, data?: CreateGameBuildCommandOutput) => void
  ): void;
  public createGameBuild(
    args: CreateGameBuildCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGameBuildCommandOutput) => void
  ): void;
  public createGameBuild(
    args: CreateGameBuildCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGameBuildCommandOutput) => void),
    cb?: (err: any, data?: CreateGameBuildCommandOutput) => void
  ): Promise<CreateGameBuildCommandOutput> | void {
    const command = new CreateGameBuildCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a new CDN site for the given game.
   */
  public createGameCdnSite(
    args: CreateGameCdnSiteCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGameCdnSiteCommandOutput>;
  public createGameCdnSite(
    args: CreateGameCdnSiteCommandInput,
    cb: (err: any, data?: CreateGameCdnSiteCommandOutput) => void
  ): void;
  public createGameCdnSite(
    args: CreateGameCdnSiteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGameCdnSiteCommandOutput) => void
  ): void;
  public createGameCdnSite(
    args: CreateGameCdnSiteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGameCdnSiteCommandOutput) => void),
    cb?: (err: any, data?: CreateGameCdnSiteCommandOutput) => void
  ): Promise<CreateGameCdnSiteCommandOutput> | void {
    const command = new CreateGameCdnSiteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a new namespace for the given game.
   */
  public createGameNamespace(
    args: CreateGameNamespaceCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGameNamespaceCommandOutput>;
  public createGameNamespace(
    args: CreateGameNamespaceCommandInput,
    cb: (err: any, data?: CreateGameNamespaceCommandOutput) => void
  ): void;
  public createGameNamespace(
    args: CreateGameNamespaceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGameNamespaceCommandOutput) => void
  ): void;
  public createGameNamespace(
    args: CreateGameNamespaceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGameNamespaceCommandOutput) => void),
    cb?: (err: any, data?: CreateGameNamespaceCommandOutput) => void
  ): Promise<CreateGameNamespaceCommandOutput> | void {
    const command = new CreateGameNamespaceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a development token for the given namespace.
   */
  public createGameNamespaceTokenDevelopment(
    args: CreateGameNamespaceTokenDevelopmentCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGameNamespaceTokenDevelopmentCommandOutput>;
  public createGameNamespaceTokenDevelopment(
    args: CreateGameNamespaceTokenDevelopmentCommandInput,
    cb: (err: any, data?: CreateGameNamespaceTokenDevelopmentCommandOutput) => void
  ): void;
  public createGameNamespaceTokenDevelopment(
    args: CreateGameNamespaceTokenDevelopmentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGameNamespaceTokenDevelopmentCommandOutput) => void
  ): void;
  public createGameNamespaceTokenDevelopment(
    args: CreateGameNamespaceTokenDevelopmentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGameNamespaceTokenDevelopmentCommandOutput) => void),
    cb?: (err: any, data?: CreateGameNamespaceTokenDevelopmentCommandOutput) => void
  ): Promise<CreateGameNamespaceTokenDevelopmentCommandOutput> | void {
    const command = new CreateGameNamespaceTokenDevelopmentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a public token for the given namespace.
   */
  public createGameNamespaceTokenPublic(
    args: CreateGameNamespaceTokenPublicCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGameNamespaceTokenPublicCommandOutput>;
  public createGameNamespaceTokenPublic(
    args: CreateGameNamespaceTokenPublicCommandInput,
    cb: (err: any, data?: CreateGameNamespaceTokenPublicCommandOutput) => void
  ): void;
  public createGameNamespaceTokenPublic(
    args: CreateGameNamespaceTokenPublicCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGameNamespaceTokenPublicCommandOutput) => void
  ): void;
  public createGameNamespaceTokenPublic(
    args: CreateGameNamespaceTokenPublicCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGameNamespaceTokenPublicCommandOutput) => void),
    cb?: (err: any, data?: CreateGameNamespaceTokenPublicCommandOutput) => void
  ): Promise<CreateGameNamespaceTokenPublicCommandOutput> | void {
    const command = new CreateGameNamespaceTokenPublicCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a new game version.
   */
  public createGameVersion(
    args: CreateGameVersionCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CreateGameVersionCommandOutput>;
  public createGameVersion(
    args: CreateGameVersionCommandInput,
    cb: (err: any, data?: CreateGameVersionCommandOutput) => void
  ): void;
  public createGameVersion(
    args: CreateGameVersionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CreateGameVersionCommandOutput) => void
  ): void;
  public createGameVersion(
    args: CreateGameVersionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CreateGameVersionCommandOutput) => void),
    cb?: (err: any, data?: CreateGameVersionCommandOutput) => void
  ): Promise<CreateGameVersionCommandOutput> | void {
    const command = new CreateGameVersionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Deletes a matchmaker lobby, stopping it immediately.
   */
  public deleteMatchmakerLobby(
    args: DeleteMatchmakerLobbyCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<DeleteMatchmakerLobbyCommandOutput>;
  public deleteMatchmakerLobby(
    args: DeleteMatchmakerLobbyCommandInput,
    cb: (err: any, data?: DeleteMatchmakerLobbyCommandOutput) => void
  ): void;
  public deleteMatchmakerLobby(
    args: DeleteMatchmakerLobbyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: DeleteMatchmakerLobbyCommandOutput) => void
  ): void;
  public deleteMatchmakerLobby(
    args: DeleteMatchmakerLobbyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: DeleteMatchmakerLobbyCommandOutput) => void),
    cb?: (err: any, data?: DeleteMatchmakerLobbyCommandOutput) => void
  ): Promise<DeleteMatchmakerLobbyCommandOutput> | void {
    const command = new DeleteMatchmakerLobbyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Generates a download URL for logs.
   */
  public exportLobbyLogs(
    args: ExportLobbyLogsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ExportLobbyLogsCommandOutput>;
  public exportLobbyLogs(
    args: ExportLobbyLogsCommandInput,
    cb: (err: any, data?: ExportLobbyLogsCommandOutput) => void
  ): void;
  public exportLobbyLogs(
    args: ExportLobbyLogsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ExportLobbyLogsCommandOutput) => void
  ): void;
  public exportLobbyLogs(
    args: ExportLobbyLogsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ExportLobbyLogsCommandOutput) => void),
    cb?: (err: any, data?: ExportLobbyLogsCommandOutput) => void
  ): Promise<ExportLobbyLogsCommandOutput> | void {
    const command = new ExportLobbyLogsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Exports lobby history over a given query time span.
   */
  public exportMatchmakerLobbyHistory(
    args: ExportMatchmakerLobbyHistoryCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ExportMatchmakerLobbyHistoryCommandOutput>;
  public exportMatchmakerLobbyHistory(
    args: ExportMatchmakerLobbyHistoryCommandInput,
    cb: (err: any, data?: ExportMatchmakerLobbyHistoryCommandOutput) => void
  ): void;
  public exportMatchmakerLobbyHistory(
    args: ExportMatchmakerLobbyHistoryCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ExportMatchmakerLobbyHistoryCommandOutput) => void
  ): void;
  public exportMatchmakerLobbyHistory(
    args: ExportMatchmakerLobbyHistoryCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ExportMatchmakerLobbyHistoryCommandOutput) => void),
    cb?: (err: any, data?: ExportMatchmakerLobbyHistoryCommandOutput) => void
  ): Promise<ExportMatchmakerLobbyHistoryCommandOutput> | void {
    const command = new ExportMatchmakerLobbyHistoryCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Completes an game banner image upload. Must be called after the file upload process completes.
   */
  public gameBannerUploadComplete(
    args: GameBannerUploadCompleteCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GameBannerUploadCompleteCommandOutput>;
  public gameBannerUploadComplete(
    args: GameBannerUploadCompleteCommandInput,
    cb: (err: any, data?: GameBannerUploadCompleteCommandOutput) => void
  ): void;
  public gameBannerUploadComplete(
    args: GameBannerUploadCompleteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GameBannerUploadCompleteCommandOutput) => void
  ): void;
  public gameBannerUploadComplete(
    args: GameBannerUploadCompleteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GameBannerUploadCompleteCommandOutput) => void),
    cb?: (err: any, data?: GameBannerUploadCompleteCommandOutput) => void
  ): Promise<GameBannerUploadCompleteCommandOutput> | void {
    const command = new GameBannerUploadCompleteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Prepares a game banner image upload.
   */
  public gameBannerUploadPrepare(
    args: GameBannerUploadPrepareCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GameBannerUploadPrepareCommandOutput>;
  public gameBannerUploadPrepare(
    args: GameBannerUploadPrepareCommandInput,
    cb: (err: any, data?: GameBannerUploadPrepareCommandOutput) => void
  ): void;
  public gameBannerUploadPrepare(
    args: GameBannerUploadPrepareCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GameBannerUploadPrepareCommandOutput) => void
  ): void;
  public gameBannerUploadPrepare(
    args: GameBannerUploadPrepareCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GameBannerUploadPrepareCommandOutput) => void),
    cb?: (err: any, data?: GameBannerUploadPrepareCommandOutput) => void
  ): Promise<GameBannerUploadPrepareCommandOutput> | void {
    const command = new GameBannerUploadPrepareCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Completes a game logo image upload. Must be called after the file upload process completes.
   */
  public gameLogoUploadComplete(
    args: GameLogoUploadCompleteCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GameLogoUploadCompleteCommandOutput>;
  public gameLogoUploadComplete(
    args: GameLogoUploadCompleteCommandInput,
    cb: (err: any, data?: GameLogoUploadCompleteCommandOutput) => void
  ): void;
  public gameLogoUploadComplete(
    args: GameLogoUploadCompleteCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GameLogoUploadCompleteCommandOutput) => void
  ): void;
  public gameLogoUploadComplete(
    args: GameLogoUploadCompleteCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GameLogoUploadCompleteCommandOutput) => void),
    cb?: (err: any, data?: GameLogoUploadCompleteCommandOutput) => void
  ): Promise<GameLogoUploadCompleteCommandOutput> | void {
    const command = new GameLogoUploadCompleteCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Prepares a game logo image upload.
   */
  public gameLogoUploadPrepare(
    args: GameLogoUploadPrepareCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GameLogoUploadPrepareCommandOutput>;
  public gameLogoUploadPrepare(
    args: GameLogoUploadPrepareCommandInput,
    cb: (err: any, data?: GameLogoUploadPrepareCommandOutput) => void
  ): void;
  public gameLogoUploadPrepare(
    args: GameLogoUploadPrepareCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GameLogoUploadPrepareCommandOutput) => void
  ): void;
  public gameLogoUploadPrepare(
    args: GameLogoUploadPrepareCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GameLogoUploadPrepareCommandOutput) => void),
    cb?: (err: any, data?: GameLogoUploadPrepareCommandOutput) => void
  ): Promise<GameLogoUploadPrepareCommandOutput> | void {
    const command = new GameLogoUploadPrepareCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns billing information for the given game over the given query time span.
   */
  public getGameBilling(
    args: GetGameBillingCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGameBillingCommandOutput>;
  public getGameBilling(
    args: GetGameBillingCommandInput,
    cb: (err: any, data?: GetGameBillingCommandOutput) => void
  ): void;
  public getGameBilling(
    args: GetGameBillingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGameBillingCommandOutput) => void
  ): void;
  public getGameBilling(
    args: GetGameBillingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGameBillingCommandOutput) => void),
    cb?: (err: any, data?: GetGameBillingCommandOutput) => void
  ): Promise<GetGameBillingCommandOutput> | void {
    const command = new GetGameBillingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns all available billing plans for the given game.
   */
  public getGameBillingPlans(
    args: GetGameBillingPlansCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGameBillingPlansCommandOutput>;
  public getGameBillingPlans(
    args: GetGameBillingPlansCommandInput,
    cb: (err: any, data?: GetGameBillingPlansCommandOutput) => void
  ): void;
  public getGameBillingPlans(
    args: GetGameBillingPlansCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGameBillingPlansCommandOutput) => void
  ): void;
  public getGameBillingPlans(
    args: GetGameBillingPlansCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGameBillingPlansCommandOutput) => void),
    cb?: (err: any, data?: GetGameBillingPlansCommandOutput) => void
  ): Promise<GetGameBillingPlansCommandOutput> | void {
    const command = new GetGameBillingPlansCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a game by its game id.
   */
  public getGameById(
    args: GetGameByIdCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGameByIdCommandOutput>;
  public getGameById(
    args: GetGameByIdCommandInput,
    cb: (err: any, data?: GetGameByIdCommandOutput) => void
  ): void;
  public getGameById(
    args: GetGameByIdCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGameByIdCommandOutput) => void
  ): void;
  public getGameById(
    args: GetGameByIdCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGameByIdCommandOutput) => void),
    cb?: (err: any, data?: GetGameByIdCommandOutput) => void
  ): Promise<GetGameByIdCommandOutput> | void {
    const command = new GetGameByIdCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Gets a game namespace by namespace ID.
   */
  public getGameNamespaceById(
    args: GetGameNamespaceByIdCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGameNamespaceByIdCommandOutput>;
  public getGameNamespaceById(
    args: GetGameNamespaceByIdCommandInput,
    cb: (err: any, data?: GetGameNamespaceByIdCommandOutput) => void
  ): void;
  public getGameNamespaceById(
    args: GetGameNamespaceByIdCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGameNamespaceByIdCommandOutput) => void
  ): void;
  public getGameNamespaceById(
    args: GetGameNamespaceByIdCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGameNamespaceByIdCommandOutput) => void),
    cb?: (err: any, data?: GetGameNamespaceByIdCommandOutput) => void
  ): Promise<GetGameNamespaceByIdCommandOutput> | void {
    const command = new GetGameNamespaceByIdCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a list of games in which the current identity is a group member of its development team.
   */
  public getGames(
    args: GetGamesCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGamesCommandOutput>;
  public getGames(
    args: GetGamesCommandInput,
    cb: (err: any, data?: GetGamesCommandOutput) => void
  ): void;
  public getGames(
    args: GetGamesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGamesCommandOutput) => void
  ): void;
  public getGames(
    args: GetGamesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGamesCommandOutput) => void),
    cb?: (err: any, data?: GetGamesCommandOutput) => void
  ): Promise<GetGamesCommandOutput> | void {
    const command = new GetGamesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a game version by its version ID.
   */
  public getGameVersionById(
    args: GetGameVersionByIdCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGameVersionByIdCommandOutput>;
  public getGameVersionById(
    args: GetGameVersionByIdCommandInput,
    cb: (err: any, data?: GetGameVersionByIdCommandOutput) => void
  ): void;
  public getGameVersionById(
    args: GetGameVersionByIdCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGameVersionByIdCommandOutput) => void
  ): void;
  public getGameVersionById(
    args: GetGameVersionByIdCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGameVersionByIdCommandOutput) => void),
    cb?: (err: any, data?: GetGameVersionByIdCommandOutput) => void
  ): Promise<GetGameVersionByIdCommandOutput> | void {
    const command = new GetGameVersionByIdCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns billing information for the given group over the given query time span.
   */
  public getGroupBilling(
    args: GetGroupBillingCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupBillingCommandOutput>;
  public getGroupBilling(
    args: GetGroupBillingCommandInput,
    cb: (err: any, data?: GetGroupBillingCommandOutput) => void
  ): void;
  public getGroupBilling(
    args: GetGroupBillingCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupBillingCommandOutput) => void
  ): void;
  public getGroupBilling(
    args: GetGroupBillingCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupBillingCommandOutput) => void),
    cb?: (err: any, data?: GetGroupBillingCommandOutput) => void
  ): Promise<GetGroupBillingCommandOutput> | void {
    const command = new GetGroupBillingCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a list of invoices for the given group.
   */
  public getGroupInvoicesList(
    args: GetGroupInvoicesListCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGroupInvoicesListCommandOutput>;
  public getGroupInvoicesList(
    args: GetGroupInvoicesListCommandInput,
    cb: (err: any, data?: GetGroupInvoicesListCommandOutput) => void
  ): void;
  public getGroupInvoicesList(
    args: GetGroupInvoicesListCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGroupInvoicesListCommandOutput) => void
  ): void;
  public getGroupInvoicesList(
    args: GetGroupInvoicesListCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGroupInvoicesListCommandOutput) => void),
    cb?: (err: any, data?: GetGroupInvoicesListCommandOutput) => void
  ): Promise<GetGroupInvoicesListCommandOutput> | void {
    const command = new GetGroupInvoicesListCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns the logs for a given lobby.
   */
  public getLobbyLogs(
    args: GetLobbyLogsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetLobbyLogsCommandOutput>;
  public getLobbyLogs(
    args: GetLobbyLogsCommandInput,
    cb: (err: any, data?: GetLobbyLogsCommandOutput) => void
  ): void;
  public getLobbyLogs(
    args: GetLobbyLogsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetLobbyLogsCommandOutput) => void
  ): void;
  public getLobbyLogs(
    args: GetLobbyLogsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetLobbyLogsCommandOutput) => void),
    cb?: (err: any, data?: GetLobbyLogsCommandOutput) => void
  ): Promise<GetLobbyLogsCommandOutput> | void {
    const command = new GetLobbyLogsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns live information about all active lobies for a given namespace.
   */
  public getNamespaceAnalyticsMatchmakerLive(
    args: GetNamespaceAnalyticsMatchmakerLiveCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetNamespaceAnalyticsMatchmakerLiveCommandOutput>;
  public getNamespaceAnalyticsMatchmakerLive(
    args: GetNamespaceAnalyticsMatchmakerLiveCommandInput,
    cb: (err: any, data?: GetNamespaceAnalyticsMatchmakerLiveCommandOutput) => void
  ): void;
  public getNamespaceAnalyticsMatchmakerLive(
    args: GetNamespaceAnalyticsMatchmakerLiveCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetNamespaceAnalyticsMatchmakerLiveCommandOutput) => void
  ): void;
  public getNamespaceAnalyticsMatchmakerLive(
    args: GetNamespaceAnalyticsMatchmakerLiveCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetNamespaceAnalyticsMatchmakerLiveCommandOutput) => void),
    cb?: (err: any, data?: GetNamespaceAnalyticsMatchmakerLiveCommandOutput) => void
  ): Promise<GetNamespaceAnalyticsMatchmakerLiveCommandOutput> | void {
    const command = new GetNamespaceAnalyticsMatchmakerLiveCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a lobby from the given game namespace.
   */
  public getNamespaceLobby(
    args: GetNamespaceLobbyCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetNamespaceLobbyCommandOutput>;
  public getNamespaceLobby(
    args: GetNamespaceLobbyCommandInput,
    cb: (err: any, data?: GetNamespaceLobbyCommandOutput) => void
  ): void;
  public getNamespaceLobby(
    args: GetNamespaceLobbyCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetNamespaceLobbyCommandOutput) => void
  ): void;
  public getNamespaceLobby(
    args: GetNamespaceLobbyCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetNamespaceLobbyCommandOutput) => void),
    cb?: (err: any, data?: GetNamespaceLobbyCommandOutput) => void
  ): Promise<GetNamespaceLobbyCommandOutput> | void {
    const command = new GetNamespaceLobbyCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns performance information about a Rivet Ray.
   */
  public getRayPerfLogs(
    args: GetRayPerfLogsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetRayPerfLogsCommandOutput>;
  public getRayPerfLogs(
    args: GetRayPerfLogsCommandInput,
    cb: (err: any, data?: GetRayPerfLogsCommandOutput) => void
  ): void;
  public getRayPerfLogs(
    args: GetRayPerfLogsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetRayPerfLogsCommandOutput) => void
  ): void;
  public getRayPerfLogs(
    args: GetRayPerfLogsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetRayPerfLogsCommandOutput) => void),
    cb?: (err: any, data?: GetRayPerfLogsCommandOutput) => void
  ): Promise<GetRayPerfLogsCommandOutput> | void {
    const command = new GetRayPerfLogsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns all available region tiers.
   */
  public getRegionTiers(
    args: GetRegionTiersCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetRegionTiersCommandOutput>;
  public getRegionTiers(
    args: GetRegionTiersCommandInput,
    cb: (err: any, data?: GetRegionTiersCommandOutput) => void
  ): void;
  public getRegionTiers(
    args: GetRegionTiersCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetRegionTiersCommandOutput) => void
  ): void;
  public getRegionTiers(
    args: GetRegionTiersCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetRegionTiersCommandOutput) => void),
    cb?: (err: any, data?: GetRegionTiersCommandOutput) => void
  ): Promise<GetRegionTiersCommandOutput> | void {
    const command = new GetRegionTiersCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Creates a checkout session for the given group.
   */
  public groupBillingCheckout(
    args: GroupBillingCheckoutCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GroupBillingCheckoutCommandOutput>;
  public groupBillingCheckout(
    args: GroupBillingCheckoutCommandInput,
    cb: (err: any, data?: GroupBillingCheckoutCommandOutput) => void
  ): void;
  public groupBillingCheckout(
    args: GroupBillingCheckoutCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GroupBillingCheckoutCommandOutput) => void
  ): void;
  public groupBillingCheckout(
    args: GroupBillingCheckoutCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GroupBillingCheckoutCommandOutput) => void),
    cb?: (err: any, data?: GroupBillingCheckoutCommandOutput) => void
  ): Promise<GroupBillingCheckoutCommandOutput> | void {
    const command = new GroupBillingCheckoutCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns information about the current authenticated agent.
   */
  public inspect(
    args: InspectCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<InspectCommandOutput>;
  public inspect(
    args: InspectCommandInput,
    cb: (err: any, data?: InspectCommandOutput) => void
  ): void;
  public inspect(
    args: InspectCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: InspectCommandOutput) => void
  ): void;
  public inspect(
    args: InspectCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: InspectCommandOutput) => void),
    cb?: (err: any, data?: InspectCommandOutput) => void
  ): Promise<InspectCommandOutput> | void {
    const command = new InspectCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Lists game builds for the given game.
   */
  public listGameBuilds(
    args: ListGameBuildsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ListGameBuildsCommandOutput>;
  public listGameBuilds(
    args: ListGameBuildsCommandInput,
    cb: (err: any, data?: ListGameBuildsCommandOutput) => void
  ): void;
  public listGameBuilds(
    args: ListGameBuildsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListGameBuildsCommandOutput) => void
  ): void;
  public listGameBuilds(
    args: ListGameBuildsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListGameBuildsCommandOutput) => void),
    cb?: (err: any, data?: ListGameBuildsCommandOutput) => void
  ): Promise<ListGameBuildsCommandOutput> | void {
    const command = new ListGameBuildsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Lists CDN sites for a game.
   */
  public listGameCdnSites(
    args: ListGameCdnSitesCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ListGameCdnSitesCommandOutput>;
  public listGameCdnSites(
    args: ListGameCdnSitesCommandInput,
    cb: (err: any, data?: ListGameCdnSitesCommandOutput) => void
  ): void;
  public listGameCdnSites(
    args: ListGameCdnSitesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListGameCdnSitesCommandOutput) => void
  ): void;
  public listGameCdnSites(
    args: ListGameCdnSitesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListGameCdnSitesCommandOutput) => void),
    cb?: (err: any, data?: ListGameCdnSitesCommandOutput) => void
  ): Promise<ListGameCdnSitesCommandOutput> | void {
    const command = new ListGameCdnSitesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Lists custom avatars for the given game.
   */
  public listGameCustomAvatars(
    args: ListGameCustomAvatarsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ListGameCustomAvatarsCommandOutput>;
  public listGameCustomAvatars(
    args: ListGameCustomAvatarsCommandInput,
    cb: (err: any, data?: ListGameCustomAvatarsCommandOutput) => void
  ): void;
  public listGameCustomAvatars(
    args: ListGameCustomAvatarsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListGameCustomAvatarsCommandOutput) => void
  ): void;
  public listGameCustomAvatars(
    args: ListGameCustomAvatarsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListGameCustomAvatarsCommandOutput) => void),
    cb?: (err: any, data?: ListGameCustomAvatarsCommandOutput) => void
  ): Promise<ListGameCustomAvatarsCommandOutput> | void {
    const command = new ListGameCustomAvatarsCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Returns a list of lobbies for the given game namespace.
   */
  public listNamespaceLobbies(
    args: ListNamespaceLobbiesCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ListNamespaceLobbiesCommandOutput>;
  public listNamespaceLobbies(
    args: ListNamespaceLobbiesCommandInput,
    cb: (err: any, data?: ListNamespaceLobbiesCommandOutput) => void
  ): void;
  public listNamespaceLobbies(
    args: ListNamespaceLobbiesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ListNamespaceLobbiesCommandOutput) => void
  ): void;
  public listNamespaceLobbies(
    args: ListNamespaceLobbiesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ListNamespaceLobbiesCommandOutput) => void),
    cb?: (err: any, data?: ListNamespaceLobbiesCommandOutput) => void
  ): Promise<ListNamespaceLobbiesCommandOutput> | void {
    const command = new ListNamespaceLobbiesCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Prepares a custom avatar image upload.
   *
   * Complete upload with `rivet.api.cloud#CompleteCustomAvatarUpload`.
   */
  public prepareCustomAvatarUpload(
    args: PrepareCustomAvatarUploadCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<PrepareCustomAvatarUploadCommandOutput>;
  public prepareCustomAvatarUpload(
    args: PrepareCustomAvatarUploadCommandInput,
    cb: (err: any, data?: PrepareCustomAvatarUploadCommandOutput) => void
  ): void;
  public prepareCustomAvatarUpload(
    args: PrepareCustomAvatarUploadCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: PrepareCustomAvatarUploadCommandOutput) => void
  ): void;
  public prepareCustomAvatarUpload(
    args: PrepareCustomAvatarUploadCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: PrepareCustomAvatarUploadCommandOutput) => void),
    cb?: (err: any, data?: PrepareCustomAvatarUploadCommandOutput) => void
  ): Promise<PrepareCustomAvatarUploadCommandOutput> | void {
    const command = new PrepareCustomAvatarUploadCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Removes an authenticated user from the given game namespace.
   */
  public removeNamespaceCdnAuthUser(
    args: RemoveNamespaceCdnAuthUserCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<RemoveNamespaceCdnAuthUserCommandOutput>;
  public removeNamespaceCdnAuthUser(
    args: RemoveNamespaceCdnAuthUserCommandInput,
    cb: (err: any, data?: RemoveNamespaceCdnAuthUserCommandOutput) => void
  ): void;
  public removeNamespaceCdnAuthUser(
    args: RemoveNamespaceCdnAuthUserCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: RemoveNamespaceCdnAuthUserCommandOutput) => void
  ): void;
  public removeNamespaceCdnAuthUser(
    args: RemoveNamespaceCdnAuthUserCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: RemoveNamespaceCdnAuthUserCommandOutput) => void),
    cb?: (err: any, data?: RemoveNamespaceCdnAuthUserCommandOutput) => void
  ): Promise<RemoveNamespaceCdnAuthUserCommandOutput> | void {
    const command = new RemoveNamespaceCdnAuthUserCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Removes a domain from the given game namespace.
   */
  public removeNamespaceDomain(
    args: RemoveNamespaceDomainCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<RemoveNamespaceDomainCommandOutput>;
  public removeNamespaceDomain(
    args: RemoveNamespaceDomainCommandInput,
    cb: (err: any, data?: RemoveNamespaceDomainCommandOutput) => void
  ): void;
  public removeNamespaceDomain(
    args: RemoveNamespaceDomainCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: RemoveNamespaceDomainCommandOutput) => void
  ): void;
  public removeNamespaceDomain(
    args: RemoveNamespaceDomainCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: RemoveNamespaceDomainCommandOutput) => void),
    cb?: (err: any, data?: RemoveNamespaceDomainCommandOutput) => void
  ): Promise<RemoveNamespaceDomainCommandOutput> | void {
    const command = new RemoveNamespaceDomainCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Sets the current billing plan of the given developer game.
   */
  public setGameBillingPlan(
    args: SetGameBillingPlanCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<SetGameBillingPlanCommandOutput>;
  public setGameBillingPlan(
    args: SetGameBillingPlanCommandInput,
    cb: (err: any, data?: SetGameBillingPlanCommandOutput) => void
  ): void;
  public setGameBillingPlan(
    args: SetGameBillingPlanCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetGameBillingPlanCommandOutput) => void
  ): void;
  public setGameBillingPlan(
    args: SetGameBillingPlanCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SetGameBillingPlanCommandOutput) => void),
    cb?: (err: any, data?: SetGameBillingPlanCommandOutput) => void
  ): Promise<SetGameBillingPlanCommandOutput> | void {
    const command = new SetGameBillingPlanCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Updates the CDN authentication type of the given game namesapce.
   */
  public setNamespaceCdnAuthType(
    args: SetNamespaceCdnAuthTypeCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<SetNamespaceCdnAuthTypeCommandOutput>;
  public setNamespaceCdnAuthType(
    args: SetNamespaceCdnAuthTypeCommandInput,
    cb: (err: any, data?: SetNamespaceCdnAuthTypeCommandOutput) => void
  ): void;
  public setNamespaceCdnAuthType(
    args: SetNamespaceCdnAuthTypeCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: SetNamespaceCdnAuthTypeCommandOutput) => void
  ): void;
  public setNamespaceCdnAuthType(
    args: SetNamespaceCdnAuthTypeCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: SetNamespaceCdnAuthTypeCommandOutput) => void),
    cb?: (err: any, data?: SetNamespaceCdnAuthTypeCommandOutput) => void
  ): Promise<SetNamespaceCdnAuthTypeCommandOutput> | void {
    const command = new SetNamespaceCdnAuthTypeCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Toggles whether or not to allow authentication based on domain for the given game namesapce.
   */
  public toggleNamespaceDomainPublicAuth(
    args: ToggleNamespaceDomainPublicAuthCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ToggleNamespaceDomainPublicAuthCommandOutput>;
  public toggleNamespaceDomainPublicAuth(
    args: ToggleNamespaceDomainPublicAuthCommandInput,
    cb: (err: any, data?: ToggleNamespaceDomainPublicAuthCommandOutput) => void
  ): void;
  public toggleNamespaceDomainPublicAuth(
    args: ToggleNamespaceDomainPublicAuthCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ToggleNamespaceDomainPublicAuthCommandOutput) => void
  ): void;
  public toggleNamespaceDomainPublicAuth(
    args: ToggleNamespaceDomainPublicAuthCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ToggleNamespaceDomainPublicAuthCommandOutput) => void),
    cb?: (err: any, data?: ToggleNamespaceDomainPublicAuthCommandOutput) => void
  ): Promise<ToggleNamespaceDomainPublicAuthCommandOutput> | void {
    const command = new ToggleNamespaceDomainPublicAuthCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Updates matchmaker config for the given game namespace.
   */
  public updateGameNamespaceMatchmakerConfig(
    args: UpdateGameNamespaceMatchmakerConfigCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<UpdateGameNamespaceMatchmakerConfigCommandOutput>;
  public updateGameNamespaceMatchmakerConfig(
    args: UpdateGameNamespaceMatchmakerConfigCommandInput,
    cb: (err: any, data?: UpdateGameNamespaceMatchmakerConfigCommandOutput) => void
  ): void;
  public updateGameNamespaceMatchmakerConfig(
    args: UpdateGameNamespaceMatchmakerConfigCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateGameNamespaceMatchmakerConfigCommandOutput) => void
  ): void;
  public updateGameNamespaceMatchmakerConfig(
    args: UpdateGameNamespaceMatchmakerConfigCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateGameNamespaceMatchmakerConfigCommandOutput) => void),
    cb?: (err: any, data?: UpdateGameNamespaceMatchmakerConfigCommandOutput) => void
  ): Promise<UpdateGameNamespaceMatchmakerConfigCommandOutput> | void {
    const command = new UpdateGameNamespaceMatchmakerConfigCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Updates the version of a game namespace.
   */
  public updateGameNamespaceVersion(
    args: UpdateGameNamespaceVersionCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<UpdateGameNamespaceVersionCommandOutput>;
  public updateGameNamespaceVersion(
    args: UpdateGameNamespaceVersionCommandInput,
    cb: (err: any, data?: UpdateGameNamespaceVersionCommandOutput) => void
  ): void;
  public updateGameNamespaceVersion(
    args: UpdateGameNamespaceVersionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateGameNamespaceVersionCommandOutput) => void
  ): void;
  public updateGameNamespaceVersion(
    args: UpdateGameNamespaceVersionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateGameNamespaceVersionCommandOutput) => void),
    cb?: (err: any, data?: UpdateGameNamespaceVersionCommandOutput) => void
  ): Promise<UpdateGameNamespaceVersionCommandOutput> | void {
    const command = new UpdateGameNamespaceVersionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Adds an authenticated user to the given game namespace.
   */
  public updateNamespaceCdnAuthUser(
    args: UpdateNamespaceCdnAuthUserCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<UpdateNamespaceCdnAuthUserCommandOutput>;
  public updateNamespaceCdnAuthUser(
    args: UpdateNamespaceCdnAuthUserCommandInput,
    cb: (err: any, data?: UpdateNamespaceCdnAuthUserCommandOutput) => void
  ): void;
  public updateNamespaceCdnAuthUser(
    args: UpdateNamespaceCdnAuthUserCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UpdateNamespaceCdnAuthUserCommandOutput) => void
  ): void;
  public updateNamespaceCdnAuthUser(
    args: UpdateNamespaceCdnAuthUserCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UpdateNamespaceCdnAuthUserCommandOutput) => void),
    cb?: (err: any, data?: UpdateNamespaceCdnAuthUserCommandOutput) => void
  ): Promise<UpdateNamespaceCdnAuthUserCommandOutput> | void {
    const command = new UpdateNamespaceCdnAuthUserCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Validates information used to create a new game.
   */
  public validateGame(
    args: ValidateGameCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ValidateGameCommandOutput>;
  public validateGame(
    args: ValidateGameCommandInput,
    cb: (err: any, data?: ValidateGameCommandOutput) => void
  ): void;
  public validateGame(
    args: ValidateGameCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ValidateGameCommandOutput) => void
  ): void;
  public validateGame(
    args: ValidateGameCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ValidateGameCommandOutput) => void),
    cb?: (err: any, data?: ValidateGameCommandOutput) => void
  ): Promise<ValidateGameCommandOutput> | void {
    const command = new ValidateGameCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Validates information used to create a new game namespace.
   */
  public validateGameNamespace(
    args: ValidateGameNamespaceCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ValidateGameNamespaceCommandOutput>;
  public validateGameNamespace(
    args: ValidateGameNamespaceCommandInput,
    cb: (err: any, data?: ValidateGameNamespaceCommandOutput) => void
  ): void;
  public validateGameNamespace(
    args: ValidateGameNamespaceCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ValidateGameNamespaceCommandOutput) => void
  ): void;
  public validateGameNamespace(
    args: ValidateGameNamespaceCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ValidateGameNamespaceCommandOutput) => void),
    cb?: (err: any, data?: ValidateGameNamespaceCommandOutput) => void
  ): Promise<ValidateGameNamespaceCommandOutput> | void {
    const command = new ValidateGameNamespaceCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Validates information used to update a game namespace's matchmaker config.
   */
  public validateGameNamespaceMatchmakerConfig(
    args: ValidateGameNamespaceMatchmakerConfigCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ValidateGameNamespaceMatchmakerConfigCommandOutput>;
  public validateGameNamespaceMatchmakerConfig(
    args: ValidateGameNamespaceMatchmakerConfigCommandInput,
    cb: (err: any, data?: ValidateGameNamespaceMatchmakerConfigCommandOutput) => void
  ): void;
  public validateGameNamespaceMatchmakerConfig(
    args: ValidateGameNamespaceMatchmakerConfigCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ValidateGameNamespaceMatchmakerConfigCommandOutput) => void
  ): void;
  public validateGameNamespaceMatchmakerConfig(
    args: ValidateGameNamespaceMatchmakerConfigCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ValidateGameNamespaceMatchmakerConfigCommandOutput) => void),
    cb?: (err: any, data?: ValidateGameNamespaceMatchmakerConfigCommandOutput) => void
  ): Promise<ValidateGameNamespaceMatchmakerConfigCommandOutput> | void {
    const command = new ValidateGameNamespaceMatchmakerConfigCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Validates information used to create a new game namespace development token.
   */
  public validateGameNamespaceTokenDevelopment(
    args: ValidateGameNamespaceTokenDevelopmentCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ValidateGameNamespaceTokenDevelopmentCommandOutput>;
  public validateGameNamespaceTokenDevelopment(
    args: ValidateGameNamespaceTokenDevelopmentCommandInput,
    cb: (err: any, data?: ValidateGameNamespaceTokenDevelopmentCommandOutput) => void
  ): void;
  public validateGameNamespaceTokenDevelopment(
    args: ValidateGameNamespaceTokenDevelopmentCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ValidateGameNamespaceTokenDevelopmentCommandOutput) => void
  ): void;
  public validateGameNamespaceTokenDevelopment(
    args: ValidateGameNamespaceTokenDevelopmentCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ValidateGameNamespaceTokenDevelopmentCommandOutput) => void),
    cb?: (err: any, data?: ValidateGameNamespaceTokenDevelopmentCommandOutput) => void
  ): Promise<ValidateGameNamespaceTokenDevelopmentCommandOutput> | void {
    const command = new ValidateGameNamespaceTokenDevelopmentCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Validates information used to create a new game version.
   */
  public validateGameVersion(
    args: ValidateGameVersionCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ValidateGameVersionCommandOutput>;
  public validateGameVersion(
    args: ValidateGameVersionCommandInput,
    cb: (err: any, data?: ValidateGameVersionCommandOutput) => void
  ): void;
  public validateGameVersion(
    args: ValidateGameVersionCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ValidateGameVersionCommandOutput) => void
  ): void;
  public validateGameVersion(
    args: ValidateGameVersionCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ValidateGameVersionCommandOutput) => void),
    cb?: (err: any, data?: ValidateGameVersionCommandOutput) => void
  ): Promise<ValidateGameVersionCommandOutput> | void {
    const command = new ValidateGameVersionCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Validates information used to create a new group.
   */
  public validateGroup(
    args: ValidateGroupCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ValidateGroupCommandOutput>;
  public validateGroup(
    args: ValidateGroupCommandInput,
    cb: (err: any, data?: ValidateGroupCommandOutput) => void
  ): void;
  public validateGroup(
    args: ValidateGroupCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ValidateGroupCommandOutput) => void
  ): void;
  public validateGroup(
    args: ValidateGroupCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ValidateGroupCommandOutput) => void),
    cb?: (err: any, data?: ValidateGroupCommandOutput) => void
  ): Promise<ValidateGroupCommandOutput> | void {
    const command = new ValidateGroupCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

}
