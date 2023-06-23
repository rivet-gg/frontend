// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  CreateGameNamespaceTokenDevelopmentInput,
  CreateGameNamespaceTokenDevelopmentOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand,
  serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand,
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

export interface CreateGameNamespaceTokenDevelopmentCommandInput extends CreateGameNamespaceTokenDevelopmentInput {}
export interface CreateGameNamespaceTokenDevelopmentCommandOutput extends CreateGameNamespaceTokenDevelopmentOutput, __MetadataBearer {}

/**
 * Creates a development token for the given namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameNamespaceTokenDevelopmentCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameNamespaceTokenDevelopmentCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameNamespaceTokenDevelopmentCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameNamespaceTokenDevelopmentCommandInput} for command's `input` shape.
 * @see {@link CreateGameNamespaceTokenDevelopmentCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class CreateGameNamespaceTokenDevelopmentCommand extends $Command<CreateGameNamespaceTokenDevelopmentCommandInput, CreateGameNamespaceTokenDevelopmentCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateGameNamespaceTokenDevelopmentCommandInput) {
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
  ): Handler<CreateGameNamespaceTokenDevelopmentCommandInput, CreateGameNamespaceTokenDevelopmentCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "CreateGameNamespaceTokenDevelopmentCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CreateGameNamespaceTokenDevelopmentInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CreateGameNamespaceTokenDevelopmentOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CreateGameNamespaceTokenDevelopmentCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CreateGameNamespaceTokenDevelopmentCommandOutput> {
    return deserializeAws_restJson1CreateGameNamespaceTokenDevelopmentCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
