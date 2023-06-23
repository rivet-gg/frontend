import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { UpdateNamespaceCdnAuthUserInput, UpdateNamespaceCdnAuthUserOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UpdateNamespaceCdnAuthUserCommandInput extends UpdateNamespaceCdnAuthUserInput {
}
export interface UpdateNamespaceCdnAuthUserCommandOutput extends UpdateNamespaceCdnAuthUserOutput, __MetadataBearer {
}
/**
 * Adds an authenticated user to the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, UpdateNamespaceCdnAuthUserCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, UpdateNamespaceCdnAuthUserCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new UpdateNamespaceCdnAuthUserCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateNamespaceCdnAuthUserCommandInput} for command's `input` shape.
 * @see {@link UpdateNamespaceCdnAuthUserCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class UpdateNamespaceCdnAuthUserCommand extends $Command<UpdateNamespaceCdnAuthUserCommandInput, UpdateNamespaceCdnAuthUserCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: UpdateNamespaceCdnAuthUserCommandInput;
    constructor(input: UpdateNamespaceCdnAuthUserCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UpdateNamespaceCdnAuthUserCommandInput, UpdateNamespaceCdnAuthUserCommandOutput>;
    private serialize;
    private deserialize;
}
