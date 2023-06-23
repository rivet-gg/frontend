import { PortalServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../PortalServiceClient";
import { RegisterNotificationsInput, RegisterNotificationsOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface RegisterNotificationsCommandInput extends RegisterNotificationsInput {
}
export interface RegisterNotificationsCommandOutput extends RegisterNotificationsOutput, __MetadataBearer {
}
/**
 * Registers push notifications for the current identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, RegisterNotificationsCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, RegisterNotificationsCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new RegisterNotificationsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RegisterNotificationsCommandInput} for command's `input` shape.
 * @see {@link RegisterNotificationsCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export declare class RegisterNotificationsCommand extends $Command<RegisterNotificationsCommandInput, RegisterNotificationsCommandOutput, PortalServiceClientResolvedConfig> {
    readonly input: RegisterNotificationsCommandInput;
    constructor(input: RegisterNotificationsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: PortalServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RegisterNotificationsCommandInput, RegisterNotificationsCommandOutput>;
    private serialize;
    private deserialize;
}
