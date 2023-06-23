import { AuthServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../AuthServiceClient";
import { StartEmailVerificationInput, StartEmailVerificationOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface StartEmailVerificationCommandInput extends StartEmailVerificationInput {
}
export interface StartEmailVerificationCommandOutput extends StartEmailVerificationOutput, __MetadataBearer {
}
/**
 * Starts the verification process for linking an emal to your identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { AuthServiceClient, StartEmailVerificationCommand } from "@rivet-gg/auth"; // ES Modules import
 * // const { AuthServiceClient, StartEmailVerificationCommand } = require("@rivet-gg/auth"); // CommonJS import
 * const client = new AuthServiceClient(config);
 * const command = new StartEmailVerificationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link StartEmailVerificationCommandInput} for command's `input` shape.
 * @see {@link StartEmailVerificationCommandOutput} for command's `response` shape.
 * @see {@link AuthServiceClientResolvedConfig | config} for AuthServiceClient's `config` shape.
 *
 */
export declare class StartEmailVerificationCommand extends $Command<StartEmailVerificationCommandInput, StartEmailVerificationCommandOutput, AuthServiceClientResolvedConfig> {
    readonly input: StartEmailVerificationCommandInput;
    constructor(input: StartEmailVerificationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: AuthServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<StartEmailVerificationCommandInput, StartEmailVerificationCommandOutput>;
    private serialize;
    private deserialize;
}
