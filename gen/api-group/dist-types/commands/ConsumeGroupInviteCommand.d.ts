import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { ConsumeGroupInviteInput, ConsumeGroupInviteOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ConsumeGroupInviteCommandInput extends ConsumeGroupInviteInput {
}
export interface ConsumeGroupInviteCommandOutput extends ConsumeGroupInviteOutput, __MetadataBearer {
}
/**
 * Consumes a group invite to join a group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ConsumeGroupInviteCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ConsumeGroupInviteCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ConsumeGroupInviteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ConsumeGroupInviteCommandInput} for command's `input` shape.
 * @see {@link ConsumeGroupInviteCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class ConsumeGroupInviteCommand extends $Command<ConsumeGroupInviteCommandInput, ConsumeGroupInviteCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: ConsumeGroupInviteCommandInput;
    constructor(input: ConsumeGroupInviteCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ConsumeGroupInviteCommandInput, ConsumeGroupInviteCommandOutput>;
    private serialize;
    private deserialize;
}
