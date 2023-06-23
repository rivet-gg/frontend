import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetRayPerfLogsInput, GetRayPerfLogsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetRayPerfLogsCommandInput extends GetRayPerfLogsInput {
}
export interface GetRayPerfLogsCommandOutput extends GetRayPerfLogsOutput, __MetadataBearer {
}
/**
 * Returns performance information about a Rivet Ray.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetRayPerfLogsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetRayPerfLogsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetRayPerfLogsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetRayPerfLogsCommandInput} for command's `input` shape.
 * @see {@link GetRayPerfLogsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetRayPerfLogsCommand extends $Command<GetRayPerfLogsCommandInput, GetRayPerfLogsCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetRayPerfLogsCommandInput;
    constructor(input: GetRayPerfLogsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetRayPerfLogsCommandInput, GetRayPerfLogsCommandOutput>;
    private serialize;
    private deserialize;
}
