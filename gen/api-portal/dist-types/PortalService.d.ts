import { PortalServiceClient } from "./PortalServiceClient";
import { GetGameProfileCommandInput, GetGameProfileCommandOutput } from "./commands/GetGameProfileCommand";
import { GetSuggestedGamesCommandInput, GetSuggestedGamesCommandOutput } from "./commands/GetSuggestedGamesCommand";
import { RegisterNotificationsCommandInput, RegisterNotificationsCommandOutput } from "./commands/RegisterNotificationsCommand";
import { ResolveBetaJoinRequestCommandInput, ResolveBetaJoinRequestCommandOutput } from "./commands/ResolveBetaJoinRequestCommand";
import { UnregisterNotificationsCommandInput, UnregisterNotificationsCommandOutput } from "./commands/UnregisterNotificationsCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
export declare class PortalService extends PortalServiceClient {
    /**
     * Returns a game profile.
     */
    getGameProfile(args: GetGameProfileCommandInput, options?: __HttpHandlerOptions): Promise<GetGameProfileCommandOutput>;
    getGameProfile(args: GetGameProfileCommandInput, cb: (err: any, data?: GetGameProfileCommandOutput) => void): void;
    getGameProfile(args: GetGameProfileCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetGameProfileCommandOutput) => void): void;
    /**
     * Returns a list of games on the arcade page.
     */
    getSuggestedGames(args: GetSuggestedGamesCommandInput, options?: __HttpHandlerOptions): Promise<GetSuggestedGamesCommandOutput>;
    getSuggestedGames(args: GetSuggestedGamesCommandInput, cb: (err: any, data?: GetSuggestedGamesCommandOutput) => void): void;
    getSuggestedGames(args: GetSuggestedGamesCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: GetSuggestedGamesCommandOutput) => void): void;
    /**
     * Registers push notifications for the current identity.
     */
    registerNotifications(args: RegisterNotificationsCommandInput, options?: __HttpHandlerOptions): Promise<RegisterNotificationsCommandOutput>;
    registerNotifications(args: RegisterNotificationsCommandInput, cb: (err: any, data?: RegisterNotificationsCommandOutput) => void): void;
    registerNotifications(args: RegisterNotificationsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RegisterNotificationsCommandOutput) => void): void;
    /**
     * Resolves a beta join request for a given identity.
     */
    resolveBetaJoinRequest(args: ResolveBetaJoinRequestCommandInput, options?: __HttpHandlerOptions): Promise<ResolveBetaJoinRequestCommandOutput>;
    resolveBetaJoinRequest(args: ResolveBetaJoinRequestCommandInput, cb: (err: any, data?: ResolveBetaJoinRequestCommandOutput) => void): void;
    resolveBetaJoinRequest(args: ResolveBetaJoinRequestCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: ResolveBetaJoinRequestCommandOutput) => void): void;
    /**
     * Unregister push notification for the current identity.
     */
    unregisterNotifications(args: UnregisterNotificationsCommandInput, options?: __HttpHandlerOptions): Promise<UnregisterNotificationsCommandOutput>;
    unregisterNotifications(args: UnregisterNotificationsCommandInput, cb: (err: any, data?: UnregisterNotificationsCommandOutput) => void): void;
    unregisterNotifications(args: UnregisterNotificationsCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: UnregisterNotificationsCommandOutput) => void): void;
}
