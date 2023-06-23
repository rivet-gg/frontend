// smithy-typescript generated code
import {
  PortalServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../PortalServiceClient";
import {
  GetGameProfileInput,
  GetGameProfileOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetGameProfileCommand,
  serializeAws_restJson1GetGameProfileCommand,
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

export interface GetGameProfileCommandInput extends GetGameProfileInput {}
export interface GetGameProfileCommandOutput extends GetGameProfileOutput, __MetadataBearer {}

/**
 * Returns a game profile.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, GetGameProfileCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, GetGameProfileCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new GetGameProfileCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGameProfileCommandInput} for command's `input` shape.
 * @see {@link GetGameProfileCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export class GetGameProfileCommand extends $Command<GetGameProfileCommandInput, GetGameProfileCommandOutput, PortalServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetGameProfileCommandInput) {
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
  ): Handler<GetGameProfileCommandInput, GetGameProfileCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PortalServiceClient";
    const commandName = "GetGameProfileCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetGameProfileInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetGameProfileOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetGameProfileCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetGameProfileCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetGameProfileCommandOutput> {
    return deserializeAws_restJson1GetGameProfileCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
