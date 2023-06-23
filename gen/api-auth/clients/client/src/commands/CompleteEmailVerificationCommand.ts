// smithy-typescript generated code
import {
  AuthServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../AuthServiceClient";
import {
  CompleteEmailVerificationInput,
  CompleteEmailVerificationOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CompleteEmailVerificationCommand,
  serializeAws_restJson1CompleteEmailVerificationCommand,
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

export interface CompleteEmailVerificationCommandInput extends CompleteEmailVerificationInput {}
export interface CompleteEmailVerificationCommandOutput extends CompleteEmailVerificationOutput, __MetadataBearer {}

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
export class CompleteEmailVerificationCommand extends $Command<CompleteEmailVerificationCommandInput, CompleteEmailVerificationCommandOutput, AuthServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CompleteEmailVerificationCommandInput) {
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
  ): Handler<CompleteEmailVerificationCommandInput, CompleteEmailVerificationCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "AuthServiceClient";
    const commandName = "CompleteEmailVerificationCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CompleteEmailVerificationInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CompleteEmailVerificationOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CompleteEmailVerificationCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CompleteEmailVerificationCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CompleteEmailVerificationCommandOutput> {
    return deserializeAws_restJson1CompleteEmailVerificationCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
