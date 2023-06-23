import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { TransferGroupOwnershipInput, TransferGroupOwnershipOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface TransferGroupOwnershipCommandInput extends TransferGroupOwnershipInput {
}
export interface TransferGroupOwnershipCommandOutput extends TransferGroupOwnershipOutput, __MetadataBearer {
}
/**
 * Transfers ownership of a group to another identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, TransferGroupOwnershipCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, TransferGroupOwnershipCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new TransferGroupOwnershipCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link TransferGroupOwnershipCommandInput} for command's `input` shape.
 * @see {@link TransferGroupOwnershipCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class TransferGroupOwnershipCommand extends $Command<TransferGroupOwnershipCommandInput, TransferGroupOwnershipCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: TransferGroupOwnershipCommandInput;
    constructor(input: TransferGroupOwnershipCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<TransferGroupOwnershipCommandInput, TransferGroupOwnershipCommandOutput>;
    private serialize;
    private deserialize;
}
