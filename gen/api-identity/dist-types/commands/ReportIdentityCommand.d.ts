import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { ReportIdentityInput, ReportIdentityOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ReportIdentityCommandInput extends ReportIdentityInput {
}
export interface ReportIdentityCommandOutput extends ReportIdentityOutput, __MetadataBearer {
}
/**
 * Creates an abuse report for an identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IdentityServiceClient, ReportIdentityCommand } from "@rivet-gg/identity"; // ES Modules import
 * // const { IdentityServiceClient, ReportIdentityCommand } = require("@rivet-gg/identity"); // CommonJS import
 * const client = new IdentityServiceClient(config);
 * const command = new ReportIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ReportIdentityCommandInput} for command's `input` shape.
 * @see {@link ReportIdentityCommandOutput} for command's `response` shape.
 * @see {@link IdentityServiceClientResolvedConfig | config} for IdentityServiceClient's `config` shape.
 *
 */
export declare class ReportIdentityCommand extends $Command<ReportIdentityCommandInput, ReportIdentityCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: ReportIdentityCommandInput;
    constructor(input: ReportIdentityCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ReportIdentityCommandInput, ReportIdentityCommandOutput>;
    private serialize;
    private deserialize;
}
