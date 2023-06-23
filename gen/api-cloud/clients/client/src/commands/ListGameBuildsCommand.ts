// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ListGameBuildsInput,
  ListGameBuildsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ListGameBuildsCommand,
  serializeAws_restJson1ListGameBuildsCommand,
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

export interface ListGameBuildsCommandInput extends ListGameBuildsInput {}
export interface ListGameBuildsCommandOutput extends ListGameBuildsOutput, __MetadataBearer {}

/**
 * Lists game builds for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ListGameBuildsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ListGameBuildsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ListGameBuildsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListGameBuildsCommandInput} for command's `input` shape.
 * @see {@link ListGameBuildsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ListGameBuildsCommand extends $Command<ListGameBuildsCommandInput, ListGameBuildsCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListGameBuildsCommandInput) {
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
  ): Handler<ListGameBuildsCommandInput, ListGameBuildsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ListGameBuildsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ListGameBuildsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ListGameBuildsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ListGameBuildsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ListGameBuildsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListGameBuildsCommandOutput> {
    return deserializeAws_restJson1ListGameBuildsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
