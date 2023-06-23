import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ListGameCdnSitesInput, ListGameCdnSitesOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListGameCdnSitesCommandInput extends ListGameCdnSitesInput {
}
export interface ListGameCdnSitesCommandOutput extends ListGameCdnSitesOutput, __MetadataBearer {
}
/**
 * Lists CDN sites for a game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ListGameCdnSitesCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ListGameCdnSitesCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ListGameCdnSitesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListGameCdnSitesCommandInput} for command's `input` shape.
 * @see {@link ListGameCdnSitesCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ListGameCdnSitesCommand extends $Command<ListGameCdnSitesCommandInput, ListGameCdnSitesCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ListGameCdnSitesCommandInput;
    constructor(input: ListGameCdnSitesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListGameCdnSitesCommandInput, ListGameCdnSitesCommandOutput>;
    private serialize;
    private deserialize;
}
