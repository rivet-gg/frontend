import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ValidateGameNamespaceMatchmakerConfigInput, ValidateGameNamespaceMatchmakerConfigOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ValidateGameNamespaceMatchmakerConfigCommandInput extends ValidateGameNamespaceMatchmakerConfigInput {
}
export interface ValidateGameNamespaceMatchmakerConfigCommandOutput extends ValidateGameNamespaceMatchmakerConfigOutput, __MetadataBearer {
}
/**
 * Validates information used to update a game namespace's matchmaker config.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameNamespaceMatchmakerConfigCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameNamespaceMatchmakerConfigCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameNamespaceMatchmakerConfigCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameNamespaceMatchmakerConfigCommandInput} for command's `input` shape.
 * @see {@link ValidateGameNamespaceMatchmakerConfigCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ValidateGameNamespaceMatchmakerConfigCommand extends $Command<ValidateGameNamespaceMatchmakerConfigCommandInput, ValidateGameNamespaceMatchmakerConfigCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ValidateGameNamespaceMatchmakerConfigCommandInput;
    constructor(input: ValidateGameNamespaceMatchmakerConfigCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ValidateGameNamespaceMatchmakerConfigCommandInput, ValidateGameNamespaceMatchmakerConfigCommandOutput>;
    private serialize;
    private deserialize;
}
