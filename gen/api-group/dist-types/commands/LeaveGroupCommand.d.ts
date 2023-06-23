import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { LeaveGroupInput, LeaveGroupOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface LeaveGroupCommandInput extends LeaveGroupInput {
}
export interface LeaveGroupCommandOutput extends LeaveGroupOutput, __MetadataBearer {
}
/**
 * Leaves a group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, LeaveGroupCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, LeaveGroupCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new LeaveGroupCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link LeaveGroupCommandInput} for command's `input` shape.
 * @see {@link LeaveGroupCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class LeaveGroupCommand extends $Command<LeaveGroupCommandInput, LeaveGroupCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: LeaveGroupCommandInput;
    constructor(input: LeaveGroupCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<LeaveGroupCommandInput, LeaveGroupCommandOutput>;
    private serialize;
    private deserialize;
}
