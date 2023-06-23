// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  UnbanGroupIdentityInput,
  UnbanGroupIdentityOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1UnbanGroupIdentityCommand,
  serializeAws_restJson1UnbanGroupIdentityCommand,
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

export interface UnbanGroupIdentityCommandInput extends UnbanGroupIdentityInput {}
export interface UnbanGroupIdentityCommandOutput extends UnbanGroupIdentityOutput, __MetadataBearer {}

/**
 * Unbans an identity from a group. Must be the owner of the group to perform this action.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, UnbanGroupIdentityCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, UnbanGroupIdentityCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new UnbanGroupIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UnbanGroupIdentityCommandInput} for command's `input` shape.
 * @see {@link UnbanGroupIdentityCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class UnbanGroupIdentityCommand extends $Command<UnbanGroupIdentityCommandInput, UnbanGroupIdentityCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: UnbanGroupIdentityCommandInput) {
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
  ): Handler<UnbanGroupIdentityCommandInput, UnbanGroupIdentityCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "UnbanGroupIdentityCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        UnbanGroupIdentityInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        UnbanGroupIdentityOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: UnbanGroupIdentityCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1UnbanGroupIdentityCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<UnbanGroupIdentityCommandOutput> {
    return deserializeAws_restJson1UnbanGroupIdentityCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
