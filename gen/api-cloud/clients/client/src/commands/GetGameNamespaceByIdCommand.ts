// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GetGameNamespaceByIdInput,
  GetGameNamespaceByIdOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetGameNamespaceByIdCommand,
  serializeAws_restJson1GetGameNamespaceByIdCommand,
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

export interface GetGameNamespaceByIdCommandInput extends GetGameNamespaceByIdInput {}
export interface GetGameNamespaceByIdCommandOutput extends GetGameNamespaceByIdOutput, __MetadataBearer {}

/**
 * Gets a game namespace by namespace ID.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGameNamespaceByIdCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGameNamespaceByIdCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGameNamespaceByIdCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameNamespaceByIdCommandInput} for command's `input` shape.
 * @see {@link GetGameNamespaceByIdCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GetGameNamespaceByIdCommand extends $Command<GetGameNamespaceByIdCommandInput, GetGameNamespaceByIdCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetGameNamespaceByIdCommandInput) {
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
  ): Handler<GetGameNamespaceByIdCommandInput, GetGameNamespaceByIdCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GetGameNamespaceByIdCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetGameNamespaceByIdInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetGameNamespaceByIdOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetGameNamespaceByIdCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetGameNamespaceByIdCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetGameNamespaceByIdCommandOutput> {
    return deserializeAws_restJson1GetGameNamespaceByIdCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
