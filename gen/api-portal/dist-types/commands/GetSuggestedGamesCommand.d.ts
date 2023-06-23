import { PortalServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PortalServiceClient";
import { GetSuggestedGamesInput, GetSuggestedGamesOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetSuggestedGamesCommandInput extends GetSuggestedGamesInput {
}
export interface GetSuggestedGamesCommandOutput extends GetSuggestedGamesOutput, __MetadataBearer {
}
/**
 * Returns a list of games on the arcade page.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, GetSuggestedGamesCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, GetSuggestedGamesCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new GetSuggestedGamesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetSuggestedGamesCommandInput} for command's `input` shape.
 * @see {@link GetSuggestedGamesCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export declare class GetSuggestedGamesCommand extends $Command<GetSuggestedGamesCommandInput, GetSuggestedGamesCommandOutput, PortalServiceClientResolvedConfig> {
    readonly input: GetSuggestedGamesCommandInput;
    constructor(input: GetSuggestedGamesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PortalServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetSuggestedGamesCommandInput, GetSuggestedGamesCommandOutput>;
    private serialize;
    private deserialize;
}
