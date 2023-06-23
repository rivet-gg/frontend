// smithy-typescript generated code
import {
  CloudServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudServiceClient";
import {
  PrepareCustomAvatarUploadInput,
  PrepareCustomAvatarUploadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1PrepareCustomAvatarUploadCommand,
  serializeAws_restJson1PrepareCustomAvatarUploadCommand,
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

export interface PrepareCustomAvatarUploadCommandInput extends PrepareCustomAvatarUploadInput {}
export interface PrepareCustomAvatarUploadCommandOutput extends PrepareCustomAvatarUploadOutput, __MetadataBearer {}

/**
 * Prepares a custom avatar image upload.
 *
 * Complete upload with `rivet.api.cloud#CompleteCustomAvatarUpload`.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, PrepareCustomAvatarUploadCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, PrepareCustomAvatarUploadCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new PrepareCustomAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PrepareCustomAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link PrepareCustomAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export class PrepareCustomAvatarUploadCommand extends $Command<PrepareCustomAvatarUploadCommandInput, PrepareCustomAvatarUploadCommandOutput, CloudServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: PrepareCustomAvatarUploadCommandInput) {
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
  ): Handler<PrepareCustomAvatarUploadCommandInput, PrepareCustomAvatarUploadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "CloudServiceClient";
    const commandName = "PrepareCustomAvatarUploadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        PrepareCustomAvatarUploadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        PrepareCustomAvatarUploadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: PrepareCustomAvatarUploadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1PrepareCustomAvatarUploadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<PrepareCustomAvatarUploadCommandOutput> {
    return deserializeAws_restJson1PrepareCustomAvatarUploadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
