import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ValidateGroupInput, ValidateGroupOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ValidateGroupCommandInput extends ValidateGroupInput {
}
export interface ValidateGroupCommandOutput extends ValidateGroupOutput, __MetadataBearer {
}
/**
 * Validates information used to create a new group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGroupCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGroupCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGroupCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGroupCommandInput} for command's `input` shape.
 * @see {@link ValidateGroupCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ValidateGroupCommand extends $Command<ValidateGroupCommandInput, ValidateGroupCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ValidateGroupCommandInput;
    constructor(input: ValidateGroupCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ValidateGroupCommandInput, ValidateGroupCommandOutput>;
    private serialize;
    private deserialize;
}
