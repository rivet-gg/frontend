import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { PrepareGroupAvatarUploadInput, PrepareGroupAvatarUploadOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface PrepareGroupAvatarUploadCommandInput extends PrepareGroupAvatarUploadInput {
}
export interface PrepareGroupAvatarUploadCommandOutput extends PrepareGroupAvatarUploadOutput, __MetadataBearer {
}
/**
 * Prepares an avatar image upload.
 *
 * Complete upload with `rivet.api.group#CompleteGroupAvatarUpload`.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, PrepareGroupAvatarUploadCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, PrepareGroupAvatarUploadCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new PrepareGroupAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PrepareGroupAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link PrepareGroupAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class PrepareGroupAvatarUploadCommand extends $Command<PrepareGroupAvatarUploadCommandInput, PrepareGroupAvatarUploadCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: PrepareGroupAvatarUploadCommandInput;
    constructor(input: PrepareGroupAvatarUploadCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<PrepareGroupAvatarUploadCommandInput, PrepareGroupAvatarUploadCommandOutput>;
    private serialize;
    private deserialize;
}
