import { PortalServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PortalServiceClient";
import { GetGameProfileInput, GetGameProfileOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGameProfileCommandInput extends GetGameProfileInput {
}
export interface GetGameProfileCommandOutput extends GetGameProfileOutput, __MetadataBearer {
}
/**
 * Returns a game profile.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, GetGameProfileCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, GetGameProfileCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new GetGameProfileCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameProfileCommandInput} for command's `input` shape.
 * @see {@link GetGameProfileCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export declare class GetGameProfileCommand extends $Command<GetGameProfileCommandInput, GetGameProfileCommandOutput, PortalServiceClientResolvedConfig> {
    readonly input: GetGameProfileCommandInput;
    constructor(input: GetGameProfileCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PortalServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGameProfileCommandInput, GetGameProfileCommandOutput>;
    private serialize;
    private deserialize;
}
