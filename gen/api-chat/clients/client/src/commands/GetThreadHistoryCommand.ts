// smithy-typescript generated code
import {
  ChatServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ChatServiceClient";
import {
  GetThreadHistoryInput,
  GetThreadHistoryOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetThreadHistoryCommand,
  serializeAws_restJson1GetThreadHistoryCommand,
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

export interface GetThreadHistoryCommandInput extends GetThreadHistoryInput {}
export interface GetThreadHistoryCommandOutput extends GetThreadHistoryOutput, __MetadataBearer {}

/**
 * Returns message history for a given thread in a certain direction.
 *
 * Defaults to querying messages before ts.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, GetThreadHistoryCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, GetThreadHistoryCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new GetThreadHistoryCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetThreadHistoryCommandInput} for command's `input` shape.
 * @see {@link GetThreadHistoryCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export class GetThreadHistoryCommand extends $Command<GetThreadHistoryCommandInput, GetThreadHistoryCommandOutput, ChatServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetThreadHistoryCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: ChatServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetThreadHistoryCommandInput, GetThreadHistoryCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChatServiceClient";
    const commandName = "GetThreadHistoryCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetThreadHistoryInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetThreadHistoryOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetThreadHistoryCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetThreadHistoryCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetThreadHistoryCommandOutput> {
    return deserializeAws_restJson1GetThreadHistoryCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
