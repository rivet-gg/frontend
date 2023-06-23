import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ToggleNamespaceDomainPublicAuthInput, ToggleNamespaceDomainPublicAuthOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ToggleNamespaceDomainPublicAuthCommandInput extends ToggleNamespaceDomainPublicAuthInput {
}
export interface ToggleNamespaceDomainPublicAuthCommandOutput extends ToggleNamespaceDomainPublicAuthOutput, __MetadataBearer {
}
/**
 * Toggles whether or not to allow authentication based on domain for the given game namesapce.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ToggleNamespaceDomainPublicAuthCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ToggleNamespaceDomainPublicAuthCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ToggleNamespaceDomainPublicAuthCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ToggleNamespaceDomainPublicAuthCommandInput} for command's `input` shape.
 * @see {@link ToggleNamespaceDomainPublicAuthCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ToggleNamespaceDomainPublicAuthCommand extends $Command<ToggleNamespaceDomainPublicAuthCommandInput, ToggleNamespaceDomainPublicAuthCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ToggleNamespaceDomainPublicAuthCommandInput;
    constructor(input: ToggleNamespaceDomainPublicAuthCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ToggleNamespaceDomainPublicAuthCommandInput, ToggleNamespaceDomainPublicAuthCommandOutput>;
    private serialize;
    private deserialize;
}
