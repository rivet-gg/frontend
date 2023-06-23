// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GetLobbyLogsInput,
  GetLobbyLogsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetLobbyLogsCommand,
  serializeAws_restJson1GetLobbyLogsCommand,
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

export interface GetLobbyLogsCommandInput extends GetLobbyLogsInput {}
export interface GetLobbyLogsCommandOutput extends GetLobbyLogsOutput, __MetadataBearer {}

/**
 * Returns the logs for a given lobby.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetLobbyLogsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetLobbyLogsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetLobbyLogsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetLobbyLogsCommandInput} for command's `input` shape.
 * @see {@link GetLobbyLogsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GetLobbyLogsCommand extends $Command<GetLobbyLogsCommandInput, GetLobbyLogsCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetLobbyLogsCommandInput) {
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
  ): Handler<GetLobbyLogsCommandInput, GetLobbyLogsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GetLobbyLogsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetLobbyLogsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetLobbyLogsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetLobbyLogsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetLobbyLogsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetLobbyLogsCommandOutput> {
    return deserializeAws_restJson1GetLobbyLogsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
