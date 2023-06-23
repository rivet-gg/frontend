import { IdentityServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IdentityServiceClient";
import { RecentFollowerIgnoreInput, RecentFollowerIgnoreOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface RecentFollowerIgnoreCommandInput extends RecentFollowerIgnoreInput {
}
export interface RecentFollowerIgnoreCommandOutput extends RecentFollowerIgnoreOutput, __MetadataBearer {
}
/**
 * Ignores a recent follower, removing them from your recent followers list.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IdentityServiceClient, RecentFollowerIgnoreCommand } from "@rivet-gg/identity"; // ES Modules import
 * // const { IdentityServiceClient, RecentFollowerIgnoreCommand } = require("@rivet-gg/identity"); // CommonJS import
 * const client = new IdentityServiceClient(config);
 * const command = new RecentFollowerIgnoreCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RecentFollowerIgnoreCommandInput} for command's `input` shape.
 * @see {@link RecentFollowerIgnoreCommandOutput} for command's `response` shape.
 * @see {@link IdentityServiceClientResolvedConfig | config} for IdentityServiceClient's `config` shape.
 *
 */
export declare class RecentFollowerIgnoreCommand extends $Command<RecentFollowerIgnoreCommandInput, RecentFollowerIgnoreCommandOutput, IdentityServiceClientResolvedConfig> {
    readonly input: RecentFollowerIgnoreCommandInput;
    constructor(input: RecentFollowerIgnoreCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IdentityServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RecentFollowerIgnoreCommandInput, RecentFollowerIgnoreCommandOutput>;
    private serialize;
    private deserialize;
}
