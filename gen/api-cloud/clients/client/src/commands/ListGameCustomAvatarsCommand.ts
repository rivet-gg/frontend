// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ListGameCustomAvatarsInput,
  ListGameCustomAvatarsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ListGameCustomAvatarsCommand,
  serializeAws_restJson1ListGameCustomAvatarsCommand,
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

export interface ListGameCustomAvatarsCommandInput extends ListGameCustomAvatarsInput {}
export interface ListGameCustomAvatarsCommandOutput extends ListGameCustomAvatarsOutput, __MetadataBearer {}

/**
 * Lists custom avatars for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ListGameCustomAvatarsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ListGameCustomAvatarsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ListGameCustomAvatarsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListGameCustomAvatarsCommandInput} for command's `input` shape.
 * @see {@link ListGameCustomAvatarsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ListGameCustomAvatarsCommand extends $Command<ListGameCustomAvatarsCommandInput, ListGameCustomAvatarsCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListGameCustomAvatarsCommandInput) {
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
  ): Handler<ListGameCustomAvatarsCommandInput, ListGameCustomAvatarsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ListGameCustomAvatarsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ListGameCustomAvatarsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ListGameCustomAvatarsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ListGameCustomAvatarsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ListGameCustomAvatarsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListGameCustomAvatarsCommandOutput> {
    return deserializeAws_restJson1ListGameCustomAvatarsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
