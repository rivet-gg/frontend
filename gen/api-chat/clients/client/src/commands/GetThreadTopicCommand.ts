// smithy-typescript generated code
import {
  ChatServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ChatServiceClient";
import {
  GetThreadTopicInput,
  GetThreadTopicOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetThreadTopicCommand,
  serializeAws_restJson1GetThreadTopicCommand,
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

export interface GetThreadTopicCommandInput extends GetThreadTopicInput {}
export interface GetThreadTopicCommandOutput extends GetThreadTopicOutput, __MetadataBearer {}

/**
 * Fetches the topic of a thread.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, GetThreadTopicCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, GetThreadTopicCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new GetThreadTopicCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetThreadTopicCommandInput} for command's `input` shape.
 * @see {@link GetThreadTopicCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export class GetThreadTopicCommand extends $Command<GetThreadTopicCommandInput, GetThreadTopicCommandOutput, ChatServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetThreadTopicCommandInput) {
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
  ): Handler<GetThreadTopicCommandInput, GetThreadTopicCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChatServiceClient";
    const commandName = "GetThreadTopicCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetThreadTopicInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetThreadTopicOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetThreadTopicCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetThreadTopicCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetThreadTopicCommandOutput> {
    return deserializeAws_restJson1GetThreadTopicCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
