// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  BanGroupIdentityInput,
  BanGroupIdentityOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1BanGroupIdentityCommand,
  serializeAws_restJson1BanGroupIdentityCommand,
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

export interface BanGroupIdentityCommandInput extends BanGroupIdentityInput {}
export interface BanGroupIdentityCommandOutput extends BanGroupIdentityOutput, __MetadataBearer {}

/**
 * Bans an identity from a group. Must be the owner of the group to perform this action. The banned identity
 * will no longer be able to create a join request or use a group invite.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, BanGroupIdentityCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, BanGroupIdentityCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new BanGroupIdentityCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link BanGroupIdentityCommandInput} for command's `input` shape.
 * @see {@link BanGroupIdentityCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class BanGroupIdentityCommand extends $Command<BanGroupIdentityCommandInput, BanGroupIdentityCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: BanGroupIdentityCommandInput) {
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
  ): Handler<BanGroupIdentityCommandInput, BanGroupIdentityCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "BanGroupIdentityCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        BanGroupIdentityInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        BanGroupIdentityOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: BanGroupIdentityCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1BanGroupIdentityCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<BanGroupIdentityCommandOutput> {
    return deserializeAws_restJson1BanGroupIdentityCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
