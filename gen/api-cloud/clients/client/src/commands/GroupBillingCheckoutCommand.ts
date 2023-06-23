// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GroupBillingCheckoutInput,
  GroupBillingCheckoutOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GroupBillingCheckoutCommand,
  serializeAws_restJson1GroupBillingCheckoutCommand,
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

export interface GroupBillingCheckoutCommandInput extends GroupBillingCheckoutInput {}
export interface GroupBillingCheckoutCommandOutput extends GroupBillingCheckoutOutput, __MetadataBearer {}

/**
 * Creates a checkout session for the given group.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GroupBillingCheckoutCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GroupBillingCheckoutCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GroupBillingCheckoutCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GroupBillingCheckoutCommandInput} for command's `input` shape.
 * @see {@link GroupBillingCheckoutCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GroupBillingCheckoutCommand extends $Command<GroupBillingCheckoutCommandInput, GroupBillingCheckoutCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GroupBillingCheckoutCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: CloudServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GroupBillingCheckoutCommandInput, GroupBillingCheckoutCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GroupBillingCheckoutCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GroupBillingCheckoutInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GroupBillingCheckoutOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GroupBillingCheckoutCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GroupBillingCheckoutCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GroupBillingCheckoutCommandOutput> {
    return deserializeAws_restJson1GroupBillingCheckoutCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
