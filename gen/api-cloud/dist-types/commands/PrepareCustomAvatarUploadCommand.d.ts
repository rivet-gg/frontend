import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { PrepareCustomAvatarUploadInput, PrepareCustomAvatarUploadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface PrepareCustomAvatarUploadCommandInput extends PrepareCustomAvatarUploadInput {
}
export interface PrepareCustomAvatarUploadCommandOutput extends PrepareCustomAvatarUploadOutput, __MetadataBearer {
}
/**
 * Prepares a custom avatar image upload.
 *
 * Complete upload with `rivet.api.cloud#CompleteCustomAvatarUpload`.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, PrepareCustomAvatarUploadCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, PrepareCustomAvatarUploadCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new PrepareCustomAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PrepareCustomAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link PrepareCustomAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class PrepareCustomAvatarUploadCommand extends $Command<PrepareCustomAvatarUploadCommandInput, PrepareCustomAvatarUploadCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: PrepareCustomAvatarUploadCommandInput;
    constructor(input: PrepareCustomAvatarUploadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PrepareCustomAvatarUploadCommandInput, PrepareCustomAvatarUploadCommandOutput>;
    private serialize;
    private deserialize;
}
