// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  CreateGameBuildInput,
  CreateGameBuildOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CreateGameBuildCommand,
  serializeAws_restJson1CreateGameBuildCommand,
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

export interface CreateGameBuildCommandInput extends CreateGameBuildInput {}
export interface CreateGameBuildCommandOutput extends CreateGameBuildOutput, __MetadataBearer {}

/**
 * Creates a new game build for the given game.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CreateGameBuildCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CreateGameBuildCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CreateGameBuildCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateGameBuildCommandInput} for command's `input` shape.
 * @see {@link CreateGameBuildCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class CreateGameBuildCommand extends $Command<CreateGameBuildCommandInput, CreateGameBuildCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateGameBuildCommandInput) {
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
  ): Handler<CreateGameBuildCommandInput, CreateGameBuildCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "CreateGameBuildCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CreateGameBuildInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CreateGameBuildOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CreateGameBuildCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CreateGameBuildCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CreateGameBuildCommandOutput> {
    return deserializeAws_restJson1CreateGameBuildCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
