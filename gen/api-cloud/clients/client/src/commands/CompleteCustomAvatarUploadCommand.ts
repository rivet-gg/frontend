// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  CompleteCustomAvatarUploadInput,
  CompleteCustomAvatarUploadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CompleteCustomAvatarUploadCommand,
  serializeAws_restJson1CompleteCustomAvatarUploadCommand,
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

export interface CompleteCustomAvatarUploadCommandInput extends CompleteCustomAvatarUploadInput {}
export interface CompleteCustomAvatarUploadCommandOutput extends CompleteCustomAvatarUploadOutput, __MetadataBearer {}

/**
 * Completes a custom avatar image upload. Must be called after the file upload process completes.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, CompleteCustomAvatarUploadCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, CompleteCustomAvatarUploadCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new CompleteCustomAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CompleteCustomAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link CompleteCustomAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class CompleteCustomAvatarUploadCommand extends $Command<CompleteCustomAvatarUploadCommandInput, CompleteCustomAvatarUploadCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CompleteCustomAvatarUploadCommandInput) {
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
  ): Handler<CompleteCustomAvatarUploadCommandInput, CompleteCustomAvatarUploadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "CompleteCustomAvatarUploadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CompleteCustomAvatarUploadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CompleteCustomAvatarUploadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CompleteCustomAvatarUploadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CompleteCustomAvatarUploadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CompleteCustomAvatarUploadCommandOutput> {
    return deserializeAws_restJson1CompleteCustomAvatarUploadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
