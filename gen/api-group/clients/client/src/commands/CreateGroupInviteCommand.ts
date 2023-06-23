// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  CreateGroupInviteInput,
  CreateGroupInviteOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CreateGroupInviteCommand,
  serializeAws_restJson1CreateGroupInviteCommand,
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

export interface CreateGroupInviteCommandInput extends CreateGroupInviteInput {}
export interface CreateGroupInviteCommandOutput extends CreateGroupInviteOutput, __MetadataBearer {}

/**
 * Creates a group invite. Can be shared with other identities to let them join
 * this group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, CreateGroupInviteCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, CreateGroupInviteCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new CreateGroupInviteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGroupInviteCommandInput} for command's `input` shape.
 * @see {@link CreateGroupInviteCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class CreateGroupInviteCommand extends $Command<CreateGroupInviteCommandInput, CreateGroupInviteCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateGroupInviteCommandInput) {
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
  ): Handler<CreateGroupInviteCommandInput, CreateGroupInviteCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "CreateGroupInviteCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CreateGroupInviteInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CreateGroupInviteOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CreateGroupInviteCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CreateGroupInviteCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CreateGroupInviteCommandOutput> {
    return deserializeAws_restJson1CreateGroupInviteCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
