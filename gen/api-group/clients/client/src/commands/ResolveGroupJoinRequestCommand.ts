// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  ResolveGroupJoinRequestInput,
  ResolveGroupJoinRequestOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ResolveGroupJoinRequestCommand,
  serializeAws_restJson1ResolveGroupJoinRequestCommand,
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

export interface ResolveGroupJoinRequestCommandInput extends ResolveGroupJoinRequestInput {}
export interface ResolveGroupJoinRequestCommandOutput extends ResolveGroupJoinRequestOutput, __MetadataBearer {}

/**
 * Resolves a join request for a given group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, ResolveGroupJoinRequestCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, ResolveGroupJoinRequestCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new ResolveGroupJoinRequestCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ResolveGroupJoinRequestCommandInput} for command's `input` shape.
 * @see {@link ResolveGroupJoinRequestCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class ResolveGroupJoinRequestCommand extends $Command<ResolveGroupJoinRequestCommandInput, ResolveGroupJoinRequestCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ResolveGroupJoinRequestCommandInput) {
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
  ): Handler<ResolveGroupJoinRequestCommandInput, ResolveGroupJoinRequestCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "ResolveGroupJoinRequestCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ResolveGroupJoinRequestInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ResolveGroupJoinRequestOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ResolveGroupJoinRequestCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ResolveGroupJoinRequestCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ResolveGroupJoinRequestCommandOutput> {
    return deserializeAws_restJson1ResolveGroupJoinRequestCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
