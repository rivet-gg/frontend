// smithy-typescript generated code
import {
  PortalServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../PortalServiceClient";
import {
  RegisterNotificationsInput,
  RegisterNotificationsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1RegisterNotificationsCommand,
  serializeAws_restJson1RegisterNotificationsCommand,
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

export interface RegisterNotificationsCommandInput extends RegisterNotificationsInput {}
export interface RegisterNotificationsCommandOutput extends RegisterNotificationsOutput, __MetadataBearer {}

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
export class RegisterNotificationsCommand extends $Command<RegisterNotificationsCommandInput, RegisterNotificationsCommandOutput, PortalServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: RegisterNotificationsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: PortalServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<RegisterNotificationsCommandInput, RegisterNotificationsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PortalServiceClient";
    const commandName = "RegisterNotificationsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        RegisterNotificationsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        RegisterNotificationsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: RegisterNotificationsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1RegisterNotificationsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<RegisterNotificationsCommandOutput> {
    return deserializeAws_restJson1RegisterNotificationsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
