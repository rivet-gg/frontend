import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ListGameCustomAvatarsInput, ListGameCustomAvatarsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListGameCustomAvatarsCommandInput extends ListGameCustomAvatarsInput {
}
export interface ListGameCustomAvatarsCommandOutput extends ListGameCustomAvatarsOutput, __MetadataBearer {
}
/**
 * Lists custom avatars for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ListGameCustomAvatarsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ListGameCustomAvatarsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ListGameCustomAvatarsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListGameCustomAvatarsCommandInput} for command's `input` shape.
 * @see {@link ListGameCustomAvatarsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ListGameCustomAvatarsCommand extends $Command<ListGameCustomAvatarsCommandInput, ListGameCustomAvatarsCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ListGameCustomAvatarsCommandInput;
    constructor(input: ListGameCustomAvatarsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListGameCustomAvatarsCommandInput, ListGameCustomAvatarsCommandOutput>;
    private serialize;
    private deserialize;
}
