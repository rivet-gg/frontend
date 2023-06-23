// smithy-typescript generated code
import {
  AuthServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../AuthServiceClient";
import {
  RefreshIdentityTokenInput,
  RefreshIdentityTokenOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1RefreshIdentityTokenCommand,
  serializeAws_restJson1RefreshIdentityTokenCommand,
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

export interface RefreshIdentityTokenCommandInput extends RefreshIdentityTokenInput {}
export interface RefreshIdentityTokenCommandOutput extends RefreshIdentityTokenOutput, __MetadataBearer {}

/**
 * Refreshes the current identity's token and sets authentication headers.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { AuthServiceClient, RefreshIdentityTokenCommand } from "@rivet-gg/auth"; // ES Modules import
 * // const { AuthServiceClient, RefreshIdentityTokenCommand } = require("@rivet-gg/auth"); // CommonJS import
 * const client = new AuthServiceClient(config);
 * const command = new RefreshIdentityTokenCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RefreshIdentityTokenCommandInput} for command's `input` shape.
 * @see {@link RefreshIdentityTokenCommandOutput} for command's `response` shape.
 * @see {@link AuthServiceClientResolvedConfig | config} for AuthServiceClient's `config` shape.
 *
 */
export class RefreshIdentityTokenCommand extends $Command<RefreshIdentityTokenCommandInput, RefreshIdentityTokenCommandOutput, AuthServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: RefreshIdentityTokenCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: AuthServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<RefreshIdentityTokenCommandInput, RefreshIdentityTokenCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "AuthServiceClient";
    const commandName = "RefreshIdentityTokenCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        RefreshIdentityTokenInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        RefreshIdentityTokenOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: RefreshIdentityTokenCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1RefreshIdentityTokenCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<RefreshIdentityTokenCommandOutput> {
    return deserializeAws_restJson1RefreshIdentityTokenCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
