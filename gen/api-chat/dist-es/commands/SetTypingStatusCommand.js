import { __extends } from "tslib";
import { SetTypingStatusInput, SetTypingStatusOutput, } from "../models/models_0";
import { deserializeAws_restJson1SetTypingStatusCommand, serializeAws_restJson1SetTypingStatusCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var SetTypingStatusCommand = (function (_super) {
    __extends(SetTypingStatusCommand, _super);
    function SetTypingStatusCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    SetTypingStatusCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "ChatServiceClient";
        var commandName = "SetTypingStatusCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: SetTypingStatusInput.filterSensitiveLog,
            outputFilterSensitiveLog: SetTypingStatusOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    SetTypingStatusCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1SetTypingStatusCommand(input, context);
    };
    SetTypingStatusCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1SetTypingStatusCommand(output, context);
    };
    return SetTypingStatusCommand;
}($Command));
export { SetTypingStatusCommand };
