// smithy-typescript generated code
import {
  AuthServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../AuthServiceClient";
import {
  StartEmailVerificationInput,
  StartEmailVerificationOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1StartEmailVerificationCommand,
  serializeAws_restJson1StartEmailVerificationCommand,
} from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export interface StartEmailVerificationCommandInput extends StartEmailVerificationInput {}
export interface StartEmailVerificationCommandOutput extends StartEmailVerificationOutput, __MetadataBearer {}

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
export class StartEmailVerificationCommand extends $Command<StartEmailVerificationCommandInput, StartEmailVerificationCommandOutput, AuthServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: StartEmailVerificationCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: AuthServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<StartEmailVerificationCommandInput, StartEmailVerificationCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "AuthServiceClient";
    const commandName = "StartEmailVerificationCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        StartEmailVerificationInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        StartEmailVerificationOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: StartEmailVerificationCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1StartEmailVerificationCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<StartEmailVerificationCommandOutput> {
    return deserializeAws_restJson1StartEmailVerificationCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
