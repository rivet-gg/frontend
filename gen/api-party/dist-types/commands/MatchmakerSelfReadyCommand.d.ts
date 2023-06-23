import { PartyServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PartyServiceClient";
import { MatchmakerSelfReadyInput, MatchmakerSelfReadyOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface MatchmakerSelfReadyCommandInput extends MatchmakerSelfReadyInput {
}
export interface MatchmakerSelfReadyCommandOutput extends MatchmakerSelfReadyOutput, __MetadataBearer {
}
/**
 * Attempts to create a new matchmaker player for the current identity.
 *
 * If succeeds, the identity will receive a `GlobalEventMatchmakerLobbyJoin`
 * event with all the information required to join the lobby.
 *
 * Only relevant if the party is already in a matchmaker lobby.
 *
 * # When To Use This Endpoint
 *
 * ## Joining a Party Already In a Lobby
 *
 * When an identity joins a party that's already in a lobby, a new matchmaker
 * player will not automatically be created unless
 * `JoinParty#matchmaker_auto_join_lobby` is set to `true`.
 *
 * ## Leaving the Game and Returning
 *
 * If the user leaves the game and comes back but is still in the party, then
 * they will have to create a new matchmaker player.
 *
 * ## Failed to Connect to Lobby or Disconnected From Lobby
 *
 * If the user failed to establish a connection with the lobby or they got
 * disconnected, their matchmaker player will be removed. Use this endpoint to
 * create a new matchmaker player.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PartyServiceClient, MatchmakerSelfReadyCommand } from "@rivet-gg/party"; // ES Modules import
 * // const { PartyServiceClient, MatchmakerSelfReadyCommand } = require("@rivet-gg/party"); // CommonJS import
 * const client = new PartyServiceClient(config);
 * const command = new MatchmakerSelfReadyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link MatchmakerSelfReadyCommandInput} for command's `input` shape.
 * @see {@link MatchmakerSelfReadyCommandOutput} for command's `response` shape.
 * @see {@link PartyServiceClientResolvedConfig | config} for PartyServiceClient's `config` shape.
 *
 */
export declare class MatchmakerSelfReadyCommand extends $Command<MatchmakerSelfReadyCommandInput, MatchmakerSelfReadyCommandOutput, PartyServiceClientResolvedConfig> {
    readonly input: MatchmakerSelfReadyCommandInput;
    constructor(input: MatchmakerSelfReadyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PartyServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<MatchmakerSelfReadyCommandInput, MatchmakerSelfReadyCommandOutput>;
    private serialize;
    private deserialize;
}
