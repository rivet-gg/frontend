import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { CreateGameCdnSiteInput, CreateGameCdnSiteOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CreateGameCdnSiteCommandInput extends CreateGameCdnSiteInput {
}
export interface CreateGameCdnSiteCommandOutput extends CreateGameCdnSiteOutput, __MetadataBearer {
}
/**
 * Creates a new CDN site for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameCdnSiteCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameCdnSiteCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameCdnSiteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameCdnSiteCommandInput} for command's `input` shape.
 * @see {@link CreateGameCdnSiteCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class CreateGameCdnSiteCommand extends $Command<CreateGameCdnSiteCommandInput, CreateGameCdnSiteCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: CreateGameCdnSiteCommandInput;
    constructor(input: CreateGameCdnSiteCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CreateGameCdnSiteCommandInput, CreateGameCdnSiteCommandOutput>;
    private serialize;
    private deserialize;
}
