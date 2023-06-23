import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { GetGroupInviteInput, GetGroupInviteOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupInviteCommandInput extends GetGroupInviteInput {
}
export interface GetGroupInviteCommandOutput extends GetGroupInviteOutput, __MetadataBearer {
}
/**
 * Inspects a group invite returning information about the team that created it.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, GetGroupInviteCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, GetGroupInviteCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new GetGroupInviteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupInviteCommandInput} for command's `input` shape.
 * @see {@link GetGroupInviteCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class GetGroupInviteCommand extends $Command<GetGroupInviteCommandInput, GetGroupInviteCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: GetGroupInviteCommandInput;
    constructor(input: GetGroupInviteCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupInviteCommandInput, GetGroupInviteCommandOutput>;
    private serialize;
    private deserialize;
}
