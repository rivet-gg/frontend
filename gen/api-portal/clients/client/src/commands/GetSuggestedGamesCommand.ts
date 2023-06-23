// smithy-typescript generated code
import {
  PortalServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../PortalServiceClient";
import {
  GetSuggestedGamesInput,
  GetSuggestedGamesOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetSuggestedGamesCommand,
  serializeAws_restJson1GetSuggestedGamesCommand,
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

export interface GetSuggestedGamesCommandInput extends GetSuggestedGamesInput {}
export interface GetSuggestedGamesCommandOutput extends GetSuggestedGamesOutput, __MetadataBearer {}

/**
 * Returns a list of games on the arcade page.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, GetSuggestedGamesCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, GetSuggestedGamesCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new GetSuggestedGamesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetSuggestedGamesCommandInput} for command's `input` shape.
 * @see {@link GetSuggestedGamesCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export class GetSuggestedGamesCommand extends $Command<GetSuggestedGamesCommandInput, GetSuggestedGamesCommandOutput, PortalServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetSuggestedGamesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: PortalServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetSuggestedGamesCommandInput, GetSuggestedGamesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PortalServiceClient";
    const commandName = "GetSuggestedGamesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetSuggestedGamesInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetSuggestedGamesOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetSuggestedGamesCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetSuggestedGamesCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetSuggestedGamesCommandOutput> {
    return deserializeAws_restJson1GetSuggestedGamesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
