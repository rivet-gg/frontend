// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  UpdateGameNamespaceMatchmakerConfigInput,
  UpdateGameNamespaceMatchmakerConfigOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand,
  serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand,
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

export interface UpdateGameNamespaceMatchmakerConfigCommandInput extends UpdateGameNamespaceMatchmakerConfigInput {}
export interface UpdateGameNamespaceMatchmakerConfigCommandOutput extends UpdateGameNamespaceMatchmakerConfigOutput, __MetadataBearer {}

/**
 * Updates matchmaker config for the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, UpdateGameNamespaceMatchmakerConfigCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, UpdateGameNamespaceMatchmakerConfigCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new UpdateGameNamespaceMatchmakerConfigCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateGameNamespaceMatchmakerConfigCommandInput} for command's `input` shape.
 * @see {@link UpdateGameNamespaceMatchmakerConfigCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class UpdateGameNamespaceMatchmakerConfigCommand extends $Command<UpdateGameNamespaceMatchmakerConfigCommandInput, UpdateGameNamespaceMatchmakerConfigCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: UpdateGameNamespaceMatchmakerConfigCommandInput) {
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
  ): Handler<UpdateGameNamespaceMatchmakerConfigCommandInput, UpdateGameNamespaceMatchmakerConfigCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "UpdateGameNamespaceMatchmakerConfigCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        UpdateGameNamespaceMatchmakerConfigInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        UpdateGameNamespaceMatchmakerConfigOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: UpdateGameNamespaceMatchmakerConfigCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<UpdateGameNamespaceMatchmakerConfigCommandOutput> {
    return deserializeAws_restJson1UpdateGameNamespaceMatchmakerConfigCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
