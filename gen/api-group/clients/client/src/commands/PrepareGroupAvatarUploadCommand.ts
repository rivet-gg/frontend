// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  PrepareGroupAvatarUploadInput,
  PrepareGroupAvatarUploadOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1PrepareGroupAvatarUploadCommand,
  serializeAws_restJson1PrepareGroupAvatarUploadCommand,
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

export interface PrepareGroupAvatarUploadCommandInput extends PrepareGroupAvatarUploadInput {}
export interface PrepareGroupAvatarUploadCommandOutput extends PrepareGroupAvatarUploadOutput, __MetadataBearer {}

/**
 * Prepares an avatar image upload.
 *
 * Complete upload with `rivet.api.group#CompleteGroupAvatarUpload`.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, PrepareGroupAvatarUploadCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, PrepareGroupAvatarUploadCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new PrepareGroupAvatarUploadCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link PrepareGroupAvatarUploadCommandInput} for command's `input` shape.
 * @see {@link PrepareGroupAvatarUploadCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class PrepareGroupAvatarUploadCommand extends $Command<PrepareGroupAvatarUploadCommandInput, PrepareGroupAvatarUploadCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: PrepareGroupAvatarUploadCommandInput) {
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
  ): Handler<PrepareGroupAvatarUploadCommandInput, PrepareGroupAvatarUploadCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "PrepareGroupAvatarUploadCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        PrepareGroupAvatarUploadInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        PrepareGroupAvatarUploadOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: PrepareGroupAvatarUploadCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1PrepareGroupAvatarUploadCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<PrepareGroupAvatarUploadCommandOutput> {
    return deserializeAws_restJson1PrepareGroupAvatarUploadCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
