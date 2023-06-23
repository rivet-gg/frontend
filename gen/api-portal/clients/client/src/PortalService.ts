// smithy-typescript generated code
import { PortalServiceClient } from "./PortalServiceClient";
import {
  GetGameProfileCommand,
  GetGameProfileCommandInput,
  GetGameProfileCommandOutput,
} from "./commands/GetGameProfileCommand";
import {
  GetSuggestedGamesCommand,
  GetSuggestedGamesCommandInput,
  GetSuggestedGamesCommandOutput,
} from "./commands/GetSuggestedGamesCommand";
import {
  RegisterNotificationsCommand,
  RegisterNotificationsCommandInput,
  RegisterNotificationsCommandOutput,
} from "./commands/RegisterNotificationsCommand";
import {
  ResolveBetaJoinRequestCommand,
  ResolveBetaJoinRequestCommandInput,
  ResolveBetaJoinRequestCommandOutput,
} from "./commands/ResolveBetaJoinRequestCommand";
import {
  UnregisterNotificationsCommand,
  UnregisterNotificationsCommandInput,
  UnregisterNotificationsCommandOutput,
} from "./commands/UnregisterNotificationsCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

export class PortalService extends PortalServiceClient {
  /**
   * Returns a game profile.
   */
  public getGameProfile(
    args: GetGameProfileCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetGameProfileCommandOutput>;
  public getGameProfile(
    args: GetGameProfileCommandInput,
    cb: (err: any, data?: GetGameProfileCommandOutput) => void
  ): void;
  public getGameProfile(
    args: GetGameProfileCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetGameProfileCommandOutput) => void
  ): void;
  public getGameProfile(
    args: GetGameProfileCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetGameProfileCommandOutput) => void),
    cb?: (err: any, data?: GetGameProfileCommandOutput) => void
  ): Promise<GetGameProfileCommandOutput> | void {
    const command = new GetGameProfileCommand(args);
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
   * Returns a list of games on the arcade page.
   */
  public getSuggestedGames(
    args: GetSuggestedGamesCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<GetSuggestedGamesCommandOutput>;
  public getSuggestedGames(
    args: GetSuggestedGamesCommandInput,
    cb: (err: any, data?: GetSuggestedGamesCommandOutput) => void
  ): void;
  public getSuggestedGames(
    args: GetSuggestedGamesCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: GetSuggestedGamesCommandOutput) => void
  ): void;
  public getSuggestedGames(
    args: GetSuggestedGamesCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: GetSuggestedGamesCommandOutput) => void),
    cb?: (err: any, data?: GetSuggestedGamesCommandOutput) => void
  ): Promise<GetSuggestedGamesCommandOutput> | void {
    const command = new GetSuggestedGamesCommand(args);
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
   * Registers push notifications for the current identity.
   */
  public registerNotifications(
    args: RegisterNotificationsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<RegisterNotificationsCommandOutput>;
  public registerNotifications(
    args: RegisterNotificationsCommandInput,
    cb: (err: any, data?: RegisterNotificationsCommandOutput) => void
  ): void;
  public registerNotifications(
    args: RegisterNotificationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: RegisterNotificationsCommandOutput) => void
  ): void;
  public registerNotifications(
    args: RegisterNotificationsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: RegisterNotificationsCommandOutput) => void),
    cb?: (err: any, data?: RegisterNotificationsCommandOutput) => void
  ): Promise<RegisterNotificationsCommandOutput> | void {
    const command = new RegisterNotificationsCommand(args);
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
   * Resolves a beta join request for a given identity.
   */
  public resolveBetaJoinRequest(
    args: ResolveBetaJoinRequestCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<ResolveBetaJoinRequestCommandOutput>;
  public resolveBetaJoinRequest(
    args: ResolveBetaJoinRequestCommandInput,
    cb: (err: any, data?: ResolveBetaJoinRequestCommandOutput) => void
  ): void;
  public resolveBetaJoinRequest(
    args: ResolveBetaJoinRequestCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: ResolveBetaJoinRequestCommandOutput) => void
  ): void;
  public resolveBetaJoinRequest(
    args: ResolveBetaJoinRequestCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: ResolveBetaJoinRequestCommandOutput) => void),
    cb?: (err: any, data?: ResolveBetaJoinRequestCommandOutput) => void
  ): Promise<ResolveBetaJoinRequestCommandOutput> | void {
    const command = new ResolveBetaJoinRequestCommand(args);
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
   * Unregister push notification for the current identity.
   */
  public unregisterNotifications(
    args: UnregisterNotificationsCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<UnregisterNotificationsCommandOutput>;
  public unregisterNotifications(
    args: UnregisterNotificationsCommandInput,
    cb: (err: any, data?: UnregisterNotificationsCommandOutput) => void
  ): void;
  public unregisterNotifications(
    args: UnregisterNotificationsCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: UnregisterNotificationsCommandOutput) => void
  ): void;
  public unregisterNotifications(
    args: UnregisterNotificationsCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: UnregisterNotificationsCommandOutput) => void),
    cb?: (err: any, data?: UnregisterNotificationsCommandOutput) => void
  ): Promise<UnregisterNotificationsCommandOutput> | void {
    const command = new UnregisterNotificationsCommand(args);
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
