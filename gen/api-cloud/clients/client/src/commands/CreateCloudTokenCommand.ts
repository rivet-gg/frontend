// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  CreateCloudTokenInput,
  CreateCloudTokenOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CreateCloudTokenCommand,
  serializeAws_restJson1CreateCloudTokenCommand,
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

export interface CreateCloudTokenCommandInput extends CreateCloudTokenInput {}
export interface CreateCloudTokenCommandOutput extends CreateCloudTokenOutput, __MetadataBearer {}

/**
 * Creates a new game cloud token.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateCloudTokenCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateCloudTokenCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateCloudTokenCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateCloudTokenCommandInput} for command's `input` shape.
 * @see {@link CreateCloudTokenCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class CreateCloudTokenCommand extends $Command<CreateCloudTokenCommandInput, CreateCloudTokenCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateCloudTokenCommandInput) {
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
  ): Handler<CreateCloudTokenCommandInput, CreateCloudTokenCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "CreateCloudTokenCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CreateCloudTokenInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CreateCloudTokenOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CreateCloudTokenCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CreateCloudTokenCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CreateCloudTokenCommandOutput> {
    return deserializeAws_restJson1CreateCloudTokenCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
