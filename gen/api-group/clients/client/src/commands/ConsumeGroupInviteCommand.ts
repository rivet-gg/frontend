// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  ConsumeGroupInviteInput,
  ConsumeGroupInviteOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ConsumeGroupInviteCommand,
  serializeAws_restJson1ConsumeGroupInviteCommand,
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

export interface ConsumeGroupInviteCommandInput extends ConsumeGroupInviteInput {}
export interface ConsumeGroupInviteCommandOutput extends ConsumeGroupInviteOutput, __MetadataBearer {}

/**
 * Consumes a group invite to join a group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ConsumeGroupInviteCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ConsumeGroupInviteCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ConsumeGroupInviteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ConsumeGroupInviteCommandInput} for command's `input` shape.
 * @see {@link ConsumeGroupInviteCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class ConsumeGroupInviteCommand extends $Command<ConsumeGroupInviteCommandInput, ConsumeGroupInviteCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ConsumeGroupInviteCommandInput) {
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
  ): Handler<ConsumeGroupInviteCommandInput, ConsumeGroupInviteCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "ConsumeGroupInviteCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ConsumeGroupInviteInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ConsumeGroupInviteOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ConsumeGroupInviteCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ConsumeGroupInviteCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ConsumeGroupInviteCommandOutput> {
    return deserializeAws_restJson1ConsumeGroupInviteCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
