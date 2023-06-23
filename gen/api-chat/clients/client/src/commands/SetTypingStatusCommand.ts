// smithy-typescript generated code
import {
  ChatServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ChatServiceClient";
import {
  SetTypingStatusInput,
  SetTypingStatusOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1SetTypingStatusCommand,
  serializeAws_restJson1SetTypingStatusCommand,
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

export interface SetTypingStatusCommandInput extends SetTypingStatusInput {}
export interface SetTypingStatusCommandOutput extends SetTypingStatusOutput, __MetadataBearer {}

/**
 * Updates the current identity's typing status in the given thread.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, SetTypingStatusCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, SetTypingStatusCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new SetTypingStatusCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetTypingStatusCommandInput} for command's `input` shape.
 * @see {@link SetTypingStatusCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export class SetTypingStatusCommand extends $Command<SetTypingStatusCommandInput, SetTypingStatusCommandOutput, ChatServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SetTypingStatusCommandInput) {
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
  ): Handler<SetTypingStatusCommandInput, SetTypingStatusCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChatServiceClient";
    const commandName = "SetTypingStatusCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        SetTypingStatusInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        SetTypingStatusOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: SetTypingStatusCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1SetTypingStatusCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<SetTypingStatusCommandOutput> {
    return deserializeAws_restJson1SetTypingStatusCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
