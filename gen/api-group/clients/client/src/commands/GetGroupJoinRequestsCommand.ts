// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  GetGroupJoinRequestsInput,
  GetGroupJoinRequestsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetGroupJoinRequestsCommand,
  serializeAws_restJson1GetGroupJoinRequestsCommand,
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

export interface GetGroupJoinRequestsCommandInput extends GetGroupJoinRequestsInput {}
export interface GetGroupJoinRequestsCommandOutput extends GetGroupJoinRequestsOutput, __MetadataBearer {}

/**
 * Returns a group's join requests. Must have valid permissions to view.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, GetGroupJoinRequestsCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, GetGroupJoinRequestsCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new GetGroupJoinRequestsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupJoinRequestsCommandInput} for command's `input` shape.
 * @see {@link GetGroupJoinRequestsCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class GetGroupJoinRequestsCommand extends $Command<GetGroupJoinRequestsCommandInput, GetGroupJoinRequestsCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetGroupJoinRequestsCommandInput) {
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
  ): Handler<GetGroupJoinRequestsCommandInput, GetGroupJoinRequestsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "GetGroupJoinRequestsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetGroupJoinRequestsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetGroupJoinRequestsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetGroupJoinRequestsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetGroupJoinRequestsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetGroupJoinRequestsCommandOutput> {
    return deserializeAws_restJson1GetGroupJoinRequestsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
