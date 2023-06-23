import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { CreateGroupJoinRequestInput, CreateGroupJoinRequestOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGroupJoinRequestCommandInput extends CreateGroupJoinRequestInput {
}
export interface CreateGroupJoinRequestCommandOutput extends CreateGroupJoinRequestOutput, __MetadataBearer {
}
/**
 * Requests to join a group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, CreateGroupJoinRequestCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, CreateGroupJoinRequestCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new CreateGroupJoinRequestCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGroupJoinRequestCommandInput} for command's `input` shape.
 * @see {@link CreateGroupJoinRequestCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class CreateGroupJoinRequestCommand extends $Command<CreateGroupJoinRequestCommandInput, CreateGroupJoinRequestCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: CreateGroupJoinRequestCommandInput;
    constructor(input: CreateGroupJoinRequestCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGroupJoinRequestCommandInput, CreateGroupJoinRequestCommandOutput>;
    private serialize;
    private deserialize;
}
