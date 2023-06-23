// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ExportLobbyLogsInput,
  ExportLobbyLogsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ExportLobbyLogsCommand,
  serializeAws_restJson1ExportLobbyLogsCommand,
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

export interface ExportLobbyLogsCommandInput extends ExportLobbyLogsInput {}
export interface ExportLobbyLogsCommandOutput extends ExportLobbyLogsOutput, __MetadataBearer {}

/**
 * Generates a download URL for logs.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ExportLobbyLogsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ExportLobbyLogsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ExportLobbyLogsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ExportLobbyLogsCommandInput} for command's `input` shape.
 * @see {@link ExportLobbyLogsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ExportLobbyLogsCommand extends $Command<ExportLobbyLogsCommandInput, ExportLobbyLogsCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ExportLobbyLogsCommandInput) {
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
  ): Handler<ExportLobbyLogsCommandInput, ExportLobbyLogsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ExportLobbyLogsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ExportLobbyLogsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ExportLobbyLogsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ExportLobbyLogsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ExportLobbyLogsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ExportLobbyLogsCommandOutput> {
    return deserializeAws_restJson1ExportLobbyLogsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
