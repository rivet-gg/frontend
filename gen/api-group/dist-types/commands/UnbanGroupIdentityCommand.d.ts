import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { UnbanGroupIdentityInput, UnbanGroupIdentityOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UnbanGroupIdentityCommandInput extends UnbanGroupIdentityInput {
}
export interface UnbanGroupIdentityCommandOutput extends UnbanGroupIdentityOutput, __MetadataBearer {
}
/**
 * Unbans an identity from a group. Must be the owner of the group to perform this action.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, UnbanGroupIdentityCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, UnbanGroupIdentityCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new UnbanGroupIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UnbanGroupIdentityCommandInput} for command's `input` shape.
 * @see {@link UnbanGroupIdentityCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class UnbanGroupIdentityCommand extends $Command<UnbanGroupIdentityCommandInput, UnbanGroupIdentityCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: UnbanGroupIdentityCommandInput;
    constructor(input: UnbanGroupIdentityCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UnbanGroupIdentityCommandInput, UnbanGroupIdentityCommandOutput>;
    private serialize;
    private deserialize;
}
