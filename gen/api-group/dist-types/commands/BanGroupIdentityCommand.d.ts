import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { BanGroupIdentityInput, BanGroupIdentityOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface BanGroupIdentityCommandInput extends BanGroupIdentityInput {
}
export interface BanGroupIdentityCommandOutput extends BanGroupIdentityOutput, __MetadataBearer {
}
/**
 * Bans an identity from a group. Must be the owner of the group to perform this action. The banned identity
 * will no longer be able to create a join request or use a group invite.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, BanGroupIdentityCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, BanGroupIdentityCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new BanGroupIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link BanGroupIdentityCommandInput} for command's `input` shape.
 * @see {@link BanGroupIdentityCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class BanGroupIdentityCommand extends $Command<BanGroupIdentityCommandInput, BanGroupIdentityCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: BanGroupIdentityCommandInput;
    constructor(input: BanGroupIdentityCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BanGroupIdentityCommandInput, BanGroupIdentityCommandOutput>;
    private serialize;
    private deserialize;
}
