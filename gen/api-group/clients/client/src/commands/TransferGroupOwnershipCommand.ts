// smithy-typescript generated code
import {
  GroupServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../GroupServiceClient";
import {
  TransferGroupOwnershipInput,
  TransferGroupOwnershipOutput,
} from "../models/models_0";
import {
  deserializeAws_restJson1TransferGroupOwnershipCommand,
  serializeAws_restJson1TransferGroupOwnershipCommand,
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

export interface TransferGroupOwnershipCommandInput extends TransferGroupOwnershipInput {}
export interface TransferGroupOwnershipCommandOutput extends TransferGroupOwnershipOutput, __MetadataBearer {}

/**
 * Transfers ownership of a group to another identity.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, TransferGroupOwnershipCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, TransferGroupOwnershipCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new TransferGroupOwnershipCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link TransferGroupOwnershipCommandInput} for command's `input` shape.
 * @see {@link TransferGroupOwnershipCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export class TransferGroupOwnershipCommand extends $Command<TransferGroupOwnershipCommandInput, TransferGroupOwnershipCommandOutput, GroupServiceClientResolvedConfig> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: TransferGroupOwnershipCommandInput) {
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
  ): Handler<TransferGroupOwnershipCommandInput, TransferGroupOwnershipCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "GroupServiceClient";
    const commandName = "TransferGroupOwnershipCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog:
        TransferGroupOwnershipInput.filterSensitiveLog,
      outputFilterSensitiveLog:
        TransferGroupOwnershipOutput.filterSensitiveLog,
    }
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: TransferGroupOwnershipCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1TransferGroupOwnershipCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<TransferGroupOwnershipCommandOutput> {
    return deserializeAws_restJson1TransferGroupOwnershipCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
