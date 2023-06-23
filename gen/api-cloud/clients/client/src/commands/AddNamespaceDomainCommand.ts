// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  AddNamespaceDomainInput,
  AddNamespaceDomainOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1AddNamespaceDomainCommand,
  serializeAws_restJson1AddNamespaceDomainCommand,
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

export interface AddNamespaceDomainCommandInput extends AddNamespaceDomainInput {}
export interface AddNamespaceDomainCommandOutput extends AddNamespaceDomainOutput, __MetadataBearer {}

/**
 * Adds a domain to the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, AddNamespaceDomainCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, AddNamespaceDomainCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new AddNamespaceDomainCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link AddNamespaceDomainCommandInput} for command's `input` shape.
 * @see {@link AddNamespaceDomainCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class AddNamespaceDomainCommand extends $Command<AddNamespaceDomainCommandInput, AddNamespaceDomainCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: AddNamespaceDomainCommandInput) {
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
  ): Handler<AddNamespaceDomainCommandInput, AddNamespaceDomainCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "AddNamespaceDomainCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        AddNamespaceDomainInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        AddNamespaceDomainOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: AddNamespaceDomainCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1AddNamespaceDomainCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<AddNamespaceDomainCommandOutput> {
    return deserializeAws_restJson1AddNamespaceDomainCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
