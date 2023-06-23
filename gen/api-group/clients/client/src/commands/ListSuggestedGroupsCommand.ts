// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  ListSuggestedGroupsInput,
  ListSuggestedGroupsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ListSuggestedGroupsCommand,
  serializeAws_restJson1ListSuggestedGroupsCommand,
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

export interface ListSuggestedGroupsCommandInput extends ListSuggestedGroupsInput {}
export interface ListSuggestedGroupsCommandOutput extends ListSuggestedGroupsOutput, __MetadataBearer {}

/**
 * Returns a list of suggested groups.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ListSuggestedGroupsCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ListSuggestedGroupsCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ListSuggestedGroupsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListSuggestedGroupsCommandInput} for command's `input` shape.
 * @see {@link ListSuggestedGroupsCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class ListSuggestedGroupsCommand extends $Command<ListSuggestedGroupsCommandInput, ListSuggestedGroupsCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListSuggestedGroupsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: GroupServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListSuggestedGroupsCommandInput, ListSuggestedGroupsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "ListSuggestedGroupsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ListSuggestedGroupsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ListSuggestedGroupsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ListSuggestedGroupsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ListSuggestedGroupsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListSuggestedGroupsCommandOutput> {
    return deserializeAws_restJson1ListSuggestedGroupsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
