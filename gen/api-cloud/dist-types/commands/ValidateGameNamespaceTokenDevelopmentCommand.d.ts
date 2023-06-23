import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ValidateGameNamespaceTokenDevelopmentInput, ValidateGameNamespaceTokenDevelopmentOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ValidateGameNamespaceTokenDevelopmentCommandInput extends ValidateGameNamespaceTokenDevelopmentInput {
}
export interface ValidateGameNamespaceTokenDevelopmentCommandOutput extends ValidateGameNamespaceTokenDevelopmentOutput, __MetadataBearer {
}
/**
 * Validates information used to create a new game namespace development token.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameNamespaceTokenDevelopmentCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameNamespaceTokenDevelopmentCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameNamespaceTokenDevelopmentCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameNamespaceTokenDevelopmentCommandInput} for command's `input` shape.
 * @see {@link ValidateGameNamespaceTokenDevelopmentCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ValidateGameNamespaceTokenDevelopmentCommand extends $Command<ValidateGameNamespaceTokenDevelopmentCommandInput, ValidateGameNamespaceTokenDevelopmentCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ValidateGameNamespaceTokenDevelopmentCommandInput;
    constructor(input: ValidateGameNamespaceTokenDevelopmentCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ValidateGameNamespaceTokenDevelopmentCommandInput, ValidateGameNamespaceTokenDevelopmentCommandOutput>;
    private serialize;
    private deserialize;
}
