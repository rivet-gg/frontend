import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { SearchGroupsInput, SearchGroupsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface SearchGroupsCommandInput extends SearchGroupsInput {
}
export interface SearchGroupsCommandOutput extends SearchGroupsOutput, __MetadataBearer {
}
/**
 * Fuzzy search for groups.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, SearchGroupsCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, SearchGroupsCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new SearchGroupsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SearchGroupsCommandInput} for command's `input` shape.
 * @see {@link SearchGroupsCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class SearchGroupsCommand extends $Command<SearchGroupsCommandInput, SearchGroupsCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: SearchGroupsCommandInput;
    constructor(input: SearchGroupsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SearchGroupsCommandInput, SearchGroupsCommandOutput>;
    private serialize;
    private deserialize;
}
