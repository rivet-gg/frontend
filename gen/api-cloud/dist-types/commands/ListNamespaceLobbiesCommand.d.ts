import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { ListNamespaceLobbiesInput, ListNamespaceLobbiesOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListNamespaceLobbiesCommandInput extends ListNamespaceLobbiesInput {
}
export interface ListNamespaceLobbiesCommandOutput extends ListNamespaceLobbiesOutput, __MetadataBearer {
}
/**
 * Returns a list of lobbies for the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ListNamespaceLobbiesCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ListNamespaceLobbiesCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ListNamespaceLobbiesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListNamespaceLobbiesCommandInput} for command's `input` shape.
 * @see {@link ListNamespaceLobbiesCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class ListNamespaceLobbiesCommand extends $Command<ListNamespaceLobbiesCommandInput, ListNamespaceLobbiesCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: ListNamespaceLobbiesCommandInput;
    constructor(input: ListNamespaceLobbiesCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListNamespaceLobbiesCommandInput, ListNamespaceLobbiesCommandOutput>;
    private serialize;
    private deserialize;
}
