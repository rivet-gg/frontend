import { AuthServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../AuthServiceClient";
import { RefreshIdentityTokenInput, RefreshIdentityTokenOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface RefreshIdentityTokenCommandInput extends RefreshIdentityTokenInput {
}
export interface RefreshIdentityTokenCommandOutput extends RefreshIdentityTokenOutput, __MetadataBearer {
}
/**
 * Refreshes the current identity's token and sets authentication headers.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { AuthServiceClient, RefreshIdentityTokenCommand } from "@rivet-gg/auth"; // ES Modules import
 * // const { AuthServiceClient, RefreshIdentityTokenCommand } = require("@rivet-gg/auth"); // CommonJS import
 * const client = new AuthServiceClient(config);
 * const command = new RefreshIdentityTokenCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RefreshIdentityTokenCommandInput} for command's `input` shape.
 * @see {@link RefreshIdentityTokenCommandOutput} for command's `response` shape.
 * @see {@link AuthServiceClientResolvedConfig | config} for AuthServiceClient's `config` shape.
 *
 */
export declare class RefreshIdentityTokenCommand extends $Command<RefreshIdentityTokenCommandInput, RefreshIdentityTokenCommandOutput, AuthServiceClientResolvedConfig> {
    readonly input: RefreshIdentityTokenCommandInput;
    constructor(input: RefreshIdentityTokenCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: AuthServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RefreshIdentityTokenCommandInput, RefreshIdentityTokenCommandOutput>;
    private serialize;
    private deserialize;
}
