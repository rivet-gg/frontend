// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  CreateGameNamespaceTokenPublicInput,
  CreateGameNamespaceTokenPublicOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand,
  serializeAws_restJson1CreateGameNamespaceTokenPublicCommand,
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

export interface CreateGameNamespaceTokenPublicCommandInput extends CreateGameNamespaceTokenPublicInput {}
export interface CreateGameNamespaceTokenPublicCommandOutput extends CreateGameNamespaceTokenPublicOutput, __MetadataBearer {}

/**
 * Creates a public token for the given namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameNamespaceTokenPublicCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameNamespaceTokenPublicCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameNamespaceTokenPublicCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameNamespaceTokenPublicCommandInput} for command's `input` shape.
 * @see {@link CreateGameNamespaceTokenPublicCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class CreateGameNamespaceTokenPublicCommand extends $Command<CreateGameNamespaceTokenPublicCommandInput, CreateGameNamespaceTokenPublicCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateGameNamespaceTokenPublicCommandInput) {
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
  ): Handler<CreateGameNamespaceTokenPublicCommandInput, CreateGameNamespaceTokenPublicCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "CreateGameNamespaceTokenPublicCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CreateGameNamespaceTokenPublicInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CreateGameNamespaceTokenPublicOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CreateGameNamespaceTokenPublicCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CreateGameNamespaceTokenPublicCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CreateGameNamespaceTokenPublicCommandOutput> {
    return deserializeAws_restJson1CreateGameNamespaceTokenPublicCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
