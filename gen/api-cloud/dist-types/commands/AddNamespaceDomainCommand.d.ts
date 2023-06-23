import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { AddNamespaceDomainInput, AddNamespaceDomainOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface AddNamespaceDomainCommandInput extends AddNamespaceDomainInput {
}
export interface AddNamespaceDomainCommandOutput extends AddNamespaceDomainOutput, __MetadataBearer {
}
/**
 * Adds a domain to the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, AddNamespaceDomainCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, AddNamespaceDomainCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new AddNamespaceDomainCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link AddNamespaceDomainCommandInput} for command's `input` shape.
 * @see {@link AddNamespaceDomainCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class AddNamespaceDomainCommand extends $Command<AddNamespaceDomainCommandInput, AddNamespaceDomainCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: AddNamespaceDomainCommandInput;
    constructor(input: AddNamespaceDomainCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<AddNamespaceDomainCommandInput, AddNamespaceDomainCommandOutput>;
    private serialize;
    private deserialize;
}
