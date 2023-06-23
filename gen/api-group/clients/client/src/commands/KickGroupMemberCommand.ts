// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  KickGroupMemberInput,
  KickGroupMemberOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1KickGroupMemberCommand,
  serializeAws_restJson1KickGroupMemberCommand,
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

export interface KickGroupMemberCommandInput extends KickGroupMemberInput {}
export interface KickGroupMemberCommandOutput extends KickGroupMemberOutput, __MetadataBearer {}

/**
 * Kicks an identity from a group. Must be the owner of the group to perform this action.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, KickGroupMemberCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, KickGroupMemberCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new KickGroupMemberCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link KickGroupMemberCommandInput} for command's `input` shape.
 * @see {@link KickGroupMemberCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class KickGroupMemberCommand extends $Command<KickGroupMemberCommandInput, KickGroupMemberCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: KickGroupMemberCommandInput) {
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
  ): Handler<KickGroupMemberCommandInput, KickGroupMemberCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "KickGroupMemberCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        KickGroupMemberInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        KickGroupMemberOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: KickGroupMemberCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1KickGroupMemberCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<KickGroupMemberCommandOutput> {
    return deserializeAws_restJson1KickGroupMemberCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
