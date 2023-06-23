import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CompleteUploadInput, CompleteUploadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CompleteUploadCommandInput extends CompleteUploadInput {
}
export interface CompleteUploadCommandOutput extends CompleteUploadOutput, __MetadataBearer {
}
/**
 * Marks an upload as complete.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CompleteUploadCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CompleteUploadCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CompleteUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CompleteUploadCommandInput} for command's `input` shape.
 * @see {@link CompleteUploadCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CompleteUploadCommand extends $Command<CompleteUploadCommandInput, CompleteUploadCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CompleteUploadCommandInput;
    constructor(input: CompleteUploadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CompleteUploadCommandInput, CompleteUploadCommandOutput>;
    private serialize;
    private deserialize;
}
