import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { ResolveGroupJoinRequestInput, ResolveGroupJoinRequestOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ResolveGroupJoinRequestCommandInput extends ResolveGroupJoinRequestInput {
}
export interface ResolveGroupJoinRequestCommandOutput extends ResolveGroupJoinRequestOutput, __MetadataBearer {
}
/**
 * Resolves a join request for a given group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ResolveGroupJoinRequestCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ResolveGroupJoinRequestCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ResolveGroupJoinRequestCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ResolveGroupJoinRequestCommandInput} for command's `input` shape.
 * @see {@link ResolveGroupJoinRequestCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class ResolveGroupJoinRequestCommand extends $Command<ResolveGroupJoinRequestCommandInput, ResolveGroupJoinRequestCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: ResolveGroupJoinRequestCommandInput;
    constructor(input: ResolveGroupJoinRequestCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ResolveGroupJoinRequestCommandInput, ResolveGroupJoinRequestCommandOutput>;
    private serialize;
    private deserialize;
}
