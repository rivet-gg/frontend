// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  SearchGroupsInput,
  SearchGroupsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1SearchGroupsCommand,
  serializeAws_restJson1SearchGroupsCommand,
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

export interface SearchGroupsCommandInput extends SearchGroupsInput {}
export interface SearchGroupsCommandOutput extends SearchGroupsOutput, __MetadataBearer {}

/**
 * Fuzzy search for groups.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, SearchGroupsCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, SearchGroupsCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new SearchGroupsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SearchGroupsCommandInput} for command's `input` shape.
 * @see {@link SearchGroupsCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class SearchGroupsCommand extends $Command<SearchGroupsCommandInput, SearchGroupsCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SearchGroupsCommandInput) {
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
  ): Handler<SearchGroupsCommandInput, SearchGroupsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "SearchGroupsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        SearchGroupsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        SearchGroupsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: SearchGroupsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1SearchGroupsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<SearchGroupsCommandOutput> {
    return deserializeAws_restJson1SearchGroupsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
