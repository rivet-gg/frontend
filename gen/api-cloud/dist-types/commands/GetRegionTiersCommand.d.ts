import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GetRegionTiersInput, GetRegionTiersOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetRegionTiersCommandInput extends GetRegionTiersInput {
}
export interface GetRegionTiersCommandOutput extends GetRegionTiersOutput, __MetadataBearer {
}
/**
 * Returns all available region tiers.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetRegionTiersCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetRegionTiersCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetRegionTiersCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetRegionTiersCommandInput} for command's `input` shape.
 * @see {@link GetRegionTiersCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GetRegionTiersCommand extends $Command<GetRegionTiersCommandInput, GetRegionTiersCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GetRegionTiersCommandInput;
    constructor(input: GetRegionTiersCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetRegionTiersCommandInput, GetRegionTiersCommandOutput>;
    private serialize;
    private deserialize;
}
