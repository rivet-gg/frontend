import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ExportMatchmakerLobbyHistoryInput, ExportMatchmakerLobbyHistoryOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ExportMatchmakerLobbyHistoryCommandInput extends ExportMatchmakerLobbyHistoryInput {
}
export interface ExportMatchmakerLobbyHistoryCommandOutput extends ExportMatchmakerLobbyHistoryOutput, __MetadataBearer {
}
/**
 * Exports lobby history over a given query time span.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ExportMatchmakerLobbyHistoryCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ExportMatchmakerLobbyHistoryCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ExportMatchmakerLobbyHistoryCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ExportMatchmakerLobbyHistoryCommandInput} for command's `input` shape.
 * @see {@link ExportMatchmakerLobbyHistoryCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ExportMatchmakerLobbyHistoryCommand extends $Command<ExportMatchmakerLobbyHistoryCommandInput, ExportMatchmakerLobbyHistoryCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ExportMatchmakerLobbyHistoryCommandInput;
    constructor(input: ExportMatchmakerLobbyHistoryCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ExportMatchmakerLobbyHistoryCommandInput, ExportMatchmakerLobbyHistoryCommandOutput>;
    private serialize;
    private deserialize;
}
