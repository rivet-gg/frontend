// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  CompleteGroupAvatarUploadInput,
  CompleteGroupAvatarUploadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1CompleteGroupAvatarUploadCommand,
  serializeAws_restJson1CompleteGroupAvatarUploadCommand,
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

export interface CompleteGroupAvatarUploadCommandInput extends CompleteGroupAvatarUploadInput {}
export interface CompleteGroupAvatarUploadCommandOutput extends CompleteGroupAvatarUploadOutput, __MetadataBearer {}

/**
 * Completes an avatar image upload. Must be called after the file upload
 * process completes.
 *
 * Call `rivet.api.group#PrepareGroupAvatarUpload` first.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, CompleteGroupAvatarUploadCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, CompleteGroupAvatarUploadCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new CompleteGroupAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CompleteGroupAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link CompleteGroupAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class CompleteGroupAvatarUploadCommand extends $Command<CompleteGroupAvatarUploadCommandInput, CompleteGroupAvatarUploadCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CompleteGroupAvatarUploadCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: GroupServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<CompleteGroupAvatarUploadCommandInput, CompleteGroupAvatarUploadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "CompleteGroupAvatarUploadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        CompleteGroupAvatarUploadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        CompleteGroupAvatarUploadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: CompleteGroupAvatarUploadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1CompleteGroupAvatarUploadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<CompleteGroupAvatarUploadCommandOutput> {
    return deserializeAws_restJson1CompleteGroupAvatarUploadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
