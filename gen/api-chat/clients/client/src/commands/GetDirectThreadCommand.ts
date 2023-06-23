// smithy-typescript generated code
import {
  ChatServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ChatServiceClient";
import {
  GetDirectThreadInput,
  GetDirectThreadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetDirectThreadCommand,
  serializeAws_restJson1GetDirectThreadCommand,
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

export interface GetDirectThreadCommandInput extends GetDirectThreadInput {}
export interface GetDirectThreadCommandOutput extends GetDirectThreadOutput, __MetadataBearer {}

/**
 * Returns a thread ID with a given identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ChatServiceClient, GetDirectThreadCommand } from "@rivet-gg/chat"; // ES Modules import
 * // const { ChatServiceClient, GetDirectThreadCommand } = require("@rivet-gg/chat"); // CommonJS import
 * const client = new ChatServiceClient(config);
 * const command = new GetDirectThreadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetDirectThreadCommandInput} for command's `input` shape.
 * @see {@link GetDirectThreadCommandOutput} for command's `response` shape.
 * @see {@link ChatServiceClientResolvedConfig | config} for ChatServiceClient's `config` shape.
 *
 */
export class GetDirectThreadCommand extends $Command<GetDirectThreadCommandInput, GetDirectThreadCommandOutput, ChatServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetDirectThreadCommandInput) {
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
  ): Handler<GetDirectThreadCommandInput, GetDirectThreadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ChatServiceClient";
    const commandName = "GetDirectThreadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetDirectThreadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetDirectThreadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetDirectThreadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetDirectThreadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetDirectThreadCommandOutput> {
    return deserializeAws_restJson1GetDirectThreadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
