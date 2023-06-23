// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GameBannerUploadCompleteInput,
  GameBannerUploadCompleteOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GameBannerUploadCompleteCommand,
  serializeAws_restJson1GameBannerUploadCompleteCommand,
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

export interface GameBannerUploadCompleteCommandInput extends GameBannerUploadCompleteInput {}
export interface GameBannerUploadCompleteCommandOutput extends GameBannerUploadCompleteOutput, __MetadataBearer {}

/**
 * Completes an game banner image upload. Must be called after the file upload process completes.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GameBannerUploadCompleteCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GameBannerUploadCompleteCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GameBannerUploadCompleteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GameBannerUploadCompleteCommandInput} for command's `input` shape.
 * @see {@link GameBannerUploadCompleteCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GameBannerUploadCompleteCommand extends $Command<GameBannerUploadCompleteCommandInput, GameBannerUploadCompleteCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GameBannerUploadCompleteCommandInput) {
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
  ): Handler<GameBannerUploadCompleteCommandInput, GameBannerUploadCompleteCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GameBannerUploadCompleteCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GameBannerUploadCompleteInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GameBannerUploadCompleteOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GameBannerUploadCompleteCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GameBannerUploadCompleteCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GameBannerUploadCompleteCommandOutput> {
    return deserializeAws_restJson1GameBannerUploadCompleteCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
