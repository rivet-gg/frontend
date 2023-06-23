import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ExportLobbyLogsInput, ExportLobbyLogsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ExportLobbyLogsCommandInput extends ExportLobbyLogsInput {
}
export interface ExportLobbyLogsCommandOutput extends ExportLobbyLogsOutput, __MetadataBearer {
}
/**
 * Generates a download URL for logs.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ExportLobbyLogsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ExportLobbyLogsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ExportLobbyLogsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ExportLobbyLogsCommandInput} for command's `input` shape.
 * @see {@link ExportLobbyLogsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ExportLobbyLogsCommand extends $Command<ExportLobbyLogsCommandInput, ExportLobbyLogsCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ExportLobbyLogsCommandInput;
    constructor(input: ExportLobbyLogsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ExportLobbyLogsCommandInput, ExportLobbyLogsCommandOutput>;
    private serialize;
    private deserialize;
}
