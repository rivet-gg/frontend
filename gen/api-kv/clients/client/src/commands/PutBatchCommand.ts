// smithy-typescript generated code
import {
  KvServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../KvServiceClient";
import {
  PutBatchOutput,
  PutBatchRequest,
} from "../models/models_0";
import {
  deserializeAws_restJson1PutBatchCommand,
  serializeAws_restJson1PutBatchCommand,
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

export interface PutBatchCommandInput extends PutBatchRequest {}
export interface PutBatchCommandOutput extends PutBatchOutput, __MetadataBearer {}

/**
 * Puts (sets or overwrites) multiple key-value entries by key(s).
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { KvServiceClient, PutBatchCommand } from "@rivet-gg/kv"; // ES Modules import
 * // const { KvServiceClient, PutBatchCommand } = require("@rivet-gg/kv"); // CommonJS import
 * const client = new KvServiceClient(config);
 * const command = new PutBatchCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PutBatchCommandInput} for command's `input` shape.
 * @see {@link PutBatchCommandOutput} for command's `response` shape.
 * @see {@link KvServiceClientResolvedConfig | config} for KvServiceClient's `config` shape.
 *
 */
export class PutBatchCommand extends $Command<PutBatchCommandInput, PutBatchCommandOutput, KvServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: PutBatchCommandInput) {
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
  ): Handler<PutBatchCommandInput, PutBatchCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "KvServiceClient";
    const commandName = "PutBatchCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        PutBatchRequest.filterSensitiveLog,
      outputFilterSensitiveLog:
        PutBatchOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: PutBatchCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1PutBatchCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<PutBatchCommandOutput> {
    return deserializeAws_restJson1PutBatchCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
