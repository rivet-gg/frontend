import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { MarkDeletionInput, MarkDeletionOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface MarkDeletionCommandInput extends MarkDeletionInput {
}
export interface MarkDeletionCommandOutput extends MarkDeletionOutput, __MetadataBearer {
}
/**
 * Marks this identity for deletion.
 *
 * After 30 days the identity and all of it's content will be deleted, including chat messages and
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IdentityServiceClient, MarkDeletionCommand } from "@rivet-gg/identity"; // ES Modules import
 * // const { IdentityServiceClient, MarkDeletionCommand } = require("@rivet-gg/identity"); // CommonJS import
 * const client = new IdentityServiceClient(config);
 * const command = new MarkDeletionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link MarkDeletionCommandInput} for command's `input` shape.
 * @see {@link MarkDeletionCommandOutput} for command's `response` shape.
 * @see {@link IdentityServiceClientResolvedConfig | config} for IdentityServiceClient's `config` shape.
 *
 */
export declare class MarkDeletionCommand extends $Command<MarkDeletionCommandInput, MarkDeletionCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: MarkDeletionCommandInput;
    constructor(input: MarkDeletionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<MarkDeletionCommandInput, MarkDeletionCommandOutput>;
    private serialize;
    private deserialize;
}
