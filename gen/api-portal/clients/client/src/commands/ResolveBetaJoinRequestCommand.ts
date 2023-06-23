// smithy-typescript generated code
import {
  PortalServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../PortalServiceClient";
import {
  ResolveBetaJoinRequestInput,
  ResolveBetaJoinRequestOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ResolveBetaJoinRequestCommand,
  serializeAws_restJson1ResolveBetaJoinRequestCommand,
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

export interface ResolveBetaJoinRequestCommandInput extends ResolveBetaJoinRequestInput {}
export interface ResolveBetaJoinRequestCommandOutput extends ResolveBetaJoinRequestOutput, __MetadataBearer {}

/**
 * Resolves a beta join request for a given identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { PortalServiceClient, ResolveBetaJoinRequestCommand } from "@rivet-gg/portal"; // ES Modules import
 * // const { PortalServiceClient, ResolveBetaJoinRequestCommand } = require("@rivet-gg/portal"); // CommonJS import
 * const client = new PortalServiceClient(config);
 * const command = new ResolveBetaJoinRequestCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ResolveBetaJoinRequestCommandInput} for command's `input` shape.
 * @see {@link ResolveBetaJoinRequestCommandOutput} for command's `response` shape.
 * @see {@link PortalServiceClientResolvedConfig | config} for PortalServiceClient's `config` shape.
 *
 */
export class ResolveBetaJoinRequestCommand extends $Command<ResolveBetaJoinRequestCommandInput, ResolveBetaJoinRequestCommandOutput, PortalServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ResolveBetaJoinRequestCommandInput) {
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
  ): Handler<ResolveBetaJoinRequestCommandInput, ResolveBetaJoinRequestCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "PortalServiceClient";
    const commandName = "ResolveBetaJoinRequestCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ResolveBetaJoinRequestInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ResolveBetaJoinRequestOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ResolveBetaJoinRequestCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ResolveBetaJoinRequestCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ResolveBetaJoinRequestCommandOutput> {
    return deserializeAws_restJson1ResolveBetaJoinRequestCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
