import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { CreateGroupInput, CreateGroupOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGroupCommandInput extends CreateGroupInput {
}
export interface CreateGroupCommandOutput extends CreateGroupOutput, __MetadataBearer {
}
/**
 * Creates a new group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, CreateGroupCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, CreateGroupCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new CreateGroupCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGroupCommandInput} for command's `input` shape.
 * @see {@link CreateGroupCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class CreateGroupCommand extends $Command<CreateGroupCommandInput, CreateGroupCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: CreateGroupCommandInput;
    constructor(input: CreateGroupCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGroupCommandInput, CreateGroupCommandOutput>;
    private serialize;
    private deserialize;
}
