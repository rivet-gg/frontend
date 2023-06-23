// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  RemoveNamespaceDomainInput,
  RemoveNamespaceDomainOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1RemoveNamespaceDomainCommand,
  serializeAws_restJson1RemoveNamespaceDomainCommand,
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

export interface RemoveNamespaceDomainCommandInput extends RemoveNamespaceDomainInput {}
export interface RemoveNamespaceDomainCommandOutput extends RemoveNamespaceDomainOutput, __MetadataBearer {}

/**
 * Removes a domain from the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, RemoveNamespaceDomainCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, RemoveNamespaceDomainCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new RemoveNamespaceDomainCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link RemoveNamespaceDomainCommandInput} for command's `input` shape.
 * @see {@link RemoveNamespaceDomainCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class RemoveNamespaceDomainCommand extends $Command<RemoveNamespaceDomainCommandInput, RemoveNamespaceDomainCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: RemoveNamespaceDomainCommandInput) {
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
  ): Handler<RemoveNamespaceDomainCommandInput, RemoveNamespaceDomainCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "RemoveNamespaceDomainCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        RemoveNamespaceDomainInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        RemoveNamespaceDomainOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: RemoveNamespaceDomainCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1RemoveNamespaceDomainCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<RemoveNamespaceDomainCommandOutput> {
    return deserializeAws_restJson1RemoveNamespaceDomainCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
