import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { UnmarkDeletionInput, UnmarkDeletionOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UnmarkDeletionCommandInput extends UnmarkDeletionInput {
}
export interface UnmarkDeletionCommandOutput extends UnmarkDeletionOutput, __MetadataBearer {
}
/**
 * Unmarks this identity from deletion.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IdentityServiceClient, UnmarkDeletionCommand } from "@rivet-gg/identity"; // ES Modules import
 * // const { IdentityServiceClient, UnmarkDeletionCommand } = require("@rivet-gg/identity"); // CommonJS import
 * const client = new IdentityServiceClient(config);
 * const command = new UnmarkDeletionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UnmarkDeletionCommandInput} for command's `input` shape.
 * @see {@link UnmarkDeletionCommandOutput} for command's `response` shape.
 * @see {@link IdentityServiceClientResolvedConfig | config} for IdentityServiceClient's `config` shape.
 *
 */
export declare class UnmarkDeletionCommand extends $Command<UnmarkDeletionCommandInput, UnmarkDeletionCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: UnmarkDeletionCommandInput;
    constructor(input: UnmarkDeletionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UnmarkDeletionCommandInput, UnmarkDeletionCommandOutput>;
    private serialize;
    private deserialize;
}
