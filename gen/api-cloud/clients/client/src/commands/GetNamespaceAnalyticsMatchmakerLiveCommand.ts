// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GetNamespaceAnalyticsMatchmakerLiveInput,
  GetNamespaceAnalyticsMatchmakerLiveOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand,
  serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand,
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

export interface GetNamespaceAnalyticsMatchmakerLiveCommandInput extends GetNamespaceAnalyticsMatchmakerLiveInput {}
export interface GetNamespaceAnalyticsMatchmakerLiveCommandOutput extends GetNamespaceAnalyticsMatchmakerLiveOutput, __MetadataBearer {}

/**
 * Returns live information about all active lobies for a given namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetNamespaceAnalyticsMatchmakerLiveCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetNamespaceAnalyticsMatchmakerLiveCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetNamespaceAnalyticsMatchmakerLiveCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetNamespaceAnalyticsMatchmakerLiveCommandInput} for command's `input` shape.
 * @see {@link GetNamespaceAnalyticsMatchmakerLiveCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GetNamespaceAnalyticsMatchmakerLiveCommand extends $Command<GetNamespaceAnalyticsMatchmakerLiveCommandInput, GetNamespaceAnalyticsMatchmakerLiveCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetNamespaceAnalyticsMatchmakerLiveCommandInput) {
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
  ): Handler<GetNamespaceAnalyticsMatchmakerLiveCommandInput, GetNamespaceAnalyticsMatchmakerLiveCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GetNamespaceAnalyticsMatchmakerLiveCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetNamespaceAnalyticsMatchmakerLiveInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetNamespaceAnalyticsMatchmakerLiveOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetNamespaceAnalyticsMatchmakerLiveCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetNamespaceAnalyticsMatchmakerLiveCommandOutput> {
    return deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
