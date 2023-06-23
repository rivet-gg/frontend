import { AuthServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../AuthServiceClient";
import { CompleteEmailVerificationInput, CompleteEmailVerificationOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface CompleteEmailVerificationCommandInput extends CompleteEmailVerificationInput {
}
export interface CompleteEmailVerificationCommandOutput extends CompleteEmailVerificationOutput, __MetadataBearer {
}
/**
 * Completes the email verification process.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { AuthServiceClient, CompleteEmailVerificationCommand } from "@rivet-gg/auth"; // ES Modules import
 * // const { AuthServiceClient, CompleteEmailVerificationCommand } = require("@rivet-gg/auth"); // CommonJS import
 * const client = new AuthServiceClient(config);
 * const command = new CompleteEmailVerificationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CompleteEmailVerificationCommandInput} for command's `input` shape.
 * @see {@link CompleteEmailVerificationCommandOutput} for command's `response` shape.
 * @see {@link AuthServiceClientResolvedConfig | config} for AuthServiceClient's `config` shape.
 *
 */
export declare class CompleteEmailVerificationCommand extends $Command<CompleteEmailVerificationCommandInput, CompleteEmailVerificationCommandOutput, AuthServiceClientResolvedConfig> {
    readonly input: CompleteEmailVerificationCommandInput;
    constructor(input: CompleteEmailVerificationCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: AuthServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<CompleteEmailVerificationCommandInput, CompleteEmailVerificationCommandOutput>;
    private serialize;
    private deserialize;
}
