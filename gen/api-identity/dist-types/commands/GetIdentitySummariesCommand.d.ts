import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { GetIdentitySummariesInput, GetIdentitySummariesOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetIdentitySummariesCommandInput extends GetIdentitySummariesInput {
}
export interface GetIdentitySummariesCommandOutput extends GetIdentitySummariesOutput, __MetadataBearer {
}
/**
 * Fetches a list of identity summaries.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IdentityServiceClient, GetIdentitySummariesCommand } from "@rivet-gg/identity"; // ES Modules import
 * // const { IdentityServiceClient, GetIdentitySummariesCommand } = require("@rivet-gg/identity"); // CommonJS import
 * const client = new IdentityServiceClient(config);
 * const command = new GetIdentitySummariesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetIdentitySummariesCommandInput} for command's `input` shape.
 * @see {@link GetIdentitySummariesCommandOutput} for command's `response` shape.
 * @see {@link IdentityServiceClientResolvedConfig | config} for IdentityServiceClient's `config` shape.
 *
 */
export declare class GetIdentitySummariesCommand extends $Command<GetIdentitySummariesCommandInput, GetIdentitySummariesCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: GetIdentitySummariesCommandInput;
    constructor(input: GetIdentitySummariesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetIdentitySummariesCommandInput, GetIdentitySummariesCommandOutput>;
    private serialize;
    private deserialize;
}
