import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ValidateGameInput, ValidateGameOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ValidateGameCommandInput extends ValidateGameInput {
}
export interface ValidateGameCommandOutput extends ValidateGameOutput, __MetadataBearer {
}
/**
 * Validates information used to create a new game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameCommandInput} for command's `input` shape.
 * @see {@link ValidateGameCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ValidateGameCommand extends $Command<ValidateGameCommandInput, ValidateGameCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ValidateGameCommandInput;
    constructor(input: ValidateGameCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ValidateGameCommandInput, ValidateGameCommandOutput>;
    private serialize;
    private deserialize;
}
