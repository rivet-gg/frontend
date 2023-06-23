// smithy-typescript generated code
import {
  ChatServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ChatServiceClient";
import {
  SendChatMessageInput,
  SendChatMessageOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1SendChatMessageCommand,
  serializeAws_restJson1SendChatMessageCommand,
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

export interface SendChatMessageCommandInput extends SendChatMessageInput {}
export interface SendChatMessageCommandOutput extends SendChatMessageOutput, __MetadataBearer {}

/**
 * Sends a chat message to a given topic.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, SendChatMessageCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, SendChatMessageCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new SendChatMessageCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SendChatMessageCommandInput} for command's `input` shape.
 * @see {@link SendChatMessageCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export class SendChatMessageCommand extends $Command<SendChatMessageCommandInput, SendChatMessageCommandOutput, ChatServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SendChatMessageCommandInput) {
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
  ): Handler<SendChatMessageCommandInput, SendChatMessageCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChatServiceClient";
    const commandName = "SendChatMessageCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        SendChatMessageInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        SendChatMessageOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: SendChatMessageCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1SendChatMessageCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<SendChatMessageCommandOutput> {
    return deserializeAws_restJson1SendChatMessageCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
