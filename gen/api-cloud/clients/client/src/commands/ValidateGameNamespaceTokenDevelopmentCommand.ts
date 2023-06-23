// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ValidateGameNamespaceTokenDevelopmentInput,
  ValidateGameNamespaceTokenDevelopmentOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand,
  serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand,
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

export interface ValidateGameNamespaceTokenDevelopmentCommandInput extends ValidateGameNamespaceTokenDevelopmentInput {}
export interface ValidateGameNamespaceTokenDevelopmentCommandOutput extends ValidateGameNamespaceTokenDevelopmentOutput, __MetadataBearer {}

/**
 * Validates information used to create a new game namespace development token.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameNamespaceTokenDevelopmentCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameNamespaceTokenDevelopmentCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameNamespaceTokenDevelopmentCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameNamespaceTokenDevelopmentCommandInput} for command's `input` shape.
 * @see {@link ValidateGameNamespaceTokenDevelopmentCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ValidateGameNamespaceTokenDevelopmentCommand extends $Command<ValidateGameNamespaceTokenDevelopmentCommandInput, ValidateGameNamespaceTokenDevelopmentCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ValidateGameNamespaceTokenDevelopmentCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: CloudServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ValidateGameNamespaceTokenDevelopmentCommandInput, ValidateGameNamespaceTokenDevelopmentCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ValidateGameNamespaceTokenDevelopmentCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ValidateGameNamespaceTokenDevelopmentInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ValidateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ValidateGameNamespaceTokenDevelopmentCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ValidateGameNamespaceTokenDevelopmentCommandOutput> {
    return deserializeAws_restJson1ValidateGameNamespaceTokenDevelopmentCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
