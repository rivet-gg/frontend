// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  ListNamespaceLobbiesInput,
  ListNamespaceLobbiesOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1ListNamespaceLobbiesCommand,
  serializeAws_restJson1ListNamespaceLobbiesCommand,
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

export interface ListNamespaceLobbiesCommandInput extends ListNamespaceLobbiesInput {}
export interface ListNamespaceLobbiesCommandOutput extends ListNamespaceLobbiesOutput, __MetadataBearer {}

/**
 * Returns a list of lobbies for the given game namespace.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, ListNamespaceLobbiesCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, ListNamespaceLobbiesCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new ListNamespaceLobbiesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListNamespaceLobbiesCommandInput} for command's `input` shape.
 * @see {@link ListNamespaceLobbiesCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class ListNamespaceLobbiesCommand extends $Command<ListNamespaceLobbiesCommandInput, ListNamespaceLobbiesCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListNamespaceLobbiesCommandInput) {
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
  ): Handler<ListNamespaceLobbiesCommandInput, ListNamespaceLobbiesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "ListNamespaceLobbiesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        ListNamespaceLobbiesInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        ListNamespaceLobbiesOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ListNamespaceLobbiesCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ListNamespaceLobbiesCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListNamespaceLobbiesCommandOutput> {
    return deserializeAws_restJson1ListNamespaceLobbiesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
