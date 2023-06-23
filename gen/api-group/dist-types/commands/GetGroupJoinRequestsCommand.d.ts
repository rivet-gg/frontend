import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { GetGroupJoinRequestsInput, GetGroupJoinRequestsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupJoinRequestsCommandInput extends GetGroupJoinRequestsInput {
}
export interface GetGroupJoinRequestsCommandOutput extends GetGroupJoinRequestsOutput, __MetadataBearer {
}
/**
 * Returns a group's join requests. Must have valid permissions to view.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, GetGroupJoinRequestsCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, GetGroupJoinRequestsCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new GetGroupJoinRequestsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupJoinRequestsCommandInput} for command's `input` shape.
 * @see {@link GetGroupJoinRequestsCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class GetGroupJoinRequestsCommand extends $Command<GetGroupJoinRequestsCommandInput, GetGroupJoinRequestsCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: GetGroupJoinRequestsCommandInput;
    constructor(input: GetGroupJoinRequestsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupJoinRequestsCommandInput, GetGroupJoinRequestsCommandOutput>;
    private serialize;
    private deserialize;
}
