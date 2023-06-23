// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GetRayPerfLogsInput,
  GetRayPerfLogsOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetRayPerfLogsCommand,
  serializeAws_restJson1GetRayPerfLogsCommand,
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

export interface GetRayPerfLogsCommandInput extends GetRayPerfLogsInput {}
export interface GetRayPerfLogsCommandOutput extends GetRayPerfLogsOutput, __MetadataBearer {}

/**
 * Returns performance information about a Rivet Ray.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetRayPerfLogsCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetRayPerfLogsCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetRayPerfLogsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetRayPerfLogsCommandInput} for command's `input` shape.
 * @see {@link GetRayPerfLogsCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GetRayPerfLogsCommand extends $Command<GetRayPerfLogsCommandInput, GetRayPerfLogsCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetRayPerfLogsCommandInput) {
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
  ): Handler<GetRayPerfLogsCommandInput, GetRayPerfLogsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GetRayPerfLogsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetRayPerfLogsInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetRayPerfLogsOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetRayPerfLogsCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetRayPerfLogsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetRayPerfLogsCommandOutput> {
    return deserializeAws_restJson1GetRayPerfLogsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
