import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { ValidateGroupProfileInput, ValidateGroupProfileOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ValidateGroupProfileCommandInput extends ValidateGroupProfileInput {
}
export interface ValidateGroupProfileCommandOutput extends ValidateGroupProfileOutput, __MetadataBearer {
}
/**
 * Validate contents of group profile.
 *
 * Use to provide immediate feedback on profile changes before committing them.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ValidateGroupProfileCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ValidateGroupProfileCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ValidateGroupProfileCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGroupProfileCommandInput} for command's `input` shape.
 * @see {@link ValidateGroupProfileCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class ValidateGroupProfileCommand extends $Command<ValidateGroupProfileCommandInput, ValidateGroupProfileCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: ValidateGroupProfileCommandInput;
    constructor(input: ValidateGroupProfileCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ValidateGroupProfileCommandInput, ValidateGroupProfileCommandOutput>;
    private serialize;
    private deserialize;
}
