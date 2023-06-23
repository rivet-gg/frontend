// smithy-typescript generated code
import {
  ChatServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ChatServiceClient";
import {
  SetThreadReadInput,
  SetThreadReadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1SetThreadReadCommand,
  serializeAws_restJson1SetThreadReadCommand,
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

export interface SetThreadReadCommandInput extends SetThreadReadInput {}
export interface SetThreadReadCommandOutput extends SetThreadReadOutput, __MetadataBearer {}

/**
 * Updates the current identity's last read timestamp in the given thread.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, SetThreadReadCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, SetThreadReadCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new SetThreadReadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetThreadReadCommandInput} for command's `input` shape.
 * @see {@link SetThreadReadCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export class SetThreadReadCommand extends $Command<SetThreadReadCommandInput, SetThreadReadCommandOutput, ChatServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SetThreadReadCommandInput) {
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
  ): Handler<SetThreadReadCommandInput, SetThreadReadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChatServiceClient";
    const commandName = "SetThreadReadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        SetThreadReadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        SetThreadReadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: SetThreadReadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1SetThreadReadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<SetThreadReadCommandOutput> {
    return deserializeAws_restJson1SetThreadReadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
