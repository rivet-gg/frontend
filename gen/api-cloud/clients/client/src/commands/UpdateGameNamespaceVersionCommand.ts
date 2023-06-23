// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  UpdateGameNamespaceVersionInput,
  UpdateGameNamespaceVersionOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1UpdateGameNamespaceVersionCommand,
  serializeAws_restJson1UpdateGameNamespaceVersionCommand,
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

export interface UpdateGameNamespaceVersionCommandInput extends UpdateGameNamespaceVersionInput {}
export interface UpdateGameNamespaceVersionCommandOutput extends UpdateGameNamespaceVersionOutput, __MetadataBearer {}

/**
 * Updates the version of a game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, UpdateGameNamespaceVersionCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, UpdateGameNamespaceVersionCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new UpdateGameNamespaceVersionCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateGameNamespaceVersionCommandInput} for command's `input` shape.
 * @see {@link UpdateGameNamespaceVersionCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class UpdateGameNamespaceVersionCommand extends $Command<UpdateGameNamespaceVersionCommandInput, UpdateGameNamespaceVersionCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: UpdateGameNamespaceVersionCommandInput) {
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
  ): Handler<UpdateGameNamespaceVersionCommandInput, UpdateGameNamespaceVersionCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "UpdateGameNamespaceVersionCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        UpdateGameNamespaceVersionInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        UpdateGameNamespaceVersionOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: UpdateGameNamespaceVersionCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1UpdateGameNamespaceVersionCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<UpdateGameNamespaceVersionCommandOutput> {
    return deserializeAws_restJson1UpdateGameNamespaceVersionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
