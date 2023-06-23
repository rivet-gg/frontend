import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ConvertGroupInput, ConvertGroupOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ConvertGroupCommandInput extends ConvertGroupInput {
}
export interface ConvertGroupCommandOutput extends ConvertGroupOutput, __MetadataBearer {
}
/**
 * Converts the given group into a developer group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ConvertGroupCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ConvertGroupCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ConvertGroupCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ConvertGroupCommandInput} for command's `input` shape.
 * @see {@link ConvertGroupCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ConvertGroupCommand extends $Command<ConvertGroupCommandInput, ConvertGroupCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ConvertGroupCommandInput;
    constructor(input: ConvertGroupCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ConvertGroupCommandInput, ConvertGroupCommandOutput>;
    private serialize;
    private deserialize;
}
