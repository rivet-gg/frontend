// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ValidateGameNamespaceMatchmakerConfigInput,
  ValidateGameNamespaceMatchmakerConfigOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand,
  serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand,
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

export interface ValidateGameNamespaceMatchmakerConfigCommandInput extends ValidateGameNamespaceMatchmakerConfigInput {}
export interface ValidateGameNamespaceMatchmakerConfigCommandOutput extends ValidateGameNamespaceMatchmakerConfigOutput, __MetadataBearer {}

/**
 * Validates information used to update a game namespace's matchmaker config.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameNamespaceMatchmakerConfigCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameNamespaceMatchmakerConfigCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameNamespaceMatchmakerConfigCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameNamespaceMatchmakerConfigCommandInput} for command's `input` shape.
 * @see {@link ValidateGameNamespaceMatchmakerConfigCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ValidateGameNamespaceMatchmakerConfigCommand extends $Command<ValidateGameNamespaceMatchmakerConfigCommandInput, ValidateGameNamespaceMatchmakerConfigCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ValidateGameNamespaceMatchmakerConfigCommandInput) {
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
  ): Handler<ValidateGameNamespaceMatchmakerConfigCommandInput, ValidateGameNamespaceMatchmakerConfigCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ValidateGameNamespaceMatchmakerConfigCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ValidateGameNamespaceMatchmakerConfigInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ValidateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ValidateGameNamespaceMatchmakerConfigCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ValidateGameNamespaceMatchmakerConfigCommandOutput> {
    return deserializeAws_restJson1ValidateGameNamespaceMatchmakerConfigCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
