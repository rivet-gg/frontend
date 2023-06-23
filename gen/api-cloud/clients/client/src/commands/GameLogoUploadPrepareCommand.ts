// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GameLogoUploadPrepareInput,
  GameLogoUploadPrepareOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GameLogoUploadPrepareCommand,
  serializeAws_restJson1GameLogoUploadPrepareCommand,
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

export interface GameLogoUploadPrepareCommandInput extends GameLogoUploadPrepareInput {}
export interface GameLogoUploadPrepareCommandOutput extends GameLogoUploadPrepareOutput, __MetadataBearer {}

/**
 * Prepares a game logo image upload.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GameLogoUploadPrepareCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GameLogoUploadPrepareCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GameLogoUploadPrepareCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GameLogoUploadPrepareCommandInput} for command's `input` shape.
 * @see {@link GameLogoUploadPrepareCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GameLogoUploadPrepareCommand extends $Command<GameLogoUploadPrepareCommandInput, GameLogoUploadPrepareCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GameLogoUploadPrepareCommandInput) {
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
  ): Handler<GameLogoUploadPrepareCommandInput, GameLogoUploadPrepareCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GameLogoUploadPrepareCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GameLogoUploadPrepareInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GameLogoUploadPrepareOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GameLogoUploadPrepareCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GameLogoUploadPrepareCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GameLogoUploadPrepareCommandOutput> {
    return deserializeAws_restJson1GameLogoUploadPrepareCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
