import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CompleteCustomAvatarUploadInput, CompleteCustomAvatarUploadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CompleteCustomAvatarUploadCommandInput extends CompleteCustomAvatarUploadInput {
}
export interface CompleteCustomAvatarUploadCommandOutput extends CompleteCustomAvatarUploadOutput, __MetadataBearer {
}
/**
 * Completes a custom avatar image upload. Must be called after the file upload process completes.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CompleteCustomAvatarUploadCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CompleteCustomAvatarUploadCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CompleteCustomAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CompleteCustomAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link CompleteCustomAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CompleteCustomAvatarUploadCommand extends $Command<CompleteCustomAvatarUploadCommandInput, CompleteCustomAvatarUploadCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CompleteCustomAvatarUploadCommandInput;
    constructor(input: CompleteCustomAvatarUploadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CompleteCustomAvatarUploadCommandInput, CompleteCustomAvatarUploadCommandOutput>;
    private serialize;
    private deserialize;
}
