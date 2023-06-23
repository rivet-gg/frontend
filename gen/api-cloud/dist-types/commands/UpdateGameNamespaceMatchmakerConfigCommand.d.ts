import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { UpdateGameNamespaceMatchmakerConfigInput, UpdateGameNamespaceMatchmakerConfigOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UpdateGameNamespaceMatchmakerConfigCommandInput extends UpdateGameNamespaceMatchmakerConfigInput {
}
export interface UpdateGameNamespaceMatchmakerConfigCommandOutput extends UpdateGameNamespaceMatchmakerConfigOutput, __MetadataBearer {
}
/**
 * Updates matchmaker config for the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, UpdateGameNamespaceMatchmakerConfigCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, UpdateGameNamespaceMatchmakerConfigCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new UpdateGameNamespaceMatchmakerConfigCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateGameNamespaceMatchmakerConfigCommandInput} for command's `input` shape.
 * @see {@link UpdateGameNamespaceMatchmakerConfigCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class UpdateGameNamespaceMatchmakerConfigCommand extends $Command<UpdateGameNamespaceMatchmakerConfigCommandInput, UpdateGameNamespaceMatchmakerConfigCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: UpdateGameNamespaceMatchmakerConfigCommandInput;
    constructor(input: UpdateGameNamespaceMatchmakerConfigCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UpdateGameNamespaceMatchmakerConfigCommandInput, UpdateGameNamespaceMatchmakerConfigCommandOutput>;
    private serialize;
    private deserialize;
}
