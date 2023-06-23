// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  CompleteUploadInput,
  CompleteUploadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CompleteUploadCommand,
  serializeAws_restJson1CompleteUploadCommand,
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

export interface CompleteUploadCommandInput extends CompleteUploadInput {}
export interface CompleteUploadCommandOutput extends CompleteUploadOutput, __MetadataBearer {}

/**
 * Marks an upload as complete.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CompleteUploadCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CompleteUploadCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CompleteUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CompleteUploadCommandInput} for command's `input` shape.
 * @see {@link CompleteUploadCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class CompleteUploadCommand extends $Command<CompleteUploadCommandInput, CompleteUploadCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CompleteUploadCommandInput) {
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
  ): Handler<CompleteUploadCommandInput, CompleteUploadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "CompleteUploadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CompleteUploadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CompleteUploadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CompleteUploadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CompleteUploadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CompleteUploadCommandOutput> {
    return deserializeAws_restJson1CompleteUploadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
