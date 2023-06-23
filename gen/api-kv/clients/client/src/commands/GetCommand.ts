// smithy-typescript generated code
import {
  KvServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../KvServiceClient";
import {
  GetInput,
  GetOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetCommand,
  serializeAws_restJson1GetCommand,
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

export interface GetCommandInput extends GetInput {}
export interface GetCommandOutput extends GetOutput, __MetadataBearer {}

/**
 * Returns a specific key-value entry by key.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, GetCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, GetCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new GetCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetCommandInput} for command's `input` shape.
 * @see {@link GetCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export class GetCommand extends $Command<GetCommandInput, GetCommandOutput, KvServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: KvServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetCommandInput, GetCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KvServiceClient";
    const commandName = "GetCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetCommandOutput> {
    return deserializeAws_restJson1GetCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
