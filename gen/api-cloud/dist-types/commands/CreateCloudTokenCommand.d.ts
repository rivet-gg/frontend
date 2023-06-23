import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CreateCloudTokenInput, CreateCloudTokenOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateCloudTokenCommandInput extends CreateCloudTokenInput {
}
export interface CreateCloudTokenCommandOutput extends CreateCloudTokenOutput, __MetadataBearer {
}
/**
 * Creates a new game cloud token.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateCloudTokenCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateCloudTokenCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateCloudTokenCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateCloudTokenCommandInput} for command's `input` shape.
 * @see {@link CreateCloudTokenCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CreateCloudTokenCommand extends $Command<CreateCloudTokenCommandInput, CreateCloudTokenCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CreateCloudTokenCommandInput;
    constructor(input: CreateCloudTokenCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateCloudTokenCommandInput, CreateCloudTokenCommandOutput>;
    private serialize;
    private deserialize;
}
