import { __extends } from "tslib";
import { DeleteInput, DeleteOutput, } from "../models/models_0";
import { deserializeAws_restJson1DeleteCommand, serializeAws_restJson1DeleteCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var DeleteCommand = (function (_super) {
    __extends(DeleteCommand, _super);
    function DeleteCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    DeleteCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "KvServiceClient";
        var commandName = "DeleteCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteInput.filterSensitiveLog,
            outputFilterSensitiveLog: DeleteOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DeleteCommand(input, context);
    };
    DeleteCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DeleteCommand(output, context);
    };
    return DeleteCommand;
}($Command));
export { DeleteCommand };
