import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { GetGroupMembersInput, GetGroupMembersOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupMembersCommandInput extends GetGroupMembersInput {
}
export interface GetGroupMembersCommandOutput extends GetGroupMembersOutput, __MetadataBearer {
}
/**
 * Returns a group's members.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, GetGroupMembersCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, GetGroupMembersCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new GetGroupMembersCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupMembersCommandInput} for command's `input` shape.
 * @see {@link GetGroupMembersCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class GetGroupMembersCommand extends $Command<GetGroupMembersCommandInput, GetGroupMembersCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: GetGroupMembersCommandInput;
    constructor(input: GetGroupMembersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupMembersCommandInput, GetGroupMembersCommandOutput>;
    private serialize;
    private deserialize;
}
