import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CreateGameNamespaceTokenPublicInput, CreateGameNamespaceTokenPublicOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGameNamespaceTokenPublicCommandInput extends CreateGameNamespaceTokenPublicInput {
}
export interface CreateGameNamespaceTokenPublicCommandOutput extends CreateGameNamespaceTokenPublicOutput, __MetadataBearer {
}
/**
 * Creates a public token for the given namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameNamespaceTokenPublicCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameNamespaceTokenPublicCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameNamespaceTokenPublicCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameNamespaceTokenPublicCommandInput} for command's `input` shape.
 * @see {@link CreateGameNamespaceTokenPublicCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CreateGameNamespaceTokenPublicCommand extends $Command<CreateGameNamespaceTokenPublicCommandInput, CreateGameNamespaceTokenPublicCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CreateGameNamespaceTokenPublicCommandInput;
    constructor(input: CreateGameNamespaceTokenPublicCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGameNamespaceTokenPublicCommandInput, CreateGameNamespaceTokenPublicCommandOutput>;
    private serialize;
    private deserialize;
}
