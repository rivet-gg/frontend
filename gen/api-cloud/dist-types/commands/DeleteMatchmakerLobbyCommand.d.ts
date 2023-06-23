import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { DeleteMatchmakerLobbyInput, DeleteMatchmakerLobbyOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface DeleteMatchmakerLobbyCommandInput extends DeleteMatchmakerLobbyInput {
}
export interface DeleteMatchmakerLobbyCommandOutput extends DeleteMatchmakerLobbyOutput, __MetadataBearer {
}
/**
 * Deletes a matchmaker lobby, stopping it immediately.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, DeleteMatchmakerLobbyCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, DeleteMatchmakerLobbyCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new DeleteMatchmakerLobbyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteMatchmakerLobbyCommandInput} for command's `input` shape.
 * @see {@link DeleteMatchmakerLobbyCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class DeleteMatchmakerLobbyCommand extends $Command<DeleteMatchmakerLobbyCommandInput, DeleteMatchmakerLobbyCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: DeleteMatchmakerLobbyCommandInput;
    constructor(input: DeleteMatchmakerLobbyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteMatchmakerLobbyCommandInput, DeleteMatchmakerLobbyCommandOutput>;
    private serialize;
    private deserialize;
}
