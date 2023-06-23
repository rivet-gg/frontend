import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { CompleteGroupAvatarUploadInput, CompleteGroupAvatarUploadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CompleteGroupAvatarUploadCommandInput extends CompleteGroupAvatarUploadInput {
}
export interface CompleteGroupAvatarUploadCommandOutput extends CompleteGroupAvatarUploadOutput, __MetadataBearer {
}
/**
 * Completes an avatar image upload. Must be called after the file upload
 * process completes.
 *
 * Call `rivet.api.group#PrepareGroupAvatarUpload` first.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, CompleteGroupAvatarUploadCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, CompleteGroupAvatarUploadCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new CompleteGroupAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CompleteGroupAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link CompleteGroupAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class CompleteGroupAvatarUploadCommand extends $Command<CompleteGroupAvatarUploadCommandInput, CompleteGroupAvatarUploadCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: CompleteGroupAvatarUploadCommandInput;
    constructor(input: CompleteGroupAvatarUploadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CompleteGroupAvatarUploadCommandInput, CompleteGroupAvatarUploadCommandOutput>;
    private serialize;
    private deserialize;
}
