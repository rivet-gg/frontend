import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { CancelGameLinkInput, CancelGameLinkOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CancelGameLinkCommandInput extends CancelGameLinkInput {
}
export interface CancelGameLinkCommandOutput extends CancelGameLinkOutput, __MetadataBearer {
}
/**
 * Cancels a game link. It can no longer be used to link after cancellation.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IdentityServiceClient, CancelGameLinkCommand } from "@rivet-gg/identity"; // ES Modules import
 * // const { IdentityServiceClient, CancelGameLinkCommand } = require("@rivet-gg/identity"); // CommonJS import
 * const client = new IdentityServiceClient(config);
 * const command = new CancelGameLinkCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CancelGameLinkCommandInput} for command's `input` shape.
 * @see {@link CancelGameLinkCommandOutput} for command's `response` shape.
 * @see {@link IdentityServiceClientResolvedConfig | config} for IdentityServiceClient's `config` shape.
 *
 */
export declare class CancelGameLinkCommand extends $Command<CancelGameLinkCommandInput, CancelGameLinkCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: CancelGameLinkCommandInput;
    constructor(input: CancelGameLinkCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CancelGameLinkCommandInput, CancelGameLinkCommandOutput>;
    private serialize;
    private deserialize;
}
