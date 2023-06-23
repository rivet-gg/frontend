// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GetGameBillingPlansInput,
  GetGameBillingPlansOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetGameBillingPlansCommand,
  serializeAws_restJson1GetGameBillingPlansCommand,
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

export interface GetGameBillingPlansCommandInput extends GetGameBillingPlansInput {}
export interface GetGameBillingPlansCommandOutput extends GetGameBillingPlansOutput, __MetadataBearer {}

/**
 * Returns all available billing plans for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGameBillingPlansCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGameBillingPlansCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGameBillingPlansCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameBillingPlansCommandInput} for command's `input` shape.
 * @see {@link GetGameBillingPlansCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GetGameBillingPlansCommand extends $Command<GetGameBillingPlansCommandInput, GetGameBillingPlansCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetGameBillingPlansCommandInput) {
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
  ): Handler<GetGameBillingPlansCommandInput, GetGameBillingPlansCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GetGameBillingPlansCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetGameBillingPlansInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetGameBillingPlansOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetGameBillingPlansCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetGameBillingPlansCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetGameBillingPlansCommandOutput> {
    return deserializeAws_restJson1GetGameBillingPlansCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
