import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { SetNamespaceCdnAuthTypeInput, SetNamespaceCdnAuthTypeOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface SetNamespaceCdnAuthTypeCommandInput extends SetNamespaceCdnAuthTypeInput {
}
export interface SetNamespaceCdnAuthTypeCommandOutput extends SetNamespaceCdnAuthTypeOutput, __MetadataBearer {
}
/**
 * Updates the CDN authentication type of the given game namesapce.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, SetNamespaceCdnAuthTypeCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, SetNamespaceCdnAuthTypeCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new SetNamespaceCdnAuthTypeCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetNamespaceCdnAuthTypeCommandInput} for command's `input` shape.
 * @see {@link SetNamespaceCdnAuthTypeCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class SetNamespaceCdnAuthTypeCommand extends $Command<SetNamespaceCdnAuthTypeCommandInput, SetNamespaceCdnAuthTypeCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: SetNamespaceCdnAuthTypeCommandInput;
    constructor(input: SetNamespaceCdnAuthTypeCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<SetNamespaceCdnAuthTypeCommandInput, SetNamespaceCdnAuthTypeCommandOutput>;
    private serialize;
    private deserialize;
}
