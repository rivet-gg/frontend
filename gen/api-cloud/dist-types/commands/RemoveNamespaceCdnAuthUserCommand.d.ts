import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { RemoveNamespaceCdnAuthUserInput, RemoveNamespaceCdnAuthUserOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface RemoveNamespaceCdnAuthUserCommandInput extends RemoveNamespaceCdnAuthUserInput {
}
export interface RemoveNamespaceCdnAuthUserCommandOutput extends RemoveNamespaceCdnAuthUserOutput, __MetadataBearer {
}
/**
 * Removes an authenticated user from the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, RemoveNamespaceCdnAuthUserCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, RemoveNamespaceCdnAuthUserCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new RemoveNamespaceCdnAuthUserCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RemoveNamespaceCdnAuthUserCommandInput} for command's `input` shape.
 * @see {@link RemoveNamespaceCdnAuthUserCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class RemoveNamespaceCdnAuthUserCommand extends $Command<RemoveNamespaceCdnAuthUserCommandInput, RemoveNamespaceCdnAuthUserCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: RemoveNamespaceCdnAuthUserCommandInput;
    constructor(input: RemoveNamespaceCdnAuthUserCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RemoveNamespaceCdnAuthUserCommandInput, RemoveNamespaceCdnAuthUserCommandOutput>;
    private serialize;
    private deserialize;
}
