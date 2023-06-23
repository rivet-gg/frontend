// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ValidateGameVersionInput,
  ValidateGameVersionOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ValidateGameVersionCommand,
  serializeAws_restJson1ValidateGameVersionCommand,
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

export interface ValidateGameVersionCommandInput extends ValidateGameVersionInput {}
export interface ValidateGameVersionCommandOutput extends ValidateGameVersionOutput, __MetadataBearer {}

/**
 * Validates information used to create a new game version.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ValidateGameVersionCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ValidateGameVersionCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ValidateGameVersionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGameVersionCommandInput} for command's `input` shape.
 * @see {@link ValidateGameVersionCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ValidateGameVersionCommand extends $Command<ValidateGameVersionCommandInput, ValidateGameVersionCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ValidateGameVersionCommandInput) {
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
  ): Handler<ValidateGameVersionCommandInput, ValidateGameVersionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ValidateGameVersionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ValidateGameVersionInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ValidateGameVersionOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ValidateGameVersionCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ValidateGameVersionCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ValidateGameVersionCommandOutput> {
    return deserializeAws_restJson1ValidateGameVersionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
