import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ValidateGameNamespaceInput, ValidateGameNamespaceOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ValidateGameNamespaceCommandInput extends ValidateGameNamespaceInput {
}
export interface ValidateGameNamespaceCommandOutput extends ValidateGameNamespaceOutput, __MetadataBearer {
}
/**
 * Validates information used to create a new game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameNamespaceCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameNamespaceCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameNamespaceCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameNamespaceCommandInput} for command's `input` shape.
 * @see {@link ValidateGameNamespaceCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ValidateGameNamespaceCommand extends $Command<ValidateGameNamespaceCommandInput, ValidateGameNamespaceCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ValidateGameNamespaceCommandInput;
    constructor(input: ValidateGameNamespaceCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ValidateGameNamespaceCommandInput, ValidateGameNamespaceCommandOutput>;
    private serialize;
    private deserialize;
}
