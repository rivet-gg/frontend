// smithy-typescript generated code
import {
  KvServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../KvServiceClient";
import {
  GetBatchOutput,
  GetBatchRequest,
} from "../models/models_0";
import {
  deserializeAws_restJson1GetBatchCommand,
  serializeAws_restJson1GetBatchCommand,
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

export interface GetBatchCommandInput extends GetBatchRequest {}
export interface GetBatchCommandOutput extends GetBatchOutput, __MetadataBearer {}

/**
 * Gets multiple key-value entries by key(s).
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, GetBatchCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, GetBatchCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new GetBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetBatchCommandInput} for command's `input` shape.
 * @see {@link GetBatchCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export class GetBatchCommand extends $Command<GetBatchCommandInput, GetBatchCommandOutput, KvServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetBatchCommandInput) {
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
  ): Handler<GetBatchCommandInput, GetBatchCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KvServiceClient";
    const commandName = "GetBatchCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        GetBatchRequest.filterSensitiveLog,
      outputFilterSensitiveLog:
        GetBatchOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: GetBatchCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1GetBatchCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetBatchCommandOutput> {
    return deserializeAws_restJson1GetBatchCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
