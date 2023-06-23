// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  ValidateGroupProfileInput,
  ValidateGroupProfileOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ValidateGroupProfileCommand,
  serializeAws_restJson1ValidateGroupProfileCommand,
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

export interface ValidateGroupProfileCommandInput extends ValidateGroupProfileInput {}
export interface ValidateGroupProfileCommandOutput extends ValidateGroupProfileOutput, __MetadataBearer {}

/**
 * Validate contents of group profile.
 *
 * Use to provide immediate feedback on profile changes before committing them.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ValidateGroupProfileCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ValidateGroupProfileCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ValidateGroupProfileCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ValidateGroupProfileCommandInput} for command's `input` shape.
 * @see {@link ValidateGroupProfileCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class ValidateGroupProfileCommand extends $Command<ValidateGroupProfileCommandInput, ValidateGroupProfileCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ValidateGroupProfileCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: GroupServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ValidateGroupProfileCommandInput, ValidateGroupProfileCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "ValidateGroupProfileCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ValidateGroupProfileInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ValidateGroupProfileOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ValidateGroupProfileCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ValidateGroupProfileCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ValidateGroupProfileCommandOutput> {
    return deserializeAws_restJson1ValidateGroupProfileCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
