// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  SetGameBillingPlanInput,
  SetGameBillingPlanOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1SetGameBillingPlanCommand,
  serializeAws_restJson1SetGameBillingPlanCommand,
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

export interface SetGameBillingPlanCommandInput extends SetGameBillingPlanInput {}
export interface SetGameBillingPlanCommandOutput extends SetGameBillingPlanOutput, __MetadataBearer {}

/**
 * Sets the current billing plan of the given developer game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, SetGameBillingPlanCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, SetGameBillingPlanCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new SetGameBillingPlanCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link SetGameBillingPlanCommandInput} for command's `input` shape.
 * @see {@link SetGameBillingPlanCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class SetGameBillingPlanCommand extends $Command<SetGameBillingPlanCommandInput, SetGameBillingPlanCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SetGameBillingPlanCommandInput) {
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
  ): Handler<SetGameBillingPlanCommandInput, SetGameBillingPlanCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "SetGameBillingPlanCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        SetGameBillingPlanInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        SetGameBillingPlanOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: SetGameBillingPlanCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1SetGameBillingPlanCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<SetGameBillingPlanCommandOutput> {
    return deserializeAws_restJson1SetGameBillingPlanCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
