import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGamesInput, GetGamesOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGamesCommandInput extends GetGamesInput {
}
export interface GetGamesCommandOutput extends GetGamesOutput, __MetadataBearer {
}
/**
 * Returns a list of games in which the current identity is a group member of its development team.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGamesCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGamesCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGamesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGamesCommandInput} for command's `input` shape.
 * @see {@link GetGamesCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGamesCommand extends $Command<GetGamesCommandInput, GetGamesCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGamesCommandInput;
    constructor(input: GetGamesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGamesCommandInput, GetGamesCommandOutput>;
    private serialize;
    private deserialize;
}
