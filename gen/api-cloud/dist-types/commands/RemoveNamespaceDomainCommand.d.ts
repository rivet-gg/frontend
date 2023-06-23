import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { RemoveNamespaceDomainInput, RemoveNamespaceDomainOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface RemoveNamespaceDomainCommandInput extends RemoveNamespaceDomainInput {
}
export interface RemoveNamespaceDomainCommandOutput extends RemoveNamespaceDomainOutput, __MetadataBearer {
}
/**
 * Removes a domain from the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, RemoveNamespaceDomainCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, RemoveNamespaceDomainCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new RemoveNamespaceDomainCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RemoveNamespaceDomainCommandInput} for command's `input` shape.
 * @see {@link RemoveNamespaceDomainCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class RemoveNamespaceDomainCommand extends $Command<RemoveNamespaceDomainCommandInput, RemoveNamespaceDomainCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: RemoveNamespaceDomainCommandInput;
    constructor(input: RemoveNamespaceDomainCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RemoveNamespaceDomainCommandInput, RemoveNamespaceDomainCommandOutput>;
    private serialize;
    private deserialize;
}
