import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { GetGroupBansInput, GetGroupBansOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupBansCommandInput extends GetGroupBansInput {
}
export interface GetGroupBansCommandOutput extends GetGroupBansOutput, __MetadataBearer {
}
/**
 * Returns a group's bans. Must have valid permissions to view.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, GetGroupBansCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, GetGroupBansCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new GetGroupBansCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupBansCommandInput} for command's `input` shape.
 * @see {@link GetGroupBansCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class GetGroupBansCommand extends $Command<GetGroupBansCommandInput, GetGroupBansCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: GetGroupBansCommandInput;
    constructor(input: GetGroupBansCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupBansCommandInput, GetGroupBansCommandOutput>;
    private serialize;
    private deserialize;
}
