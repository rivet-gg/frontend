import { PortalServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PortalServiceClient";
import { UnregisterNotificationsInput, UnregisterNotificationsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UnregisterNotificationsCommandInput extends UnregisterNotificationsInput {
}
export interface UnregisterNotificationsCommandOutput extends UnregisterNotificationsOutput, __MetadataBearer {
}
/**
 * Unregister push notification for the current identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, UnregisterNotificationsCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, UnregisterNotificationsCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new UnregisterNotificationsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UnregisterNotificationsCommandInput} for command's `input` shape.
 * @see {@link UnregisterNotificationsCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export declare class UnregisterNotificationsCommand extends $Command<UnregisterNotificationsCommandInput, UnregisterNotificationsCommandOutput, PortalServiceClientResolvedConfig> {
    readonly input: UnregisterNotificationsCommandInput;
    constructor(input: UnregisterNotificationsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PortalServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UnregisterNotificationsCommandInput, UnregisterNotificationsCommandOutput>;
    private serialize;
    private deserialize;
}
