// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  UpdateNamespaceCdnAuthUserInput,
  UpdateNamespaceCdnAuthUserOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand,
  serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand,
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

export interface UpdateNamespaceCdnAuthUserCommandInput extends UpdateNamespaceCdnAuthUserInput {}
export interface UpdateNamespaceCdnAuthUserCommandOutput extends UpdateNamespaceCdnAuthUserOutput, __MetadataBearer {}

/**
 * Adds an authenticated user to the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, UpdateNamespaceCdnAuthUserCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, UpdateNamespaceCdnAuthUserCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new UpdateNamespaceCdnAuthUserCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateNamespaceCdnAuthUserCommandInput} for command's `input` shape.
 * @see {@link UpdateNamespaceCdnAuthUserCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class UpdateNamespaceCdnAuthUserCommand extends $Command<UpdateNamespaceCdnAuthUserCommandInput, UpdateNamespaceCdnAuthUserCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: UpdateNamespaceCdnAuthUserCommandInput) {
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
  ): Handler<UpdateNamespaceCdnAuthUserCommandInput, UpdateNamespaceCdnAuthUserCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "UpdateNamespaceCdnAuthUserCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        UpdateNamespaceCdnAuthUserInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        UpdateNamespaceCdnAuthUserOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: UpdateNamespaceCdnAuthUserCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1UpdateNamespaceCdnAuthUserCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<UpdateNamespaceCdnAuthUserCommandOutput> {
    return deserializeAws_restJson1UpdateNamespaceCdnAuthUserCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
