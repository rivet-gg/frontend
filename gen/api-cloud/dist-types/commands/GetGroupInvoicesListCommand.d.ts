import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetGroupInvoicesListInput, GetGroupInvoicesListOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupInvoicesListCommandInput extends GetGroupInvoicesListInput {
}
export interface GetGroupInvoicesListCommandOutput extends GetGroupInvoicesListOutput, __MetadataBearer {
}
/**
 * Returns a list of invoices for the given group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGroupInvoicesListCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGroupInvoicesListCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGroupInvoicesListCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupInvoicesListCommandInput} for command's `input` shape.
 * @see {@link GetGroupInvoicesListCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetGroupInvoicesListCommand extends $Command<GetGroupInvoicesListCommandInput, GetGroupInvoicesListCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetGroupInvoicesListCommandInput;
    constructor(input: GetGroupInvoicesListCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupInvoicesListCommandInput, GetGroupInvoicesListCommandOutput>;
    private serialize;
    private deserialize;
}
