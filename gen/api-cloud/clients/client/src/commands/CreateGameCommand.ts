// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  CreateGameInput,
  CreateGameOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CreateGameCommand,
  serializeAws_restJson1CreateGameCommand,
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

export interface CreateGameCommandInput extends CreateGameInput {}
export interface CreateGameCommandOutput extends CreateGameOutput, __MetadataBearer {}

/**
 * Creates a new game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameCommandInput} for command's `input` shape.
 * @see {@link CreateGameCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class CreateGameCommand extends $Command<CreateGameCommandInput, CreateGameCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateGameCommandInput) {
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
  ): Handler<CreateGameCommandInput, CreateGameCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "CreateGameCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CreateGameInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CreateGameOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CreateGameCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CreateGameCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CreateGameCommandOutput> {
    return deserializeAws_restJson1CreateGameCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
