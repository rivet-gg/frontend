// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  CreateGroupJoinRequestInput,
  CreateGroupJoinRequestOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CreateGroupJoinRequestCommand,
  serializeAws_restJson1CreateGroupJoinRequestCommand,
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

export interface CreateGroupJoinRequestCommandInput extends CreateGroupJoinRequestInput {}
export interface CreateGroupJoinRequestCommandOutput extends CreateGroupJoinRequestOutput, __MetadataBearer {}

/**
 * Requests to join a group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, CreateGroupJoinRequestCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, CreateGroupJoinRequestCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new CreateGroupJoinRequestCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGroupJoinRequestCommandInput} for command's `input` shape.
 * @see {@link CreateGroupJoinRequestCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class CreateGroupJoinRequestCommand extends $Command<CreateGroupJoinRequestCommandInput, CreateGroupJoinRequestCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateGroupJoinRequestCommandInput) {
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
  ): Handler<CreateGroupJoinRequestCommandInput, CreateGroupJoinRequestCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "CreateGroupJoinRequestCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CreateGroupJoinRequestInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CreateGroupJoinRequestOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CreateGroupJoinRequestCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CreateGroupJoinRequestCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CreateGroupJoinRequestCommandOutput> {
    return deserializeAws_restJson1CreateGroupJoinRequestCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
