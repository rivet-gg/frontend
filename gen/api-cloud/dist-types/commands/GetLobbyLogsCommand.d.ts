import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetLobbyLogsInput, GetLobbyLogsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetLobbyLogsCommandInput extends GetLobbyLogsInput {
}
export interface GetLobbyLogsCommandOutput extends GetLobbyLogsOutput, __MetadataBearer {
}
/**
 * Returns the logs for a given lobby.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetLobbyLogsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetLobbyLogsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetLobbyLogsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetLobbyLogsCommandInput} for command's `input` shape.
 * @see {@link GetLobbyLogsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetLobbyLogsCommand extends $Command<GetLobbyLogsCommandInput, GetLobbyLogsCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetLobbyLogsCommandInput;
    constructor(input: GetLobbyLogsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetLobbyLogsCommandInput, GetLobbyLogsCommandOutput>;
    private serialize;
    private deserialize;
}
