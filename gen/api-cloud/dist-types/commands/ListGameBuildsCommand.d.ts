import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ListGameBuildsInput, ListGameBuildsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListGameBuildsCommandInput extends ListGameBuildsInput {
}
export interface ListGameBuildsCommandOutput extends ListGameBuildsOutput, __MetadataBearer {
}
/**
 * Lists game builds for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ListGameBuildsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ListGameBuildsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ListGameBuildsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListGameBuildsCommandInput} for command's `input` shape.
 * @see {@link ListGameBuildsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ListGameBuildsCommand extends $Command<ListGameBuildsCommandInput, ListGameBuildsCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ListGameBuildsCommandInput;
    constructor(input: ListGameBuildsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListGameBuildsCommandInput, ListGameBuildsCommandOutput>;
    private serialize;
    private deserialize;
}
