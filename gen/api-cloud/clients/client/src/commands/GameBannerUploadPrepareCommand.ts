// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GameBannerUploadPrepareInput,
  GameBannerUploadPrepareOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GameBannerUploadPrepareCommand,
  serializeAws_restJson1GameBannerUploadPrepareCommand,
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

export interface GameBannerUploadPrepareCommandInput extends GameBannerUploadPrepareInput {}
export interface GameBannerUploadPrepareCommandOutput extends GameBannerUploadPrepareOutput, __MetadataBearer {}

/**
 * Prepares a game banner image upload.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GameBannerUploadPrepareCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GameBannerUploadPrepareCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GameBannerUploadPrepareCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GameBannerUploadPrepareCommandInput} for command's `input` shape.
 * @see {@link GameBannerUploadPrepareCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GameBannerUploadPrepareCommand extends $Command<GameBannerUploadPrepareCommandInput, GameBannerUploadPrepareCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GameBannerUploadPrepareCommandInput) {
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
  ): Handler<GameBannerUploadPrepareCommandInput, GameBannerUploadPrepareCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GameBannerUploadPrepareCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GameBannerUploadPrepareInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GameBannerUploadPrepareOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GameBannerUploadPrepareCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GameBannerUploadPrepareCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GameBannerUploadPrepareCommandOutput> {
    return deserializeAws_restJson1GameBannerUploadPrepareCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
