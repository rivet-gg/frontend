// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ToggleNamespaceDomainPublicAuthInput,
  ToggleNamespaceDomainPublicAuthOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand,
  serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand,
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

export interface ToggleNamespaceDomainPublicAuthCommandInput extends ToggleNamespaceDomainPublicAuthInput {}
export interface ToggleNamespaceDomainPublicAuthCommandOutput extends ToggleNamespaceDomainPublicAuthOutput, __MetadataBearer {}

/**
 * Toggles whether or not to allow authentication based on domain for the given game namesapce.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ToggleNamespaceDomainPublicAuthCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ToggleNamespaceDomainPublicAuthCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ToggleNamespaceDomainPublicAuthCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ToggleNamespaceDomainPublicAuthCommandInput} for command's `input` shape.
 * @see {@link ToggleNamespaceDomainPublicAuthCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ToggleNamespaceDomainPublicAuthCommand extends $Command<ToggleNamespaceDomainPublicAuthCommandInput, ToggleNamespaceDomainPublicAuthCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ToggleNamespaceDomainPublicAuthCommandInput) {
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
  ): Handler<ToggleNamespaceDomainPublicAuthCommandInput, ToggleNamespaceDomainPublicAuthCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ToggleNamespaceDomainPublicAuthCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ToggleNamespaceDomainPublicAuthInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ToggleNamespaceDomainPublicAuthOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ToggleNamespaceDomainPublicAuthCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ToggleNamespaceDomainPublicAuthCommandOutput> {
    return deserializeAws_restJson1ToggleNamespaceDomainPublicAuthCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
