// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  GetGamesInput,
  GetGamesOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetGamesCommand,
  serializeAws_restJson1GetGamesCommand,
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

export interface GetGamesCommandInput extends GetGamesInput {}
export interface GetGamesCommandOutput extends GetGamesOutput, __MetadataBearer {}

/**
 * Returns a list of games in which the current identity is a group member of its development team.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GetGamesCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GetGamesCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GetGamesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGamesCommandInput} for command's `input` shape.
 * @see {@link GetGamesCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class GetGamesCommand extends $Command<GetGamesCommandInput, GetGamesCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetGamesCommandInput) {
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
  ): Handler<GetGamesCommandInput, GetGamesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "GetGamesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetGamesInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetGamesOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetGamesCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetGamesCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetGamesCommandOutput> {
    return deserializeAws_restJson1GetGamesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
