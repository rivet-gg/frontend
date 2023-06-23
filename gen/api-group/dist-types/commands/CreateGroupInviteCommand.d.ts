import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { CreateGroupInviteInput, CreateGroupInviteOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGroupInviteCommandInput extends CreateGroupInviteInput {
}
export interface CreateGroupInviteCommandOutput extends CreateGroupInviteOutput, __MetadataBearer {
}
/**
 * Creates a group invite. Can be shared with other identities to let them join
 * this group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, CreateGroupInviteCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, CreateGroupInviteCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new CreateGroupInviteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGroupInviteCommandInput} for command's `input` shape.
 * @see {@link CreateGroupInviteCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class CreateGroupInviteCommand extends $Command<CreateGroupInviteCommandInput, CreateGroupInviteCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: CreateGroupInviteCommandInput;
    constructor(input: CreateGroupInviteCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGroupInviteCommandInput, CreateGroupInviteCommandOutput>;
    private serialize;
    private deserialize;
}
