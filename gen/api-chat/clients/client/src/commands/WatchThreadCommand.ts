// smithy-typescript generated code
import {
  ChatServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ChatServiceClient";
import {
  WatchThreadInput,
  WatchThreadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1WatchThreadCommand,
  serializeAws_restJson1WatchThreadCommand,
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

export interface WatchThreadCommandInput extends WatchThreadInput {}
export interface WatchThreadCommandOutput extends WatchThreadOutput, __MetadataBearer {}

/**
 * Fetches all relevant changes from a thread that have happened since the
 * given watch index.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, WatchThreadCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, WatchThreadCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new WatchThreadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link WatchThreadCommandInput} for command's `input` shape.
 * @see {@link WatchThreadCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export class WatchThreadCommand extends $Command<WatchThreadCommandInput, WatchThreadCommandOutput, ChatServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: WatchThreadCommandInput) {
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
  ): Handler<WatchThreadCommandInput, WatchThreadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChatServiceClient";
    const commandName = "WatchThreadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        WatchThreadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        WatchThreadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: WatchThreadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1WatchThreadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<WatchThreadCommandOutput> {
    return deserializeAws_restJson1WatchThreadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
