import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { KickGroupMemberInput, KickGroupMemberOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface KickGroupMemberCommandInput extends KickGroupMemberInput {
}
export interface KickGroupMemberCommandOutput extends KickGroupMemberOutput, __MetadataBearer {
}
/**
 * Kicks an identity from a group. Must be the owner of the group to perform this action.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, KickGroupMemberCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, KickGroupMemberCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new KickGroupMemberCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link KickGroupMemberCommandInput} for command's `input` shape.
 * @see {@link KickGroupMemberCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class KickGroupMemberCommand extends $Command<KickGroupMemberCommandInput, KickGroupMemberCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: KickGroupMemberCommandInput;
    constructor(input: KickGroupMemberCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<KickGroupMemberCommandInput, KickGroupMemberCommandOutput>;
    private serialize;
    private deserialize;
}
