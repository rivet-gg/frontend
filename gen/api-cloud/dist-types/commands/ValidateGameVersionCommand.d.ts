import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ValidateGameVersionInput, ValidateGameVersionOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ValidateGameVersionCommandInput extends ValidateGameVersionInput {
}
export interface ValidateGameVersionCommandOutput extends ValidateGameVersionOutput, __MetadataBearer {
}
/**
 * Validates information used to create a new game version.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameVersionCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameVersionCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameVersionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameVersionCommandInput} for command's `input` shape.
 * @see {@link ValidateGameVersionCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ValidateGameVersionCommand extends $Command<ValidateGameVersionCommandInput, ValidateGameVersionCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ValidateGameVersionCommandInput;
    constructor(input: ValidateGameVersionCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ValidateGameVersionCommandInput, ValidateGameVersionCommandOutput>;
    private serialize;
    private deserialize;
}
