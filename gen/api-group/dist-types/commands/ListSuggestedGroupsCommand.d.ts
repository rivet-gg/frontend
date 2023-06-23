import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { ListSuggestedGroupsInput, ListSuggestedGroupsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListSuggestedGroupsCommandInput extends ListSuggestedGroupsInput {
}
export interface ListSuggestedGroupsCommandOutput extends ListSuggestedGroupsOutput, __MetadataBearer {
}
/**
 * Returns a list of suggested groups.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ListSuggestedGroupsCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ListSuggestedGroupsCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ListSuggestedGroupsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListSuggestedGroupsCommandInput} for command's `input` shape.
 * @see {@link ListSuggestedGroupsCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class ListSuggestedGroupsCommand extends $Command<ListSuggestedGroupsCommandInput, ListSuggestedGroupsCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: ListSuggestedGroupsCommandInput;
    constructor(input: ListSuggestedGroupsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListSuggestedGroupsCommandInput, ListSuggestedGroupsCommandOutput>;
    private serialize;
    private deserialize;
}
