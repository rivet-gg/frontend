import { __extends } from "tslib";
import { TransferGroupOwnershipInput, TransferGroupOwnershipOutput, } from "../models/models_0";
import { deserializeAws_restJson1TransferGroupOwnershipCommand, serializeAws_restJson1TransferGroupOwnershipCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var TransferGroupOwnershipCommand = (function (_super) {
    __extends(TransferGroupOwnershipCommand, _super);
    function TransferGroupOwnershipCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    TransferGroupOwnershipCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "TransferGroupOwnershipCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: TransferGroupOwnershipInput.filterSensitiveLog,
            outputFilterSensitiveLog: TransferGroupOwnershipOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    TransferGroupOwnershipCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1TransferGroupOwnershipCommand(input, context);
    };
    TransferGroupOwnershipCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1TransferGroupOwnershipCommand(output, context);
    };
    return TransferGroupOwnershipCommand;
}($Command));
export { TransferGroupOwnershipCommand };
