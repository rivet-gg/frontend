import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { GetIdentityHandlesInput, GetIdentityHandlesOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetIdentityHandlesCommandInput extends GetIdentityHandlesInput {
}
export interface GetIdentityHandlesCommandOutput extends GetIdentityHandlesOutput, __MetadataBearer {
}
/**
 * Fetches a list of identity handles.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IdentityServiceClient, GetIdentityHandlesCommand } from "@rivet-gg/identity"; // ES Modules import
 * // const { IdentityServiceClient, GetIdentityHandlesCommand } = require("@rivet-gg/identity"); // CommonJS import
 * const client = new IdentityServiceClient(config);
 * const command = new GetIdentityHandlesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentityHandlesCommandInput} for command's `input` shape.
 * @see {@link GetIdentityHandlesCommandOutput} for command's `response` shape.
 * @see {@link IdentityServiceClientResolvedConfig | config} for IdentityServiceClient's `config` shape.
 *
 */
export declare class GetIdentityHandlesCommand extends $Command<GetIdentityHandlesCommandInput, GetIdentityHandlesCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: GetIdentityHandlesCommandInput;
    constructor(input: GetIdentityHandlesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetIdentityHandlesCommandInput, GetIdentityHandlesCommandOutput>;
    private serialize;
    private deserialize;
}
