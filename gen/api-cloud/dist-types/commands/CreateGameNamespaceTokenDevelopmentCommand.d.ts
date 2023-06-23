import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CreateGameNamespaceTokenDevelopmentInput, CreateGameNamespaceTokenDevelopmentOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGameNamespaceTokenDevelopmentCommandInput extends CreateGameNamespaceTokenDevelopmentInput {
}
export interface CreateGameNamespaceTokenDevelopmentCommandOutput extends CreateGameNamespaceTokenDevelopmentOutput, __MetadataBearer {
}
/**
 * Creates a development token for the given namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameNamespaceTokenDevelopmentCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameNamespaceTokenDevelopmentCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameNamespaceTokenDevelopmentCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameNamespaceTokenDevelopmentCommandInput} for command's `input` shape.
 * @see {@link CreateGameNamespaceTokenDevelopmentCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CreateGameNamespaceTokenDevelopmentCommand extends $Command<CreateGameNamespaceTokenDevelopmentCommandInput, CreateGameNamespaceTokenDevelopmentCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CreateGameNamespaceTokenDevelopmentCommandInput;
    constructor(input: CreateGameNamespaceTokenDevelopmentCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGameNamespaceTokenDevelopmentCommandInput, CreateGameNamespaceTokenDevelopmentCommandOutput>;
    private serialize;
    private deserialize;
}
