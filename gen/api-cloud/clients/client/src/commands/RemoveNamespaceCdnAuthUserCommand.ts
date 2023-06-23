// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  RemoveNamespaceCdnAuthUserInput,
  RemoveNamespaceCdnAuthUserOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand,
  serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand,
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

export interface RemoveNamespaceCdnAuthUserCommandInput extends RemoveNamespaceCdnAuthUserInput {}
export interface RemoveNamespaceCdnAuthUserCommandOutput extends RemoveNamespaceCdnAuthUserOutput, __MetadataBearer {}

/**
 * Removes an authenticated user from the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, RemoveNamespaceCdnAuthUserCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, RemoveNamespaceCdnAuthUserCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new RemoveNamespaceCdnAuthUserCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RemoveNamespaceCdnAuthUserCommandInput} for command's `input` shape.
 * @see {@link RemoveNamespaceCdnAuthUserCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class RemoveNamespaceCdnAuthUserCommand extends $Command<RemoveNamespaceCdnAuthUserCommandInput, RemoveNamespaceCdnAuthUserCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: RemoveNamespaceCdnAuthUserCommandInput) {
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
  ): Handler<RemoveNamespaceCdnAuthUserCommandInput, RemoveNamespaceCdnAuthUserCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "RemoveNamespaceCdnAuthUserCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        RemoveNamespaceCdnAuthUserInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        RemoveNamespaceCdnAuthUserOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: RemoveNamespaceCdnAuthUserCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1RemoveNamespaceCdnAuthUserCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<RemoveNamespaceCdnAuthUserCommandOutput> {
    return deserializeAws_restJson1RemoveNamespaceCdnAuthUserCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
