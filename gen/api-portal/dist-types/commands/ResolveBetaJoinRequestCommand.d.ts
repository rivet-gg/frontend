import { PortalServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PortalServiceClient";
import { ResolveBetaJoinRequestInput, ResolveBetaJoinRequestOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ResolveBetaJoinRequestCommandInput extends ResolveBetaJoinRequestInput {
}
export interface ResolveBetaJoinRequestCommandOutput extends ResolveBetaJoinRequestOutput, __MetadataBearer {
}
/**
 * Resolves a beta join request for a given identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, ResolveBetaJoinRequestCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, ResolveBetaJoinRequestCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new ResolveBetaJoinRequestCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ResolveBetaJoinRequestCommandInput} for command's `input` shape.
 * @see {@link ResolveBetaJoinRequestCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export declare class ResolveBetaJoinRequestCommand extends $Command<ResolveBetaJoinRequestCommandInput, ResolveBetaJoinRequestCommandOutput, PortalServiceClientResolvedConfig> {
    readonly input: ResolveBetaJoinRequestCommandInput;
    constructor(input: ResolveBetaJoinRequestCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PortalServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ResolveBetaJoinRequestCommandInput, ResolveBetaJoinRequestCommandOutput>;
    private serialize;
    private deserialize;
}
